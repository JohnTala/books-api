const express = require('express');
const bookController = require('../controllers/book_controller');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Validation
const validateBook = [
  body('title').notEmpty().withMessage('Title required').isLength({ min: 2 }),
  body('author').notEmpty().withMessage('Author required'),
  body('publishedYear').isInt({ min: 0 }).withMessage('Year must be a number'),
  body('genre').notEmpty().withMessage('Genre required'),
  body('rating').isFloat({ min: 1, max: 5 }).withMessage('Rating 1-5')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  next();
};

// --------------------
// CRUD Routes
// --------------------

/**
 * #swagger.tags = ['Books']
 * #swagger.path = '/books'
 */
router.get('/', bookController.getAllBooks);

/**
 * #swagger.tags = ['Books']
 * #swagger.path = '/books/{id}'
 */
router.get('/:id', bookController.getSingleBook);

/**
 * #swagger.tags = ['Books']
 * #swagger.path = '/books'
 * #swagger.requestBody = { $ref: "#/components/schemas/Book" }
 */
router.post('/', validateBook, handleValidationErrors, bookController.createBook);

/**
 * #swagger.tags = ['Books']
 * #swagger.path = '/books/{id}'
 * #swagger.requestBody = { $ref: "#/components/schemas/Book" }
 */
router.put('/:id', validateBook, handleValidationErrors, bookController.updateBook);

/**
 * #swagger.tags = ['Books']
 * #swagger.path = '/books/{id}'
 */
router.delete('/:id', bookController.deleteBook);

module.exports = router;
