import Cookies from 'js-cookie';
import Link from "next/link";
import { useEffect, useState } from 'react';
import "../app/home.css";

export default function Home_navbar() {
  const [isTokenValid, setIsTokenValid] = useState(false);
  useEffect(() => {
    const token = Cookies.get('tokenjwt'); // Get the token from cookies
    if (!token) {
        setIsTokenValid(false);
        return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      // Check if the token is expired or has the wrong role
      if (decoded.exp < currentTime) {
          setIsTokenValid(false);
      } else {
          setIsTokenValid(true);
      }
    } catch (error) {
        console.error('Invalid token:', error);
        setIsTokenValid(false);
    }
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
