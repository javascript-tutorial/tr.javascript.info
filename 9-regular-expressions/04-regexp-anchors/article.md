# Çapalar: karakter dizisi (string) başlangıç ^ ve bitiş $

Düzeltme `pattern:^` ve dolar `pattern:$` işaretlerinin, düzenli ifade (regexp) için özel anlamları vardır. Bunlar "çapalar" olarak adlandırılır.

Düzeltme işareti `pattern:^` metnin başlangıcı ile dolar işareti ise `pattern:$` -- metnin sonu ile eşleşir.

Örneğin, metnin `Mary` ile başlayıp başlamadığını test edelim:

```js run
let str1 = "Mary had a little lamb";
alert( /^Mary/.test(str1) ); // true
```

`pattern:^Mary` kalıbının anlamı: "dizi (string) başlangıcı (^) ve ardından Mary".

Buna benzer olarak, metnin `snow` ile bitip bitmediğini `pattern:snow$` kullanarak test edebiliriz:

```js run
let str1 = "it's fleece was white as snow";
alert( /snow$/.test(str1) ); // true
```


Bu gibi özel durumlarda (başlangıç ve bitiş), çapaların (^, $) yerine `startsWith/endsWith` string methodlarını kullanabiliriz. Düzenli ifadeler (regexp), karmaşık testler için kullanılmalıdır.

## Tam eşleşme için test yapmak

İki çapanın birlikte kullanımıyla `pattern:^...$`, string ile kalıbın tam olarak eşleşip eşleşmediği kontrol edilir. Örneğin, kullanıcı girişinin doğru biçimde olup olmadığını kontrol edelim.

Verilen dizinin (string) `12:34` biçiminde bir zaman olup olmadığını kontrol edelim. Kalıp şu şekilde olmalı: iki basamak, ardından iki nokta üst üste ve iki basamak daha.

Yukarda bahsedilen kalıp, düzenli ifadeler (RegExp) dilinde `pattern:\d\d:\d\d` karşılık gelir:

```js run
let goodInput = "12:34";
let badInput = "12:345";

let regexp = /^\d\d:\d\d$/;
alert( regexp.test(goodInput) ); // true
alert( regexp.test(badInput) ); // false, ":" ifadesinden sonra 2 basamak yerine 3 basamak vardır
```

Burada `pattern:\d\d:\d\d` eşleşmesi yapmak için; metnin başlangıcından `pattern:^` hemen sonra `pattern:\d\d:\d\d` konulmalı ve ardından `pattern:$` eklenmelidir.

Dizi (string) tam olarak bu kalıpta olmalıdır. Herhangi bir sapma ya da fazla bir karakter varsa sonuç `false` olur.

Çapalar, `pattern:m` bayrağı kullanıldığında farklı davranır. Bir sonraki bölümde bu konuya değineceğiz.

```smart header="Çapalar \"sıfır genişlik\" e sahiptir. Anchors have \"zero width\""
`pattern:^` ve `pattern:$` çapaları testlerdir. Genişliği yoktur.

Bir başka deyişle, çapalar herhangi bir karakterle eşleşmezler bunun yerine regexp motorunu, kullanılan kalıp için test etmeye zorlar.
```
