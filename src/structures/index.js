'use strict'; // Enforcing strict mode for better error checking and security

// Import the Player and Server classes from their respective files
const Player = require('./Player');
const Server = require('./Server');

// Export the Player and Server classes to make them accessible when this module is required
module.exports = {
  Player,
  Server,
};
