`eval`ı bu matematiksel ifadeyi hesaplamakta kullanalım:

```js demo run
let expr = prompt("Aritmetik bir ifade girin", '2*3+2');

alert( eval(expr) );
```

Kullanıcı herhangi bir metin veya kod girebilir.

Bunları güvenli hale getirip yalnızca aritmetiksel ifadelerle sınıflandırabilmek için `expr` değişkenini [düzenli ifadeler](info:regular-expressions) kullanarak kontrol edebiliriz, böylece ifade yalnızca rakam ve operatör içerebilecektir.
