import React, { useMemo, useState } from 'react';
import { Note } from '../types/study';
import { getNotes, createNote, deleteNote } from '../store/notesStore';

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(getNotes());
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('General');
  const [tagInput, setTagInput] = useState('');

  const tags = useMemo(
    () => tagInput.split(',').map((t) => t.trim()).filter(Boolean),
    [tagInput]
  );

  const handleAdd = () => {
    if (!title.trim()) return;
    createNote({ title: title.trim(), content: content.trim(), topic, tags });
    setNotes(getNotes());
    setTitle('');
    setContent('');
    setTagInput('');
  };

  const handleDelete = (id: string) => {
    deleteNote(id);
    setNotes(getNotes());
  };

  return (
    <div className="notes">
      <h2>Notes</h2>
      <div className="notes__editor">
        <input
          className="notes__input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="notes__textarea"
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="notes__input"
          placeholder="Tags (comma separated)"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        />
        <button className="notes__add" onClick={handleAdd}>Add note</button>
      </div>

      {notes.length === 0 ? (
        <p className="notes__empty">No notes yet — jot down something you keep forgetting.</p>
      ) : (
        <ul className="notes__list">
          {notes.map((note) => (
            <li key={note.id} className="notes__item">
              <div className="notes__item-header">
                <strong>{note.title}</strong>
                <button className="notes__delete" onClick={() => handleDelete(note.id)}>
                  Delete
                </button>
              </div>
              <p>{note.content}</p>
              <div className="notes__tags">
                {note.tags.map((t) => (
                  <span key={t} className="notes__tag">#{t}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notes;
