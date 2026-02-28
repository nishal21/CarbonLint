import { SEOHead } from '../components/SEOHead';

export function ShortcutsPage() {
    const globalShortcuts = [
        {
            keys: ['Ctrl', 'Shift', 'P'],
            macKeys: ['⌘', 'Shift', 'P'],
            action: 'Toggle Profiling',
            desc: 'Start or stop a carbon profiling session. A notification confirms the action.',
            category: 'Global',
        },
        {
            keys: ['Ctrl', 'Shift', 'D'],
            macKeys: ['⌘', 'Shift', 'D'],
            action: 'Show / Hide Dashboard',
            desc: 'Toggle the CarbonLint dashboard window visibility without quitting the app.',
            category: 'Global',
        },
    ];

    const trayActions = [
        {
            icon: 'play_circle',
            action: 'Start / Stop Profiling',
            desc: 'Toggle a profiling session from the system tray menu. Works identically to the keyboard shortcut.',
        },
        {
            icon: 'visibility',
            action: 'Show / Hide Dashboard',
            desc: 'Toggle the main window visibility. The app continues monitoring in the background.',
        },
        {
            icon: 'close',
            action: 'Quit CarbonLint',
            desc: 'Stop all background processes and fully exit the application.',
        },
    ];

    const dashboardPages = [
        { name: 'Dashboard', desc: 'Real-time CPU, memory, disk, network, and GPU stats with live carbon output', icon: 'dashboard', path: '/' },
        { name: 'Reports', desc: 'View saved profiling session reports with energy and CO₂ breakdowns', icon: 'description', path: '/reports' },
        { name: 'History', desc: 'Browse historical session data with trend analysis over time', icon: 'history', path: '/history' },
        { name: 'Compare', desc: 'Side-by-side comparison of two profiling sessions', icon: 'compare_arrows', path: '/compare' },
        { name: 'Suggestions', desc: 'AI-powered tips to reduce your code\u0027s carbon footprint', icon: 'lightbulb', path: '/suggestions' },
        { name: 'CI/CD', desc: 'Configure carbon budgets and pipeline integration for automated checks', icon: 'terminal', path: '/cicd' },
        { name: 'Settings', desc: 'Configure region, hardware profile, budgets, notifications, and autostart', icon: 'settings', path: '/settings' },
        { name: 'About', desc: 'Version info, license, and links to the project\u0027s resources', icon: 'info', path: '/about' },
    ];

    return (
        <>
            <SEOHead
                title="Keyboard Shortcuts & Controls — CarbonLint Reference"
                description="Complete CarbonLint controls reference: Ctrl+Shift+P to toggle profiling, Ctrl+Shift+D to show/hide dashboard, plus system tray actions and dashboard navigation guide."
                path="/shortcuts"
            />

            {/* ─── HERO ─── */}
            <section className="relative pt-8 pb-16 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 gradient-mesh -z-10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-primary/[0.06] rounded-full blur-[120px] -z-10" />

                <div className="max-w-3xl mx-auto animate-fade-in">
                    <div className="badge-pill mx-auto w-fit mb-6">
                        <span className="material-symbols-outlined text-sm">keyboard</span>
                        Controls Reference
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                        Shortcuts <span className="gradient-text">& Controls</span>
                    </h1>
                    <p className="text-lg text-white/50 max-w-xl mx-auto">
                        Full control of CarbonLint from your keyboard, system tray, or dashboard — without interrupting your workflow.
                    </p>
                </div>
            </section>

            {/* ─── GLOBAL SHORTCUTS ─── */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 pb-16">
                <div className="flex items-center gap-3 mb-6">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-xl">keyboard</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Global Keyboard Shortcuts</h2>
                        <p className="text-xs text-white/30">Work system-wide, even when CarbonLint is in the background</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {globalShortcuts.map((shortcut, i) => (
                        <div key={i} className="glass-card glow-border rounded-2xl p-6 group hover:bg-surface-overlay transition-all duration-300">
                            {/* Windows/Linux keys */}
                            <div className="mb-4">
                                <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold mb-2">Windows / Linux</p>
                                <div className="flex items-center gap-1.5">
                                    {shortcut.keys.map((key, j) => (
                                        <span key={j} className="flex items-center gap-1.5">
                                            {j > 0 && <span className="text-white/15 text-xs">+</span>}
                                            <span className="kbd-key group-hover:border-primary/30 group-hover:shadow-[0_0_12px_rgba(34,197,94,0.1)]">{key}</span>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* macOS keys */}
                            <div className="mb-5">
                                <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold mb-2">macOS</p>
                                <div className="flex items-center gap-1.5">
                                    {shortcut.macKeys.map((key, j) => (
                                        <span key={j} className="flex items-center gap-1.5">
                                            {j > 0 && <span className="text-white/15 text-xs">+</span>}
                                            <span className="kbd-key group-hover:border-primary/30">{key}</span>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Info */}
                            <h3 className="text-lg font-bold mb-1">{shortcut.action}</h3>
                            <p className="text-sm text-white/40">{shortcut.desc}</p>

                            <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg bg-primary/10 text-primary mt-4">
                                {shortcut.category}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── SYSTEM TRAY ─── */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 pb-16">
                <div className="flex items-center gap-3 mb-6">
                    <div className="size-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
                        <span className="material-symbols-outlined text-xl">dock_to_bottom</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">System Tray Menu</h2>
                        <p className="text-xs text-white/30">Right-click the CarbonLint icon in your system tray</p>
                    </div>
                </div>

                <div className="glass-card rounded-2xl divide-y divide-white/[0.04] overflow-hidden">
                    {trayActions.map((action, i) => (
                        <div key={i} className="flex items-center gap-5 p-5 hover:bg-white/[0.02] transition-colors group">
                            <div className="size-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-lg">{action.icon}</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm mb-0.5">{action.action}</h3>
                                <p className="text-xs text-white/40">{action.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── DASHBOARD NAVIGATION ─── */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 pb-16">
                <div className="flex items-center gap-3 mb-6">
                    <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                        <span className="material-symbols-outlined text-xl">grid_view</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Dashboard Pages</h2>
                        <p className="text-xs text-white/30">Navigate via the sidebar in the CarbonLint app</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {dashboardPages.map((page, i) => (
                        <div key={i} className="glass-card rounded-xl p-5 flex items-start gap-4 group hover:bg-surface-overlay transition-all cursor-default">
                            <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-lg">{page.icon}</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                    <h3 className="font-bold text-sm">{page.name}</h3>
                                    <code className="text-[10px] text-white/15 bg-white/[0.04] px-1.5 py-0.5 rounded font-mono">{page.path}</code>
                                </div>
                                <p className="text-xs text-white/40">{page.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── PRO TIPS ─── */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 pb-24">
                <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-l-2xl" />
                    <div className="pl-6">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-primary text-2xl">tips_and_updates</span>
                            <h2 className="text-xl font-bold">Pro Tips</h2>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-white/50">
                                <span className="text-primary mt-0.5">•</span>
                                <span>Use <span className="kbd-key kbd-key-small">Ctrl</span> + <span className="kbd-key kbd-key-small">Shift</span> + <span className="kbd-key kbd-key-small">P</span> to quickly start profiling before a build — the notification confirms it started.</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/50">
                                <span className="text-primary mt-0.5">•</span>
                                <span>CarbonLint continues monitoring in the background when the window is hidden. Use <span className="kbd-key kbd-key-small">Ctrl</span> + <span className="kbd-key kbd-key-small">Shift</span> + <span className="kbd-key kbd-key-small">D</span> to toggle it without losing data.</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/50">
                                <span className="text-primary mt-0.5">•</span>
                                <span>Enable <strong className="text-white/70">Autostart</strong> in Settings so CarbonLint launches with your system and is always ready in the tray.</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/50">
                                <span className="text-primary mt-0.5">•</span>
                                <span>Set a <strong className="text-white/70">Daily Carbon Budget</strong> in Settings to get notifications when you exceed your emission target.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}
