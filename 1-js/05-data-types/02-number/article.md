# Sayılar

<<<<<<< HEAD
JavaScript'te tüm sayılar 64-bit formatında tutulur [IEEE-754](http://en.wikipedia.org/wiki/IEEE_754-1985), buna "double precision" da denir.

Sayılar ile ilgili bilinenlerin üzerinden tekrar geçecek olunursa.
=======
In modern JavaScript, there are two types of numbers:

1. Regular numbers in JavaScript are stored in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), also known as "double precision floating point numbers". These are numbers that we're using most of the time, and we'll talk about them in this chapter.

2. BigInt numbers, to represent integers of arbitrary length. They are sometimes needed, because a regular number can't exceed <code>2<sup>53</sup></code> or be less than <code>-2<sup>53</sup></code>. As bigints are used in few special areas, we devote them a special chapter <info:bigint>.

So here we'll talk about regular numbers. Let's expand our knowledge of them.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

## Sayıyı yazmanın bir çok yolu

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

Here the underscore `_` plays the role of the "syntactic sugar", it makes the number more readable. The JavaScript engine simply ignores `_` between digits, so it's exactly the same one billion as above.

In real life though, we try to avoid writing long sequences of zeroes. We're too lazy for that. We'll try to write something like `"1bn"` for a billion or `"7.3bn"` for 7 billion 300 million. The same is true for most large numbers.

In JavaScript, we can shorten a number by appending the letter `"e"` to it and specifying the zeroes count:
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

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
1e3 = 1 * 1000 // e3 means *1000
1.23e6 = 1.23 * 1000000 // e6 means *1000000
```

Now let's write something very small. Say, 1 microsecond (one millionth of a second):
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

```js
let ms = 0.000001;
```
<<<<<<< HEAD
Aynı şekilde `"e"` yardımcı olabilir. 0 ları yazmak yerine :
=======

Just like before, using `"e"` can help. If we'd like to avoid writing the zeroes explicitly, we could say the same as:
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

```js
let ms = 1e-6; // 1'in soluna 6 tane 0 
```
Şeklinde tanımlayabilirsiniz. `0.000001` gördüğünüz gibi 6 tane sıfır bulunmaktadır. Bundan dolayı `1e-6` şeklinde yazılabilir.


```js
// -3 demek 1'in yanında 3 tane sıfır koy ve sayıyı böl.
1e-3 = 1 / 1000 (=0.001)

// -6 demek 1'in yanına 6 tane sıfır koy ve sayıyı böl.
1.23e-6 = 1.23 / 1000000 (=0.00000123)
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

Genel olarak kullanımı şu şekildedir:
- **16-tabanı** hex renkler için, karakter çevrimleri için kullanılır. `0..9` ve `A..F` arası kullanılabilir.
- **2-tabanı** bit tipindeki uygulamalar için kullanılır. Sadece `0` veya `1`'dir değerlerini alabilir.
- **36-tabanı** maximum bir basamak `0..9` veya `A..Z` arası kullanılabilir. Bu da demek oluyor ki bütün latin alfabesi sayıları tanımlamak için kullnılabilir. Bu uzun sayısal bir değeri daha kısa bir değee çevirmek istendiğinde kullanılabilir. Örneğin URL kısaltma kolay bir şekilde `36-taban`'nda ifade edilebilir.

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="İki nokta ile metod çağırımı"
`..` şeklinde yazım, hatalı bir yazım değildir. Eğer sayı üzerinden doğrudan metod çağırılmak isteniyor ise `..` yazımı kullanılıri

Eğer tek nokta olursa:`123456.toString(36)` hata meydana gelir. Çünkü tek nokta olduğunda JavaScript ondalık sayı olarak algılar ve hata verir. Fakat bir tane daha nokta koyulursa JavaScript ondalık sayı olmadığını anladar ve doğrudan metoda gider.

Şu şekilde de yazılabilir: `(123456).toString(36)`.
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
: Rounds to the nearest integer: `3.1` becomes `3`, `3.6` becomes `4`, the middle case: `3.5` rounds up to `4` too.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

