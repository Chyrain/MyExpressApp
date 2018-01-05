const { Client } = require('pg');

async function dbOpen(options, result) {
  var conString = `postgres://${options.user}:${options.password}@${options.host}/database`;
  const client = new Client();

  await client.connect(function(err, client, done) {
    result && result(err, client, done);
    if (err) {
      return console.error('error fetching client from pool', err);
    }
  });
  return client;
}

module.exports = dbOpen;