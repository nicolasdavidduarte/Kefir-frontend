import * as React from "react";
import { FaArrowLeft } from "react-icons/fa";
import type { Currency } from "../../types/Currency.ts";

type CurrencyDetailProps = {
    currency: Currency;
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

export default function CurrencyDetailPage({ currency: currency, onBack }: CurrencyDetailProps) {

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Active": return { bg: "#e6f4ea", text: "#137333", border: "#ceedd5" };
            case "Deactivated": return { bg: "#fce8e6", text: "#c5221f", border: "#fad2cf" };
            default: return { bg: "#f1f5f9", text: "#5f6368", border: "#e2e8f0" };
        }
    };

    const statusStyle = getStatusStyle(currency.enabled ? "Active" : "Deactivated");

    return (
        <div style={styles.container}>

            <div style={styles.topNav}>
                <button onClick={onBack} style={styles.backBtn}>
                    <FaArrowLeft size={12} />
                    <span>Back to Currencies</span>
                </button>
            </div>

            <div style={styles.headerRow}>
                <div>
                    <h1 style={styles.title}>Currency #{currency.id}</h1>
                </div>

                <div style={styles.actionsGroup}>
                    <span style={{
                        ...styles.statusBadge,
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.text,
                        borderColor: statusStyle.border
                    }}>
                        {currency.enabled ? "Active" : "Deactivated"}
                    </span>
                </div>
            </div>


            <div style={styles.summaryCard}>
                {/* General Information */}
                <h3 style={styles.sectionTitle}>General Information</h3>
                <div style={styles.summaryGrid}>
                    <div>
                        <span style={styles.summaryLabel}>Id</span>
                        <span style={styles.summaryValue}>{currency.id || "N/A"}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>ISO Code</span>
                        <span style={styles.summaryValue}>{currency.isoCode || "N/A"}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>Description</span>
                        <span style={styles.summaryValue}>{currency.description || "N/A"}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>Created at</span>
                        <span style={styles.summaryValue}>{formatDateTime(currency.createdAt) || "N/A"}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>Created by</span>
                        <span style={styles.summaryValue}>{currency.createdBy || "N/A"}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>Updated at</span>
                        <span style={styles.summaryValue}>{formatDateTime(currency.updatedAt) || "N/A"}</span>
                    </div>
                    <div>
                        <span style={styles.summaryLabel}>Updated by</span>
                        <span style={styles.summaryValue}>{currency.updatedBy|| "N/A"}</span>
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
        marginBottom: '32px',
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