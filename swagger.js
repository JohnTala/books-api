const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Books API',
    description: 'API documentation for the Books project'
  },
  host: process.env.SWAGGER_HOST || `localhost:${process.env.PORT || 4000}`, 
  schemes: process.env.SWAGGER_HOST ? ['https'] : ['http'], 
  consumes: ['application/json'],
  produces: ['application/json']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/bookRoutes.js', './routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log('Swagger documentation generated successfully!');
  });
