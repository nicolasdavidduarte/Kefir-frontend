import { useState } from "react";
import * as React from "react";
import type { LoanInstallment } from "../../types/LoanInstallment.ts";
import { FaDollarSign } from "react-icons/fa";

type Props = {
    installments: LoanInstallment[];
    onInstallmentPayment: (loanId: number, installmentNumber: number) => void;
};

export default function LoanInstallmentTable({ installments, onInstallmentPayment }: Props) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 7;

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "PAID": return { bg: "#e6f4ea", text: "#137333", border: "#ceedd5" };
            case "PAYMENT_PENDING": return { bg: "#fef7e0", text: "#b06000", border: "#fce8b2" };
            case "CLOSED": return { bg: "#fce8e6", text: "#c5221f", border: "#fad2cf" };
            case "CHARGE_OFF": return { bg: "#fce8e6", text: "#c5221f", border: "#fad2cf" };
            default: return { bg: "#f1f5f9", text: "#5f6368", border: "#e2e8f0" };
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentInstallments = installments.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(installments.length / itemsPerPage);

    return (
        <div style={styles.container}>
            <div style={styles.tableWrapper}>
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
                    {currentInstallments.map((inst) => (
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
                                    ...styles.statusBadge,
                                    backgroundColor: getStatusStyle(inst.installmentStatus).bg,
                                    color: getStatusStyle(inst.installmentStatus).text,
                                    borderColor: getStatusStyle(inst.installmentStatus).border
                                }}>
                                    {inst.installmentStatus.replace(/_/g, ' ').toLowerCase()}
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
            </div>

            {totalPages > 1 && (
                <div style={styles.paginationContainer}>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        style={{
                            ...styles.pageBtn,
                            ...(currentPage === 1 ? styles.disabledBtn : {})
                        }}
                    >
                        Previous
                    </button>

                    <span style={styles.pageInfo}>
                        Page <strong>{currentPage}</strong> of {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        style={{
                            ...styles.pageBtn,
                            ...(currentPage === totalPages ? styles.disabledBtn : {})
                        }}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        width: '100%',
        boxSizing: 'border-box'
    },
    tableWrapper: {
        width: '100%',
        overflowX: 'auto',
        boxSizing: 'border-box'
    },
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
        borderBottom: '1px solid #f1f5f9'
    },
    td: {
        padding: '12px 16px',
        color: '#334155',
        fontSize: '14px',
        verticalAlign: 'middle'
    },
    statusBadge: {
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '500',
        border: '1px solid',
        whiteSpace: 'nowrap',
        display: 'inline-block',
        textTransform: 'capitalize'
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
    },
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        marginTop: '24px',
        padding: '10px 0',
        width: '100%'
    },
    pageBtn: {
        backgroundColor: '#ffffff',
        color: '#2c3e50',
        border: '1px solid #dcdde1',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '13px',
        outline: 'none',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
    },
    disabledBtn: {
        backgroundColor: '#f5f6fa',
        color: '#7f8c8d',
        cursor: 'not-allowed',
        boxShadow: 'none'
    },
    pageInfo: {
        fontSize: '14px',
        color: '#2c3e50'
    }
};