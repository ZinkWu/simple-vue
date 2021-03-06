import { Dep } from "./dep"
import { observe } from "./observer"

// 将对象的属性转为响应式
export function defineReactive(data, key, val) {
  //获取数组的 ob
  const childOb = observe(val)
  const dep = new Dep()

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend()
      //为数组收集依赖
      if (childOb) {
        childOb.dep.depend()
      }
      return val
    },
    set(newVal) {
      if (val === newVal) return

      val = newVal
      dep.notify()
    }
  })
}
