importance: 5

---

# Sıralı erişilebilen anahtarlar

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/03-iterable-keys/task.md
`map.keys()` dizisini alıp bunun ile uğraşmak istenmekte.

Fakat bir problem var:
=======
We'd like to get an array of `map.keys()` in a variable and then do apply array-specific methods to it, e.g. `.push`.

But that doesn't work:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c:1-js/05-data-types/07-map-set/03-iterable-keys/task.md

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