importance: 3

---

# "this" in değerini açıklayın

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/3-why-this/task.md
Aşağıdaki amaç `obj.selamVer()` in 4 defa çağırılmasıdır.
=======
In the code below we intend to call `obj.go()` method 4 times in a row.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/99-js-misc/04-reference-type/3-why-this/task.md

Fakat `(1)` ve `(2)` , `(3)` ve `(4)` ten farklı çalışmaktadır. Neden?

```js run no-beautify
let obj, metod;

obj = {
  selamVer: function() { alert(this); }
};

obj.selamVer();               // (1) [object Object]

(obj.selamVer)();             // (2) [object Object]

(metod = obj.selamVer)();    // (3) undefined

(obj.selamVer || obj.yolcuEt)(); // (4) undefined
```
