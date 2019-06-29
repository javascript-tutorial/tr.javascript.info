`new Date` varsayılanda local zamaı kullnır. Burada hatırlanması gereken tek şey ayların 0'dan başladığıdır.

Bundan dolay February( Şubat )'ın indeksi 1'dir.

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```
