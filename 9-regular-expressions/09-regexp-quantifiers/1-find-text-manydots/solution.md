
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
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
