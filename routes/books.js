const express = require('express');
const router = express.Router();

const Book = require('../models/book'); //This will give access to the Author model.
const Author = require('../models/author');

//@GET  -  All books 
router.get('/',  async (req,res) => {
    res.send('All Books');
});

//@GET  -  new books
router.get('/new', async (req,res) => {
    try {
        const authors = await Author.find();
        const book = new Book();

        res.render('books/new', {
            authors: authors,
            book: book
        })
    } catch (err) {
        console.log(err);
        res.redirect('/books');
    }
});

//@POST  -  Create new books
router.post('/new', async (req,res) => {
    res.send('Create Books');
});

module.exports = router;