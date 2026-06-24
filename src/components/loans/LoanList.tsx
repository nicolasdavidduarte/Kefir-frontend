import { useState, useEffect } from "react";
import * as React from "react";
import type { Loan } from "../../types/Loan.ts";
import {fetchLoans} from "../../api/loansApi.ts";
import LoanTable from "./LoanTable.tsx";
import LoanDetail from "./LoanDetail.tsx";

export default function LoansList() {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Cambiado: Ahora guardamos el objeto completo del préstamo seleccionado
    const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

    useEffect(() => {
        fetchLoans()
            .then((data) => {
                setLoans(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Something went wrong");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div style={{ padding: '20px', color: '#7f8c8d' }}>Loading loans...</div>;
    }

    if (error) {
        return (
            <div style={{ padding: '20px', color: '#e74c3c', fontWeight: 'bold' }}>
                Error: {error}
            </div>
        );
    }

    if (selectedLoan !== null) {
        return (
            <LoanDetail
                loan={selectedLoan} // Pasamos el préstamo completo
                onBack={() => setSelectedLoan(null)}
            />
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.tableHeader}>
                <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '24px' }}>Loans</h2>
                <button style={styles.addBtn}>+ New Loan</button>
            </div>

            {loans.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>
                    No loans found in the database.
                </div>
            ) : (
                // Buscamos el objeto Loan correspondiente al ID seleccionado
                <LoanTable
                    loans={loans}
                    onSelectLoan={(id) => {
                        const found = loans.find(l => l.id === id);
                        if (found) setSelectedLoan(found);
                    }}
                />
            )}
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        width: '100%',
        boxSizing: 'border-box'
    },
    tableHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '24px',
        boxSizing: 'border-box'
    },
    addBtn: {
        backgroundColor: '#2ecc71',
        color: 'white',
        border: 'none',
        padding: '10px 18px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px',
        transition: 'background-color 0.2s'
    }
};