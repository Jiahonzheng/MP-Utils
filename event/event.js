/**
 * 事件总线
 * 使用 发布/订阅 模式，实现微信小程序跨页面通信
 */
class Event {
  /**
   * 监听器
   * 参数必需
   * 在 onLoad 阶段调用
   * 监听名称为 event 的事件，添加 listener 作为事件响应
   * @param {String} event - 事件名称
   * @param {Function} listener - 事件响应
   * @param {Object} ctx - 事件触发器的上下文，即Page实例中的 this
   */
  on(event, listener, ctx) {
    if (typeof fn !== 'function') {
      console.error('fn must be a function');
      return;
    }

    this._stores = this._stores || {};
    this._stores[event] = this._stores[event] || [];
    this._stores[event].push({listener, ctx});
  }

  /**
   * 触发器
   * 参数必需
   * 触发名称为 event 的事件
   * @param event {String} 事件名称
   */
  emit(event) {
    this._stores = this._stores || {};

    let store = this._stores[event];

    if (store) {
      // arguments 为 Object ，需转换为 Array
      let args = [].slice.call(arguments, 0);

      // 形成 store 副本
      store = store.slice(0);

      for (let i = 0; i < store.length; i++) {
        store[i].listener.apply(store[i].ctx, args);
      }
    }
  }

  /**
   * 解绑监听器
   * 参数可选
   * 在 onUnload 阶段调用
   * 当无参数时，则清除所有的监听器
   * 当仅有 event 参数时，则清除指定 event 的监听器
   * 当有 event 和 listenr 参数时，则清除指定 event 下的指定事件响应
   * @param event {String} 事件名称
   * @param listener {Function} 事件响应
   */
  off(event, listener) {
    this._stores = this._stores || {};

    // 清除所有的监听器
    if (!arguments.length) {
      this._stores = {};
      return;
    }

    let store = this._stores[event];

    if (!store) {
      return;
    }

    // 清除指定 event 的监听器
    if (arguments.length === 1) {
      delete this._stores[event];
      return;
    }

    for (let i = 0; i < store.length; i++) {
      // 清除指定 event 下的指定事件响应
      if (store[i].listener == listener) {
        store.splice(i, 1);
        break;
      }
    }
  }
}

export default Event;
