# Zamanlama: setTimeout ve setInterval 

Bir fonksiyon hemen çalıştırılmak istenmeyebilir, belirli bir zaman sonra çalışması istenebilir. Buna "çağrıyı zamanlama" denir.

Bunun için iki metod var:

- `setTimeout` fonksiyonu belirli bir zaman sonra çalıştırmaya yarar.
- `setInterval` fonksiyonun belirli aralıklar ile sürekli çalışmasını sağlar.

Bu metodlar JavaScript'in tanımları arasında yer almaz. Fakat çoğu ortam bu metodları sunar. Daha özele inecek olursak tüm tarayıcılar ve NodeJS bu metodları sağlar.


## setTimeout

Yazımı:

```js
let zamanlayiciId = setTimeout(fonk|kod, bekleme[, arg1, arg2...])
```

Parametreler:

`fonk|kod`
: Fonksiyon veya çalıştırılacak kodun karakter dizisi hali. Genelde bu fonksiyon olur. Uyumluluk dolayısıyla karakter dizisi de gönderilebilir fakat önerilmez.

`bekleme`
: Milisaniye cinsiden çalışmadan önceki bekleme süresi.(1000 ms = 1 saniye).

`arg1`, `arg2`...
: Fonksiyon için gerekli argümanlar.( IE9 öncesinde çalışmaz.)

Örneğin aşağıdaki kod `selamVer()` fonksiyonunu bir saniye sonra çalıştırır:

```js run
function selamVer() {
  alert('Selam');
}

*!*
setTimeout(selamVer, 1000);
*/!*
```

Argümanlı versiyonu:

```js run
function selamVer(ifade, kim) {
  alert( ifade + ', ' + kim );
}

*!*
setTimeout(selamVer, 1000, "Merhaba", "Ahmet"); // Merhaba, Ahmet
*/!*
```

Eğer ilk argüman karakter dizisi ise, sonrasında JavaScript bundan fonksiyon üretir.

Aşağıdaki de aynı şekilde çalışacaktır:

```js run no-beautify
setTimeout("selamVer('Merhaba')", 1000);
```
Karakter dizisi olarak fonksiyon göndermek aslında pek önerilmez, bunun yerine aşağıdaki gibi fonksiyon kullanılması daha doğrudur:

```js run no-beautify
setTimeout(() => alert('Merhaba'), 1000);
```

````smart header="Fonksiyon gönder fakat çalıştırma."
Yeni başlayan arkadaşlar bazen yanlışlıkla fonksiyonun sonuna `()` ekleyebilir:


```js
// yanlış!
setTimeout(selamVer(), 1000);
```

Bu çalışmaz, çünkü `setTimeout` referans bir fonksiyon beklemektedir. Burada `selamVer()` derseniz fonksiyonu çalıştırırsınız ve *bunun sonucu* `setTimeout` fonksiyonu tarafından kullanılır. Bizim durumumuzda `selamVer()` `undefined` döndürür. ( fonksiyon ile alakalı bir sorun yok ) bundan dolayı hiçbir şey zamanlanmaz.
````

### clearTimeout fonksiyonu ile iptal etme

`setTimeout` çağrısı "timer identifier" döner. Bu `timerId` ile zamanlayıcıyı iptal edebiliriz.

Yazımı aşağıdaki gibidir:

```js
let timerId = setTimeout(...);
clearTimeout(timerId);
```

Aşağıdaki kodda önce bir zamanlayıcı test eder sonrasında ise bunu iptal eder. Sonuç olarak hiçbir şey olmaz:


```js run no-beautify
let timerId = setTimeout(() => alert("Bir şey olmayacak"), 1000);
alert(timerId); // timer identifier

clearTimeout(timerId);
alert(timerId); // same identifier (iptal ettikten sonra null olmaz)
```

