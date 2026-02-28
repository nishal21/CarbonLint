import fs from 'node:fs';
import path from 'node:path';
import { FILE_WEIGHTS, REGIONS, HARDWARE } from './data.js';

// Directories to always skip
const SKIP_DIRS = new Set([
    'node_modules', '.git', '.svn', '.hg', 'dist', 'build', 'out',
    '.next', '.nuxt', '.output', '__pycache__', '.venv', 'venv',
    'target', 'vendor', '.cache', '.parcel-cache', 'coverage',
    '.turbo', '.vercel', '.netlify',
]);

export function scanProject(targetPath, config = {}) {
    const root = path.resolve(targetPath);
    const files = [];
    const warnings = [];

    walk(root, files, warnings);

    // Compute totals
    const totalFiles = files.length;
    const totalSize = files.reduce((s, f) => s + f.size, 0);
    const totalWeight = files.reduce((s, f) => s + f.weight, 0);

    // Estimate energy: weighted file score → simulated kWh
    // Baseline: 1000 weight-units ≈ 0.01 kWh (a reasonable dev-build estimate)
    const baseEnergy_kWh = (totalWeight / 1000) * 0.01;

    // PUE factor (Power Usage Effectiveness — data centre overhead)
    const pue = config.pue || 1.0;
    const energy_kWh = baseEnergy_kWh * pue;

    // Carbon
    const regionKey = (config.region || 'GLOBAL-AVG').toUpperCase();
    const region = REGIONS[regionKey] || REGIONS['GLOBAL-AVG'];
    const carbon_grams = energy_kWh * region.gco2_kwh;

    // Green Score (0-100) — lower carbon = higher score
    const budget = config.maxCarbon || 100;
    const ratio = carbon_grams / budget;
    const greenScore = Math.max(0, Math.min(100, Math.round(100 - ratio * 50)));

    // Breakdown by extension
    const byExt = {};
    for (const f of files) {
        if (!byExt[f.ext]) byExt[f.ext] = { count: 0, size: 0, weight: 0 };
        byExt[f.ext].count++;
        byExt[f.ext].size += f.size;
        byExt[f.ext].weight += f.weight;
    }

    // Sort by weight desc
    const breakdown = Object.entries(byExt)
        .sort((a, b) => b[1].weight - a[1].weight)
        .map(([ext, data]) => ({ ext, ...data }));

    // Heavy asset warnings
    for (const f of files) {
        if (f.size > 512 * 1024 && /\.(png|jpg|jpeg|gif|mp4|webm|bmp|tiff)$/i.test(f.ext)) {
            warnings.push({
                type: 'heavy-asset',
                file: path.relative(root, f.path),
                size: f.size,
                message: `Heavy asset: ${path.relative(root, f.path)} (${(f.size / 1024).toFixed(0)} KB)`,
            });
        }
    }

    return {
        root,
        totalFiles,
        totalSize,
        totalWeight,
        energy_kWh,
        carbon_grams,
        greenScore,
        region: { key: regionKey, ...region },
        budget,
        overBudget: carbon_grams > budget,
        breakdown,
        warnings,
    };
}

function walk(dir, files, warnings) {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
    catch { return; }

    for (const entry of entries) {
        if (entry.name.startsWith('.') && entry.name !== '.env') continue;
        const full = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            if (SKIP_DIRS.has(entry.name)) continue;
            walk(full, files, warnings);
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            let size;
            try { size = fs.statSync(full).size; } catch { continue; }
            const weight = (FILE_WEIGHTS[ext] || 0.05) * (size / 1024); // weight per KB
            files.push({ path: full, ext, size, weight });
        }
    }
}
