<<<<<<< HEAD
`#` ve ardından 6 tane onaltılık karakterin gelmesine ihtiyacımız var.

Onaltılık bir karakter `pattern:[0-9a-fA-F]` şeklinde ifade edilebilir. Veya eğer `pattern:i` bayrağını kullanırsak, `pattern:[0-9a-f]` şeklinde ifade edilebilir.

Daha sonrasında `pattern:{6}` nicelik belirtecini kullanarak bunlardan 6 tanesini seçebiliriz.

Sonuç olarak, `pattern:/#[a-f0-9]{6}/gi` düzenli ifadesine sahibiz.
=======
We need to look for `#` followed by 6 hexadecimal characters.

A hexadecimal character can be described as `pattern:[0-9a-fA-F]`. Or if we use the `pattern:i` flag, then just  `pattern:[0-9a-f]`.

Then we can look for 6 of them using the quantifier `pattern:{6}`.

As a result, we have the regexp: `pattern:/#[a-f0-9]{6}/gi`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let regexp = /#[a-f0-9]{6}/gi;

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2"

alert( str.match(regexp) );  // #121212,#AA00ef
```

<<<<<<< HEAD
Buradaki sorun daha uzun değerleri de bulmasıdır:

```js run
alert( "#12345678".match( /#[a-f0-9]{6}/gi ) ) // #12345678
```

Bunu çözmek için, sona `pattern:\b` ekleyebiliriz:

```js run
// renk
alert( "#123456".match( /#[a-f0-9]{6}\b/gi ) ); // #123456

// bir renk değil
=======
The problem is that it finds the color in longer sequences:

```js run
alert( "#12345678".match( /#[a-f0-9]{6}/gi ) ) // #123456
```

To fix that, we can add `pattern:\b` to the end:

```js run
// color
alert( "#123456".match( /#[a-f0-9]{6}\b/gi ) ); // #123456

// not a color
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
alert( "#12345678".match( /#[a-f0-9]{6}\b/gi ) ); // null
```
