# Sayılar

<<<<<<< HEAD
JavaScript'te tüm sayılar 64-bit formatında tutulur [IEEE-754](http://en.wikipedia.org/wiki/IEEE_754-1985), buna "double precision" da denir.

Sayılar ile ilgili bilinenlerin üzerinden tekrar geçecek olunursa.
=======
In modern JavaScript, there are two types of numbers:

1. Regular numbers in JavaScript are stored in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), also known as "double precision floating point numbers". These are numbers that we're using most of the time, and we'll talk about them in this chapter.

2. BigInt numbers represent integers of arbitrary length. They are sometimes needed because a regular integer number can't safely exceed <code>(2<sup>53</sup>-1)</code> or be less than <code>-(2<sup>53</sup>-1)</code>, as we mentioned earlier in the chapter <info:types>. As bigints are used in a few special areas, we devote them to a special chapter <info:bigint>.

So here we'll talk about regular numbers. Let's expand our knowledge of them.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Sayıyı yazmanın birçok yolu

Diyelim ki 1 milyar yazmak istiyorsunuz. Şu şekilde:

```js
let milyar = 1000000000;
```

<<<<<<< HEAD
Fakat gerçek hayatta bu kadar 0 yan yana yazdığınızda karışma şansı olduğundan bunun yerine `1milyar` veya `7.3milyar` gibi yazılabilmektedir. Aynı özellik JavaScript için de geçerli. Fakat bu defa sayıdaki 0 sayısı  `"e"` ile birlikte kullanılmalıdır: 
=======
We also can use underscore `_` as the separator:

```js
let billion = 1_000_000_000;
```

Here the underscore `_` plays the role of the "[syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar)", it makes the number more readable. The JavaScript engine simply ignores `_` between digits, so it's exactly the same one billion as above.

In real life though, we try to avoid writing long sequences of zeroes. We're too lazy for that. We'll try to write something like `"1bn"` for a billion or `"7.3bn"` for 7 billion 300 million. The same is true for most large numbers.

In JavaScript, we can shorten a number by appending the letter `"e"` to it and specifying the zeroes count:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let milyar = 1e9;  // 1 milyar 1 ve 9 sıfırdan oluşmaktadır.

<<<<<<< HEAD
alert( 7.3e9 );  // 7.3 milyar (7,300,000,000)
```

```js
1e3 = 1 * 1000
1.23e6 = 1.23 * 1000000 
```

Çok küçük bir sayıya bakıldığında. Örneğin 1 mikrosaniye ( saniyenin milyonda 1'i):
=======
alert( 7.3e9 );  // 7.3 billions (same as 7300000000 or 7_300_000_000)
```

In other words, `e` multiplies the number by `1` with the given zeroes count.

```js
1e3 === 1 * 1000; // e3 means *1000
1.23e6 === 1.23 * 1000000; // e6 means *1000000
```

Now let's write something very small. Say, 1 microsecond (one-millionth of a second):
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
let mсs = 0.000001;
```
<<<<<<< HEAD
Aynı şekilde `"e"` yardımcı olabilir. 0 ları yazmak yerine :

```js
let ms = 1e-6; // 1'in soluna 6 tane 0 
=======

Just like before, using `"e"` can help. If we'd like to avoid writing the zeroes explicitly, we could write the same as:

```js
let mcs = 1e-6; // five zeroes to the left from 1
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```
Şeklinde tanımlayabilirsiniz. `0.000001` gördüğünüz gibi 6 tane sıfır bulunmaktadır. Bundan dolayı `1e-6` şeklinde yazılabilir.

<<<<<<< HEAD

```js
// -3 demek 1'in yanında 3 tane sıfır koy ve sayıyı böl.
1e-3 = 1 / 1000 (=0.001)

// -6 demek 1'in yanına 6 tane sıfır koy ve sayıyı böl.
1.23e-6 = 1.23 / 1000000 (=0.00000123)
=======
If we count the zeroes in `0.000001`, there are 6 of them. So naturally it's `1e-6`.

In other words, a negative number after `"e"` means a division by 1 with the given number of zeroes:

```js
// -3 divides by 1 with 3 zeroes
1e-3 === 1 / 1000; // 0.001

// -6 divides by 1 with 6 zeroes
1.23e-6 === 1.23 / 1000000; // 0.00000123

