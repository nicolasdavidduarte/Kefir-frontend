export type ActivityLog = {
    id: string;
    action: string;
    module: 'Users' | 'Customers' | 'Loans' | 'Accounts'| "CustomerTypes" | "Banks" | "Currencies" | "LoanTypes" | "About" | 'Dashboard';
    timestamp: string;
};