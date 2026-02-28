use sysinfo::{System, Networks, ProcessRefreshKind};
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};
use tauri::{State, Manager};
use chrono::{Utc}; 
use std::thread;
use std::time::{Duration, Instant};
use std::fs;
use std::path::PathBuf;
use std::collections::HashMap;

// ============================================
// Data Structures
// ============================================

#[derive(Debug, Serialize, Deserialize, Clone)]
struct CpuStats {
    utilization: f32,
    cores: usize,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct MemoryStats {
    total_mb: u64,
    used_mb: u64,
    free_mb: u64,
    usage_percent: f32,
    total: u64, 
}

#[derive(Debug, Serialize, Deserialize, Clone, Default)]
struct DiskStats {
    read_mb: f64,
    write_mb: f64,
    read_per_sec: f64,
    write_per_sec: f64,
}

#[derive(Debug, Serialize, Deserialize, Clone, Default)]
struct NetworkStats {
    rx_mb: f64,
    tx_mb: f64,
    rx_per_sec: f64,
    tx_per_sec: f64,
}

#[derive(Debug, Serialize, Deserialize, Clone, Default)]
struct GpuStats {
    utilization: f32,
    name: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct SystemStats {
    timestamp: String,
    cpu: CpuStats,
    memory: MemoryStats,
    disk: DiskStats,
    network: NetworkStats,
    gpu: GpuStats,
    uptime: u64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct ProfilingSession {
    id: String,
    start_time: i64,
    start_timestamp: String,
    command: String,
    project: String,    
    branch: String,
    commit: String,
    samples: Vec<ResourceSample>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct ResourceSample {
    timestamp: i64,
    cpu_utilization: f32,
    memory_used: u64,
    memory_percent: f32,
    disk_read_per_sec: f64,
    disk_write_per_sec: f64,
    net_rx_per_sec: f64,
    net_tx_per_sec: f64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct StartProfilingOptions {
    command: Option<String>,
    project: Option<String>,
    branch: Option<String>,
    commit: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct CarbonResult {
    total_grams: f64,
    region: String,
    intensity: f64,
    pue: f64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct EnergyResult {
    total_kwh: f64,
    cpu_kwh: f64,
    gpu_kwh: f64,
    memory_kwh: f64,
    disk_kwh: f64,
    network_kwh: f64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct RunResources {
    wall_time: f64,
    cpu_utilization: f32,
    cpu_time_user: f64,
    cpu_time_system: f64,
    memory_peak_mb: u64,
    memory_avg_percent: f32,
    disk_read_mb: f64,
    disk_write_mb: f64,
    net_recv_mb: f64,
    net_sent_mb: f64,
    gpu_utilization: f32,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[allow(non_snake_case)]
struct RunMetrics {
    cpuUtilization: f32,
    memoryUsagePercent: f32,
    gpuUtilization: f32,
    diskActivity: f32,
    networkActivity: f32,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[allow(non_snake_case)]
struct RunResult {
    id: String,
    project: String,
    command: String,
    branch: String,
    commit: String,
    timestamp: String,
    resources: RunResources,
    metrics: RunMetrics,
    carbon: CarbonResult,
    energy: EnergyResult,
    sampleCount: usize,
    durationMs: i64,
}

struct AppState {
    sys: Arc<Mutex<System>>,
    slow_metrics: Arc<Mutex<SlowMetrics>>,
    profiling_session: Mutex<Option<ProfilingSession>>,
}

#[derive(Clone, Default)]
struct SlowMetrics {
    disk: DiskStats,
    network: NetworkStats,
    gpu: GpuStats,
}

// ============================================
// Settings & Reference Data
// ============================================

#[derive(Debug, Serialize, Deserialize, Clone)]
struct AppSettings {
    region: String,
    pue: f64,
    #[serde(rename = "hardwareProfile")]
    hardware_profile: String,
    #[serde(rename = "maxCarbon")]
    max_carbon: f64,
    #[serde(rename = "maxEnergy")]
    max_energy: f64,
    #[serde(rename = "failOnThreshold")]
    fail_on_threshold: bool,
    #[serde(rename = "suggestionsEnabled")]
    suggestions_enabled: bool,
    #[serde(rename = "autoStart", default)]
    auto_start: bool,
    #[serde(rename = "dailyCarbonBudget", default = "default_daily_budget")]
    daily_carbon_budget: f64,
    #[serde(rename = "weeklyCarbonBudget", default = "default_weekly_budget")]
    weekly_carbon_budget: f64,
}

fn default_daily_budget() -> f64 { 50.0 }
fn default_weekly_budget() -> f64 { 250.0 }

impl Default for AppSettings {
    fn default() -> Self {
        AppSettings {
            region: "GLOBAL-AVG".to_string(),
            pue: 1.0,
            hardware_profile: "laptop".to_string(),
            max_carbon: 100.0,
            max_energy: 0.5,
            fail_on_threshold: false,
            suggestions_enabled: true,
            auto_start: false,
            daily_carbon_budget: 50.0,
            weekly_carbon_budget: 250.0,
        }
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct CarbonIntensityEntry {
    region: String,
    gco2_kwh: f64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct HardwareProfileEntry {
    cpu_tdp_watts: f64,
    memory_watts_per_gb: f64,
}

fn get_carbon_intensity_map() -> HashMap<String, CarbonIntensityEntry> {
    let mut m = HashMap::new();
    m.insert("US-WEST".into(), CarbonIntensityEntry { region: "California".into(), gco2_kwh: 210.0 });
    m.insert("US-EAST".into(), CarbonIntensityEntry { region: "Virginia".into(), gco2_kwh: 380.0 });
    m.insert("EU-WEST".into(), CarbonIntensityEntry { region: "Ireland".into(), gco2_kwh: 300.0 });
    m.insert("EU-NORTH".into(), CarbonIntensityEntry { region: "Sweden".into(), gco2_kwh: 25.0 });
    m.insert("ASIA-EAST".into(), CarbonIntensityEntry { region: "Japan".into(), gco2_kwh: 470.0 });
    m.insert("ASIA-SOUTH".into(), CarbonIntensityEntry { region: "India".into(), gco2_kwh: 700.0 });
    m.insert("GLOBAL-AVG".into(), CarbonIntensityEntry { region: "Mixed".into(), gco2_kwh: 475.0 });
    m
}

fn get_hardware_profiles_map() -> HashMap<String, HardwareProfileEntry> {
    let mut m = HashMap::new();
    m.insert("laptop".into(), HardwareProfileEntry { cpu_tdp_watts: 15.0, memory_watts_per_gb: 0.3 });
    m.insert("desktop".into(), HardwareProfileEntry { cpu_tdp_watts: 65.0, memory_watts_per_gb: 0.4 });
    m.insert("server".into(), HardwareProfileEntry { cpu_tdp_watts: 150.0, memory_watts_per_gb: 0.5 });
    m
}

// ============================================
// Logic
// ============================================

fn get_runs_path(app_handle: &tauri::AppHandle) -> PathBuf {
    let path = app_handle.path().app_data_dir().expect("failed to get app data dir");
    fs::create_dir_all(&path).unwrap();
    path.join("runs.json")
}

fn get_settings_path(app_handle: &tauri::AppHandle) -> PathBuf {
    let path = app_handle.path().app_data_dir().expect("failed to get app data dir");
    fs::create_dir_all(&path).unwrap();
    path.join("settings.json")
}

fn load_settings_from_disk(app_handle: &tauri::AppHandle) -> AppSettings {
    let path = get_settings_path(app_handle);
    if path.exists() {
        let content = fs::read_to_string(&path).unwrap_or_else(|_| "{}".to_string());
        serde_json::from_str(&content).unwrap_or_default()
    } else {
        AppSettings::default()
    }
}

fn save_settings_to_disk(app_handle: &tauri::AppHandle, settings: &AppSettings) {
    let path = get_settings_path(app_handle);
    let json = serde_json::to_string_pretty(settings).unwrap();
    fs::write(path, json).unwrap();
}

fn save_run_to_disk(app_handle: &tauri::AppHandle, run: &RunResult) {
    let path = get_runs_path(app_handle);
    let mut runs: Vec<RunResult> = if path.exists() {
        let content = fs::read_to_string(&path).unwrap_or_else(|_| "[]".to_string());
        serde_json::from_str(&content).unwrap_or_default()
    } else {
        Vec::new()
    };
    
    runs.push(run.clone());
    
    let json = serde_json::to_string_pretty(&runs).unwrap();
    fs::write(path, json).unwrap();
}

fn calculate_energy(metrics: &RunMetrics, duration_seconds: f64, hw_profile: &str) -> EnergyResult {
    let profiles = get_hardware_profiles_map();
    let profile = profiles.get(hw_profile).cloned()
        .unwrap_or(HardwareProfileEntry { cpu_tdp_watts: 15.0, memory_watts_per_gb: 0.3 });

    let gpu_tdp = 0.0;
    let disk_watts = 5.0;
    let network_watts = 2.0;

    let hours = duration_seconds / 3600.0;

    let cpu_energy = (profile.cpu_tdp_watts * (metrics.cpuUtilization as f64 / 100.0) * hours) / 1000.0;
    let gpu_energy = if metrics.gpuUtilization > 0.0 {
        (gpu_tdp * (metrics.gpuUtilization as f64 / 100.0) * hours) / 1000.0
    } else {
        0.0
    };
    // Use memory_watts_per_gb * estimated 16GB as base
    let memory_watts = profile.memory_watts_per_gb * 16.0;
    let memory_energy = (memory_watts * (metrics.memoryUsagePercent as f64 / 100.0) * hours) / 1000.0;
    let disk_energy = (disk_watts * (metrics.diskActivity as f64 / 100.0) * hours) / 1000.0;
    let network_energy = (network_watts * (metrics.networkActivity as f64 / 100.0) * hours) / 1000.0;

    let total_energy = cpu_energy + gpu_energy + memory_energy + disk_energy + network_energy;

    EnergyResult {
        total_kwh: total_energy,
        cpu_kwh: cpu_energy,
        gpu_kwh: gpu_energy,
        memory_kwh: memory_energy,
        disk_kwh: disk_energy,
        network_kwh: network_energy,
    }
}

fn calculate_carbon(energy_kwh: f64, region: &str, pue: f64) -> CarbonResult {
    let intensity_map = get_carbon_intensity_map();
    let intensity = intensity_map.get(region)
        .map(|e| e.gco2_kwh)
        .unwrap_or(475.0);
    let region_name = intensity_map.get(region)
        .map(|e| e.region.clone())
        .unwrap_or_else(|| region.to_string());

    let effective_energy = energy_kwh * pue;
    let carbon_grams = effective_energy * intensity;

    CarbonResult {
        total_grams: carbon_grams,
        region: region_name,
        intensity,
        pue,
    }
}

// ============================================
// Commands
// ============================================

#[tauri::command]
fn get_current_stats(state: State<AppState>) -> SystemStats {
    let mut sys = state.sys.lock().unwrap();
    sys.refresh_cpu();
    sys.refresh_memory();

    let cpu_usage = sys.global_cpu_info().cpu_usage();
    let total_mem = sys.total_memory() / 1024 / 1024;
    let used_mem = sys.used_memory() / 1024 / 1024;
    let free_mem = sys.free_memory() / 1024 / 1024;
    let mem_percent = if total_mem > 0 {
        (used_mem as f32 / total_mem as f32) * 100.0
    } else {
        0.0
    };

    let slow = state.slow_metrics.lock().unwrap().clone();

    // Store sample if profiling
    let mut session_guard = state.profiling_session.lock().unwrap();
    if let Some(session) = session_guard.as_mut() {
        session.samples.push(ResourceSample {
            timestamp: Utc::now().timestamp_millis(),
            cpu_utilization: cpu_usage,
            memory_used: used_mem,
            memory_percent: mem_percent,
            disk_read_per_sec: slow.disk.read_per_sec,
            disk_write_per_sec: slow.disk.write_per_sec,
            net_rx_per_sec: slow.network.rx_per_sec,
            net_tx_per_sec: slow.network.tx_per_sec,
        });
    }

    SystemStats {
        timestamp: Utc::now().to_rfc3339(),
        cpu: CpuStats {
            utilization: cpu_usage,
            cores: sys.cpus().len(),
        },
        memory: MemoryStats {
            total_mb: total_mem,
            used_mb: used_mem,
            free_mb: free_mem,
            usage_percent: mem_percent,
            total: sys.total_memory(),
        },
        disk: slow.disk,
        network: slow.network,
        gpu: slow.gpu,
        uptime: System::uptime(),
    }
}

#[tauri::command]
fn start_profiling(
    options: StartProfilingOptions,
    state: State<AppState>,
) -> Result<serde_json::Value, String> {
    let mut session_guard = state.profiling_session.lock().map_err(|e| e.to_string())?;
    
    if session_guard.is_some() {
        return Err("Profiling session already in progress".to_string());
    }

    let now = Utc::now();
    let session = ProfilingSession {
        id: format!("cl_{}", now.timestamp_millis()),
        start_time: now.timestamp_millis(),
        start_timestamp: now.to_rfc3339(),
        command: options.command.unwrap_or_else(|| "manual profiling".to_string()),
        project: options.project.unwrap_or_else(|| "CarbonLint Dashboard".to_string()),
        branch: options.branch.unwrap_or_else(|| "main".to_string()),
        commit: options.commit.unwrap_or_else(|| "N/A".to_string()),
        samples: Vec::new(),
    };

    *session_guard = Some(session.clone());

    Ok(serde_json::json!({
        "sessionId": session.id,
        "startTime": session.start_timestamp,
        "message": "Profiling started"
    }))
}

#[tauri::command]
fn stop_profiling(app_handle: tauri::AppHandle, state: State<AppState>) -> Result<RunResult, String> {
    let mut session_guard = state.profiling_session.lock().map_err(|e| e.to_string())?;
    
    if let Some(session) = session_guard.take() {
        let duration_ms = Utc::now().timestamp_millis() - session.start_time;
        #[allow(unused_variables)]
        let duration_seconds = duration_ms as f64 / 1000.0;

        // Calculate averages
        let sample_count = session.samples.len();
        let avg_cpu = if sample_count > 0 {
            session.samples.iter().map(|s| s.cpu_utilization).sum::<f32>() / sample_count as f32
        } else { 0.0 };
        
        let max_memory = if sample_count > 0 {
             session.samples.iter().map(|s| s.memory_used).max().unwrap_or(0)
        } else { 0 };

        let avg_mem_percent = if sample_count > 0 {
            session.samples.iter().map(|s| s.memory_percent).sum::<f32>() / sample_count as f32
        } else { 0.0 };

        // Disk & Net Averages (Bytes per sec)
        let avg_disk_read = if sample_count > 0 {
            session.samples.iter().map(|s| s.disk_read_per_sec).sum::<f64>() / sample_count as f64
        } else { 0.0 };
        let avg_disk_write = if sample_count > 0 {
            session.samples.iter().map(|s| s.disk_write_per_sec).sum::<f64>() / sample_count as f64
        } else { 0.0 };
        
        let avg_net_rx = if sample_count > 0 {
            session.samples.iter().map(|s| s.net_rx_per_sec).sum::<f64>() / sample_count as f64
        } else { 0.0 };
        let avg_net_tx = if sample_count > 0 {
            session.samples.iter().map(|s| s.net_tx_per_sec).sum::<f64>() / sample_count as f64
        } else { 0.0 };

        // Total MB
        let total_disk_read_mb = (avg_disk_read * duration_seconds) / 1_048_576.0;
        let total_disk_write_mb = (avg_disk_write * duration_seconds) / 1_048_576.0;
        let total_net_recv_mb = (avg_net_rx * duration_seconds) / 1_048_576.0;
        let total_net_sent_mb = (avg_net_tx * duration_seconds) / 1_048_576.0;

        // Activity Estimates (0-100)
        // Heuristic: 100% activity = 100 MB/s for Disk, 10 MB/s for Net (adjust as needed)
        // Or better, just map >0 to some value or keep it proportional.
        let disk_activity_percent = ((avg_disk_read + avg_disk_write) / 100_000_000.0 * 100.0).min(100.0) as f32;
        let net_activity_percent = ((avg_net_rx + avg_net_tx) / 10_000_000.0 * 100.0).min(100.0) as f32;

        let metrics = RunMetrics {
            cpuUtilization: avg_cpu,
            memoryUsagePercent: avg_mem_percent,
            gpuUtilization: 0.0,
            diskActivity: disk_activity_percent,
            networkActivity: net_activity_percent,
        };

        let settings = load_settings_from_disk(&app_handle);
        let energy = calculate_energy(&metrics, duration_seconds, &settings.hardware_profile);
        let carbon = calculate_carbon(energy.total_kwh, &settings.region, settings.pue);

        let resources = RunResources {
            wall_time: duration_seconds,
            cpu_utilization: avg_cpu,
            cpu_time_user: (avg_cpu as f64 / 100.0) * duration_seconds * 0.7,
            cpu_time_system: (avg_cpu as f64 / 100.0) * duration_seconds * 0.3,
            memory_peak_mb: max_memory,
            memory_avg_percent: avg_mem_percent,
            disk_read_mb: total_disk_read_mb,
            disk_write_mb: total_disk_write_mb,
            net_recv_mb: total_net_recv_mb,
            net_sent_mb: total_net_sent_mb,
            gpu_utilization: 0.0,
        };

        let result = RunResult {
            id: session.id,
            project: session.project,
            command: session.command,
            branch: session.branch,
            commit: session.commit,
            timestamp: session.start_timestamp,
            resources,
            metrics,
            carbon,
            energy,
            sampleCount: sample_count,
            durationMs: duration_ms,
        };
        
        save_run_to_disk(&app_handle, &result);

        Ok(result)
    } else {
        Err("No profiling session in progress".to_string())
    }
}

#[tauri::command]
fn get_profiling_status(state: State<AppState>) -> serde_json::Value {
    let session_guard = state.profiling_session.lock().unwrap();
    
    if let Some(session) = &*session_guard {
        serde_json::json!({
            "active": true,
            "sessionId": session.id,
            "startTime": session.start_timestamp,
            "elapsedMs": Utc::now().timestamp_millis() - session.start_time
        })
    } else {
        serde_json::json!({ "active": false })
    }
}

#[tauri::command]
fn get_runs(app_handle: tauri::AppHandle) -> Vec<RunResult> {
    let path = get_runs_path(&app_handle);
    if path.exists() {
        let content = fs::read_to_string(&path).unwrap_or_else(|_| "[]".to_string());
        serde_json::from_str(&content).unwrap_or_default()
    } else {
        Vec::new()
    }
}

#[derive(Serialize)]
#[allow(non_snake_case)]
struct StatsSummary {
    totalRuns: usize,
    totalCarbon: String,
    totalEnergy: String,
    avgCarbon: String,
    trend: String,
}

#[tauri::command]
fn get_stats_summary(app_handle: tauri::AppHandle) -> StatsSummary {
    let runs = get_runs(app_handle);
    let total_runs = runs.len();
    
    let total_carbon: f64 = runs.iter().map(|r| r.carbon.total_grams).sum();
    let total_energy: f64 = runs.iter().map(|r| r.energy.total_kwh).sum();
    
    let avg_carbon = if total_runs > 0 {
        total_carbon / total_runs as f64
    } else {
        0.0
    };

    let trend = if total_runs >= 2 {
        let last = runs.last().unwrap().carbon.total_grams;
        let prev = runs[runs.len() - 2].carbon.total_grams;
        if prev > 0.0 {
            ((last - prev) / prev) * 100.0
        } else {
            0.0
        }
    } else {
        0.0
    };

    StatsSummary {
        totalRuns: total_runs,
        totalCarbon: format!("{:.2}", total_carbon),
        totalEnergy: format!("{:.5}", total_energy),
        avgCarbon: format!("{:.2}", avg_carbon),
        trend: format!("{:.1}", trend),
    }
}

#[tauri::command]
fn get_run(app_handle: tauri::AppHandle, id: String) -> Option<RunResult> {
    let runs = get_runs(app_handle);
    runs.into_iter().find(|r| r.id == id)
}

#[tauri::command]
fn delete_run(app_handle: tauri::AppHandle, id: String) -> Result<serde_json::Value, String> {
    let path = get_runs_path(&app_handle);
    let mut runs: Vec<RunResult> = if path.exists() {
        let content = fs::read_to_string(&path).unwrap_or_else(|_| "[]".to_string());
        serde_json::from_str(&content).unwrap_or_default()
    } else {
        return Err("No runs file found".to_string());
    };
    let before = runs.len();
    runs.retain(|r| r.id != id);
    if runs.len() == before {
        return Err(format!("Run {} not found", id));
    }
    let json = serde_json::to_string_pretty(&runs).unwrap();
    fs::write(path, json).map_err(|e| e.to_string())?;
    Ok(serde_json::json!({ "success": true }))
}

#[tauri::command]
fn get_settings(app_handle: tauri::AppHandle) -> AppSettings {
    load_settings_from_disk(&app_handle)
}

#[tauri::command]
fn save_settings(app_handle: tauri::AppHandle, settings: AppSettings) -> Result<serde_json::Value, String> {
    save_settings_to_disk(&app_handle, &settings);
    Ok(serde_json::json!({ "success": true }))
}

#[tauri::command]
fn get_carbon_intensity_data() -> HashMap<String, CarbonIntensityEntry> {
    get_carbon_intensity_map()
}

#[tauri::command]
fn get_hardware_profiles_data() -> HashMap<String, HardwareProfileEntry> {
    get_hardware_profiles_map()
}

// ============================================
// Background Workers
// ============================================

fn spawn_slow_metrics_worker(slow_metrics: Arc<Mutex<SlowMetrics>>) {
    thread::spawn(move || {
        let mut networks = Networks::new_with_refreshed_list();
        let mut sys = System::new();

        let mut last_update = Instant::now();
        let mut last_rx = 0;
        let mut last_tx = 0;

        loop {
            thread::sleep(Duration::from_secs(2)); 
            let now = Instant::now();
            let elapsed = now.duration_since(last_update).as_secs_f64();
            if elapsed == 0.0 { continue; } 

            // --- Network ---
            networks.refresh(); 
            let mut current_rx = 0;
            let mut current_tx = 0;
            for (_name, data) in &networks {
                 current_rx += data.received();
                 current_tx += data.transmitted();
            }

            // Calculate rate (bytes/sec)
            let rx_delta = if current_rx >= last_rx { current_rx - last_rx } else { 0 };
            let tx_delta = if current_tx >= last_tx { current_tx - last_tx } else { 0 };

            let rx_rate = rx_delta as f64 / elapsed;
            let tx_rate = tx_delta as f64 / elapsed;

            // --- Disk ---
            sys.refresh_processes_specifics(ProcessRefreshKind::new().with_disk_usage());
            let mut current_read = 0;
            let mut current_write = 0;
            for (_pid, process) in sys.processes() {
                let usage = process.disk_usage();
                current_read += usage.read_bytes;
                current_write += usage.written_bytes;
            }
            
            // Disk stats in sysinfo 0.30 via processes are usually delta since last refresh?
            // "Returns the bytes read/written since the last refresh." - Docs
            // So `current_read` is ALREADY the delta over the last 2 seconds.
            // So rate = current_read / elapsed.
            
            let disk_read_rate = current_read as f64 / elapsed;
            let disk_write_rate = current_write as f64 / elapsed;

            // Update Net Stats
            let net_stats = NetworkStats {
                rx_mb: current_rx as f64 / 1_048_576.0,
                tx_mb: current_tx as f64 / 1_048_576.0,
                rx_per_sec: rx_rate,
                tx_per_sec: tx_rate,
            };

            // --- Disk ---
            let disk_stats = DiskStats {
                read_mb: current_read as f64 / 1_048_576.0,
                write_mb: current_write as f64 / 1_048_576.0,
                read_per_sec: disk_read_rate,
                write_per_sec: disk_write_rate,
            };

            // Update cache
            {
                let mut guard = slow_metrics.lock().unwrap();
                guard.network = net_stats;
                guard.disk = disk_stats;
            }

            // Update "last" values
            last_rx = current_rx;
            last_tx = current_tx;
            last_update = now;
        }
    });
}

// ============================================
// Logic Implementation (Reusable)
// ============================================

fn start_profiling_impl(state: &State<AppState>) -> Result<String, String> {
    let mut session_guard = state.profiling_session.lock().map_err(|e| e.to_string())?;
    
    if session_guard.is_some() {
        return Err("Profiling session already in progress".to_string());
    }

    let now = Utc::now();
    let session = ProfilingSession {
        id: format!("cl_{}", now.timestamp_millis()),
        start_time: now.timestamp_millis(),
        start_timestamp: now.to_rfc3339(),
        command: "Global Shortcut".to_string(),
        project: "CarbonLint Dashboard".to_string(),
        branch: "main".to_string(),
        commit: "N/A".to_string(),
        samples: Vec::new(),
    };

    *session_guard = Some(session);
    Ok("Profiling started via shortcut".to_string())
}

fn stop_profiling_impl(app_handle: &tauri::AppHandle, state: &State<AppState>) -> Result<RunResult, String> {
    let mut session_guard = state.profiling_session.lock().map_err(|e| e.to_string())?;
    
    if let Some(session) = session_guard.take() {
        let duration_ms = Utc::now().timestamp_millis() - session.start_time;
        #[allow(unused_variables)]
        let duration_seconds = duration_ms as f64 / 1000.0;

        // Calculate averages
        let sample_count = session.samples.len();
        let avg_cpu = if sample_count > 0 {
            session.samples.iter().map(|s| s.cpu_utilization).sum::<f32>() / sample_count as f32
        } else { 0.0 };
        
        // ... (Logic identical to previous stop_profiling) ...
        let max_memory = if sample_count > 0 {
             session.samples.iter().map(|s| s.memory_used).max().unwrap_or(0)
        } else { 0 };

        let avg_mem_percent = if sample_count > 0 {
            session.samples.iter().map(|s| s.memory_percent).sum::<f32>() / sample_count as f32
        } else { 0.0 };

        let avg_disk_read = if sample_count > 0 {
            session.samples.iter().map(|s| s.disk_read_per_sec).sum::<f64>() / sample_count as f64
        } else { 0.0 };
        let avg_disk_write = if sample_count > 0 {
            session.samples.iter().map(|s| s.disk_write_per_sec).sum::<f64>() / sample_count as f64
        } else { 0.0 };
        
        let avg_net_rx = if sample_count > 0 {
            session.samples.iter().map(|s| s.net_rx_per_sec).sum::<f64>() / sample_count as f64
        } else { 0.0 };
        let avg_net_tx = if sample_count > 0 {
            session.samples.iter().map(|s| s.net_tx_per_sec).sum::<f64>() / sample_count as f64
        } else { 0.0 };

        let total_disk_read_mb = (avg_disk_read * duration_seconds) / 1_048_576.0;
        let total_disk_write_mb = (avg_disk_write * duration_seconds) / 1_048_576.0;
        let total_net_recv_mb = (avg_net_rx * duration_seconds) / 1_048_576.0;
        let total_net_sent_mb = (avg_net_tx * duration_seconds) / 1_048_576.0;

        let disk_activity_percent = ((avg_disk_read + avg_disk_write) / 100_000_000.0 * 100.0).min(100.0) as f32;
        let net_activity_percent = ((avg_net_rx + avg_net_tx) / 10_000_000.0 * 100.0).min(100.0) as f32;

        let metrics = RunMetrics {
            cpuUtilization: avg_cpu,
            memoryUsagePercent: avg_mem_percent,
            gpuUtilization: 0.0,
            diskActivity: disk_activity_percent,
            networkActivity: net_activity_percent,
        };

        let settings = load_settings_from_disk(app_handle);
        let energy = calculate_energy(&metrics, duration_seconds, &settings.hardware_profile);
        let carbon = calculate_carbon(energy.total_kwh, &settings.region, settings.pue);

        let resources = RunResources {
            wall_time: duration_seconds,
            cpu_utilization: avg_cpu,
            cpu_time_user: (avg_cpu as f64 / 100.0) * duration_seconds * 0.7,
            cpu_time_system: (avg_cpu as f64 / 100.0) * duration_seconds * 0.3,
            memory_peak_mb: max_memory,
            memory_avg_percent: avg_mem_percent,
            disk_read_mb: total_disk_read_mb,
            disk_write_mb: total_disk_write_mb,
            net_recv_mb: total_net_recv_mb,
            net_sent_mb: total_net_sent_mb,
            gpu_utilization: 0.0,
        };

        let result = RunResult {
            id: session.id,
            project: session.project,
            command: session.command,
            branch: session.branch,
            commit: session.commit,
            timestamp: session.start_timestamp,
            resources,
            metrics,
            carbon,
            energy,
            sampleCount: sample_count,
            durationMs: duration_ms,
        };
        
        save_run_to_disk(&app_handle, &result);
        Ok(result)
    } else {
        Err("No profiling session".to_string())
    }
}

#[cfg(desktop)]
use tauri::menu::{Menu, MenuItem};
#[cfg(desktop)]
use tauri_plugin_autostart::MacosLauncher;
#[cfg(desktop)]
use tauri_plugin_global_shortcut::{Code, Modifiers, ShortcutState};

use tauri_plugin_notification::NotificationExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let sys = Arc::new(Mutex::new(System::new_all()));
    let slow_metrics = Arc::new(Mutex::new(SlowMetrics::default()));

    let app_state = AppState {
        sys: sys.clone(),
        slow_metrics: slow_metrics.clone(),
        profiling_session: Mutex::new(None),
    };

    spawn_slow_metrics_worker(slow_metrics);

    let mut builder = tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_notification::init());

    #[cfg(desktop)]
    {
        builder = builder
            .plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, Some(vec![])))
            .plugin(
                tauri_plugin_global_shortcut::Builder::new()
                    .with_shortcut("CommandOrControl+Shift+P")
                    .unwrap()
                    .with_shortcut("CommandOrControl+Shift+D")
                    .unwrap()
                    .with_handler(|app, shortcut, event| {
                        if event.state == ShortcutState::Pressed {
                            if shortcut.matches(Modifiers::CONTROL | Modifiers::SHIFT, Code::KeyP) || 
                               shortcut.matches(Modifiers::META | Modifiers::SHIFT, Code::KeyP) {
                                 let state = app.state::<AppState>();
                                 let is_profiling = state.profiling_session.lock().unwrap().is_some();
                                 
                                 if is_profiling {
                                    if let Ok(_) = stop_profiling_impl(app.app_handle(), &state) {
                                        let _ = app.notification()
                                            .builder()
                                            .title("CarbonLint")
                                            .body("Profiling stopped & saved!")
                                            .show();
                                    }
                                 } else {
                                    if let Ok(_) = start_profiling_impl(&state) {
                                        let _ = app.notification()
                                            .builder()
                                            .title("CarbonLint")
                                            .body("Profiling started!")
                                            .show();
                                    }
                                 }
                            } else if shortcut.matches(Modifiers::CONTROL | Modifiers::SHIFT, Code::KeyD) ||
                                      shortcut.matches(Modifiers::META | Modifiers::SHIFT, Code::KeyD) {
                                if let Some(window) = app.get_webview_window("main") {
                                    if window.is_visible().unwrap_or(false) {
                                        let _ = window.hide();
                                    } else {
                                        let _ = window.show();
                                        let _ = window.set_focus();
                                    }
                                }
                            }
                        }
                    })
                    .build()
            );
    }

    builder.setup(|app| {
        #[cfg(desktop)]
        {
            let icon_bytes = include_bytes!("../icons/icon.ico");
            let icon = tauri::image::Image::from_bytes(icon_bytes).expect("icon not found");
            
            let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
            let toggle_i = MenuItem::with_id(app, "toggle", "Show/Hide Dashboard", true, None::<&str>)?;
            let profile_i = MenuItem::with_id(app, "toggle_profiling", "Start/Stop Profiling", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&profile_i, &toggle_i, &quit_i])?;

            let _tray = tauri::tray::TrayIconBuilder::new()
                .icon(icon)
                .tooltip("CarbonLint Dashboard")
                .menu(&menu)
                .on_menu_event(|app, event| {
                    match event.id.as_ref() {
                        "quit" => {
                            app.exit(0);
                        }
                        "toggle" => {
                            if let Some(window) = app.get_webview_window("main") {
                                if window.is_visible().unwrap_or(false) {
                                    let _ = window.hide();
                                } else {
                                    let _ = window.show();
                                    let _ = window.set_focus();
                                }
                            }
                        }
                        "toggle_profiling" => {
                             let state = app.state::<AppState>();
                             let is_profiling = state.profiling_session.lock().unwrap().is_some();
                             
                             if is_profiling {
                                if let Ok(_) = stop_profiling_impl(app.app_handle(), &state) {
                                    let _ = app.notification()
                                        .builder()
                                        .title("CarbonLint")
                                        .body("Profiling stopped & saved!")
                                        .show();
                                }
                             } else {
                                if let Ok(_) = start_profiling_impl(&state) {
                                    let _ = app.notification()
                                        .builder()
                                        .title("CarbonLint")
                                        .body("Profiling started!")
                                        .show();
                                }
                             }
                        }
                        _ => {}
                    }
                })
                .build(app)?;
        }
                
        Ok(())
    })
    .manage(app_state)
    .on_window_event(|window, event| match event {
        tauri::WindowEvent::CloseRequested { api, .. } => {
            #[cfg(desktop)]
            {
                let _ = window.hide();
                api.prevent_close();
            }
        }
        _ => {}
    })
    .invoke_handler(tauri::generate_handler![
            get_current_stats,
            start_profiling,
            stop_profiling,
            get_profiling_status,
            get_runs,
            get_run,
            delete_run,
            get_stats_summary,
            get_settings,
            save_settings,
            get_carbon_intensity_data,
            get_hardware_profiles_data
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
