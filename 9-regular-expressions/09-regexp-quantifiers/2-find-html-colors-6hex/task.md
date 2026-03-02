<<<<<<< HEAD
# HTML renkler için düzenli ifade (regexp)

`#ABCDEF` şeklinde yazılmış HTML-renklerini aramak için bir düzenli ifade oluşturun: önce `#` ve ardından 6 tane onaltılık karakter gelmesi lazım.

Bir kullanım örneği:

```js
let regexp = /...senin duzenli ifaden.../
=======
# Regexp for HTML colors

Create a regexp to search HTML-colors written as `#ABCDEF`: first `#` and then 6 hexadecimal characters.

An example of use:

```js
let regexp = /...your regexp.../
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";

alert( str.match(regexp) )  // #121212,#AA00ef
```

<<<<<<< HEAD
NOT: Bu görevde `#123` veya `rgb(1,2,3)` vb. diğer renk formatlarına ihtiyacımız yoktur.
=======
P.S. In this task we do not need other color formats like `#123` or `rgb(1,2,3)` etc.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
