<<<<<<< HEAD
`new Date` varsayılanda local zamaı kullnır. Burada hatırlanması gereken tek şey ayların 0'dan başladığıdır.
=======
The `new Date` constructor uses the local time zone. So the only important thing to remember is that months start from zero.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Bundan dolay February( Şubat )'ın indeksi 1'dir.

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```
