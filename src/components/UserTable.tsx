import type { User } from "../types/User";
import * as React from "react";

type Props = {
    users: User[];
};

export default function UserTable({ users }: Props) {
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
                    <td style={styles.td}>{user.createdAt || "N/A"}</td>
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
    }
};