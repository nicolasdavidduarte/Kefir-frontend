import { useState } from "react"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./components/Dashboard.tsx";
import {clearToken, getToken, removeUser} from "./auth/token"

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!getToken())

    const handleLoginSuccess = () => {
        setIsLoggedIn(true)
    }

    const handleLogout = () => {
        clearToken();
        removeUser();
        setIsLoggedIn(false)
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