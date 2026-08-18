import * as React from "react";
import type { Customer } from "../../types/Customer.ts";
import { FaArrowLeft } from "react-icons/fa";
import { activateCustomer, deactivateCustomer } from "../../api/customersApi.ts";

type CustomerDetailProps = {
    customer: Customer;
    onBack: () => void;
};

function formatDateTime(dateString: string): string {
    if (!dateString) return "N/A";
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

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "ACTIVE": return { bg: "#e6f4ea", text: "#137333", border: "#ceedd5" };
            case "PENDING": return { bg: "#fef7e0", text: "#b06000", border: "#fce8b2" };
            case "DEACTIVATED": return { bg: "#fce8e6", text: "#c5221f", border: "#fad2cf" };
            default: return { bg: "#f1f5f9", text: "#5f6368", border: "#e2e8f0" };
        }
    };

    const handleStatusChange = async (action: "activate" | "deactivate") => {
        const actionText = action === "activate" ? "activate" : "deactivate";
        const confirmChange = window.confirm(`Are you sure you want to ${actionText} customer ${customer.fullname}?`);

        if (!confirmChange) return;

        setIsLoading(true);

        try {
            const updatedCustomer =
                action === "activate"
                    ? await activateCustomer(customer.id)
                    : await deactivateCustomer(customer.id);

            setCustomer(updatedCustomer);

        } catch (error) {
            alert(error instanceof Error ? error.message : "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const statusStyle = getStatusStyle(customer.status);

    const fullName = `${customer.name1} ${customer.name2 || ""} ${customer.name3 || ""} ${customer.lastname1} ${customer.lastname2 || ""} ${customer.lastname3 || ""}`.replace(/\s+/g, ' ').trim();

    return (
        <div style={styles.container}>
            {/* Navigation & Header */}
            <div style={styles.topNav}>
                <button onClick={onBack} style={styles.backBtn}>
                    <FaArrowLeft size={12} />
                    <span>Back to Customers</span>
                </button>
            </div>

            <div style={styles.headerRow}>
                <div>
                    <h1 style={styles.title}>{customer.fullname}</h1>
                    <span style={styles.subtitle}>Customer ID: {customer.id}</span>
                </div>

                <div style={styles.actionsGroup}>
                    <span style={{
                        ...styles.statusBadge,
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.text,
                        borderColor: statusStyle.border
                    }}>
                        {customer.status === "ACTIVE" ? "Active" : customer.status.toLowerCase()}
                    </span>

                    {(customer.status === "PENDING" || customer.status === "DEACTIVATED") && (
                        <button
                            style={styles.actionBtn}
                            onClick={() => handleStatusChange("activate")}
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Activate"}
                        </button>
                    )}
                    {customer.status === "ACTIVE" && (
                        <button
                            style={styles.actionBtn}
                            onClick={() => handleStatusChange("deactivate")}
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Deactivate"}
                        </button>
                    )}
                </div>
            </div>

            {/* Summary Card */}
            <div style={styles.summaryCard}>
                {/* General Information */}
                <h3 style={styles.sectionTitle}>General Information</h3>
                <div style={styles.summaryGrid}>
                    <div>
                        <span style={styles.summaryLabel}>Full Name</span>
                        <span style={styles.summaryValue}>{fullName || "N/A"}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>Person Type</span>
                        <span style={styles.summaryValue}>{customer.personType || "N/A"}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>Document</span>
                        <span style={styles.summaryValue}>{`${customer.documentType} - ${customer.documentNumber}`}</span>
                    </div>
                    <div style={{ gridColumnStart: 1 }}>
                        <span style={styles.summaryLabel}>Customer Type</span>
                        <span style={styles.summaryValue}>{customer.customerType || "N/A"}</span>
                    </div>
                </div>

                <hr style={styles.divider} />

                {/* Audit Details */}
                <h3 style={styles.sectionTitle}>Audit Details</h3>
                <div style={styles.summaryGrid}>
                    <div>
                        <span style={styles.summaryLabel}>Created By</span>
                        <span style={styles.summaryValue}>{customer.createdBy || "N/A"}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>Created At</span>
                        <span style={styles.summaryValue}>{formatDateTime(customer.createdAt)}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>Updated By</span>
                        <span style={styles.summaryValue}>{customer.updatedBy || "N/A"}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>Updated At</span>
                        <span style={styles.summaryValue}>{formatDateTime(customer.updatedAt)}</span>
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
    headerRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '20px'
    },
    title: {
        margin: 0,
        color: '#0f172a',
        fontSize: '24px',
        fontWeight: '700'
    },
    subtitle: {
        fontSize: '13px',
        color: '#64748b',
        marginTop: '4px',
        display: 'block'
    },
    actionsGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    statusBadge: {
        padding: '5px 12px',
        borderRadius: '16px',
        fontSize: '13px',
        fontWeight: '500',
        border: '1px solid',
        textTransform: 'capitalize'
    },
    actionBtn: {
        background: 'none',
        border: '1px solid #cbd5e1',
        borderRadius: '6px',
        padding: '6px 12px',
        cursor: 'pointer',
        fontSize: '13px',
        color: '#475569',
        fontWeight: '500',
        transition: 'all 0.15s ease'
    },
    summaryCard: {
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '24px',
        width: '100%',
        boxSizing: 'border-box',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        textAlign: 'left'
    },
    sectionTitle: {
        margin: '0 0 16px 0',
        fontSize: '12px',
        fontWeight: '600',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    },
    summaryGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px 24px'
    },
    summaryLabel: {
        display: 'block',
        fontSize: '11px',
        fontWeight: '600',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '4px'
    },
    summaryValue: {
        display: 'block',
        fontSize: '14px',
        fontWeight: '500',
        color: '#334155',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    divider: {
        height: '1px',
        backgroundColor: '#f1f5f9',
        margin: '20px 0',
        border: 'none'
    }
};