import http from 'http';
import httpContext from 'express-http-context';
import express, { Application } from 'express';
import events from './events';
import { token2Context, expressLogger } from '../lib';

import config from '../config';
//Include middlewares.

// Swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
// Define routes and events
const routes = require('./routes');

const {
  server: { port },
  sqlDb,
} = config;

// Start Express-js.
const app: Application = express();
const server = http.createServer(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware token verified
app.use(httpContext.middleware);

app.use(token2Context);
app.use(expressLogger);

app.use('/', routes);

// Start listen mode.
app.listen(port, async () => {
  events.onListen(port);

  //here we can activate connection to DB example below
  //await db.connect(sqlDb);
});

// Define server "special" event to handle situations.
server.on('error', events.onServerError);
process.on('SIGINT', () => events.onProcessKill(server));
process.on('SIGTERM', () => events.onProcessKill(server));
process.on('unhandledRejection', events.onException);
process.on('uncaughtException', (err) => events.onException(err));
