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
    closed: "#e74c3c",
};

export default function LoanTable({ loans, onSelectLoan }: Props) {
    return (
        <div style={{ width: '100%', overflowX: 'auto' }} className="table-scroll-container">
            <table style={{ ...styles.table, minWidth: '1400px', width: '100%' }}>
                <thead>
                <tr style={styles.theadTr}>
                    <th style={styles.th}>Id</th>
                    <th style={styles.th}>External Id</th>
                    <th style={styles.th}>Customer</th>
                    <th style={styles.th}>Loan type</th>
                    <th style={styles.th}>Amortization type</th>
                    <th style={styles.th}>Currency</th>
                    <th style={styles.th}>Number of installments</th>
                    <th style={styles.th}>Annual interest rate</th>
                    <th style={styles.th}>Monthly interest rate</th>
                    <th style={styles.th}>Total principal</th>
                    <th style={styles.th}>Total interest</th>
                    <th style={styles.th}>Total operation amount</th>
                    <th style={styles.th}>Opening date</th>
                    <th style={styles.th}>Expiration date</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Created At</th>
                    <th style={styles.th}>User</th>
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
                        <td style={styles.td}>{loan.externalId}</td>
                        <td style={styles.td}>{loan.customer}</td>
                        <td style={styles.td}>{loan.loanType}</td>
                        <td style={styles.td}>{loan.amortizationType}</td>
                        <td style={styles.td}>{loan.currency}</td>
                        <td style={styles.td}>{loan.numberOfInstallments}</td>
                        <td style={styles.td}>{loan.annualInterestRate}%</td>
                        <td style={styles.td}>{loan.monthlyInterestRate}%</td>
                        <td style={styles.td}>${loan.totalPrincipal.toLocaleString()}</td>
                        <td style={styles.td}>${loan.totalInterest.toLocaleString()}</td>
                        <td style={styles.td}>${loan.totalOperationAmount.toLocaleString()}</td>
                        <td style={styles.td}>{loan.openingDate}</td>
                        <td style={styles.td}>{loan.expirationDate}</td>
                        <td style={styles.td}>
                                <span style={{
                                    ...styles.statusBadge,
                                    backgroundColor: statusColors[loan.status.toLowerCase()] || "#95a5a6"
                                }}>
                                    {loan.status}
                                </span>
                        </td>
                        <td style={styles.td}>{loan.createdAt || "N/A"}</td>
                        <td style={styles.td}>{loan.user}</td>
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
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    },
    td: {
        padding: '12px 16px',
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