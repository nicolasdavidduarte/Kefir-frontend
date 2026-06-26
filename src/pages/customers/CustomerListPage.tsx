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
                <CustomerTable
                    customers={customers}
                    onSelectCustomer={(customer) => setSelectedCustomer(customer)}
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