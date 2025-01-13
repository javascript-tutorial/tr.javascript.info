<<<<<<< HEAD
# Nicelik Belirteçleri +, *, ? and {n}

Diyelim ki `+7(903)-123-45-67` şeklinde bir karakter dizimiz var ve biz bu dizideki sayıların tamamını bulmak istiyoruz. Ama öncekinden farklı olarak, tek bir sayıyla değil, bütün sayılarla ilgileniyoruz: `7, 903, 123, 45, 67`.

Sayı, bir veya daha fazla rakamdan oluşan bir dizidir `pattern:\d`. Kaç tanesine sahip olduğumuzu işaretlemek için bir *nicelik belirteci* ekleyebiliriz.

## Nicelik {n}

En basit nicelik belirteci, süslü parantezler içindeki bir sayıdır: `pattern:{n}`.

Bir karaktere (ya da bir karakter sınıfına, veya `[...]` kümesine vb.) nicelik belirteci eklendiğinde, bize kaç tanesine sahip olduğumuzu belirtir.

Birkaç gelişmiş formu var, örneklere bakalım:

Tam sayım: `pattern:{5}`
: `pattern:\d{5}`, `pattern:\d\d\d\d\d` ile benzerdir. İkiside tam olarak 5 adet rakamı belirtir.

    Aşağıdaki örnekte 5 basamaklı sayı aranır:

    ```js run
    alert( "12345 yaşındayım".match(/\d{5}/) ); //  "12345"
    ```

    Daha uzun sayıları hariç tutmak için `\b` kullanabiliriz: `pattern:\b\d{5}\b`.

`pattern:{3,5}`, 3 ila 5 aralığında eşleştirir
: 3 ila 5 basamaklı sayıları bulmak için sınırları süslü parantezlerin içinde belirtebiliriz: `pattern:\d{3,5}`

    ```js run
    alert( "12 yaşında değilim, 1234 yaşındayım.".match(/\d{3,5}/) ); // "1234"
    ```

    Üst sınırı kaldırabiliriz.

    `pattern:\d{3,}`, `3` veya daha fazla basamaklı sayıları arar:

    ```js run
    alert( "12 yaşında değilim, 345678 yaşındayım".match(/\d{3,}/) ); // "345678"
    ```

Şimdi `+7(903)-123-45-67` değerine dönelim.

Sayı, arka arkaya bir veya daha fazla rakamdan oluşan bir dizidir. Yani düzenli ifade (regexp) şu şekilde olacaktır, `pattern:\d{1,}`:
=======
# Quantifiers +, *, ? and {n}

Let's say we have a string like `+7(903)-123-45-67` and want to find all numbers in it. But unlike before, we are interested not in single digits, but full numbers: `7, 903, 123, 45, 67`.

A number is a sequence of 1 or more digits `pattern:\d`. To mark how many we need, we can append a *quantifier*.

## Quantity {n}

The simplest quantifier is a number in curly braces: `pattern:{n}`.

A quantifier is appended to a character (or a character class, or a `[...]` set etc) and specifies how many we need.

It has a few advanced forms, let's see examples:

The exact count: `pattern:{5}`
: `pattern:\d{5}` denotes exactly 5 digits, the same as `pattern:\d\d\d\d\d`.

    The example below looks for a 5-digit number:

    ```js run
    alert( "I'm 12345 years old".match(/\d{5}/) ); //  "12345"
    ```

    We can add `\b` to exclude longer numbers: `pattern:\b\d{5}\b`.

The range: `pattern:{3,5}`, match 3-5 times
: To find numbers from 3 to 5 digits we can put the limits into curly braces: `pattern:\d{3,5}`

    ```js run
    alert( "I'm not 12, but 1234 years old".match(/\d{3,5}/) ); // "1234"
    ```

    We can omit the upper limit.

    Then a regexp `pattern:\d{3,}` looks for sequences of digits of length `3` or more:

    ```js run
    alert( "I'm not 12, but 345678 years old".match(/\d{3,}/) ); // "345678"
    ```

