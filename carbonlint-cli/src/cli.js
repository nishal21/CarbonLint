import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { createConfig, loadConfig } from './config.js';
import { scanProject } from './scanner.js';
import { printReport, printJson } from './reporter.js';
import { REGIONS } from './data.js';

export function run() {
    const program = new Command();

    program
        .name('carbonlint')
        .description('Measure and track the carbon footprint of your software projects')
        .version('1.0.0');

    // ── Init command ──
    program
        .command('init')
        .description('Create a .carbonlintrc.json config file in the current directory')
        .action(() => {
            const result = createConfig('.');
            if (result.created) {
                console.log(chalk.green('✓') + ` Created ${chalk.bold('.carbonlintrc.json')} in project root`);
                console.log(chalk.dim('  Edit it to set region, budget, and hardware profile.'));
            } else {
                console.log(chalk.yellow('!') + ' .carbonlintrc.json already exists at ' + chalk.dim(result.path));
            }
        });

    // ── Scan (default) command ──
    program
        .argument('[path]', 'Path to project directory to scan', '.')
        .option('-r, --region <region>', 'Carbon intensity region', '')
        .option('-b, --budget <grams>', 'Carbon budget in grams', '')
        .option('--json', 'Output results as JSON')
        .option('--ci', 'CI mode: exit with code 1 if over budget')
        .option('--profile <profile>', 'Hardware profile (laptop/desktop/server)', '')
        .action(async (targetPath, options) => {
            // Load config, apply CLI overrides
            const config = loadConfig(targetPath);
            if (options.region) config.region = options.region;
            if (options.budget) config.maxCarbon = Number(options.budget);
            if (options.profile) config.hardwareProfile = options.profile;
            if (options.ci) config.failOnThreshold = true;

            // Validate region
            const regionKey = config.region.toUpperCase();
            if (!REGIONS[regionKey]) {
                console.error(chalk.red('✗') + ` Unknown region: ${config.region}`);
                console.error(chalk.dim('  Available: ' + Object.keys(REGIONS).join(', ')));
                process.exit(1);
            }

            const spinner = options.json ? null : ora('Scanning project...').start();

            try {
                const result = scanProject(targetPath, config);

                if (spinner) spinner.succeed(`Scanned ${result.totalFiles} files`);

                if (options.json) {
                    printJson(result);
                } else {
                    printReport(result);
                }

                // CI gate
                if (config.failOnThreshold && result.overBudget) {
                    if (!options.json) {
                        console.log(chalk.red.bold('  ✗ CI CHECK FAILED') + chalk.dim(` — carbon ${result.carbon_grams.toFixed(4)}g exceeds budget ${result.budget}g`));
                        console.log();
                    }
                    process.exit(1);
                }
            } catch (err) {
                if (spinner) spinner.fail('Scan failed');
                console.error(chalk.red(err.message));
                process.exit(1);
            }
        });

    program.parse();
}
