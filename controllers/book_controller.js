const Book = require('../models/book_model');

const getAllBooks = async (req, res) => {
  //##swagger.tags=['books']
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleBook = async (req, res) => {
  //##swagger.tags=['books']
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBook = async (req, res) => {
  //##swagger.tags=['books']
  try {
    const { title, author, genre, publishedYear, pages, rating } = req.body;
    const newBook = new Book({ title, author, genre, publishedYear, pages, rating });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateBook = async (req, res) => {
  //##swagger.tags=['books']
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBook = async (req, res) => {
  //##swagger.tags=['books']
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(400).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully', book: deletedBook });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllBooks, getSingleBook, createBook, updateBook, deleteBook };
