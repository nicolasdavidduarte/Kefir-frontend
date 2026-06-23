import type { Account } from "../../types/Account.ts";
import '../../App.css'
import * as React from "react";

type Props = {
    accounts: Account[];
};

export default function AccountTable({ accounts }: Props) {
    return (
        <div style={{ width: '100%', overflowX: 'auto' }} className="table-scroll-container">
            <table style={{ ...styles.table, minWidth: '1400px', width: '100%' }}>
            <thead>
            <tr style={styles.theadTr}>
                <th style={{ ...styles.th, width: '60px' }}>ID</th>
                <th style={styles.th}>Customer</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Currency</th>
                <th style={styles.th}>Bank</th>
                <th style={styles.th}>CBU</th>
                <th style={styles.th}>Balance</th>
                <th style={styles.th}>Status</th>
            </tr>
            </thead>
            <tbody>
            {accounts.map((account) => (
                <tr key={account.id} style={styles.tbodyTr}>
                    <td style={styles.td}>{account.id}</td>
                    <td style={styles.td}>{account.customer}</td>
                    <td style={{ ...styles.td }}>{account.type}</td>
                    <td style={{ ...styles.td }}>{account.currencyIsoCode}</td>
                    <td style={{ ...styles.td }}>{account.bank}</td>
                    <td style={{ ...styles.td }}>{account.cbu}</td>
                    <td style={{ ...styles.td }}>{account.balance}</td>
                    <td style={{ ...styles.td }}>
                        <span style={{...styles.statusBadge, backgroundColor: account.status ? '#2ecc71' : '#e74c3c'
                        }}>{account.status}</span>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
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