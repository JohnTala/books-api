const express = require('express');
const router = express.Router();

/**
 * #swagger.tags = ['Root']
 * #swagger.description = 'Welcome to Books API'
 * #swagger.responses[200] = { description: 'API is running' }
 */
router.get('/', (req, res) => {
    res.setHeader('content-type','text/html');
    res.send('<h2>Welcome to Books API</h2><p>Use /books to get all books</p>');
});

module.exports = router;
