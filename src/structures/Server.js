'use strict';

// Defining a class for server data with private data
class ServerData {
  #data;

  // Constructor that sets the private data and defines properties for each key in the data object
  constructor(data) {
    this.#data = data;
    for (const key in this.#data) {
      Object.defineProperty(this, `${key}`, {
        writable: false,
        enumerable: true,
        value: data[key],
      });
    }
  }
}

// Exporting the ServerData class
module.exports = ServerData;
