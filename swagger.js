const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Books API',
    description: 'API documentation for the Books project',
    version: '1.0.0'
  },
  host: 'localhost:5000',
  basePath: '/',
  schemes: ['http']
};

// Include all route files
const endpointsFiles = [
  './routes/index.js',
  './routes/bookRoutes.js'
];

const outputFile = './swagger.json';

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated!');
});
