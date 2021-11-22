# Tarih ve Zaman

Bu konuda yeni bir gömülmüş obje olan [Date](mdn:js/Date) anlatılacaktır. Bu obje tarihi ve saati tutar ve tarih/saat yönetimini üstlenir.

Örneğin, bu objeyi sadece saati saklama, modifiye etme için kullanabilirsiniz, veya zaman ölçümü için veya o anki zamanı göstermek için

## Yaratma

Yeni bir `Date` objesi yaratmak için `new Date()` aşağıdaki argümanların biri ile çağrılabilir.

`new Date()`
: Argümansız -- yeni o anki tarih ve saat ile yeni bir `Date` objesi oluşturur:

    ```js run
    let now = new Date();
    alert( now ); // o anki tarih/saati gösterir.
    ```

`new Date(milisaniye)`
: 1 Ocak 1970 UCT+0'dan sonra geçen milisaniye(1/1000) ile tarih oluşturulmasıdır

    ```js run
    // `0`  01.01.1970 UTC+0 demektir.
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // Buna 24 saat eklemek için, get 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```
    1 ocak 1970'den buyana geçen milisaniyeye *timestamp* ( zaman damgası ) denir.
    
    Bu tarihin en basit biçimde gösterimidir. Her türlü bu zaman damgasından yeni bir tarih oluşturmak mümkündür. Veya yine herhangi bir tarihten bu zaman damgasını `date.getTime()` ile almak mümkündür.

`new Date(tarih_metni)`
: Eğer bir argüman var ve bu da karakter dizisi ise, `Date.parse` algoritmasına göre bakılır ve uygunsa tarih oluşturulur.

    ```js run
    let date = new Date("2017-01-26");
    alert(date); // Thu Jan 26 2017 ...
    ```

`new Date(yıl, ay, gün, saat, dakika, saniye, milisaniye)`
: Yerel zamanda `Date` objesi oluşturmak için sadece ilk iki argüman zorunludur.

    Not:

    - `yıl` 4 basamaktan oluşmalıdır. `2013` olur, `98` olmaz.
    - `ay` sıfırdan başlar. Yani `0` Ocak, `11` Aralıktır.
    - `gün` parametresi girilmez ise `1` olarak kabul edilir.
    - `saat/dakika/saniye/milisaniye` değerleri girilmez ise `0` olarak kabul edilir.
    
    Örneğin:

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // Diğer değerler veirlmediği halde yine aynı sonuç alınacaktır.
    ```
    En düşün hassasiyet 1ms'dir(1/1000)

    ```js run
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```

## Tarih bileşenlerine erişim

`Date` objesinde yıla, aya vs. erişim için birçok metod bulunmaktadır. Fakat bunlar kaegorilere ayrılırsa hatırlanması daha kolay olacaktır.

[getFullYear()](mdn:js/Date/getFullYear)
: Yılı döner (4 basamaklı)

[getMonth()](mdn:js/Date/getMonth)
: Ayı döner, **0-11 arasında**.

[getDate()](mdn:js/Date/getDate)
: Ayın gününü döner, 1-31 arasındadır. İsmi aklınızı karıştırabilir.

[getHours()](mdn:js/Date/getHours), [getMinutes()](mdn:js/Date/getMinutes), [getSeconds()](mdn:js/Date/getSeconds), [getMilliseconds()](mdn:js/Date/getMilliseconds)
: Sırası ile `saat`, `dakika`, `saniye` ve `milisaniye` bilgilerini döner.

```warn header=" `getYear()` değil `getFullYear()`"

Çoğu JavaScript motoru standart olmayan `getYear()` metodunu entegre etmişlerdir. Bu metod kullanımdan kaldırılmıştır. Bazen iki basamaklı yılı dönerler. Bu metodu kullanmayın!. Bunun yerine `getFullYear()` metodunu kullanabilirsiniz.

