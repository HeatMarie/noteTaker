const path = require('path');

// HTML Routes

module.exports = (app) => {
    // Gets the notes route
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
    // Gets the index route
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    })
    // Gets the index route
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

};