# HTML renkler için düzenli ifade (regexp)

`#ABCDEF` şeklinde yazılmış HTML-renklerini aramak için bir düzenli ifade oluşturun: önce `#` ve ardından 6 tane onaltılık karakter gelmesi lazım.

Bir kullanım örneği:

```js
let regexp = /...senin duzenli ifaden.../

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";

alert( str.match(regexp) )  // #121212,#AA00ef
```

NOT: Bu görevde `#123` veya `rgb(1,2,3)` vb. diğer renk formatlarına ihtiyacımız yoktur.
