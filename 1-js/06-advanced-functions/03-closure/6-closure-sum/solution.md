İkincisinin çalışabilmesi için ilkinin fonksiyon döndürmesi gerekmektedir.


Şunun gibi:

```js run
function topla(a) {

  return function(b) {
    return a + b; // dıştaki Sözcüksel Ortamdan "a" değişkenini almakta.
  };

}

alert( topla(1)(2) ); // 3
alert( topla(5)(-1) ); // 4
```

