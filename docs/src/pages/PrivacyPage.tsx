import { Link } from 'react-router-dom';

export function PrivacyPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-500 font-display min-h-screen">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden max-w-4xl mx-auto border-x border-gray-100 dark:border-white/5">
                {/* Top Navigation Bar */}
                <nav className="sticky top-0 z-50 flex items-center bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md p-4 justify-between border-b border-gray-100 dark:border-white/5">
                    <Link to="/" className="text-zinc-900 dark:text-white flex size-10 shrink-0 items-center justify-start cursor-pointer hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">arrow_back_ios</span>
                    </Link>
                    <h2 className="text-zinc-900 dark:text-slate-200 text-base font-bold leading-tight tracking-tight flex-1 text-center pr-10">Privacy Policy</h2>
                </nav>

                {/* Hero Header */}
                <header className="px-4 md:px-6 pt-8 pb-6 text-center">
                    <h1 className="text-zinc-900 dark:text-slate-100 text-3xl md:text-4xl font-bold leading-tight tracking-tight">CarbonLint Privacy Policy</h1>
                    <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                        <span className="material-symbols-outlined text-[14px] text-primary mr-1.5">update</span>
                        <p className="text-primary text-xs font-semibold leading-normal uppercase">Last Updated: Oct 24, 2023</p>
                    </div>
                </header>

                {/* Summary Card */}
                <section className="px-4 md:px-6 pb-8">
                    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-primary/20 rounded-lg">
                                <span className="material-symbols-outlined text-primary">visibility</span>
                            </div>
                            <p className="text-zinc-900 dark:text-slate-100 text-lg font-bold leading-tight">Privacy Summary</p>
                        </div>
                        <p className="text-zinc-600 dark:text-slate-400 text-sm leading-relaxed">
                            We prioritize developer privacy. Most metrics like CPU usage and memory consumption are processed <span className="text-primary font-semibold">locally</span> on your machine and never reach our servers. We only collect what's necessary to improve your experience.
                        </p>
                    </div>
                </section>

                {/* Main Content Area */}
                <main className="flex flex-col gap-10 px-4 md:px-6 pb-20">
                    {/* Section 1: Introduction */}
                    <article>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-6 w-1 bg-primary rounded-full"></div>
                            <h2 className="text-zinc-900 dark:text-slate-100 text-xl font-bold">1. Introduction</h2>
                        </div>
                        <div className="space-y-4 text-slate-400">
                            <p className="leading-relaxed">
                                At CarbonLint, we believe that building sustainable software shouldn't come at the cost of your privacy. This policy describes how we handle information when you use our CLI tools and extensions.
                            </p>
                            <p className="leading-relaxed">
                                By using CarbonLint, you agree to the practices described here. We've written this in plain English to ensure full transparency for the developer community.
                            </p>
                        </div>
                    </article>

                    {/* Section 2: Data Collection */}
                    <article>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-6 w-1 bg-primary rounded-full"></div>
                            <h2 className="text-zinc-900 dark:text-slate-100 text-xl font-bold">2. Data Collection</h2>
                        </div>
                        <p className="mb-4 leading-relaxed text-slate-400">
                            CarbonLint operates on a "local-first" data principle. Here is exactly what we do and do not collect:
                        </p>
                        {/* Highlighted Local Processing Box */}
                        <div className="bg-primary/5 border border-primary/30 rounded-lg p-6 mb-6 relative overflow-hidden">
                            <div className="absolute top-[-10px] right-[-10px] opacity-10">
                                <span className="material-symbols-outlined text-6xl text-primary">terminal</span>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-primary text-xl">devices</span>
                                <h3 className="text-zinc-900 dark:text-slate-100 font-bold text-sm uppercase">Local Only Processing</h3>
                            </div>
                            <ul className="space-y-3 text-sm text-slate-400">
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                                    <span>Real-time CPU & RAM metrics</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                                    <span>Source code structure and ASTs</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                                    <span>Local file paths and dependencies</span>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4 text-slate-400">
                            <p className="leading-relaxed">
                                <strong className="text-zinc-900 dark:text-slate-100">What we collect:</strong> We may collect anonymized usage statistics (e.g., total CO2 saved) to help us improve the tool. We do not store personal data unless you actively subscribe to our newsletter.
                            </p>
                        </div>
                    </article>

                    {/* Section 3: Data Usage */}
                    <article>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-6 w-1 bg-primary rounded-full"></div>
                            <h2 className="text-zinc-900 dark:text-slate-100 text-xl font-bold">3. Data Usage</h2>
                        </div>
                        <div className="space-y-4 text-slate-400">
                            <p className="leading-relaxed">
                                Any information collected is used solely to provide the services you've requested, including:
                            </p>
                            <ul className="list-none space-y-3">
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold">•</span>
                                    <span>Generating carbon efficiency reports.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold">•</span>
                                    <span>Aggregating anonymized global sustainability impact metrics.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold">•</span>
                                    <span>Processing open source contributions and feedback.</span>
                                </li>
                            </ul>
                        </div>
                    </article>

                    {/* Section 4: User Rights */}
                    <article>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-6 w-1 bg-primary rounded-full"></div>
                            <h2 className="text-zinc-900 dark:text-slate-100 text-xl font-bold">4. User Rights</h2>
                        </div>
                        <p className="leading-relaxed mb-6 text-slate-400">
                            Regardless of your location, we provide all users with the following rights:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-gray-100 dark:border-white/5">
                                <span className="material-symbols-outlined text-primary mb-2">delete</span>
                                <h4 className="text-zinc-900 dark:text-slate-100 font-bold text-sm">Right to Erasure</h4>
                                <p className="text-xs mt-1 text-slate-500">Delete your account and data at any time.</p>
                            </div>
                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-gray-100 dark:border-white/5">
                                <span className="material-symbols-outlined text-primary mb-2">download</span>
                                <h4 className="text-zinc-900 dark:text-slate-100 font-bold text-sm">Portability</h4>
                                <p className="text-xs mt-1 text-slate-500">Export your carbon reports in JSON format.</p>
                            </div>
                        </div>
                    </article>
                </main>
            </div>
        </div>
    );
}
