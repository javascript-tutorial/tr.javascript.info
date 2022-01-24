Cevap: Önce `1`, sonra `undefined`.

```js run
alert( alert(1) && alert(2) );
```

Birinci `alert` `undefined` değeri döndürür. ( sadece değeri gösterir, bundan dolayı bir şey döndürmez)

Bundan dolayı ilk `yanlışı` bulan `&&` operatörü bu işlem sonrasında durur. Yanlış değeri dönderir ki bu durumda yanlış değer `undefined` dır. Dışarıda bulunan `alert` ise bu değeri uyarı şeklinde ekrana verir.

