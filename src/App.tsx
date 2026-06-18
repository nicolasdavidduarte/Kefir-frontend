import {useCallback, useEffect, useState} from "react"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./components/Dashboard.tsx";
import {clearToken, getToken, removeUser, isTokenExpired, getTokenRemainingTime} from "./auth/token"

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        if (isTokenExpired()) {
            clearToken();
            removeUser();
            return false;
        }
        return !!getToken();
    });

    const handleLogout = useCallback(() => {
        clearToken();
        removeUser();
        setIsLoggedIn(false);
    }, []);

    useEffect(() => {
        if (!isLoggedIn) return;

        const remainingTime = getTokenRemainingTime();

        if (remainingTime > 0) {
            const timer = setTimeout(() => {
                alert("Session expired");
                handleLogout();
            }, remainingTime);

            return () => clearTimeout(timer);
        } else {
            const fallbackTimer = setTimeout(() => {
                handleLogout();
            }, 0);

            return () => clearTimeout(fallbackTimer);
        }
    }, [isLoggedIn, handleLogout]);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true)
    }

    return (
        <>
            {isLoggedIn ? (
                <Dashboard onLogout={handleLogout}/>
            ): (
                <LoginPage onLoginSuccess={handleLoginSuccess}/>
            )}
        </>
    )
}