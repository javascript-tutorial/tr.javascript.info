importance: 5

---

# Sıralı erişilebilen anahtarlar

`map.keys()` dizisini alıp bunun ile uğraşmak istenmekte.

Fakat bir problem var:

```js run
let map = new Map();

map.set("adi", "Abdullah");

let keys = map.keys();

*!*
// Error: numbers.push adında bir fonksiyon bulunmamaktadır.
keys.push("daha fazla");
*/!*
```
Neden? `keys.push` kodunu nasıl düzeltebilirsiniz?