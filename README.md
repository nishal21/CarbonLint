<p align="center">
  <img src="https://raw.githubusercontent.com/nishal21/CarbonLint/main/docs/public/logo.png" alt="CarbonLint — Open Source Carbon Footprint Developer Tool" width="80" />
</p>

<h1 align="center">CarbonLint</h1>

<p align="center">
  <strong>The open-source carbon footprint monitoring tool for developers.</strong><br/>
  Track, measure, and reduce the energy consumption and CO₂ emissions of your software — in real time.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/carbonlint-cli"><img src="https://img.shields.io/npm/v/carbonlint-cli?style=flat-square&color=22c55e&label=npm" alt="carbonlint-cli npm version" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-22c55e?style=flat-square" alt="MIT License" /></a>
  <a href="https://nishal21.github.io/CarbonLint/"><img src="https://img.shields.io/badge/docs-live-22c55e?style=flat-square" alt="CarbonLint Documentation" /></a>
  <a href="https://github.com/nishal21/carbonlint/actions"><img src="https://img.shields.io/github/actions/workflow/status/nishal21/carbonlint/build.yml?style=flat-square&label=build" alt="GitHub Actions Build Status" /></a>
</p>

---

## What is CarbonLint?

**CarbonLint** is a free, open-source developer sustainability tool that monitors your software's energy consumption and calculates its carbon footprint in real time. It works as both a **desktop application** (built with Tauri and Rust) and a **CLI tool** (published on npm as [`carbonlint-cli`](https://www.npmjs.com/package/carbonlint-cli)) that integrates directly into CI/CD pipelines.

Software accounts for a growing share of global energy use. CarbonLint helps developers build greener software by providing visibility into the environmental cost of their code — from CPU and memory usage to estimated CO₂ emissions per coding session.

### Why CarbonLint?

- **Visibility** — Most developers have no idea how much energy their code consumes. CarbonLint makes this invisible cost visible.
- **Actionable** — Get a Green Score (0–100) for any project in seconds with region-specific carbon intensity data.
- **Automated** — Set carbon budgets in CI/CD to catch regressions before they ship.
- **Lightweight** — The desktop app uses < 5 MB RAM. The CLI has zero native dependencies.

## Key Features

| Feature | Description |
|---------|-------------|
| 📊 **Real-time system monitoring** | Track CPU, memory, disk I/O, network, and GPU usage live |
| 🌱 **Carbon footprint calculation** | Convert energy consumption to CO₂ using region-specific grid intensity |
| ⏱ **Profiling sessions** | Start/stop recording with `Ctrl+Shift+P` — get per-session energy breakdowns |
| 📈 **Weekly eco-reports** | Visualized trends of your coding sessions' environmental impact |
| 🔌 **CI/CD carbon budgets** | Fail builds that exceed emission thresholds with `carbonlint --ci` |
| 🖥 **Cross-platform** | Windows, macOS, Linux, and Android — one codebase, consistent UX |
| 🔋 **System tray mode** | Lightweight background process with global hotkey support |
| 📦 **npm CLI** | `npm install -g carbonlint-cli` — scan projects from the terminal |

## How It Works

CarbonLint calculates carbon emissions using a three-step model:

1. **Measure energy** — The desktop app reads hardware telemetry (CPU load, memory, disk, network) via Rust's `sysinfo` crate. The CLI estimates energy from file analysis.
2. **Apply carbon intensity** — Energy (kWh) is multiplied by the grid carbon intensity of your region (gCO₂/kWh). Sweden emits 25g per kWh; India emits 700g.
3. **Score and report** — A Green Score (0–100) summarizes your project's sustainability. Carbon budgets flag regressions.

## Project Architecture

```
carbonlint/
├── tauri-dashboard/     # Desktop app — Tauri 2 + React + Rust
│   ├── src/             #   React frontend (Dashboard, Reports, CI/CD, Settings)
│   └── src-tauri/       #   Rust backend (sysinfo, carbon calc, tray, hotkeys)
├── carbonlint-cli/      # CLI tool — Node.js, published on npm
│   ├── bin/             #   Entry point (carbonlint command)
│   └── src/             #   Scanner, reporter, config, data
├── docs/                # Documentation website — Vite + React + Tailwind CSS
└── .github/workflows/   # GitHub Actions CI/CD build pipeline
```

