const express = require('express');
const bookController = require('../controllers/book_controller');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Validation rules (match MongoDB fields)
const validateBook = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 2 }).withMessage('Title must be at least 2 characters'),

  body('author')
    .notEmpty().withMessage('Author is required'),

  body('publishedYear')
    .isInt({ min: 0 }).withMessage('Year must be a valid number'),

  body('genre')
    .notEmpty().withMessage('Genre is required'),

  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
];

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

/**
 * GET /books
 * #swagger.tags = ['Books']
 * #swagger.description = 'Get all books'
 * #swagger.responses[200] = {
 *   description: 'List of books',
 *   schema: [{ $ref: '#/components/schemas/Book' }]
 * }
 */
router.get('/', bookController.getAllBooks);

/**
 * GET /books/{id}
 * #swagger.tags = ['Books']
 * #swagger.description = 'Get a single book by ID'
 * #swagger.parameters['id'] = { description: 'Book ID', required: true }
 * #swagger.responses[200] = { 
 *   description: 'Single book', 
 *   schema: { $ref: '#/components/schemas/Book' } 
 * }
 * #swagger.responses[404] = { description: 'Book not found' }
 */
router.get('/:id', bookController.getSingleBook);

/**
 * POST /books
 * #swagger.tags = ['Books']
 * #swagger.description = 'Create a new book'
 * #swagger.requestBody = {
 *   required: true,
 *   content: {
 *     "application/json": {
 *       schema: { $ref: "#/components/schemas/Book" }
 *     }
 *   }
 * }
 * #swagger.responses[201] = { 
 *   description: 'Book created successfully', 
 *   schema: { $ref: '#/components/schemas/Book' } 
 * }
 * #swagger.responses[400] = { description: 'Validation errors or bad request' }
 */
router.post(
  '/',
  validateBook,
  handleValidationErrors,
  bookController.createBook
);

/**
 * PUT /books/{id}
 * #swagger.tags = ['Books']
 * #swagger.description = 'Update a book by ID'
 * #swagger.parameters['id'] = { description: 'Book ID', required: true }
 * #swagger.requestBody = {
 *   required: true,
 *   content: {
 *     "application/json": {
 *       schema: { $ref: "#/components/schemas/Book" }
 *     }
 *   }
 * }
 * #swagger.responses[200] = { 
 *   description: 'Book updated successfully', 
 *   schema: { $ref: '#/components/schemas/Book' } 
 * }
 * #swagger.responses[404] = { description: 'Book not found' }
 * #swagger.responses[400] = { description: 'Validation errors or bad request' }
 */
router.put(
  '/:id',
  validateBook,
  handleValidationErrors,
  bookController.updateBook
);

/**
 * DELETE /books/{id}
 * #swagger.tags = ['Books']
 * #swagger.description = 'Delete a book by ID'
 * #swagger.parameters['id'] = { description: 'Book ID', required: true }
 * #swagger.responses[200] = { description: 'Book deleted successfully' }
 * #swagger.responses[404] = { description: 'Book not found to delete' }
 */
router.delete('/:id', bookController.deleteBook);

module.exports = router;
