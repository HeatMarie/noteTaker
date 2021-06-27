const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
let noteList = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));

module.exports = (app) => {


    app.get("/api/notes", (req,res) => {
        return res.json(noteList);
    });

    app.post('/api/notes', (req, res) => {
        const newNoteBtn = req.body;
        newNoteBtn.id = uuidv4();
        console.log('newNoteBtn Id', JSON.stringify(newNoteBtn.id))

        noteList.push(newNoteBtn);

        fs.writeFileSync('db/db.json', JSON.stringify(noteList));

        res.json(noteList);
    });


    // app.delete(`api/notes/:id`, (req, res) => {
    //     const deleteNote = req.params.id;
    //     console.log('deleteNote', deleteNote);
    //     res.json(req.body);
    // });
}