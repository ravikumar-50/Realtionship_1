import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import './LandingPage.css';

export const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <div className="landing-content">
                <h1 className="landing-title">
                    One small moment every day.<br />
                    One honest feeling.<br />
                    <span className="text-highlight">Stronger bonds over time.</span>
                </h1>
                <p className="landing-description">
                    A dedicated space for your relationship to grow, breathe, and flourish.
                </p>
                <div className="landing-actions">
                    <Button onClick={() => navigate('/signup')} className="btn-large">
                        Get Started ❤️
                    </Button>
                </div>
            </div>
            <div className="landing-background">
                {/* Abstract shapes or gradients could go here */}
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
            </div>
        </div>
    );
};
