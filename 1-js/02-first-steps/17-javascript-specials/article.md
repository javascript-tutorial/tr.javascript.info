# JavaScript incelikleri

Bu bölümde kısaca JavaScript dilinde hali hazırda öğrendiğiniz fakat özellikle dikkat etmeniz gereken inceliklerden bahsedilecektir.

## Kod Yapısı

Cümleler birbirinden noktalı virgül ile ayrılır:

```js run no-beautify
alert('Merhaba'); alert('Dünya');
```

Genelde, yeni satıra geçmekte noktalı virgül görevi görür. Bundan dolayı aşağıdaki kod da çalışır:

```js run no-beautify
alert('Merhaba')
alert('Dünya')
```
Buna "otomatik noktalı virgül koyma" denir. Bazen çalışmaz, örneğin:

```js run
alert("Bu mesajdan sonra hata verecek")

[1, 2].forEach(alert)
```

Çoğu kod klavuzu her cümlenizin sonuna noktalı virgül kullanmanız gerektiği kanısındadır.

Noktalı virgüller `{..}` kod bloğu sonunda gerekli değildir, örneğin döngüler:

```js
function f() {
  // fonksiyon tanımından sonra noktalı virgül yazılmaz
}

for(;;) {
  // döngüden sonra noktalı virgül yazılmaz
}
```
... Diyelim ki yine de noktalı virgül koymak istediniz. Bu bir hata değildir, önemsenmez.

Daha fazlasına <info:structure> bölümünden bakabilirsiniz.

## Sıkı Mod

JavaScript'in tüm modern özelliklerini kullanabilmek için, `"use strict"` kullanmanız gerekmektedir.

```js
'use strict';

...
```
Bu talimatı dosyanın başında veya fonksiyonun başında belirtmeniz gerekmektedir.

`"use strict"` kullanmadan da her şey çalışır. Fakat eski tipte ve uyumluluk modunda çalışır. Modern davranışı seçerseniz böylece son yenilikleri uyumluluk modu olmadan da çalıştırabilirsiniz.

Bazı modern özellikler ise uyumluluk modunda da çalışmaz sadece sıkı modda çalışır. Bunlara ilerleyen zamanlarda değinilecektir.
Dahası için: <info:strict-mode>.

## Değişkenler

Şu şekillerde tanımlanabilir:

- `let`
- `const` (sabit, değiştirilemez)
- `var` (eski tip)

Değişkenler isimlendirilirken aşağıdakileri içerebilir:
- Harf ve sayıları içerebilir fakat ilk karakter sayı olamaz.
- `$` ve `_` gibi karakterler diğer karakterle aynı niteliktedir ve her yerde kullanılabilir.
- Latin olmayan yani Arapça, Japonca, Çince gibi diller de kullanılabilir fakat genelde kullanılmaz. 

Değişkenler dinamik yazıma sahiptir ve her şeyi tutabilirler:

```js
let x = 5;
x = "Ahmet";
```

7 çeşit veri tipi bulunmaktadır:

- `number` ( sayı ) floating-point ve doğal sayılar için kullanılır.
- `string` (karakter dizileri),
- `boolean` Mantıksal değerler için `dogru/yanlis`,
- `null` -- sadece `null` değerini tutar ve bu da "boş" veya "varolmayan" anlamına gelir,
- `undefined` -- sadece `undefined` değerine sahiptir. Bu da "değer atanmamış" demektir,
- `object` ve `symbol` -- karmaşık veri yapıları için ve tek tanıtıcı(unique identifier) için kullanılabilir. Bu konular henüz anlatılmadı.

`typeof` operatörü değerin tipini dönderir, fakat şu hallerde hata verir:

```js
typeof null == "object" // hata verir
typeof function(){} == "function" // fonksiyonlara özel davranılır.
```

Dahası için: <info:variables> ve <info:types> konularına bakabilirsiniz.

## Etkileşim

Şu anda tarayıcıyı çalışma ortamı olarak kullandığınızdan dolayı, bazı basit arayüz fonksiyonlarını bilmekte fayda var:

[`prompt(soru[, varsayılan])`](mdn:api/Window/prompt)
: `soru` sor ve kullanıcının girdiği değeri dönder. Eğer kullanıcı "iptal" tuşuna bakarsa `null` dönder.

[`confirm(soru)`](mdn:api/Window/confirm)
: `soru` sor ve "Tamam" mı yoksa "İptal" mi diye seçenekler sun. Sonuçta seçilene göre  `true/false` dönder.

[`alert(mesaj)`](mdn:api/Window/alert)
: Mesajın çıktısını ekrana uyarı olarak ver.

tüm bo fonksiyonlar *modal* dır. Tekrara hatırlatmak gerekirse modal kullanıcının etkileşimi olana kadar kodu durdururlar. Yani kullanıcıdan cevabı beklerler.

Örneğin:

```js run
let ziyaretci = prompt("Adınız?", "İbrahim");
let cayIstermi = confirm("Biraz çay ister misiniz?");

alert( "Ziyaretçi: " + ziyaretci ); // İbrahim
alert( "Çay isteriyor mu?: " + cayIstermi ); // true
```

Dahası için: <info:alert-prompt-confirm>.

## Operatörler

JavaScript aşağıdaki operatörleri destekler:

