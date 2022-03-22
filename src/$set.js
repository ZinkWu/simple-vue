import { defineReactive } from "./defineReactive"
import { isValidArrayIndex } from "./utils"

function $set(target, key, value) {
  // 如果 target 是数组，就使用 splice 修改元素，因为 splice 已经被重写， 所以会触发依赖更新
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, value)
    return value
  }

  // 如果 key 已经存在于 target 中
  if(key in target && !(key in Object.prototype)){
    target[key] = value
    return value
  }

  const ob = target.__ob__
  //TODO: 判断该对象是不是 Vue 实例或者 Vue 实例的跟数据对象（即 this.$data
  // 如果 ob 不存在，说明该对象不是响应式，不需要做其他操作
  if(!ob){
    target[key] = value
    return value
  }

  // ob 存在的话，就将该属性改为响应式，并触发一次该对象依赖的更新
  defineReactive(ob.value, key, value)
  ob.dep.notify()
  return value
}

