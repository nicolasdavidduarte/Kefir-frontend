import * as React from "react";
import type { LoanInstallment } from "../../types/LoanInstallment.ts";

type Props = {
    installments: LoanInstallment[];
};

export default function LoanInstallmentTable({ installments }: Props) {
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
                <th style={styles.th}>Number</th>
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
                                {inst.status}
                            </span>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', boxSizing: 'border-box' },
    theadTr: { borderBottom: '2px solid #34495e' },
    th: { padding: '12px 16px', color: '#7f8c8d', fontWeight: '600', fontSize: '14px' },
    tbodyTr: { borderBottom: '1px solid #ecf0f1' },
    td: { padding: '16px 16px', color: '#2c3e50', fontSize: '15px', verticalAlign: 'middle' },
    stateBadge: { color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block', textAlign: 'center', minWidth: '80px' }
};