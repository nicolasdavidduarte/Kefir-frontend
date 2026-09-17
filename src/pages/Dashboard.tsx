import { getUser } from "../auth/token.ts";
import * as React from "react";
import UserListPage from "./users/UserListPage.tsx";
import CustomerListPage from "./customers/CustomerListPage.tsx";
import LoansList from "./loans/LoanListPage.tsx";
import { useState } from "react";
import { useHistory } from "../hooks/useHistory.ts";
import AccountListPage from "./accounts/AccountListPage.tsx";
import logo from "../assets/kefir_logo.png";
import BankListPage from "./banks/BankListPage.tsx";
import CurrencyListPage from "./currencies/CurrencyListPage.tsx";
import LoanTypeListPage from "./loanTypes/LoanTypeListPage.tsx";
import CustomerTypeListPage from "./customerTypes/CustomerTypeListPage.tsx";
import AboutPage from "./AboutPage.tsx";
import { FaBars, FaTimes } from "react-icons/fa";
import { useViewport } from "../hooks/useViewport.ts";

type DashboardProps = {
    onLogout: () => void;
};

type View = "history" | "users" | "customers" | "accounts" | "loans" | "customerTypes" | "banks" | "currencies" | "loanTypes" | "about" ;

export default function Dashboard({ onLogout }: DashboardProps) {
    const { isMobile, isTablet } = useViewport();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const username = getUser();
    const [currentView, setCurrentView] = useState<View>("history");
    const { history, logActivity } = useHistory();

    const navigateTo = (view: View, label?: string) => {
        setCurrentView(view);
        if (isMobile) {
            setIsMenuOpen(false);
        }
        if (view !== "history" && label) {
            const moduleMap: Record<string, "Users" | "Customers" | "Accounts" | "Loans" | "CustomerTypes" | "Banks" | "Currencies" | "LoanTypes" | "About"> = {
                users: "Users",
                customers: "Customers",
                accounts: "Accounts",
                loans: "Loans",
                customerTypes: "CustomerTypes",
                banks: "Banks",
                currencies: "Currencies",
                loanTypes: "LoanTypes",
                about: "About"
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

    const renderNavContent = (isDrawer = false) => (
        <>
            <div style={{ ...styles.navSection, paddingTop: isDrawer ? '16px' : '40px' }}>
                <span style={styles.sidebarSectionTitle}>Navigation</span>
                <nav style={styles.navMenu}>
                    <button
                        style={{
                            ...styles.moduleBtn,
                            ...(currentView === "history" ? styles.moduleBtnActive : {})
                        }}
                        onClick={() => navigateTo("history")}
                    >
                        Overview
                    </button>
                </nav>
            </div>

            <div style={{ ...styles.navSection, paddingTop: isDrawer ? '16px' : '40px' }}>
                <span style={styles.sidebarSectionTitle}>Modules</span>
                <nav style={styles.navMenu}>
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

            <div style={{ ...styles.navSection, paddingTop: isDrawer ? '16px' : '40px' }}>
                <span style={styles.sidebarSectionTitle}>Configuration</span>
                <nav style={styles.navMenu}>
                    <button
                        style={{
                            ...styles.moduleBtn,
                            ...(currentView === "banks" ? styles.moduleBtnActive : {})
                        }}
                        onClick={() => navigateTo("banks")}
                    >
                        Banks
                    </button>
                    <button
                        style={{
                            ...styles.moduleBtn,
                            ...(currentView === "currencies" ? styles.moduleBtnActive : {})
                        }}
                        onClick={() => navigateTo("currencies")}
                    >
                        Currencies
                    </button>
                    <button
                        style={{
                            ...styles.moduleBtn,
                            ...(currentView === "loanTypes" ? styles.moduleBtnActive : {})
                        }}
                        onClick={() => navigateTo("loanTypes")}
                    >
                        Loan Types
                    </button>
                    <button
                        style={{
                            ...styles.moduleBtn,
                            ...(currentView === "customerTypes" ? styles.moduleBtnActive : {})
                        }}
                        onClick={() => navigateTo("customerTypes")}
                    >
                        Customer Types
                    </button>
                </nav>
            </div>

            <div style={{ ...styles.navSection, paddingTop: isDrawer ? '16px' : (isTablet ? '40px' : '120px') }}>
                <span style={styles.sidebarSectionTitle}>Information</span>
                <nav style={styles.navMenu}>
                    <button
                        style={{
                            ...styles.moduleBtn,
                            ...(currentView === "about" ? styles.moduleBtnActive : {})
                        }}
                        onClick={() => navigateTo("about")}
                    >
                        About Kefir
                    </button>
                </nav>
            </div>
        </>
    );

    return (
        <div style={{
            ...styles.container,
            gridTemplateColumns: isMobile ? '1fr' : (isTablet ? '200px 1fr' : '240px 1fr')
        }}>
            {/* Desktop / Tablet Persistent Sidebar */}
            {!isMobile && (
                <aside style={{
                    ...styles.sidebar,
                    width: isTablet ? '200px' : '240px'
                }}>
                    <div style={styles.logoWrapper} onClick={() => navigateTo("history")}>
                        <span style={styles.brandTitle}>Control Panel</span>
                    </div>
                    {renderNavContent(false)}
                </aside>
            )}

            {/* Mobile Off-Canvas Navigation Drawer */}
            {isMobile && isMenuOpen && (
                <>
                    <div
                        style={styles.drawerBackdrop}
                        onClick={() => setIsMenuOpen(false)}
                        aria-hidden="true"
                    />
                    <aside style={styles.drawerSidebar}>
                        <div style={styles.drawerHeader}>
                            <div style={styles.logoWrapper} onClick={() => navigateTo("history")}>
                                <span style={styles.brandTitle}>Control Panel</span>
                            </div>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                style={styles.drawerCloseBtn}
                                aria-label="Close menu"
                            >
                                <FaTimes size={18} />
                            </button>
                        </div>
                        <div style={styles.drawerScrollableNav}>
                            {renderNavContent(true)}
                        </div>
                    </aside>
                </>
            )}

            <div style={styles.mainWrapper}>
                <header style={{
                    ...styles.header,
                    ...(isMobile ? styles.headerMobile : {})
                }}>
                    <div style={styles.brandSection}>
                        {isMobile && (
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                style={styles.hamburgerBtn}
                                aria-label="Open menu"
                            >
                                <FaBars size={20} />
                            </button>
                        )}
                        <img
                            src={logo}
                            alt="Kefir Logo"
                            style={isMobile ? styles.logoImageMobile : styles.logoImage}
                        />
                        {!isMobile && <span style={styles.systemBadge}>Core Banking System</span>}
                    </div>
                    <div style={styles.userSection}>
                        <span style={styles.welcomeText}>
                            {isMobile ? <strong>{username}</strong> : <>User: <strong>{username}</strong></>}
                        </span>
                        <button onClick={onLogout} style={styles.logoutBtn}>Log out</button>
                    </div>
                </header>

                <main style={{
                    ...styles.content,
                    ...(isMobile ? styles.contentMobile : {})
                }}>
                    <div style={{
                        ...styles.whiteBody,
                        ...(isMobile ? styles.whiteBodyMobile : {})
                    }}>
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
                                                <div key={log.id} style={{
                                                    ...styles.timelineItem,
                                                    ...(isMobile ? styles.timelineItemMobile : {})
                                                }}>
                                                    <div style={isMobile ? styles.timeColumnMobile : styles.timeColumn}>{log.timestamp}</div>
                                                    <div style={styles.lineColumn}>
                                                        <div style={{ ...styles.timelineDot, backgroundColor: modStyle.text }} />
                                                        {index !== Math.min(history.length, 10) - 1 && (
                                                            <div style={styles.timelineLine} />
                                                        )}
                                                    </div>
                                                    <div style={{
                                                        ...styles.logContent,
                                                        ...(isMobile ? styles.logContentMobile : {})
                                                    }}>
                                                        <span style={{
                                                            ...styles.moduleBadge,
                                                            backgroundColor: modStyle.bg,
                                                            color: modStyle.text,
                                                            borderColor: modStyle.border
                                                        }}>
                                                            {log.module.toUpperCase()}
                                                        </span>
                                                        <span style={{
                                                            ...styles.logDescription,
                                                            ...(isMobile ? styles.logDescriptionMobile : {})
                                                        }}>{log.action}</span>
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
                        {currentView === "banks" && <BankListPage />}
                        {currentView === "currencies" && <CurrencyListPage />}
                        {currentView === "loanTypes" && <LoanTypeListPage />}
                        {currentView === "customerTypes" && <CustomerTypeListPage />}

                        {currentView === "about" && <AboutPage />}
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
    },
    headerMobile: {
        padding: '0 16px',
        height: '56px'
    },
    hamburgerBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#0f172a',
        padding: '8px 8px 8px 0',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoImageMobile: {
        height: '24px',
        width: 'auto'
    },
    drawerBackdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        zIndex: 1000
    },
    drawerSidebar: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '280px',
        maxWidth: '85vw',
        backgroundColor: '#0f172a',
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        boxSizing: 'border-box',
        boxShadow: '4px 0 24px rgba(0, 0, 0, 0.3)'
    },
    drawerHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
        paddingBottom: '12px',
        borderBottom: '1px solid #1e293b'
    },
    drawerCloseBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#94a3b8',
        padding: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    drawerScrollableNav: {
        overflowY: 'auto',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    contentMobile: {
        padding: '16px 12px',
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'auto',
        flex: 1
    },
    whiteBodyMobile: {
        padding: '16px 12px',
        width: '100%',
        maxWidth: '100%',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        boxSizing: 'border-box'
    },
    timelineItemMobile: {
        minHeight: '44px'
    },
    timeColumnMobile: {
        width: '48px',
        fontSize: '11px',
        color: '#64748b',
        fontFamily: 'monospace'
    },
    logContentMobile: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flex: 1,
        flexWrap: 'wrap'
    },
    logDescriptionMobile: {
        fontSize: '12px',
        wordBreak: 'break-word'
    }
};