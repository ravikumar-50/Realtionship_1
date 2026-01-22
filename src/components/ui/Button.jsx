import React from 'react';
import './Button.css';

/**
 * Button Component
 * @param {string} variant - 'primary', 'secondary', 'ghost'
 * @param {boolean} isLoading - Shows loading spinner
 * @param {React.ReactNode} children
 */
export const Button = ({
    children,
    variant = 'primary',
    isLoading = false,
    className = '',
    ...props
}) => {
    return (
        <button
            className={`btn btn--${variant} ${isLoading ? 'btn--loading' : ''} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? <span className="spinner" /> : children}
        </button>
    );
};
