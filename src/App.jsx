import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const [notes, setNotes] = useState([]);
    const [noteText, setNoteText] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const getText = async () => {
            const response = await axios.get('https://66d6f6b9006bfbe2e64f47b2.mockapi.io/notes');
            const texts = response.data.map((note) => note.text);
            setNotes(texts);
        };
        getText();
    }, []);

    // (() => {
    //     const sendText = async () => {
    //         const data = Object.entries(notes).map(([index, text]) => ({
    //             id: index,
    //             text: text,
    //         }));

    //         const response = await axios.post('https://66d6f6b9006bfbe2e64f47b2.mockapi.io/notes', data);
    //         console.log(response.data);
    //     };
    //     sendText();
    // }, []);

    const deleteNote = (index) => {
        setNotes(notes.filter((_, i) => i !== index));
    };

    const addOrUpdateNote = () => {
        if (noteText.trim() !== '') {
            if (editIndex !== null) {
                const updatedNotes = notes.map((note, index) =>
                    index === editIndex ? noteText : note,
                );
                setNotes(updatedNotes);
                setEditIndex(null);
            } else {
                setNotes([...notes, noteText]);
                const data = Object.entries(notes).map(([index, text]) => ({
                    id: index,
                    text: noteText,
                }));

                const response = axios.post(
                    'https://66d6f6b9006bfbe2e64f47b2.mockapi.io/notes',
                    notes,
                );
                console.log(response);
            }
            setNoteText('');
        }
    };

    const editNote = (index) => {
        setNoteText(notes[index]);
        setEditIndex(index);
    };

    return (
        <div className="notebook-container">
            <div className="notebook">
                <h1>Заметки</h1>
                <div className="noteInput">
                    <textarea
                        value={noteText}
                        onChange={(event) => setNoteText(event.target.value)}
                        id="note-text"
                        placeholder="Напиши что нибудь..."
                    ></textarea>
                    <button onClick={addOrUpdateNote}>
                        {' '}
                        {editIndex !== null ? 'Обновить заметку' : 'Добавить заметку'}
                    </button>
                </div>
                <div className="notes-list">
                    <h2>Список заметок</h2>
                    <ul id="notes">
                        {notes.map((note, index) => (
                            <li key={index}>
                                {note}{' '}
                                <button className="edit-button" onClick={() => editNote(index)}>
                                    Изменить
                                </button>
                                <button className="delete-button" onClick={() => deleteNote(index)}>
                                    Удалить
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;
