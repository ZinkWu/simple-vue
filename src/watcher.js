export class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
    }
    this.cb = cb
    this.value = this.get()
  }

  get() {
    window.target = this
    let value = this.getter.call(this.vm, this.vm)
    window.target = undefined
    return value
  }

  update() {
    const oldValue = this.value
    this.value = this.get()
    this.cb.call(this.vm, this.value, oldValue)
  }
}

//解析路径，循环路径然后一层一层的去读数据，最后得到目标值，同时触发属性的 getter
const bailRE = /[^w.$]/
function parsePath(path) {
  if (bailRE.text(path)) return

  const segments = path.split(".")
  return obj => {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj.segments[i]
    }
    return obj
  }
}