// an example with a bigger number
1234e-2 === 1234 / 100; // 12.34, decimal point moves 2 times
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

### HexaDecimal, binary ve octal sayılar.

[Hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) sayılar JavaScript'te çoğunlukla renklerde, karakter çevrimlerinde ve birçok alanda kullanılmaktadır. Bundan dolayı `0x` gibi kolay yazım biçimine sahiptir. Diğer türlü sayı kullanılması gerekmektedir.

Örneğin:

```js run
alert( 0xff ); // 255
alert( 0xFF ); // 255 (büyük küçük harf farkı yoktur)
```
Binary ve Octal sayı sistemleri ise çok nadir kullanılmaktadır fakat `0b` veya `0o` önekleri mevcuttur.


```js run
let a = 0b11111111; // binary 255
let b = 0o377; // octal 255

alert( a == b ); // true, iki sayı da aynıdır.
```

3 çeşit sayısal sistem desteklenmiştir. Diğer sayısal sistemler için ise `parseInt` kullanılmalıdır. 

## toString(taban)

`num.toString(base)` verilen tabana göre karakter dizisini döndürür.

Örneğin:
```js run
let sayi = 255;

alert( sayi.toString(16) );  // ff
alert( sayi.toString(2) );   // 11111111
```
`taban` `2` ile `36` arasında değişebilir. Varsayılanı `10`dur.

<<<<<<< HEAD
Genel olarak kullanımı şu şekildedir:
- **16-tabanı** hex renkler için, karakter çevrimleri için kullanılır. `0..9` ve `A..F` arası kullanılabilir.
- **2-tabanı** bit tipindeki uygulamalar için kullanılır. Sadece `0` veya `1`'dir değerlerini alabilir.
- **36-tabanı** maximum bir basamak `0..9` veya `A..Z` arası kullanılabilir. Bu da demek oluyor ki bütün latin alfabesi sayıları tanımlamak için kullnılabilir. Bu uzun sayısal bir değeri daha kısa bir değee çevirmek istendiğinde kullanılabilir. Örneğin URL kısaltma kolay bir şekilde `36-taban`'nda ifade edilebilir.
=======
The `base` can vary from `2` to `36`. By default, it's `10`.

Common use cases for this are:

- **base=16** is used for hex colors, character encodings etc, digits can be `0..9` or `A..F`.
- **base=2** is mostly for debugging bitwise operations, digits can be `0` or `1`.
- **base=36** is the maximum, digits can be `0..9` or `A..Z`. The whole Latin alphabet is used to represent a number. A funny, but useful case for `36` is when we need to turn a long numeric identifier into something shorter, for example, to make a short url. Can simply represent it in the numeral system with base `36`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="İki nokta ile metod çağırımı"
`..` şeklinde yazım, hatalı bir yazım değildir. Eğer sayı üzerinden doğrudan metod çağırılmak isteniyor ise `..` yazımı kullanılıri

Eğer tek nokta olursa:`123456.toString(36)` hata meydana gelir. Çünkü tek nokta olduğunda JavaScript ondalık sayı olarak algılar ve hata verir. Fakat bir tane daha nokta koyulursa JavaScript ondalık sayı olmadığını anladar ve doğrudan metoda gider.

<<<<<<< HEAD
Şu şekilde de yazılabilir: `(123456).toString(36)`.
=======
Also could write `(123456).toString(36)`.

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Yuvarlama

Sayılar ile yapılan önemli işlemlerden biri de yuvarlama işlemidir.

Yuvarlama işlemi için birçok dahili fonksiyon bulunmaktadır:

`Math.floor`
: Aşağı yuvarlar: `3.1`  `3` , `-1.1`  `-2` olur.

`Math.ceil`
: Yukarı yuvarlar: `3.1` `4`,  `-1.1` `-1` olur.

`Math.round`
<<<<<<< HEAD
: En yakın tam sayıya yuvarlar: `3.1`  `3`, `3.6`  `4` ve `-1.1`  `-1` olur.
=======
: Rounds to the nearest integer: `3.1` becomes `3`, `3.6` becomes `4`. In the middle cases `3.5` rounds up to `4`, and `-3.5` rounds up to `-3`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

