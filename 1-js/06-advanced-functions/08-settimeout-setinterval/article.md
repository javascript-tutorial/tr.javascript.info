# Zamanlama: setTimeout ve setInterval 

Bir fonksiyon hemen çalıştırılmak istenmeyebilir, belirli bir zaman sonra çalışması istenebilir. Buna "çağrıyı zamanlama" denir.

Bunun için iki metod var:

<<<<<<< HEAD
- `setTimeout` fonksiyonu belirli bir zaman sonra çalıştırmaya yarar.
- `setInterval` fonksiyonun belirli aralıklar ile sürekli çalışmasını sağlar.
=======
- `setTimeout` allows us to run a function once after the interval of time.
- `setInterval` allows us to run a function repeatedly, starting after the interval of time, then repeating continuously at that interval.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

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
<<<<<<< HEAD
Karakter dizisi olarak fonksiyon göndermek aslında pek önerilmez, bunun yerine aşağıdaki gibi fonksiyon kullanılması daha doğrudur:
=======

But using strings is not recommended, use arrow functions instead of them, like this:
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

```js run no-beautify
setTimeout(() => alert('Merhaba'), 1000);
```

````smart header="Fonksiyon gönder fakat çalıştırma."
Yeni başlayan arkadaşlar bazen yanlışlıkla fonksiyonun sonuna `()` ekleyebilir:


```js
// yanlış!
setTimeout(selamVer(), 1000);
```
<<<<<<< HEAD

Bu çalışmaz, çünkü `setTimeout` referans bir fonksiyon beklemektedir. Burada `selamVer()` derseniz fonksiyonu çalıştırırsınız ve *bunun sonucu* `setTimeout` fonksiyonu tarafından kullanılır. Bizim durumumuzda `selamVer()` `undefined` döndürür. ( fonksiyon ile alakalı bir sorun yok ) bundan dolayı hiç birşey zamanlanmaz.
=======
That doesn't work, because `setTimeout` expects a reference to a function. And here `sayHi()` runs the function, and the *result of its execution* is passed to `setTimeout`. In our case the result of `sayHi()` is `undefined` (the function returns nothing), so nothing is scheduled.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2
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
let timerId = setTimeout(() => alert("Birşey olmayacak"), 1000);
alert(timerId); // timer identifier

clearTimeout(timerId);
alert(timerId); // same identifier (iptal ettikten sonra null olmaz)
```

`alert` çıktısından da göreceğiniz gibi timer bir id numarası ile tanımlanır. Diğer ortamlarda bu başka birşey olabilir. Örneğin Node.Js bir sayı yerine farklı metodları olan timer objesi döner.

Tekrar söylemek gerekirse üzerinde anlaşılmış bir şartname bulunmamaktadır.

Tarayıcılar için zamanlayıcılar [zamanlayıcı bölümünde](https://www.w3.org/TR/html5/webappapis.html#timers) belirtilmiştir.

## setInterval

`setInterval` `setTimeout` ile aynı yazıma sahiptir:

```js
let timerId = setInterval(func|code, delay[, arg1, arg2...])
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

<<<<<<< HEAD
Bundan dolayı eğer yukarıdi kodu çalıştırır ve iptal'e basmazsanız Firefox/IE'de bir sonraki `alert` durmadan gösterilir. Fakat Chrome/Opera/Safari'de kapatıldıktan sonra 2 sn sonra tekrar alert gelir.
```

## Tekrarlı setTimeout
=======
So if you run the code above and don't dismiss the `alert` window for some time, then the next `alert` will be shown immediately as you do it. The actual interval between alerts will be shorter than 2 seconds.
```

## Nested setTimeout
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

Bir kodu düzenli olarak çalıştırmanın iki yolu bulunmaktadır.

<<<<<<< HEAD
İlki `setInterval` diğeri ise aşağıdaki gibi kullanılan `setTimeout`:
=======
One is `setInterval`. The other one is a nested `setTimeout`, like this:
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

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

<<<<<<< HEAD
Kendini tekrar eden `setTimeout` `setInterval`'den daha esnektir. Bu şekliyle kullanıldığında bir sonraki planlanan çağrı ana çağrının durumuna göre ötelebilir veya daha geriye alınabilir.
=======
The nested `setTimeout` is a more flexible method than `setInterval`. This way the next call may be scheduled differently, depending on the results of the current one.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

Örneğin, her 5 sn'de bir sunucudan veri isteyen bir servis yazmamız gerekmektedir. Fakat sunucuya fazladan yük binerse bunun 10,20,40 sn olarak değiştirilmesi gerekmektedir.

Sözde kod aşağıdaki gibidir:
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

<<<<<<< HEAD

