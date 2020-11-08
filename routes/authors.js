const express = require('express');
const router = express.Router();

const Author = require('../models/author'); //This will give access to the Author model.

//@GET  -  All authors 
router.get('/',  async (req,res) => {
    let searchOptions = {};
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        const allAuthors = await Author.find(searchOptions);
        res.render('authors/index',
            {
                output: allAuthors, 
                searchOptions:req.query
            });

    } catch (err) {
        res.redirect('/');
    }
});
 
//@GET  -  Create new author
router.get('/new', (req,res) => {
    const author = new Author();
    res.render('authors/new', { author : author }); //Instance of Author class. Which will be sent to the ejs file.
});

//@POST  -  Create new author
router.post('/new', async (req,res) => {
    const author = new Author({
        name: req.body.name
    });

    try {
        const authorData = await author.save();
        // res.redirect(`/`);
        res.redirect('/authors/new');
    } catch (err) {
        res.render('authors/new', {
            author: author, //sending this to the ejs file, so that once the value is entered into the input field, after getting the error, the value will remain in the input field. We dont have to re-enter the value. 
            errorMessage: 'Error creating author'
        });
        // console.log(err);
    }

    // res.send(req.body.name);
});

module.exports = router;