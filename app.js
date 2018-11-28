var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Book = require('./books.model')
var port = 8080

var db = 'mongodb://localhost/test'
mongoose.connect(db, { useNewUrlParser: true })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

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

// Add a book
app.post('/book', function(req, res){
    console.log("create book")
    var newBook = new Book()

    newBook.title = req.body.title
    newBook.authors = req.body.authors
    newBook.category = req.body.category

    // Alternative
    // Book.create(req.body, function(err, book){})
    newBook.save(function(err, book){
        if(err){
            res.send('error saving book')
        } else {
            console.log(book)
            res.send(book)
        }
    })
})

// fix error
mongoose.set('useFindAndModify', false);
// Update book
app.put('/book/:id',function(req,res){
    Book.findOneAndUpdate({
        _id: req.params.id
    }, {$set: { title: req.body.title }},
        { upsert: true },
        function(err, newBook){
            if(err){
                res.send('error updating book')
            } else {
                console.log(newBook);
                res.send(newBook);
            }
        })
    })

// Delete Book
app.delete('/book/:id',function(req,res){
    Book.findOneAndRemove({
        _id: req.params.id
    }, function(err, book){
        if(err){
            res.send('error deleting')
        } else {
            console.log(book)
            res.send(book)
        }
    })
})

app.listen(port, function(){
    console.log(`server running on port ${port}`)
})