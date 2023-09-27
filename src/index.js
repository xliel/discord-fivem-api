// Importing the version number from package.json
const { version } = require('../package.json');

// Importing the DiscordFivemApi class from the src/DiscordFivemApi.js file
const DiscordFivemApi = require('./DiscordFivemApi');

// Importing the Player and Server classes from the src/structures/index.js file
const { Player, Server } = require('./structures/index');

// Exporting the version number, DiscordFivemApi class, Player class, and Server class
module.exports = {
  version,
  DiscordFivemApi,
  Player,
  Server,
};
