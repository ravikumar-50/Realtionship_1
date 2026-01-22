import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Heart, MessageCircle, CloudSun, Smile, Frown, Meh, Sun } from 'lucide-react';
import './Dashboard.css';

export const Dashboard = () => {
    // Mock data state
    const [taskCompleted, setTaskCompleted] = useState(false);
    const [mood, setMood] = useState('calm');

    const handleCompleteTask = () => {
        setTaskCompleted(true);
    };

    return (
        <div className="dashboard-container">
            {/* A. Welcome Section */}
            <section className="welcome-section">
                <h1 className="welcome-title">Good evening, Ravi 🌿</h1>
                <p className="welcome-subtitle">Take a moment to breathe and connect.</p>
            </section>

            {/* B. Today's Connection Task */}
            <section className="task-section">
                <Card className="task-card">
                    <div className="task-header">
                        <Sun className="task-icon" />
                        <h3>Today's Connection Task</h3>
                    </div>
                    <div className="task-content">
                        <h4>Listening without fixing</h4>
                        <p>
                            Ask your partner about their day. When they share a challenge,
                            resist the urge to offer a solution. Just listen and say:
                            "That sounds hard, I'm here for you."
                        </p>
                    </div>
                    <div className="task-action">
                        {taskCompleted ? (
                            <div className="task-success">
                                <Heart className="heart-icon-anim" fill="#E8B4B8" color="#E8B4B8" />
                                <span>Task Completed. Well done.</span>
                            </div>
                        ) : (
                            <Button onClick={handleCompleteTask}>Complete Task</Button>
                        )}
                    </div>
                </Card>
            </section>

            <div className="dashboard-grid">
                {/* C. Partner Feedback Section */}
                <section className="feedback-section">
                    <h3>Emotional check-in</h3>
                    <div className="feedback-grid">
                        <Card className="feedback-card">
                            <div className="card-header">
                                <span className="avatar me">You</span>
                                <span className="date">Today, 9:00 AM</span>
                            </div>
                            <p className="feedback-text empty-state">
                                How are you feeling right now?
                            </p>
                            <Button variant="ghost" className="btn-small">Add Note</Button>
                        </Card>

                        <Card className="feedback-card partner-card">
                            <div className="card-header">
                                <span className="avatar partner">Partner</span>
                                <span className="date">Waiting...</span>
                            </div>
                            <p className="feedback-text empty-state">
                                Your partner hasn't shared their feelings yet.
                            </p>
                            <div className="nudge-action">
                                <MessageCircle size={16} />
                                <span>Send a gentle nudge</span>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* D. Emotional Status Indicator */}
                <section className="mood-section">
                    <h3>Your Mood</h3>
                    <Card className="mood-card">
                        <div className="mood-selector">
                            <button onClick={() => setMood('happy')} className={`mood-btn ${mood === 'happy' ? 'active' : ''}`}>
                                <Smile size={32} />
                                <span>Happy</span>
                            </button>
                            <button onClick={() => setMood('calm')} className={`mood-btn ${mood === 'calm' ? 'active' : ''}`}>
                                <CloudSun size={32} />
                                <span>Calm</span>
                            </button>
                            <button onClick={() => setMood('sad')} className={`mood-btn ${mood === 'sad' ? 'active' : ''}`}>
                                <Frown size={32} />
                                <span>Sad</span>
                            </button>
                            <button onClick={() => setMood('loved')} className={`mood-btn ${mood === 'loved' ? 'active' : ''}`}>
                                <Heart size={32} />
                                <span>Loved</span>
                            </button>
                        </div>
                        <p className="mood-message">
                            {mood === 'calm' && "Stay centered and peaceful."}
                            {mood === 'happy' && "Spread your joy!"}
                            {mood === 'sad' && "It's okay to feel this way."}
                            {mood === 'loved' && "Cherish this feeling."}
                        </p>
                    </Card>
                </section>
            </div>

            {/* E. Empty State / Quote area */}
            <section className="quote-section">
                <p>“Your connection journey starts today.”</p>
            </section>
        </div>
    );
};
