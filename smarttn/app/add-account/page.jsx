'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert("L'username e la password sono obbligatori");
            return;
        }

        try {
            const res = await fetch('https://ingegneria-del-software-phcc.onrender.com/api/users', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ username, password, role }),
            });

            if (res.ok) {
                router.push('/');
            } else {
                throw new Error("Creazione dell'utente fallita");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="add-user-container">
            <h2 className="title">Aggiungi un nuovo utente</h2>

            <form onSubmit={handleSubmit} className="add-user-form">
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

                <select
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                    className="select-field"
                >
                    <option value="user">User</option>
                    <option value="poweruser">Power User</option>
                </select>

                <button type="submit" className="submit-button">
                    Aggiungi Utente
                </button>
            </form>

            <style jsx>{`
                .add-user-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 70vh;
                }

                .add-user-form {
                    margin-top: 30px;
                    background-color: #b30000;
                    padding: 50px;
                    padding-bottom: 100px;
                    border-radius: 15px;
                    text-align: center;
                    color: white;
                    min-height: 450px;
                    max-width: 400px;
                    width: 100%;
                }

                .title {
                    margin-bottom: 20px;
                    font-size: 2.5em; 
                    color:  #b30000; 
                }

                .input-field, .select-field {
                    width: 100%;
                    padding: 10px;
                    margin: 20px 0; 
                    border: none;
                    border-radius: 5px;
                    color: #b30000;
                }

                .select-field {
                    background-color: white;
                }

                .submit-button {
                    background-color: white;
                    color: #b30000;
                    border: none;
                    padding: 10px 15px;
                    margin-top: 50px;
                    border-radius: 5px;
                    cursor: pointer;
                    width: 100%;
                }

                .submit-button:hover {
                    background-color: #e60000;
                    color: white;
                }
            `}</style>
        </div>
    );
}
