// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const chalk = require('chalk');
const logger = require('morgan');
const favicon = require('serve-favicon');
const {config} = require('./config');
const api = require('./routes/api');


// Express
const app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

// View engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Access-Control-Allow-Origin
app.use(function (req,res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', "GET,PUT,POST, DELETE");
    res.header('Access-Control-Allow-Headers', "Content-Type");
    next();
});

// Routes
app.use('/api', api);

// Static Folder
app.use(compression());
app.use(express.static(path.join(__dirname, config.statics)));
app.use(favicon(path.join(__dirname, config.statics, 'favicon.ico')));


// Server
app.set('port', config.ip, config.port);
app.listen(config.port, function () {
    console.log(`${chalk.green(`App is running at `)} http://${config.host}:${config.port} ${chalk.green('on')} ${chalk.magenta.bold(`${config.env.toUpperCase()}`)} ${chalk.green('mode.')}`);
});


// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message || 'Server Error');
});

module.exports =  app;
