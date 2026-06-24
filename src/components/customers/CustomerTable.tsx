import type { Customer } from "../../types/Customer.ts";
import '../../App.css'
import * as React from "react";

type Props = {
    customers: Customer[];
    onSelectCustomer: (customer: Customer) => void;
};

export default function CustomerTable({ customers, onSelectCustomer }: Props) {
    return (
        <div style={{ width: '100%' }}>
            <table style={{ ...styles.table}}>
            <thead>
            <tr style={styles.theadTr}>
                <th style={{ ...styles.th, width: '60px' }}>ID</th>
                <th style={styles.th}>Fullname</th>
                <th style={styles.th}>Person type</th>
                <th style={styles.th}>Document type</th>
                <th style={styles.th}>Document number</th>
                <th style={styles.th}>Customer type</th>
            </tr>
            </thead>
            <tbody>
            {customers.map((customer) => (
                <tr
                    key={customer.id}
                    style={styles.tbodyTr}
                    onClick={() => onSelectCustomer(customer)}
                >
                    <td style={styles.td}>{customer.id}</td>
                    <td style={{ ...styles.td }}>{customer.fullname}</td>
                    <td style={{ ...styles.td }}>{customer.personType}</td>
                    <td style={{ ...styles.td }}>{customer.documentType}</td>
                    <td style={{ ...styles.td }}>{customer.documentNumber}</td>
                    <td style={{ ...styles.td }}>{customer.customerType}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}


const styles: { [key: string]: React.CSSProperties } = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
        boxSizing: 'border-box'
    },
    theadTr: {
        borderBottom: '2px solid #34495e',
    },
    th: {
        padding: '12px 16px',
        color: '#7f8c8d',
        fontWeight: '600',
        fontSize: '14px',
        boxSizing: 'border-box'
    },
    tbodyTr: {
        borderBottom: '1px solid #ecf0f1',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    },
    td: {
        padding: '12 16px',
        color: '#2c3e50',
        fontSize: '15px',
        boxSizing: 'border-box',
        verticalAlign: 'middle'
    },
    statusBadge: {
        color: 'white',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold',
        display: 'inline-block',
        textAlign: 'center',
        minWidth: '70px'
    }
};