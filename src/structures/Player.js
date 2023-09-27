'use strict';

// Importing the flatten function from the Util.js file
const { flatten } = require('../util/Util');

// Defining a class for a player with private data
class Player {
  #data;

  // Constructor that sets the private data and defines properties for each key in the data object
  constructor(data) {
    this.#data = data;

    // Loop through each key in the data object
    for (const key in this.#data) {
      // If the key is 'identifiers', create a new object with the identifiers split into key-value pairs
      if (key === 'identifiers') {
        let playerIdentifiers = {};
        for (const identifier of this.#data[key]) {
          if (!identifier.includes(':')) continue;
          playerIdentifiers[identifier.split(':')[0]] =
            identifier.split(':')[1];
        }
        // Set the 'identifiers' key to the new object
        this.#data[key] = playerIdentifiers;
      }

      // Define a new property for the key with the value from the data object
      Object.defineProperty(this, `${key}`, {
        writable: false,
        enumerable: true,
        value: data[key],
      });
    }
  }

  // Method to get the player's name or 'Unknown' if it is not available
  toString() {
    return this.#data?.name ?? 'Unknown';
  }

  // Method to get a flattened JSON representation of the player object with the provided properties
  toJSON(...props) {
    return flatten(this, ...props);
  }
}

// Exporting the Player class
module.exports = Player;