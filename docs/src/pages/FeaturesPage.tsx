import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import screenshot from '../assets/1.png';

export function FeaturesPage() {
    return (
        <>
            <SEOHead
                title="Features — CarbonLint Developer Sustainability Tool"
                description="Explore CarbonLint features: real-time CPU/GPU monitoring, carbon footprint calculation, CI/CD integration, smart reports, system tray mode, cross-platform support. Built with Tauri and Rust."
                path="/features"
            />

            {/* ─── HERO ─── */}
            <section className="relative pt-8 pb-16 px-4 md:px-6 text-center overflow-hidden">
                <div className="absolute inset-0 gradient-mesh -z-10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/[0.06] rounded-full blur-[120px] -z-10" />

                <div className="max-w-4xl mx-auto animate-fade-in">
                    <div className="badge-pill mx-auto w-fit mb-6">
                        <span className="material-symbols-outlined text-sm">auto_awesome</span>
                        Everything you need
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-6 leading-[0.95]">
                        Features that make
                        <br />
                        <span className="gradient-text">green coding</span> easy
                    </h1>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
                        From real-time monitoring to CI/CD integration — every tool you need to measure and reduce your software's carbon footprint.
                    </p>
                </div>
            </section>

            {/* ─── TECH BADGES ─── */}
            <section className="max-w-4xl mx-auto px-4 mb-16">
                <div className="flex flex-wrap justify-center gap-3 animate-fade-in delay-200">
                    {[
                        { label: 'Tauri 2', icon: 'deployed_code', color: 'primary' },
                        { label: 'Rust', icon: 'settings', color: 'orange-400' },
                        { label: 'React 19', icon: 'code', color: 'cyan-400' },
                        { label: 'TypeScript', icon: 'shield', color: 'blue-400' },
                        { label: 'Vite', icon: 'bolt', color: 'purple-400' },
                    ].map((tech, i) => (
                        <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm">
                            <span className={`material-symbols-outlined text-${tech.color} text-[16px]`}>{tech.icon}</span>
                            <span className="text-white/70 font-medium">{tech.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── FEATURE BENTO GRID ─── */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Real-time Monitoring — Large */}
                    <div className="md:col-span-2 glass-card glow-border rounded-2xl p-8 md:p-10 min-h-[280px] flex flex-col justify-between group">
                        <div>
                            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-background-dark transition-all duration-300">
                                <span className="material-symbols-outlined text-2xl">analytics</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Real-time System Monitoring</h3>
                            <p className="text-white/50 leading-relaxed max-w-lg">
                                Monitor CPU, memory, disk I/O, and network traffic in real-time. Hardware-level tracking via the sysinfo crate provides ±2% energy measurement accuracy with negligible overhead.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-6">
                            {['CPU Cores', 'RAM Usage', 'Disk I/O', 'Network', 'GPU'].map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-lg bg-white/[0.04] text-xs text-white/40 font-medium">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* CO2 Calculation */}
                    <div className="glass-card glow-border rounded-2xl p-8 min-h-[280px] flex flex-col justify-between group">
                        <div className="size-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-emerald-500 group-hover:text-background-dark transition-all duration-300">
                            <span className="material-symbols-outlined text-2xl">eco</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Carbon Calculation</h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                Converts energy consumption to CO₂ using region-specific grid carbon intensity. Supports 7 global regions from 25 to 700 gCO₂/kWh.
                            </p>
                        </div>
                    </div>

                    {/* Profiling Sessions */}
                    <div className="glass-card glow-border rounded-2xl p-8 min-h-[280px] flex flex-col justify-between group">
                        <div className="size-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-500 group-hover:text-background-dark transition-all duration-300">
                            <span className="material-symbols-outlined text-2xl">timer</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Profiling Sessions</h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                Start/stop recording sessions with a global hotkey. Get detailed breakdowns of energy per session with trend comparisons.
                            </p>
                        </div>
                    </div>

                    {/* CI/CD Integration — Large */}
                    <div className="md:col-span-2 glass-card glow-border rounded-2xl p-8 md:p-10 min-h-[280px] flex flex-col justify-between group">
                        <div>
                            <div className="size-14 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-6 group-hover:bg-violet-500 group-hover:text-background-dark transition-all duration-300">
                                <span className="material-symbols-outlined text-2xl">terminal</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">CI/CD Pipeline Integration</h3>
                            <p className="text-white/50 leading-relaxed max-w-lg">
                                Set carbon budgets for your builds. Automated PR comments warn when pipelines exceed emission thresholds. GitHub Actions, GitLab CI, and Jenkins support.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-6">
                            {['GitHub Actions', 'GitLab CI', 'Jenkins', 'PR Comments'].map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-lg bg-white/[0.04] text-xs text-white/40 font-medium">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* System Tray */}
                    <div className="glass-card glow-border rounded-2xl p-8 min-h-[220px] flex flex-col justify-between group">
                        <div className="size-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:bg-amber-500 group-hover:text-background-dark transition-all duration-300">
                            <span className="material-symbols-outlined text-2xl">dock_to_bottom</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">System Tray</h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                Lightweight background process. Global hotkeys for instant control. Lives where you work.
                            </p>
                        </div>
                    </div>

                    {/* Smart Reports */}
                    <div className="glass-card glow-border rounded-2xl p-8 min-h-[220px] flex flex-col justify-between group">
                        <div className="size-14 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400 mb-6 group-hover:bg-rose-500 group-hover:text-background-dark transition-all duration-300">
                            <span className="material-symbols-outlined text-2xl">bar_chart</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Weekly Reports</h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                Visualized trends of your coding sessions' environmental impact over time.
                            </p>
                        </div>
                    </div>

                    {/* Cross Platform */}
                    <div className="glass-card glow-border rounded-2xl p-8 min-h-[220px] flex flex-col justify-between group">
                        <div className="size-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-500 group-hover:text-background-dark transition-all duration-300">
                            <span className="material-symbols-outlined text-2xl">devices</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Cross-Platform</h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                Windows, macOS, Linux, and Android. One codebase, consistent experience everywhere.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── SCREENSHOT ─── */}
            <section className="max-w-5xl mx-auto px-4 md:px-6 pb-24">
                <div className="glass-card rounded-2xl p-2 overflow-hidden">
                    <img src={screenshot} alt="CarbonLint Dashboard Screenshot" className="w-full rounded-xl" />
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 pb-24">
                <div className="relative glass-card rounded-3xl p-10 md:p-16 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] to-transparent -z-10" />
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                        Ready to try it?
                    </h2>
                    <p className="text-white/50 mb-8 max-w-md mx-auto">
                        Download CarbonLint for free and start tracking your carbon footprint today.
                    </p>
                    <Link
                        to="/downloads"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-background-dark h-12 px-8 rounded-xl text-sm font-bold transition-all eco-glow active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[20px]">download</span>
                        Download Now
                    </Link>
                </div>
            </section>
        </>
    );
}
