import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';

export function AboutPage() {
    return (
        <>
            <SEOHead
                title="About CarbonLint — Mission and Creator"
                description="CarbonLint was built by Nishal K from Kerala, India. Our mission: reduce the digital carbon footprint of software development. Free, open-source, MIT licensed tool for climate-conscious developers."
                path="/about"
            />

            {/* ─── HERO ─── */}
            <section className="relative pt-8 pb-20 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 gradient-mesh -z-10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/[0.06] rounded-full blur-[120px] -z-10" />

                <div className="max-w-4xl mx-auto animate-fade-in">
                    <div className="badge-pill mx-auto w-fit mb-6">
                        <span className="material-symbols-outlined text-sm">favorite</span>
                        Our Mission
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-6 leading-[0.95]">
                        Sustainable Code.
                        <br />
                        <span className="gradient-text">Sustainable Future.</span>
                    </h1>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
                        CarbonLint was born from a simple idea: inefficient code isn't just bad for performance — it's bad for the planet. We're on a mission to reduce the digital carbon footprint of software, one function at a time.
                    </p>
                </div>
            </section>

            {/* ─── WHY SECTION ─── */}
            <section className="max-w-6xl mx-auto px-4 md:px-6 pb-24">
                <div className="grid md:grid-cols-2 gap-6 items-stretch">
                    {/* Left: Info card */}
                    <div className="glass-card glow-border rounded-2xl p-8 md:p-10">
                        <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                            <span className="material-symbols-outlined text-2xl">psychology</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-6">Why CarbonLint?</h3>
                        <ul className="space-y-5">
                            {[
                                { title: 'Energy Efficiency', desc: 'Detect and refactor energy-intensive loops and processes.', icon: 'bolt' },
                                { title: 'Hardware Health', desc: 'Reduce CPU strain and extend the lifespan of your machines.', icon: 'memory' },
                                { title: 'Global Impact', desc: 'If every developer saved 1 watt/hour, we could power a small city.', icon: 'public' },
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                                        <span className="material-symbols-outlined text-lg">{item.icon}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-white">{item.title}</span>
                                        <p className="text-sm text-white/40 mt-0.5">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Mission text */}
                    <div className="flex flex-col justify-center space-y-6 order-first md:order-last">
                        <span className="text-primary font-bold tracking-widest uppercase text-xs">The Mission</span>
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                            Code that cares about the hardware it runs on.
                        </h2>
                        <p className="text-white/50 text-lg leading-relaxed">
                            Software doesn't exist in a vacuum. Every line of code consumes electricity. CarbonLint bridges the gap between software logic and physical power consumption, giving developers the visibility they need to write eco-friendly applications.
                        </p>
                        <div className="flex gap-3 mt-2">
                            {['Open Source', 'MIT Licensed', 'Free Forever'].map((tag) => (
                                <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/[0.04] text-xs text-white/40 font-medium border border-white/[0.06]">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CREATOR SECTION ─── */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 pb-24">
                <div className="text-center mb-12">
                    <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">The Creator</span>
                    <h2 className="text-3xl md:text-4xl font-bold">Built by a Developer, for Developers</h2>
                </div>

                <div className="glass-card glow-border rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                    {/* Background glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.04] rounded-full blur-[80px] group-hover:bg-primary/[0.08] transition-all duration-500" />

                    <div className="relative z-10 flex flex-col items-center text-center">
                        {/* Avatar */}
                        <div className="relative mb-6">
                            <div className="size-24 rounded-full bg-surface-overlay border-2 border-white/[0.06] flex items-center justify-center overflow-hidden group-hover:border-primary/30 transition-colors duration-300">
                                <span className="material-symbols-outlined text-4xl text-white/20">person</span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 size-8 rounded-full bg-primary flex items-center justify-center border-2 border-surface-raised">
                                <span className="material-symbols-outlined text-background-dark text-[14px]">verified</span>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold mb-1">Nishal K</h3>
                        <p className="text-primary text-sm font-medium mb-1">Lead Developer & Founder</p>
                        <p className="text-xs text-white/30 flex items-center gap-1 mb-6">
                            <span className="material-symbols-outlined text-[14px]">location_on</span>
                            Malappuram, Kerala, India
                        </p>

                        <p className="text-white/50 max-w-lg mx-auto mb-8 leading-relaxed italic">
                            "I built CarbonLint because I realized that while we optimize for speed and size, we rarely optimize for the planet. I wanted to create a tool that makes sustainable coding accessible to everyone."
                        </p>

                        <div className="flex flex-wrap justify-center gap-3">
                            <a href="https://github.com/nishal21" target="_blank" rel="noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-primary/20 text-sm font-medium transition-all">
                                <svg className="size-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                                GitHub
                            </a>
                            <a href="mailto:nishalamv@gmail.com"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-primary/20 text-sm font-medium transition-all">
                                <span className="material-symbols-outlined text-[16px]">mail</span>
                                Contact
                            </a>
                            <a href="https://instagram.com/nishal.21" target="_blank" rel="noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-primary/20 text-sm font-medium transition-all">
                                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 pb-24 text-center">
                <p className="text-white/30 mb-6">Want to contribute to the mission?</p>
                <Link
                    to="/downloads"
                    className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:text-primary-light transition-colors"
                >
                    Get CarbonLint
                    <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
            </section>
        </>
    );
}
