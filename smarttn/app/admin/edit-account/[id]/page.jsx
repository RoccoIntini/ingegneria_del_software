import EditUserForm from "@/components/editUserForm";

const getUserById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        cache: 'no-store',
      });
  
      if (!res.ok) {
        throw new Error("Non è stato possibile prelevare le informazioni dell'utente");
      }
  
      return res.json();
    } catch (error) {
      console.error("Errore durante il fetch dei dati utente:", error);
    }
  };
  



  export default async function EditUser({ params }) {
    const { id } = params;
    const user = await getUserById(id);
    console.log("porco il mega frumo: ", id);
    console.log("grandi parametri: ", params);
    if (!user) {
      return <div>Errore nel caricamento dei dati utente</div>;
    }else{
        console.log("maremma bucaiola");
    }
  
    const { username, password, role } = user;
    return <EditUserForm id={id} username={username} password={password} role={role} />;
  }
  