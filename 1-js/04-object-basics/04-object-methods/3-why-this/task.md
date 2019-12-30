importance: 3

---

# "this" in değerini açıklayın

<<<<<<< HEAD
Aşağıdaki amaç `obj.selamVer()` in 4 defa çağırılmasıdır.
=======
In the code below we intend to call `obj.go()` method 4 times in a row.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

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
