const express = require('express');
const bodyParser = require('body-parser');
const courierRoutes = require('./routes/courierRoutes');
const barcodeRoutes = require('./routes/barcodeRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Courier and Barcode API',
      version: '1.0.0',
      description: 'A minimal API for barcodes and couriers',
    },
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/couriers', courierRoutes);
app.use('/barcodes', barcodeRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
