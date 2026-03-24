const swaggerAutogen = require('swagger-autogen')();

// ✅ Swagger configuration
const doc = {
  info: {
    title: 'Books API',
    description: 'API documentation for the Books project',
    version: '1.0.0'
  },
  // ✅ Remove hardcoded host; Render will serve on its own domain
  // host: 'localhost:5000',
  basePath: '/',
  schemes: ['https', 'http']
};

// ✅ Route files to include
const endpointsFiles = [
  './routes/index.js',
  './routes/bookRoutes.js'
];

// ✅ Output file
const outputFile = './swagger.json';

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log('Swagger documentation generated!');
  });
