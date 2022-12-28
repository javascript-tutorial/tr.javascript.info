
Yanıt: `pattern:\b\d\d:\d\d\b`.

```js run
alert( "Kahvaltı 09:00'da oda 123:456'da.".match( /\b\d\d:\d\d\b/ ) ); // 09:00
```
