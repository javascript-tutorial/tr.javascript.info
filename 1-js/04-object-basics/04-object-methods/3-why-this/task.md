importance: 3

---

# "this" in değerini açıklayın

<<<<<<< HEAD
Aşağıdaki amaç `obj.selamVer()` in 4 defa çağırılmasıdır.
=======
In the code below we intend to call `obj.go()` method 4 times in a row.
>>>>>>> 9acc1302a14a3bbabbc9bf95d04581094bd0f1a8

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
