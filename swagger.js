const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API documentation for the Contacts project'
  },
  host: 'cse341-project1-1-4omy.onrender.com', // Your Render URL
  schemes: ['https'],                             // HTTPS for Render
  consumes: ['application/json'],
  produces: ['application/json']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/contacts.js', './routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log('Swagger documentation generated successfully!');
  });
