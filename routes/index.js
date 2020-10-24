const express = require('express');

//Router function of express
const router = express.Router();

router.get('/', (req,res) => {
    res.render('index');
})

module.exports = router; 