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

    const handleSaveUser = async (userData: UserRequest) => {
        await createUser(userData);
        setIsCreating(false);
        loadUsers(true);
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

    if (isCreating) {
        return (
            <NewUserPage
                onBack={() => setIsCreating(false)}
                onSave={handleSaveUser}
            />
        );
    }

    if (loading) {
        return <div style={{ padding: '20px', color: '#64748b', fontSize: '14px' }}>Loading system users...</div>;
    }

    if (error) {
        return (
            <div style={{ padding: '20px', color: '#ef4444', fontWeight: '500', fontSize: '14px' }}>
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
                <div>
                    <h2 style={{ margin: 0, color: '#0f172a', fontSize: '18px', fontWeight: '600' }}>System Users</h2>
                    <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>Manage user accounts and permissions</p>
                </div>
                <button onClick={() => setIsCreating(true)} style={styles.addBtn}>
                    + New User
                </button>
            </div>

            {users.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                    No users found
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
        display: 'flex',
        flexDirection: 'column'
    },
    tableHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid #f1f5f9'
    },
    addBtn: {
        backgroundColor: '#0f172a',
        color: '#ffffff',
        border: 'none',
        padding: '8px 14px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '13px'
    },
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        marginTop: '20px'
    },
    pageBtn: {
        backgroundColor: '#ffffff',
        color: '#334155',
        border: '1px solid #cbd5e1',
        padding: '6px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '13px'
    },
    disabledBtn: {
        backgroundColor: '#f8fafc',
        color: '#94a3b8',
        cursor: 'not-allowed',
        borderColor: '#e2e8f0'
    },
    pageInfo: {
        fontSize: '13px',
        color: '#64748b'
    }
};