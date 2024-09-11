// Symbol used to store the error code, keeping it private to avoid property collisions
const kCode = Symbol('code');

/**
 * Creates a custom error class that extends a base error class (Error or TypeError).
 *
 * @param {Error} [ErrorBase=global.Error] - The base error class to extend (default is the built-in Error).
 * @returns {class} - A custom error class with enhanced functionality.
 */
function createErrorMessage(ErrorBase = global.Error) {
  // Define a new error class extending the provided base error class
  class DiscordFivemApiError extends ErrorBase {
    /**
     * Constructs a new DiscordFivemApiError instance.
     *
     * @param {string} key - A custom error code or identifier.
     * @param {...any} args - Additional arguments passed to the base error class.
     */
    constructor(key, ...args) {
      // Call the parent Error constructor with provided arguments
      super(...args);

      // Assign the custom error code (key) to the private symbol
      this[kCode] = key;

      // Capture the stack trace for debugging, if the environment supports it
      if (Error.captureStackTrace)
        Error.captureStackTrace(this, DiscordFivemApiError);
    }

    /**
     * Getter for the error name, including the custom error code.
     * @returns {string} - The formatted error name with the error code.
     */
    get name() {
      return `[DiscordFivemApi] ${super.name} [${this[kCode]}]`;
    }

    /**
     * Getter for the error code.
     * @returns {string} - The error code assigned to the instance.
     */
    get code() {
      return this[kCode];
    }

    /**
     * Overrides the default toString method to include the error code.
     * @returns {string} - The string representation of the error with the custom code.
     */
    toString() {
      return `[DiscordFivemApi] ${super.toString()} [${this[kCode]}]`;
    }
  }

  // Return the custom error class
  return DiscordFivemApiError;
}

// Export the createErrorMessage function, along with pre-defined instances for Error and TypeError
module.exports = {
  createErrorMessage,
  Error: createErrorMessage(Error), // Custom Error class
  TypeError: createErrorMessage(TypeError), // Custom TypeError class
};
