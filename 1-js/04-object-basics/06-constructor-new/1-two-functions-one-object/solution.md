Evet mümkün.

Eğer bir fonksiyon obje döndürüyorsa `this` yerine o objeyi döndürebilir.

Öyleyse, iki fonksiyon da dışarıda yaratılmış aynı objeyi dönderirse bu durumda aynı olur:

```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```
