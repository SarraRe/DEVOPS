const express = require('express')
const app = express()
//const swaggerUi = require('swagger-ui-express')
//const swaggerFile = require('./swagger_output.json')
const connection = require('./connection');
const cors = require('cors');
const port = 3000

/*const expressOasGenerator = require('express-oas-generator');
expressOasGenerator.init(app, {});*/

app.use(express.json());
app.use(cors());

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

 connection.connect((err) => {
    if (err) throw err;
    else console.log('Connected to Database...')
}); 

app.listen(port,() => {
    console.log(`app listenning at http://localhost:${port}`)
}
) 

const internsRouter = require('./interns');
app.use('/interns', internsRouter);

/*const swaggerRouter = require('./swagger');
app.use('/swagger', swaggerRouter);*/