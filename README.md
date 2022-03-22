对于 Vue2.x 核心功能的简单实现

目前进度:
- [x] 数据侦测
- [ ] Virtual DOM
- [ ] DOM DIFF
- [ ] 模板编译
- [ ] 生命周期
- [ ] 指令


### 总结

#### 数据响应式
数据响应式的核心是`Object.defineProperty`，响应式系统涵盖三部分：
- Observer
  - 将数据转变为响应式
- Dep
  - 收集依赖，类似 EventHub
- Watcher
  - 对依赖层的抽象，如**模板**、`watch`对数据的依赖

对于数组的响应式，其核心依旧依靠的是`Object.defineProperty`，不过实现不相同，因为数组的变动是无法触发`Object.defineProperty`的`setter`，需要将改变数组本身的 7 个方法拦截，在其中向依赖发送消息。

Observer 会为每个引用类型的属性标记上`__ob__`，并把`this`保存在其中，它的作用主要是：
- 标记数据是否是响应式，且保证同一个数据不会被重复侦测
- 通过`this.__ob__.dep`获取依赖，数组需要依靠它向依赖发送通知

因为`Object.defineProperty`自身限制，无法对`arr[0] = 1`这类变动做出响应