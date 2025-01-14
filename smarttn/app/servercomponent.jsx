import Home_navbar from "@/components/home.jsx";
import { getTokenValidity } from "../token_validity";

export default async function Home() {
  const isTokenValid = await getTokenValidity(); // Chiama la funzione lato server

  return <Home_navbar isTokenValid={isTokenValid} />;
}
