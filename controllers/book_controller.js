const Book = require('../models/book_model');

// Get all books
const getAllBooks = async (req, res) => {
     //##swagger.tags=['books']
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single book by ID
const getSingleBook = async (req, res) => {
     //##swagger.tags=['books']
    try {
        const id = req.params.id;

        const singleBook = await Book.findById(id);

        if (!singleBook) {
            return res.status(404).json({ message: 'No Book found' });
        }

        res.json(singleBook);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

const createBook = async (req, res) => {
     //##swagger.tags=['books']
    try {
        const { title, author, genre, publishedYear, pages, rating } = req.body;

        const newBook = new Book({
            title,
            author,
            genre,
            publishedYear,
            pages,
            rating
        });

        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateBook = async (req, res) => {
    //##swagger.tags=['books']
    try {
         const id = req.params.id;
         const upDatedBook = await Book.findByIdAndUpdate(
            id,
            req.body, // fields to update
            { new: true, runValidators: true } // returns updated doc and validates fields
         );

         if(!upDatedBook){
            return res.status(404).json({message:'Book not found'});
         }

         res.status(200).json(upDatedBook);

    } catch(error) {
        res.status(500).json({message:error.message});
    }
}

const deleteBook = async (req, res) => {
      //##swagger.tags=['books']
    try {
        const id = req.params.id;

        const removedBook = await Book.findByIdAndDelete(id);
        if(!removedBook){
            return res.status(400).json({message:'No book found to be removed'});
        }
        res.status(200).json({message:'Book deleted succesfully', book: removedBook});
    } catch(error) {
        res.status(400).json({message:error.message});
    }
}

module.exports = { getAllBooks, getSingleBook, createBook, deleteBook, updateBook };
