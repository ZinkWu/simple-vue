import { isObject } from "./utils"

export class Watcher {
  constructor(vm, expOrFn, cb, options) {
    if(options){
      this.deep = !!options.deep
    }else{
      this.deep = false
    }

    this.deps = []
    this.depIds = new Set()

    this.vm = vm
    if (typeof expOrFn === 'function') {
      // when expOrFn is a function, may have more than one dep
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
    if(this.deep){
      traverse(value)
    }
    window.target = undefined
    return value
  }

  update() {
    const oldValue = this.value
    this.value = this.get()
    this.cb.call(this.vm, this.value, oldValue)
  }

  // 记录自己订阅了哪些 Dep
  addDep(dep){
    const id = dep.id
    if(!this.depIds.has(id)){
      this.depIds.add(id)
      this.deps.push(dep)
      dep.addSub(this)
    }
  }

  // 取消 watch, vm.$watch 返回一个取消 watch 的函数，就是这个函数
  teardown(){
    let i = this.deps.length
    while(i--){
      this.deps[i].removeSub(this)
    }
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

const seenObjects = new Set()

function traverse(val){
  _traverse(val, seenObjects)
  seenObjects.clear()
}



function _traverse(val, set){
  const isArray = Array.isArray(val)
  if((!isArray && !isObject(val)) || Object.isFrozen(val)) return

  if(val.__ob__){
    const depId = val.__ob__.dep.id
    set.add(depId)
  }

  if(isArray){
    let i = val.length
    // 数组内部的元素可能是对象，想要 deep watch 数组中的对象需要该实现
    while(i--) _traverse(val[i], set)
  }else{
    const keys = Object.keys(val)
    let i = keys.length
    // 这里会触发 getter，且 window.target 还未被清空，所以该属性的dep也会收集到该 Watcher 实例
    while(i--) _traverse(val[keys[i]], set)
  }
}