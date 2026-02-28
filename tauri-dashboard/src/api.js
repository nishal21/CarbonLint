import { invoke } from '@tauri-apps/api/core';

/**
 * Helper to call Tauri commands
 */
async function callTauri(command, args = {}) {
    try {
        return await invoke(command, args);
    } catch (error) {
        console.error(`Tauri Command Error (${command}):`, error);
        throw error;
    }
}

// ============================================
// Stats API
// ============================================

export async function getCurrentStats() {
    return callTauri('get_current_stats');
}

export async function getStatsSummary() {
    return callTauri('get_stats_summary');
}

// ============================================
// Runs API
// ============================================

export async function getRuns(options = {}) {
    return callTauri('get_runs');
}

export async function getRun(id) {
    return callTauri('get_run', { id });
}

export async function deleteRun(id) {
    return callTauri('delete_run', { id });
}

// ============================================
// Profiling API
// ============================================

export async function getProfilingStatus() {
    return callTauri('get_profiling_status');
}

export async function startProfiling(options = {}) {
    return callTauri('start_profiling', { options });
}

export async function stopProfiling() {
    return callTauri('stop_profiling');
}

// ============================================
// Settings API
// ============================================

export async function getSettings() {
    return callTauri('get_settings');
}

export async function saveSettings(settings) {
    return callTauri('save_settings', { settings });
}

export async function enableAutostart(enable) {
    if (enable) {
        return invoke('plugin:autostart|enable');
    } else {
        return invoke('plugin:autostart|disable');
    }
}

export async function isAutostartEnabled() {
    try {
        return await invoke('plugin:autostart|is_enabled');
    } catch (e) {
        return false;
    }
}

// ============================================
// Carbon Data API
// ============================================

export async function getCarbonIntensity() {
    return callTauri('get_carbon_intensity_data');
}

export async function getHardwareProfiles() {
    return callTauri('get_hardware_profiles_data');
}

// ============================================
// Helpers
// ============================================

export function getImpactLevel(carbonGrams) {
    if (carbonGrams < 1) return { level: 'LOW', color: 'low' };
    if (carbonGrams < 10) return { level: 'MEDIUM', color: 'medium' };
    if (carbonGrams < 100) return { level: 'HIGH', color: 'high' };
    return { level: 'EXTREME', color: 'extreme' };
}

export function calculateEquivalents(carbonGrams) {
    return {
        smartphoneCharges: (carbonGrams / 8.22).toFixed(2),
        googleSearches: (carbonGrams / 0.2).toFixed(1),
        kmDrivenCar: (carbonGrams / 120).toFixed(3),
        hoursStreamingVideo: (carbonGrams / 36).toFixed(2),
    };
}
