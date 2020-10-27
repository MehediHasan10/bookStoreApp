const express = require('express');
const router = express.Router();

const Author = require('../models/author'); //This will give access to the Author model.

//All authors 
router.get('/',  async (req,res) => {
    let searchOptions = {};
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        const allAuthors = await Author.find(searchOptions);
        res.render('authors/index', {output: allAuthors});

    } catch (err) {
        res.redirect('/');
    }
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
        // res.redirect(`/`);
        res.render('authors/');
    } catch (err) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating author'
        });
        // console.log(err);
    }

    // res.send(req.body.name);
});

module.exports = router;