import { getUser } from "../auth/token";
import * as React from "react";
import UserList from "./users/UserList.tsx";
import CustomerList from "./customers/CustomerList.tsx";
import LoansList from "./loans/LoanList.tsx";
import { useState } from "react";
import { useHistory } from "../hooks/useHistory";
import AccountList from "./accounts/AccountList.tsx";
import logo from "../assets/kefir_logo.png";

type DashboardProps = {
    onLogout: () => void;
};

type View = "history" | "users" | "customers" | "loans" | "accounts";

export default function Dashboard({ onLogout }: DashboardProps) {
    const username = getUser();
    const [currentView, setCurrentView] = useState<View>("history");
    const { history, logActivity } = useHistory();

    const navigateTo = (view: View, label: string) => {
        setCurrentView(view);
        if (view !== "history") {
            const moduleMap: Record<string, "Users" | "Customers" | "Loans" | "Accounts"> = {
                users: "Users",
                customers: "Customers",
                loans: "Loans",
                accounts: "Accounts"
            };
            logActivity(`Accessed ${label} module`, moduleMap[view]);
        }
    };

    const getModuleStyle = (module: string) => {
        const mod = module.toUpperCase();
        switch (mod) {
            case "USERS":
                return { bg: '#e8f4fd', text: '#1976d2', border: '#b3e5fc' };
            case "CUSTOMERS":
                return { bg: '#e8f8f5', text: '#117a65', border: '#a3e4d7' };
            case "LOANS":
                return { bg: '#fef9e7', text: '#b7950b', border: '#f9e79f' };
            case "ACCOUNTS":
                return { bg: '#f4f6f7', text: '#5d6d7e', border: '#d5dbdb' };
            default:
                return { bg: '#f4f6f7', text: '#7f8c8d', border: '#d5dbdb' };
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.logoWrapper} onClick={() => setCurrentView("history")}>
                    <img
                        src={logo}
                        alt="Kefir Logo"
                        style={styles.logoImage}
                    />
                    <span style={styles.sub}> Core Banking System</span>
                </div>
                <div style={styles.userSection}>
                    <span style={styles.welcomeText}>Welcome, <strong>{username}</strong></span>
                    <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
                </div>
            </header>

            <div style={styles.mainArea}>
                <section style={styles.content}>
                    <div style={styles.whiteBody}>

                        {currentView === "history" && (
                            <>
                                <div style={styles.cardHeader}>
                                    <h2 style={styles.cardTitle}>System Activity History</h2>
                                    <p style={styles.cardSubtitle}>Real-time audit log of recently accessed modules</p>
                                </div>

                                {history.length === 0 ? (
                                    <p style={{ color: '#7f8c8d', padding: '10px 0' }}>No recent activity to show.</p>
                                ) : (
                                    <div style={styles.scrollableTimeline}>
                                        {history.slice(0, 10).map((log, index) => {
                                            const modStyle = getModuleStyle(log.module);
                                            return (
                                                <div key={log.id} style={styles.timelineItem}>
                                                    <div style={styles.timeColumn}>
                                                        {log.timestamp}
                                                    </div>

                                                    <div style={styles.lineColumn}>
                                                        <div style={{...styles.timelineDot, backgroundColor: modStyle.text}} />
                                                        {index !== Math.min(history.length, 10) - 1 && (
                                                            <div style={styles.timelineLine} />
                                                        )}
                                                    </div>

                                                    <div style={styles.logContent}>
                                                        <span style={{
                                                            ...styles.moduleBadge,
                                                            backgroundColor: modStyle.bg,
                                                            color: modStyle.text,
                                                            borderColor: modStyle.border
                                                        }}>
                                                            {log.module.toUpperCase()}
                                                        </span>
                                                        <span style={styles.logDescription}>
                                                            {log.action}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        )}

                        {currentView === "users" && <UserList />}
                        {currentView === "customers" && <CustomerList />}
                        {currentView === "loans" && <LoansList />}
                        {currentView === "accounts" && <AccountList />}
                    </div>
                </section>

                <aside style={styles.sidebar}>
                    <h3 style={styles.sidebarTitle}>Modules</h3>

                    <div style={styles.navMenu}>
                        <button
                            style={{
                                ...styles.moduleBtn,
                                ...(currentView === "users" ? styles.moduleBtnActive : {})
                            }}
                            onClick={() => navigateTo("users", "Users")}
                        >
                            <span style={styles.navIcon}>👥</span> Users
                        </button>

                        <button
                            style={{
                                ...styles.moduleBtn,
                                ...(currentView === "customers" ? styles.moduleBtnActive : {})
                            }}
                            onClick={() => navigateTo("customers", "Customers")}
                        >
                            <span style={styles.navIcon}>💳</span> Customers
                        </button>

                        <button
                            style={{
                                ...styles.moduleBtn,
                                ...(currentView === "loans" ? styles.moduleBtnActive : {})
                            }}
                            onClick={() => navigateTo("loans", "Loans")}
                        >
                            <span style={styles.navIcon}>💰</span> Loans
                        </button>

                        <button
                            style={{
                                ...styles.moduleBtn,
                                ...(currentView === "accounts" ? styles.moduleBtnActive : {})
                            }}
                            onClick={() => navigateTo("accounts", "Accounts")}
                        >
                            <span style={styles.navIcon}>📊</span> Accounts
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'grid',
        gridTemplateRows: '64px 1fr',
        height: '100vh',
        width: '100%',
        backgroundColor: '#f4f6f9',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxSizing: 'border-box'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px',
        backgroundColor: '#2c3e50',
        color: '#ffffff',
        borderBottom: '1px solid #1a252f',
        boxSizing: 'border-box',
        zIndex: 10
    },
    logoWrapper: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        gap: '4px',
        height: '100%'
    },
    logoImage: {
        height: '42px',
        width: 'auto',
        objectFit: 'contain',

        mixBlendMode: 'screen',
        filter: 'contrast(160%) brightness(120%)',

        transform: 'scale(1.5)',
        marginRight: '8px',
        marginTop: '-2px'
    },
    logoBadge: {
        fontSize: '11px',
        backgroundColor: '#34495e',
        color: '#ffffff',
        padding: '2px 6px',
        borderRadius: '4px',
        fontWeight: '600',
        textTransform: 'uppercase',
        marginLeft: '4px'
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    welcomeText: {
        fontSize: '14px',
        color: '#ecf0f1'
    },
    logoutBtn: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '6px 14px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '13px',
        transition: 'background-color 0.15s ease'
    },
    mainArea: {
        display: 'grid',
        gridTemplateColumns: '1fr 280px',
        height: '100%',
        boxSizing: 'border-box'
    },
    content: {
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'auto'
    },
    whiteBody: {
        backgroundColor: 'white',
        width: '100%',
        maxWidth: '1000px',
        borderRadius: '8px',
        padding: '28px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        boxSizing: 'border-box',
        border: '1px solid #e2e8f0'
    },
    cardHeader: {
        marginBottom: '24px',
        borderBottom: '1px solid #f1f2f6',
        paddingBottom: '16px',
        textAlign: 'left'
    },
    cardTitle: {
        margin: 0,
        fontSize: '18px',
        color: '#2c3e50',
        fontWeight: '600'
    },
    sub: {
        padding: '2px 6px',
        borderRadius: '4px',
        margin: '4px 0 0 0',
        fontSize: '13px',
        color: '#ffffff',
        fontFamily: 'Sans-serif'
    },
    cardSubtitle: {
        margin: '4px 0 0 0',
        fontSize: '13px',
        color: '#95a5a6'
    },
    scrollableTimeline: {
        maxHeight: '420px',
        overflowY: 'auto',
        paddingRight: '8px',
        display: 'flex',
        flexDirection: 'column'
    },
    timelineItem: {
        display: 'flex',
        alignItems: 'center',
        minHeight: '48px',
        boxSizing: 'border-box'
    },
    timeColumn: {
        width: '55px',
        fontSize: '13px',
        color: '#7f8c8d',
        fontWeight: '500',
        fontFamily: 'monospace',
        textAlign: 'left'
    },
    lineColumn: {
        width: '30px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '48px',
        flexShrink: 0
    },
    timelineDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        zIndex: 2
    },
    timelineLine: {
        position: 'absolute',
        top: '24px',
        bottom: '-24px',
        width: '2px',
        backgroundColor: '#e2e8f0',
        zIndex: 1
    },
    logContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flex: 1,
        textAlign: 'left'
    },
    moduleBadge: {
        fontSize: '11px',
        fontWeight: '700',
        padding: '3px 8px',
        borderRadius: '4px',
        minWidth: '85px',
        textAlign: 'center',
        border: '1px solid',
        letterSpacing: '0.5px'
    },
    logDescription: {
        fontSize: '14px',
        color: '#34495e',
        fontWeight: '400'
    },
    sidebar: {
        backgroundColor: '#ffffff',
        borderLeft: '1px solid #e2e8f0',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
    },
    sidebarTitle: {
        margin: '0 0 16px 0',
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#95a5a6',
        fontWeight: '700',
        textAlign: 'left',
        borderBottom: '1px solid #f1f2f6',
        paddingBottom: '10px'
    },
    navMenu: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    moduleBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        backgroundColor: 'transparent',
        color: '#5d6d7e',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        textAlign: 'left',
        transition: 'all 0.15s ease',
        width: '100%'
    },
    moduleBtnActive: {
        backgroundColor: '#3498db',
        color: 'white',
        boxShadow: '0 4px 10px rgba(52, 152, 219, 0.25)'
    },
    navIcon: {
        fontSize: '16px'
    }
};