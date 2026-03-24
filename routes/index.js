const express = require('express');
const router = express.Router();

/**
 * #swagger.tags = ['Root']
 * #swagger.description = 'Welcome endpoint for the Books API'
 * #swagger.responses[200] = {
 *   description: 'API is running',
 *   schema: {
 *     message: 'Welcome to Books API. Use /books to access the books collection.'
 *   }
 * }
 */
router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'Welcome to Books API. Use /books to access the books collection.' });
});

module.exports = router;
