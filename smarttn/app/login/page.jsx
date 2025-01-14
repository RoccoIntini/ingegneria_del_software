'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert("L'username e la password sono obbligatori");
            return;
        }

        try {
            const res = await fetch('https://ingegneria-del-software-phcc.onrender.com/api/users/login', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            if (res.ok) {
                const contentType = res.headers.get("Content-Type");
                if (contentType && contentType.includes("application/json")) {
                    const data = await res.json();

                    if (data.role === 'user') {
                        router.push('/');
                    } else if (data.role === 'poweruser' || data.role === 'admin') {
                        router.push('/admin');
                    }
                } else {
                    console.error("Risposta non in formato JSON", contentType);
                    setError("Errore nel formato della risposta dal server.");
                }
            } else {
                const errorData = await res.json();
                setError(errorData.message || "Credenziali non valide");
            }
        } catch (error) {
            console.error("Errore nella richiesta:", error);
            setError("Errore di connessione al server");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Accedi</h2>
                <input
                    className="input-field"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    type="text"
                    placeholder="Username"
                />
                <input
                    className="input-field"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Password"
                />
                <button type="submit" className="login-button">
                    Conferma
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>

            <style jsx>{`
                .login-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-color: #f0f0f0;
                }

                .login-form {
                    background-color: #b30000;
                    padding: 30px;
                    border-radius: 15px;
                    text-align: center;
                    color: white;
                    max-width: 300px;
                    width: 100%;
                }

                .login-form h2 {
                    margin-bottom: 20px;
                }

                .input-field {
                    width: 100%;
                    padding: 10px;
                    margin: 10px 0;
                    border: none;
                    border-radius: 5px;
                }

                .login-button {
                    background-color: white;
                    color: #b30000;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 5px;
                    cursor: pointer;
                    width: 100%;
                }

                .login-button:hover {
                    background-color: #e60000;
                    color: white;
                }

                .error-message {
                    color: yellow;
                    margin-top: 10px;
                }
            `}</style>
        </div>
    );
}

