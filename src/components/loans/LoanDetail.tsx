import { useState, useEffect } from "react";
import * as React from "react";
import { fetchLoanInstallments } from "../../api/loanInstallmentsApi.ts";
import type { LoanInstallment } from "../../types/LoanInstallment.ts";
import LoanInstallmentTable from "./LoanInstallmentTable.tsx";

type LoanDetailProps = {
    loanId: number;
    onBack: () => void;
};

export default function LoanDetail({ loanId, onBack }: LoanDetailProps) {
    const [installments, setInstallments] = useState<LoanInstallment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchLoanInstallments(loanId)
            .then((data) => {
                setInstallments(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Failed to load loan installments");
                setLoading(false);
            });
    }, [loanId]);

    if (loading) {
        return <div style={{ padding: '20px', color: '#7f8c8d' }}>Loading installment details...</div>;
    }

    if (error) {
        return (
            <div style={{ padding: '20px', color: '#e74c3c', fontWeight: 'bold' }}>
                Error: {error}
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={onBack} style={styles.backBtn}>
                    ← Back
                </button>
                <h2 style={{ margin: 0, color: '#2c3e50' }}>
                    Installment Details - Loan #{loanId}
                </h2>
            </div>

            {installments.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>
                    No installments found for this loan.
                </div>
            ) : (
                <LoanInstallmentTable installments={installments} />
            )}
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        width: '100%',
        boxSizing: 'border-box'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '24px'
    },
    backBtn: {
        backgroundColor: '#7f8c8d',
        color: 'white',
        border: 'none',
        padding: '8px 14px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px'
    }
};