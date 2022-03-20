const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);

[
  'push',
  'pop',
  'shift',
  'unshift',
  'sort',
  'reverse',
  'splice'
].forEach(m => {
  const original = arrayProto[m]
  Object.defineProperty(arrayMethods, m, {
    enumerable: false,
    configurable: true,
    value: function (...args) {
      const ob = this.__ob__
      const result = original.apply(this, args)
      //将新增元素转为响应式
      let inserted
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args
          break
        case 'splice':
          inserted = args.slice(2)
          break
      }
      if (inserted) ob.observeArray(inserted)
      ob.dep.notify()
      return result
    }
  })
})

export { arrayMethods }