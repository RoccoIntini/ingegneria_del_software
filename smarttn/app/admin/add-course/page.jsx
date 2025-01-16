'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddCourse() {
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

    if (!title || !description || !author || !category || !contentBlocks.length) {
      alert("Titolo, descrizione, autore, categoria e contenuto del corso sono necessari");
      return;
    }

    try {
      const res = await fetch('https://ingegneria-del-software-phcc.onrender.com/api/courses', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
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

  // Aggiungere un nuovo blocco di contenuto
  const addContentBlock = () => {
    setContentBlocks([
      ...contentBlocks,
      { type: 'text', content: '', caption: '' }
    ]);
  };

  // Funzione per aggiornare un blocco di contenuto
  const updateContentBlock = (index, field, value) => {
    const updatedBlocks = [...contentBlocks];
    updatedBlocks[index][field] = value;
    setContentBlocks(updatedBlocks);
  };

  return (
    <div>
      <h2 className="title">Aggiungi un nuovo corso</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="input-field"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Titolo"
            required
          />
        </div>

        <div>
          <input
            className="input-field"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            placeholder="Descrizione"
            required
          />
        </div>

        <div>
          <input
            className="input-field"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            type="text"
            placeholder="Autore"
            required
          />
        </div>

        <div>
          <input
            className="input-field"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            type="text"
            placeholder="Categoria"
            required
          />
        </div>

        {/* Aggiungere i blocchi di contenuto */}
        <div>
          <h3>Contenuti del corso:</h3>
          {contentBlocks.map((block, index) => (
            <div key={index} className="content-block">
              <select
                value={block.type}
                onChange={(e) => updateContentBlock(index, 'type', e.target.value)}
              >
                <option value="text">Testo</option>
                <option value="image">Immagine</option>
                <option value="video">Video</option>
              </select>

              <div>
                <label>Contenuto:</label>
                <input
                  type="text"
                  value={block.content}
                  onChange={(e) => updateContentBlock(index, 'content', e.target.value)}
                />
              </div>

              <div>
                <label>Didascalia (opzionale):</label>
                <input
                  type="text"
                  value={block.caption}
                  onChange={(e) => updateContentBlock(index, 'caption', e.target.value)}
                />
              </div>
            </div>
          ))}

          <button type="button" onClick={addContentBlock}>
            Aggiungi un blocco di contenuto
          </button>
        </div>

        <button type="submit" className="submit-button">
          Aggiungi Corso
        </button>
      </form>
    </div>
  );
}
