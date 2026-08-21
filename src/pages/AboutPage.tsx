import { useState, useEffect } from "react";
import { fetchVersion } from "../api/version.ts";
import type { Version } from "../types/Version.ts";

export default function AboutPage() {
    const [version, setVersion] = useState<Version>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchVersion()
            .then((data) => {
                setVersion(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Something went wrong");
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <div style={{ marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <h2 style={{ margin: 0, fontSize: '18px', color: '#0f172a', fontWeight: '600' }}>About Kefir</h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>Software details</p>
            </div>

            <div style={{ fontSize: '14px', color: '#334155' }}>
                {loading && <p>Loading version...</p>}
                {error && <p style={{ color: '#ef4444' }}>Error: {error}</p>}
                <p>
                    <strong>Frontend Version:</strong> 2.0
                </p>
                {version && (
                    <p>
                        <strong>Backend Version:</strong> {version.version}
                    </p>
                )}
                <p>
                    <strong>Java Version:</strong> 21
                </p>
                <p>
                    <strong>Spring Boot Version:</strong> 3.5.15
                </p>
                <p>
                    <strong>Author:</strong> Nicolás David Duarte
                </p>
                <p>
                    <strong>Git Page:</strong>{' '}
                    <a
                        href="https://github.com/nicolasdavidduarte"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#0284c7', textDecoration: 'underline' }}
                    >
                        github.com/nicolasdavidduarte
                    </a>
                </p>
            </div>

        </div>
    );
}