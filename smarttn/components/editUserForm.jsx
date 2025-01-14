'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditUserForm({ id, username, password, role }) {
  const [newUsername, setNewUsername] = useState(username);
  const [newPassword, setNewPassword] = useState(password);
  const [newRole, setNewRole] = useState(role);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: newUsername, password: newPassword, role: newRole }),
      });

      console.log("Response received:", res);

      if (!res.ok) {
        throw new Error("Non è stato possibile aggiornare i dati dell'utente");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log("Error in handleSubmit:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 py-5">Modifica utente</h2>
      <form onSubmit={handleSubmit} className="border border-slate-800 flex flex-col gap-11 py-10 px-10 bg-red-300 rounded-lg">
        <div className="flex items-center gap-12">
          <div className="pr-10">
            <input 
              onChange={e => setNewUsername(e.target.value)}
              value={newUsername}
              className="border border-slate-500 py-2 px-10 text-xl rounded-s text-red-600"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="pl-10">
            <input 
              onChange={e => setNewPassword(e.target.value)}
              value={newPassword}
              className="border border-slate-500 px-10 py-2 text-xl rounded-s text-red-600"
              type="password"
              placeholder="Password"
            />
          </div>
        </div>
        <select 
          onChange={e => setNewRole(e.target.value)}
          value={newRole} 
          className="border border-slate-500 text-xl max-w-3xl rounded-s h-15 py-2 text-red-600 bg-white"
        >
          <option value="user" className="text-red">User</option>
          <option value="poweruser" className="text-red">Power user</option>
          <option value="admin" className="text-red">Admin</option>
        </select>
        <button 
          type="submit" 
          className="border border-slate-800 rounded-s max-w-3xl bg-red-600 font-bold text-white py-2 px-4 text-xl"
        >
          Modifica utente
        </button>
      </form>
    </div>
  );
}
