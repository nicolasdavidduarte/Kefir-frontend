import * as React from "react";
import type { Customer } from "../../types/Customer.ts";

type CustomerDetailProps = {
    customer: Customer;
    onBack: () => void;
};

export default function CustomerDetail({ customer, onBack }: CustomerDetailProps) {
    const getStateColor = (state: string) => {
        switch (state) {
            case "ACTIVE": return "#2ecc71";
            case "PENDING": return "#f39c12";
            case "DEACTIVATED": return "#e74c3c";
            default: return "#95a5a6";
        }
    };

    const fields = [
        { label: "Name 1", value: customer.name1 },
        { label: "Name 2", value: customer.name2 || "-" },
        { label: "Name 3", value: customer.name3 || "-" },
        { label: "Lastname 1", value: customer.lastname1 },
        { label: "Lastname 2", value: customer.lastname2 || "-" },
        { label: "Lastname 3", value: customer.lastname3 || "-" },
        { label: "Fullname", value: customer.fullname },
        { label: "Person type", value: customer.personType },
        { label: "Document type", value: customer.documentType },
        { label: "Document number", value: customer.documentNumber },
        { label: "Customer type", value: customer.customerType },
        { label: "Created by user", value: customer.createdByUser },
        { label: "Created by user", value: customer.createdByUser },
        {
            label: "Creation date",
            value: customer.creationDate
                ? new Date(customer.creationDate).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                })
                : "N/A"
        },
        {
            label: "Update date",
            value: customer.updateDate
                ? new Date(customer.updateDate).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                })
                : "N/A"
        },
    ];

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={onBack} style={styles.backBtn}>
                    ← Back
                </button>
                <h2 style={{ margin: 0, color: '#2c3e50' }}>
                    Customer Details - Customer #{customer.id}
                </h2>
            </div>

            <div style={styles.formGrid}>
                {fields.map((field, index) => (
                    <div key={index} style={styles.fieldBox}>
                        <label style={styles.label}>{field.label}</label>
                        <div style={styles.inputFallback}>
                            {field.value}
                        </div>
                    </div>
                ))}

                <div style={styles.fieldBox}>
                    <label style={styles.label}>Status</label>
                    <div style={styles.inputFallback}>
                        <span style={{
                            ...styles.stateBadge,
                            backgroundColor: getStateColor(customer.status)
                        }}>
                            {customer.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        width: '100%',
        boxSizing: 'border-box',
        padding: '10px'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '32px'
    },
    backBtn: {
        backgroundColor: '#7f8c8d',
        color: 'white',
        border: 'none',
        padding: '8px 14px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px'
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '20px',
        width: '100%',
        boxSizing: 'border-box'
    },
    fieldBox: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        border: '1px solid #dcdde1',
        borderRadius: '6px',
        padding: '10px 14px',
        boxSizing: 'border-box',
        height: '50px'
    },
    label: {
        color: '#7f8c8d',
        fontWeight: '600',
        fontSize: '14px',
        width: '130px',
        flexShrink: 0,
        borderRight: '1px solid #f1f2f6',
        marginRight: '14px',
        paddingRight: '8px'
    },
    inputFallback: {
        color: '#2c3e50',
        fontSize: '15px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    stateBadge: {
        color: 'white',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold',
        display: 'inline-block',
        textAlign: 'center',
        minWidth: '80px'
    }
};