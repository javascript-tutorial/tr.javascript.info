
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
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
