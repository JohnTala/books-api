const express = require('express');
const bookController = require('../controllers/book_controller');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Validation rules
const validateBook = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 2 }).withMessage('Title must be at least 2 characters'),
  body('author').notEmpty().withMessage('Author is required'),
  body('publishedYear').isInt({ min: 0 }).withMessage('Year must be valid'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('rating').notEmpty().withMessage('Rating is required')
    .isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
];

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  next();
};

/**
 * #swagger.tags = ['Books']
 * #swagger.description = 'Get all books'
 * #swagger.responses[200] = { description: 'OK', schema: [{ $ref: "#/components/schemas/Book" }] }
 */
router.get('/', bookController.getAllBooks);

/**
 * #swagger.tags = ['Books']
 * #swagger.description = 'Get a single book by ID'
 * #swagger.parameters['id'] = { description: 'Book ID', required: true }
 * #swagger.responses[200] = { description: 'OK', schema: { $ref: "#/components/schemas/Book" } }
 * #swagger.responses[404] = { description: 'Book not found' }
 */
router.get('/:id', bookController.getSingleBook);

/**
 * #swagger.tags = ['Books']
 * #swagger.description = 'Create a new book'
 * #swagger.parameters['body'] = {
 *   in: 'body',
 *   description: 'Book info',
 *   required: true,
 *   schema: { $ref: "#/components/schemas/Book" }
 * }
 * #swagger.responses[201] = { description: 'Created', schema: { $ref: "#/components/schemas/Book" } }
 * #swagger.responses[400] = { description: 'Validation error' }
 */
router.post('/', validateBook, handleValidationErrors, bookController.createBook);

/**
 * #swagger.tags = ['Books']
 * #swagger.description = 'Update a book by ID'
 * #swagger.parameters['id'] = { description: 'Book ID', required: true }
 * #swagger.parameters['body'] = {
 *   in: 'body',
 *   description: 'Book info to update',
 *   required: true,
 *   schema: { $ref: "#/components/schemas/Book" }
 * }
 * #swagger.responses[200] = { description: 'Updated successfully', schema: { $ref: "#/components/schemas/Book" } }
 * #swagger.responses[400] = { description: 'Validation error' }
 * #swagger.responses[404] = { description: 'Book not found' }
 */
router.put('/:id', validateBook, handleValidationErrors, bookController.updateBook);

/**
 * #swagger.tags = ['Books']
 * #swagger.description = 'Delete a book by ID'
 * #swagger.parameters['id'] = { description: 'Book ID', required: true }
 * #swagger.responses[200] = { description: 'Book deleted successfully' }
 * #swagger.responses[400] = { description: 'Book not found or error' }
 */
router.delete('/:id', bookController.deleteBook);

module.exports = router;
