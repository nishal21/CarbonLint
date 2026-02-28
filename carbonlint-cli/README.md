# carbonlint-cli

> **The command-line carbon footprint scanner for developers.** Estimate CO₂ emissions of your codebase and set carbon budgets in CI/CD pipelines.

[![npm version](https://img.shields.io/npm/v/carbonlint-cli?style=flat-square&color=22c55e)](https://www.npmjs.com/package/carbonlint-cli)
[![MIT License](https://img.shields.io/badge/license-MIT-22c55e?style=flat-square)](LICENSE)
[![Downloads](https://img.shields.io/npm/dm/carbonlint-cli?style=flat-square&color=22c55e)](https://www.npmjs.com/package/carbonlint-cli)

**carbonlint-cli** scans your project files, estimates energy consumption based on file types and complexity, and calculates CO₂ emissions using region-specific grid carbon intensity data. Use it locally or as a CI/CD gate to prevent carbon regressions.

Part of the [CarbonLint](https://nishal21.github.io/carbonlint/) ecosystem — the open-source sustainability toolkit for developers.

## Install

```bash
npm install -g carbonlint-cli
```

Requires Node.js ≥ 16. Zero native dependencies.

## Usage

```bash
# Initialize config in your project
carbonlint init

# Scan current directory
carbonlint .

# Scan with a specific region
carbonlint . --region EU-NORTH

# Set a carbon budget (grams CO₂)
carbonlint . --budget 50

# CI/CD mode — exit code 1 if over budget
carbonlint . --ci --budget 100

# JSON output for pipeline parsers
carbonlint . --json

# Use a different hardware profile
carbonlint . --profile server
```

## Sample Output

```
🌿 CarbonLint — Carbon Footprint Report
────────────────────────────────────────────────────────

  Green Score  99/100 (Excellent)
  [██████████████████████████████]

  Files scanned     120
  Total size        1.9 MB
  Region            GLOBAL-AVG (Global Average, 475 gCO₂/kWh)
  Est. energy       0.004662 kWh
  Est. CO₂          2.2144g
  Budget            100g ✓ within budget

  File Breakdown (top 10 by weight)
  Ext          Count        Size      Weight
  ──────────────────────────────────────────
  .tsx            18    120.9 KB       120.9
  .jsx            12    100.7 KB       100.7
  .json           18    780.5 KB        78.0
  .rs              3     35.7 KB        42.8
  .js             10     30.2 KB        18.1
```

## CLI Commands and Options

| Command / Flag | Description | Default |
|----------------|-------------|---------|
| `carbonlint init` | Create `.carbonlintrc.json` config file | — |
| `carbonlint [path]` | Scan project directory | `.` |
| `-r, --region <key>` | Carbon intensity region | `GLOBAL-AVG` |
| `-b, --budget <grams>` | Carbon budget threshold | `100` |
| `--profile <type>` | Hardware: `laptop`, `desktop`, `server` | `laptop` |
| `--json` | Output structured JSON | — |
| `--ci` | Exit code 1 if over budget | — |
| `-V, --version` | Show version | — |

## Carbon Intensity Regions

Emissions vary dramatically by region. The same code running in Sweden produces **28× less CO₂** than in India.

| Region | Location | gCO₂/kWh |
|--------|----------|-----------|
| `EU-NORTH` | Sweden | 25 |
| `US-WEST` | California | 210 |
| `EU-WEST` | Ireland | 300 |
| `US-EAST` | Virginia | 380 |
| `ASIA-EAST` | Japan | 470 |
| `GLOBAL-AVG` | Global Average | 475 |
| `ASIA-SOUTH` | India | 700 |

## Configuration

Create `.carbonlintrc.json` with `carbonlint init`:

```json
{
  "region": "GLOBAL-AVG",
  "hardwareProfile": "laptop",
  "pue": 1.0,
  "maxCarbon": 100,
  "failOnThreshold": false
}
```

## CI/CD Integration

### GitHub Actions

```yaml
- name: Carbon Audit
  run: |
    npm install -g carbonlint-cli
    carbonlint . --ci --budget 100 --region US-WEST
```

### GitLab CI

```yaml
carbon-audit:
  image: node:20-slim
  script:
    - npm install -g carbonlint-cli
    - carbonlint . --ci --budget 100
```

### Jenkins

```groovy
stage('Carbon Audit') {
    steps {
        sh 'npm install -g carbonlint-cli'
        sh 'carbonlint . --ci --budget 100'
    }
}
```

## Programmatic API

Use carbonlint-cli as a library in your own Node.js tools:

```js
import { scanProject, loadConfig, REGIONS } from 'carbonlint-cli';

const config = loadConfig('.');
const result = scanProject('.', config);

console.log(result.greenScore);     // 0–100
console.log(result.carbon_grams);   // CO₂ in grams
console.log(result.overBudget);     // boolean
console.log(result.breakdown);      // per-extension breakdown
```

## How It Works

1. **Walk** — Recursively scan the project directory, skipping `node_modules`, `.git`, `dist`, etc.
2. **Weigh** — Each file is assigned an energy weight based on its type (`.rs` = 1.2, `.tsx` = 1.0, `.json` = 0.1) and size.
3. **Calculate** — Total weight → estimated energy (kWh) → CO₂ (grams) using your region's grid carbon intensity.
4. **Score** — A Green Score (0–100) summarizes the result. Warnings flag heavy assets (images > 500 KB).

## FAQ

### What is a carbon budget for code?

A carbon budget is a maximum CO₂ emission threshold for your project. When you run `carbonlint . --ci --budget 50`, the tool exits with code 1 if the estimated emissions exceed 50 grams — failing your build and preventing carbon regressions.

### Is this the same data as the CarbonLint desktop app?

Yes. The CLI uses identical region data, hardware profiles, and default settings as the [CarbonLint Tauri desktop app](https://nishal21.github.io/carbonlint/). Both tools share the same carbon intensity database.

### Does CarbonLint send any data?

No. CarbonLint is fully offline. No telemetry, no network requests, no data collection.

## Links

- 🌐 **Website:** [nishal21.github.io/carbonlint](https://nishal21.github.io/carbonlint/)
- 📦 **npm:** [npmjs.com/package/carbonlint-cli](https://www.npmjs.com/package/carbonlint-cli)
- 🖥 **Desktop App:** [CarbonLint Downloads](https://nishal21.github.io/carbonlint/#/downloads)
- 🐛 **Issues:** [github.com/nishal21/carbonlint/issues](https://github.com/nishal21/carbonlint/issues)

## License

MIT © [Nishal K](https://github.com/nishal21)
