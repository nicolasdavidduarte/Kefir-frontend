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
                <AccountTable accounts={accounts}
                              onSelectAccount={(account) => setSelectedAccount(account)}
                />
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
    }
};