import {useState, useEffect, useCallback} from "react";
import * as React from "react";
import {createInstallmentPayment, fetchLoanInstallments} from "../../api/loanInstallmentsApi.ts";
import type { LoanInstallment } from "../../types/LoanInstallment.ts";
import type { Loan } from "../../types/Loan.ts";
import LoanInstallmentTable from "../../components/loans/LoanInstallmentTable.tsx";
import { FaArrowLeft } from "react-icons/fa";
import { approveLoan, chargeOffLoan } from "../../api/loansApi.ts";

type LoanDetailProps = {
    loan: Loan;
    onInstallmentPaid?: () => void;
    onBack: () => void;
};

export default function LoanDetailPage({ loan: initialLoan, onBack }: LoanDetailProps) {
    const [loan, setLoan] = React.useState<Loan>(initialLoan);
    const [installments, setInstallments] = useState<LoanInstallment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadInstallments = useCallback(async () => {
        return await fetchLoanInstallments(loan.id);
    }, [loan.id]);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                const data = await loadInstallments();

                if (!cancelled) {
                    setInstallments(data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Failed to load installments"
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        void load();

        return () => {
            cancelled = true;
        };
    }, [loadInstallments]);

    const formatCurrency = (amount: number | string | undefined) => {
        if (amount === undefined || amount === null) return "0,00";
        const num = typeof amount === "string" ? parseFloat(amount) : amount;
        return isNaN(num) ? "0,00" : num.toLocaleString("es-AR", { minimumFractionDigits: 2 });
    };

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };

    const statusColors: Record<string, string> = {
        pending: "#f39c12",
        active: "#2ecc71",
        closed: "#e74c3c",
        charge_off: "#e74c3c",
    };

    const handleStatusChange = async (action: "approve" | "charge-off") => {
        const confirmChange = window.confirm(`¿Are you sure you want to ${action} loan ${loan.id}?`);

        if (!confirmChange) return;

        setLoading(true);

        try {
            const updatedLoan =
                action === "approve"
                    ? await approveLoan(loan.id)
                    : await chargeOffLoan(loan.id);

            setLoan(updatedLoan)

            const updatedInstallments = await loadInstallments();
            setInstallments(updatedInstallments);

        } catch (error) {
            alert(error instanceof Error ? error.message : "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };


    const handleInstallmentPayment = async (
        loanId: number,
        installmentNumber: number
    ) => {
        const confirmed = window.confirm(
            `Are you sure you want to pay installment #${installmentNumber}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await createInstallmentPayment(loanId, installmentNumber);

            if (response && response.loanStatus) {
                setLoan(prevLoan => ({
                    ...prevLoan,
                    status: response.loanStatus
                }));
            }

            const data = await loadInstallments();
            setInstallments(data);
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred."
            );
        }
    };

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
                <button onClick={onBack} style={styles.backButton}>
                    <FaArrowLeft />
                    <span> Back</span>
                </button>
                <h2 style={styles.title}>
                    Details of loan #{loan.id}
                </h2>
            </div>

            <div style={styles.summaryCard}>

                <h3 style={styles.sectionTitle}>General Information</h3>
                <div style={styles.summaryGrid}>
                    <div>
                        <span style={styles.summaryLabel}>Customer</span>
                        <span style={styles.summaryValue}>{loan.customer}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>External ID</span>
                        <span style={styles.summaryValue}>{loan.externalId || "N/A"}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>Loan Type</span>
                        <span style={styles.summaryValue}>{loan.loanType}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>Amortization Type</span>
                        <span style={styles.summaryValue}>{loan.amortizationType}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>Opening Date</span>
                        <span style={styles.summaryValue}>{formatDate(loan.openingDate)}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>Expiration Date</span>
                        <span style={styles.summaryValue}>{formatDate(loan.expirationDate)}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>Status</span>
                        <span style={{
                            ...styles.statusBadge,
                            backgroundColor: statusColors[loan.status.toLowerCase()] || "#95a5a6"
                        }}>
                                    {loan.status.replace(/_/g, ' ')}
                        </span>
                    </div>
                </div>

                <hr style={styles.divider} />

                <h3 style={styles.sectionTitle}>Financial Terms</h3>
                <div style={styles.summaryGrid}>
                    <div>
                        <span style={styles.summaryLabel}>Currency</span>
                        <span style={styles.summaryValue}>{loan.currency}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>Installments</span>
                        <span style={styles.summaryValue}>{loan.numberOfInstallments}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>Annual Interest Rate (TNA)</span>
                        <span style={styles.summaryValue}>{loan.annualInterestRate}%</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>Monthly Interest Rate (TEM)</span>
                        <span style={styles.summaryValue}>{loan.monthlyInterestRate}%</span>
                    </div>
                </div>

                <hr style={styles.divider} />

                <h3 style={styles.sectionTitle}>Financial Totals</h3>
                <div style={styles.summaryGrid}>
                    <div>
                        <span style={styles.summaryLabel}>Total Principal</span>
                        <span style={styles.summaryValue}>${formatCurrency(loan.totalPrincipal)}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>Total Interest</span>
                        <span style={styles.summaryValue}>${formatCurrency(loan.totalInterest)}</span>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <span style={styles.summaryLabel}>Total Operation Amount</span>
                        <span style={{ ...styles.summaryValue, fontWeight: '700', color: '#2c3e50' }}>
                            ${formatCurrency(loan.totalOperationAmount)}
                        </span>
                    </div>
                </div>

                <hr style={styles.divider} />

                <h3 style={styles.sectionTitle}>Audit Data</h3>
                <div style={styles.summaryGrid}>
                    <div>
                        <span style={styles.summaryLabel}>Created by</span>
                        <span style={styles.summaryValue}>{loan.createdBy || "N/A"}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>Created by</span>
                        <span style={styles.summaryValue}>{formatDate(loan.createdAt)}</span>
                    </div>
                </div>

            </div>

            <span style={{display:"flex", justifyContent: "left", marginBottom:"20px"}}>
            <h2 style={styles.title}>
                Installments details
            </h2>
            </span>


            {installments.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>
                    No installments found for this loan.
                </div>
            ) : (
                <LoanInstallmentTable
                    key={loan.id}
                    installments={installments}
                    onInstallmentPayment={handleInstallmentPayment}
                />
            )}

            <span style={{display:"flex", justifyContent: "right", marginTop: "25px"}}>


                        {(loan.status === "PENDING" || loan.status === "INACTIVE") && (
                            <button
                                style={{ ...styles.btnAction, ...styles.btnActivate }}
                                onClick={() => handleStatusChange("approve")}
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "Approve"}
                            </button>
                        )}
                {(loan.status === "ACTIVE") && (
                    <button
                        style={{ ...styles.btnAction, ...styles.btnDeactivate }}
                        onClick={() => handleStatusChange("charge-off")}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Charge-Off"}
                    </button>
                )}

            </span>
        </div>

    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        width: '100%',
        maxHeight: 'calc(100vh - 180px)',
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingRight: '8px',
        boxSizing: 'border-box'
    },
    header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "16px",
        marginBottom: '20px'
    },
    title: {
        margin: 0,
        color: '#2c3e50',
        fontSize: '22px'
    },
    summaryCard: {
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '32px',
        boxSizing: 'border-box',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    },
    sectionTitle: {
        margin: '0 0 14px 0',
        color: '#34495e',
        fontSize: '14px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    summaryGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px 24px',
        marginBottom: '4px'
    },
    summaryLabel: {
        display: 'block',
        fontSize: '11px',
        fontWeight: '600',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '4px'
    },
    summaryValue: {
        display: 'block',
        fontSize: '15px',
        fontWeight: '500',
        color: '#334155',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    divider: {
        border: 'none',
        borderTop: '1px solid #f1f5f9',
        margin: '20px 0'
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
    },
    backBtn: { backgroundColor: '#7f8c8d', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' },
    btnAction: { padding: '6px 12px', borderRadius: '4px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', border: 'none', color: '#fff', transition: 'background-color 0.2s' },
    btnActivate: { backgroundColor: '#2ecc71' },
    btnDeactivate: { backgroundColor: '#e74c3c' }
};