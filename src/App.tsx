import { useState } from "react"
import LoginPage from "./pages/LoginPage"
import { getToken } from "./auth/token"

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!getToken())

    const handleLoginSuccess = () => {
        setIsLoggedIn(true)
    }

    if (isLoggedIn) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>Login successful!</h1>
                <p>The token has been stored successfully.</p>
                <button
                    onClick={() => {
                        localStorage.removeItem("accessToken");
                        setIsLoggedIn(false);
                    }}
                >
                    Log Out
                </button>
            </div>
        )
    }

    return <LoginPage onLoginSuccess={handleLoginSuccess} />
}