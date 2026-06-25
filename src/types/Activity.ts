export type ActivityLog = {
    id: string;
    action: string;
    module: 'Users' | 'Customers' | 'Loans' | 'Accounts' | 'Dashboard';
    timestamp: string;
};