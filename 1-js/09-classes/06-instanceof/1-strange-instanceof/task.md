importance: 5

---

# Garip instanceof

<<<<<<< HEAD
Aşağıdaki `instanceof` neden `true` dönüyor? Aslında `a`'nın `B()` tarafından üretilmediği açık.
=======
In the code below, why does `instanceof` return `true`? We can easily see that `a` is not created by `B()`.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```

