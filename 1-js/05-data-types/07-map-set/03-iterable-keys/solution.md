
Çünkü `map.keys()` sıralı erişim objesi ( iterable ) döndürüyor. `push` metodu `dizi`'lere ait bir metoddur.

`Array.from` ile bunu diziye çevirebilirsiniz:

```js run
let map = new Map();

map.set("adi", "Abdullah");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("daha fazla");

alert(keys); // adi, daha fazla
```
