const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Khang API',
    description: 'Description',
  },
  host: 'https://assignment4-api.herokuapp.com/',
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];
swaggerAutogen(outputFile, endpointsFiles, doc);