`Math.trunc` (Internet Explorer desteklemez)
: Ondalık bölümü siler: `3.1`  `3`, `-1.1`  `-1` olur.

Tablo şeklinde aşağıdaki gibi özetlenebilir:

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.5`|  `3`    |   `4`  |    `4`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.5`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |

Bu fonksiyonlar ondalık sayılar için önünüze gelebilecek tüm farklılıkları kapsar. Fakat ya ondalık bölümden n. basamağını yuvarlamak isterseniz?

Örneğin `1.2345` diye bir sayı olsun ve bunu 2 basamağa yuvarlamak istiyorsunuz `1.23` gibi

Bunu yapmak için iki yol bulunmaktadır:

1. Çarp ve Böl.
    
    Örneğin 2. basamaktan sonrasını yuvarlamak istiyorsanız bunu  `100` ile çarpıp sonra tekrar `100` e bölerseniz istediğinizi elde etmiş olursunuz.
    
    ```js run
    let num = 1.23456;

    alert( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

2. [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) kullanarak ondalık bölümde `n` basamaktan sonrası için yuvarlama yapılabilir.

    ```js run
    let num = 12.34;
    alert( num.toFixed(1) ); // "12.3"
    ```
    Bu `Math.round` gibi tam sayıya yakınlığına göre yukarıya veya aşağıya yuvarlar:
    
    ```js run
    let num = 12.36;
    alert( num.toFixed(1) ); // "12.4"
    ```

<<<<<<< HEAD
    `toFixed` karakter dizisi döndürür. Eğer ondalık bölüm argümandan kısa ise sona `0` eklenir.
    
=======
    Please note that the result of `toFixed` is a string. If the decimal part is shorter than required, zeroes are appended to the end:

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", ondalık bölüm 5 basamaklı yapılmıştır. 
    ```
    Önüne artı koyarak veya `Number()` fonksiyonunu kullaranak bunu sayıya çevirebilirsiniz: `+num.toFixed(5)`.
    
## Küsürlü hesaplama

<<<<<<< HEAD
JavaScript sayıları [IEEE-754](http://en.wikipedia.org/wiki/IEEE_754-1985) ifade edilir, bunlardan 52'si basamakları tutar. 11 tanesi ise ondalık bölümleri tutar ( tam sayılar için bu 11 bit sıfır olur) ve 1 bit işareti tutar.

Eğer sayı çok büyükse 64 bit alanın dışına çıkabilir bu da sonsuz döndürür.
=======
    We can convert it to a number using the unary plus or a `Number()` call, e.g. write `+num.toFixed(5)`.

## Imprecise calculations

Internally, a number is represented in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), so there are exactly 64 bits to store a number: 52 of them are used to store the digits, 11 of them store the position of the decimal point, and 1 bit is for the sign.

If a number is really huge, it may overflow the 64-bit storage and become a special numeric value `Infinity`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
alert( 1e500 ); // Sonsuz
```

Çok ta açık olmamakla birlikte çoğunlukla ola gelen bir problem ise küsür kaybıdır.

<<<<<<< HEAD
Aşağıdaki olayı test edin:
=======
Consider this (falsy!) equality test:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```
Doğru eğer `0.1` ile `0.2`'nin toplamının `0.3` olduğunu sanıyorsanız yanılıyorsunuz. 

