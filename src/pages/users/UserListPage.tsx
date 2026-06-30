import { useState, useEffect } from "react";
import * as React from "react";
import { fetchUsers, createUser } from "../../api/usersApi.ts";
import type { User, UserRequest } from "../../types/User.ts";
import UserTable from "../../components/users/UserTable.tsx";
import NewUserPage from "./NewUserPage.tsx";

export default function UserListPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 7;

    const loadUsers = (isReload: boolean) => {
        if(isReload) {
            setLoading(true)
        }
        fetchUsers()
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Something went wrong");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers()
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Something went wrong");
                setLoading(false);
            });
    }, []);
    const handleSaveUser = async (userData: UserRequest) => {
        try {
            await createUser(userData);
            setIsCreating(false);
            loadUsers(true);
        } catch (err) {
            const errorResponse = err as { message?: string };
            throw new Error(errorResponse.message || "Failed to create user", { cause: err });
        }
    };

    if (isCreating) {
        return (
            <NewUserPage
                onBack={() => setIsCreating(false)}
                onSave={handleSaveUser}
            />
        );
    }

    if (loading) {
        return <div style={{ padding: '20px', color: '#7f8c8d' }}>Loading system users...</div>;
    }

    if (error) {
        return (
            <div style={{ padding: '20px', color: '#e74c3c', fontWeight: 'bold' }}>
                Error: {error}
            </div>
        );
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(users.length / itemsPerPage);

    return (
        <div style={styles.container}>
            <div style={styles.tableHeader}>
                <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '24px' }}>System Users</h2>
                <button
                    onClick={() => setIsCreating(true)}
                    style={styles.addBtn}
                >
                    + New User
                </button>
            </div>

            {users.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>
                    No users found in the database.
                </div>
            ) : (
                <>
                    <UserTable users={currentUsers} onUserUpdated={() => loadUsers(true)} />

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
        boxSizing: 'border-box',
        maxHeight: 'calc(100vh - 140px)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
    },
    tableHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '24px',
        boxSizing: 'border-box',
        flexShrink: 0
    },
    addBtn: {
        backgroundColor: '#2ecc71',
        color: 'white',
        border: 'none',
        padding: '10px 18px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '14px'
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