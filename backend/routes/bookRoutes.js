const { getAllAuthors, addAuthor, updateAuthor, deleteAuthor } = require("../controller/authorController");

const { getAllBooks, addBook, updateBoook, deleteBook } = require("../controller/bookController");
const express = require('express');
const { searchBooksAndAuthors } = require("../controller/searchController");
const { checkLogin } = require("../controller/loginController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

//All Routes
router
.post('/login',checkLogin)
.get('/' ,getAllBooks)
.post('/addBook',addBook)
.put('/updateBook/:id',verifyToken,updateBoook)
.delete('/deleteBook/:id',deleteBook)
.get('/allAuthors', getAllAuthors)
.post('/addAuthor', verifyToken,addAuthor) 
.put('/updateAuthor/:id',verifyToken,updateAuthor)
.delete('/deleteAuthor/:id',verifyToken,deleteAuthor)
.get('/search',searchBooksAndAuthors)

module.exports = router;