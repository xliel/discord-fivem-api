'use strict'; // Enforcing strict mode for better error handling and security

// Import the flatten function from the Util.js file
const { flatten } = require('../util/Util');

/**
 * Represents a player with structured data and utility methods.
 */
class Player {
  #data; // Private field to store the player's data

  /**
   * Constructs a new Player instance.
   *
   * @param {Object} data - The raw player data object.
   */
  constructor(data) {
    this.#data = data;

    // Iterate over each key in the player data object
    for (const key in this.#data) {
      // Special handling for the 'identifiers' key to split it into key-value pairs
      if (key === 'identifiers') {
        let playerIdentifiers = {};
        for (const identifier of this.#data[key]) {
          if (!identifier.includes(':')) continue; // Skip invalid identifiers
          const [idType, idValue] = identifier.split(':');
          playerIdentifiers[idType] = idValue; // Store identifier in key-value format
        }
        this.#data[key] = playerIdentifiers; // Replace original identifiers array with parsed object
      }

      // Define a read-only property for each key in the player data object
      Object.defineProperty(this, key, {
        writable: false,
        enumerable: true,
        value: data[key],
      });
    }
  }

  /**
   * Returns the player's name, or 'Unknown' if no name is available.
   *
   * @returns {string} - The player's name or 'Unknown'.
   */
  toString() {
    return this.#data?.name ?? 'Unknown';
  }

  /**
   * Returns a flattened JSON representation of the player object.
   *
   * @param {...any} props - Additional properties to include in the flattened output.
   * @returns {Object} - The flattened player data object.
   */
  toJSON(...props) {
    return flatten(this, ...props);
  }
}

// Export the Player class to make it available for external modules
module.exports = Player;
