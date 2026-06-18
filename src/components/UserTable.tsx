import type { User } from "../types/User"

type Props = {
    users: User[]
}

export default function UserTable({ users }: Props) {
    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Enabled</th>
                <th>Roles</th>
            </tr>
            </thead>

            <tbody>
            {users.map(user => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.enabled ? "Yes" : "No"}</td>
                    <td>{user.roles.join(", ")}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}