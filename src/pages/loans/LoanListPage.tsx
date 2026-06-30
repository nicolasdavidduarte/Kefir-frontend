import { useState, useEffect } from "react";
import * as React from "react";
import type { Loan, LoanRequest } from "../../types/Loan.ts";
import { fetchLoans, createLoan } from "../../api/loansApi.ts";
import LoanTable from "../../components/loans/LoanTable.tsx";
import LoanDetailPage from "./LoanDetailPage.tsx";
import NewLoanPage from "./NewLoanPage.tsx";

export default function LoansList() {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 7;

    const loadLoans = (isReload: boolean) => {
        if(isReload) {
            setLoading(true)
        }
        fetchLoans()
            .then((data) => {
                setLoans(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Something went wrong");
                setLoading(false);
            });
    };

    const handleSaveLoan = async (loanData: LoanRequest) => {
        try {
            await createLoan(loanData);
            setIsCreating(false);
            loadLoans(true);
        } catch (err) {
            const errorResponse = err as { message?: string };
            throw new Error(errorResponse.message || "Failed to create loan", { cause: err });
        }
    };

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

    if (isCreating) {
        return (
            <NewLoanPage
                onBack={() => setIsCreating(false)}
                onSave={handleSaveLoan}
            />
        );
    }

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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLoans = loans.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(loans.length / itemsPerPage);

    if (selectedLoan !== null) {
        return (
            <LoanDetailPage
                loan={selectedLoan}
                onBack={() => {setSelectedLoan(null);
                                    loadLoans(true);
            }}
            />
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.tableHeader}>
                <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '24px' }}>Loans</h2>
                <button
                    onClick={() => setIsCreating(true)}
                    style={styles.addBtn}
                >
                    + New Loan
                </button>
            </div>

            {loans.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>
                    No loans found in the database.
                </div>
            ) : (
                <>
                    <LoanTable
                        loans={currentLoans}
                        onSelectLoan={(id) => {
                            const found = loans.find(l => l.id === id);
                            if (found) setSelectedLoan(found);
                        }}
                    />

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
                </>
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