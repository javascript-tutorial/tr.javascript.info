The `new Date` constructor uses the local time zone by default. So the only important thing to remember is that months start from zero.
`new Date` varsayılanda local zamaı kullnır. Burada hatırlanması gereken tek şey ayların 0'dan başladığıdır.

Bundan dolay February( Şubat )'ın indeksi 1'dir.

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```
