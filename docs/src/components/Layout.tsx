import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans selection:bg-primary/30">
            <Navbar />
            <main className="flex-grow pt-24">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
