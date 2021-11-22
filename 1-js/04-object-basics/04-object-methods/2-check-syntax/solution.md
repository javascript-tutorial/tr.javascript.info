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

**The error appears because a semicolon is missing after `kullanici = {...}`.**

JavaScript parantezden önce noktalı virgül koymaz. Bu durumda kod aşağıdaki gibi çalışacaktır:

```js no-beautify
let kullanici = { selamVer:... }(kullanici.selamVer)()
```

Bu şekilde çağırıldığında, `let kullanici` ile çağrı aynı satırda yapılmış olur. Ayrıca bu tanımlanan fonksiyon `(kullanici.selamVer)` şeklinde aynı satırda argüman olarak kullanılmıştır. Bundan dolayı da hata oluşmaktadır.

Eğer noktalı virgül koyarsanız her şey beklediğiniz gibi çalışır:

```js run
let kullanici = {
  isim: "İhsan",
  selamVer: function() { alert(this.isim) }
}*!*;*/!*

(kullanici.selamVer)() // John
```

`(kullanici.selamVer)` etrafındaki parantez bir işe yaramaz. Sadece sıralamayı belirtir. Bu soruda `;` önemliydi.