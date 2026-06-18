import { useState } from "react"
import { login } from "../api/authApi"
import * as React from "react";

type LoginPageProps = {
    onLoginSuccess: () => void
}


export default function LoginPage({ onLoginSuccess }: LoginPageProps) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function handleSubmit(
        event: React.SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault()

        try {
            await login(
                username,
                password
            )

            onLoginSuccess()

        } catch {
            setError("Invalid username or password")
        }
    }

    return (
        <div>
            <h1>Kefir</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Username</label>
                    <input
                        value={username}
                        onChange={e =>
                            setUsername(e.target.value)
                        }
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e =>
                            setPassword(e.target.value)
                        }
                    />
                </div>

                <button type="submit">
                    Login
                </button>

                {error && (
                    <p style={{ color: "red" }}>{error}</p>
                )}

            </form>
        </div>
    )
}