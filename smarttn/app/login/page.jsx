'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // Per gestire errori di autenticazione
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

        // Verifica che la risposta sia OK
        if (res.ok) {
            // Verifica che il tipo di contenuto sia JSON
            const contentType = res.headers.get("Content-Type");
            if (contentType && contentType.includes("application/json")) {
                const data = await res.json();
                                
                if(data.role === 'user'){
                    router.push('/');
                }else if(data.role === 'poweruser' || data.role === 'admin'){
                    router.push('/admin');
                }
            } else {
                // Gestisci il caso in cui la risposta non sia JSON
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
        <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit} className="border border-slate-800 flex flex-col gap-11 py-10 px-10 bg-red-300 rounded-lg">
                <div className="flex items-center gap-12">
                    <div className="pr-10">
                        <input 
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            className="border border-slate-500 py-2 px-10 text-xl rounded text-red-600"
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <div className="pl-10">
                        <input 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="border border-slate-500 px-10 py-2 text-xl rounded text-red-600"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                </div>
                <button type="submit" className="border border-slate-800 rounded max-w-3xl bg-red-600 font-bold text-white py-2 px-4 text-xl">
                    Accedi
                </button>
                {error && <p className="text-red-700 mt-4">{error}</p>} {/* Messaggio di errore */}
            </form>
        </div>
    );
}

