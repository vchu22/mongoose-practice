var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Book = require('./books.model')
var port = 8080

var db = 'mongodb://localhost/test'
mongoose.connect(db, { useNewUrlParser: true })

app.get('/', function(req, res){
    res.send('happy to be here')
})

// Get all the books
app.get('/books', function(req, res){
    console.log('getting all books')
    Book.find({})
        .exec(function(err, books){
            if (err){
                res.send('error has occured')
            } else {
                console.log(books)
                res.json(books)
            }
        })
})

// Get one book
app.get('/books/:title', function(req, res){
    console.log('getting one books')
    Book.findOne({
        title: req.params.title
    }).exec(function(err, book){
        if (err){
            res.send('error has occured')
        } else {
            console.log(book)
            res.json(book)
        }
    })
})

app.listen(port, function(){
    console.log(`server running on port ${port}`)
})