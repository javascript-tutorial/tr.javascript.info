<<<<<<< HEAD
# Kelime sınırı: \b

Bir kelime sınırı `pattern:\b`, tıpkı `pattern:^` ve `pattern:$` gibi bir testtir.

Regexp motoru (regexpleri aramak için oluşturulmuş program modülü), `pattern:\b` ile karşılaştığında karakter dizisindeki konumun bir kelime sınırı olup olmadığını kontrol eder.

Sözcük sınırı olarak nitelendirilen üç adet durum vardır:

- Karakter dizisi başlangıcında. Şayet ilk karakter dizisi karakteri bir kelime karakteriyse `pattern:\w`.
- Karakter dizisinin iki karakterinin arası. Bir tanesi kelime karakteri `pattern:\w` ise ve diğeri değilse.
- Karakter dizisi sonunda. Eğer son karakter dizisi karakter bir kelime karakteriyse `pattern:\w`.

Örneğin, regexp `pattern:\bJava\b` ifadesi `subject:Merhaba, Java!` içerisinde bulunacaktır, burada `subject:Java` bağımsız bir kelimedir. Ancak `subject:Merhaba, JavaScript!` içerisinde bulunmaz.

```js run
alert( "Merhaba, Java!".match(/\bJava\b/) ); // Java
alert( "Merhaba, JavaScript!".match(/\bJava\b/) ); // null
```

`subject:Hello, Java!` karakter dizisinde aşağıdaki pozisyonlar `pattern:\b`'ye karşılık gelir.

![](hello-java-boundaries.svg)


Sonuç olarak `pattern:\Merhaba\b` ifadesiyle eşleşir, çünkü:

1. Karakter dizisinin başlangıcı ilk `pattern:\b` testi ile eşleşir.
2. Sonrasında `pattern:Merhaba` kelimesi eşleşir.
3. Ardından `pattern:\b`, `subject:o` ile bir boşluk arasında bulunduğumuzdan dolayı tekrar eşleşir.

Aynı şekilde `pattern:\bJava\b` şablonu de eşleşecektir. Ancak `pattern:\bMerh\b` eşleşmez, (çünkü `b`'den sonra bir kelime sınırı yoktur), aynı şekilde `Java!\b` da (çünkü ünlem işareti `pattern:\w` ile ifade edilen bir kelime karakteri değildir), dolayısıyla sonrasında bir kelime sınırı yoktur. 

```js run
alert( "Merhaba, Java!".match(/\bMerhaba\b/) ); // Merhaba
alert( "Merhaba, Java!".match(/\bJava\b/) );  // Java
alert( "Merhaba, Java!".match(/\bMerh\b/) );  // null (eşleşme yok)
alert( "Merhaba, Java!".match(/\bJava!\b/) ); // null (eşleşme yok)
```

`pattern:\b`'yi yalnızca kelimelerle değil, rakamlarla da kullanabiliriz.

Örnek vermek gerekirse, `pattern:\b\d\d\b` şablonu 2 basamaklı sayılara bakacaktır. Başka bir deyişle, `pattern:\w`'den başka, boşluk veya noktalama işareti olmayan (veya metin başlangıcı/bitişi) karakterlerle çevrili bağımsız 2 basamaklı sayılara bakacaktır.
=======
# Word boundary: \b

A word boundary `pattern:\b` is a test, just like `pattern:^` and `pattern:$`.

When the regexp engine (program module that implements searching for regexps) comes across `pattern:\b`, it checks that the position in the string is a word boundary.

There are three different positions that qualify as word boundaries:

- At string start, if the first string character is a word character `pattern:\w`.
- Between two characters in the string, where one is a word character `pattern:\w` and the other is not.
- At string end, if the last string character is a word character `pattern:\w`.

For instance, regexp `pattern:\bJava\b` will be found in `subject:Hello, Java!`, where `subject:Java` is a standalone word, but not in `subject:Hello, JavaScript!`.

```js run
alert( "Hello, Java!".match(/\bJava\b/) ); // Java
alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null
```

In the string `subject:Hello, Java!` following positions correspond to `pattern:\b`:

![](hello-java-boundaries.svg)

So, it matches the pattern `pattern:\bHello\b`, because:

1. At the beginning of the string matches the first test `pattern:\b`.
2. Then matches the word `pattern:Hello`.
3. Then the test `pattern:\b` matches again, as we're between `subject:o` and a comma.

So the pattern `pattern:\bHello\b` would match, but not `pattern:\bHell\b` (because there's no word boundary after `l`) and not `Java!\b` (because the exclamation sign is not a wordly character `pattern:\w`, so there's no word boundary after it).

```js run
alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
alert( "Hello, Java!".match(/\bJava\b/) );  // Java
alert( "Hello, Java!".match(/\bHell\b/) );  // null (no match)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (no match)
```

We can use `pattern:\b` not only with words, but with digits as well.

For example, the pattern `pattern:\b\d\d\b` looks for standalone 2-digit numbers. In other words, it looks for 2-digit numbers that are surrounded by characters different from `pattern:\w`, such as spaces or punctuation (or text start/end).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
alert( "12,34,56".match(/\b\d\d\b/g) ); // 12,34,56
```

<<<<<<< HEAD
```warn header="Word boundary `pattern:\b` Latin alfabesi haricinde çalışmaz"

Kelime sınırı testi `pattern:\b`, bir yanda `pattern:\w`, diğer yanda `pattern:\w` olmamama durumununun söz konusu olduğu pozisyonları kontrol eder.

Ancak `pattern:\w`, `a-z` şeklinde bir latin harfi (veya harf veya alt tire) anlamına gelir, sonuç olarak test Kiril veya Hiyeroglif gibi farklı karakterler için çalışmayacaktır.
=======
```warn header="Word boundary `pattern:\b` doesn't work for non-latin alphabets"
The word boundary test `pattern:\b` checks that there should be `pattern:\w` on the one side from the position and "not `pattern:\w`" - on the other side.

But `pattern:\w` means a latin letter `a-z` (or a digit or an underscore), so the test doesn't work for other characters, e.g. cyrillic letters or hieroglyphs.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```
