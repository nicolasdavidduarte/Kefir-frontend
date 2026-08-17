import { useState } from "react";
import * as React from "react";
import type { UserRequest } from "../../types/User.ts";
import { FaArrowLeft } from "react-icons/fa";
import { ApiError } from "../../api/http.ts";

type NewUserProps = {
    onBack: () => void;
    onSave: (userData: UserRequest) => Promise<void>;
};

export default function NewUserPage({ onBack, onSave }: NewUserProps) {
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        event.preventDefault();
        setError("");

        if (!username || !fullname || !password) {
            setError("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            await onSave({ username, fullname, password, roles: [role] });
            onBack();
        } catch (err) {
            if (err instanceof ApiError && err.payload?.message) {
                const backendMessage = err.payload.message;
                if (typeof backendMessage === "object") {
                    const formattedErrors = Object.entries(backendMessage).map(
                        ([field, msg]) => `${field}: ${msg}`
                    ).toReversed();
                    setError(formattedErrors.join("\n"));
                } else {
                    setError(backendMessage);
                }
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to create user");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={onBack} style={styles.backBtn}>
                    <FaArrowLeft size={12} />
                    <span>Back to Users</span>
                </button>
                <div style={styles.titleArea}>
                    <h2 style={styles.title}>Create New User</h2>
                    <p style={styles.subtitle}>Fill in the required information to register a user in the system.</p>
                </div>
            </div>

            {error && <div style={styles.errorContainer}>{error}</div>}

            <div style={styles.formCard}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Username</label>
                        <input
                            type="text"
                            style={styles.input}
                            placeholder="e.g. jdoe"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Full Name</label>
                        <input
                            type="text"
                            style={styles.input}
                            placeholder="e.g. John Doe"
                            value={fullname}
                            onChange={e => setFullname(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>System Role</label>
                        <select
                            style={styles.select}
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            disabled={loading}
                        >
                            <option value="">Select...</option>
                            <option value="ADMIN">Administrator</option>
                            <option value="OPR">Operator</option>
                            <option value="VIEWER">Viewer</option>
                        </select>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            style={styles.input}
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            style={styles.input}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div style={styles.actionRow}>
                        <button type="button" onClick={onBack} style={styles.cancelBtn} disabled={loading}>
                            Cancel
                        </button>
                        <button type="submit" style={styles.submitBtn} disabled={loading}>
                            {loading ? "Saving..." : "Save User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        width: '100%',
        maxWidth: '640px',
        margin: '0 auto',
        boxSizing: 'border-box',
        padding: '24px 16px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: "20px"
    },
    backBtn: {
        backgroundColor: 'transparent',
        color: '#64748b',
        border: 'none',
        padding: '0',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '500',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px'
    },
    titleArea: { display: 'flex', flexDirection: 'column', textAlign: 'left' },
    title: {
        margin: '8px 0 0 0',
        fontSize: '26px',
        fontWeight: 600,
        color: '#1e293b'
    },
    subtitle: { margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' },
    formCard: {
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        padding: '28px',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'left'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
    label: { fontSize: '13px', color: '#334155', fontWeight: '500' },
    input: { padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', color: '#0f172a', outline: 'none', boxSizing: 'border-box', width: '100%' },
    select: { padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', color: '#0f172a', outline: 'none', width: '100%', boxSizing: 'border-box' },
    errorContainer: { backgroundColor: '#fef2f2', color: '#b91c1c', padding: '10px 12px', borderRadius: '6px', fontSize: '13px', border: '1px solid #fecaca', marginBottom: '16px', whiteSpace: 'pre-line' },
    actionRow: { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' },
    cancelBtn: { backgroundColor: '#ffffff', color: '#475569', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '13px' },
    submitBtn: { backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '13px' }
};