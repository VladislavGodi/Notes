import { useState } from 'react';
import './App.css';

function App() {
    const [notes, setNotes] = useState([]);
    const [noteText, setNoteText] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    // const addNote = () => {
    //     if (noteText.trim() !== '') {
    //         setNotes([...notes, noteText]);
    //         setNoteText('');
    //     }
    // };

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
