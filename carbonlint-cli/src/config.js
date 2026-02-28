import fs from 'node:fs';
import path from 'node:path';
import { DEFAULTS } from './data.js';

const CONFIG_FILE = '.carbonlintrc.json';

export function findConfig(dir) {
    let current = path.resolve(dir);
    while (true) {
        const candidate = path.join(current, CONFIG_FILE);
        if (fs.existsSync(candidate)) return candidate;
        const parent = path.dirname(current);
        if (parent === current) break;
        current = parent;
    }
    return null;
}

export function loadConfig(dir) {
    const configPath = findConfig(dir);
    if (!configPath) return { ...DEFAULTS };
    try {
        const raw = fs.readFileSync(configPath, 'utf-8');
        return { ...DEFAULTS, ...JSON.parse(raw) };
    } catch {
        return { ...DEFAULTS };
    }
}

export function createConfig(dir) {
    const configPath = path.join(path.resolve(dir), CONFIG_FILE);
    if (fs.existsSync(configPath)) return { created: false, path: configPath };
    const config = {
        region: DEFAULTS.region,
        hardwareProfile: DEFAULTS.hardwareProfile,
        pue: DEFAULTS.pue,
        maxCarbon: DEFAULTS.maxCarbon,
        failOnThreshold: DEFAULTS.failOnThreshold,
    };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
    return { created: true, path: configPath };
}