`alert` çıktısından da göreceğiniz gibi timer bir id numarası ile tanımlanır. Diğer ortamlarda bu başka bir şey olabilir. Örneğin Node.Js bir sayı yerine farklı metodları olan timer objesi döner.

Tekrar söylemek gerekirse üzerinde anlaşılmış bir şartname bulunmamaktadır.

Tarayıcılar için zamanlayıcılar [zamanlayıcı bölümünde](https://www.w3.org/TR/html5/webappapis.html#timers) belirtilmiştir.

## setInterval

`setInterval` `setTimeout` ile aynı yazıma sahiptir:

```js
let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
```

Tüm argümanlar aynı anlama gelir. Fakat `setTimeout`'a nazaran fonksiyonu sadece bir defa değil belirtilen zamanda sürekli olarak çalıştırır.

Bu zamanyalayıcı iptal etmek için `clearInterval(timerId)` kullanılmalıdır.

Aşağıdaki örnekte mesaj her iki saniyede bir gönderilecektir. 5 saniye sonunda ise durdurulur.

```js run
// her iki sn'de tekrar et
let timerId = setInterval(() => alert('tick'), 2000);

// 5 saniye sonunda durdur.
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
```

```smart header="Popup ekranında Chrome/Opera/Safari zamanı durdurur."

IE ve Firefox tarayıcılarda ekranda `alert/confirm/prompt` olduğu sürece zamanlayıcı çalışmaya devam eder, fakat Chrome, Opera ve Safari bu zamanı durdurur.

Bundan dolayı eğer yukarıdaki kodu çalıştırır ve iptal'e basmazsanız Firefox/IE'de bir sonraki `alert` durmadan gösterilir. Fakat Chrome/Opera/Safari'de kapatıldıktan sonra 2 sn sonra tekrar alert gelir.
```

## Tekrarlı setTimeout

Bir kodu düzenli olarak çalıştırmanın iki yolu bulunmaktadır.

İlki `setInterval` diğeri ise aşağıdaki gibi kullanılan `setTimeout`:

```js
/** instead of:
let timerId = setInterval(() => alert('tick'), 2000);
*/

let timerId = setTimeout(function tick() {
  alert('tick');
*!*
  timerId = setTimeout(tick, 2000); // (*)
*/!*
}, 2000);
```

`setTimeout` bir sonraki çağrıyı o anki çağrı bittiği ana planlar `(*)` 

Kendini tekrar eden `setInterval` `setTimeout`'dan daha esnektir. Bu şekliyle kullanıldığında bir sonraki planlanan çağrı ana çağrının durumuna göre ötelebilir veya daha geriye alınabilir.

Örneğin, her 5 sn'de bir sunucudan veri isteyen bir servis yazmamız gerekmektedir. Fakat sunucuya fazladan yük binerse bunun 10,20,40 sn olarak değiştirilmesi gerekmektedir.

Bahsedilen kod aşağıdaki gibidir:
```js
let delay = 5000;

let timerId = setTimeout(function request() {
  ...talep gönder...

  if (sunucu yüklenmesinden dolayı eğer talep iptal olursa) {
    // bir sonraki talep için gerekli süreyi uzat.
    delay *= 2;
  }

  timerId = setTimeout(request, delay);

}, delay);
```

Eğer CPU-aç görevleriniz varsa bu görevlerin süresini ölçüp buna göre bir çalışma planı oluşturmak mümkündür.


**Kendini tekrar eden `setInterval` iki çağrı arasındaki süreyi garanti eder fakat `setTimeout` bunu garanti etmez.**

Aşağıdaki iki kod parçacığı karşılaştırılacak olursa:

```js
let i = 1;
setInterval(function() {
  func(i);
}, 100);
```

İkincisi tekrarlı `setTimeout` kullanmaktadır.

```js
let i = 1;
setTimeout(function run() {
  func(i);
  setTimeout(run, 100);
}, 100);
```

`setInterval` `func(i)` fonksiyonunu her 100ms'de bir çalıştırır.

![](setinterval-interval.svg)

Dikkatinizi çekti mi?...


**`func` çağrıları arasındaki geçen süre koddan daha kısa.**

Doğal olan bu aslında çünkü `func` çalıştığında bu arlığın bir kısmını harcar.

Hatta bu `func` çalışmasının bizim beklediğimiz `100ms`'den fazla olması da mümkündür.

Bu durumda JS Motoru `func` fonksiyonunun bitmesini bekler, sonra planlayıcıyı kontrol eder eğer zaman geçmişse hiç beklemeden tekrar çalıştırır.

Bu durumda ile karşılaşıldığında fonksiyon hiç beklemeden sürekli çalışır.

Aşağıda ise kendini çağıran `setTimeout` gösterilmiştir:

![](settimeout-interval.svg)

**Kendini çağıran `setTimeout` arada geçen sürenin aynı olmasını garanti eder.(burada 100ms).**

Bunun nedeni yeni çağrının önceki çağrının bitiminde hesaplanmasından dolayıdır.

````smart header="Garbage collection" ( Çöp Toplama)

Bir fonksiyon `setInterval/setTimeout`'a gönderildiğinde içeride bir referansını oluşturup zamanlayıcıya kaydeder. Bundan dolayı bu fonksiyon Çöp toplama işlemine girmez. Dışarıda hiçbir referans olmasa bile bu fonksiyon yok olmaz.

```js
// zamanlayıcı çağırana kadar fonksiyon hafızada kalır.
setTimeout(function() {...}, 100);
```

`setInterval` metodu için fonksiyon `cancelInterval` çağırılmadığı sürece hafızada kalır.

Bunun yan etkisi ise, dışarıdaki fonksiyondan veri almak isteyen bir fonksiyon sürekli çağırılır ve ayakta kalırsa dışarıdaki değişkenlerin de sürekliliği devam eder. Asıl bu fonksiyonun kendisinden bile fazla hafıza kaplayabilir. Öyleyse zamanlayıcı ile işiniz bittiğinde en iyisi iptal etmektir. Bu fonksiyonunuz küçük olsa bile yapılması gereken bir işlemdir.
````

## setTimeout(...,0)

`setTimeOut`'un farklı bir kullanım şekli daha bulunmakta: `setTimeout(func, 0)`

Bu `func`'ın mümkün olduğu anda zamanlanmasını sağlar. Fakat zamanlayıcı bunu sadece o anki kod işlemi bittiğinde gerçekleştirir.

Bundan dolayı zamanlayıcı o anki işin "hemen arkasından" çalışmaya başlar. Diğer bir deyişle "asenkron".

Örneğin aşağıdaki kod önce "Merhaba" ve hemen arkasından "Dünya" yazdırır.

```js run
setTimeout(() => alert("Dünya"), 0);

alert("Merhaba");
```

İlk satırda "çağrıyı 0ms sonra sıraya koy" demektir. Fakat zamanlayıcı bunu "önce sırayı kontrol et"'ten sonra bakar yani o anki kodu çalıştırdıktan sonra. Bundan dolayı `"Merhaba"` önce yazılır `"Dünya"` sonra.

### CPU-aç görevlerin parçalanması

`setTimeout` ile CPU-aç görevlerin kullanılabilmesi şöyle bir yöntem kullanılabilir.

Örneğin, yazıların renklerini değiştiren ( şu anki sayfa gibi ) bir uygulama tam olarak CPU-aç bir uygulamadır. Analiz eder, birçok renkli eleman yaratır, bunları dökümana ekler dosya büyüdükçe bu da gittikçe daha fazla işlemci gerektirir. Hatta tarayıcının "hang " durumuna yani tepki vermemesine kadar gidebilir, bu da kabul edilemez.

Bundan dolayı uzun metinleri ayırabiliriz. Önce 100 satır, sonra diğer bir 100 satır vs.

Daha basit bir örnekten anlatmaya çalışırsak. Bir fonksiyonunuz olsun ve `1`'den `100000000000`'a kadar saysın

Eğer kodu çalıştırırsanız işlemci tepki vermemeye başlar. Sunucu tabanlı JS kodlarında bu kolay bir şekilde fark edilebilir fakat eğer bu kodu tarayıcı üzerinde çalıştırıyorsanız diğer butonlara tıkladığınızda JavaScript'in durduğunu ve bunun bitene kadar da başka bir şeyin çalışmadığını görürsünüz.

```js run
let i = 0;

let start = Date.now();

function count() {

  // yoğun bir iş
  for(let j = 0; j < 1e9; j++) {
    i++;
  }

  alert((Date.now() - start) + 'ms de tamamlandı');
}

count();
```

Hatta taryıcı "bu kodun çalışması uzun zaman alıyor" uyarısı verebilir.

Kodu `setTimeout` ile bölecek olursak:

```js run
let i = 0;

let start = Date.now();

function count() {

  // zorlu görevin bir bölümünü yap (*)
  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert((Date.now() - start) + 'ms de tamamlandı');
  } else {
    setTimeout(count, 0); // yeni çağrıyı zamanla (**)
  }

}

count();
```

Şimdi tarayıcı ekranı "sayma işlemi" gerçekleşirken tamamen çalışır durumdadır.

İşin bir bölümü şu şekilde yapılır `(*)`

1. İlk çalışma: `i=1...1000000`.
2. ikinci çalışma: `i=1000001..2000000`
3. .. bu şekilde while `i` nin `100000`'e bölünüp bölünmediğine kadar.

Eğer işlem hala bitmemişse `(**)` zamanlayıcısı tekrar çalışır.

Sayaç çalışırken duraklama yapılması JavaScript motoruna "nefes alması" ve başka iş yapabilmesi için zaman sağlar.

Dikkat edilmesi gereken nokta: `setInterval` kullanılarak ve kullanılmadan yapılan iki testin çalışma süreleri çok farklı değildir.

Bu süreleri daha da yakınlaştırabilmek için neler yapılabilir bakalım.

Zamanlamayı `count()` fonksiyonunun başına alalım:

```js run
let i = 0;

let start = Date.now();

function count() {

  // zamanlama başa taşındı
  if (i < 1e9 - 1e6) {
    setTimeout(count, 0); // yeni çağrıyı zamanla
  }

  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert((Date.now() - start) + 'ms de tamamlandı');
  }

}

count();
```

Şimdi ise `count()` ile başlıyoruz ve `count` fonksiyonunun birden fazla çağırılacağınız biliyoruz.

Çalıştırırsanız belirgin biçimde daha kısa süreceğini göreceksiniz.

````smart header="Browserdaki iç içe zamanlayıcıların arasında bulunan minimum gecikmeler"

Tarayıcıda, iç içe zamanlayıcıların kullanımına ait bir limit bulunmaktadır. [HTML5 standard](https://www.w3.org/TR/html5/webappapis.html#timers) dediğine göre: "5 iç içe zamanlayıcıdan sonra, döngü en az 4 ms durmak zorundadır."

Bunu aşağıdaki bulunan örnekte gösterelim. `setTimeout` çağrısı kendisini `0ms` sonra tekrarn çağırıyor. Her bir çağrı bir öncekinin zamanını `times` dizisinden hatırlıyor. Gecikme nasıl olacak bakalım:


```js run
let start = Date.now();
let times = [];

setTimeout(function run() {
  times.push(Date.now() - start); // bir önceki çağrıdaki gecikmeyi hatırla.

  if (start + 100 < Date.now()) alert(times); // gecikme 100ms den büyükse göster
  else setTimeout(run, 0); // değilse tekrar zamanla
}, 0);

// Çıktının örneği:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
```

İlk zamanlayıcılar anında çalışacaktır ( dökümantasyonda yazdığı gibi ) bundan dosnra gecikmeler oyuna dahil olur. `9, 15, 20, 24...`

Bu limitasyonların nedeni de yine eski zamanlara dayanmaktadır. Çoğu kod bu prensibe göre çalıştığından dolayı bu kurallar devam etmektedir.

Sunucu tabanlı JavaScript için ise bu kısıtlama geçerli değildir. Ayrıca anlık olarak asenkronron işlerin zamanlaması amacıyla başka yollar da bulunmaktadır. Örneğin [process.nextTick](https://nodejs.org/api/process.html) ve [setImmediate](https://nodejs.org/api/timers.html) gibi. Yani buradaki kısıtlamanın tarayıcı bazlı olduğu sonucunu çıkarabilirsiniz.
````

### Tarayıcının işlemesine izin vermek.

Tarayıcı taraflı kodların diğer bir yararı ise kullanıcıya progresss bar(ilerleme çubuğu) tarzında görselleri sunabilmesidir. Tarayıcı genelde "tekrar boyama" kod tekrarlandıktan sonra ( repainting) işlemi yaptığından.


Bundan dolayı diyelim ki çok büyük işler yapan bir fonksiyon olsa bile, dökümanda bulunan değişiklik bu işlem tamamlandıktan sonra gerçekleşir.

ÖrneğiN:
```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {
    for(let j = 0; j < 1e6; j++) {
      i++;
      // anlık i değerini dive yazdır. <div>
      // ( innerHTML ile ilgili daha sonraki bölümlerde konuşulacaktır.)
      progress.innerHTML = i;
    }
  }

  count();
</script>
```

Bunu çalıştıdığınızda `i`'nin değişikliği tüm sayma işlemi bittikten sonra görünür hale gelir.

eğer bunu `setTimeout` ile parçalara bölecek olursak bu defa daha güzel bir şekilde görünecektir.

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // yoğun işin bir bölümü (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e9) {
      setTimeout(count, 0);
    }

  }

  count();
</script>
```

Artık `<div>` `i` nin yükselen değerini gösterecektir.

## Özet

- `setInterval(func, delay, ...args)` ve `setTimeout(func, delay, ...args)` metodları `func`'ın düzenli olarak `delay` ms aralıklar ile çalışmasını sağlar.
- Çalışmayı durdurmak için `clearInterval/clearTimout` fonksiyonları `setInterval/setTimeout` metodundan dönen değerler ile çağırılmalıdır.
- İç içe `setTimeout` çağrısı kullanmak `setInterval`'e göre daha esnektir. Ayrıca bu şekilde *aralarda* en kısa süre beklemesini sağlar.
- 0 gecikmeli zamanlayıcı ise `setTimeout(...,0)` zamanlayıcıyı olabildiğince çabuk fakat o anki koddan sonra çağırılacak şekilde zamanlar.


`setTimeout(...,0)`'ın bazı kullanım durumları:
- CPU-aç görevleri parçalara ayırmak için, böylece kod sürekli tepki verebilir.
- Böylece görev devam ederken tarayıcının başka işlere ( ilerleme çubuğu ) zaman ayırır.

Tüm zamanlama metodları tam olarak gecikmeyi *garantilemez*. Zamanlayıcıda bu varsayımın üzerine bir şey inşa etmeyin.

Örneğin, tarayıcı zamanı birçok nedenden ötürü yavaşlayabilir:
- İşlemcinin yükü artarsa.
- Tarayıcının tab'ı arka plana alındıysa.
- Laptop batarya ile çalışıyorsa.

Bunların hepsi tarayıcı zamanına etki eder. Aralardaki gecikme 300ms ile 1000ms arasında değişebilir. Tabi tarayıcı ve özellikleri de bu konuda etkin rol oynar.
