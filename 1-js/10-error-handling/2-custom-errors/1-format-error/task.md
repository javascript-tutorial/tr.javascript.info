importance: 5

---

# Yazım hatasının kalıtılması.

`FormatError` adında bir sınıf yazın ve bu sınıf varsayılan `SyntaxError`'dan kalıtılsın.

`message`, `name`, `stack` gibi özellikleri desteklemeli.

Kullanımı:

```js
let err = new FormatError("Formatlama hatası");

alert( err.message ); // formatlama hatası
alert( err.name ); // FormatError
alert( err.stack ); // stack

alert( err instanceof FormatError ); // true
alert( err instanceof SyntaxError ); // true ( SyntaxError sınıfından kalıtıldığından dolayı )
```
