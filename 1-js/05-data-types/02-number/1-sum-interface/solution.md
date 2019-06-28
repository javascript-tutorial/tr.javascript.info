

```js run demo
let a = +prompt("İlk numara", "");
let b = +prompt("İkinci numara?", "");

alert( a + b );
```
`prompt` öncesi koyulan `+` işareti alınan değeri doğrudan sayıya çevirir.

Diğer türlü girilen değerler string olarak algılanır toplama yerine birleştirilir: `"1" + "2" = "12"`