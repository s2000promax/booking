const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');
const { get } = require('mongoose');
const initDatabase = require('./startUp/initDatabase');

const routes = require('./routes');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', routes);

const PORT = config.get('port') ?? 8080;
if (process.env.NODE_ENV === 'production') {
  console.log(chalk.bgYellowBright('Production'));
} else {
  console.log(chalk.bgYellowBright('Development'));
}

async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDatabase();
    });
    await mongoose.connect(config.get('mongoUri'));
    console.log(chalk.bgCyanBright(`MongoDB connected`));

    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${PORT}...`))
    });
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
}

start();
