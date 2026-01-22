import React, { useEffect, useState } from 'react';
import './Layout.css';
import { useLocation, Link } from 'react-router-dom';

export const Layout = ({ children }) => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashboard');

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!isLargeScreen) {
        return (
            <div className="mobile-blocker">
                <h1 className="mobile-title">🌱</h1>
                <p className="mobile-message">
                    Please view on a desktop or laptop for the best emotional connection experience.
                </p>
            </div>
        );
    }

    return (
        <div className="layout-container">
            {/* Optional: Simple Header for dashboard navigation context */}
            {isDashboard && (
                <nav className="dashboard-nav">
                    <Link to="/dashboard" className="nav-logo">Relationship Platform 🌿</Link>
                    <div className="nav-links">
                        {/* Add logout or profile later */}
                    </div>
                </nav>
            )}
            <main className="layout-content">
                {children}
            </main>
        </div>
    );
};
