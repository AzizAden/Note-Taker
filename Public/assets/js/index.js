
const getNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const saveNote = async (note) => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const renderNoteList = (notes) => {
    const noteList = document.querySelector('.list-group');
    noteList.innerHTML = '';
  
    if (notes.length === 0) {
      const noNotesItem = document.createElement('li');
      noNotesItem.classList.add('list-group-item', 'text-center');
      noNotesItem.textContent = 'No notes found';
      noteList.appendChild(noNotesItem);
      return;
    }
  
    notes.forEach((note) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      listItem.dataset.noteId = note.id;
      listItem.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="mb-0">${note.title}</h6>
          <i class="fas fa-trash delete-note"></i>
        </div>
      `;
      noteList.appendChild(listItem);
    });
  };
  

  const renderSelectedNote = (note) => {
    const noteTitle = document.querySelector('.note-title');
    const noteTextarea = document.querySelector('.note-textarea');
    noteTitle.value = note.title || '';
    noteTextarea.value = note.text || '';
  };
  
  // Event listener for save note button
  document.addEventListener('click', async (event) => {
    if (event.target.matches('.save-note')) {
      const noteTitle = document.querySelector('.note-title').value;
      const noteText = document.querySelector('.note-textarea').value;
  
      if (!noteTitle || !noteText) {
        return alert('Please enter both a note title and note text.');
      }
  
      const newNote = {
        title: noteTitle,
        text: noteText,
      };
  
      const savedNote = await saveNote(newNote);
      if (savedNote) {
        renderNoteList([savedNote]);
        renderSelectedNote(savedNote);
      }
    }
  });
  
  // Event listener for delete note button
  document.addEventListener('click', async (event) => {
    if (event.target.matches('.delete-note')) {
      const noteItem = event.target.closest('.list-group-item');
      const noteId = noteItem.dataset.noteId;
      const confirmDelete = confirm('Are you sure you want to delete this note?');
  
      if (confirmDelete) {
        await deleteNote(noteId);
        noteItem.remove();
        renderSelectedNote({});
      }
    }
  });
  
  // Event listener for selecting a note from the list
  document.addEventListener('click', async (event) => {
    if (event.target.matches('.list-group-item')) {
      const noteId = event.target.dataset.noteId;
      const notes = await getNotes();
      const selectedNote = notes.find((note) => note.id === noteId);
  
      if (selectedNote) {
        renderSelectedNote(selectedNote);
      }
    }
  });
  
  // Initial load
  const initialize = async () => {
    const notes = await getNotes();
    renderNoteList(notes);
    renderSelectedNote({});
  };
  
  initialize();
  