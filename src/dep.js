export class Dep {
  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  removeSub(sub) {
    remove(this.subs, sub)
  }

  depend() {
    if (window.target) {
      this.addSub(window.target)
    }
  }

  notify() {
    const subs = this.subs.slice()
    subs.forEach(sub => sub.update())
  }
}


function remove(arr, item) {
  if (!arr.length) return
  const index = arr.indexOf(item)
  if (index === -1) return
  arr.slice(index, 1)
}