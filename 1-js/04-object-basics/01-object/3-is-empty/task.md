importance: 5

---

# Boş olup olmadığını kontrol et

`bosMu(obj)` adında bir fonksiyon tanımla ve eğer objenin hiçbir özelliği yok ise `true`, var ise `false` döndersin.

Should work like that:

```js
let program = {};

alert( bosMu(program) ); // true

schedule["8:30"] = "uyan";

alert( bosMu(schedule) ); // false
```
