require('dotenv').config()
const express 		= require('express');
const routerBook 	= require('./routerBook');
const bodyParser 	= require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/book', routerBook);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err);
})

app.listen(8000, () => {
    console.log('server at port 8000');
});