**Kendini tekrar eden `setTimeout` iki çağrı arasındaki süreyi garanti eder fkat `setInterval` bunu garanti etmez.**
=======
And if the functions that we're scheduling are CPU-hungry, then we can measure the time taken by the execution and plan the next call sooner or later.

**Nested `setTimeout` allows to set the delay between the executions more precisely than `setInterval`.**
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

Aşağıdaki iki kod parçacığı karşılaştırılacak olursa:

```js
let i = 1;
setInterval(function() {
  func(i++);
}, 100);
```

<<<<<<< HEAD
İkincisi tekrarlı `setTimeout` kullanmaktadır.
=======
The second one uses nested `setTimeout`:
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

```js
let i = 1;
setTimeout(function run() {
  func(i++);
  setTimeout(run, 100);
}, 100);
```

<<<<<<< HEAD
`setInterval` `func(i)` fonksiyonunu her 100ms'de bir çalıştırır.

![](setinterval-interval.svg)

Dikkatinizi çekti mi?...
=======
For `setInterval` the internal scheduler will run `func(i++)` every 100ms:

![](setinterval-interval.svg)
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2


**`func` çağrıları arasındaki geçen süre koddan daha kısa.**

Doğal olan bu aslında çünkü `func` çalıştığında bu arlığın bir kısmını harcar.

Hatta bu `func` çalışmasının bizim beklediğimiz `100ms`'den fazla olması da mümkündür.

Bu durumda JS Motoru `func` fonksiyonunun bitmesini bekler, sonra planlayıcıyı kontrol eder eğer zaman geçmişse hiç beklemeden tekrar çalıştırır.

Bu durumda ile karşılaşıldığında fonksiyon hiç beklemeden sürekli çalışır.

<<<<<<< HEAD
Aşağıda ise kendini çağıran `setTimeout` gösterilmiştir:

![](settimeout-interval.svg)

**Kendini çağıran `setTimeout` arada geçen sürenin aynı olmasını garanti eder.(burada 100ms).**
=======
And here is the picture for the nested `setTimeout`:

![](settimeout-interval.svg)

**The nested `setTimeout` guarantees the fixed delay (here 100ms).**
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

Bunun nedeni yeni çağrının önceki çağrının bitiminde hesaplanmasından dolayıdır.

<<<<<<< HEAD
````smart header="Garbage collection" ( Çöp Toplama)

Bir fonksiyon `setInterval/setTimeout`'a gönderildiğinde içeride bir referansını oluşturup zamanlayıcıya kaydeder. Bundan dolayı bu fonksiyon Çöp toplama işlemine girmez. Dışarıda hiç bir referans olmasa bile bu fonksiyon yok olmaz.
=======
````smart header="Garbage collection and setInterval/setTimeout callback"
When a function is passed in `setInterval/setTimeout`, an internal reference is created to it and saved in the scheduler. It prevents the function from being garbage collected, even if there are no other references to it.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

```js
// zamanlayıcı çağırana kadar fonksiyon hafızada kalır.
setTimeout(function() {...}, 100);
```

`setInterval` metodu için fonksiyon `cancelInterval` çağırılmadığı sürece hafızada kalır.

Bunun yan etkisi ise, dışarıdaki fonksiyondan veri almak isteyen bir fonksiyon sürekli çağırılır ve ayakta kalırsa dışarıdaki değişkenlerin de sürekliliği devam eder. Asıl bu fonksiyonun kendisinden bile fazla hafıza kaplayabilir. Öyleyse zamanlayıcı ile işiniz bittiğinde en iyisi iptal etmektir. Bu fonksiyonunuz küçük olsa bile yapılması gereken bir işlemdir.
````

## Zero delay setTimeout

`setTimeOut`'un farklı bir kullanım şekli daha bulunmakta: `setTimeout(func, 0)`

<<<<<<< HEAD
Bu `func`'ın mümkün olduğu anda zamanlanmasını sağlar. Fakat zamanlayıcı bunu sadece o anki kod işlemi bittiğinde gerçekleştirir.

Bundan dolayı zamanlayıcı o anki işin "hemen arkasından" çalışmaya başlar. Diğer bir deyişle "asenkron".
=======
This schedules the execution of `func` as soon as possible. But the scheduler will invoke it only after the currently executing script is complete.

So the function is scheduled to run "right after" the current script.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

Örneğin aşağıdaki kod önce "Merhaba" ve hemen arkasından "Dünya" yazdırır.

```js run
setTimeout(() => alert("Dünya"), 0);

alert("Merhaba");
```

<<<<<<< HEAD
İlk satırda "çağrıyı 0ms sonra sıraya koy" demektir. Fakat zamanlayıcı bunu "önce sırayı kontrol et"'ten sonra bakar yani o anki kodu çalıştırdıktan sonra. Bundan dolayı `"Merhaba"` önce yazılır `"Dünya"` sonra.

