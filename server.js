const express = require('express');
require('dotenv').config();
const cors = require('cors');

// Catch sync errors FIRST
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION!');
  console.error(err.name, err.message);
  process.exit(1);
});

const app = express();

const connectDB = require('./database/db');
const indexRoutes = require('./routes/index');
const bookRoutes = require('./routes/bookRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// --------------------
// Middleware
// --------------------
app.use(cors());
app.options('*', cors()); // 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------
// Swagger
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
  console.error('The Express error is ', err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

// --------------------
// Start server ONLY after DB connects
// --------------------
const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

    // Handle async errors
    process.on('unhandledRejection', (err) => {
      console.error('UNHANDLED REJECTION!');
      console.error(err.name, err.message);

      server.close(() => {
        process.exit(1);
      });
    });

  })
  .catch((err) => {
    console.error('DB CONNECTION FAILED');
    console.error(err);
    process.exit(1);
  });
