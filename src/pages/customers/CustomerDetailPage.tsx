import * as React from "react";
import type { Customer } from "../../types/Customer.ts";
import { FaArrowLeft } from "react-icons/fa";
import { activateCustomer, deactivateCustomer } from "../../api/customersApi.ts";

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

export default function CustomerDetailPage({ customer: initialCustomer, onBack }: CustomerDetailProps) {
    const [customer, setCustomer] = React.useState<Customer>(initialCustomer);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const getStateColor = (state: string) => {
        switch (state) {
            case "ACTIVE": return "#2ecc71";
            case "PENDING": return "#f39c12";
            case "DEACTIVATED": return "#e74c3c";
            default: return "#95a5a6";
        }
    };

    const handleStatusChange = async (action: "activate" | "deactivate") => {
        const actionText = action === "activate" ? "activate" : "deactivate";
        const confirmChange = window.confirm(`¿Are you sure you want to ${actionText} customer ${customer.fullname}?`);

        if (!confirmChange) return;

        setIsLoading(true);

        try {
            const updatedCustomer =
                action === "activate"
                    ? await activateCustomer(customer.id)
                    : await deactivateCustomer(customer.id);

            setCustomer(updatedCustomer)

        } catch (error) {
            alert(error instanceof Error ? error.message : "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const fields = [
        { label: "Name 1", value: customer.name1 },
        { label: "Name 2", value: customer.name2 || "-" },
        { label: "Name 3", value: customer.name3 || "-" },
        { label: "Lastname 1", value: customer.lastname1 },
        { label: "Lastname 2", value: customer.lastname2 || "-" },
        { label: "Lastname 3", value: customer.lastname3 || "-" },
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
                <h1 style={styles.title}>Details of customer {customer.fullname}</h1>
            </div>

            <div style={styles.formGrid}>
                {fields.map((field, index) => (
                    <div key={index} style={styles.fieldBox}>
                        <span style={styles.label}>{field.label}</span>
                        <span style={styles.inputFallback}>{field.value}</span>
                    </div>
                ))}

                <div style={{ ...styles.fieldBox, justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={styles.label}>Status</span>
                        <span style={{
                            ...styles.statusBadge,
                            backgroundColor: getStateColor(customer.status)
                        }}>
                            {customer.status}
                        </span>
                    </div>

                    <div style={styles.actionContainer}>
                        {(customer.status === "PENDING" || customer.status === "DEACTIVATED") && (
                            <button
                                style={{ ...styles.btnAction, ...styles.btnActivate }}
                                onClick={() => handleStatusChange("activate")}
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : "Activate"}
                            </button>
                        )}
                        {(customer.status === "PENDING" || customer.status === "ACTIVE") && (
                            <button
                                style={{ ...styles.btnAction, ...styles.btnDeactivate }}
                                onClick={() => handleStatusChange("deactivate")}
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : "Deactivate"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: { width: '100%', boxSizing: 'border-box', padding: '10px' },
    header: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "16px" },
    title: { margin: '0 0 40px 0', fontSize: '28px', fontWeight: 500, color: '#2c3e50' },
    formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px', width: '100%', boxSizing: 'border-box' },
    fieldBox: { display: 'flex', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #dcdde1', borderRadius: '6px', padding: '10px 14px', boxSizing: 'border-box', height: '50px' },
    label: { color: '#7f8c8d', fontWeight: '600', fontSize: '14px', flex: '0 0 90px', flexShrink: 0, borderRight: '1px solid #f1f2f6', marginRight: '14px', paddingRight: '8px', textAlign: 'left' },
    inputFallback: { color: '#2c3e50', fontSize: '15px', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
    statusBadge: { color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase' },
    actionContainer: { display: 'flex', gap: '8px' },
    btnAction: { padding: '6px 12px', borderRadius: '4px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', border: 'none', color: '#fff', transition: 'background-color 0.2s' },
    btnActivate: { backgroundColor: '#2ecc71' },
    btnDeactivate: { backgroundColor: '#e74c3c' }
};