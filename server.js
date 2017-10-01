const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const contact = require('./src/contacts');
const app = express();

const port = process.env.PORT || 3608;

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', async (req, res) => {
    let request = await axios.get('http://www.mocky.io/v2/581335f71000004204abaf83');
    res.send(request.data);
});

app.get('/contact/secret/setup', async (req, res) => {
    let request = await axios.get('http://www.mocky.io/v2/581335f71000004204abaf83');
    res.send(request.data);
    request.data.contacts.forEach((body) => {
        contact.saveNew({body});
    });
})

app.get('/contact', (req, res) => contact.getAll(req, res));
app.get('/contact/:id', (req, res) => contact.findById(req, res));
app.delete('/contact/:id', (req, res) => contact.removeById(req, res));
app.put('/contact/:id', (req, res) => contact.updateById(req, res));
app.post('/contact', (req, res) => contact.saveNew(req, res));
app.patch('/contact/:id', (req, res) => contact.updateById(req  , res));

app.listen(port, () => {
    console.log(`running on port ${port}`)
});

// MONGODB_URI='mongodb://contactsuserdefault:superSecretPassword123@ds147534.mlab.com:47534/contacts' nodemon server.js