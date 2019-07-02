importance: 5

---

# Garip instanceof

Aşağıdaki `instanceof` neden `true` dönüyor? Aslında `a`'nın `B()` tarafından üretilmediği açık.

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```

