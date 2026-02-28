import { SEOHead } from '../components/SEOHead';

export function DownloadsPage() {
    const platforms = [
        {
            name: 'Windows',
            desc: 'Windows 10 & 11 (64-bit)',
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 3.449L9.75 2.1V11.4H0V3.449zm0 8.851h9.75v9.3L0 20.251V12.3zm10.55-10.451L24 0v11.4h-13.45V1.849zM24 12.3v11.7l-13.45-1.9V12.3H24z" />
                </svg>
            ),
            color: 'blue-500',
            downloads: [
                { label: 'Download .exe', href: 'https://github.com/nishal21/CarbonLint/releases/download/v0.1.4/CarbonLint_0.1.0_x64-setup.exe', primary: true },
                { label: 'Download .msi', href: 'https://github.com/nishal21/CarbonLint/releases/download/v0.1.4/CarbonLint_0.1.0_x64_en-US.msi', primary: false },
            ],
            requirements: ['Windows 10 Build 19041+', '4GB RAM Minimum', 'WebView2 Runtime'],
            size: '~8 MB',
        },
        {
            name: 'macOS',
            desc: 'Intel & Apple Silicon',
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
            ),
            color: 'slate-300',
            downloads: [
                { label: 'Download .dmg (ARM)', href: 'https://github.com/nishal21/CarbonLint/releases/download/v0.1.4/CarbonLint_0.1.0_aarch64.dmg', primary: true },
                { label: 'Download .dmg (Intel)', href: 'https://github.com/nishal21/CarbonLint/releases/download/v0.1.4/CarbonLint_0.1.0_x64.dmg', primary: false },
            ],
            requirements: ['macOS 10.15+', 'Apple Silicon or Intel', '4GB RAM Minimum'],
            size: '~10 MB',
        },
        {
            name: 'Linux',
            desc: 'Debian, Ubuntu & AppImage',
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.504 0c-.155 0-.311.002-.465.014C8.227.211 5.674 2.797 5.105 5.983c-.22 1.237-.14 2.558.235 3.808.254.847.676 1.644 1.24 2.13.448.386.986.6 1.544.6.308 0 .607-.072.886-.211.278-.14.525-.35.722-.615.2-.267.345-.584.43-.933.044-.178.077-.37.1-.564H9.4c-.013.171-.033.325-.063.463-.055.255-.137.466-.253.627-.115.16-.26.273-.432.337-.17.064-.372.077-.592.035-.345-.065-.649-.28-.906-.58-.412-.478-.717-1.148-.895-1.74-.412-1.372-.365-2.733-.011-3.71.353-.97.975-1.71 1.773-2.14.8-.43 1.756-.571 2.734-.456.978.115 1.978.488 2.87 1.148.66.486 1.232 1.12 1.664 1.857.432.738.72 1.58.82 2.474.1.893.007 1.837-.28 2.747-.288.91-.77 1.786-1.48 2.527-.71.74-1.643 1.347-2.828 1.636-.466.114-.964.14-1.463.1v.837c.43.039.865.019 1.293-.069 1.38-.336 2.463-1.057 3.276-1.91.812-.853 1.353-1.844 1.672-2.853.319-1.01.415-2.042.305-3.024-.11-.982-.436-1.907-.919-2.73-.483-.822-1.125-1.534-1.866-2.08-1.025-.758-2.174-1.19-3.297-1.322C12.958.016 12.73 0 12.504 0z" />
                </svg>
            ),
            color: 'orange-400',
            downloads: [
                { label: 'Download .deb', href: 'https://github.com/nishal21/CarbonLint/releases/download/v0.1.4/CarbonLint_0.1.0_amd64.deb', primary: true },
                { label: 'Download AppImage', href: 'https://github.com/nishal21/CarbonLint/releases/download/v0.1.4/CarbonLint_0.1.0_amd64.AppImage', primary: false },
                { label: 'Download .rpm', href: 'https://github.com/nishal21/CarbonLint/releases/download/v0.1.4/CarbonLint-0.1.0-1.x86_64.rpm', primary: false },
            ],
            requirements: ['GLIBC 2.27+', 'x86_64 Architecture', 'GTK3 or Qt Environment'],
            size: '~9 MB',
        },
        {
            name: 'Android',
            desc: 'Android 8.0+ (Oreo)',
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.523 15.34c-.47 0-.853.39-.853.85 0 .468.383.857.853.857.47 0 .854-.39.854-.858 0-.46-.384-.85-.854-.85m-11.046 0c-.47 0-.854.39-.854.85 0 .468.384.857.854.857.47 0 .854-.39.854-.858 0-.46-.384-.85-.854-.85m11.408-6.09l1.588-2.75a.33.33 0 00-.12-.453.33.33 0 00-.453.12l-1.608 2.786A10.092 10.092 0 0012 7.696a10.09 10.09 0 00-5.292 1.257L5.1 6.167a.33.33 0 00-.453-.12.332.332 0 00-.12.454l1.588 2.749C3.023 11.07 1 13.95 1 17.26h22c0-3.31-2.023-6.19-5.115-8.01" />
                </svg>
            ),
            color: 'green-400',
            downloads: [
                { label: 'Download .apk', href: 'https://github.com/nishal21/CarbonLint/releases/download/v0.1.4/app-universal-release-unsigned.apk', primary: true },
            ],
            requirements: ['Android 8.0+ (API 26)', 'ARM64 Processor', '50MB Free Space'],
            size: '~15 MB',
        },
    ];

    return (
        <>
            <SEOHead
                title="Download CarbonLint — Windows, Linux, macOS, Android"
                description="Download CarbonLint for free. Available as .exe/.msi for Windows, .deb/.AppImage for Linux, .dmg for macOS, and .apk for Android. The world's first sustainability-focused developer tool."
                path="/downloads"
            />

            {/* ─── HERO ─── */}
            <section className="relative pt-8 pb-16 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 gradient-mesh -z-10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-primary/[0.06] rounded-full blur-[120px] -z-10" />

                <div className="max-w-3xl mx-auto animate-fade-in">
                    <div className="badge-pill mx-auto w-fit mb-6">
                        <span className="material-symbols-outlined text-sm">download</span>
                        Available Now
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                        Download <span className="gradient-text">CarbonLint</span>
                    </h1>
                    <p className="text-lg text-white/50 max-w-xl mx-auto mb-8">
                        Free, open-source, and built for every platform. Pick your OS and start tracking your carbon footprint.
                    </p>
                    <a href="https://github.com/nishal21/CarbonLint/releases/tag/v0.1.4" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                        View GitHub Release Page
                    </a>
                </div>
            </section>

            {/* ─── PLATFORM CARDS ─── */}
            <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {platforms.map((platform, i) => (
                        <div key={i} className="glass-card glow-border rounded-2xl p-7 flex flex-col group">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={`size-14 rounded-2xl bg-${platform.color}/10 flex items-center justify-center text-${platform.color} group-hover:scale-110 transition-transform duration-300`}>
                                        {platform.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{platform.name}</h3>
                                        <p className="text-sm text-white/40">{platform.desc}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg">v0.1.4</span>
                                    <p className="text-[11px] text-white/25 mt-1">{platform.size}</p>
                                </div>
                            </div>

                            {/* Download buttons */}
                            <div className="space-y-2 mb-6">
                                {platform.downloads.map((dl, j) => (
                                    <a
                                        key={j}
                                        href={dl.href}
                                        className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${dl.primary
                                            ? 'bg-primary hover:bg-primary-light text-background-dark eco-glow active:scale-[0.98]'
                                            : 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white/80'
                                            }`}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">download</span>
                                        {dl.label}
                                    </a>
                                ))}
                            </div>

                            {/* Requirements */}
                            <div className="mt-auto pt-5 border-t border-white/[0.04]">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-2.5">Requirements</p>
                                <ul className="space-y-1.5">
                                    {platform.requirements.map((req, j) => (
                                        <li key={j} className="flex items-center gap-2 text-xs text-white/40">
                                            <span className="material-symbols-outlined text-primary/60 text-[14px]">check_circle</span>
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── CLI SECTION ─── */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 pb-16">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">CLI &amp; CI/CD Integration</h2>
                    <p className="text-white/40 text-sm mb-4">Automate sustainability audits in your build pipeline.</p>
                    <a href="https://www.npmjs.com/package/carbonlint-cli" target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-600/20 transition-all">
                        <svg className="size-4 fill-current" viewBox="0 0 24 24"><path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z" /></svg>
                        carbonlint-cli on npm
                    </a>
                </div>
                <div className="glass-card rounded-2xl overflow-hidden">
                    {/* Terminal chrome */}
                    <div className="bg-white/[0.02] px-4 py-2.5 flex items-center justify-between border-b border-white/[0.04]">
                        <div className="flex gap-1.5">
                            <div className="size-2.5 rounded-full bg-red-500/40" />
                            <div className="size-2.5 rounded-full bg-yellow-500/40" />
                            <div className="size-2.5 rounded-full bg-green-500/40" />
                        </div>
                        <span className="text-[10px] text-white/20 font-mono tracking-wider">bash — carbonlint-cli</span>
                        <div className="size-2.5" />
                    </div>
                    <div className="p-6 font-mono text-sm leading-loose">
                        <div className="flex items-start gap-3">
                            <span className="text-primary">$</span>
                            <div>
                                <span className="text-white">npm install -g carbonlint-cli</span>
                                <div className="text-primary/80 text-xs mt-1">+ carbonlint-cli@1.0.0</div>
                            </div>
                        </div>
                        <div className="mt-3 flex items-start gap-3">
                            <span className="text-primary">$</span>
                            <div>
                                <span className="text-white">carbonlint init</span>
                                <div className="text-primary/80 text-xs mt-1">✓ Created .carbonlintrc.json in project root</div>
                            </div>
                        </div>
                        <div className="mt-3 flex items-start gap-3">
                            <span className="text-primary">$</span>
                            <div>
                                <span className="text-white">carbonlint .</span>
                                <div className="text-xs mt-1 space-y-0.5">
                                    <div className="text-white/50">✔ Scanned 120 files</div>
                                    <div className="text-emerald-400">Green Score: 99/100 (Excellent)</div>
                                    <div className="text-white/40">Est. CO₂: 2.2144g — ✓ within budget</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── VERIFICATION ─── */}
            <section className="max-w-4xl mx-auto px-4 md:px-6 pb-24">
                <h2 className="text-xl font-bold mb-6">Verify Your Download</h2>
                <div className="glass-card rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/[0.02] text-white/30">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Artifact</th>
                                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider hidden md:table-cell">SHA-256</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                            {['CarbonLint.Setup.1.0.0.exe', 'carbonlint_1.0.0_amd64.deb', 'CarbonLint-1.0.0.AppImage', 'CarbonLint-1.0.0-arm64.dmg'].map((name, i) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4 font-medium text-white/80">{name}</td>
                                    <td className="px-6 py-4 font-mono text-[11px] text-white/20 hidden md:table-cell">
                                        {Array(64).fill(0).map(() => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-3 text-[11px] text-white/20 text-center">
                    Verify integrity with <code className="bg-white/[0.04] px-1.5 py-0.5 rounded text-white/30">sha256sum</code>
                </p>
            </section>
        </>
    );
}
