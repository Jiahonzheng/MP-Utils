/**
 * 函数节流
 * @param {Function} fn - 节流的对象
 * @param {Integer} gapTime - 节流时间，默认为 1500ms
 */
function throttle(fn, gapTime = 1500) {
  let lastTime = null;

  return function() {
    let nowTime = new Date();

    if (nowTime - lastTime > gapTime || !lastTime) {
      // 通过 apply 改变函数内部 this 指向
      fn.apply(this, arguments);
      lastTime = nowTime;
    }
  };
}

export default throttle;
