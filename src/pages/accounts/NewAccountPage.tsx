import { useState } from "react";
import * as React from "react";
import type { AccountRequest } from "../../types/Account.ts";
import {FaArrowLeft} from "react-icons/fa";
import CustomerAutocomplete from "../../components/customers/CustomerAutocomplete.tsx"

type NewAccountProps = {
    onBack: () => void;
    onSave: (accountData: AccountRequest) => Promise<void>;
};

export default function NewUserPage({ onBack, onSave }: NewAccountProps) {
    const [type, setType] = useState("SAVINGS_ACCOUNT");
    const [customerId, setCustomerId] = useState<number | null>(null);
    const [currencyIsoCode, setCurrencyIsoCode] = useState("USD");
    const [bankId, setBank] = useState<number | null>(null);
    const [bankBranchId, setBranch] = useState<number | null>(null);
    const [initialBalance, setInitialBalance] = useState<number>(0);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        event.preventDefault();
        setError("");

        if (!type || !customerId || !currencyIsoCode || !bankId|| !bankBranchId) {
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
                <button onClick={onBack} style={styles.backButton}>
                    <FaArrowLeft />
                    <span> Back</span>
                </button>
                <h2 style={styles.title}>
                    Create New Account
                </h2>
            </div>

            {error && (
                <div style={styles.errorContainer}>
                    {error}
                </div>
            )}

            <div style={styles.formCard}>
                <form onSubmit={handleSubmit} style={styles.form}>

                    {/* Account Type */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Account Type (*)</label>
                        <select
                            style={styles.select}
                            value={type}
                            onChange={e => setType(e.target.value)}
                            disabled={loading}
                        >
                            <option value="SAVINGS_ACCOUNT">Savings Account</option>
                            <option value="CHECKING_ACCOUNT">Checking Account</option>
                        </select>
                    </div>

                    {/* Customer */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Customer (*)</label>
                        <CustomerAutocomplete
                            onSelect={(id: string | number | null) => {
                                setCustomerId(id ? Number(id) : null);
                            }}
                            disabled={loading}
                        />
                    </div>

                    {/* Currency */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Currency (*)</label>
                        <select
                            style={styles.select}
                            value={currencyIsoCode}
                            onChange={e => setCurrencyIsoCode(e.target.value)}
                            disabled={loading}
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="ARS">ARS</option>
                        </select>
                    </div>

                    {/* Bank */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Bank Id (*)</label>
                        <input
                            type="number"
                            style={styles.input}
                            value={bankId ?? ""}
                            onChange={e => {
                                const val = e.target.value;
                                setBank(val === "" ? null : parseInt(val, 10));}}
                            disabled={loading}
                        />
                    </div>

                    {/* Branch Id*/}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Bank Branch Id (*)</label>
                        <input
                            type="number"
                            style={styles.input}
                            value={bankBranchId ?? ""}
                            onChange={e => {
                                const val = e.target.value;
                                setBranch(val === "" ? null : parseInt(val, 10));}}
                            disabled={loading}
                        />
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
                                setInitialBalance(parseInt(val, 10));}}
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