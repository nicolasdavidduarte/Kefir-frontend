import { useState } from "react";
import * as React from "react";
import type { CustomerCreationRequest } from "../../types/Customer.ts";
import { FaArrowLeft } from "react-icons/fa";
import { ApiError } from "../../api/http.ts";

type NewCustomerProps = {
    onBack: () => void;
    onSave: (customerData: CustomerCreationRequest) => Promise<void>;
};

export default function NewUserPage({ onBack, onSave }: NewCustomerProps) {
    const [personType, setPersonType] = useState("NATURAL");
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [name3, setName3] = useState("");
    const [lastname1, setLastname1] = useState("");
    const [lastname2, setLastname2] = useState("");
    const [lastname3, setLastname3] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [customerType, setCustomerType] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        event.preventDefault();
        setError("");

        if (!name1 || !lastname1 || !personType || !documentType|| !documentNumber || !customerType) {
            setError("All fields are required");
            return;
        }

        try {
            setLoading(true);

            await onSave({
                name1,
                name2,
                name3,
                lastname1,
                lastname2,
                lastname3,
                personType,
                documentType,
                documentNumber,
                customerType
            });

            onBack();
        } catch (err) {
            if (err instanceof ApiError && err.payload?.message) {
                const backendMessage = err.payload.message;

                if (typeof backendMessage === "object") {
                    const formattedErrors = Object.entries(backendMessage).map(
                        ([field, msg]) => `${field}: ${msg}`
                    ).toReversed();
                    setError(formattedErrors.join("\n"));
                } else {
                    setError(backendMessage);
                }
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to create customer");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={onBack} style={styles.backBtn}>
                    <FaArrowLeft size={12} />
                    <span> Back to Customers</span>
                </button>
                <h2 style={styles.title}> Create New Customer</h2>
            </div>

            {error && <div style={styles.errorContainer}>{error}</div>}

            <div style={styles.formCard}>
                <form onSubmit={handleSubmit} style={styles.form}>

                    {/* Person Type */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Person Type</label>
                        <select
                            style={styles.select}
                            value={personType}
                            onChange={e => setPersonType(e.target.value)}
                            disabled={loading}
                        >
                            <option value="">Select...</option>
                            <option value="NATURAL">Natural </option>
                        </select>
                    </div>

                    {/* Name1 */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Name 1</label>
                        <input
                            type="text"
                            style={styles.input}
                            placeholder="e.g. Mary"
                            value={name1}
                            onChange={e => setName1(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/* Name2 */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Name 2</label>
                        <input
                            type="text"
                            style={styles.input}
                            value={name2}
                            onChange={e => setName2(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/* Name3 */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Name 3</label>
                        <input
                            type="text"
                            style={styles.input}
                            value={name3}
                            onChange={e => setName3(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/* Lastname1 */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Lastname 1</label>
                        <input
                            type="text"
                            style={styles.input}
                            placeholder="e.g. Sue"
                            value={lastname1}
                            onChange={e => setLastname1(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/* Lastname2 */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Lastname 2</label>
                        <input
                            type="text"
                            style={styles.input}
                            value={lastname2}
                            onChange={e => setLastname2(e.target.value)}
                            disabled={loading}
                        />
                    </div>


                    {/* Lastname3 */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Lastname 3</label>
                        <input
                            type="text"
                            style={styles.input}
                            value={lastname3}
                            onChange={e => setLastname3(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/* Document Type */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Document Type</label>
                        <select
                            style={styles.select}
                            value={documentType}
                            onChange={e => setDocumentType(e.target.value)}
                            disabled={loading}
                        >
                            <option value="">Select...</option>
                            <option value="DNI">DNI</option>
                            <option value="PASSPORT">Passport</option>
                        </select>
                    </div>

                    {/* Document Number */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Document Number</label>
                        <input
                            type="text"
                            style={styles.input}
                            placeholder="e.g. 34345545"
                            value={documentNumber}
                            onChange={e => setDocumentNumber(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/* Customer Type */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Customer Type</label>
                        <select
                            style={styles.select}
                            value={customerType}
                            onChange={e => setCustomerType(e.target.value)}
                            disabled={loading}
                        >
                            <option value="">Select...</option>
                            <option value="RETAIL">Retail</option>
                            <option value="CORPORATE">Corporate</option>
                        </select>
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
        width: '100%'
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
    title: {
        margin: 0,
        fontSize: '18px',
        fontWeight: '600',
        color: '#0f172a'
    },
    formCard: {
        backgroundColor: '#ffffff',
        maxWidth: '500px',
        width: '100%'
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