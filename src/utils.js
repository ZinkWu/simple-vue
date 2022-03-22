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


// 确认是合法索引
function isValidArrayIndex(val) {
  const n = parseFloat(String(val))
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

export { def, isObject, hasOwn, isValidArrayIndex }