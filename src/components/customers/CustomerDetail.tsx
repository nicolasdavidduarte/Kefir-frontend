import * as React from "react";
import type { Customer } from "../../types/Customer.ts";
import { FaArrowLeft } from "react-icons/fa";

type CustomerDetailProps = {
    customer: Customer;
    onBack: () => void;
};

function formatDateTime(dateString: string): string {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

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
        { label: "Created at", value: formatDateTime(customer.creationDate) },
        { label: "Updated at", value: formatDateTime(customer.updateDate) }
    ];

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={onBack}>
                    <FaArrowLeft />
                    <span> Back</span>
                </button>
                <h1 style={styles.title}>Customer Details</h1>
            </div>

            {/* Este es el contenedor que ahora distribuye todo en 2 columnas */}
            <div style={styles.formGrid}>
                {fields.map((field, index) => (
                    <div key={index} style={styles.fieldBox}>
                        <span style={styles.label}>{field.label}</span>
                        <span style={styles.inputFallback}>{field.value}</span>
                    </div>
                ))}

                {/* Caja de estado para que mantenga el mismo diseño alineado */}
                <div style={styles.fieldBox}>
                    <span style={styles.label}>Status</span>
                    <span style={{
                        ...styles.statusBadge,
                        backgroundColor: getStateColor(customer.status)
                    }}>
                        {customer.status}
                    </span>
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
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "16px"
    },
    title: {
        margin: '0 0 40px 0',
        fontSize: '28px',
        fontWeight: 500,
        color: '#2c3e50'
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // Fuerza las dos columnas simétricas idénticas siempre
        gap: '16px 24px',               // Ajustamos un poco los márgenes para dar más aire al texto
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
        flex: '0 0 90px',
        flexShrink: 0,
        borderRight: '1px solid #f1f2f6',
        marginRight: '14px',
        paddingRight: '8px',
        textAlign: 'left'
    },
    inputFallback: {
        color: '#2c3e50',
        fontSize: '15px',
        fontWeight: '500',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    statusBadge: {
        color: 'white',
        padding: '4px 12px',
        borderRadius: '4px',
        fontSize: '13px',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
};