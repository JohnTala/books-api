const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Books API',
    description: 'API documentation for the Books project'
  },
  host: 'books-api-189e.onrender.com', // Your Render URL
  schemes: ['https'],                   // HTTPS for Render
  consumes: ['application/json'],
  produces: ['application/json']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/bookRoutes.js', './routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log('Swagger documentation generated successfully!');
  });
