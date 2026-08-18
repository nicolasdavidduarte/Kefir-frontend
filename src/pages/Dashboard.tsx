import { getUser } from "../auth/token.ts";
import * as React from "react";
import UserListPage from "./users/UserListPage.tsx";
import CustomerListPage from "./customers/CustomerListPage.tsx";
import LoansList from "./loans/LoanListPage.tsx";
import { useState } from "react";
import { useHistory } from "../hooks/useHistory.ts";
import AccountListPage from "./accounts/AccountListPage.tsx";
import logo from "../assets/kefir_logo.png";

type DashboardProps = {
    onLogout: () => void;
};

type View = "history" | "users" | "customers" | "accounts" | "loans";

export default function Dashboard({ onLogout }: DashboardProps) {
    const username = getUser();
    const [currentView, setCurrentView] = useState<View>("history");
    const { history, logActivity } = useHistory();

    const navigateTo = (view: View, label: string) => {
        setCurrentView(view);
        if (view !== "history") {
            const moduleMap: Record<string, "Users" | "Customers" | "Accounts" | "Loans"> = {
                users: "Users",
                customers: "Customers",
                accounts: "Accounts",
                loans: "Loans"
            };
            logActivity(`Accessed ${label} module`, moduleMap[view]);
        }
    };

    const getModuleStyle = (module: string) => {
        const mod = module.toUpperCase();
        switch (mod) {
            case "USERS":
                return { bg: '#f0f7ff', text: '#0284c7', border: '#bae6fd' };
            case "CUSTOMERS":
                return { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' };
            case "ACCOUNTS":
                return { bg: '#f8fafc', text: '#475569', border: '#e2e8f0' };
            case "LOANS":
                return { bg: '#fefce8', text: '#ca8a04', border: '#fef08a' };
            default:
                return { bg: '#f8fafc', text: '#64748b', border: '#e2e8f0' };
        }
    };

    return (
        <div style={styles.container}>

            <aside style={styles.sidebar}>
                <div style={styles.logoWrapper} onClick={() => setCurrentView("history")}>
                    <span style={styles.brandTitle}>Control Panel</span>
                </div>

                <div style={styles.navSection}>
                    <span style={styles.sidebarSectionTitle}>Navigation</span>
                    <nav style={styles.navMenu}>
                        <button
                            style={{
                                ...styles.moduleBtn,
                                ...(currentView === "history" ? styles.moduleBtnActive : {})
                            }}
                            onClick={() => setCurrentView("history")}
                        >
                            Overview
                        </button>
                        <button
                            style={{
                                ...styles.moduleBtn,
                                ...(currentView === "users" ? styles.moduleBtnActive : {})
                            }}
                            onClick={() => navigateTo("users", "Users")}
                        >
                            Users
                        </button>
                        <button
                            style={{
                                ...styles.moduleBtn,
                                ...(currentView === "customers" ? styles.moduleBtnActive : {})
                            }}
                            onClick={() => navigateTo("customers", "Customers")}
                        >
                            Customers
                        </button>
                        <button
                            style={{
                                ...styles.moduleBtn,
                                ...(currentView === "accounts" ? styles.moduleBtnActive : {})
                            }}
                            onClick={() => navigateTo("accounts", "Accounts")}
                        >
                            Accounts
                        </button>
                        <button
                            style={{
                                ...styles.moduleBtn,
                                ...(currentView === "loans" ? styles.moduleBtnActive : {})
                            }}
                            onClick={() => navigateTo("loans", "Loans")}
                        >
                            Loans
                        </button>
                    </nav>
                </div>
            </aside>

            <div style={styles.mainWrapper}>
                <header style={styles.header}>
                    <div style={styles.brandSection}>
                        <img src={logo} alt="Kefir Logo" style={styles.logoImage} />
                        <span style={styles.systemBadge}>Core Banking System</span>
                    </div>
                    <div style={styles.userSection}>
                        <span style={styles.welcomeText}>User: <strong>{username}</strong></span>
                        <button onClick={onLogout} style={styles.logoutBtn}>Log out</button>
                    </div>
                </header>

                <main style={styles.content}>
                    <div style={styles.whiteBody}>
                        {currentView === "history" && (
                            <>
                                <div style={styles.cardHeader}>
                                    <h2 style={styles.cardTitle}>System Activity History</h2>
                                    <p style={styles.cardSubtitle}>Real-time audit log of recently accessed modules</p>
                                </div>

                                {history.length === 0 ? (
                                    <p style={{ color: '#64748b', padding: '12px 0' }}>No recent activity logged.</p>
                                ) : (
                                    <div style={styles.scrollableTimeline}>
                                        {history.slice(0, 10).map((log, index) => {
                                            const modStyle = getModuleStyle(log.module);
                                            return (
                                                <div key={log.id} style={styles.timelineItem}>
                                                    <div style={styles.timeColumn}>{log.timestamp}</div>
                                                    <div style={styles.lineColumn}>
                                                        <div style={{ ...styles.timelineDot, backgroundColor: modStyle.text }} />
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
                                                        <span style={styles.logDescription}>{log.action}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        )}

                        {currentView === "users" && <UserListPage />}
                        {currentView === "customers" && <CustomerListPage />}
                        {currentView === "accounts" && <AccountListPage />}
                        {currentView === "loans" && <LoansList />}
                    </div>
                </main>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        height: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        boxSizing: 'border-box'
    },
    sidebar: {
        backgroundColor: '#0f172a',
        borderRight: '1px solid #1e293b',
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    },
    logoWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '0 8px',
        cursor: 'pointer'
    },
    logoImage: {
        height: '32px',
        width: 'auto'
    },
    brandTitle: {
        color: '#f8fafc',
        fontSize: '18px',
        fontWeight: '700',
        letterSpacing: '-0.5px'
    },
    navSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    sidebarSectionTitle: {
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: '#64748b',
        fontWeight: '600',
        padding: '0 8px'
    },
    navMenu: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    moduleBtn: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 12px',
        backgroundColor: 'transparent',
        color: '#94a3b8',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        textAlign: 'left',
        transition: 'all 0.15s ease'
    },
    moduleBtnActive: {
        backgroundColor: '#1e293b',
        color: '#f8fafc',
        fontWeight: '600'
    },
    mainWrapper: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    header: {
        height: '60px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '0 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    brandSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    systemBadge: {
        fontSize: '13px',
        color: '#64748b',
        fontWeight: '500',
        lineHeight: 1,
        transform: 'translateY(-2px)'
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    welcomeText: {
        fontSize: '13px',
        color: '#334155'
    },
    logoutBtn: {
        backgroundColor: '#ffffff',
        color: '#475569',
        border: '1px solid #cbd5e1',
        padding: '6px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '13px',
        transition: 'all 0.15s ease'
    },
    content: {
        padding: '32px',
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'auto',
        flex: 1
    },
    whiteBody: {
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '1000px',
        borderRadius: '8px',
        padding: '24px',
        border: '1px solid #e2e8f0',
        alignSelf: 'start'
    },
    cardHeader: {
        marginBottom: '20px',
        borderBottom: '1px solid #f1f5f9',
        paddingBottom: '12px'
    },
    cardTitle: {
        margin: 0,
        fontSize: '18px',
        color: '#0f172a',
        fontWeight: '600'
    },
    cardSubtitle: {
        margin: '4px 0 0 0',
        fontSize: '13px',
        color: '#64748b'
    },
    scrollableTimeline: {
        display: 'flex',
        flexDirection: 'column'
    },
    timelineItem: {
        display: 'flex',
        alignItems: 'center',
        minHeight: '40px'
    },
    timeColumn: {
        width: '60px',
        fontSize: '12px',
        color: '#64748b',
        fontFamily: 'monospace'
    },
    lineColumn: {
        width: '24px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40px'
    },
    timelineDot: {
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        zIndex: 2
    },
    timelineLine: {
        position: 'absolute',
        top: '20px',
        bottom: '-20px',
        width: '1px',
        backgroundColor: '#e2e8f0',
        zIndex: 1
    },
    logContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flex: 1
    },
    moduleBadge: {
        fontSize: '10px',
        fontWeight: '700',
        padding: '2px 6px',
        borderRadius: '4px',
        border: '1px solid'
    },
    logDescription: {
        fontSize: '13px',
        color: '#334155'
    }
};