'use strict';
const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  }
});

server.connection({
  host: 'localhost',
  port: 8888
});

server.register(Inert, () => {});

server.route({
  method: 'GET',
  path: '/ping',
  handler: function (request, reply) {
    reply('pong');
  }
});


server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});