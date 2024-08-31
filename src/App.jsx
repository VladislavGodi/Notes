import { useState } from 'react';
import './App.css';

function App() {
    return (
      <div className='notebook-container'>
        <div className="notebook">
            <h1>Заметки</h1>
            <div className="noteInput">
                <textarea id="note-text" placeholder="Напиши что нибудь..."></textarea>
                <button>Добавить заметку</button>
            </div>
            <div className="notes-list">
                <h2>Список заметок</h2>
                <ul id="notes"></ul>
                <li>gsdgsdgs</li>
            </div>
        </div>
        </div>
    );
}

export default App;
