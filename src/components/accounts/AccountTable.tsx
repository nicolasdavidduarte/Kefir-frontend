import type { Account } from "../../types/Account.ts";
import '../../App.css'
import * as React from "react";

type Props = {
    accounts: Account[];
    onSelectAccount: (account: Account) => void;
};

export default function AccountTable({ accounts, onSelectAccount }: Props) {
    return (
        <div style={{ width: '100%', overflowX: 'auto' }} className="table-scroll-container">
            <table style={styles.table}>
            <thead>
            <tr style={styles.theadTr}>
                <th style={{ ...styles.th, width: '60px' }}>ID</th>
                <th style={styles.th}>Customer</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Currency</th>
                <th style={styles.th}>Balance</th>
            </tr>
            </thead>
            <tbody>
            {accounts.map((account) => (
                <tr
                    key={account.id}
                    style={styles.tbodyTr}
                    onClick={() => onSelectAccount(account)}
                >
                    <td style={styles.td}>{account.id}</td>
                    <td style={styles.td}>{account.customer}</td>
                    <td style={{ ...styles.td }}>{account.type}</td>
                    <td style={{ ...styles.td }}>{account.currencyIsoCode}</td>
                    <td style={{ ...styles.td }}>{account.balance}</td>
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
        borderBottom: '1px solid #f1f5f9',
        cursor: 'pointer'
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
    }

};