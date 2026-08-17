import * as React from "react";
import { FaArrowLeft } from "react-icons/fa";
import type { Account } from "../../types/Account.ts";
import { activateAccount, deactivateAccount } from "../../api/accountsApi.ts";

type AccountDetailProps = {
    account: Account;
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

export default function AccountDetailPage({ account: initialAccount, onBack }: AccountDetailProps) {
    const [account, setAccount] = React.useState<Account>(initialAccount);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "OPENED": return { bg: "#e6f4ea", text: "#137333", border: "#ceedd5" };
            case "PENDING": return { bg: "#fef7e0", text: "#b06000", border: "#fce8b2" };
            case "CLOSED": return { bg: "#fce8e6", text: "#c5221f", border: "#fad2cf" };
            default: return { bg: "#f1f5f9", text: "#5f6368", border: "#e2e8f0" };
        }
    };

    const handleStatusChange = async (action: "activate" | "deactivate") => {
        const actionText = action === "activate" ? "activate" : "deactivate";
        const confirmChange = window.confirm(`Are you sure you want to ${actionText} account ${account.id}?`);

        if (!confirmChange) return;

        setIsLoading(true);

        try {
            const updatedAccount =
                action === "activate"
                    ? await activateAccount(account.id)
                    : await deactivateAccount(account.id);

            setAccount(updatedAccount);

        } catch (error) {
            alert(error instanceof Error ? error.message : "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const statusStyle = getStatusStyle(account.status);

    const primaryDetails = [
        { label: "Customer", value: account.customer },
        { label: "Type", value: account.type },
        { label: "Currency", value: account.currencyIsoCode },
        { label: "Balance", value: account.balance },
        { label: "Bank", value: account.bank },
        { label: "CBU", value: account.cbu }
    ];

    const auditDetails = [
        { label: "Created By", value: account.createdBy },
        { label: "Created At", value: formatDateTime(account.createdAt) },
        { label: "Updated By", value: account.updatedBy },
        { label: "Updated At", value: formatDateTime(account.updatedAt) }
    ];

    return (
        <div style={styles.container}>
            {/* Navigation & Header */}
            <div style={styles.topNav}>
                <button onClick={onBack} style={styles.backBtn}>
                    <FaArrowLeft />
                    <span>Back</span>
                </button>
            </div>

            <div style={styles.headerRow}>
                <div>
                    <h1 style={styles.title}>Account #{account.id}</h1>
                    <span style={styles.subtitle}>Customer: {account.customer || "N/A"}</span>
                </div>

                <div style={styles.actionsGroup}>
                    <span style={{
                        ...styles.statusBadge,
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.text,
                        borderColor: statusStyle.border
                    }}>
                        {account.status === "OPENED" ? "Active" : account.status}
                    </span>

                    {(account.status === "PENDING" || account.status === "CLOSED") && (
                        <button
                            style={{ ...styles.btnAction, ...styles.btnActivate }}
                            onClick={() => handleStatusChange("activate")}
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Activate"}
                        </button>
                    )}
                    {account.status === "OPENED" && (
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

            <div style={styles.divider} />

            {/* General Information */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>General Information</h3>
                <div style={styles.flatGrid}>
                    {primaryDetails.map((item, idx) => (
                        <div key={idx} style={styles.fieldItem}>
                            <span style={styles.label}>{item.label}</span>
                            <span style={styles.value}>{item.value || "-"}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={styles.divider} />

            {/* Audit Details */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Audit Details</h3>
                <div style={styles.flatGrid}>
                    {auditDetails.map((item, idx) => (
                        <div key={idx} style={styles.fieldItem}>
                            <span style={styles.label}>{item.label}</span>
                            <span style={styles.value}>{item.value || "-"}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        width: '100%',
        boxSizing: 'border-box',
        padding: '24px 32px',
        backgroundColor: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    topNav: {
        marginBottom: '16px'
    },
    backBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'transparent',
        color: '#64748b',
        border: '1px solid #cbd5e1',
        padding: '6px 14px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '500'
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
        border: '1px solid'
    },
    btnAction: {
        padding: '8px 16px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: '600',
        cursor: 'pointer',
        border: 'none',
        color: '#ffffff',
        transition: 'opacity 0.15s ease'
    },
    btnActivate: { backgroundColor: '#10b981' },
    btnDeactivate: { backgroundColor: '#ef4444' },
    divider: {
        height: '1px',
        backgroundColor: '#f1f5f9',
        margin: '24px 0'
    },
    section: {
        marginBottom: '8px'
    },
    sectionTitle: {
        margin: '0 0 20px 0',
        fontSize: '12px',
        fontWeight: '600',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    },
    flatGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '24px 32px'
    },
    fieldItem: {
        display: 'flex',
        flexDirection: 'column'
    },
    label: {
        fontSize: '12px',
        color: '#64748b',
        fontWeight: '500',
        marginBottom: '6px'
    },
    value: {
        fontSize: '15px',
        color: '#0f172a',
        fontWeight: '600'
    }
};