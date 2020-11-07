const express = require('express');
const router = express.Router();

const Book = require('../models/book'); //This will give access to the Author model.

//@GET  -  All books 
router.get('/',  async (req,res) => {
    res.send('All Books');
});
 
//@GET  -  Create new books
router.get('/new', (req,res) => {
    res.send('New Books');
});

//@POST  -  Create new books
router.post('/new', async (req,res) => {
    res.send('Create Books');
});

module.exports = router;