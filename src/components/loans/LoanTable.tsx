import type { Loan } from "../../types/Loan.ts";
import '../../App.css'
import * as React from "react";

type Props = {
    loans: Loan[];
    onSelectLoan: (id: number) => void;
};

const statusColors: Record<string, string> = {
    pending: "#f39c12",
    active: "#2ecc71",
    inactive: "#95a5a6",
    charge_off: "#e74c3c",
};

export default function LoanTable({ loans, onSelectLoan }: Props) {
    return (
        <div style={{ width: '100%', overflowX: 'auto' }} className="table-scroll-container">
            <table style={styles.table}>
                <thead>
                <tr style={styles.theadTr}>
                    <th style={styles.th}>Id</th>
                    <th style={styles.th}>Customer</th>
                    <th style={styles.th}>Currency</th>
                    <th style={styles.th}>Amount</th>
                    <th style={styles.th}>Status</th>
                </tr>
                </thead>

                <tbody>
                {loans.map(loan => (
                    <tr
                        key={loan.id}
                        style={styles.tbodyTr}
                        onClick={() => onSelectLoan(loan.id)}
                    >
                        <td style={styles.td}>{loan.id}</td>
                        <td style={styles.td}>{loan.customer}</td>
                        <td style={styles.td}>{loan.currency}</td>
                        <td style={styles.td}>${loan.totalOperationAmount.toLocaleString()}</td>
                        <td style={styles.td}>
                                <span style={{
                                    ...styles.statusBadge,
                                    backgroundColor: statusColors[loan.status.toLowerCase()] || "#95a5a6"
                                }}>
                                    {loan.status.replace(/_/g, ' ')}
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
        textAlign: 'left',
        boxSizing: 'border-box'
    },
    theadTr: {
        borderBottom: '2px solid #34495e',
    },
    th: {
        padding: '12px 12px',
        color: '#7f8c8d',
        fontWeight: '600',
        fontSize: '14px',
        boxSizing: 'border-box'
    },
    tbodyTr: {
        borderBottom: '1px solid #ecf0f1',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    },
    td: {
        padding: '10px 12px',
        color: '#2c3e50',
        fontSize: '15px',
        boxSizing: 'border-box',
        verticalAlign: 'middle'
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