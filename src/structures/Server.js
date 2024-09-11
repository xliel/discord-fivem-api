'use strict'; // Enforcing strict mode for better error handling and security

/**
 * Class representing server data with encapsulated properties.
 */
class ServerData {
  #data; // Private field to store server data

  /**
   * Constructs a new ServerData instance.
   *
   * @param {Object} data - The raw server data object.
   */
  constructor(data) {
    this.#data = data;

    // Define read-only properties for each key in the server data object
    for (const key in this.#data) {
      Object.defineProperty(this, key, {
        writable: false, // Ensure the property is read-only
        enumerable: true, // Ensure the property is included in loops (e.g., for...in, Object.keys)
        value: data[key], // Set the value of the property from the data object
      });
    }
  }
}

// Export the ServerData class to make it available for external modules
module.exports = ServerData;
