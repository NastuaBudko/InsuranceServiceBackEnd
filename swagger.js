import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Insurance Service API',
    description: 'API documentation for the Insurance Service',
  },
  host: 'localhost:5555',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);
