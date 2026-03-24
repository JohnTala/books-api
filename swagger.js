const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Books API',
    description: 'API documentation for the Books project',
  },
  host: process.env.RENDER
    ? 'books-api-189e.onrender.com'
    : 'localhost:5000',
  schemes: process.env.RENDER ? ['https'] : ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  components: {
    schemas: {
      Book: {
        type: 'object',
        properties: {
          title: { type: 'string', example: 'To Kill a Mockingbird' },
          author: { type: 'string', example: 'Harper Lee' },
          genre: { type: 'string', example: 'Fiction' },
          publishedYear: { type: 'integer', example: 1960 },
          pages: { type: 'integer', example: 281 },
          rating: { type: 'number', format: 'float', example: 4.8 }
        },
        required: ['title', 'author', 'genre', 'publishedYear', 'rating']
      }
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/bookRoutes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});
