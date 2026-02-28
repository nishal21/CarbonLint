import chalk from 'chalk';

const g = chalk.green;
const y = chalk.yellow;
const r = chalk.red;
const d = chalk.dim;
const b = chalk.bold;

export function printReport(result) {
    const hr = d('─'.repeat(56));

    console.log();
    console.log(b(g('  🌿 CarbonLint')) + d(' — Carbon Footprint Report'));
    console.log(hr);
    console.log();

    // Green Score
    const scoreColor = result.greenScore >= 80 ? g : result.greenScore >= 50 ? y : r;
    const scoreBar = buildBar(result.greenScore);
    console.log(`  ${b('Green Score')}  ${scoreColor(b(result.greenScore + '/100'))} ${scoreLabel(result.greenScore)}`);
    console.log(`  ${scoreBar}`);
    console.log();

    // Stats
    console.log(`  ${d('Files scanned')}     ${b(result.totalFiles.toLocaleString())}`);
    console.log(`  ${d('Total size')}        ${b(formatBytes(result.totalSize))}`);
    console.log(`  ${d('Region')}            ${b(result.region.key)} ${d('(' + result.region.name + ', ' + result.region.gco2_kwh + ' gCO₂/kWh)')}`);
    console.log(`  ${d('Est. energy')}       ${b(result.energy_kWh.toFixed(6))} ${d('kWh')}`);
    console.log(`  ${d('Est. CO₂')}          ${carbonColor(result.carbon_grams, result.budget)(b(result.carbon_grams.toFixed(4) + 'g'))}`);
    console.log(`  ${d('Budget')}            ${b(result.budget + 'g')} ${result.overBudget ? r('⚠ OVER BUDGET') : g('✓ within budget')}`);
    console.log();

    // Breakdown table
    if (result.breakdown.length > 0) {
        console.log(`  ${b('File Breakdown')} ${d('(top 10 by weight)')}`);
        console.log(`  ${d('Ext'.padEnd(10))} ${'Count'.padStart(7)}  ${'Size'.padStart(10)}  ${'Weight'.padStart(10)}`);
        console.log(`  ${d('─'.repeat(42))}`);
        for (const row of result.breakdown.slice(0, 10)) {
            console.log(
                `  ${(row.ext || '(none)').padEnd(10)} ${String(row.count).padStart(7)}  ${formatBytes(row.size).padStart(10)}  ${row.weight.toFixed(1).padStart(10)}`
            );
        }
        console.log();
    }

    // Warnings
    if (result.warnings.length > 0) {
        console.log(`  ${y(b('⚠ Warnings'))} ${d('(' + result.warnings.length + ')')}`);
        for (const w of result.warnings.slice(0, 5)) {
            console.log(`  ${y('›')} ${w.message}`);
        }
        if (result.warnings.length > 5) {
            console.log(`  ${d('  ... and ' + (result.warnings.length - 5) + ' more')}`);
        }
        console.log();
    }

    console.log(hr);
    console.log(d('  Powered by CarbonLint — https://nishal21.github.io/carbonlint/'));
    console.log();
}

export function printJson(result) {
    const output = {
        version: '1.0.0',
        greenScore: result.greenScore,
        files: result.totalFiles,
        totalSizeBytes: result.totalSize,
        region: result.region.key,
        regionName: result.region.name,
        carbonIntensity_gCO2_kWh: result.region.gco2_kwh,
        estimatedEnergy_kWh: Number(result.energy_kWh.toFixed(6)),
        estimatedCarbon_grams: Number(result.carbon_grams.toFixed(4)),
        budget_grams: result.budget,
        overBudget: result.overBudget,
        breakdown: result.breakdown,
        warnings: result.warnings.map(w => w.message),
    };
    console.log(JSON.stringify(output, null, 2));
}

// ── Helpers ──

function buildBar(score) {
    const width = 30;
    const filled = Math.round((score / 100) * width);
    const empty = width - filled;
    const color = score >= 80 ? g : score >= 50 ? y : r;
    return d('[') + color('█'.repeat(filled)) + d('░'.repeat(empty)) + d(']');
}

function scoreLabel(score) {
    if (score >= 90) return g('(Excellent)');
    if (score >= 75) return g('(Good)');
    if (score >= 50) return y('(Fair)');
    if (score >= 25) return y('(Needs Work)');
    return r('(Poor)');
}

function carbonColor(grams, budget) {
    if (grams > budget) return r;
    if (grams > budget * 0.8) return y;
    return g;
}

function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
