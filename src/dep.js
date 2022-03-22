const uid = 0;

export class Dep {
  constructor() {
    this.id = uid++
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
      window.target.addDep(this)
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