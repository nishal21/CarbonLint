import { Link } from 'react-router-dom';

export function TermsPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-500 font-display min-h-screen">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center p-4 justify-between max-w-4xl mx-auto">
                    <Link to="/" className="text-slate-200 flex items-center justify-center p-1 rounded-full hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined">arrow_back_ios</span>
                    </Link>
                    <h2 className="text-slate-200 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Terms of Service</h2>
                    <div className="w-10"></div> {/* Spacer for centering */}
                </div>

            </header>

            <main className="max-w-4xl mx-auto pb-24">
                {/* Hero Title */}
                <div className="px-4 md:px-6 pt-8 md:pt-12 pb-6 text-center md:text-left">
                    <h1 className="text-slate-200 tracking-tight text-3xl md:text-4xl font-bold leading-tight">CarbonLint Terms of Service</h1>
                    <p className="text-primary text-sm font-medium mt-2">Last updated: October 24, 2023</p>
                </div>

                {/* Important Notice Card */}
                <div className="px-4 md:px-6 mb-8 md:mb-12">
                    <div className="glass-card rounded-xl p-6 flex flex-col gap-3 border border-white/5 bg-slate-800/20">
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-[20px]">info</span>
                            <span className="font-bold text-sm uppercase tracking-wider">Important Notice</span>
                        </div>
                        <p className="text-slate-400 text-[15px] leading-relaxed">
                            Please read these terms carefully before using CarbonLint services. By accessing or using our platform, you agree to be bound by these terms and all terms incorporated by reference. If you do not agree to all of these terms, do not use our services.
                        </p>
                    </div>
                </div>

                {/* Section 1: Acceptance */}
                <section className="px-4 md:px-6 py-6 border-l-2 border-primary ml-4 md:ml-6 mb-8" id="acceptance">
                    <h3 className="text-slate-200 text-xl font-bold mb-3">1. Acceptance of Terms</h3>
                    <div className="space-y-4 text-slate-400 leading-[1.6]">
                        <p>
                            By creating an account, or by otherwise accessing or using the CarbonLint Service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                        </p>
                        <p>
                            The Service is intended for professional software developers and organizations. If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms.
                        </p>
                    </div>
                </section>

                {/* Section 2: License */}
                <section className="px-4 md:px-6 py-6 border-l-2 border-primary ml-4 md:ml-6 mb-8" id="license">
                    <h3 className="text-slate-200 text-xl font-bold mb-3">2. License Grant</h3>
                    <div className="space-y-4 text-slate-400 leading-[1.6]">
                        <p>
                            CarbonLint is open-source software distributed under the MIT License. You are free to use, modify, and distribute the software in accordance with the license terms included in the source code repository.
                        </p>
                        <div className="bg-slate-800/30 rounded-lg p-5 border border-white/5">
                            <p className="text-slate-200 font-medium mb-1 italic">Open Source Promise:</p>
                            <p className="text-sm">This project is free to use. We encourage contributions from the community to help make software more sustainable.</p>
                        </div>
                    </div>
                </section>

                {/* Section 3: User Conduct */}
                <section className="px-4 md:px-6 py-6 border-l-2 border-primary ml-4 md:ml-6 mb-8" id="conduct">
                    <h3 className="text-slate-200 text-xl font-bold mb-3">3. User Conduct</h3>
                    <div className="space-y-4 text-slate-400 leading-[1.6]">
                        <p>Users are responsible for all activity occurring under their accounts. You agree not to:</p>
                        <ul className="list-disc pl-5 space-y-2 marker:text-primary">
                            <li>Use the Service for any illegal or unauthorized purpose.</li>
                            <li>Distribute malware or malicious code via the software.</li>
                            <li>Engage in harassment or abusive behavior towards maintainers or other community members.</li>
                            <li>Spam the repository with unrelated content or promotional material.</li>
                        </ul>
                    </div>
                </section>

                {/* Section 4: Termination */}
                <section className="px-4 md:px-6 py-6 border-l-2 border-primary ml-4 md:ml-6 mb-8" id="termination">
                    <h3 className="text-slate-200 text-xl font-bold mb-3">4. Termination</h3>
                    <div className="space-y-4 text-slate-400 leading-[1.6]">
                        <p>
                            We reserve the right to block access to our hosted services (if any) or ban users from our community channels for violating these Terms or the Community Code of Conduct.
                        </p>
                        <p>
                            Provisions regarding the disclaimer of warranties, limitation of liability, and indemnity shall survive any termination.
                        </p>
                    </div>
                </section>

                {/* Footer Info */}
                <div className="px-6 py-12 mt-12 border-t border-white/5 text-center">
                    <p className="text-sm mb-6 text-slate-500">Questions about our Terms?</p>
                    <a className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-slate-700 hover:bg-slate-800/50 transition-colors text-slate-300 font-medium" href="mailto:nishalamv@gmail.com">
                        <span className="material-symbols-outlined text-sm">mail</span>
                        Contact Legal Team
                    </a>
                    <p className="text-[12px] mt-12 text-slate-600">
                        © {new Date().getFullYear()} CarbonLint Inc. All rights reserved. <br />
                        Eco-friendly linting for a better planet.
                    </p>
                </div>
            </main>
        </div>
    );
}
