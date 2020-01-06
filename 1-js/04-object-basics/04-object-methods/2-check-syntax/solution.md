**Hata**!

Deneyebilirsiniz:

```js run
let kullanici = {
  isim: "John",
  selamVer: function() { alert(this.isim) }
}

(kullanici.selamVer)() // error!
```
Tarayıcıların çoğundaki hata mesajının anlaşılmaz.

<<<<<<< HEAD
**The error appears because a semicolon is missing after `kullanici = {...}`.**
=======
The error message in most browsers does not give us much of a clue about what went wrong.
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

JavaScript parantezden önce noktalı virgül koymaz. Bu durumda kod aşağıdaki gibi çalışacaktır:

```js no-beautify
let kullanici = { selamVer:... }(kullanici.selamVer)()
```

Bu şekilde çağırıldığında, `let kullanici` ile çağrı aynı satırda yapılmış olur. Ayrıca bu tanımlanan fonksiyon `(kullanici.selamVer)` şeklinde aynı satırda argüman olarak kullanılmıştır. Bundan dolayı da hata oluşmaktadır.

Eğer noktalı virgül koyarsanız herşey beklediğiniz gibi çalışır:

```js run
let kullanici = {
  isim: "İhsan",
  selamVer: function() { alert(this.isim) }
}*!*;*/!*

(kullanici.selamVer)() // John
```

`(kullanici.selamVer)` etrafındaki parantez bir işe yaramaz. Sadece sıralamayı belirtir. Bu soruda `;` önemliydi.