Peki `0.3` değilse ne o zaman ?

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```
Yok artık! Burada yanlış karşılaştırmanın sonuçlarını gördünüz. Düşünün bir e-ticaret sitesi yapıyorsunuz. Kullanıcı `0.10₺` ve `0.20₺` lik iki tane çiklet ekledi sepetine. Sonuçta toplam `$0.30000000000000004` oldu. Sitenize gelen kişinin kafası karışacaktır.

<<<<<<< HEAD
Peki neden böyle bir şey oluyor?
=======
Ouch! Imagine you're making an e-shopping site and the visitor puts `$0.10` and `$0.20` goods into their cart. The order total will be `$0.30000000000000004`. That would surprise anyone.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Sayı hafızada binary formatta tutulur. Fakat ondalık bölümleri `0.1`, `0.2` gibi desimal sistemde çok basit gibi duran sayılar aslında bitmez bir binary forma sahiptir.

`0.1` nedir? `1` in `10` bölümünden elde edilir. Onluk sistemde kolayca gösterilir. Fakat ondalık sistemde `1/3` sonsuza kadar `0.3333(3)` şeklinde devam eder.

<<<<<<< HEAD
Öyleyse `10`'a bölüm onluk sayılarda sorun yaratmazken `3`'e bölüm sorun yaratmaktadır. Aynı neden dolayı, bu defa binary sistem , aynı şekilde sonsuza kadar gider, `2`'nin katları ile bölüm tam sonuç verecektir. Fakat `1/10` sonsuza kadar giden bir binary değer verir.
=======
```js run
alert(0.1.toString(2)); // 0.0001100110011001100110011001100110011001100110011001101
alert(0.2.toString(2)); // 0.001100110011001100110011001100110011001100110011001101
alert((0.1 + 0.2).toString(2)); // 0.0100110011001100110011001100110011001100110011001101
```

What is `0.1`? It is one divided by ten `1/10`, one-tenth. In the decimal numeral system, such numbers are easily representable. Compare it to one-third: `1/3`. It becomes an endless fraction `0.33333(3)`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Aslında *0.1* veya *0.2* tam olarak saklanamaz, tıpkı `1/3`'ün tam olarak saklanamaması gibi.

IEEE-754 bunu en yakın değere yuvarlayarak çözmektedir. Bu kurallar bizim "küçük küsürleri" görmemizi engeller.

<<<<<<< HEAD
Örneğin:
=======
The numeric format IEEE-754 solves this by rounding to the nearest possible number. These rounding rules normally don't allow us to see that "tiny precision loss", but it exists.

We can see this in action:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```
Toplandığında ise "küsür kayıpları" üst üste eklenir. Bundan dolayı `0.1 + 0.2` `0.3` etmez.

```smart header="Sadece JavaScript bu sorundan muzdarip değildir"
Bu problemler diğer programlama dillerinde de mevcuttur.

<<<<<<< HEAD
PHP, Java, C, Perl, Ruby gibi diller de aslında aynı değeri verir. Çalıştıkları sistem aynı şekilde binary(ikili) sistemdir. 
=======
That's why `0.1 + 0.2` is not exactly `0.3`.

```smart header="Not only JavaScript"
The same issue exists in many other programming languages.

PHP, Java, C, Perl, and Ruby give exactly the same result, because they are based on the same numeric format.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

Bu problemden nasıl kurtulunur? Tabi bunun için bir kaç yöntem mevcuttur:

1. [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) metodu yardımı ile yuvarlayabilirsiniz:

    ```js run
    let toplam = 0.1 + 0.2;
    alert( toplam.toFixed(2) ); // 0.30
    ```
    Unutmayın `toFixed` her zaman karakter dizisi döndürür. `.`'dan sonra 2 basamak alır. Eğer e-ticaret sistemi üzerinde çalışıyorsanız bu gerçekten kullanışlıdır çünkü sonuç `0.30` olmalıdır. Diğer hallerde önüne `+` koyarak bunu sayıya çevirebilirsiniz:
    
    ```js run
    let toplam = 0.1 + 0.2;
    alert( +toplam.toFixed(2) ); // 0.3
    ```

2. Geçici olarak sayılar tam sayıya çevrilio sonradan geri döndürülebilir. Aşağıdaki gibi çalışır:

    ```js run
    alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
    ```
    Aşağıdaki gibi çalışır `0.1 * 10 = 1` ve `0.2 * 10 = 2` sonrasında iki tam sayı hiçbir ondalık bölüm olmadan toplanır böylece küsürat kaybı ortadan kalkar.

3. Eğer e-ticaret sitesi üzerinde çalışıyorsanız. En radikal çözüm tüm küsüratları kuruş olarak kaydedip hiç küsürat kullanmamak olabilir. Fakat ya %30 indirip yapmak isterseniz? Pratikte bu kullanım çok nadirdir. Bundan dolayı yukarıdaki iki şekilde problem çözülebilir.

````smart header="Tuhaf tarafı"
Aşağıdaki kodu çalıştırın:

```js run
<<<<<<< HEAD
// Merhaba ben kendi kendine artan sayıyım.! 
=======
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // "0.30"
```

Please note that `toFixed` always returns a string. It ensures that it has 2 digits after the decimal point. That's actually convenient if we have an e-shopping and need to show `$0.30`. For other cases, we can use the unary plus to coerce it into a number:

