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
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622

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

<<<<<<< HEAD
`(kullanici.selamVer)` etrafındaki parantez bir işe yaramaz. Sadece sıralamayı belirtir. Bu soruda `;` önemliydi.
=======
Please note that parentheses around `(user.go)` do nothing here. Usually they setup the order of operations, but here the dot `.` works first anyway, so there's no effect. Only the semicolon thing matters.
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622
