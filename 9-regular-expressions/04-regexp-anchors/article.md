# Çapalar: karakter dizisi (string) başlangıç ^ ve bitiş $

Düzeltme `pattern:^` ve dolar `pattern:$` işaretlerinin, karakter dizisi (regexp) için özel anlamları vardır. Bunlar "çapalar" olarak adlandırılırlar.

Düzeltme işareti `pattern:^` metnin başlangıcı ile, dolar işareti ise `pattern:$` -- metnin sonu ile eşleşir.

Örneğin, metnin `Mary` ile başlayıp başlamadığını test edelim:

```js run
let str1 = "Mary had a little lamb";
alert( /^Mary/.test(str1) ); // true
```

`pattern:^Mary` kalıbının anlamı: "dize (string) başlangıcı (^) ve ardından Mary".

Buna benzer olarak, metnin `snow` ile bitip bitmediğini `pattern:snow$` kullanarak test edebiliriz:

```js run
let str1 = "it's fleece was white as snow";
alert( /snow$/.test(str1) ); // true
```


Bu gibi özel durumlarda (başlangıç ve bitiş), çapaların (^, $) yerine `startsWith/endsWith` string methodlarını kullanabiliriz. Düzenli ifadeler (regex), karmaşık testler için kullanılmalıdır. In these particular cases we could use string methods `startsWith/endsWith` instead. Regular expressions should be used for more complex tests.

## Tam eşleşme için test

İki çapanın birlikte kullanımıyla `pattern:^...$`, string ile kalıbın tam olarak eşleşip eşleşmediği kontrol ediliir. Örneğin, kullanıcı girişinin doğru biçimde olup olmadığını kontrol edelim. Both anchors together `pattern:^...$` are often used to test whether or not a string fully matches the pattern. For instance, to check if the user input is in the right format.

Verilen dizinin (string) `12:34` biçiminde bir zaman olup olmadığını kontrol edelim. Biçim şu şekilde olmalı: iki basamak, ardından iki nokta üst üste ve iki basamak daha. Let's check whether or not a string is a time in `12:34` format. That is: two digits, then a colon, and then another two digits.

Yukarda bahsedilen kalıp, düzenli ifadeler (RegExp) dilinde `pattern:\d\d:\d\d` karşılık gelir: In regular expressions language that's `pattern:\d\d:\d\d`:

```js run
let goodInput = "12:34";
let badInput = "12:345";

let regexp = /^\d\d:\d\d$/;
alert( regexp.test(goodInput) ); // true
alert( regexp.test(badInput) ); // false, ":" ifadesinden sonra 2 basamak yerine 3 basamak vardır
```

Burada `pattern:\d\d:\d\d` eşleşmesi yapmak için; metnin başlangıcından`pattern:^` hemen sonra `pattern:\d\d:\d\d` konulmalı ve ardından `pattern:$` eklenmelidir. Here the match for `pattern:\d\d:\d\d` must start exactly after the beginning of the text `pattern:^`, and the end `pattern:$` must immediately follow.

Dizi (string) tam olarak bu biçimde olmalıdır. Herhangi bir sapma ya da fazla bir karakter varsa sonuç `false` olur. The whole string must be exactly in this format. If there's any deviation or an extra character, the result is `false`.

Çapalar, `pattern:m` bayrağı kullanıldığında farklı davranır. Bir sonraki bölümde bu konuya değineceğiz. Anchors behave differently if flag `pattern:m` is present. We'll see that in the next article.

```smart header="Çapalar \"sıfır genişlik\" tedir. Anchors have \"zero width\""
`pattern:^` ve `pattern:$` çapaları testlerdir. Genişliği yoktur BunlarAnchors `pattern:^` and `pattern:$` are tests. They have zero width.

Bir başka deyişle, çapalar herhangi bir karakterle eşleşmezler ancak regexp motorunu kullanılan kalıp (metin başlangıç/bitiş) için test etmeye zorlar. In other words, they do not match a character, but rather force the regexp engine to check the condition (text start/end).
```
