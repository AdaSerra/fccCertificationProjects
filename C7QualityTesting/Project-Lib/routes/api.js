'use strict';
require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let booksSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true
  },
  comments:{
    type: [String],
    default: []
  },
  commentcount: {
    type:Number
  }
})
booksSchema.pre('save', function(next) { this.commencount = this.comments.length; next(); });

let books = mongoose.model('books',booksSchema)


module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res){

      try {
        const allBooks = await books.find({});
        const formattedBooks = allBooks.map(book => ({ _id: book._id, title: book.title, commentcount: book.comments.length }));
        return res.json(formattedBooks)
      }
      catch(err){
        res.status(500).json({error: "library empty"})
      }
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post( async function (req, res){
      if (!req.body.title) {return res.send("missing required field title")}
      
      const newBook = new books({title:req.body.title})
      await newBook.save()
      return res.json(newBook)
      //response will contain new book object including atleast _id and title
    })
    
    .delete(async function(req, res){
      try {
        const deleteAll= await books.deleteMany({})
        return res.send("complete delete successful")
      }
      catch (err) {
        return res.status(500).json("library already empty")
      }
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      try {
      const findBook= await books.findById(req.params.id)
      if(findBook) {
        return res.json(findBook)
      }
      else { return res.send('no book exists')}
    }
    catch(err){
      return res.end('no book exists')
    }
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(async function(req, res){
      if (!req.body.comment) {return res.send("missing required field comment")}
      try {
        const findBook = await books.findByIdAndUpdate(req.params.id,
          { $push: { comments: req.body.comment }, $inc: { commentcount: 1 } }, { new: true }
        )
        if(findBook) {
            return res.json(findBook)
        }
        else {return res.send('no book exists')}
      }
      catch{
        return res.send('no book exists')
      }
     
      //json res format same as .get
    })
    
    .delete(async function(req, res){
      try {
        const deleteBook = await books.findByIdAndDelete(req.params.id)
        if (deleteBook) {return res.send("delete successful")}
        else {return res.send("no book exists")}
      }
      catch (err) {
        return res.status(500).json("error")
      }
      
      //if successful response will be 'delete successful'
    });
  
};
