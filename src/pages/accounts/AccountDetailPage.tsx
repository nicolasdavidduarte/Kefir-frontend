import * as React from "react";
import { FaArrowLeft } from "react-icons/fa";
import type {Account} from "../../types/Account.ts";

type CustomerDetailProps = {
    account: Account;
    onBack: () => void;
};

export default function AccountDetailPage({ account, onBack }: CustomerDetailProps) {
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
    ];

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

                <div style={styles.fieldBox}>
                    <span style={styles.label}>Status</span>
                    <span style={{
                        ...styles.statusBadge,
                        backgroundColor: getStateColor(account.status)
                    }}>
                        {account.status}
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
    }
};