```js run
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3
```

We also can temporarily multiply the numbers by 100 (or a bigger number) to turn them into integers, do the maths, and then divide back. Then, as we're doing maths with integers, the error somewhat decreases, but we still get it on division:

```js run
alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

So, the multiply/divide approach reduces the error, but doesn't remove it totally.

Sometimes we could try to evade fractions at all. Like if we're dealing with a shop, then we can store prices in cents instead of dollars. But what if we apply a discount of 30%? In practice, totally evading fractions is rarely possible. Just round them to cut "tails" when needed.

````smart header="The funny thing"
Try running this:

```js run
// Hello! I'm a self-increasing number!
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
alert( 9999999999999999 ); // shows 10000000000000000
```
Bu da küsürat kaybından meydana gelir. Bir sayıda 64 bit bulunmaktadır. 52 tanesi basamak tutmaktadır. Fakat bu durumda bu basamak yeterli değildir. Bundan dolayı en etkisiz basamak kaybolur.

JavaScript böyle bir durumda hata vermez. Belirli formata göre en iyi şekilde sayıyı yerleştirmeye çalışır. Fakat bu format yeterli büyüklükte değil.
````

```smart header="Sıfırlar"
Diğer bir komik olay ise `0` ve `-0`'ın varlığıdır.

<<<<<<< HEAD
İşaret bir bit ile tutulduğundan dolayı tüm sayıların `-` ve `+` lı değerleri bulunmaktadır.

Çoğu durumda bu ayrım soruna anlaşılamaz. Çünkü operatörler ikisine de aynı şekilde davranır.
```



## Testler: isFinite ve isNaN
=======
That's because a sign is represented by a single bit, so it can be set or not set for any number including a zero.

In most cases, the distinction is unnoticeable, because operators are suited to treat them as the same.
```

## Tests: isFinite and isNaN
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Hatırlarsanız iki tane özel sayı vardı.

- `Infinite` (ve `-Infinite`), bu sayı hersayıdan büyüktür, veya her sayıdan küçüktür.
- `NaN` ise bir hata göstergesidir.

Her ikisi de `number` tipine aittirler, fakat "normal" sayı değildirler. Bundan dolayı bunların kontrolü için özel fonksiyonlar bulunmaktadır.


- `isNaN(deger)` argümanı sayıya çevirir ve sayı olup olmadığını kontrol eder.

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```
<<<<<<< HEAD
    
    Bu fonksiyona ihtiyacınız var mı? Sadece === NaN kullanılsa ? Malesef ihtiyaç var. `NaN` kendi başına hiçbir şeye eşit değildir, hatta kendisine bile:
    
=======

    But do we need this function? Can't we just use the comparison `=== NaN`? Unfortunately not. The value `NaN` is unique in that it does not equal anything, including itself:

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(deger)` argümanı sayıya çevirir ve  normal sayı ise `true` değil ise `NaN/Infinity/-Infinity` döndürür:

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false,  NaN döndürür.
    alert( isFinite(Infinity) ); // false, Infinity döndürür.
    ```
Bazen `isFinite` karakterin sayı olup olmadığını kontrol için kullanılır:


```js run
let num = +prompt("Bir sayı giriniz", '');

// Infinity girmediğiniz taktirde `true` olacaktır. -Infinity diye bir sayı yoktur.
alert( isFinite(num) );
```

<<<<<<< HEAD
Aklınızda bulunsun tüm boş veya sadece boşluk tuşu ile yazılan tüm değerler `0` olarak kabul edilir `isFinite`'de bu şekilde çalışır.

```smart header="`Object.is` ile karşılaştırma"

Özel bir dahili metod olan [Object.is](mdn:js/Object/is) ile değerler `===` gibi karşılaştırılabilir. İki durum için daha güvenlidir denebilir:

1. `NaN` ile çalışır: `Object.is(NaN, NaN) === true` bu iyi
2. `0` ve `-0` farklıdır: `Object.is(0, -0) === false`,neredeyse hiç kullanılmaz, ama yinede teknik olarak farklıdırlar.
=======
Please note that an empty or a space-only string is treated as `0` in all numeric functions including `isFinite`.

