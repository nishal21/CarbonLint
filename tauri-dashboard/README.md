# CarbonLint (Tauri Edition)

This is the migrated version of CarbonLint using Tauri + React + Vite.

## Status
- **Frontend**: Successfully migrated from `dashboard/`.
- **Backend**: Hybrid.
    - React app still calls `http://localhost:3001` (Node.js server) for most data.
    - Rust backend (`src-tauri`) is initialized with `sysinfo` for native system stats.
    - A test command `get_system_stats` is implemented in Rust.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Mode**:
    ```bash
    npm run tauri dev
    ```

## Next Steps (Migration)
To fully replace Electron:
1.  Port logic from `dashboard/server/index.js` to `src-tauri/src/lib.rs`.
2.  Update `src/api.js` to use `window.__TAURI__.invoke('command_name')` instead of `fetch()`.
