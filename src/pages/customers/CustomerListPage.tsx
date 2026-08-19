import { useState, useEffect } from "react";
import * as React from "react";
import type {Customer, CustomerCreationRequest} from "../../types/Customer.ts";
import {fetchCustomers, createCustomer} from "../../api/customersApi.ts";
import CustomerTable from "../../components/customers/CustomerTable.tsx";
import CustomerDetailPage from "./CustomerDetailPage.tsx";
import NewCustomerPage from "../customers/NewCustomerPage.tsx";

export default function CustomerListPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 7;

    const loadCustomers = (isReload: boolean) => {
        if(isReload) {
            setLoading(true)
        }
        fetchCustomers()
            .then((data) => {
                setCustomers(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Something went wrong");
                setLoading(false);
            });
    };

    const handleSaveCustomer = async (customerData: CustomerCreationRequest) => {
            await createCustomer(customerData);
            setIsCreating(false);
            loadCustomers(true);
    };

    useEffect(() => {
        fetchCustomers()
            .then((data) => {
                setCustomers(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Something went wrong");
                setLoading(false);
            });
    }, []);

    if (isCreating) {
        return (
            <NewCustomerPage
                onBack={() => setIsCreating(false)}
                onSave={handleSaveCustomer}
            />
        );
    }

    if (loading) {
        return <div style={{ padding: '20px', color: '#7f8c8d' }}>Loading customers...</div>;
    }

    if (error) {
        return (
            <div style={{ padding: '20px', color: '#e74c3c', fontWeight: 'bold' }}>
                Error: {error}
            </div>
        );
    }

    if (selectedCustomer !== null) {
        return (
            <CustomerDetailPage
                customer={selectedCustomer}
                onBack={() => {setSelectedCustomer(null);
                                    loadCustomers(true)}}
            />
        );
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCustomers = customers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(customers.length / itemsPerPage);

    return (
        <div style={styles.container}>
            <div style={styles.tableHeader}>
                <div>
                    <h2 style={{ margin: 0, color: '#0f172a', fontSize: '18px', fontWeight: '600' }}>Customers</h2>
                    <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>Manage customers data</p>
                </div>
                <button
                    onClick={() => setIsCreating(true)} style={styles.addBtn}>
                    + New Customer
                </button>
            </div>

            {customers.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                    No customers found
                </div>
            ) : (
                <>
                    <CustomerTable
                        customers={currentCustomers}
                        onSelectCustomer={(customer) => setSelectedCustomer(customer)}
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