| Component | Built With |
|-----------|-----------|
| **Desktop App** | [Tauri 2](https://tauri.app), Rust, React 19, TypeScript, sysinfo |
| **CLI Tool** | Node.js 16+, Commander, Chalk, Ora |
| **Documentation** | Vite, React, Tailwind CSS v4 |

## Quick Start

### Install the CLI (Recommended for CI/CD)

```bash
npm install -g carbonlint-cli
```

```bash
# Initialize a config file in your project
carbonlint init

# Scan your project and get a Green Score
carbonlint .

# Scan with a specific region
carbonlint . --region EU-NORTH

# CI/CD mode — exit code 1 if carbon budget exceeded
carbonlint . --ci --budget 50

# JSON output for pipeline parsers
carbonlint . --json
```

### Download the Desktop App

Download CarbonLint for Windows, macOS, Linux, or Android from the [Downloads page](https://nishal21.github.io/carbonlint/#/downloads).

Or build from source:

```bash
cd tauri-dashboard
npm install
npm run tauri dev
```

## Carbon Intensity Regions

CarbonLint uses region-specific electricity grid carbon intensity data to calculate emissions accurately. The same data is shared between the desktop app and CLI:

| Region Key | Location | Carbon Intensity (gCO₂/kWh) | Notes |
|-----------|----------|------------------------------|-------|
| `EU-NORTH` | Sweden | 25 | Cleanest — mostly hydro and nuclear |
| `US-WEST` | California | 210 | Solar and wind mix |
| `EU-WEST` | Ireland | 300 | Wind + gas mix |
| `US-EAST` | Virginia | 380 | Data center hub, heavier fossil |
| `ASIA-EAST` | Japan | 470 | Nuclear + fossil |
| `GLOBAL-AVG` | Global Average | 475 | Default if no region specified |
| `ASIA-SOUTH` | India | 700 | Coal-heavy grid |

> **Tip:** Set your region in `.carbonlintrc.json` or with `--region` for accurate results. Running in Sweden vs India can differ by **28x** for the same code.

## CI/CD Integration

### GitHub Actions

```yaml
name: Carbon Audit
on: [push, pull_request]

jobs:
  carbon-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install CarbonLint CLI
        run: npm install -g carbonlint-cli
      - name: Run carbon audit
        run: carbonlint . --ci --budget 100 --region GLOBAL-AVG
```

### GitLab CI

```yaml
carbon-audit:
  image: node:20-slim
  stage: test
  script:
    - npm install -g carbonlint-cli
    - carbonlint . --ci --budget 100
  allow_failure: false
```

### Jenkins Pipeline

```groovy
stage('Carbon Audit') {
    steps {
        sh 'npm install -g carbonlint-cli'
        sh 'carbonlint . --ci --budget 100'
    }
}
```

## Keyboard Shortcuts

| Shortcut | Action | Scope |
|----------|--------|-------|
| `Ctrl+Shift+P` (`⌘+Shift+P` on Mac) | Start / Stop profiling | Global |
| `Ctrl+Shift+D` (`⌘+Shift+D` on Mac) | Show / Hide dashboard | Global |

Right-click the system tray icon for additional controls: Start/Stop Profiling, Show/Hide, and Quit.

## Configuration

Both the desktop app and CLI share the same configuration format. Create `.carbonlintrc.json` with `carbonlint init`:

```json
{
  "region": "GLOBAL-AVG",
  "hardwareProfile": "laptop",
  "pue": 1.0,
  "maxCarbon": 100,
  "failOnThreshold": false
}
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `region` | string | `GLOBAL-AVG` | Grid carbon intensity region |
| `hardwareProfile` | string | `laptop` | Hardware type: `laptop`, `desktop`, or `server` |
| `pue` | number | `1.0` | Power Usage Effectiveness (data centre overhead factor) |
| `maxCarbon` | number | `100` | Carbon budget in grams |
| `failOnThreshold` | boolean | `false` | Exit 1 when budget exceeded (for CI/CD) |

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 16
- [Rust](https://rustup.rs/) (for desktop app only)

### Desktop App

```bash
cd tauri-dashboard
npm install
npm run tauri dev        # Start dev server with hot reload
npm run tauri build      # Build production binaries
```

### CLI Tool

```bash
cd carbonlint-cli
npm install
node bin/carbonlint.js . # Run locally without global install
```

### Documentation Site

```bash
cd docs
npm install
npm run dev              # http://localhost:5173/carbonlint/
npm run build            # Static build for deployment
```

## Frequently Asked Questions

### What is carbon footprint monitoring for software?

Carbon footprint monitoring for software measures how much energy your code consumes during development and in production, then converts that energy usage into CO₂ equivalent emissions using regional grid carbon intensity data.

### How accurate is CarbonLint?

The desktop app reads real hardware telemetry (CPU utilization, memory, disk I/O) with ±2% accuracy via Rust's `sysinfo` crate. The CLI provides estimates based on file analysis — useful for CI/CD gating but less precise than real-time hardware monitoring.

### Is CarbonLint free?

Yes. CarbonLint is 100% free, open-source, and MIT licensed. There are no paid tiers, no telemetry, and no data collection.

### What platforms does CarbonLint support?

CarbonLint runs on **Windows** (10+), **macOS** (10.15+, Intel & Apple Silicon), **Linux** (Debian, Ubuntu, AppImage), and **Android** (8.0+). The CLI runs anywhere Node.js runs.

### How does CarbonLint compare to other green coding tools?

CarbonLint is one of the first tools to combine real-time hardware monitoring with CI/CD carbon budgeting in a single, free, cross-platform package. Unlike cloud-only solutions, it works entirely offline and runs locally on your machine.

### Can I use CarbonLint in CI/CD pipelines?

Yes. Install the CLI with `npm install -g carbonlint-cli`, then run `carbonlint . --ci --budget 100` in your pipeline. It exits with code 1 if the carbon budget is exceeded, which fails the build.

## Links

| Resource | URL |
|----------|-----|
| 🌐 Website | [nishal21.github.io/carbonlint](https://nishal21.github.io/carbonlint/) |
| 📦 npm Package | [npmjs.com/package/carbonlint-cli](https://www.npmjs.com/package/carbonlint-cli) |
| 🐛 Issues | [github.com/nishal21/carbonlint/issues](https://github.com/nishal21/carbonlint/issues) |
| 📖 Documentation | [CarbonLint Docs](https://nishal21.github.io/carbonlint/) |
| 🪞 Mirror | [carbonlint.netlify.app](https://carbonlint.netlify.app) |

## Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Nishal K](https://github.com/nishal21)

---

<p align="center">
  Made with 💚 for a greener future.<br/>
  <sub>CarbonLint — sustainable software development, carbon footprint tracker, green coding, eco-friendly developer tools</sub>
</p>
