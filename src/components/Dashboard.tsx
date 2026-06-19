import { getUser } from "../auth/token";
import * as React from "react";
import UserList from "./UserList.tsx";
import CustomerList from "./CustomerList.tsx";
import LoansList from "./LoanList.tsx";
import {useState} from "react";

type DashboardProps = {
    onLogout: () => void;
}

type View = "history" | "users" | "customers" | "loans";

export default function Dashboard({ onLogout }: DashboardProps) {
    const username = getUser();

    const [currentView, setCurrentView] = useState<View>("history")

    return (
        <div style={styles.container}>
            {/* HEADER */}
            <header style={styles.header}>
                <div style={styles.logo} onClick={() => setCurrentView("history")}>
                    Kefir System
                </div>
                <div style={styles.userSection}>
                    <span style={{ marginRight: '15px' }}>Welcome, <strong>{username}</strong></span>
                    <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
                </div>
            </header>

            <div style={styles.mainArea}>
                {/* CENTER - BODY: History */}
                <section style={styles.content}>
                    <div style={styles.whiteBody}>
                        {currentView === "history" && (
                            <>
                                <h2 style={{ color: '#2c3e50' }}>History</h2>
                                <p style={{ color: '#7f8c8d' }}>No recent activity to show.</p>
                            </>
                        )}
                        {currentView === "users" && <UserList />}
                        {currentView === "customers" && <CustomerList />}
                        {currentView === "loans" && <LoansList />}
                    </div>
                </section>

                {/* RIGHT: Modules */}
                <aside style={styles.sidebar}>
                    <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>Modules</h3>
                    <button
                        style={{
                            ...styles.moduleBtn,
                            backgroundColor: currentView === "users" ? '#2980b9' : '#3498db'
                        }}
                        onClick={() => setCurrentView("users")}
                    >
                        Users
                    </button>
                    <button
                        style={{
                            ...styles.moduleBtn,
                            backgroundColor: currentView === "customers" ? '#2980b9' : '#3498db'
                        }}
                        onClick={() => setCurrentView("customers")}
                    >
                        Customers
                    </button>
                    <button
                        style={{
                            ...styles.moduleBtn,
                            backgroundColor: currentView === "loans" ? '#2980b9' : '#3498db'
                        }}
                        onClick={() => setCurrentView("loans")}
                    >
                        Loans
                    </button>
                </aside>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'grid',
        gridTemplateRows: '60px 1fr',
        height: '100vh',
        width: '100%',
        backgroundColor: '#f4f4f4',
        fontFamily: 'sans-serif',
        boxSizing: 'border-box'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px',
        backgroundColor: '#2c3e50',
        color: 'white',
        boxSizing: 'border-box'
    },
    logo: {
        fontSize: '22px',
        fontWeight: 'bold',
        letterSpacing: '0.5px'
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    logoutBtn: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    mainArea: {
        display: 'grid',
        gridTemplateColumns: '1fr 280px',
        height: '100%',
        boxSizing: 'border-box'
    },
    content: {
        padding: '24px',
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
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        boxSizing: 'border-box'
    },
    sidebar: {
        backgroundColor: '#ecf0f1',
        borderLeft: '1px solid #dcdde1',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxSizing: 'border-box'
    },
    moduleBtn: {
        padding: '12px 16px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '15px',
        fontWeight: '600',
        textAlign: 'left',
        transition: 'background-color 0.2s',
        width: '100%'
    }
};