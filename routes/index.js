const express = require('express');
const router = express.Router();

/**
 * #swagger.tags = ['Root']
 * #swagger.description = 'Welcome to Books API'
 * #swagger.responses[200] = {
 *   description: 'API is running',
 *   schema: { success: true, message: 'Welcome to Books API. Use /books to get all books.' }
 * }
 */
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to Books API. Use /books to get all books.'
    });
});

module.exports = router;
