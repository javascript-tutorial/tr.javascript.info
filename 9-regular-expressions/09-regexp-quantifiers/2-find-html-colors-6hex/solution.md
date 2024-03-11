`#` ve ardından 6 onaltılık karakterin gelmesine ihtiyacımız var.

Onaltılık bir karakter `pattern:[0-9a-fA-F]` şeklinde ifade edilebilir. Veya eğer `pattern:i` bayrağını kullanırsak, `pattern:[0-9a-f]` şeklinde ifade edilebilir.

Daha sonrasında `pattern:{6}` nicelik belirtecini kullanarak bunlardan 6 tanesini seçebiliriz.

Sonuç olarak, `pattern:/#[a-f0-9]{6}/gi` düzenli ifadesine sahibiz.

```js run
let regexp = /#[a-f0-9]{6}/gi;

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2"

alert( str.match(regexp) );  // #121212,#AA00ef
```

Buradaki sorun rengi daha uzun dizilerde bulması:

```js run
alert( "#12345678".match( /#[a-f0-9]{6}/gi ) ) // #12345678
```

Bunu çözmek için, sona `pattern:\b` ekleyebiliriz:

```js run
// renk
alert( "#123456".match( /#[a-f0-9]{6}\b/gi ) ); // #123456

// bir renk değil
alert( "#12345678".match( /#[a-f0-9]{6}\b/gi ) ); // null
```
