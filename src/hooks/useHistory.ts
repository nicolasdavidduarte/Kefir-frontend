import { useState, useCallback } from 'react';
import type { ActivityLog } from '../types/Activity';

const STORAGE_KEY = 'kefir_system_history';

export function useHistory() {
    const [history, setHistory] = useState<ActivityLog[]>(() => {
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const logActivity = useCallback((action: string, module: ActivityLog['module']) => {
        const newLog: ActivityLog = {
            id: crypto.randomUUID(),
            action,
            module,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
        };

        setHistory((prev) => {
            const updated = [newLog, ...prev];
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    }, []);

    const clearHistory = useCallback(() => {
        sessionStorage.removeItem(STORAGE_KEY);
        setHistory([]);
    }, []);

    return { history, logActivity, clearHistory };
}