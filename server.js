const express = require('express');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

//parsing the json data
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //We're sending the values through url to the server

//Mongodb config and setup
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).catch((err) => {
    console.log(err); //Handles initial connection error
});
const db = mongoose.connection;
db.on('error', (err) => console.log('> Error occurred from database !'));
db.once('open', () => console.log('> Successfully connected to database...'));

//View Engine Setup
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(expressLayouts);
app.set('layout', 'layouts/layout');

//Bring all routes 
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');

//Routing handler
app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);

//Setup the public folder. WE are telling the express, where the public files are going to be stored.
app.use(express.static("./public"));

//Server Listener
const port = process.env.PORT || 8000;
app.listen(port, ()=> console.log(`Server is running at port ${port}...`));




