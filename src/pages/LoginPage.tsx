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

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        try {
            await login(username, password);
            onLoginSuccess();
        } catch {
            setError("Invalid username or password");
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

                <form style={styles.form} onSubmit={handleSubmit}> {}

                    <div style={styles.inputGroup}>
                        <label htmlFor="username" style={styles.label}>Username</label> {}
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>Password</label> {}
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <button type="submit" style={styles.loginBtn}> {}
                        Login
                    </button>

                    {error && (
                        <div style={styles.errorContainer}>
                            {error} {}
                        </div>
                    )}
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
        backgroundColor: '#f8f9fa',
        backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxSizing: 'border-box',
        zIndex: 9999
    },
    loginCard: {
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(44, 62, 80, 0.08)',
        width: '100%',
        maxWidth: '400px',
        boxSizing: 'border-box',
        border: '1px solid #e2e8f0'
    },
    logoWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '32px'
    },
    logoImage: {
        width: '130px',
        height: '120px',
        objectFit: 'contain',
        mixBlendMode: 'multiply',
        transform: 'scale(1.8)',
        marginTop: '25px',
        marginBottom: '35px'
    },
    brandHeader: {
        textAlign: 'center',
        marginBottom: '32px'
    },
    mainTitle: {
        margin: '0 0 6px 0',
        color: '#2c3e50',
        fontSize: '32px',
        fontWeight: '700',
        letterSpacing: '-0.5px'
    },
    subtitle: {
        margin: 0,
        color: '#7f8c8d',
        fontSize: '14px',
        fontWeight: '500'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        color: '#34495e',
        fontWeight: '600',
        fontSize: '14px',
        textAlign: 'left'
    },
    input: {
        padding: '12px 14px',
        borderRadius: '6px',
        border: '1px solid #dcdde1',
        fontSize: '15px',
        color: '#2c3e50',
        outline: 'none',
        backgroundColor: '#fcfcfc',
        boxSizing: 'border-box',
        width: '100%'
    },
    loginBtn: {
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        padding: '14px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px',
        marginTop: '10px',
        boxShadow: '0 4px 12px rgba(52, 152, 219, 0.2)'
    },
    errorContainer: {
        backgroundColor: '#fdf1f0',
        color: '#e74c3c',
        padding: '10px 12px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
        textAlign: 'center',
        border: '1px solid #fadbd8',
        marginTop: '5px'
    },
    footerText: {
        textAlign: 'center',
        marginTop: '24px',
        fontSize: '12px',
        color: '#95a5a6',
        fontWeight: '500'
    }
};