```
Bunlara ek olarak haftanın hangi günü olduğu bilgisi de alınabilir:

[getDay()](mdn:js/Date/getDay)
: Haftanın gününü, Pazar `0` ,  Pazartesi `6` olacak şekilde alır. İlk gün her zaman pazardır. Bazı ülkelerde pazar resmi olarak ilk gün olmasa bile bu fonksiyon pazarı yine de ilk gün olarak alır.

**Yukarıdaki tüm metodlar değerlerini yerel saate göre dönerler.**

Bunun uluslararası saat için eşleri mevcuttur(UTC). Bu metodlar gün, ay, yıl vs değerlerini UTC+0'a göre dönerler:
There are also their UTC-counterparts, that return day, month, year and so on for the time zone UTC+0: [getUTCFullYear()](mdn:js/Date/getUTCFullYear),[getUTCMonth()](mdn:js/Date/getUTCMonth), [getUTCDay()](mdn:js/Date/getUTCDay). `"get"`'ten sonra  `"UTC"` ekleyerek metodlara ulaşmak mümkündür.


Eğer bulunduğunuz saat dilimi `UTC+0` dan farklıysa `getHours()` ve `getUTCHours()` arasında bir farklılık olacaktır.

```js run
// o anki yerel tarih
let date = new Date();

// yerel saat
alert( date.getHours() );

