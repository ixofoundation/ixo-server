var make = require('./make');

module.exports = make({
  entry: {
    server: './src/server.tsx',
  },
  target: 'node'
});
