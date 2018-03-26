# Throttle

> 微信小程序函数节流

## 使用方法
```html
<!-->/pages/a/a.wxml<-->
<button bindtap="onPressed" data-key="keyOfTestButton">Test</button>
```

```JavaScript
// /pages/a/a.js
import throttle from "../../libs/throttle";

Page({
    onPressed: throttle(function(event) {
        console.log(this); // 输出当前实例
        console.log(event); // 输出组件相关属性
    }, 1000)
});
```
