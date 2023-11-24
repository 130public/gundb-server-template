import express, { Request, Response } from 'express';

const env = require("dotenv").config();
const port = process.env.PORT || 8080;
const path = __dirname;

var app = express();
var Gun = require('gun');
const router = express.Router();


router.use((request: Request, response: Response, next) => {
    console.log('/' + request.method);
    next();
});
router.get('/', (request: Request, response: Response) => {
    response.sendFile(path + 'index.html');
});


app.use(Gun.serve);
app.use(express.static(path));
app.use('/', router);

var server = app.listen(port);
var gun = Gun({	file: 'data', web: server });

console.log('Server started on port ' + port + ' with /gun');