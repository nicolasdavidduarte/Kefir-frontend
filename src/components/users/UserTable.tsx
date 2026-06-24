import type { User } from "../../types/User.ts";
import * as React from "react";
import { useState } from "react";
import { updateUserStatus } from "../../api/usersApi.ts";
import { FaPowerOff } from "react-icons/fa";

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
            alert("Could not update user status. Verify permissions.");
        } finally {
            setActionLoadingId(null);
        }
    }

    return (
        <table style={styles.table}>
            <thead>
            <tr style={styles.theadTr}>
                <th style={{ ...styles.th, width: '60px' }}>ID</th>
                <th style={styles.th}>Username</th>
                <th style={styles.th}>Created At</th>
                <th style={styles.th}>Role</th>
                <th style={{ ...styles.th, width: '120px' }}>Enabled</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id} style={styles.tbodyTr}>
                    <td style={styles.td}>{user.id}</td>
                    <td style={{ ...styles.td, fontWeight: 'bold' }}>{user.username}</td>
                    <td style={styles.td}>
                        {new Date(user.createdAt).toLocaleDateString("es-AR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
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
                            <span style={{ color: '#95a5a6', fontSize: '13px' }}>None</span>
                        )}
                    </td>
                    <td style={styles.td}>
                            <span style={{
                                ...styles.statusBadge,
                                backgroundColor: user.enabled ? '#2ecc71' : '#e74c3c'
                            }}>
                                {user.enabled ? "ACTIVE" : "INACTIVE"}
                            </span>
                    </td>
                    <td style={{ ...styles.td, textAlign: 'center' }}>
                        <button
                            onClick={() => handleToggleStatus(user.id, user.enabled)}
                            disabled={actionLoadingId === user.id}
                            title={user.enabled ? "Deactivate" : "Activate"}
                            style={{
                                ...styles.iconBtn,
                                opacity: actionLoadingId === user.id ? 0.4 : 1
                            }}
                        >
                            {actionLoadingId === user.id ? (
                                <span style={styles.spinner}>⏳</span>
                            ) : (
                                <div
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        backgroundColor: user.enabled ? "#e74c3c" : "#2ecc71",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <FaPowerOff
                                        size={23}
                                        style={{ display: 'block'}}
                                    />
                                </div>
                            )}
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
        textAlign: 'left',
        boxSizing: 'border-box'
    },
    theadTr: {
        borderBottom: '2px solid #34495e',
    },
    th: {
        padding: '12px 16px',
        color: '#7f8c8d',
        fontWeight: '600',
        fontSize: '14px',
        boxSizing: 'border-box'
    },
    tbodyTr: {
        borderBottom: '1px solid #ecf0f1',
    },
    td: {
        padding: '16px 16px',
        color: '#2c3e50',
        fontSize: '15px',
        boxSizing: 'border-box',
        verticalAlign: 'middle'
    },
    roleBadge: {
        backgroundColor: '#e1f5fe',
        color: '#0288d1',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold',
        marginRight: '6px',
        display: 'inline-block'
    },
    statusBadge: {
        color: 'white',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold',
        display: 'inline-block',
        textAlign: 'center',
        minWidth: '70px'
    },
    iconBtn: {
        background: 'none',
        backgroundColor: 'transparent', // Sin fondos circulares automáticos
        border: 'none',
        padding: '4px',                 // Padding mínimo para que el área de clic sea cómoda
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        outline: 'none',
        transition: 'transform 0.1s'
    },
    spinner: {
        fontSize: '16px',
        display: 'inline-block'
    }
};