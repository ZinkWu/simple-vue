import { Watcher } from "./watcher";

function $watch(expOrFn, cb, options) {
  const vm = this
  options = options || {}
  const watcher = new Watcher(vm, expOrFn, cb, options)
  if (options.immediate) {
    cb.call(vm, watcher.value)
  }
  return function unWatchFn() {
    watcher.teardown()
  }
}