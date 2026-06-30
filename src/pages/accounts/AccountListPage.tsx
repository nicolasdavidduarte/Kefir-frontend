import { useState, useEffect } from "react";
import * as React from "react";
import type { Account } from "../../types/Account.ts";
import {createAccount, fetchAccounts} from "../../api/accountsApi.ts";
import AccountTable from "../../components/accounts/AccountTable.tsx";
import AccountDetailPage from "./AccountDetailPage.tsx";
import NewAccountPage from "../accounts/NewAccountPage.tsx";
import type {AccountRequest} from "../../types/Account.ts";

export default function AccountListPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 7;

    const loadAccounts = (isReload: boolean) => {
        if(isReload) {
            setLoading(true)
        }
        fetchAccounts()
            .then((data) => {
                setAccounts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Something went wrong");
                setLoading(false);
            });
    };

    const handleSaveAccount = async (accountData: AccountRequest) => {
        try {
            await createAccount(accountData);
            setIsCreating(false);
            loadAccounts(true);
        } catch (err) {
            const errorResponse = err as { message?: string };
            throw new Error(errorResponse.message || "Failed to create account", { cause: err });
        }
    };

    useEffect(() => {
        fetchAccounts()
            .then((data) => {
                setAccounts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Something went wrong");
                setLoading(false);
            });
    }, []);

    if (isCreating) {
        return (
            <NewAccountPage
                onBack={() => setIsCreating(false)}
                onSave={handleSaveAccount}
            />
        );
    }

    if (loading) {
        return <div style={{ padding: '20px', color: '#7f8c8d' }}>Loading accounts...</div>;
    }

    if (error) {
        return (
            <div style={{ padding: '20px', color: '#e74c3c', fontWeight: 'bold' }}>
                Error: {error}
            </div>
        );
    }

    if (selectedAccount !== null) {
        return (
            <AccountDetailPage
                account={selectedAccount}
                onBack={() => { setSelectedAccount(null);
                                      loadAccounts(true)}}
            />
        );
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAccounts = accounts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(accounts.length / itemsPerPage);

    return (
        <div style={styles.container}>
            <div style={styles.tableHeader}>
                <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '24px' }}>Accounts</h2>
                <button
                    onClick={() => setIsCreating(true)}
                    style={styles.addBtn}
                >
                    + New Account
                </button>
            </div>

            {accounts.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>
                    No accounts found in the database.
                </div>
            ) : (
                <>
                    <AccountTable
                        accounts={currentAccounts}
                        onSelectAccount={(account) => setSelectedAccount(account)}
                    />

                    {totalPages > 1 && (
                        <div style={styles.paginationContainer}>
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                style={{
                                    ...styles.pageBtn,
                                    ...(currentPage === 1 ? styles.disabledBtn : {})
                                }}
                            >
                                Previous
                            </button>

                            <span style={styles.pageInfo}>
                                Page <strong>{currentPage}</strong> of {totalPages}
                            </span>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                style={{
                                    ...styles.pageBtn,
                                    ...(currentPage === totalPages ? styles.disabledBtn : {})
                                }}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        width: '100%',
        boxSizing: 'border-box'
    },
    tableHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '24px',
        boxSizing: 'border-box'
    },
    addBtn: {
        backgroundColor: '#2ecc71',
        color: 'white',
        border: 'none',
        padding: '10px 18px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px',
        transition: 'background-color 0.2s'
    },
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        marginTop: '24px',
        padding: '10px 0',
        width: '100%'
    },
    pageBtn: {
        backgroundColor: '#ffffff',
        color: '#2c3e50',
        border: '1px solid #dcdde1',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '13px',
        outline: 'none',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
    },
    disabledBtn: {
        backgroundColor: '#f5f6fa',
        color: '#7f8c8d',
        cursor: 'not-allowed',
        boxShadow: 'none'
    },
    pageInfo: {
        fontSize: '14px',
        color: '#2c3e50'
    }
};