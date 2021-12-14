const router = require('express').Router();
const connection = require('../connection');
const nodemailer = require("nodemailer");

/**
 * @swagger
 * components:
 *   schemas:
 *     interns:
 *       type: object
 *       required: 
 *                 -nom
 *                 -prenom
 *                 -email
 *       properties:
 *          id:
 *             type: integer
 *             description: auto-gnerated identificator of the intern
 *          nom:
 *             type: string
 *             description: the intern's family name     
 *          prenom:
 *             type: string
 *             description: the intern's name              
 *          email:
 *             type: string
 *             description: the intern's email           
 */


/**
 * @swagger
 * /interns/add:
 *  post:
 *     summary: creates a new intern
 *     requestBody:
 *      required: true 
 *      content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/interns'
 *     responses:
 *      200:
 *       description: The intern was succesfully added
 *       content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/interns'
 *       500:
 *        description: some server error
 */

router.post('/add', (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const query = `INSERT INTO intern (nom, prenom, email) VALUES (?,?,?)`;
    connection.query(query, [nom, prenom, email], function (error, results, fields) {
        if (error) throw error;
        else {
            res.status('200').send('interne ajouté.');
        }
    });
});

/** 
 * @swagger
 * /interns:
 *     get:
 *        summary: returns the list of all interns
 *        responses: 
 *          200:
 *            decription: the list of the interns
 *            content: 
 *                  application/json:
 *                    schema:
 *                      type: array
 *                      items: '$ref/components/schemas/interns'
 */


router.get('/', (req, res) => {
    connection.query('SELECT * from intern', function (error, results, fields) {
        if (error) throw error;
        else res.send(results)
    });
});

/** 
 * @swagger
 * /interns/{id}:
 *     get:
 *        summary: returns the intern by its id 
 *        parameters:
 *          - in: path
 *            name: id 
 *            schema:
 *              type: integer
 *            required: true
 *            description: the intern's id
 *        responses:
 *           200:
 *            description: the intern's info by id
 *            content:
 *              application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/interns'
 *           404: 
 *              description: the intern was not found
 */


router.get('/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * from intern where id=?', id, function (error, results, fields) {
        if (!id) res.sendStatus(404);
        else res.send(results[0])
    });
});


router.post('/mail',(req, res) => {
    console.log(req.body)
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'sarrarefaismile@gmail.com',
            pass: 'FreshStart', 
        },
    });
    let Body = "<html>";
    Body += "<div style='background: rgb(204,204,204); padding:20px'>";
    Body += "<div style='box-shadow: 0 0 0.5cm rgba(0,0,0,0.5); width:500px;margin:auto ; padding :30px; background:white'>"; 
      Body+=  "<h3>Bonjour <span style='text-transform: capitalize;'>"+ req.body.candidat.nom+' ' + "</span></h3>  <p>Nous voulons vous informer que vous avez été <span style='text-transform: capitalize;'>"+ req.body.statut+' ' + " pour le sujet <span style='text-transform: capitalize;'>"+ req.body.stage.title+' ' + " </p>" ;
      Body+=   "<p> Nous sommes disponible pour répondre à toutes vos questions  </p>";
   Body += "<p>Bonne journée</p>  </div></div>";
   Body += "</html>";
    const msg = {
        headers: {
            "x-priority": "1",
            "x-msmail-priority": "High",
            importance: "high"
         },
        from: 'sarrarefaismile@gmail.com', 
        to: req.body.candidat.email,
        subject: "Réponse", 
        html : Body
    }

    //send mail with defined transport object
    const info = transporter.sendMail(msg);
    console.log("Message sent: %s", info);

});

module.exports = router