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

```js run
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
alert( "12,34,56".match(/\b\d\d\b/g) ); // 12,34,56
```

```warn header="Word boundary `pattern:\b` Latin alfabesi haricinde çalışmaz"

Kelime sınırı testi `pattern:\b`, bir yanda `pattern:\w`, diğer yanda `pattern:\w` olmamama durumununun söz konusu olduğu pozisyonları kontrol eder.

Ancak `pattern:\w`, `a-z` şeklinde bir latin harfi (veya harf veya alt tire) anlamına gelir, sonuç olarak test Kiril veya Hiyeroglif gibi farklı karakterler için çalışmayacaktır.
```
