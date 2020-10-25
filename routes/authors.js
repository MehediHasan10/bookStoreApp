const express = require('express');
const router = express.Router();

//All authors 
router.get('/', (req,res) => {
    res.render('authors/index');
});

//@GET  -  Create new author
router.get('/new', (req,res) => {
    res.render('authors/new');
});

//@POST  -  Create new author
router.post('/new', (req,res) => {
    res.send('Create');
});

module.exports = router;