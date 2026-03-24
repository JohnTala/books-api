const express = require('express');
const bookController = require('../controllers/book_controller');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Validation rules
const validateBook = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 2 }).withMessage('Title must be at least 2 characters'),

  body('author')
    .notEmpty().withMessage('Author is required'),

  body('year')
    .isInt({ min: 0 }).withMessage('Year must be a valid number'),

  body('genre')
    .notEmpty().withMessage('Genre is required'),

  body('rate')
    .notEmpty().withMessage('Rate is required')
    .isFloat({ min: 1, max: 5 }).withMessage('Rate must be between 1 and 5')
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
 */
router.post(
  '/',
  validateBook,              
  handleValidationErrors,
  bookController.createBook
);

/**
 * #swagger.tags = ['Books']
 * #swagger.path = '/books/{id}'
 */
router.put(
  '/:id',
  validateBook,              
  handleValidationErrors,
  bookController.updateBook
);

/**
 * #swagger.tags = ['Books']
 * #swagger.path = '/books/{id}'
 */
router.delete('/:id', bookController.deleteBook);

module.exports = router;