### CPU-aç görevlerin parçalanması

`setTimeout` ile CPU-aç görevlerin kullanılabilmesi şöyle bir yöntem kullanılabilir.

Örneğin, yazıların renklerini değiştiren ( şu anki sayfa gibi ) bir uygulama tam olarak CPU-aç bir uygulamadır. Analiz eder, bir çok renkli eleman yaratır, bunları dökümana ekler dosya büyüdükçe bu da gittikçe daha fazla işlemci gerektirir. Hatta tarayıcının "hang " durumuna yani tepki vermemesine kadar gidebilir, bu da kabul edilemez.

Bundan dolayı uzun metinleri ayırabiliriz. Önce 100 satır, sonra diğer bir 100 satır vs.

Daha basit bir örnekten anlatmaya çalışırsak. Bir fonksiyonunuz olsun ve `1`'den `100000000000`'a kadar saysın

Eğer kodu çalıştırırsanız işlemci tepki vermemeye başlar. Sunucu tabanlı JS kodlarında bu kolay bir şekilde fark edilebilir fakat eğer bu kodu tarayıcı üzerinde çalıştırıyorsanız diğer butonlara tıkladığınızda JavaScript'in durduğunu ve bunun bitene kadar da başka birşeyin çalışmadığını görürsünüz.

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

=======
The first line "puts the call into calendar after 0ms". But the scheduler will only "check the calendar" after the current script is complete, so `"Hello"` is first, and `"World"` -- after it.

There are also advanced browser-related use cases of zero-delay timeout, that we'll discuss in the chapter <info:event-loop>.

````smart header="Zero delay is in fact not zero (in a browser)"
In the browser, there's a limitation of how often nested timers can run. The [HTML5 standard](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers) says: "after five nested timers, the interval is forced to be at least 4 milliseconds.".

Let's demonstrate what it means with the example below. The `setTimeout` call in it re-schedules itself with zero delay. Each call remembers the real time from the previous one in the `times` array. What do the real delays look like? Let's see:
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

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

<<<<<<< HEAD
İlk zamanlayıcılar anında çalışacaktır ( dökümantasyonda yazdığı gibi ) bundan dosnra gecikmeler oyuna dahil olur. `9, 15, 20, 24...`
=======
First timers run immediately (just as written in the spec), and then we see `9, 15, 20, 24...`. The 4+ ms obligatory delay between invocations comes into play.

The similar thing happens if we use `setInterval` instead of `setTimeout`: `setInterval(f)` runs `f` few times with zero-delay, and afterwards with 4+ ms delay.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

Bu limitasyonların nedeni de yine eski zamanlara dayanmaktadır. Çoğu kod bu prensibe göre çalıştığından dolayı bu kurallar devam etmektedir.

<<<<<<< HEAD
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

Tüm zamanlama metodları tam olarak gecikmeyi *garantilemez*. Zamanlayıcıda bu varsayımın üzerine birşey inşa etmeyin.
=======
For server-side JavaScript, that limitation does not exist, and there exist other ways to schedule an immediate asynchronous job, like [setImmediate](https://nodejs.org/api/timers.html#timers_setimmediate_callback_args) for Node.js. So this note is browser-specific.
````

## Summary

- Methods `setTimeout(func, delay, ...args)` and `setInterval(func, delay, ...args)` allow us to run the `func` once/regularly after `delay` milliseconds.
- To cancel the execution, we should call `clearTimeout/clearInterval` with the value returned by `setTimeout/setInterval`.
- Nested `setTimeout` calls are a more flexible alternative to `setInterval`, allowing us to set the time *between* executions more precisely.
- Zero delay scheduling with `setTimeout(func, 0)` (the same as `setTimeout(func)`) is used to schedule the call "as soon as possible, but after the current script is complete".
- The browser limits the minimal delay for five or more nested calls of `setTimeout` or for `setInterval` (after 5th call) to 4ms. That's for historical reasons.

Please note that all scheduling methods do not *guarantee* the exact delay.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

Örneğin, tarayıcı zamanı birçok nedenden ötürü yavaşlayabilir:
- İşlemcinin yükü artarsa.
- Tarayıcının tab'ı arka plana alındıysa.
- Laptop batarya ile çalışıyorsa.

<<<<<<< HEAD
Bunların hepsi tarayıcı zamanına etki eder. Aralardaki gecikme 300ms ile 1000ms arasında değişebilir. Tabi tarayıcı ve özellikleri de bu konuda etkin rol oynar.
=======
All that may increase the minimal timer resolution (the minimal delay) to 300ms or even 1000ms depending on the browser and OS-level performance settings.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2
