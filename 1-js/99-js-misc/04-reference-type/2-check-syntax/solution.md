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

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/2-check-syntax/solution.md
**The error appears because a semicolon is missing after `kullanici = {...}`.**
=======
The error message in most browsers does not give us much of a clue about what went wrong.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017:1-js/99-js-misc/04-reference-type/2-check-syntax/solution.md

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

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/2-check-syntax/solution.md
`(kullanici.selamVer)` etrafındaki parantez bir işe yaramaz. Sadece sıralamayı belirtir. Bu soruda `;` önemliydi.
=======
Please note that parentheses around `(user.go)` do nothing here. Usually they setup the order of operations, but here the dot `.` works first anyway, so there's no effect. Only the semicolon thing matters.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017:1-js/99-js-misc/04-reference-type/2-check-syntax/solution.md