Aritmetiksel
: Normal işlemler: `* + - /`, mod alma `%`  ve `**` üs alma için bu operatörler kullanılır.

    Eğer operandlardan birisi karakter ise diğer taraf sayı bile olsa `+` kullanıldığında bu iki değer de karakter olarak varsayılır

    ```js run
    alert( '1' + 2 ); // '12', karakter dizisi
    alert( 1 + '2' ); // '12', karakter dizisi
    ```

Değer atama
: Basit bir şekilde `a = b` şeklinde kullanılabilir. Veya birleşik olarak  `a *= 2` gibi de kullanıma sahiptir.

Bit seviyesi işlemler
: Bit seviye operatörleri şu şekilde kullanılabilir: [docs](mdn:/JavaScript/Reference/Operators/Bitwise_Operators)

Üçlü operatör
: Üç tane paremetreden oluşur: `koşul ? sonucA : sonucB`. Eğer `koşul` doğru ise `sonucA` döndürür, yanlış ise `sonucB` 

Mantıksal operatörler:
: Mantıksal VE `&&`, VEYA `||` operatörleri ile bu işlemler yapılabilir.

Karşılaştırma
: Eşitlik kontrolü `==`, farklı tipteki verileri sayıya çevirip kontrol eder. `null` ve ` undefined` hariç, bu ikisi de birbirine eşittir.

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```
    `sıkı eşitlik` operatörü `===` bu çeviriyi yapmamaktadır: farklı tipler her zaman farklı değerler ifade eder, öyleyse:

    `null` ve `undefined` değerleri özeldir: `==` şeklinde birbirlerine eşittirler. Fakat başka hiçbir değere eşit değildirler.
    Büyüktür/Küçüktür karşılaştırmasında karakter dizileri karakter karakter karşılaştırılır. Diğer tipler sayıya çevrilir.


Geri kalan operatörleri daha derin bir biçimde <info:operators>, <info:comparison>, <info:logical-operators> bölümlerinden inceleyebilirsiniz.

## Döngüler

- Şimdiye kadar 3 çeşit döngü işlendi:

    ```js
    // 1
    while (koşul) {
      ...
    }

    // 2
    do {
      ...
    } while (koşul);

    // 3
    for(let i = 0; i < 10; i++) {
      ...
    }
    ```

- `for(let...)` içinde tanımlanan değişkenler sadece döngü içerisinden erişilebilirdir. Fakat `let`i pas geçip var olan değişkeni kullanmak da mümkündür.
- Direktifler `break/continue` döngüden çıkılmasını sağlar. `label` kullanarak iç içe döngüde `break/continue` nereye dallanacağını belirleyebilirsiniz.

Detaylaına <info:while-for> bölümünden erişebilirsiniz.

İlerleyen bölümlerde döngülerin nasıl objelerle başa çıktığı üzerinde durulacaktır.

## "switch" yapısı

"switch" yapısı çoklu `if` kontrolleri yerine kullanılabilir. "switch" karşılaştırma için, sıkı karşılaştırmayı `===` kullanır.

Örneğin:
```js run
let age = prompt('Kaç yaşındasın?', 18);

switch (age) {
  case 18:
    alert("Çalışmaz"); // `prompt` ile tutulan değer sayı değil karakterdir!!!

  case "18":
    alert("Çalışır!");
    break;

  default:
    alert("Değer yukarıda bulunan koşullara uymamakta");
}
```

Detaylı bilgi için: <info:switch>.

## Fonksiyonlar

Şimdiye kadar üç faklı yolla fonksiyon yazılabileceği gösterildi:

1. Fonksiyon Tanımlama: Fonksiyon ana kod akışında.

    ```js
    function toplam(a, b) {
      let sonuc = a + b;

      return sonuc;
    }
    ```

2. Fonksiyon ifadesi: Fonksiyon ifadenin içerisinde

    ```js
    let toplam = function(a, b) {
      let sonuc = a + b;

      return sonuc;
    }
    ```
    Fonksiyon ifadesi bir `isme` sahip olabilir fakat bu `isim` sadece bu fonksiyon içinde kullanılabilir. Örneğin = `toplam = function isim(a,b)` gibi.

3. Ok fonksiyonları:

    ```js
    // ifada sağ tarafta
    let toplam = (a, b) => a + b;

    // Çoklu satır için {..} kullanılmalı ve `return` ile değerin dönderilmesi gerekmektedir:
    let toplam = (a, b) => {
      // ...
      return a + b;
    }

    // argümansız
    let selamVer = () => alert("Merhaba");

    // tek argümanlı
    let ikiyeKatla = n => n * 2;
    ```


- Fonksiyonlar yerel değişkenlere sahip olabilirler: Bu değişkenler fonksiyon gövdesinde yazılır ve sadece fonksiyon içerisinde kullanılabilir.
- Parametreler varsayılan değerlere sahip olabilirler: `function sum(a = 1, b = 2){...}`
- Fonksiyonlar her zaman bir şey döndürürler. Eğer `return` kelimesi yoksa sonuçta yine de `undefined` döner.


| Fonksiyon Tanımlama | Fonksiyon ifadesi |
|----------------------|---------------------|
| Tüm kod bloğunda görünür | kodların çalışması kendisine ulaşırsa çalışır |
|   - | isme sahip olabilir, sadece fonksiyon içerisinde çalışır |

Dahası için: <info:function-basics>, <info:function-expressions-arrows>. 

## Dahası var

Burada sadece JavaScrpt özelliklerinin kısa bir listesi verilmiştir. Şu ana kadar sadece basit anlamda bu dili inceledik. Gelecek konularda daha özel ve gelişmiş JavaScript özelliklerini inceleyebilirsiniz.
