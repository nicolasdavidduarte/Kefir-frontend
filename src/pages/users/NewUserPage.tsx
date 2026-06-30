import { useState } from "react";
import * as React from "react";
import type { UserRequest } from "../../types/User.ts";
import {FaArrowLeft} from "react-icons/fa";

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

            await onSave({
                username,
                fullname,
                password,
                roles: [role]
            });

            onBack();
        } catch (err) {
            const errorResponse = err as { message?: string };
            setError(errorResponse.message || "Failed to create user");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={onBack} style={styles.backButton}>
                    <FaArrowLeft />
                    <span> Back</span>
                </button>
                <h2 style={styles.title}>
                    Create New User
                </h2>
            </div>

            {error && (
                <div style={styles.errorContainer}>
                    {error}
                </div>
            )}

            <div style={styles.formCard}>
                <form onSubmit={handleSubmit} style={styles.form}>

                    {/* Username */}
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

                    {/* Full Name */}
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

                    {/* System Role */}
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

                    {/* Password */}
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

                    {/* Confirm Password */}
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
                        <button
                            type="button"
                            onClick={onBack}
                            style={styles.cancelBtn}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={styles.submitBtn}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save"}
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
        boxSizing: 'border-box',
        padding: '10px',
    },
    header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "16px"
    },
    backBtn: { backgroundColor: '#7f8c8d', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' },
    titleArea: { display: 'flex', flexDirection: 'column', textAlign: 'left' },
    title:{
        margin: '0 0 40px 0',
        fontSize: '28px',
        fontWeight: 500,
        color: '#2c3e50'
    },
    subtitle: { margin: '4px 0 0 0', fontSize: '13px', color: '#95a5a6' },
    formCard: {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        padding: '32px',
        maxWidth: '600px',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'left',
        maxHeight: '100%',
        overflow: 'hidden'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
    label: { fontSize: '13px', color: '#34495e', fontWeight: '600' },
    input: { padding: '10px 14px', borderRadius: '6px', border: '1px solid #dcdde1', fontSize: '14px', color: '#2c3e50', backgroundColor: '#fcfcfc', outline: 'none', boxSizing: 'border-box', width: '100%' },
    select: { padding: '10px 14px', borderRadius: '6px', border: '1px solid #dcdde1', fontSize: '14px', color: '#2c3e50', backgroundColor: '#fcfcfc', outline: 'none', width: '100%' },
    errorContainer: { backgroundColor: '#fdf1f0', color: '#e74c3c', padding: '10px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', border: '1px solid #fadbd8' },
    actionRow: { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' },
    cancelBtn: { backgroundColor: '#f4f6f7', color: '#7f8c8d', border: '1px solid #d5dbdb', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' },
    submitBtn: { backgroundColor: '#3498db', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', boxShadow: '0 4px 10px rgba(52, 152, 219, 0.2)' }
};