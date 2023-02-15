const express = require('express');
const router = express.Router();
const db = require('../db/db.json');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

router.get('/api/notes', (req, res) => {
 const savedNote = db;
 res.json(savedNote)
});

router.post('/api/notes', (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    };
    const savedNote = db;
    savedNote.push(newNote);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(savedNote));
    res.status(200).json(savedNote);
});

router.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const savedNote = db;
    for (let i = 0; i < savedNote.length; i++) {
        if (savedNote[i].id === id) {
            savedNote.splice(i, 1)
        }
        
    }
    console.log(savedNote);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(savedNote));
    res.status(200).json(savedNote);
})

module.exports = router