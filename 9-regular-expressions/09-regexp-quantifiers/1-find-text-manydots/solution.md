
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
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
