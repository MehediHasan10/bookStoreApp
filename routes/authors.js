const express = require('express');
const router = express.Router();

const Author = require('../models/author'); //This will give access to the Author model.

//All authors 
router.get('/', (req,res) => {
    res.render('authors/index');
});

//@GET  -  Create new author
router.get('/new', (req,res) => {
    res.render('authors/new', { author : new Author() }); //Instance of Author class. Which will be sent to the ejs file.
});

//@POST  -  Create new author
router.post('/new', async (req,res) => {
    const author = new Author({
        name: req.body.name
    });

    try {
        const authorData = await author.save();
        res.render()
    } catch (err) {
        console.log(err);
    }

    // res.send(req.body.name);
});

module.exports = router;