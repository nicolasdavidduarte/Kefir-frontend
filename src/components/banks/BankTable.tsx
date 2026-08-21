import type { Bank } from "../../types/Bank.ts";
import '../../App.css'
import * as React from "react";

type Props = {
    banks: Bank[];
    onSelectBank: (bank: Bank) => void;
};

const getStatusStyle = (status: string) => {
    switch (status) {
        case "ACTIVE": return { bg: "#e6f4ea", text: "#137333", border: "#ceedd5" };
        case "PENDING": return { bg: "#fef7e0", text: "#b06000", border: "#fce8b2" };
        case "CLOSED": return { bg: "#fce8e6", text: "#c5221f", border: "#fad2cf" };
        default: return { bg: "#f1f5f9", text: "#5f6368", border: "#e2e8f0" };
    }
};

export default function BankTable({ banks, onSelectBank }: Props) {
    return (
        <div style={{ width: '100%', overflowX: 'auto' }} className="table-scroll-container">
            <table style={styles.table}>
            <thead>
            <tr style={styles.theadTr}>
                <th style={{ ...styles.th, width: '60px' }}>Id</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Created at</th>
                <th style={styles.th}>Status</th>
            </tr>
            </thead>
            <tbody>
            {banks.map((bank) => (
                <tr
                    key={bank.id}
                    style={styles.tbodyTr}
                    onClick={() => onSelectBank(bank)}
                >
                    <td style={styles.td}>{bank.id}</td>
                    <td style={styles.td}>{bank.name}</td>
                    <td style={{ ...styles.td }}>{bank.createdAt}</td>
                    <td style={styles.td}>
                                <span style={{
                                    ...styles.statusBadge,
                                    backgroundColor: getStatusStyle(bank.status).bg,
                                    color: getStatusStyle(bank.status).text,
                                    borderColor: getStatusStyle(bank.status).border
                                }}>
                                    {bank.status.replace(/_/g, ' ').toLowerCase()}
                                </span>
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