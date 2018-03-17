# Event

> 微信小程序事件总线

## 使用方法

App 是小程序的实例，在每个 Page 里都能通过执行 getApp 函数获取到它。我们可以把 Event 类的实例挂载在 App 中，方便每个 Page 去调用。

```JavaScript
/**
 * app.js
 * 注册事件总线
 */
import Event from "./libs/event"

App({
    event: new Event()
})
```

在 a.js 页面的 onLoad 钩子函数注册订阅事件，同时在 onUnload 钩子函数注销事件。

```JavaScript
/**
 * a.js
 * 注册监听器
 */
const app = getApp()

Page({
    // 在 onLoad 注册 done 事件，添加 doneCallabck 作为事件响应
    onLoad: function() {
        app.event.on("done", this.doneCallback, this)
    },

    // 事件响应 doneCallback
    doneCallback: function() {
        console.log("Execute done callback")
    },

    // 在 onUnload 注销 done 事件的 doneCallback
    onUnload: function() {
        app.event.off("done", this.doneCallback)
    }
})
```

在 b.js 页面，触发 done 事件。

```JavaScript
/**
 * b.js
 * 调用触发器
 */
const app = getApp()

Page({
    // 触发 done 事件
    worker: function() {
        app.event.emit("done")
    }
})
```

## 注意

务必在 onUnload 阶段，注销监听。因为 Event 持有了 Page 的 this ，所以一定要在 Page 的 onUnload 函数中注销监听，防止内存泄漏。
