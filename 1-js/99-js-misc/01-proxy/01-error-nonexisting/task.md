# Error on reading non-existent property

<<<<<<< HEAD
# Mevcut olmayan özelliği okuma hatası

Mevcut olmayan bir özelliği okumaya çalışıldığında hata fırlatan bir proxy oluşturun.
=======
Usually, an attempt to read a non-existent property returns `undefined`.

Create a proxy that throws an error for an attempt to read of a non-existent property instead.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

Bu, programlama hatalarını erken tespit etmeye yardımcı olabilir.

<<<<<<< HEAD
Bir nesne `target` alan ve bu işlevselliğe sahip bir proxy döndüren `wrap(target)` fonksiyonunu yazın.
Şöyle çalışmalı:
=======
Write a function `wrap(target)` that takes an object `target` and return a proxy that adds this functionality aspect.

That's how it should work:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
*!*
      /* kodunuz */
*/!*
  });
}

user = wrap(user);

alert(user.name); // John
*!*
<<<<<<< HEAD
alert(user.age); // Hata: Özellik yok
=======
alert(user.age); // ReferenceError: Property doesn't exist: "age"
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
*/!*
```
