import { useState } from "react";
import * as React from "react";
import type { AccountRequest } from "../../types/Account.ts";
import { FaArrowLeft } from "react-icons/fa";
import CustomerAutocomplete from "../../components/customers/CustomerAutocomplete.tsx";

type NewAccountProps = {
    onBack: () => void;
    onSave: (accountData: AccountRequest) => Promise<void>;
};

export default function NewUserPage({ onBack, onSave }: NewAccountProps) {
    const [type, setType] = useState("");
    const [customerId, setCustomerId] = useState<number | null>(null);
    const [currencyIsoCode, setCurrencyIsoCode] = useState("");
    const [bankId, setBank] = useState<number | null>(1);
    const [bankBranchId, setBranch] = useState<number | null>(1);
    const [initialBalance, setInitialBalance] = useState<number>(0);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        event.preventDefault();
        setError("");

        if (!type || !customerId || !currencyIsoCode || !bankId || !bankBranchId) {
            setError("Fields marked with * are required");
            return;
        }

        try {
            setLoading(true);

            await onSave({
                type,
                customerId,
                currencyIsoCode,
                bankId,
                bankBranchId,
                initialBalance
            });

            onBack();
        } catch (err) {
            const errorResponse = err as { message?: string };
            setError(errorResponse.message || "Failed to create account");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={onBack} style={styles.backBtn}>
                    <FaArrowLeft size={12} />
                    <span>Back to Accounts</span>
                </button>
                <div style={styles.titleArea}>
                    <h2 style={styles.title}>Create New Account</h2>
                    <p style={styles.subtitle}>Fill in the required information to register a new bank account.</p>
                </div>
            </div>

            {error && <div style={styles.errorContainer}>{error}</div>}

            <div style={styles.formCard}>
                <form onSubmit={handleSubmit} style={styles.form}>

                    {/* Account Type */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Account Type *</label>
                        <select
                            style={styles.select}
                            value={type}
                            onChange={e => setType(e.target.value)}
                            disabled={loading}
                        >
                            <option value="">Select account type...</option>
                            <option value="SAVINGS_ACCOUNT">Savings Account</option>
                            <option value="CHECKING_ACCOUNT">Checking Account</option>
                        </select>
                    </div>

                    {/* Customer */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Customer *</label>
                        <CustomerAutocomplete
                            onSelect={(id: string | number | null) => {
                                setCustomerId(id ? Number(id) : null);
                            }}
                            disabled={loading}
                        />
                    </div>

                    {/* Currency */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Currency *</label>
                        <select
                            style={styles.select}
                            value={currencyIsoCode}
                            onChange={e => setCurrencyIsoCode(e.target.value)}
                            disabled={loading}
                        >
                            <option value="">Select currency...</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="ARS">ARS</option>
                        </select>
                    </div>

                    {/* Bank */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Bank *</label>
                        <select
                            style={styles.select}
                            value={bankId ?? ""}
                            onChange={e => {
                                const val = e.target.value;
                                setBank(val === "" ? null : parseInt(val, 10));
                            }}
                            disabled={loading}
                        >
                            <option value="1">KEFIR BANK</option>
                        </select>
                    </div>

                    {/* Branch Id*/}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Bank Branch *</label>
                        <select
                            style={styles.select}
                            value={bankBranchId ?? ""}
                            onChange={e => {
                                const val = e.target.value;
                                setBranch(val === "" ? null : parseInt(val, 10));
                            }}
                            disabled={loading}
                        >
                            <option value="1">MAIN BRANCH</option>
                        </select>
                    </div>

                    {/* Initial Balance */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Initial Balance</label>
                        <input
                            type="number"
                            style={styles.input}
                            value={initialBalance}
                            onChange={e => {
                                const val = e.target.value;
                                setInitialBalance(parseInt(val, 10) || 0);
                            }}
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
                            {loading ? "Saving..." : "Save Account"}
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
        maxWidth: '640px',
        margin: '0 auto',
        boxSizing: 'border-box',
        padding: '24px 16px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: "20px"
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
    titleArea: { display: 'flex', flexDirection: 'column', textAlign: 'left' },
    title: {
        margin: '8px 0 0 0',
        fontSize: '26px',
        fontWeight: 600,
        color: '#1e293b'
    },
    subtitle: { margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' },
    formCard: {
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        padding: '28px',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'left'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
    label: { fontSize: '13px', color: '#334155', fontWeight: '500' },
    input: { padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', color: '#0f172a', outline: 'none', boxSizing: 'border-box', width: '100%' },
    select: { padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', color: '#0f172a', outline: 'none', width: '100%', boxSizing: 'border-box' },
    errorContainer: { backgroundColor: '#fef2f2', color: '#b91c1c', padding: '10px 12px', borderRadius: '6px', fontSize: '13px', border: '1px solid #fecaca', marginBottom: '16px', whiteSpace: 'pre-line' },
    actionRow: { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' },
    cancelBtn: { backgroundColor: '#ffffff', color: '#475569', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '13px' },
    submitBtn: { backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '13px' }
};