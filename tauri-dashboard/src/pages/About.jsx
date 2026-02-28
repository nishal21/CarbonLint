import { Leaf, Github, Instagram, MapPin, Heart, Code, Globe, Monitor, Zap, BarChart3, Bell, Keyboard, FileDown, GitBranch, Terminal } from 'lucide-react';

export default function About() {
    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1 className="flex items-center gap-sm"><Leaf size={28} /> About CarbonLint</h1>
                <p>Real-time carbon footprint monitoring for developers</p>
            </div>

            <div className="grid grid-2 mb-lg">
                {/* Product Section */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title flex items-center gap-sm"><Code size={18} /> About the Product</h3>
                    </div>
                    <div className="text-center" style={{ padding: 'var(--space-lg)' }}>
                        <img src="/logo.png" alt="CarbonLint" style={{ width: '80px', height: '80px', borderRadius: '16px', margin: '0 auto 1rem', display: 'block' }} />
                        <h2 style={{ color: '#22C55E', marginBottom: '0.5rem' }}>CarbonLint</h2>
                        <p className="text-secondary mb-lg">Version 1.0.0</p>
                        <p className="text-secondary" style={{ lineHeight: '1.7', textAlign: 'left' }}>
                            CarbonLint is a real-time carbon footprint monitoring tool designed for developers
                            who care about the environmental impact of their code. Track energy consumption,
                            measure CO2 emissions, and get actionable insights to reduce your carbon footprint.
                        </p>
                    </div>
                </div>

                {/* Creator Section */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title flex items-center gap-sm"><Heart size={18} style={{ color: '#EF4444' }} /> About the Creator</h3>
                    </div>
                    <div style={{ padding: 'var(--space-lg)' }}>
                        <div className="text-center mb-lg">
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #22C55E, #3B82F6)',
                                margin: '0 auto 1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.75rem',
                                fontWeight: '700',
                                color: 'white'
                            }}>
                                NK
                            </div>
                            <h2 style={{ marginBottom: '0.5rem' }}>Nishal K</h2>
                            <p className="text-secondary flex items-center justify-center gap-xs">
                                <MapPin size={14} /> Malappuram, Kerala, India
                            </p>
                        </div>

                        <div className="flex flex-col gap-sm">
                            <a
                                href="https://github.com/nishal21"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline flex items-center gap-sm"
                                style={{ justifyContent: 'center' }}
                            >
                                <Github size={18} /> github.com/nishal21
                            </a>
                            <a
                                href="https://instagram.com/demonking.___"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn flex items-center gap-sm"
                                style={{
                                    justifyContent: 'center',
                                    background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                                    border: 'none',
                                    color: 'white'
                                }}
                            >
                                <Instagram size={18} /> @demonking.___
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="card mb-lg">
                <div className="card-header">
                    <h3 className="card-title flex items-center gap-sm"><Globe size={18} /> Features</h3>
                </div>
                <div className="grid grid-4">
                    <div className="text-center" style={{ padding: 'var(--space-lg)' }}>
                        <Monitor size={32} style={{ margin: '0 auto 0.5rem', color: '#22C55E' }} />
                        <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Real-Time Monitoring</div>
                        <div className="text-secondary text-sm">Track CPU, memory, network live</div>
                    </div>
                    <div className="text-center" style={{ padding: 'var(--space-lg)' }}>
                        <Globe size={32} style={{ margin: '0 auto 0.5rem', color: '#3B82F6' }} />
                        <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Carbon Calculation</div>
                        <div className="text-secondary text-sm">Region-based CO2 emissions</div>
                    </div>
                    <div className="text-center" style={{ padding: 'var(--space-lg)' }}>
                        <BarChart3 size={32} style={{ margin: '0 auto 0.5rem', color: '#A855F7' }} />
                        <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Weekly Reports</div>
                        <div className="text-secondary text-sm">Trends and insights over time</div>
                    </div>
                    <div className="text-center" style={{ padding: 'var(--space-lg)' }}>
                        <Bell size={32} style={{ margin: '0 auto 0.5rem', color: '#F97316' }} />
                        <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Budget Alerts</div>
                        <div className="text-secondary text-sm">Notifications when over limit</div>
                    </div>
                    <div className="text-center" style={{ padding: 'var(--space-lg)' }}>
                        <Keyboard size={32} style={{ margin: '0 auto 0.5rem', color: '#06B6D4' }} />
                        <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Keyboard Shortcuts</div>
                        <div className="text-secondary text-sm">Ctrl+P to toggle profiling</div>
                    </div>
                    <div className="text-center" style={{ padding: 'var(--space-lg)' }}>
                        <FileDown size={32} style={{ margin: '0 auto 0.5rem', color: '#EF4444' }} />
                        <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>PDF Export</div>
                        <div className="text-secondary text-sm">Export detailed reports</div>
                    </div>
                    <div className="text-center" style={{ padding: 'var(--space-lg)' }}>
                        <GitBranch size={32} style={{ margin: '0 auto 0.5rem', color: '#8B5CF6' }} />
                        <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>CI/CD Integration</div>
                        <div className="text-secondary text-sm">Measure in build pipelines</div>
                    </div>
                    <div className="text-center" style={{ padding: 'var(--space-lg)' }}>
                        <Terminal size={32} style={{ margin: '0 auto 0.5rem', color: '#10B981' }} />
                        <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>System Tray</div>
                        <div className="text-secondary text-sm">Control from system tray</div>
                    </div>
                </div>
            </div>

            <div className="text-center text-secondary">
                <p className="flex items-center justify-center gap-xs">
                    Made with <Heart size={14} style={{ color: '#EF4444' }} /> for a greener future
                </p>
                <p className="flex items-center justify-center gap-xs">© 2026 CarbonLint. MIT License.</p>
            </div>
        </div>
    );
}
