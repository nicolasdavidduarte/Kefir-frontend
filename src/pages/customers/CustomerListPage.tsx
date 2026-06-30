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
        try {
            await createCustomer(customerData);
            setIsCreating(false);
            loadCustomers(true);
        } catch (err) {
            const errorResponse = err as { message?: string };
            throw new Error(errorResponse.message || "Failed to create customer", { cause: err });
        }
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
                <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '24px' }}>Customers</h2>
                <button
                    onClick={() => setIsCreating(true)}
                    style={styles.addBtn}
                >
                    + New Customer
                </button>
            </div>

            {customers.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>
                    No customers found in the database.
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