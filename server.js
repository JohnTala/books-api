const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./database/db');
const indexRoutes = require('./routes/index');
const bookRoutes = require('./routes/bookRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

// --------------------
// Middleware
// --------------------
app.use(cors()); // Allow all origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------
// Swagger UI
// --------------------
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --------------------
// Routes
// --------------------
app.use('/', indexRoutes);
app.use('/books', bookRoutes);

// --------------------
// Express error handler
// --------------------
app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

// --------------------
// Start server after DB connects
// --------------------
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('DB connection failed:', err);
    process.exit(1);
  });
