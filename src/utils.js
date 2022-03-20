function def(obj, key, value, enumerable) {
  Object.defineProperty(obj, key, {
    value,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

function isObject(value) {
  return value !== null && value instanceof Object
}

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}


export { def, isObject, hasOwn }