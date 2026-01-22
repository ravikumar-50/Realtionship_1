import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import axios from 'axios';
import './Auth.css';

export const SignUp = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        gender: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', formData);

            // Save token to localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Success! Navigate to dashboard
            setTimeout(() => {
                navigate('/dashboard');
            }, 500);
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <Card className="auth-card">
                <h2 className="auth-title">Begin Your Journey 🌱</h2>
                <p className="auth-subtitle">Create a safe space for your relationship.</p>

                {error && (
                    <div style={{
                        padding: '12px',
                        backgroundColor: '#FEE2E2',
                        color: '#DC2626',
                        borderRadius: '8px',
                        marginBottom: '16px',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Ravi"
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                    />

                    <div>
                        <label className="gender-label">Gender</label>
                        <select
                            className="input-field"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Prefer not to say</option>
                        </select>
                    </div>

                    <Button type="submit" variant="primary" isLoading={isLoading} style={{ marginTop: '8px' }}>
                        Create Account
                    </Button>
                </form>

                <div className="auth-footer">
                    Already have an account?
                    <Link to="/signin" className="auth-link">Sign In</Link>
                </div>
            </Card>
        </div>
    );
};
