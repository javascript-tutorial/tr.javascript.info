importance: 3

---

# "this" in değerini açıklayın

<<<<<<< HEAD
Aşağıdaki amaç `obj.selamVer()` in 4 defa çağırılmasıdır.
=======
In the code below we intend to call `obj.go()` method 4 times in a row.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

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
