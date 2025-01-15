import Cookies from 'js-cookie';
import Link from "next/link";
import { useEffect, useState } from 'react';
import "../app/home.css";



export default function Home_navbar() {
  const [isTokenValid, setIsTokenValid] = useState(false);
  useEffect(() => {
    fetch("https://ingegneria-del-software-phcc.onrender.com/api/users/login",{
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message==="Token valido") {
          console.log("Token recuperato dal server:", data);
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
        }
      })
      .catch((error) => console.error("Errore nel recupero del token:", error));
  }, []);

  const handleLogout = () => {
    Cookies.set('jwtToken', '', { expires: 0 });
    setIsTokenValid(false); 
    window.location.href = '/';
  };

  return (
    <h1 className="navbar">
      <Link href="/" className="bottoni_home">Home</Link>
      <img src="/logo_smarttn.jpg" alt="logo" className="logo"/>
      <div className="search-bar">
        <img src="/lente_ricerca.png" alt="Search Icon" className="search-icon" />
        <input type="text" placeholder="Cerca..." />
      </div>
      


      <Link href="viewCourseUser" className="bottoni_home">Corsi</Link>

      
      
      {!isTokenValid ? (
          <Link href="/login" className="bottoni_home">Accedi</Link>
        ) : (
          <div className="relative group">
            <button className="py-2">Profilo</button>
            <div className="absolute left-0 hidden bg-white text-red-600 text-base shadow-lg w-40 group-hover:block">
            <button onClick={handleLogout} className="block px-4 py-2">Logout</button>
            </div>
          </div>
        )}

        
      
      
       
      
    </h1>

    
    
  );
}
