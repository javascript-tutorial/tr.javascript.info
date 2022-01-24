Tabi ki çalışır, hiçbir problem yok.

`const` sadece değişkenin kendisinin değişmesine engel olur.

Diğer bir deyişle `kullanici` bir referans obje tutmaktadır ve bu değişmez. Fakat bunun içeriği değişebilir. 

```js run
const kullanici = {
  adi: "Mahmut"
};

*!*
// calisir
kullanici.isim = "Mahmut";
*/!*

// hata
kullanici = 123;
```
