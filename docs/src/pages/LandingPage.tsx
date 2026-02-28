import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';

export function LandingPage() {
    return (
        <>
            <SEOHead
                title="CarbonLint — Real-Time Carbon Footprint Monitoring for Developers"
                description="CarbonLint is a free, open-source developer tool that tracks your code's energy consumption and CO2 emissions in real time. Available for Windows, Linux, macOS, and Android. 10,000+ developers joined."
                path="/"
            />

            {/* ─── HERO ─── */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden">
                {/* Gradient mesh background */}
                <div className="absolute inset-0 gradient-mesh -z-10" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/[0.07] rounded-full blur-[150px] -z-10 animate-pulse-glow" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-dark to-transparent -z-10" />

                {/* Orbiting ring decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] md:size-[800px] border border-white/[0.02] rounded-full -z-10 animate-spin-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] md:size-[600px] border border-white/[0.03] rounded-full -z-10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />

                <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto text-center animate-fade-in">
                    {/* Badge */}
                    <div className="badge-pill">
                        <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                        Open Source &amp; Free Forever
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.95]">
                        Code Green.
                        <br />
                        <span className="gradient-text">Track Carbon.</span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-base md:text-xl text-white/50 leading-relaxed max-w-2xl">
                        Real-time energy monitoring for modern developer workflows.
                        Measure, reduce, and report your digital carbon footprint — all from your system tray.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        <Link
                            to="/downloads"
                            className="bg-primary hover:bg-primary-light text-background-dark h-12 px-8 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 eco-glow active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[20px]">download</span>
                            Download for Free
                        </Link>
                        <a
                            href="https://github.com/nishal21/CarbonLint"
                            target="_blank"
                            rel="noreferrer"
                            className="border border-white/[0.08] hover:border-white/15 hover:bg-white/[0.04] h-12 px-8 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                        >
                            <svg className="size-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                            View on GitHub
                        </a>
                    </div>

                    {/* Social proof */}
                    <div className="flex items-center gap-6 mt-6 text-xs text-white/30">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
                            MIT Licensed
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[16px]">devices</span>
                            4 Platforms
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[16px]">memory</span>
                            &lt;5MB RAM
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── DASHBOARD MOCKUP ─── */}
            <section className="max-w-6xl mx-auto px-4 md:px-6 -mt-8 mb-24 relative z-10">
                <div className="animate-fade-in delay-300">
                    <div className="relative rounded-2xl border border-white/[0.06] bg-surface-raised p-1 shadow-2xl shadow-black/50">
                        {/* Glow behind */}
                        <div className="absolute -inset-1 bg-gradient-to-b from-primary/10 to-transparent rounded-2xl blur-xl -z-10" />

                        {/* Window chrome */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.04]">
                            <div className="flex gap-1.5">
                                <div className="size-2.5 rounded-full bg-white/10" />
                                <div className="size-2.5 rounded-full bg-white/10" />
                                <div className="size-2.5 rounded-full bg-white/10" />
                            </div>
                            <div className="px-3 py-0.5 bg-white/[0.03] rounded-md text-[10px] font-mono text-white/25 tracking-wider">CarbonLint Dashboard</div>
                            <div className="size-2.5" />
                        </div>

                        {/* Dashboard content */}
                        <div className="p-4 md:p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {/* CPU */}
                                <div className="glass-card rounded-xl p-5 group">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-[11px] font-semibold uppercase tracking-wider text-white/30">CPU Usage</span>
                                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary text-[16px]">memory</span>
                                        </div>
                                    </div>
                                    <div className="text-3xl font-black tracking-tight mb-3">14.2<span className="text-sm font-medium text-white/30 ml-1">%</span></div>
                                    <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-primary to-primary-light w-[42%] rounded-full" />
                                    </div>
                                </div>

                                {/* Memory */}
                                <div className="glass-card rounded-xl p-5 group">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-[11px] font-semibold uppercase tracking-wider text-white/30">Memory</span>
                                        <div className="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-emerald-400 text-[16px]">chip_extraction</span>
                                        </div>
                                    </div>
                                    <div className="text-3xl font-black tracking-tight mb-3">1.8<span className="text-sm font-medium text-white/30 ml-1">GB</span></div>
                                    <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 w-[28%] rounded-full" />
                                    </div>
                                </div>

                                {/* CO2 */}
                                <div className="glass-card rounded-xl p-5 group">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-[11px] font-semibold uppercase tracking-wider text-white/30">Carbon Output</span>
                                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary text-[16px]">eco</span>
                                        </div>
                                    </div>
                                    <div className="text-3xl font-black tracking-tight mb-3">0.42<span className="text-sm font-medium text-white/30 ml-1">kg/hr</span></div>
                                    <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-primary to-primary-light w-[15%] rounded-full" />
                                    </div>
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="mt-4 h-48 w-full bg-surface/50 rounded-xl border border-white/[0.04] flex flex-col items-center justify-end overflow-hidden p-4">
                                <div className="w-full flex justify-between items-end gap-1 h-28">
                                    {[40, 60, 45, 30, 70, 85, 40, 35, 65, 90, 20, 55, 75, 50, 38].map((h, i) => (
                                        <div
                                            key={i}
                                            className="bg-gradient-to-t from-primary/60 to-primary/20 w-full rounded-t"
                                            style={{
                                                height: `${h}%`,
                                                animation: `bar-grow 0.5s ease-out ${i * 0.05}s both`,
                                                transformOrigin: 'bottom'
                                            }}
                                        />
                                    ))}
                                </div>
                                <div className="text-[10px] text-white/15 mt-3 uppercase tracking-[0.3em]">Live Carbon Emissions — Last 15 Sessions</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── STATS ─── */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { icon: 'groups', value: '10k+', label: 'Developers Worldwide', color: 'primary' },
                        { icon: 'forest', value: '50k kg', label: 'CO₂ Emissions Tracked', color: 'emerald-400' },
                        { icon: 'speed', value: '30%', label: 'Avg Efficiency Boost', color: 'primary' },
                    ].map((stat, i) => (
                        <div key={i} className="glass-card rounded-2xl p-8 text-center group">
                            <div className={`size-14 mx-auto rounded-2xl bg-${stat.color}/10 flex items-center justify-center text-${stat.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                            </div>
                            <div className="text-4xl font-black tracking-tight mb-1">{stat.value}</div>
                            <div className="text-sm text-white/40 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── FEATURES BENTO ─── */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 py-20">
                <div className="section-divider mb-20" />
                <div className="text-center mb-16">
                    <div className="badge-pill mb-6 mx-auto w-fit">
                        <span className="material-symbols-outlined text-sm">category</span>
                        Features
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                        Precision Tools for <span className="gradient-text">Modern Engineering</span>
                    </h2>
                    <p className="text-white/40 max-w-2xl mx-auto text-lg">
                        Deep insights into your energy consumption — without impacting performance.
                    </p>
                </div>

                {/* Bento grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Large card 1 */}
                    <div className="md:col-span-2 glass-card glow-border rounded-2xl p-8 md:p-10 min-h-[240px] flex flex-col justify-between">
                        <div>
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                                <span className="material-symbols-outlined text-2xl">analytics</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Real-time System Monitoring</h3>
                            <p className="text-white/50 leading-relaxed max-w-lg">
                                Low-level hardware tracking for CPU, memory, disk, and network. Direct driver-level integration for ±2% energy measurement accuracy.
                            </p>
                        </div>
                        <div className="flex gap-2 mt-6">
                            {['CPU', 'RAM', 'Disk', 'Network'].map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-lg bg-white/[0.04] text-xs text-white/40 font-medium">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Small card 1 */}
                    <div className="glass-card glow-border rounded-2xl p-8 flex flex-col justify-between min-h-[240px]">
                        <div className="size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-5">
                            <span className="material-symbols-outlined text-2xl">eco</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">CO₂ Calculation</h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                Region-specific grid carbon intensity data covering 7 global zones for accurate emission reports.
                            </p>
                        </div>
                    </div>

                    {/* Small card 2 */}
                    <div className="glass-card glow-border rounded-2xl p-8 flex flex-col justify-between min-h-[240px]">
                        <div className="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-5">
                            <span className="material-symbols-outlined text-2xl">summarize</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Smart Reports</h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                Weekly digests of your coding sessions' environmental impact with visual trends.
                            </p>
                        </div>
                    </div>

                    {/* Large card 2 */}
                    <div className="md:col-span-2 glass-card glow-border rounded-2xl p-8 md:p-10 min-h-[240px] flex flex-col justify-between">
                        <div>
                            <div className="size-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-5">
                                <span className="material-symbols-outlined text-2xl">terminal</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">CI/CD Integration</h3>
                            <p className="text-white/50 leading-relaxed max-w-lg">
                                Set carbon budgets for your build pipelines. Get automated PR comments when builds exceed emission thresholds.
                            </p>
                        </div>
                        <div className="flex gap-2 mt-6">
                            {['GitHub Actions', 'GitLab CI', 'Jenkins'].map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-lg bg-white/[0.04] text-xs text-white/40 font-medium">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── TECH STACK ─── */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
                <div className="glass-card rounded-2xl p-8 md:p-12">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/30 mb-8 text-center">Built With</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {[
                            { name: 'Tauri 2', desc: 'Native Runtime', icon: 'deployed_code' },
                            { name: 'Rust', desc: 'Backend Logic', icon: 'settings' },
                            { name: 'React 19', desc: 'UI Framework', icon: 'code' },
                            { name: 'TypeScript', desc: 'Type Safety', icon: 'shield' },
                        ].map((tech, i) => (
                            <div key={i} className="text-center group">
                                <div className="size-14 mx-auto rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 mb-3 group-hover:border-primary/30 group-hover:text-primary transition-all duration-300">
                                    <span className="material-symbols-outlined text-xl">{tech.icon}</span>
                                </div>
                                <div className="font-bold text-sm">{tech.name}</div>
                                <div className="text-xs text-white/30 mt-0.5">{tech.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 py-20">
                <div className="relative rounded-3xl p-10 md:p-20 text-center overflow-hidden">
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-surface-raised to-emerald-900/[0.06] rounded-3xl -z-10" />
                    <div className="absolute inset-0 border border-primary/10 rounded-3xl -z-10" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[100px] -z-10" />

                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
                        Ready to code <span className="gradient-text">greener</span>?
                    </h2>
                    <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
                        Join the movement of climate-conscious developers. Small workflow changes create massive impact at scale.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to="/downloads"
                            className="bg-primary hover:bg-primary-light text-background-dark h-14 px-10 rounded-xl text-base font-bold transition-all eco-glow flex items-center justify-center gap-2 active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                            Get Started — It's Free
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
