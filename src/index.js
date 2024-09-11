// Importing the version number from the package.json file
const { version } = require('../package.json');

// Importing the main DiscordFivemApi class
const DiscordFivemApi = require('./DiscordFivemApi');

// Importing the Player and Server classes from the structures directory
const { Player, Server } = require('./structures/index');

/**
 * Exports the version number, main API class, and structure classes.
 *
 * - `version`: The current version of the package.
 * - `DiscordFivemApi`: The primary API interface for interacting with FiveM servers.
 * - `Player`: Class representing player data in the server.
 * - `Server`: Class representing server data.
 */
module.exports = {
  version,
  DiscordFivemApi,
  Player,
  Server,
};
