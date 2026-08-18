import { useState } from "react";
import * as React from "react";
import { login } from "../api/authApi";
import kefirLogo from "../assets/kefir_logo.png";

type LoginPageProps = {
    onLoginSuccess: () => void;
};

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        if (isSubmitting) return;

        setError("");
        setIsSubmitting(true);

        try {
            await login(username, password);
            onLoginSuccess();
        } catch {
            setError("Invalid username or password");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div style={styles.pageContainer}>
            <div style={styles.loginCard}>

                <div style={styles.logoWrapper}>
                    <img
                        src={kefirLogo}
                        alt="Kefir Logo"
                        style={styles.logoImage}
                    />
                    <span style={styles.subtitle}>Core Banking System</span>
                </div>

                <form style={styles.form} onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="username" style={styles.label}>Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            disabled={isSubmitting}
                            style={styles.input}
                            autoComplete="username"
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            disabled={isSubmitting}
                            style={styles.input}
                            autoComplete="current-password"
                        />
                    </div>

                    {error && (
                        <div style={styles.errorContainer}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        style={{
                            ...styles.loginBtn,
                            ...(isSubmitting ? styles.loginBtnDisabled : {})
                        }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Signing in..." : "Sign in"}
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    pageContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#f8fafc',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        boxSizing: 'border-box',
        zIndex: 9999
    },
    loginCard: {
        backgroundColor: '#ffffff',
        padding: '40px 36px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        width: '100%',
        maxWidth: '380px',
        boxSizing: 'border-box',
        border: '1px solid #e2e8f0'
    },
    logoWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '28px'
    },
    logoImage: {
        height: '90px',
        width: 'auto',
        objectFit: 'contain',
        mixBlendMode: 'multiply',
        marginBottom: '8px'
    },
    subtitle: {
        margin: 0,
        color: '#64748b',
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.08em'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '18px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
    },
    label: {
        color: '#334155',
        fontWeight: '600',
        fontSize: '13px',
        textAlign: 'left'
    },
    input: {
        padding: '10px 12px',
        borderRadius: '6px',
        border: '1px solid #cbd5e1',
        fontSize: '14px',
        color: '#0f172a',
        outline: 'none',
        backgroundColor: '#ffffff',
        boxSizing: 'border-box',
        width: '100%',
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
    },
    loginBtn: {
        backgroundColor: '#0f172a',
        color: '#ffffff',
        border: 'none',
        padding: '11px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '14px',
        marginTop: '6px',
        transition: 'background-color 0.15s ease'
    },
    loginBtnDisabled: {
        backgroundColor: '#94a3b8',
        cursor: 'not-allowed'
    },
    errorContainer: {
        backgroundColor: '#fef2f2',
        color: '#991b1b',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: '500',
        textAlign: 'center',
        border: '1px solid #fecaca'
    }
};