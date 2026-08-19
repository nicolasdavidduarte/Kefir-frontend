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
            <div style={styles.topNav}>
                <button onClick={onBack} style={styles.backBtn}>
                    <FaArrowLeft size={12} />
                    <span>Back to Accounts</span>
                </button>
            </div>

            <div style={styles.header}>
                <h1 style={styles.title}>Create New Account</h1>
                <p style={styles.subtitle}>Fill in the required information to register a new bank account.</p>
            </div>

            {error && <div style={styles.errorContainer}>{error}</div>}

            <div style={styles.formCard}>
                <form onSubmit={handleSubmit} style={styles.form}>

                    <div style={{ ...styles.inputGroup, gridColumn: '1 / -1' }}>
                        <label style={styles.label}>Customer *</label>
                        <CustomerAutocomplete
                            onSelect={(id: string | number | null) => {
                                setCustomerId(id ? Number(id) : null);
                            }}
                            disabled={loading}
                        />
                    </div>

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

                    <div style={{ ...styles.inputGroup, gridColumnStart: 1 }}>
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