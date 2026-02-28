import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf, LayoutDashboard, History, GitCompare, Settings, Lightbulb, GitBranch, Calendar, Info, Menu, X } from 'lucide-react';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        { to: '/', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/history', label: 'History', icon: History },
        { to: '/reports', label: 'Reports', icon: Calendar },
        { to: '/compare', label: 'Compare', icon: GitCompare },
        { to: '/suggestions', label: 'Suggestions', icon: Lightbulb },
        { to: '/cicd', label: 'CI/CD', icon: GitBranch },
        { to: '/settings', label: 'Settings', icon: Settings },
        { to: '/about', label: 'About', icon: Info },
    ];

    return (
        <header className="header">
            <div className="header-logo">
                <img src="/logo.png" alt="CarbonLint" style={{ width: '32px', height: '32px', borderRadius: '6px' }} />
                <span className="logo-text">CarbonLint</span>
            </div>

            {/* Hamburger button - visible on small screens */}
            <button
                className="hamburger-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop nav */}
            <nav className="header-nav desktop-nav">
                {navItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        <Icon size={16} style={{ flexShrink: 0 }} />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Mobile nav - slide down menu */}
            {menuOpen && (
                <nav className="mobile-nav">
                    {navItems.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            <Icon size={18} />
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>
            )}
        </header>
    );
}
