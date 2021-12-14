const express = require('express')
const app = express()
require("dotenv").config()
const connection = require('./connection');
const cors = require('cors');
const port = 3000;
const swaggerJsDoc=require('swagger-jsdoc');
const swaggerUI=require('swagger-ui-express');
const YAML = require('yaml');

const options= {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Interns",
            description: "the services that concerns the interns"
        }
    },
    apis: ["routes/interns.js"]
}

const specs = swaggerJsDoc(options)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

app.use(express.json());
app.use(cors());


connection.connect((err) => {
    if (err) throw err;
    else console.log('Connected to Database...')
}); 

app.listen(port,() => {
    console.log(`app listenning at http://localhost:${port}`)
}
) 

const internsRouter = require('./routes/interns');
app.use('/interns', internsRouter);

