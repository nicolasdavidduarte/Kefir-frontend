import type { Currency } from "../../types/Currency.ts";
import '../../App.css'
import * as React from "react";

type Props = {
    currencies: Currency[];
    onSelectCurrency: (currency: Currency) => void;
};

function formatDateTime(dateString: string): string {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export default function CurrencyTable({ currencies, onSelectCurrency }: Props) {
    return (
        <div style={{ width: '100%', overflowX: 'auto' }} className="table-scroll-container">
            <table style={styles.table}>
            <thead>
            <tr style={styles.theadTr}>
                <th style={{ ...styles.th, width: '60px' }}>Id</th>
                <th style={styles.th}>ISO Code</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Enabled</th>
                <th style={styles.th}>Created by</th>
                <th style={styles.th}>Created at</th>
                <th style={styles.th}>Updated by</th>
                <th style={styles.th}>Updated at</th>
            </tr>
            </thead>
            <tbody>
            {currencies.map((currency) => (
                <tr
                    key={currency.id}
                    style={styles.tbodyTr}
                    onClick={() => onSelectCurrency(currency)}
                >
                    <td style={styles.td}>{currency.id}</td>
                    <td style={styles.td}>{currency.isoCode}</td>
                    <td style={{ ...styles.td }}>{currency.description}</td>
                    <td style={{ ...styles.td }}>{currency.enabled ? "Yes" : "No"}</td>
                    <td style={{ ...styles.td }}>{currency.createdBy}</td>
                    <td style={{ ...styles.td }}>{formatDateTime(currency.createdAt)}</td>
                    <td style={{ ...styles.td }}>{currency.updatedBy}</td>
                    <td style={{ ...styles.td }}>{formatDateTime(currency.updatedAt)}</td>
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
        display: 'inline-block',
        textTransform: 'capitalize'
    }

};