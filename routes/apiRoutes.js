const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
    let noteList = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));

    app.get("/api/notes", (req,res) => {
        return res.json(noteList);
    });

    app.post('/api/notes', (req, res) => {
        const newNoteBtn = req.body;
        newNoteBtn.id = uuidv4();
        console.log('newNoteBtn Id', JSON.stringify(newNoteBtn.id))
        let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

        noteList.push(newNoteBtn);

        fs.writeFileSync('db/db.json', JSON.stringify(noteList));

        res.json(noteList);
    });

    app.delete(`api/notes`, (req, res) => {
        const deleteNote = req.body.id;
        console.log('deleteNote', deleteNote);

        fs.readFile('.db/db.json', (err, data) => {
            if (err) throw err;

            dbData = JSON.parse(data);

            for(let i = 0; i < dbData.length; i++){
                if(dbData[i].id === Number(deleteNotes)){
                    dbData.splice([i], 1);
                }
            }
            stringData = JSON.stringify(dbData);
            fs.writeFile('.db/db.json', stringData, (err,data) => {
                if (err) throw err;
            });
        });
        res.status(204).send();
    });
}