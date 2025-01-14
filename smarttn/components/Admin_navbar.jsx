import Link from "next/link";

export default function Admin_mavbar() {
  return (
    <nav className="text-2xl flex items-center bg-red-800 justify-between py-4 text-white my-6 rounded-lg">
      <div className="pl-20 font-bold">Benvenuto ciccio</div>
      <Link href={'/admin'} className="">Home admin</Link>
      
      {/* Dropdown Corsi */}
      <div className="relative group">
        <button className="py-2">Corsi</button>
        <div className="absolute left-0 hidden bg-white text-red-600 text-base shadow-lg w-40 group-hover:block">
          <Link href="/add-course" className="block px-4 py-2">Aggiungi corso</Link>
          <Link href="/viewCourse" className="block px-4 py-2">Lista corsi</Link>
          <Link href="/manage-request" className="block px-4 py-2">Gestisci richieste</Link>
        </div>
      </div>

      {/* Dropdown Account */}
      <div className="relative group">
        <button className="pr-20">Account</button>
        <div className="absolute left-0 hidden bg-white text-red-600 text-base shadow-lg w-40 group-hover:block">
            <Link href="/admin/view-user" className="block px-4 py-2">Lista account</Link>
            <Link href="/add-account" className="block px-4 py-2">Aggiungi account</Link>
        </div>
      </div>
    </nav>
  );
}
