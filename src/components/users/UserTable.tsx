import type { User } from "../../types/User.ts";
import * as React from "react";
import { useState } from "react";
import { updateUserStatus } from "../../api/usersApi.ts";

type Props = {
    users: User[];
    onUserUpdated?: () => void;
};

export default function UserTable({ users, onUserUpdated }: Props) {
    const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

    async function handleToggleStatus(id: number, currentStatus: boolean) {
        try {
            setActionLoadingId(id);
            await updateUserStatus(id, !currentStatus);
            if (onUserUpdated) {
                onUserUpdated();
            }
        } catch (error) {
            console.error("Failed to update user status:", error);
            alert("Error updating user status");
        } finally {
            setActionLoadingId(null);
        }
    }

    return (
        <table style={styles.table}>
            <thead>
            <tr style={styles.theadTr}>
                <th style={styles.th}>Username</th>
                <th style={styles.th}>Created At</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Status</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id} style={styles.tbodyTr}>
                    <td style={{ ...styles.td, fontWeight: '600', color: '#0f172a' }}>{user.username}</td>
                    <td style={styles.td}>
                        {new Date(user.createdAt).toLocaleDateString("es-AR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                        })}
                    </td>
                    <td style={styles.td}>
                        {user.roles && user.roles.length > 0 ? (
                            user.roles.map((role) => (
                                <span key={role} style={styles.roleBadge}>
                                        {role}
                                    </span>
                            ))
                        ) : (
                            <span style={{ color: '#94a3b8', fontSize: '13px' }}>None</span>
                        )}
                    </td>
                    <td style={styles.td}>
                            <span style={{
                                ...styles.statusBadge,
                                backgroundColor: user.enabled ? '#f0fdf4' : '#fef2f2',
                                color: user.enabled ? '#15803d' : '#b91c1c',
                                borderColor: user.enabled ? '#bbf7d0' : '#fecaca'
                            }}>
                                {user.enabled ? "Active" : "Inactive"}
                            </span>
                    </td>
                    <td style={{ ...styles.td, textAlign: 'right' }}>
                        <button
                            onClick={() => handleToggleStatus(user.id, user.enabled)}
                            disabled={actionLoadingId === user.id}
                            style={styles.actionBtn}
                        >
                            {actionLoadingId === user.id ? "Updating..." : (user.enabled ? "Deactivate" : "Activate")}
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left'
    },
    theadTr: {
        borderBottom: '1px solid #e2e8f0'
    },
    th: {
        padding: '12px 16px',
        color: '#64748b',
        fontWeight: '600',
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    },
    tbodyTr: {
        borderBottom: '1px solid #f1f5f9'
    },
    td: {
        padding: '12px 16px',
        color: '#334155',
        fontSize: '14px',
        verticalAlign: 'middle'
    },
    roleBadge: {
        backgroundColor: '#f1f5f9',
        color: '#475569',
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '500',
        marginRight: '4px',
        border: '1px solid #e2e8f0'
    },
    statusBadge: {
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '500',
        border: '1px solid',
        display: 'inline-block'
    },
    actionBtn: {
        background: 'none',
        border: '1px solid #cbd5e1',
        borderRadius: '6px',
        padding: '4px 10px',
        cursor: 'pointer',
        fontSize: '12px',
        color: '#475569',
        fontWeight: '500',
        transition: 'all 0.15s ease'
    }
};