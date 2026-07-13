import * as React from "react";
import { FaArrowLeft } from "react-icons/fa";
import type {Account} from "../../types/Account.ts";
import {activateAccount, deactivateAccount} from "../../api/accountsApi.ts";

type AccountDetailProps = {
    account: Account;
    onBack: () => void;
};

export default function AccountDetailPage({ account: initialAccount, onBack }: AccountDetailProps) {
    const [account, setAccount] = React.useState<Account>(initialAccount);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    function formatDateTime(dateString: string): string {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    const getStateColor = (state: string) => {
        switch (state) {
            case "OPENED": return "#2ecc71";
            case "PENDING": return "#f39c12";
            case "CLOSED": return "#e74c3c";
            default: return "#95a5a6";
        }
    };

    const fields = [
        { label: "Id", value: account.id },
        { label: "Customer", value: account.customer || "-" },
        { label: "Type", value: account.type || "-" },
        { label: "Currency", value: account.currencyIsoCode },
        { label: "Bank", value: account.bank || "-" },
        { label: "CBU", value: account.cbu || "-" },
        { label: "Balance", value: account.balance },
        { label: "Created by", value: account.createdBy },
        { label: "Created at", value: formatDateTime(account.createdAt) },
        { label: "Updated by", value: account.updatedBy },
        { label: "Updated at", value: formatDateTime(account.updatedAt) },
    ];

    const handleStatusChange = async (action: "activate" | "deactivate") => {
        const actionText = action === "activate" ? "activate" : "deactivate";
        const confirmChange = window.confirm(`¿Are you sure you want to ${actionText} account ${account.id}?`);

        if (!confirmChange) return;

        setIsLoading(true);

        try {
            const updatedAccount =
                action === "activate"
                    ? await activateAccount(account.id)
                    : await deactivateAccount(account.id);

            setAccount(updatedAccount)

        } catch (error) {
            alert(error instanceof Error ? error.message : "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={onBack}>
                    <FaArrowLeft />
                    <span> Back</span>
                </button>
                <h1 style={styles.title}>Account Details</h1>
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
                            backgroundColor: getStateColor(account.status)
                        }}>
                            {account.status}
                        </span>
                    </div>

                    <div style={styles.actionContainer}>
                        {(account.status === "PENDING" || account.status === "CLOSED") && (
                            <button
                                style={{ ...styles.btnAction, ...styles.btnActivate }}
                                onClick={() => handleStatusChange("activate")}
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : "Activate"}
                            </button>
                        )}
                        {(account.status === "OPENED") && (
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
        gridTemplateColumns: '1fr 1fr',
        gap: '16px 24px',
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
    },
    actionContainer: { display: 'flex', gap: '8px' },
    btnAction: { padding: '6px 12px', borderRadius: '4px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', border: 'none', color: '#fff', transition: 'background-color 0.2s' },
    btnActivate: { backgroundColor: '#2ecc71' },
    btnDeactivate: { backgroundColor: '#e74c3c' }
};