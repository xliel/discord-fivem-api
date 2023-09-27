// Creating a Symbol to store the error code
const kCode = Symbol('code');

// Function to create a custom error message class
function createErrorMessage(ErrorBase = global.Error) {
  // Creating a new class that extends the ErrorBase class
  class DiscordFivemApiError extends ErrorBase {
    constructor(key, ...args) {
      // Calling the parent constructor with the provided arguments
      super(...args);
      // Setting the error code to the provided key
      this[kCode] = key;

      // Capturing the stack trace if available
      if (Error.captureStackTrace)
        Error.captureStackTrace(this, DiscordFivemApiError);
    }

    // Overriding the name getter to include the error code
    get name() {
      return `[DiscordFivemApi] ${super.name} [${this[kCode]}]`;
    }

    // Getter for the error code
    get code() {
      return this[kCode];
    }

    // Overriding the toString method to include the error code
    toString() {
      return `[DiscordFivemApi] ${super.toString()} [${this[kCode]}]`;
    }
  }

  // Returning the custom error message class
  return DiscordFivemApiError;
}

// Exporting the createErrorMessage function and creating instances of the custom error message class for Error and TypeError
module.exports = {
  createErrorMessage,
  Error: createErrorMessage(Error),
  TypeError: createErrorMessage(TypeError),
};