````smart header="`Number.isNaN` and `Number.isFinite`"
[Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) and [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) methods are the more "strict" versions of `isNaN` and `isFinite` functions. They do not autoconvert their argument into a number, but check if it belongs to the `number` type instead.

- `Number.isNaN(value)` returns `true` if the argument belongs to the `number` type and it is `NaN`. In any other case, it returns `false`.

    ```js run
    alert( Number.isNaN(NaN) ); // true
    alert( Number.isNaN("str" / 2) ); // true

    // Note the difference:
    alert( Number.isNaN("str") ); // false, because "str" belongs to the string type, not the number type
    alert( isNaN("str") ); // true, because isNaN converts string "str" into a number and gets NaN as a result of this conversion
    ```

- `Number.isFinite(value)` returns `true` if the argument belongs to the `number` type and it is not `NaN/Infinity/-Infinity`. In any other case, it returns `false`.

    ```js run
    alert( Number.isFinite(123) ); // true
    alert( Number.isFinite(Infinity) ); // false
    alert( Number.isFinite(2 / 0) ); // false

    // Note the difference:
    alert( Number.isFinite("123") ); // false, because "123" belongs to the string type, not the number type
    alert( isFinite("123") ); // true, because isFinite converts string "123" into a number 123
    ```

In a way, `Number.isNaN` and `Number.isFinite` are simpler and more straightforward than `isNaN` and `isFinite` functions. In practice though, `isNaN` and `isFinite` are mostly used, as they're shorter to write.
````

```smart header="Comparison with `Object.is`"
There is a special built-in method `Object.is` that compares values like `===`, but is more reliable for two edge cases:

1. It works with `NaN`: `Object.is(NaN, NaN) === true`, that's a good thing.
2. Values `0` and `-0` are different: `Object.is(0, -0) === false`, technically that's correct because internally the number has a sign bit that may be different even if all other bits are zeroes.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Tüm durumlarda `Object.is(a, b)` `a === b` ile aynıdır.

<<<<<<< HEAD
Bu tür karşılaştırma genelde JavaScript içerisinde kullanılır. JavaScript içinde eğer algoritma iki değerin kesinlikle aynı olup olmadığını kontrol etmek istiyorsa `Object.is` kullanılır [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)
=======
We mention `Object.is` here, because it's often used in JavaScript specification. When an internal algorithm needs to compare two values for being exactly the same, it uses `Object.is` (internally called [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```


## parseInt ve parseFloat
`+` veya `Number()` kullanılarak sayıya çevirme sıkı bir çevirmedir. Eğer argüman sayı değilse hata verir:

```js run
alert( +"100px" ); // NaN
```
Eğer başta veya sonda boşluk varsa bunlar görmezden gelinir.

Fakat gerçek hayatta değerler, `"100px"` veya `"12pt"`  gibi birim ekleri alabilir. Birçok ülkenin para birimi sona veya başa gelir. Bundan dolayı `15₺` gibi değerler kullanıldığında önemli olan sayı bölümü olabilir.

<<<<<<< HEAD
`parseInt` ve `parseFloat` tam olarak bunlar için kullanılır.
=======
But in real life, we often have values in units, like `"100px"` or `"12pt"` in CSS. Also in many countries, the currency symbol goes after the amount, so we have `"19€"` and would like to extract a numeric value out of that.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Karakter dizisinden sayıları "okuyabildikleri kadar" okurlar. Hata olduğu durumda sayıyı dönderir. `parseInt` tam sayı dönderirken `parseFloat` küsüratlı sayı dönderir.

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, sadece tamsayı bölümü alındı
alert( parseFloat('12.3.4') ); // 12.3, birinci noktadan sonra yeniden nokta gördüğünde işlemi tamamladı
```
Eğer hiçbir basamak okunamazsa `NaN` dönderirler.

```js run
alert( parseInt('a123') ); // NaN, ilk harf işlemi durdurur.
```

````smart header="`parseInt` in ikinci argümanı : `parseInt(str,radix)`"
`parseInt` fonksiyonu isteğe bağlı olarak ikinci bir parametreye sahiptir. Bu sayı tabanını belirtir, böylece `parseInt` karakter olarak yazılmış hex sayılarını veya binary değerlerini de ayrıştırabilir.

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, 0x olmadan da çalışır

alert( parseInt('2n9c', 36) ); // 123456
```
````

