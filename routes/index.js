const express = require('express');
const router = express.Router();

/**
 * #swagger.tags = ['Root']
 * #swagger.description = 'Welcome to Books API'
 */
router.get('/', (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.send('<h2>Welcome to Books API</h2><p>Use /books to access the books collection</p>');
});

module.exports = router;
