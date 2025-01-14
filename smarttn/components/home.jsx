import Link from "next/link";
import "../app/home.css";

export default function Home_navbar() {
  return (
    <h1 className="navbar">
      <Link href="/" className="bottoni_home">Home</Link>
      <img src="/logo.jpg" alt="logo" className="logo"/>
      <div className="search-bar">
        <img src="/lente_ricerca.png" alt="Search Icon" className="search-icon" />
        <input type="text" placeholder="Cerca..." />
      </div>
      


      <Link href="viewCourseUser" className="bottoni_home">Corsi</Link>



      <Link href="/login" className="bottoni_home">Accedi</Link>

       
      
    </h1>

    
    
  );
}
