// Function to check if a value is an object and not null
const isObject = (d) => typeof d === 'object' && d !== null;

// Function to flatten an object and rename its properties
function flatten(obj, ...props) {
  // If the provided object is not an object or is null, return it as is
  if (!isObject(obj)) return obj;

  // Get the properties of the object that are not private (start with '_')
  const objProps = Object.keys(obj)
    .filter((k) => !k.startsWith('_'))
    .map((k) => ({ [k]: true }));

  // Merge the object properties with the provided properties
  props = objProps.length
    ? Object.assign(...objProps, ...props)
    : Object.assign({}, ...props);

  // Create an empty object to store the flattened object
  const out = {};

  // Loop through each property and its new name
  for (let [prop, newProp] of Object.entries(props)) {
    // If the new name is false, skip this property
    if (!newProp) continue;
    // If the new name is true, use the original property name as the new name
    newProp = newProp === true ? prop : newProp;

    // Get the value of the property and check if it is an object with a valueOf function
    const element = obj[prop];
    const elemIsObj = isObject(element);
    const valueOf =
      elemIsObj && typeof element.valueOf === 'function'
        ? element.valueOf()
        : null;
    // Check if the object has a toJSON function
    const hasToJSON = elemIsObj && typeof element.toJSON === 'function';

    // If the property is an array, map each element to its JSON representation or flatten it
    if (Array.isArray(element))
      out[newProp] = element.map((e) => e.toJSON?.() ?? flatten(e));
    // If the value of the property is not an object, use it as is
    else if (typeof valueOf !== 'object') out[newProp] = valueOf;
    // If the object has a toJSON function, use it to get the JSON representation of the object
    else if (hasToJSON) out[newProp] = element.toJSON();
    // If the property is an object, flatten it
    else if (typeof element === 'object') out[newProp] = flatten(element);
    // If the property is not an object, use it as is
    else if (!elemIsObj) out[newProp] = element;
  }

  // Return the flattened object
  return out;
}

// Exporting the flatten function
module.exports = {
  flatten,
};
