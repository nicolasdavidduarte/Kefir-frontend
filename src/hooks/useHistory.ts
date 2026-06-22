import { useState, useEffect } from 'react';
import type { ActivityLog } from '../types/Activity';

export function useHistory() {
    const [history, setHistory] = useState<ActivityLog[]>(() => {
        const saved = sessionStorage.getItem('kefir_system_history');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        sessionStorage.setItem('kefir_system_history', JSON.stringify(history));
    }, [history]);

    const logActivity = (action: string, module: ActivityLog['module']) => {
        const newLog: ActivityLog = {
            id: crypto.randomUUID(), // ID único para usar como key en el map
            action,
            module,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setHistory((prev) => [newLog, ...prev]);
    };

    const clearHistory = () => {
        setHistory([]);
    };

    return { history, logActivity, clearHistory };
}