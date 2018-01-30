const mongoose = require('mongoose');
const chalk = require('chalk');
const {config} = require('./index');

mongoose.connect(config.db);

mongoose.connection.on('connected', () => {
    console.log(chalk.blue.bold(`MongoDB connected to ${config.db}`));
});

mongoose.connection.on('error', () => {
    console.error(chalk.red.bold(`ERROR: Failed to connect to MongoDB!`));
});

mongoose.Promise = global.Promise;

module.exports = mongoose;