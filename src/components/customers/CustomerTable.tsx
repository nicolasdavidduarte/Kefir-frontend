import type { Customer } from "../../types/Customer.ts";
import '../../App.css'
import * as React from "react";

type Props = {
    customers: Customer[];
    onSelectCustomer: (customer: Customer) => void;
};

const getStatusStyle = (status: string) => {
    switch (status) {
        case "ACTIVE": return { bg: "#e6f4ea", text: "#137333", border: "#ceedd5" };
        case "PENDING": return { bg: "#fef7e0", text: "#b06000", border: "#fce8b2" };
        case "DEACTIVATED": return { bg: "#fce8e6", text: "#c5221f", border: "#fad2cf" };
        default: return { bg: "#f1f5f9", text: "#5f6368", border: "#e2e8f0" };
    }
};

export default function CustomerTable({ customers, onSelectCustomer }: Props) {
    return (
            <table style={styles.table}>
            <thead>
            <tr style={styles.theadTr}>
                <th style={styles.th}>Id</th>
                <th style={styles.th}>Fullname</th>
                <th style={styles.th}>Person type</th>
                <th style={styles.th}>Document type</th>
                <th style={styles.th}>Document number</th>
                <th style={styles.th}>Customer type</th>
                <th style={styles.th}>Status</th>
            </tr>
            </thead>
            <tbody>
            {customers.map((customer) => (
                <tr key={customer.id} style={styles.tbodyTr}
                    onClick={() => onSelectCustomer(customer)}>
                    <td style={styles.td}>{customer.id}</td>
                    <td style={{ ...styles.td, width: '28%', ...styles.ellipsis }}>{customer.fullname}</td>
                    <td style={{ ...styles.td, width: '16%' }}>{customer.personType}</td>
                    <td style={{ ...styles.td, width: '16%' }}>{customer.documentType}</td>
                    <td style={{ ...styles.td, width: '16%' }}>{customer.documentNumber}</td>
                    <td style={{ ...styles.td, width: '16%' }}>{customer.customerType}</td>
                    <td style={styles.td}>
                                <span style={{
                                    ...styles.statusBadge,
                                    backgroundColor: getStatusStyle(customer.status).bg,
                                    color: getStatusStyle(customer.status).text,
                                    borderColor: getStatusStyle(customer.status).border
                                }}>
                                    {customer.status.replace(/_/g, ' ').toLowerCase()}
                                </span>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
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