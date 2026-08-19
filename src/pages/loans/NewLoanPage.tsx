import { useState } from "react";
import * as React from "react";
import type { LoanRequest } from "../../types/Loan.ts";
import { FaArrowLeft } from "react-icons/fa";
import CustomerAutocomplete from "../../components/customers/CustomerAutocomplete.tsx";
import type { Account } from "../../types/Account.ts";
import { fetchAccountsByCustomerId } from "../../api/accountsApi.ts";

type NewLoanProps = {
    onBack: () => void;
    onSave: (loanData: LoanRequest) => Promise<void>;
};

export default function NewLoanPage({ onBack, onSave }: NewLoanProps) {
    const [customerId, setCustomerId] = useState<number | null>(null);
    const [accountId, setAccountId] = useState<number | null>(null);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loadingAccounts, setLoadingAccounts] = useState(false);
    const [loanType, setLoanType] = useState("");
    const [amortizationType, setAmortizationType] = useState("");
    const [principalAmount, setPrincipalAmount] = useState<number>(0);
    const [currencyIsoCode, setCurrencyIsoCode] = useState("");
    const [numberOfInstallments, setNumberOfInstallments] = useState<number>(0);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCustomerChange = async (id: string | number | null) => {
        const nextId = id ? Number(id) : null;

        setCustomerId(nextId);
        setAccountId(null);
        setCurrencyIsoCode("");

        if (!nextId) {
            setAccounts([]);
            return;
        }

        try {
            setLoadingAccounts(true);
            setError("");

            const data = await fetchAccountsByCustomerId(nextId);
            setAccounts(data);
        } catch (err) {
            console.error("Error fetching accounts", err);
            setAccounts([]);
            setError("Could not load accounts for the selected customer");
        } finally {
            setLoadingAccounts(false);
        }
    };

    const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value ? parseInt(e.target.value, 10) : null;
        setAccountId(selectedId);

        if (selectedId) {
            const selectedAccount = accounts.find(acc => acc.id === selectedId);
            if (selectedAccount) {
                setCurrencyIsoCode(selectedAccount.currencyIsoCode);
            } else {
                setCurrencyIsoCode("");
            }
        } else {
            setCurrencyIsoCode("");
        }
    };

    async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        event.preventDefault();
        setError("");

        if (!loanType || !customerId || !accountId || !currencyIsoCode || !amortizationType || !principalAmount
            || !numberOfInstallments) {
            setError("All fields are required");
            return;
        }

        try {
            setLoading(true);

            await onSave({
                loanType,
                customerId,
                accountId,
                currencyIsoCode,
                amortizationType,
                principalAmount,
                numberOfInstallments
            });

            onBack();
        } catch (err) {
            const errorResponse = err as { message?: string };
            setError(errorResponse.message || "Failed to create loan");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.topNav}>
                <button onClick={onBack} style={styles.backBtn}>
                    <FaArrowLeft size={12} />
                    <span>Back to Loans</span>
                </button>
            </div>

            <div style={styles.header}>
                <h1 style={styles.title}>Create New Loan</h1>
                <p style={styles.subtitle}>Fill in the required information to create a new loan for a customer.</p>
            </div>

            {error && <div style={styles.errorContainer}>{error}</div>}

            <div style={styles.formCard}>
                <form onSubmit={handleSubmit} style={styles.form}>

                    <div style={{ ...styles.inputGroup, gridColumn: 'span 1', gridColumnStart: 1 }}>
                        <label style={styles.label}>Customer *</label>
                        <CustomerAutocomplete
                            onSelect={handleCustomerChange}
                            disabled={loading}
                        />
                    </div>

                    <div style={{ ...styles.inputGroup, gridColumn: 'span 1', gridColumnStart: 1 }}>
                        <label style={styles.label}>Account *</label>
                        <select
                            style={styles.select}
                            value={accountId || ""}
                            onChange={handleAccountChange}
                            disabled={loading || loadingAccounts || !customerId}
                        >
                            <option value="">
                                {loadingAccounts ? "Loading accounts..." : "Select an account..."}
                            </option>
                            {accounts.map(acc => (
                                <option key={acc.id} value={acc.id}>
                                    {acc.type} - CBU: {acc.cbu} ({acc.currencyIsoCode})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ ...styles.inputGroup, gridColumnStart: 1 }}>
                        <label style={styles.label}>Loan Type *</label>
                        <select
                            style={styles.select}
                            value={loanType}
                            onChange={e => setLoanType(e.target.value)}
                            disabled={loading}
                        >
                            <option value="">Select...</option>
                            <option value="PERSONAL">Personal</option>
                            <option value="MORTGAGE">Mortgage</option>
                            <option value="LEASING">Leasing</option>
                            <option value="AUTO">Auto</option>
                            <option value="BUSINESS">Business</option>
                        </select>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Amortization Type *</label>
                        <select
                            style={styles.select}
                            value={amortizationType}
                            onChange={e => setAmortizationType(e.target.value)}
                            disabled={loading}
                        >
                            <option value="">Select...</option>
                            <option value="FRENCH">French</option>
                            <option value="GERMAN">German</option>
                            <option value="AMERICAN">American</option>
                        </select>
                    </div>

                    <div style={{ ...styles.inputGroup, gridColumn: 'span 1', gridColumnStart: 1 }}>
                        <label style={styles.label}>Currency</label>
                        <select
                            style={styles.select}
                            value={currencyIsoCode}
                            onChange={e => setCurrencyIsoCode(e.target.value)}
                            disabled={true}
                        >
                            <option value="">Select...</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="ARS">ARS</option>
                        </select>
                    </div>

                    <div style={{ ...styles.inputGroup, gridColumnStart: 1 }}>
                        <label style={styles.label}>Principal Amount *</label>
                        <input
                            type="number"
                            style={styles.input}
                            value={principalAmount}
                            onChange={e => {
                                const val = e.target.value;
                                setPrincipalAmount(parseInt(val, 10));}}
                            disabled={loading}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Number of Installments *</label>
                        <input
                            type="number"
                            style={styles.input}
                            value={numberOfInstallments}
                            onChange={e => {
                                const val = e.target.value;
                                setNumberOfInstallments(parseInt(val, 10));}}
                            disabled={loading}
                        />
                    </div>

                    <div style={styles.actionRow}>
                        <button
                            type="button"
                            onClick={onBack}
                            style={styles.cancelBtn}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={styles.submitBtn}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save Loan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        width: '100%',
        boxSizing: 'border-box',
        padding: '0',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    topNav: {
        marginBottom: '12px'
    },
    backBtn: {
        backgroundColor: 'transparent',
        color: '#64748b',
        border: 'none',
        padding: '0',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '500',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px'
    },
    header: {
        marginBottom: '20px',
        textAlign: 'left'
    },
    title: {
        margin: '0',
        fontSize: '24px',
        fontWeight: 700,
        color: '#0f172a'
    },
    subtitle: {
        margin: '4px 0 0 0',
        fontSize: '13px',
        color: '#64748b'
    },
    formCard: {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        padding: '28px',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'left'
    },
    form: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px 24px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
    },
    label: {
        fontSize: '12px',
        color: '#334155',
        fontWeight: '600'
    },
    input: {
        height: '38px',
        padding: '0 12px',
        borderRadius: '6px',
        border: '1px solid #cbd5e1',
        fontSize: '14px',
        color: '#0f172a',
        outline: 'none',
        boxSizing: 'border-box',
        width: '100%'
    },
    select: {
        height: '38px',
        padding: '0 12px',
        borderRadius: '6px',
        border: '1px solid #cbd5e1',
        fontSize: '14px',
        color: '#0f172a',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box'
    },
    errorContainer: {
        backgroundColor: '#fef2f2',
        color: '#b91c1c',
        padding: '10px 12px',
        borderRadius: '6px',
        fontSize: '13px',
        border: '1px solid #fecaca',
        marginBottom: '16px',
        whiteSpace: 'pre-line'
    },
    actionRow: {
        gridColumn: '1 / -1',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        marginTop: '8px',
        paddingTop: '16px',
        borderTop: '1px solid #f1f5f9'
    },
    cancelBtn: {
        backgroundColor: '#ffffff',
        color: '#475569',
        border: '1px solid #cbd5e1',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '13px'
    },
    submitBtn: {
        backgroundColor: '#0f172a',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '13px'
    }
};