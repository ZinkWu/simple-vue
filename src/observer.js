import { arrayMethods } from "./array"
import { defineReactive } from "./defineReactive"
import { Dep } from "./dep"
import { def, hasOwn, isObject } from "./utils"

const hasProto = '__proto__' in {}
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

export class Observer {
  constructor(value) {
    this.value = value
    this.dep = new Dep()
    def(value, '__ob__', this)

    if (Array.isArray(value)) {
      const augment = hasProto
        ? protoAugment
        : copyAugment
      augment(value, arrayMethods, arrayKeys)
      this.observeArray(value) //对数组中的元素进行响应式侦测
    } else {
      this.walk(value)
    }
  }

  observeArray(items) {
    for (let i = 0; i < items.length; i++) {
      observe(items[i])
    }
  }

  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }
}

/**
 * 尝试为 value 创建一个 Observer
 * 如果 value 已有 Observe 则说明该对象已经是响应式数据，直接 return 该 Observer 实例
 * 如果不是则为它创建 Observe 并返回新的 Observer 实例
 */
export function observe(value) {
  if (!isObject(value)) return

  let ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }

  return ob
}

function protoAugment(target, src) {
  target.__proto__ = src
}

function copyAugment(target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}