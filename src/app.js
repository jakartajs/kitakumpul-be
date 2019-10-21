const express = require('express');
const bodyParser = require('body-parser');
const comporession = require('compression');
const  helmet = require('helmet');
const enrouten = require('express-enrouten');
const path = require('path');
const cors = require('cors');
const app = express();


app.use(cors());
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(comporession());

app.get('/', (req, res)=>{
    res.status(200);
    res.json({
       message: 'service kita kumpul',
    });
    res.end();
});

app.use('/api',enrouten({
    directory: path.join(__dirname, 'controllers'),
}));

app.use('/docs', enrouten({
    directory: path.join(__dirname, 'docs')
}));

module.exports = app;