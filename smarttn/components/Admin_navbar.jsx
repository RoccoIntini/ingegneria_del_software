'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Admin_mavbar() {
  const [nomeutente, setNomeutente] = useState('');
  useEffect(() => {
    fetch("https://ingegneria-del-software-phcc.onrender.com/api/users/login",{
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message==="Token valido") {
          console.log("Token recuperato dal server:", data);
          setNomeutente(data.decoded.username);
        }
      })
      .catch((error) => console.error("Errore nel recupero del token:", error));
  }, []);

  const handleLogout = () => {
    fetch("https://ingegneria-del-software-phcc.onrender.com/api/users/login", {
      method: "DELETE",
      credentials: "include", 
    })
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => console.error("Errore durante il logout:", error));
  };

  return (
    <nav className="text-2xl flex items-center bg-red-800 justify-around py-4 text-white my-6 rounded-lg">
  <div className="font-bold">Benvenuto {nomeutente || 'utente'}</div>
  <Link href={'/admin'}>Home admin</Link>

  {/* Dropdown Corsi */}
  <div className="relative group">
    <button className="py-2">Corsi</button>
    <div className="absolute left-0 hidden bg-white text-red-600 text-base shadow-lg w-40 group-hover:block">
      <Link href="/admin/add-course" className="block px-4 py-2">Aggiungi corso</Link>
      <Link href="/admin/viewCourse" className="block px-4 py-2">Lista corsi</Link>
      <Link href="/admin/notAvailable" className="block px-4 py-2">Gestisci richieste</Link>
    </div>
  </div>

  {/* Dropdown Account */}
  <div className="relative group">
    <button>Account</button>
    <div className="absolute left-0 hidden bg-white text-red-600 text-base shadow-lg w-40 group-hover:block">
      <Link href="/admin/view-user" className="block px-4 py-2">Lista account</Link>
      <Link href="/admin/add-account" className="block px-4 py-2">Aggiungi account</Link>
    </div>
  </div>

  {/* Dropdown Profilo */}
  <div className="relative group">
    <button>Profilo</button>
    <div className="absolute left-0 hidden bg-white text-red-600 text-base shadow-lg w-40 group-hover:block">
      <button onClick={handleLogout} className="block px-4 py-2">Logout</button>
    </div>
  </div>
</nav>

  );
}
