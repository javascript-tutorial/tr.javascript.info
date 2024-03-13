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

```js run
let str = "+7(903)-123-45-67";

let numbers = str.match(/\d{1,}/g);

alert(numbers); // 7,903,123,45,67
```

## Kısaltmalar

Çok kullanılan nicelik belirteçlerinin kısaltmaları mevcuttur:

`pattern:+`
: "bir veya daha fazlası" anlamına gelir, `pattern:{1,}` ifadesine benzerdir.

    Örneğin, `pattern:\d+` sayıları aramak içindir:

    ```js run
    let str = "+7(903)-123-45-67";

    alert( str.match(/\d+/g) ); // 7,903,123,45,67
    ```

`pattern:?`
: "sıfır ya da bir" anlamına gelir, `pattern:{0,1}` ifadesine benzerdir. Başka bir deyişle, isteğe bağlı hale getirir.

    Örneğin, `pattern:ou?r` kalıbı, ilk önce `match:o` için, ardından `match:u` (sıfır veya bir adet) için, ve daha sonrasında `match:r` için arama yapar.

    Yani, `pattern:colou?r`, hem `match:color` hem de `match:colour` öğelerini bulur:

    ```js run
    let str = "Should I write color or colour?";

    alert( str.match(/colou?r/g) ); // color, colour
    ```

`pattern:*`
: "Sıfır veya daha fazlası" anlamına gelir, `pattern:{0,}` ile benzerdir. Yani bir karakter kendini tekrar edebilir veya hiç olmayabilir:

    Örnek olarak, `pattern:\d0*`, bir sayı ve ardından onu takip eden sıfırları arar (çok sayıda sıfır olabilir ya da hiç olmayabilir):

    ```js run
    alert( "100 10 1".match(/\d0*/g) ); // 100, 10, 1
    ```

    Bunu `pattern:+` (bir veya daha fazlası) ile karşılaştıralım:

    ```js run
    alert( "100 10 1".match(/\d0+/g) ); // 100, 10
    // 1 eşleşmedi, çünkü 0+ ifadesi en az bir sıfır varlığını gerektirir.
    ```

## Daha Fazla Örnek

Nicelik belirteçleri sıklıkla kullanılır. Karmaşık düzenli ifade kalıplarının (regexp pattern) "yapı taşı" olarak kullanılırlar. Bu yüzden daha fazla örnek görelim.

**Ondalık kesirler için düzenli ifadeler (regexp) (kayan noktalı bir sayı): `pattern:\d+\.\d+`**

```js run
alert( "0 1 12.345 7890".match(/\d+\.\d+/g) ); // 12.345
```

**"Nitelik barındırmayan HTML açılış etiketleri" için bir düzenli ifade (regexp),`<span>` veya `<p>` gibi.**

1. En basit olanı: `pattern:/<[a-z]+>/i`

    ```js run
    alert( "<body> ... </body>".match(/<[a-z]+>/gi) ); // <body>
    ```

    Bu düzenli ifade (regexp), ilk olarak `pattern:'<'` için, ardından bir veya daha fazla Latin harfi için ve daha sonrasında `pattern:'>'` için bir arama yapar.

2. Gelişmiş hali: `pattern:/<[a-z][a-z0-9]*>/i`

    Standarda göre HTML etiket isimleri `<h1>` gibi ilk karakter dışında herhangi bir pozisyonda bir rakam içerebilir.

    ```js run
    alert( "<h1>Hi!</h1>".match(/<[a-z][a-z0-9]*>/gi) ); // <h1>
    ```

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
```