## Diğer matematik fonksiyonları

JavaScript dahilinde matematiksel fonksiyonların ve sabitlerin bulunduğu küçük bir kütüphane mevcuttur. [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) 

Birkaç örnek:

`Math.random()`
<<<<<<< HEAD
:  0 ile 1 (1 dahil değil) arasında rasgele sayı üretir.
=======
: Returns a random number from 0 to 1 (not including 1).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (herhangi bir rasgele sayı)
    ```

<<<<<<< HEAD
`Math.max(a, b, c...)` / `Math.min(a, b, c...)`
: Verilen değerlerden en büyüğünü veya en küçüğünü döndüren fonksiyon
=======
`Math.max(a, b, c...)` and `Math.min(a, b, c...)`
: Returns the greatest and smallest from the arbitrary number of arguments.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

<<<<<<< HEAD
`Math.pow(n, üs)`
: `n`'in `üs`sünü döndürür.
=======
`Math.pow(n, power)`
: Returns `n` raised to the given power.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    alert( Math.pow(2, 10) ); // 2'nin 10 üssü = 1024
    ```
math objesi daha birçok fonksiyon ve sabit barındırmaktadır. Trigonometri de bunlara dahildir.  [ Math objesi dökümantasyonu](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math)

<<<<<<< HEAD
## Özet
=======
There are more functions and constants in `Math` object, including trigonometry, which you can find in the [docs for the Math object](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Büyük sayıları yazmak için:
- `"e"` nin yanına kaç tane sıfır varsa onu yazın. Örneğin : `123e6` = `123` ün yanına `6` tane 0 yaz demektir.
- `"e"` den sonra yazılan negatif sayı ise kaç tane sıfır varsa önüne bir koy ve değeri bu sayıya böl demektir. 

<<<<<<< HEAD

Farklı sayı sistemleri:
=======
To write numbers with many zeroes:

- Append `"e"` with the zeroes count to the number. Like: `123e6` is the same as `123` with 6 zeroes `123000000`.
- A negative number after `"e"` causes the number to be divided by 1 with given zeroes. E.g. `123e-6` means `0.000123` (`123` millionths).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

- Sayıları doğrudan hex olarak (`0x`), octal olarak(`0o`) veya binary(ikili) (`0b`) olarak yazmak mümkündür.
- `parseInt(str,taban) verilen tabana göre karakteri ayrıştırmaya yarar. Taban `2` ile `36` aralığında olmalıdır ( 2 ve 36 dahil)
- `num.toString(taban)` ise bir sayıyı karakter dizisine verilen tabanda yazmaya yarar. 

<<<<<<< HEAD
`12pt` ve `100px` gibi değerleri sayıya çevirme:

- `parseInt/parseFloat` hafif çevirimler için kullanılabilir, karakter görene kadar sayıları tutar ve karakter görürse tuttuklarını geri dönderir.
=======
- Can write numbers directly in hex (`0x`), octal (`0o`) and binary (`0b`) systems.
- `parseInt(str, base)` parses the string `str` into an integer in numeral system with given `base`, `2 ≤ base ≤ 36`.
- `num.toString(base)` converts a number to a string in the numeral system with the given `base`.

For regular number tests:

- `isNaN(value)` converts its argument to a number and then tests it for being `NaN`
- `Number.isNaN(value)` checks whether its argument belongs to the `number` type, and if so, tests it for being `NaN`
- `isFinite(value)` converts its argument to a number and then tests it for not being `NaN/Infinity/-Infinity`
- `Number.isFinite(value)` checks whether its argument belongs to the `number` type, and if so, tests it for not being `NaN/Infinity/-Infinity`

For converting values like `12pt` and `100px` to a number:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ondalık bölüm:

- `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` veya `num.toFixed(basamak)` kullanarak yuvarlayabilirsiniz.
- Küsüratlarda olan sorunları sayılarla çalışırken her zaman aklınızda tutmalısınız.

Daha fazla matematik fonksiyonu:

- Gerektiği zaman [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) adresinden incelenebilir. Kütüphane çok küçük olsa da basit gereksinimleri karşılar.

<<<<<<< HEAD
=======
- See the [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object when you need them. The library is very small but can cover basic needs.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
