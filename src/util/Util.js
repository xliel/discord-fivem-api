// Utility function to check if a value is an object and not null
const isObject = (d) => typeof d === 'object' && d !== null;

/**
 * Flattens an object and optionally renames its properties.
 *
 * @param {Object} obj - The object to be flattened.
 * @param {...Object} props - Optional property mappings to rename keys in the flattened object.
 * @returns {Object} - A new object with flattened properties.
 */
function flatten(obj, ...props) {
  // If the input is not a valid object, return the value unchanged.
  if (!isObject(obj)) return obj;

  // Extract object keys that do not start with an underscore (i.e., not private)
  const objProps = Object.keys(obj)
    .filter((k) => !k.startsWith('_')) // Ignore private fields starting with '_'
    .map((k) => ({ [k]: true })); // Prepare the property to retain its key

  // Merge object properties with any additional property mappings passed in.
  props = objProps.length
    ? Object.assign(...objProps, ...props)
    : Object.assign({}, ...props); // Ensure an empty object if no props provided

  // Output object for storing flattened key-value pairs.
  const out = {};

  // Iterate over the properties and apply renaming/flattening logic.
  for (let [prop, newProp] of Object.entries(props)) {
    // If the new property mapping is set to false, skip this property.
    if (!newProp) continue;

    // If the new property mapping is true, retain the original property name.
    newProp = newProp === true ? prop : newProp;

    // Get the value of the current property and check if it's an object.
    const element = obj[prop];
    const elemIsObj = isObject(element);

    // If the element has a valueOf method, retrieve its primitive value.
    const valueOf =
      elemIsObj && typeof element.valueOf === 'function'
        ? element.valueOf()
        : null;

    // Check if the element has a toJSON method.
    const hasToJSON = elemIsObj && typeof element.toJSON === 'function';

    // Handle arrays: flatten or serialize each element.
    if (Array.isArray(element))
      out[newProp] = element.map((e) => e.toJSON?.() ?? flatten(e));
    // If the valueOf method returns a non-object, use that value directly.
    else if (typeof valueOf !== 'object') out[newProp] = valueOf;
    // If the element has a toJSON method, use its JSON representation.
    else if (hasToJSON) out[newProp] = element.toJSON();
    // If the element is a nested object, recursively flatten it.
    else if (typeof element === 'object') out[newProp] = flatten(element);
    // If the element is neither an object nor requires special handling, copy it directly.
    else if (!elemIsObj) out[newProp] = element;
  }

  // Return the fully flattened object.
  return out;
}

/**
 * Wraps a promise with a timeout. If the promise doesn't resolve within the specified time,
 * it will reject with a 'TIMEOUT' error.
 *
 * @param {Promise} promise - The promise to wait for.
 * @param {number} ms - The timeout duration in milliseconds.
 * @returns {Promise} - A promise that resolves or rejects depending on the timeout.
 */
async function timeoutPromise(promise, ms) {
  return await Promise.race([
    promise, // The original promise
    new Promise(
      (_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), ms) // Timeout error
    ),
  ]);
}

// Export the functions for external use
module.exports = {
  flatten,
  timeoutPromise,
};
