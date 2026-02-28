// CarbonLint CLI — Carbon intensity data per region (gCO₂/kWh)
// Source: matches the Tauri desktop app's get_carbon_intensity_map()

export const REGIONS = {
    'US-WEST': { name: 'California, US', gco2_kwh: 210 },
    'US-EAST': { name: 'Virginia, US', gco2_kwh: 380 },
    'EU-WEST': { name: 'Ireland, EU', gco2_kwh: 300 },
    'EU-NORTH': { name: 'Sweden, EU', gco2_kwh: 25 },
    'ASIA-EAST': { name: 'Japan', gco2_kwh: 470 },
    'ASIA-SOUTH': { name: 'India', gco2_kwh: 700 },
    'GLOBAL-AVG': { name: 'Global Average', gco2_kwh: 475 },
};

// Hardware power profiles (watts)
export const HARDWARE = {
    laptop: { cpu_tdp: 15, mem_per_gb: 0.3 },
    desktop: { cpu_tdp: 65, mem_per_gb: 0.4 },
    server: { cpu_tdp: 150, mem_per_gb: 0.5 },
};

// File type weights — how much relative energy different files consume during build
export const FILE_WEIGHTS = {
    // Heavy compile / transpile
    '.ts': 1.0, '.tsx': 1.0, '.jsx': 1.0,
    '.rs': 1.2, '.cpp': 1.2, '.c': 1.0,
    '.java': 1.1, '.go': 0.9, '.cs': 1.1,
    // Normal
    '.js': 0.6, '.mjs': 0.6, '.cjs': 0.6,
    '.py': 0.5, '.rb': 0.5, '.php': 0.5,
    // Styles / markup
    '.css': 0.3, '.scss': 0.4, '.less': 0.4,
    '.html': 0.2, '.vue': 0.8, '.svelte': 0.8,
    // Config / docs (minimal)
    '.json': 0.1, '.yaml': 0.1, '.yml': 0.1,
    '.toml': 0.1, '.xml': 0.1, '.md': 0.05,
    '.txt': 0.02, '.env': 0.01,
    // Assets (energy comes from bundling/optimizing)
    '.png': 0.15, '.jpg': 0.15, '.jpeg': 0.15,
    '.gif': 0.15, '.svg': 0.1, '.webp': 0.1,
    '.ico': 0.05, '.mp4': 0.2, '.webm': 0.2,
    '.woff': 0.05, '.woff2': 0.05, '.ttf': 0.05,
};

// Default config values — matches Tauri's AppSettings defaults
export const DEFAULTS = {
    region: 'GLOBAL-AVG',
    hardwareProfile: 'laptop',
    pue: 1.0,
    maxCarbon: 100,     // grams
    maxEnergy: 0.5,     // kWh
    failOnThreshold: false,
};
