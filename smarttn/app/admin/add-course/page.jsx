'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function addCourse(){
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [contentBlocks, setContentBlocks] = useState([
     { type: 'text', content: '', caption: '' } 
  ]);

  const router = useRouter();

  const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !author || !category || !contentBlocks) {
            alert("titolo, descrizione, autore, argomento e contenuto del corso sono necessari");
            return;
        }

        try {
            const res = await fetch('https://ingegneria-del-software-phcc.onrender.com/api/courses', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ title, description, author, category, contentBlocks }),
            });

            if (res.ok) {
                router.push('/admin');
            } else {
                throw new Error("Creazione del corso fallita");
            }
        } catch (error) {
            console.log(error);
        }
    };



}
