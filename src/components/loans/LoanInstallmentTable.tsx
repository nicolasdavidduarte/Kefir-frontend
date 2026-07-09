import * as React from "react";
import type { LoanInstallment } from "../../types/LoanInstallment.ts";
import { FaDollarSign } from "react-icons/fa";

type Props = {
    installments: LoanInstallment[];
    onInstallmentPayment: (loanId: number, installmentNumber: number) => void;
};

export default function LoanInstallmentTable({ installments, onInstallmentPayment }: Props) {
    const getStateColor = (state: string) => {
        switch (state) {
            case "PAID": return "#2ecc71";
            case "PAYMENT_PENDING": return "#f39c12";
            case "OVERDUE": return "#e74c3c";
            default: return "#95a5a6";
        }
    };

    return (
        <table style={styles.table}>
            <thead>
            <tr style={styles.theadTr}>
                <th style={styles.th}>Nº</th>
                <th style={styles.th}>Principal amount</th>
                <th style={styles.th}>Interest amount</th>
                <th style={styles.th}>Total amount</th>
                <th style={styles.th}>Payment due date</th>
                <th style={styles.th}>Remaining balance</th>
                <th style={styles.th}>Status</th>
            </tr>
            </thead>
            <tbody>
            {installments.map((inst) => (
                <tr key={inst.number} style={styles.tbodyTr}>
                    <td style={{ ...styles.td, fontWeight: 'bold' }}>{inst.number}</td>
                    <td style={{ ...styles.td }}>
                        ${inst.principalAmount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ ...styles.td }}>
                        ${inst.interestAmount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ ...styles.td }}>
                        ${inst.totalAmount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </td>
                    <td style={styles.td}>
                        {new Date(inst.paymentDueDate).toLocaleDateString("es-AR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                        })}
                    </td>
                    <td style={{ ...styles.td }}>
                        ${inst.remainingBalance.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </td>
                    <td style={styles.td}>
                            <span style={{
                                ...styles.stateBadge,
                                backgroundColor: getStateColor(inst.status)
                            }}>
                                {inst.status.replace(/_/g, ' ')}
                            </span>
                    </td>
                    <td>
                        <button style={styles.paymentButton} title="Manual payment"
                                onClick={() => onInstallmentPayment(inst.loanId, inst.number)}
                        >
                            <FaDollarSign size={20}/>
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    tableWrapper: {
        width: '100%',
        overflowX: 'auto',
        boxSizing: 'border-box'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
        boxSizing: 'border-box',
    },
    theadTr: {
        borderBottom: '2px solid #e2e8f0'
    },
    th: {
        padding: '10px 12px',
        color: '#7f8c8d',
        fontWeight: '600',
        fontSize: '13px',
        letterSpacing: '0.5px',
    },
    tbodyTr: {
        borderBottom: '1px solid #f1f2f6'
    },
    td: {
        padding: '10px 10px',
        color: '#2c3e50',
        fontSize: '14px',
        verticalAlign: 'middle',
        whiteSpace: "nowrap"
    },
    stateBadge: {
        color: 'white',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold',
        display: 'inline-block',
        textAlign: 'center',
        minWidth: '85%'
    },
    paymentButton: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: '#22c55e',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(34, 197, 94, 0.35)',
        transition: 'all 0.2s ease',
    }
};
