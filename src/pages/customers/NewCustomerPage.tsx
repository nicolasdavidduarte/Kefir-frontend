import { useState } from "react";
import * as React from "react";
import type { CustomerCreationRequest } from "../../types/Customer.ts";
import { FaArrowLeft } from "react-icons/fa";

type NewCustomerProps = {
    onBack: () => void;
    onSave: (customerData: CustomerCreationRequest) => Promise<void>;
};

export default function NewUserPage({ onBack, onSave }: NewCustomerProps) {
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [name3, setName3] = useState("");
    const [lastname1, setLastname1] = useState("");
    const [lastname2, setLastname2] = useState("");
    const [lastname3, setLastname3] = useState("");
    const [personType, setPersonType] = useState("");
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
            const errorResponse = err as { message?: string };
            setError(errorResponse.message || "Failed to create user");
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
                    Create New Customer
                </h2>
            </div>

            {error && (
                <div style={styles.errorContainer}>
                    {error}
                </div>
            )}

            <div style={styles.formCard}>
                <form onSubmit={handleSubmit} style={styles.form}>

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
                            <option value="JURIDICIAL">Juridicial</option>
                        </select>
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
    backBtn: { backgroundColor: '#7f8c8d', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' },
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