`Math.trunc` (Internet Explorer desteklemez)
: Ondalık bölümü siler: `3.1`  `3`, `-1.1`  `-1` olur.

Tablo şeklinde aşağıdaki gibi özetlenebilir:

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |

Bu fonksiyonlar ondalık sayılar için önünüze gelebilecek tüm farklılıkları kapsar. Fakat ya ondalık bölümden n. basamağını yuvarlamak isterseniz?

Örneğin `1.2345` diye bir sayı olsun ve bunu 2 basamağa yuvarlamak istiyorsunuz `1.23` gibi

Bunu yapmak için iki yol bulunmaktadır:

<<<<<<< HEAD
1. Çarp ve Böl.
    
    Örneğin 2. basamaktan sonrasını yuvarlamak istiyorsanız bunu  `100` ile çarpıp sonra tekrar `100` e bölerseniz istediğinizi elde etmiş olursunuz.
    
=======
    For example, to round the number to the 2nd digit after the decimal, we can multiply the number by `100` (or a bigger power of 10), call the rounding function and then divide it back.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69
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

    `toFixed` karakter dizisi döndürür. Eğer ondalık bölüm argümandan kısa ise sona `0` eklenir.
    
    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", ondalık bölüm 5 basamaklı yapılmıştır. 
    ```
    Önüne artı koyarak veya `Number()` fonksiyonunu kullaranak bunu sayıya çevirebilirsiniz: `+num.toFixed(5)`.
    
## Küsürlü hesaplama

JavaScript sayıları [IEEE-754](http://en.wikipedia.org/wiki/IEEE_754-1985) ifade edilir, bunlardan 52'si basamakları tutar. 11 tanesi ise ondalık bölümleri tutar ( tam sayılar için bu 11 bit sıfır olur) ve 1 bit işareti tutar.

Eğer sayı çok büyükse 64 bit alanın dışına çıkabilir bu da sonsuz döndürür.

```js run
alert( 1e500 ); // Sonsuz
```

Çok ta açık olmamakla birlikte çoğunlukla ola gelen bir problem ise küsür kaybıdır.

Aşağıdaki olayı test edin:

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
Peki neden böyle birşey oluyor?
=======
Ouch! There are more consequences than an incorrect comparison here. Imagine you're making an e-shopping site and the visitor puts `$0.10` and `$0.20` goods into their cart. The order total will be `$0.30000000000000004`. That would surprise anyone.

But why does this happen?
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

Sayı hafızada binary formatta tutulur. Fakat ondalık bölümleri `0.1`, `0.2` gibi desimal sistemde çok basit gibi duran sayılar aslında bitmez bir binary forma sahiptir.

`0.1` nedir? `1` in `10` bölümünden elde edilir. Onluk sistemde kolayca gösterilir. Fakat ondalık sistemde `1/3` sonsuza kadar `0.3333(3)` şeklinde devam eder.

Öyleyse `10`'a bölüm onluk sayılarda sorun yaratmazken `3`'e bölüm sorun yaratmaktadır. Aynı neden dolayı, bu defa binary sistem , aynı şekilde sonsuza kadar gider, `2`'nin katları ile bölüm tam sonuç verecektir. Fakat `1/10` sonsuza kadar giden bir binary değer verir.

Aslında *0.1* veya *0.2* tam olarak saklanamaz, tıpkı `1/3`'ün tam olarak saklanamaması gibi.

<<<<<<< HEAD
IEEE-754 bunu en yakın değere yuvarlayarak çözmektedir. Bu kurallar bizim "küçük küsürleri" görmemizi engeller.
=======
The numeric format IEEE-754 solves this by rounding to the nearest possible number. These rounding rules normally don't allow us to see that "tiny precision loss", but it exists.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

Örneğin:
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```
Toplandığında ise "küsür kayıpları" üst üste eklenir. Bundan dolayı `0.1 + 0.2` `0.3` etmez.