Let's return to the string `+7(903)-123-45-67`.

A number is a sequence of one or more digits in a row. So the regexp is `pattern:\d{1,}`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let str = "+7(903)-123-45-67";

let numbers = str.match(/\d{1,}/g);

alert(numbers); // 7,903,123,45,67
```

<<<<<<< HEAD
## Kısaltmalar

Çok kullanılan nicelik belirteçlerinin kısaltmaları mevcuttur:

`pattern:+`
: "bir veya daha fazlası" anlamına gelir, `pattern:{1,}` ifadesine benzerdir.

    Örneğin, `pattern:\d+` sayıları aramak içindir:
=======
## Shorthands

There are shorthands for most used quantifiers:

`pattern:+`
: Means "one or more", the same as `pattern:{1,}`.

    For instance, `pattern:\d+` looks for numbers:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    let str = "+7(903)-123-45-67";

    alert( str.match(/\d+/g) ); // 7,903,123,45,67
    ```

`pattern:?`
<<<<<<< HEAD
: "sıfır ya da bir" anlamına gelir, `pattern:{0,1}` ifadesine benzerdir. Başka bir deyişle, isteğe bağlı hale getirir.

    Örneğin, `pattern:ou?r` kalıbı, ilk önce `match:o` için, ardından `match:u` (sıfır veya bir adet) için, ve daha sonrasında `match:r` için arama yapar.

    Yani, `pattern:colou?r`, hem `match:color` hem de `match:colour` öğelerini bulur:
=======
: Means "zero or one", the same as `pattern:{0,1}`. In other words, it makes the symbol optional.

    For instance, the pattern `pattern:ou?r` looks for `match:o` followed by zero or one `match:u`, and then `match:r`.

    So, `pattern:colou?r` finds both `match:color` and `match:colour`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    let str = "Should I write color or colour?";

    alert( str.match(/colou?r/g) ); // color, colour
    ```

`pattern:*`
<<<<<<< HEAD
: "Sıfır veya daha fazlası" anlamına gelir, `pattern:{0,}` ile benzerdir. Yani bir karakter kendini tekrar edebilir veya hiç olmayabilir:

    Örnek olarak, `pattern:\d0*`, bir sayı ve ardından onu takip eden sıfırları arar (çok sayıda sıfır olabilir ya da hiç olmayabilir):
=======
: Means "zero or more", the same as `pattern:{0,}`. That is, the character may repeat any times or be absent.

    For example, `pattern:\d0*` looks for a digit followed by any number of zeroes (may be many or none):
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    alert( "100 10 1".match(/\d0*/g) ); // 100, 10, 1
    ```

<<<<<<< HEAD
    Bunu `pattern:+` (bir veya daha fazlası) ile karşılaştıralım:

    ```js run
    alert( "100 10 1".match(/\d0+/g) ); // 100, 10
    // 1 eşleşmedi, çünkü 0+ ifadesi en az bir sıfır varlığını gerektirir.
    ```

## Daha Fazla Örnek

Nicelik belirteçleri sıklıkla kullanılır. Karmaşık düzenli ifade kalıplarının (regexp pattern) "yapı taşı" olarak kullanılırlar. Bu yüzden daha fazla örnek görelim.

**Ondalık kesirler için düzenli ifadeler (regexp) (kayan noktalı bir sayı): `pattern:\d+\.\d+`**

=======
    Compare it with `pattern:+` (one or more):

    ```js run
    alert( "100 10 1".match(/\d0+/g) ); // 100, 10
    // 1 not matched, as 0+ requires at least one zero
    ```

## More examples

Quantifiers are used very often. They serve as the main "building block" of complex regular expressions, so let's see more examples.

**Regexp for decimal fractions (a number with a floating point): `pattern:\d+\.\d+`**

In action:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```js run
alert( "0 1 12.345 7890".match(/\d+\.\d+/g) ); // 12.345
```

<<<<<<< HEAD
**"Nitelik barındırmayan HTML açılış etiketleri" için bir düzenli ifade (regexp),`<span>` veya `<p>` gibi.**

