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

  return (
    <h1 className="navbar">
      <Link href="/" className="bottoni_home">Home</Link>
      <img src="/logo.jpg" alt="logo" className="logo"/>
      <div className="search-bar">
        <img src="/lente_ricerca.png" alt="Search Icon" className="search-icon" />
        <input type="text" placeholder="Cerca..." />
      </div>
      


      <Link href="viewCourseUser" className="bottoni_home">Corsi</Link>

      
      
      {!isTokenValid ? (
          <Link href="/login" className="bottoni_home">Accedi</Link>
        ) : (
          <Link href="/login" className="bottoni_home">Profilo</Link>
        )}

        
      
        
      
       
      
    </h1>

    
    
  );
}