```smart header="Sadece JavaScript bu sorundan muzdarip değildir"
Bu problemler diğer programlama dillerinde de mevcuttur.

PHP, Java, C, Perl, Ruby gibi diller de aslında aynı değeri verir. Çalıştıkları sistem aynı şekilde binary(ikili) sistemdir. 
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
    Aşağıdaki gibi çalışır `0.1 * 10 = 1` ve `0.2 * 10 = 2` sonrasında iki tam sayı hiç bir ondalık bölüm olmadan toplanır böylece küsürat kaybı ortadan kalkar.

3. Eğer e-ticaret sitesi üzerinde çalışıyorsanız. En radikal çözüm tüm küsüratları kuruş olarak kaydedip hiç küsürat kullanmamak olabilir. Fakat ya %30 indirip yapmak isterseniz? Pratikte bu kullanım çok nadirdir. Bundan dolayı yukarıdaki iki şekilde problem çözülebilir.

````smart header="Tuhaf tarafı"
Aşağıdaki kodu çalıştırın:

```js run
// Merhaba ben kendi kendine artan sayıyım.! 
alert( 9999999999999999 ); // shows 10000000000000000
```
Bu da küsürat kaybından meydana gelir. Bir sayıda 64 bit bulunmaktadır. 52 tanesi basamak tutmaktadır. Fakat bu durumda bu basamak yeterli değildir. Bundan dolayı en etkisiz basamak kaybolur.

JavaScript böyle bir durumda hata vermez. Belirli formata göre en iyi şekilde sayıyı yerleştirmeye çalışır. Fakat bu format yeterli büyüklükte değil.
````

```smart header="Sıfırlar"
Diğer bir komik olay ise `0` ve `-0`'ın varlığıdır.

<<<<<<< HEAD
İşaret bir bit ile tutulduğundan dolayı tüm sayıların `-` ve `+` lı değerleri bulunmaktadır.
=======
That's because a sign is represented by a single bit, so it can be set or not set for any number including a zero.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

Çoğu durumda bu ayrım soruna anlaşılamaz. Çünkü operatörler ikisine de aynı şekilde davranır.
```

<<<<<<< HEAD


## Testler: isFinite ve isNaN
=======
## Tests: isFinite and isNaN
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

Hatırlarsanız iki tane özel sayı vardı.

- `Infinite` (ve `-Infinite`), bu sayı hersayıdan büyüktür, veya her sayıdan küçüktür.
- `NaN` ise bir hata göstergesidir.

Her ikisi de `number` tipine aittirler, fakat "normal" sayı değildirler. Bundan dolayı bunların kontrolü için özel fonksiyonlar bulunmaktadır.


- `isNaN(deger)` argümanı sayıya çevirir ve sayı olup olmadığını kontrol eder.

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```
    
    Bu fonksiyona ihtiyacınız var mı? Sadece === NaN kullanılsa ? Malesef ihtiyaç var. `NaN` kendi başına hiç bir şeye eşit değildir, hatta kendisine bile:
    
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

Aklınızda bulunsun tüm boş veya sadece boşluk tuşu ile yazılan tüm değerler `0` olarak kabul edilir `isFinite`'de bu şekilde çalışır.

```smart header="`Object.is` ile karşılaştırma"

<<<<<<< HEAD
Özel bir dahili metod olan [Object.is](mdn:js/Object/is) ile değerler `===` gibi karşılaştırılabilir. İki durum için daha güvenlidir denebilir:
=======
There is a special built-in method [`Object.is`](mdn:js/Object/is) that compares values like `===`, but is more reliable for two edge cases:
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

1. `NaN` ile çalışır: `Object.is(NaN, NaN) === true` bu iyi
2. `0` ve `-0` farklıdır: `Object.is(0, -0) === false`,neredeyse hiç kullanılmaz, ama yinede teknik olarak farklıdırlar.

Tüm durumlarda `Object.is(a, b)` `a === b` ile aynıdır.

Bu tür karşılaştırma genelde JavaScript içerisinde kullanılır. JavaScript içinde eğer algoritma iki değerin kesinlikle aynı olup olmadığını kontrol etmek istiyorsa `Object.is` kullanılır [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)
```


