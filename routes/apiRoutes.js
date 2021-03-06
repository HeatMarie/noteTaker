const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Finds the object within the array that matches the fetch id of the body id

function remove(array, key, value) {
    const index = array.findIndex(obj => obj[key] === value);
    return index >= 0 ? [
        ...array.slice(0, index),
        ...array.slice(index + 1)
    ] : array;
}

module.exports = (app) => {

// Accesses the data of the notes page
    app.get("/api/notes", (req, res) => {
        const noteList = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
        res.json(noteList);
    });

// Posts new data to the API
    app.post('/api/notes', (req, res) => {
        const noteList = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
        const newNoteBtn = req.body;
        newNoteBtn.id = uuidv4();

        noteList.push(newNoteBtn);

        fs.writeFileSync('db/db.json', JSON.stringify(noteList));

        res.json(noteList);
    });

// Deletes selected note with the api
    app.delete('/api/notes/:id', (req, res) => {
        const noteList = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
        const delNote = req.params.id;
        const newNote = remove(noteList, "id", delNote);
        fs.writeFileSync('db/db.json', JSON.stringify(newNote));
        res.json(newNote);
    });
}