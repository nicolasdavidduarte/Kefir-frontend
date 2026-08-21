import type { CustomerType } from "../../types/CustomerType.ts";
import '../../App.css'
import * as React from "react";

type Props = {
    customerTypes: CustomerType[];
    onSelectCustomerType: (customerType: CustomerType) => void;
};

export default function CustomerTypeTable({ customerTypes, onSelectCustomerType }: Props) {
    return (
        <div style={{ width: '100%', overflowX: 'auto' }} className="table-scroll-container">
            <table style={styles.table}>
            <thead>
            <tr style={styles.theadTr}>
                <th style={{ ...styles.th, width: '60px' }}>Id</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Enabled</th>
                <th style={styles.th}>Created at</th>
                <th style={styles.th}>Created by</th>
                <th style={styles.th}>Updated at</th>
                <th style={styles.th}>Updated by</th>
            </tr>
            </thead>
            <tbody>
            {customerTypes.map((customerType) => (
                <tr
                    key={customerType.id}
                    style={styles.tbodyTr}
                    onClick={() => onSelectCustomerType(customerType)}
                >
                    <td style={styles.td}>{customerType.id}</td>
                    <td style={styles.td}>{customerType.name}</td>
                    <td style={{ ...styles.td }}>{customerType.description}</td>
                    <td style={{ ...styles.td }}>{customerType.enabled ? "Yes" : "No"}</td>
                    <td style={{ ...styles.td }}>{customerType.createdBy}</td>
                    <td style={{ ...styles.td }}>{customerType.createdAt}</td>
                    <td style={{ ...styles.td }}>{customerType.updatedBy}</td>
                    <td style={{ ...styles.td }}>{customerType.updatedAt}</td>
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
        textAlign: 'left'
    },
    theadTr: {
        borderBottom: '1px solid #e2e8f0'
    },
    th: {
        padding: '12px 16px',
        color: '#64748b',
        fontWeight: '600',
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    },
    tbodyTr: {
        borderBottom: '1px solid #f1f5f9',
        cursor: 'pointer'
    },
    td: {
        padding: '12px 16px',
        color: '#334155',
        fontSize: '14px',
        verticalAlign: 'middle'
    },
    roleBadge: {
        backgroundColor: '#f1f5f9',
        color: '#475569',
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '500',
        marginRight: '4px',
        border: '1px solid #e2e8f0'
    },
    statusBadge: {
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '500',
        border: '1px solid',
        display: 'inline-block',
        textTransform: 'capitalize'
    }

};