import type { Customer } from "../types/Customer";
import '../App.css'
import * as React from "react";

type Props = {
    customers: Customer[];
};

export default function CustomerTable({ customers }: Props) {
    return (
        <div style={{ width: '100%', overflowX: 'auto' }} className="table-scroll-container">
            <table style={{ ...styles.table, minWidth: '1400px', width: '100%' }}>
            <thead>
            <tr style={styles.theadTr}>
                <th style={{ ...styles.th, width: '60px' }}>ID</th>
                <th style={styles.th}>Name 1</th>
                <th style={styles.th}>Name 2</th>
                <th style={styles.th}>Name 3</th>
                <th style={styles.th}>Lastname 1</th>
                <th style={styles.th}>Lastname 2</th>
                <th style={styles.th}>Lastname 3</th>
                <th style={styles.th}>Fullname</th>
                <th style={styles.th}>Person type</th>
                <th style={styles.th}>Document type</th>
                <th style={styles.th}>Document number</th>
                <th style={styles.th}>Customer type</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Created by user</th>
                <th style={styles.th}>Creation date</th>
                <th style={styles.th}>Update date</th>
            </tr>
            </thead>
            <tbody>
            {customers.map((customer) => (
                <tr key={customer.id} style={styles.tbodyTr}>
                    <td style={styles.td}>{customer.id}</td>
                    <td style={{ ...styles.td }}>{customer.name1}</td>
                    <td style={{ ...styles.td }}>{customer.name2}</td>
                    <td style={{ ...styles.td }}>{customer.name3}</td>
                    <td style={{ ...styles.td }}>{customer.lastname1}</td>
                    <td style={{ ...styles.td }}>{customer.lastname2}</td>
                    <td style={{ ...styles.td }}>{customer.lastname3}</td>
                    <td style={{ ...styles.td }}>{customer.fullname}</td>
                    <td style={{ ...styles.td }}>{customer.personType}</td>
                    <td style={{ ...styles.td }}>{customer.documentType}</td>
                    <td style={{ ...styles.td }}>{customer.documentNumber}</td>
                    <td style={{ ...styles.td }}>{customer.customerType}</td>
                    <td style={{ ...styles.td }}>
                        <span style={{...styles.statusBadge, backgroundColor: customer.status ? '#2ecc71' : '#e74c3c'
                        }}>{customer.status}</span>
                    </td>
                    <td style={{ ...styles.td }}>{customer.createdByUser}</td>
                    <td style={styles.td}>{customer.creationDate || "N/A"}</td>
                    <td style={{ ...styles.td }}>{customer.updateDate}</td>

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
    },
    td: {
        padding: '16px 16px',
        color: '#2c3e50',
        fontSize: '15px',
        boxSizing: 'border-box',
        verticalAlign: 'middle'
    },
    roleBadge: {
        backgroundColor: '#e1f5fe',
        color: '#0288d1',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold',
        marginRight: '6px',
        display: 'inline-block'
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