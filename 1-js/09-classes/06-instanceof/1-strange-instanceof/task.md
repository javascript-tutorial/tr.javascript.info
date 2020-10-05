importance: 5

---

# Garip instanceof

<<<<<<< HEAD
Aşağıdaki `instanceof` neden `true` dönüyor? Aslında `a`'nın `B()` tarafından üretilmediği açık.
=======
In the code below, why does `instanceof` return `true`? We can easily see that `a` is not created by `B()`.
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```

