

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

// kontrol et
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // 1 sn sonra 3 görünür
```
