<<<<<<< HEAD
# Çapalar: karakter dizisi (string) başlangıç ^ ve bitiş $

Düzeltme `pattern:^` ve dolar `pattern:$` işaretlerinin, düzenli ifade (regexp) için özel anlamları vardır. Bunlar "çapalar" olarak adlandırılır.

Düzeltme işareti `pattern:^` metnin başlangıcı ile dolar işareti ise `pattern:$` -- metnin sonu ile eşleşir.

Örneğin, metnin `Mary` ile başlayıp başlamadığını test edelim:
=======
# Anchors: string start ^ and end $

The caret `pattern:^` and dollar `pattern:$` characters have special meaning in a regexp. They are called "anchors".

The caret `pattern:^` matches at the beginning of the text, and the dollar `pattern:$` -- at the end.

For instance, let's test if the text starts with `Mary`:
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

```js run
let str1 = "Mary had a little lamb";
alert( /^Mary/.test(str1) ); // true
```

<<<<<<< HEAD
`pattern:^Mary` kalıbının anlamı: "dizi (string) başlangıcı (^) ve ardından Mary".

Buna benzer olarak, metnin `snow` ile bitip bitmediğini `pattern:snow$` kullanarak test edebiliriz:
=======
The pattern `pattern:^Mary` means: "string start and then Mary".

Similar to this, we can test if the string ends with `snow` using `pattern:snow$`:
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

```js run
let str1 = "it's fleece was white as snow";
alert( /snow$/.test(str1) ); // true
```

<<<<<<< HEAD

Bu gibi özel durumlarda (başlangıç ve bitiş), çapaların (^, $) yerine `startsWith/endsWith` string methodlarını kullanabiliriz. Düzenli ifadeler (regexp), karmaşık testler için kullanılmalıdır.

## Tam eşleşme için test yapmak

İki çapanın birlikte kullanımıyla `pattern:^...$`, string ile kalıbın tam olarak eşleşip eşleşmediği kontrol edilir. Örneğin, kullanıcı girişinin doğru biçimde olup olmadığını kontrol edelim.

Verilen dizinin (string) `12:34` biçiminde bir zaman olup olmadığını kontrol edelim. Kalıp şu şekilde olmalı: iki basamak, ardından iki nokta üst üste ve iki basamak daha.

Yukarda bahsedilen kalıp, düzenli ifadeler (RegExp) dilinde `pattern:\d\d:\d\d` karşılık gelir:
=======
In these particular cases we could use string methods `startsWith/endsWith` instead. Regular expressions should be used for more complex tests.

## Testing for a full match

Both anchors together `pattern:^...$` are often used to test whether or not a string fully matches the pattern. For instance, to check if the user input is in the right format.

Let's check whether or not a string is a time in `12:34` format. That is: two digits, then a colon, and then another two digits.

In regular expressions language that's `pattern:\d\d:\d\d`:
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

```js run
let goodInput = "12:34";
let badInput = "12:345";

let regexp = /^\d\d:\d\d$/;
alert( regexp.test(goodInput) ); // true
<<<<<<< HEAD
alert( regexp.test(badInput) ); // false, ":" ifadesinden sonra 2 basamak yerine 3 basamak vardır
```

Burada `pattern:\d\d:\d\d` eşleşmesi yapmak için; metnin başlangıcından `pattern:^` hemen sonra `pattern:\d\d:\d\d` konulmalı ve ardından `pattern:$` eklenmelidir.

Dizi (string) tam olarak bu kalıpta olmalıdır. Herhangi bir sapma ya da fazla bir karakter varsa sonuç `false` olur.

Çapalar, `pattern:m` bayrağı kullanıldığında farklı davranır. Bir sonraki bölümde bu konuya değineceğiz.

```smart header="Çapalar \"sıfır genişlik\" e sahiptir. Anchors have \"zero width\""
`pattern:^` ve `pattern:$` çapaları testlerdir. Genişliği yoktur.

Bir başka deyişle, çapalar herhangi bir karakterle eşleşmezler bunun yerine regexp motorunu, kullanılan kalıp için test etmeye zorlar.
=======
alert( regexp.test(badInput) ); // false
```

Here the match for `pattern:\d\d:\d\d` must start exactly after the beginning of the text `pattern:^`, and the end `pattern:$` must immediately follow.

The whole string must be exactly in this format. If there's any deviation or an extra character, the result is `false`.

Anchors behave differently if flag `pattern:m` is present. We'll see that in the next article.

```smart header="Anchors have \"zero width\""
Anchors `pattern:^` and `pattern:$` are tests. They have zero width.

In other words, they do not match a character, but rather force the regexp engine to check the condition (text start/end).
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6
```
