
<<<<<<< HEAD
Çözüm:

```js run
let regexp = /\.{3,}/g;
alert( "Merhaba!... Nasıl gidiyor?.....".match(regexp) ); // ..., .....
```

Lütfen noktanın özel bir karakter olduğunu unutmayın, bu yüzden `\.` ekleyerek ondan kurtulmamız gerekiyor.
=======
Solution:

```js run
let regexp = /\.{3,}/g;
alert( "Hello!... How goes?.....".match(regexp) ); // ..., .....
```

Please note that the dot is a special character, so we have to escape it and insert as `\.`.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
