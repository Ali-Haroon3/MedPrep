import { Note } from '../types/study';
import { loadItem, saveItem } from '../utils/storage';

// CRUD store for study notes, persisted to localStorage. IDs and timestamps
// are generated here so callers only supply the content fields.

const STORAGE_KEY = 'notes';

let notes: Note[] = loadItem<Note[]>(STORAGE_KEY, []);

function persist(): void {
  saveItem(STORAGE_KEY, notes);
}

export function getNotes(): Note[] {
  return notes;
}

export function getNotesByTopic(topic: string): Note[] {
  return notes.filter((n) => n.topic === topic);
}

export function createNote(input: Pick<Note, 'title' | 'content' | 'topic' | 'tags'>): Note {
  const now = new Date();
  const note: Note = {
    id: `note-${now.getTime()}`,
    createdAt: now,
    updatedAt: now,
    ...input,
  };
  notes = [note, ...notes];
  persist();
  return note;
}

export function updateNote(id: string, patch: Partial<Pick<Note, 'title' | 'content' | 'tags'>>): void {
  notes = notes.map((n) =>
    n.id === id ? { ...n, ...patch, updatedAt: new Date() } : n
  );
  persist();
}

export function deleteNote(id: string): void {
  notes = notes.filter((n) => n.id !== id);
  persist();
}