## parseInt ve parseFloat
`+` veya `Number()` kullanılarak sayıya çevirme sıkı bir çevirmedir. Eğer argüman sayı değilse hata verir:

```js run
alert( +"100px" ); // NaN
```
Eğer başta veya sonda boşluk varsa bunlar görmezden gelinir.

Fakat gerçek hayatta değerler, `"100px"` veya `"12pt"`  gibi birim ekleri alabilir. Birçok ülkenin para birimi sona veya başa gelir. Bundan dolayı `15₺` gibi değerler kullanıldığında önemli olan sayı bölümü olabilir.

`parseInt` ve `parseFloat` tam olarak bunlar için kullanılır.

Karakter dizisinden sayıları "okuyabildikleri kadar" okurlar. Hata olduğu durumda sayıyı dönderir. `parseInt` tam sayı dönderirken `parseFloat` küsüratlı sayı dönderir.

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, sadece tamsayı bölümü alındı
alert( parseFloat('12.3.4') ); // 12.3, birinci noktadan sonra yeniden nokta gördüğünde işlemi tamamladı
```
Eğer hiç bir basamak okunamazsa `NaN` dönderirler.

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
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (herhangi bir rasgele sayı)
    ```

`Math.max(a, b, c...)` / `Math.min(a, b, c...)`
: Verilen değerlerden en büyüğünü veya en küçüğünü döndüren fonksiyon

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
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

    ```js run
    alert( Math.pow(2, 10) ); // 2'nin 10 üssü = 1024
    ```
math objesi daha birçok fonksiyon ve sabit barındırmaktadır. Trigonometri de bunlara dahildir.  [ Math objesi dökümantasyonu](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math)

<<<<<<< HEAD
## Özet
=======
There are more functions and constants in `Math` object, including trigonometry, which you can find in the [docs for the Math object](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math).
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

Büyük sayıları yazmak için:
- `"e"` nin yanına kaç tane sıfır varsa onu yazın. Örneğin : `123e6` = `123` ün yanına `6` tane 0 yaz demektir.
- `"e"` den sonra yazılan negatif sayı ise kaç tane sıfır varsa önüne bir koy ve değeri bu sayıya böl demektir. 

<<<<<<< HEAD

Farklı sayı sistemleri:
=======
To write numbers with many zeroes:

- Append `"e"` with the zeroes count to the number. Like: `123e6` is the same as `123` with 6 zeroes `123000000`.
- A negative number after `"e"` causes the number to be divided by 1 with given zeroes. E.g. `123e-6` means `0.000123` (`123` millionths).
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

- Sayıları doğrudan hex olarak (`0x`), octal olarak(`0o`) veya binary(ikili) (`0b`) olarak yazmak mümkündür.
- `parseInt(str,taban) verilen tabana göre karakteri ayrıştırmaya yarar. Taban `2` ile `36` aralığında olmalıdır ( 2 ve 36 dahil)
- `num.toString(taban)` ise bir sayıyı karakter dizisine verilen tabanda yazmaya yarar. 

<<<<<<< HEAD
`12pt` ve `100px` gibi değerleri sayıya çevirme:
=======
- Can write numbers directly in hex (`0x`), octal (`0o`) and binary (`0b`) systems.
- `parseInt(str, base)` parses the string `str` into an integer in numeral system with given `base`, `2 ≤ base ≤ 36`.
- `num.toString(base)` converts a number to a string in the numeral system with the given `base`.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

- `parseInt/parseFloat` hafif çevirimler için kullanılabilir, karakter görene kadar sayıları tutar ve karakter görürse tuttuklarını geri dönderir.

Ondalık bölüm:

- `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` veya `num.toFixed(basamak)` kullanarak yuvarlayabilirsiniz.
- Küsüratlarda olan sorunları sayılarla çalışırken her zaman aklınızda tutmalısınız.

Daha fazla matematik fonksiyonu:

- Gerektiği zaman [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) adresinden incelenebilir. Kütüphane çok küçük olsa da basit gereksinimleri karşılar.

