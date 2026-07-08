import { useState } from "react";
import * as React from "react";
import type { LoanRequest } from "../../types/Loan.ts";
import { FaArrowLeft } from "react-icons/fa";
import CustomerAutocomplete from "../../components/customers/CustomerAutocomplete.tsx";
import type {Account} from "../../types/Account.ts";
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
            <div style={styles.header}>
                <button onClick={onBack} style={styles.backButton}>
                    <FaArrowLeft />
                    <span> Back</span>
                </button>
                <h2 style={styles.title}>
                    Create New Loan
                </h2>
            </div>

            {error && (
                <div style={styles.errorContainer}>
                    {error}
                </div>
            )}

            <div style={styles.formCard}>
                <form onSubmit={handleSubmit} style={styles.form}>

                    {/* Customer */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Customer</label>
                        <CustomerAutocomplete
                            onSelect={handleCustomerChange}
                            disabled={loading}
                        />
                    </div>

                    {/* Account */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Account</label>
                        <select
                            style={styles.select}
                            value={accountId || ""}
                            onChange={e => setAccountId(e.target.value ? parseInt(e.target.value, 10) : null)}
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

                    {/* Loan Type */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Loan Type</label>
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

                    {/* Currency */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Currency</label>
                        <select
                            style={styles.select}
                            value={currencyIsoCode}
                            onChange={e => setCurrencyIsoCode(e.target.value)}
                            disabled={loading}
                        >
                            <option value="">Select...</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="ARS">ARS</option>
                        </select>
                    </div>

                    {/* Amortization Type */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Amortization Type</label>
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

                    {/* Principal Amount */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Principal Amount</label>
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

                    {/* Number of Installments */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Number of Installments</label>
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
                            {loading ? "Saving..." : "Save"}
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
        padding: '10px',
    },
    header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "16px"
    },
    titleArea: { display: 'flex', flexDirection: 'column', textAlign: 'left' },
    title:{
        margin: '0 0 40px 0',
        fontSize: '28px',
        fontWeight: 500,
        color: '#2c3e50'
    },
    subtitle: { margin: '4px 0 0 0', fontSize: '13px', color: '#95a5a6' },
    formCard: {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        padding: '32px',
        maxWidth: '600px',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'left',
        maxHeight: '100%',
        overflow: 'hidden'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
    label: { fontSize: '13px', color: '#34495e', fontWeight: '600' },
    input: { padding: '10px 14px', borderRadius: '6px', border: '1px solid #dcdde1', fontSize: '14px', color: '#2c3e50', backgroundColor: '#fcfcfc', outline: 'none', boxSizing: 'border-box', width: '100%' },
    select: { padding: '10px 14px', borderRadius: '6px', border: '1px solid #dcdde1', fontSize: '14px', color: '#2c3e50', backgroundColor: '#fcfcfc', outline: 'none', width: '100%' },
    errorContainer: { backgroundColor: '#fdf1f0', color: '#e74c3c', padding: '10px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', border: '1px solid #fadbd8' },
    actionRow: { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' },
    cancelBtn: { backgroundColor: '#f4f6f7', color: '#7f8c8d', border: '1px solid #d5dbdb', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' },
    submitBtn: { backgroundColor: '#3498db', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', boxShadow: '0 4px 10px rgba(52, 152, 219, 0.2)' }
};