1. En basit olanı: `pattern:/<[a-z]+>/i`
=======
**Regexp for an "opening HTML-tag without attributes", such as `<span>` or `<p>`.**

1. The simplest one: `pattern:/<[a-z]+>/i`
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    alert( "<body> ... </body>".match(/<[a-z]+>/gi) ); // <body>
    ```

<<<<<<< HEAD
    Bu düzenli ifade (regexp), ilk olarak `pattern:'<'` için, ardından bir veya daha fazla Latin harfi için ve daha sonrasında `pattern:'>'` için bir arama yapar.

2. Gelişmiş hali: `pattern:/<[a-z][a-z0-9]*>/i`

    Standarda göre HTML etiket isimleri `<h1>` gibi ilk karakter dışında herhangi bir pozisyonda bir rakam içerebilir.
=======
    The regexp looks for character `pattern:'<'` followed by one or more Latin letters, and then  `pattern:'>'`.

2. Improved: `pattern:/<[a-z][a-z0-9]*>/i`

    According to the standard, HTML tag name may have a digit at any position except the first one, like `<h1>`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    alert( "<h1>Hi!</h1>".match(/<[a-z][a-z0-9]*>/gi) ); // <h1>
    ```

<<<<<<< HEAD
**"Nitelik barındırmayan HTML açılış ve kapanış etiketleri" için düzenli ifade (regexp): `pattern:/<\/?[a-z][a-z0-9]*>/i`**

Kalıbın başında `pattern:/?` ile isteğe bağlı bir eğik çizgi (slash) belirttim. Ters eğik çizgiyle (backslash) bundan kurtuldum, aksi takdirde JavaScript bunun, düzenli ifade kalıbının sonu olduğunu düşünecekti.

```js run
alert( "<h1>Merhaba!</h1>".match(/<\/?[a-z][a-z0-9]*>/gi) ); // <h1>, </h1>
```

```smart header="Bir düzenli ifadeyi daha tutarlı/kesin hale getirmek için genellikle onu daha karmaşık hale getirmek gerekir"
Bu örneklerde genel bir kural görebiliriz: düzenli ifade ne kadar tutarlı/kesin ise o kadar uzun ve karmaşıktır.

Örneğin, HTML etiketleri için daha basit bir ifade kullanabiliriz: `pattern:<\w+>`. Ancak HTML, etiket isimleri için kısıtlamalara sahip olduğundan dolayı, `pattern:<[a-z][a-z0-9]*>` daha güvenilirdir.

`pattern:<\w+>` kalıbını kullanabilir miyiz yoksa `pattern:<[a-z][a-z0-9]*>` kalıbını mı kullanmamız gerekir?

Gerçek hayatta ikiside kabul edilebilir. "Ekstra" eşleşmelere ne kadar tahammül edebileceğimize ya da bunları başka yollarla sonuçtan çıkarmanın zor olup olmadığına bağlıdır.
=======
**Regexp "opening or closing HTML-tag without attributes": `pattern:/<\/?[a-z][a-z0-9]*>/i`**

We added an optional slash `pattern:/?` near the beginning of the pattern. Had to escape it with a backslash, otherwise JavaScript would think it is the pattern end.

```js run
alert( "<h1>Hi!</h1>".match(/<\/?[a-z][a-z0-9]*>/gi) ); // <h1>, </h1>
```

```smart header="To make a regexp more precise, we often need make it more complex"
We can see one common rule in these examples: the more precise is the regular expression -- the longer and more complex it is.

For instance, for HTML tags we could use a simpler regexp: `pattern:<\w+>`. But as HTML has stricter restrictions for a tag name, `pattern:<[a-z][a-z0-9]*>` is more reliable.

Can we use `pattern:<\w+>` or we need `pattern:<[a-z][a-z0-9]*>`?

In real life both variants are acceptable. Depends on how tolerant we can be to "extra" matches and whether it's difficult or not to remove them from the result by other means.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```
