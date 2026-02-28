import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { to: '/features', label: 'Features' },
        { to: '/downloads', label: 'Downloads' },
        { to: '/shortcuts', label: 'Shortcuts' },
        { to: '/about', label: 'About' },
    ];

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
            isScrolled
                ? "bg-surface/70 backdrop-blur-2xl border-b border-white/[0.04] py-1"
                : "bg-transparent py-3"
        )}>
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 group cursor-pointer z-50 relative">
                    <img
                        src="/carbonlint/logo.png"
                        alt="CarbonLint"
                        className="size-9 rounded-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-lg font-bold tracking-tight text-white">
                        Carbon<span className="text-primary">Lint</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={cn(
                                "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                                location.pathname === link.to
                                    ? "text-primary bg-primary/[0.08]"
                                    : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                            )}
                        >
                            {link.label}
                            {location.pathname === link.to && (
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <a
                        href="https://github.com/nishal21/CarbonLint"
                        target="_blank"
                        rel="noreferrer"
                        className="hidden sm:flex size-9 items-center justify-center rounded-lg border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.04] transition-all text-white/60 hover:text-white"
                    >
                        <svg className="size-[18px] fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                    </a>
                    <Link
                        to="/downloads"
                        className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary-light text-background-dark px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 eco-glow active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Download
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden z-50 relative p-2 text-white/70 hover:text-primary transition-colors"
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined text-2xl">
                            {isMobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            <div className={cn(
                "fixed inset-0 bg-background-dark/98 backdrop-blur-2xl z-40 transition-all duration-300 md:hidden flex flex-col items-center justify-center gap-6",
                isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                <nav className="flex flex-col items-center gap-2 w-64">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "w-full text-center py-3 px-6 rounded-xl text-lg font-semibold transition-all",
                                location.pathname === link.to
                                    ? "text-primary bg-primary/10"
                                    : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <Link
                    to="/downloads"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-primary text-background-dark px-8 py-3 rounded-xl text-lg font-bold mt-4"
                >
                    Download Now
                </Link>
            </div>
        </nav>
    );
}
