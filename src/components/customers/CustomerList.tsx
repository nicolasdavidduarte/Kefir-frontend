import { useState, useEffect } from "react";
import * as React from "react";
import type { Customer } from "../../types/Customer.ts";
import {fetchCustomers} from "../../api/customersApi.ts";
import CustomerTable from "./CustomerTable.tsx";
import CustomerDetail from "./CustomerDetail.tsx";

export default function CustomerList() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

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
            <CustomerDetail
                customer={selectedCustomer}
                onBack={() => setSelectedCustomer(null)}
            />
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.tableHeader}>
                <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '24px' }}>Customers</h2>
                <button style={styles.addBtn}>+ New Customer</button>
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