import { hasOwn, isValidArrayIndex } from "./utils"

function $delete(target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1)
    return
  }

  //TODO: 判断 target 是否是 Vue 实例或者 Vue 实例的根数据对象
  const ob = target.__ob__
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key]
  if (ob) {
    ob.dep.notify()
  }
}