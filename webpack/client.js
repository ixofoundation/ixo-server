var make = require('./make');

module.exports = make({
  entry: {
    public_site: './src/client/public_site.tsx'
  },
  target: 'web'
});