// UTC+0'daki yerel saat( Londra kış saati)
alert( date.getUTCHours() );
```

Belirtilen metodlar dışında, UTC tipi olmayan iki tane özel metod bulunmaktadır:

[getTime()](mdn:js/Date/getTime)
: Verilen tarihin zaman damgasını ( timestamp ) döndürür -- 1 Ocak 1970 UTC+0'dan itibaren geçen milisaniye

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: Yerel zaman ile UTC arasındaki farkı dakika olarak döndürür:

    ```js run
    // Eğer UTC-1'de yaşıyorsanız, çıktısı 60
    // Eğer UTC+3'de yaşıyorsanız, çıktısı -180
    alert( new Date().getTimezoneOffset() );

    ```

## Tarih bileşeninin ayarlama

Aşağıdaki metodlar tarih bileşenlerini ayarlamaya yarar:

- [`setFullYear(year [, month, date])`](mdn:js/Date/setFullYear)
- [`setMonth(month [, date])`](mdn:js/Date/setMonth)
- [`setDate(date)`](mdn:js/Date/setDate)
- [`setHours(hour [, min, sec, ms])`](mdn:js/Date/setHours)
- [`setMinutes(min [, sec, ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sec [, ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milliseconds)`](mdn:js/Date/setTime) (sets the whole date by milliseconds since 01.01.1970 UTC)

`setTime()` haricinde hepsinin `UTC` tipi de vardır, örneğin: `setUTCHours()`

Gördüğünüz gibi,`setHours` gibi bazı metodlar birden fazla bileşeni aynı anda ayarlamaya yarar. Bahsi geçmeyen bileşenlerde bir değişiklik yapılmaz.

Örneğin:

```js run
let today = new Date();

today.setHours(0);
alert(today); // bugün ve saat 0

today.setHours(0, 0, 0, 0);
alert(today); // bugün ve saniye 00:00:00.
```

## Otomatik Düzenleme

*Otomatik düzenleme* `Date` objesinin oldukça kullanışlı bir özelliğidir. Tarihi sınırın dışında ayarladığınız durumlarda otomatik olarak kendini düzeltebilir.

Örneğin:

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32 Ocak 2013 ?!?
alert(date); // ...is 1st Şubat 2013!
```
Sınırın dışındaki tarih bileşenleri otomatik olarak dağıtılır.
Ayların sınırlarını düşünmenize gerek yoktur. Bunlar `Date` objesi tarafından otomatik olarak hesaplanacaktır.

Diyelim ki "28 Şub 2016"'yı iki gün artırmak istediniz. Belki "2 Mart" belki de "1 Mart" olabilir. Bunu bizim düşünmemize gerek yoktur. Sadece iki gün ekleyin yeterli. `Date` objesi geri kalanı sizin için yapacaktır:

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1 Mar 2016
```

Bu özellik belirtilen bir süre sonrasında tekrardan tarihi almak için kullanılır. Örneğin "Şu andan 70 sn sonrası"'ni al.

```js run
let date = new Date();
date.setSeconds(tarih.getSeconds() + 70);

alert( date ); // doğru tarihi gösterir.
```
Sıfır veya negatif değer de ayarlamak mümkündür. Örneğin:


```js run
let date = new Date(2016, 0, 2); // 2 Ocak 2016

date.setDate(1); // ayın 1. günü
alert( date );

date.setDate(0); // İlk gün 1 olduğundan dolayı 0 geçen ayın son gününü verir. min day is 1, so the last day of the previous month is assumed
alert( date ); // 31 Aralık 2015
```

## Tarihten sayıya, tarih farklılığı

`Date` objesi sayıya çevrildiğinde, aynı timestamp'te olduğu gibi `date.getTime()` değerini alır:

```js run
let date = new Date();
alert(+date); // date.getTime() ile aynı şekilde milisaniye döner.
```

Önemli not: tarihler birbirinden çıkarılabilir fakat sonuç ms cinsinden olur.

Bu iki tarih arasındaki zamanı ölçmek için kullanılabilir:

```js run
let start = new Date(); // saymaya başla!

// işi yap
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // bitt

alert( `Döngü ${end - start} ms` );
```

## Date.now()

Eğer sadece zaman farkını ölçmek istiyorsanız, `Date` objesine ihtiyacınız yok.

Bunun için `Date.now()` adında bir obje bulunmakta.

Mantık olarak `new Date().getTime()` ile aynı olmasına rağmen yeni bir `Date` objesi oluşturmamaktadır. Bundan dolayı çok hızlı ve garbage collection'a yük bindirmemiş olur.

Genelde kullanışlı olduğundan veya performans özel JavaScript oyunları gibi uygulamalarda kullanılır.

Aşağıdaki daha iyidir denebilir:

```js run
*!*
let start = Date.now(); // 1 Ocak 1970'den şimdiye kadar olan zamanın ms cinsinden değeri
*/!*

// işi yap
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // done
*/!*

alert( `Döngü ${end - start} ms sürdür` ); // sadece sayılar çıkarıldı tarihler değil.
```

## Kıyaslama

Eğer çok ağır yüklü işlemler için kıyaslama yapılıyorsa, dikkatli olunmalıdır.

Örneğin, iki tarih arasındaki farkı hesaplayan iki fonksiyondan hangisinin daha hızlı olduğunu inceleyelim

```js
// tarih1 ve tarih2, hangisi işlemi daha hızlı tamamlar.
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// veya
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```
Yukarıdaki iki fonksiyon aynı işlemi yapar, fakat bir tanesi `date.getTime()` ile o tarihin ms cinsinden değerini alırken diğeri tarihin sayıya doğrudan çevrilmesine dayalı. Sonuçları her zaman aynı olacaktır.

Öyleyse hangisi daha hızlı?

Bunu ölçmek için fonksiyonları birçok defa çalıştırıp aradaki farkı öyle kontrol etmektir.

Ölçülecek olursa:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert( 'Time of diffSubtract: ' + bench(diffSubtract) + 'ms' );
alert( 'Time of diffGetTime: ' + bench(diffGetTime) + 'ms' );
```

Vay be! `getTime()` ile yapılan işlem çok daha hızlı! Bunun nedeni tip dönüşümü olmaması, böylece JavaScript motoru çok daha iyi optimize edebilmektedir.

Bir değer aldık fakat bu henüz iyi bir karşılaştırma olmadı.

Diyelim ki `karsilastirma(cikarma)` çalışırken işlemci paralelde başka bir şeyler ile uğraşıyor olsun. Bu uğraştığı işlemler `karsilastirma(tarihFarki)` zamanında bitsin.

Bu aslında oldukça gerçekçi bir senaryodur.

A pretty real scenario for a modern multi-process OS.

Sonuç olarak `karsilastirma(cikarma)` için daha az işlemci kaynağı kullanılanılır ve bu da yanlış sonuca neden olur.

**Daha güvenilir karşılaştırma yapabilmek için bu karşılaştırma paketi bir kaç defa çalıştırılmalıdır**

Aşağıda örneğini görebilirsiniz:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

*!*
// Paketi 10 defa çalışacak şekilde ayarlayın
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );
```
Modern JavaScript motorları "sıcak kod" için daha gelişmiş optimizasyon yapmaya başladılar. Bu nadiren çalışan kodlar yerine daha çok fazlaca tekrar eden kodların optimizasyonu anlamına gelmektedir. Böylece ilk çalışmalar çok ta optimize edilmezler. 

```js
// ana döngüye girmeden ısınma turu:
bench(diffSubtract);
bench(diffGetTime);

// şimdi ise karşılaştırma ( benchmark )
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="Mikro seviyede karşılaştırma yaparken daha dikkatli olunmalıdır."

Modern JavaScript motorları kod üzerinde birçok iyileştirme yaparlar. Normal kullanımdan ziyade yapay test sonuçları üzerinde değişikliklere neden olabilirler. Özellikle çok küçük karşılaştırmalarda. Bundan dolayı eğer performan sizin için çok ciddi bir konu ise, JavaScript motorlarının nasıl çalıştığını öğrenmeniz gerekmektedir. Öğrendiğinizde mikro seviyede bir karşılaştırmaya ihtiyacınız kalmayacaktır.

V8 motoru ile ilgili makaleleri <http://mrale.ph> adresinden bulabilirsiniz.
```

## Karakter dizisinden Date.parse ile tarih alma.

[Date.parse(str)](mdn:js/Date/parse) metodu karakterden tarih ayrıştırmaya yarar.

Metin formatı: `YYYY-MM-DDTHH:mm:ss.sssZ` şeklindedir, burada :

- `YYYY-MM-DD` -- tarih : yıl-ay-gün
- `"T"` karakteri ayraç.
- `HH:mm:ss.sss` -- zaman: saat:dakika:saniye.sarise şeklindedir.
- İsteğe bağlı olarak eklenen `'Z'` `+-hh:mm` şeklinde UTC'ye göre zaman ayarlamaya yarar. Varsayılan `Z` değeri UTC+0 anlamına gelir.

Daha kısa `YYYY-MM-DD` veya `YYYY-MM` hatta `YYYY` gibi şeklinde bile olabilir.

`Date.parse(str)` çağrısı verilen formatta karakterleri alır ve timestamp( 1 Ocak 1970 UTC+0'dan itibaren geçen sarise ) olarak geri döner. Eğer format doğru değilse, `NaN` döner.

Örneğin:

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (timestamp)
```
Zaman damgasından (timestamp) `new Date` objesi yaratılabilir.

```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);  
```

## Özet
- Tarih ve saat bilgisi JavaScript'te [Date](mdn:js/Date) objesiyle temsil edilir. Sadece tarih veya saadece saat bilgisiyle obje oluşturulamaz: `Date` objesi her zaman iki bilgiyi de taşır.
- Aylar 0'dan başlar. (Evet, Ocak ayı 0. aydır)
- Haftanın günü `getDate()` de 0'dan başlar (Pazar günü)
- `Date` objesi eğer belirttiğiniz tarih mevcut değilse bunu hesaplayabilir. Bu; gün, saat, ay ekleme/çıkarmak için kullanışlı bir özelliktir.
- Tarihler çıkartılabilir, aradaki fark sarise olarak döndürülür. Bunun nedeni `Date` sayıya çevrildiğinde zaman damgası olur.
- O anki zaman damgasını (timestamp) almak için `Date.now()` kullanabilirsiniz.

Diğer sistemlerin aksine, zaman damgası javascripte saniye değil sarise cinsindendir.

Eğer daha ayrıntılı zaman bilgisine erişmek istiyorsanız. JavaScript desteklemese bile çoğu sistem microsaniyeye destek verir ( saniyenin milyonda biri ). Örneğin [performance.now()](mdn:api/Performance/now) sayfanın yüklenme süresini mikrosaniye cinsinden verir.

```js run
alert(`Loading started ${performance.now()}ms ago`);
// Sonuç : Yüklemeye 4731.26000000001ms önce başladı
// .26 mikrosaniye (260 mikrosaniye)
// noktanın 3. basamağından sonraki değerler sapmadır fakat ilk 3 basamak doğrudur.
```
Node.JS `microtime` modülüne sahiptir. Teknik olarak her cihaz daha hassas tarih bilgisine ulaşabilir, sadece `Date` objesinde bu bilgiler yer almaz.