# Promise ( Söz )

Diyelim ki çok iyi bir sanatçısınız ve fanlarınız size sabah akşam ne zaman yeni şarkılarınızın geleceğini soruyor.

<<<<<<< HEAD
Siz de biraz rahatlamak için yeni şarkı yayınladığınızda onlara göndereceğinize söz verdiniz. Onlara bir liste verdiniz ve güncellemeleri buradan yayınlayacağınızı söylediniz. Böylece onlar da kendi email adreslerini yazar ve yeni şarkılar geldiğinde hemen bunları görebilir. Diyelimki birşey yanış gitti ve yeni şarkıyı yayınlayamadınız bu şekliyle bile onlara bildirim gider.

Böylece herkes mutlu, sizi artık kimse darlamayacak, ve hiç bir yeni şarkınızı kaçırmayacaklar.
=======
To get some relief, you promise to send it to them when it's published. You give your fans a list. They can fill in their email addresses, so that when the song becomes available, all subscribed parties instantly receive it. And even if something goes very wrong, say, a fire in the studio, so that you can't publish the song, they will still be notified.

Everyone is happy: you, because the people don't crowd you anymore, and fans, because they won't miss the single.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

Bu programlamada karşılaştığımız olayların gerçek-hayattaki analojisi:

<<<<<<< HEAD
1. Zaman alan "Kod üretme". Örneğin ağ üzerinden veri yükleyen bir uygulama, yani "Şarkıcı"
2. Üretilen kodu hazır olduğunda "tüketmek isteyen" kod. Bir çok fonksiyon bu sonuca ihtiyaç duyabilir. Bu da "fanlar"'dır.
3. *promise*(söz) bir çeşif özel JavaScript objesidir. Bu obje "üreten kod" ile "tüketen kod'u" birleştirir. Bizim kurduğumuz analoji'de bu "üyelik listesi"'ne denk gelir. "Kod üreten"'in ne kadar sürede üreteceği belli değildir.  Bu söz hazır olduğunda tüm üyelere bunu bildirir.
=======
1. A "producing code" that does something and takes time. For instance, some code that loads the data over a network. That's a "singer".
2. A "consuming code" that wants the result of the "producing code" once it's ready. Many functions  may need that result. These are the "fans".
3. A *promise* is a special JavaScript object that links the "producing code" and the "consuming code" together. In terms of our analogy: this is the "subscription list". The "producing code" takes whatever time it needs to produce the promised result, and the "promise" makes that result available to all of the subscribed code when it's ready.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

Bu analoji tam olarak doğru değildir, aslında JavaScript promise'leri üyelik listesinden çok daha karmaşıktır: Bazı ek özellikleri ve sınırlılıkları mevcuttur. Fakat başlangıç olarak iyi diyebiliriz.

Promise objesinin yapıcı yazımı şu şekildedir:

```js
let promise = new Promise(function(resolve, reject) {
  // çalıştırıcı (üretici kod, "şarkıcı")
});
```
`new Promise`'e gönderilen fonksiyona *çalıştırıcı*. Promise üretildiğinde, bu çalıştırıcı otomatik olarak başlar. Bu üretici kodu kapsar, sonrasında sonuç üretilir. Yukarıdaki analojiye göre: çalıştırıcı "şarkıcı"'dır.

<<<<<<< HEAD
Sonuçlanan `promise` objesinin dahili özellikleri şu şekildedir:

- `durum` - ilk önce "bekleniyor ( pending )" sonrasında "yerine getirildi" veya "red edildi" durumuna getirilir.
- `sonuç` - ilk başlangıçta `undefined`'dır.

Çalıştırıcı işini bitirdiğinde, aşağıdaki fonksiyonları belirtilen argümanlar ile çağırmalıdır:

- `resolve(value)` — işin başarılı bir şekilde bittiğini belirtir:
    -  `state`'i `"fulfilled"`'e ayarlar,
    - `result`'ı  `value`'a ayarlar.
- `reject(error)` — bir hata olduğunu belirtir:
    -  `state`'i  `"rejected"`'e ayarlar,
    -  `result`'ı `error`'a ayarlar.

![](promise-resolve-reject.svg)

Sonra bu değişikliklerin "fanlara" nasıl bildirildiğini göreceğiz.

Aşağıda basit bir Promise yapıcısı ve "üretici kod"'lu bir çalıştırıcı göreceksiniz ( `setTimeout` )
=======
The function passed to `new Promise` is called the *executor*. When `new Promise` is created, the executor runs automatically. It contains the producing code which should eventually produce the result. In terms of the analogy above: the executor is the "singer".

Its arguments `resolve` and `reject` are callbacks provided by JavaScript itself. Our code is only inside the executor.

When the executor obtains the result, be it soon or late, doesn't matter, it should call one of these callbacks:

- `resolve(value)` — if the job finished successfully, with result `value`.
- `reject(error)` — if an error occurred, `error` is the error object.

So to summarize: the executor runs automatically and attempts to perform a job. When it is finished with the attempt it calls `resolve` if it was successful or `reject` if there was an error.

The `promise` object returned by the `new Promise` constructor has these internal properties:

- `state` — initially `"pending"`, then changes to either `"fulfilled"` when `resolve` is called or `"rejected"` when `reject` is called.
- `result` — initially `undefined`, then changes to `value` when `resolve(value)` called or `error` when `reject(error)` is called.

So the executor eventually moves `promise` to one of these states:

![](promise-resolve-reject.svg)

Later we'll see how "fans" can subscribe to these changes.

Here's an example of a promise constructor and a simple executor function with  "producing code" that takes time (via `setTimeout`):
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

```js run
let promise = new Promise(function(resolve, reject) {
  // Fonksiyon Promise oluşturulduğunda otomatik olarak başlar.
  // Başladıktan bir sn sonra "done" yazarak işi bitirir.
  setTimeout(() => *!*resolve("done")*/!*, 1000);
});
```
Yukarıdaki kodun çalışması hakkında iki şey söyleyebiliriz:
1. Çalıştırıcı otomatik olarak çağrıldı ve hemen başladı.
2. Çalıştırıcı `resolve` ve `reject` adında iki argüman alır. Bu fonksiyonlar JavaScript motoru tarafından ön tanımlıdır. Bunları tekrar oluşturmaya gerek yok. Sadece hazır olduğunda çağırmamız yeterlidir.

<<<<<<< HEAD
"işliyor" durumundan bir sn sonra çalıştırıcı "resolve("done")`'ı çağırır ve sonucu üretir:

![](promise-resolve-1.svg)

İşlem başarılı bir şekilde tamamlandığındna dolayı, "söz yerine getirildi".
=======
We can see two things by running the code above:

1. The executor is called automatically and immediately (by `new Promise`).
2. The executor receives two arguments: `resolve` and `reject`. These functions are pre-defined by the JavaScript engine, so we don't need to create them. We should only call one of them when ready.

    After one second of "processing" the executor calls `resolve("done")` to produce the result. This changes the state of the `promise` object:

    ![](promise-resolve-1.svg)
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

Aşağıda ise sözü hata ile reddeden bir çalıştırıcı örneği görülmektedir:

```js
let promise = new Promise(function(resolve, reject) {
  // çalışmaya başladıktan bir sn sonra iş hata ile sonuçlandı.
  setTimeout(() => *!*reject(new Error("Whoops!"))*/!*, 1000);
});
```

<<<<<<< HEAD
![](promise-reject-1.svg)

Özetlemek gerekirse çalıştırıcı ( bir süre alabilir ) işi bittikten sonra `resolve` veya `reject`'i çağırarak gerekli Promise objesinin durumunu değiştirir.

`resolve` edilmiş veya `reject` edilmiş Promise(Söz) objesine "yerleşmiş" denilir. Daha öncesinde ise bu durum "pending"(askıda) idi.

````smart header="Sadece tek bir sonuç veya hata olabilir"
Çalıştırıcı sadece bir `çözüm` veya bir `red`'i çağırmalıdır. Söz'ün durumu değişikliği son olur.

Bundan sonraki her türlü `çözüm` veya `red` görmezden gelinir:
=======
The call to `reject(...)` moves the promise object to `"rejected"` state:

![](promise-reject-1.svg)

To summarize, the executor should perform a job (usually something that takes time) and then call `resolve` or `reject` to change the state of the corresponding promise object.

A promise that is either resolved or rejected is called "settled", as opposed to an initially "pending" promise.

````smart header="There can be only a single result or an error"
The executor should call only one `resolve` or one `reject`. Any state change is final.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5


```js
let promise = new Promise(function(resolve, reject) {
*!*
  resolve("done");
*/!*

  reject(new Error("…")); // önemsenmez
  setTimeout(() => resolve("…")); // önemsenmez
});
```
Buradaki fikir çalıştırıcının sadece bir tane sonuç veya bir tane hata dönmesi üzerinedir.

Ayrıca `çözüm`/`red` sadece bir tane (veya hiç) argüman kabul eder ve geri kalanlarını önemsemez.
````

<<<<<<< HEAD
```smart header="`Error` objesi ile reddetme"
Bazı durumlar beklenmediği gibi gidebilir. Böyle durumlarda `reject`'i bir argüman ile çağırabiliriz. `Error` objesini kullanmanız daha iyi olacaktır. Bunun nedeni ileride daha açık olacaktır.
=======
```smart header="Reject with `Error` objects"
In case something goes wrong, the executor should call `reject`. That can be done with any type of argument (just like `resolve`). But it is recommended to use `Error` objects (or objects that inherit from `Error`). The reasoning for that will soon become apparent.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5
```

````smart header="Anında `çözüm`/`reject` objelerinin çağırılması"
Prakikte, çalıştırıcı genelde asenkron çalışır ve `çözüm`/`red`'den bir tanesini bir süre sonra çağırır, aslında çağırmasa da olur. Bunun yerine doğrudan `çözüm` veya `redded` çağrılabilir. Örneğin:

```js
let promise = new Promise(function(resolve, reject) {
  // Hiç zaman almadan 
  resolve(123); // Anında sonucu bu şekilde verebiliriz
});
```

<<<<<<< HEAD
Bu durum işe başladığınızda fakat sonrasında değişen birşey olmadığının görünüp hiç çalışmadan gönderilmek istendiğinde gerçekleştirilebilir.
=======
For instance, this might happen when we start to do a job but then see that everything has already been completed and cached.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

Bu aslında iyi bir çözüm. Böylece söz hemen çözülmüş olur.
````

<<<<<<< HEAD
```smart header="`state`(durum) ve `result`(sonuç) dahilidir"
Promise objesinin `durum` ve `sonuç` özellikleri dahilidir. Bundan dolayı "tüketici kod" içerisinden doğrudan erişemeyiz. Bunun yerine `.then`/`.catch`/`.finally` gibi metodları kullanırız. Aşağıda bunlar açıklanmaktadır.
=======
```smart header="The `state` and `result` are internal"
The properties `state` and `result` of the Promise object are internal. We can't directly access them. We can use the methods `.then`/`.catch`/`.finally` for that. They are described below.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5
```

## Tüketiciler: then, catch, finally

Promise(Söz objesi) çalıştırıcı("üretici kod", "şarkıcı") ve tüketici("fanlar") arasında bir bağ oluşturur, bu sonuç veya hata objesi bekler. Tüketici fonksiyonlar `.then`, `.catch` ve `.finally` ile kayıt olabilirler.

### then

En önemli ve temel olan `then`'dir.

Yazımı:

```js
promise.then(
  function(result) { *!*/* başarılı bir sonucu işle */*/!* },
  function(error) { *!*/* hayatı işle */*/!* }
);
```
`.then`'in ilk argümanı:

<<<<<<< HEAD
1. Promise sonuca ulaştığında çalışır.
2. Sonucu alır.

İkinci argümanı:

1. Söz reddedildiğinde
2. Hata alır.

Örneğin, aşağıdaki başarılı bir şekilde çözülen söz örneği:
=======
The first argument of `.then` is a function that runs when the promise is resolved, and receives the result.

The second argument of `.then` is a function that runs when the promise is rejected, and receives the error.

For instance, here's a reaction to a successfully resolved promise:
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// çözüm .then'in ilk fonksiyonunda çalışır.
promise.then(
*!*
  result => alert(result), //  1 sn sonra "done!" ekrana basılır
*/!*
  error => alert(error) // çalışmaz
);
```
İlk fonksiyon çalıştı.

<<<<<<< HEAD
Red durumunda ikincisi çalışır:
=======
The first function was executed.

And in the case of a rejection, the second one:
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// red .then'in ikinci fonksiyonunda çalışır.
promise.then(
  result => alert(result), // çalışmaz
*!*
  error => alert(error) //  "Error: Whoops!" 1 sn sonra ekrana basılır.
*/!*
);
```
Sadece başarılı bir şekilde tamamlanması ile ilgileniyorsanız, `.then`'e sadece bir tane fonksiyon vermeniz yeterlidir:

```js run
let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

*!*
promise.then(alert); // 1 sn sonra "done!" ekrana basılır.
*/!*
```

### catch
Sadece hatalar ile ilgileniyorsanız, ilk argüman için `null` kullanabilirsiniz: `.then(null, errorHandlingFunction)`. Veya `.catch(errorHandlingFunction)`'da kullanabilirsiniz, bu da şu şekilde olur:


```js run
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

*!*
// .catch(f) ile promise.then(null, f) aynıdır
promise.catch(alert); // 1 sn sonra "Error: Whoops!" ekrana basılır.
*/!*
```
`.catch(f)` ile `.then(null, f)` aynı anlama gelmektedir. Birincisi sadece  kısa yazım.

### finally

`try{...} catch {...}`'de `finally` olduğu gibi sözlerde de `finally` bulunmaktadır.

<<<<<<< HEAD
`.finally(f)` çağrısı `.then(f,f)`'ye benzemektedir. Söz yerine getirildiğinde, ister çözüm veya ret olsun, bu fonksiyon çalışır.
=======
The call `.finally(f)` is similar to `.then(f, f)` in the sense that `f` always runs when the promise is settled: be it resolve or reject.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

`finally` temizlik için oldukça iyi bir işleyicidir. Örneğin yükleniyor belirtecinin durdurulması gibi. En nihayetinde olumlu veya olumsuz olarak söz tamamlanmıştır.

Aşağıdaki gibi:

```js
new Promise((resolve, reject) => {
  /* zaman alan bir iş yap ve çözüm/red'i çağır. */
})
*!*
  // Söz herhangi bir şekilde tamamlandığında çalıştır.
  .finally(() => stop loading indicator)
  // so the loading indicator is always stopped before we process the result/error
*/!*
  .then(result => show result, err => show error)
```

<<<<<<< HEAD
Aslında doğrudan `then(f,f)` ile aynı diyemeyiz. Bazı önemli farklılıklar bulunmaktadır:
=======
That said, `finally(f)` isn't exactly an alias of `then(f,f)` though. There are few subtle differences:
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

1. `finally` işleyicisinin argümanı bulunmamaktadır. `finally` bloğunda sözün başarılı veya başarısız olduğunu bilemeyiz. Bu bir problem değil çünkü en sonunda "genel" bir bitirme prosedürü gerçekleştirmek yeterlidir.
2. `finally` işleyicisi sonuç veya hata işleyicisine geçirgendir

    Örneğin aşağıda `finally`'den `then`'e geçmiş bir sonuç görülmektedir:
    ```js run
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("result"), 2000)
    })
      .finally(() => alert("Promise ready"))
      .then(result => alert(result)); // <-- .then sonuçları işler
    ```
    Burada ise sözde bir problem meydana gelmektedir, `finally`'den `catch` bloğuna geçmektedir:
    
    ```js run
    new Promise((resolve, reject) => {
      throw new Error("error");
    })
      .finally(() => alert("Promise ready"))
<<<<<<< HEAD
      .catch(err => alert(err));  // <-- .catch hata objesini işler.
    ```  
    Aslında bu çok uygun, çünkü `finally` içerisinde sözün sonucunu işleme gibi bir niyetimiz yok. Bunları üzerinden geçirse yeterli.
    
    Promiseler ve bunların zincirlemesi hakkında ilerleyen konularda daha derin bilgi verilecektir.
    
3. `finally(f)` kullanmak yazım olarak `.then(f,f)`'den daha uygundur çünkü `f` fonksiyonunu tekrar yazmanıza gerek kalmaz.

````smart header="Bitmiş sözün işleyicilerini anında çalıştırtırma"
Eğer bir söz bekleme durumunda ise `.then/catch/finally` işleyicileri sonuç için beklerler. Diğer türlü, söz bittiğinde, anında çalıştırılır:

```js run
// anında biten söz
=======
      .catch(err => alert(err));  // <-- .catch handles the error object
    ```

That's very convenient, because `finally` is not meant to process a promise result. So it passes it through.

We'll talk more about promise chaining and result-passing between handlers in the next chapter.


````smart header="We can attach handlers to settled promises"
If a promise is pending, `.then/catch/finally` handlers wait for it. Otherwise, if a promise has already settled, they just run:

```js run
// the promise becomes resolved immediately upon creation
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5
let promise = new Promise(resolve => resolve("done!"));

promise.then(alert); // done! (hemen görünür)
```
<<<<<<< HEAD
`.then` işleyicisi her türlü çalışır, söz zaman alsa da anında bitse de önemli değil.
=======

Note that this makes promises more powerful than the real life "subscription list" scenario. If the singer has already released their song and then a person signs up on the subscription list, they probably won't receive that song. Subscriptions in real life must be done prior to the event.

Promises are more flexible. We can add handlers any time: if the result is already there, they just execute.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5
````
Bir sonraki bölümde, sözlerin nasıl asenkron kod yazarken işimize yarayabileceği üzerinde duralım.

<<<<<<< HEAD
## Örnek: loadScript [#loadscript]
=======
Next, let's see more practical examples of how promises can help us write asynchronous code.

## Example: loadScript [#loadscript]
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

Bir önceki bölümden kodu yükleyen `loadScript` kodunu alalım.

Aşağıda callback fonksiyonu ile yazılmış versiyonu hatırlama amaçlı aşağıya yazılmıştır:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}
```
Söz kullanarak bunları tekrar yazmaya çalışalım.

Yeni `loadScript` fonksiyonu callback'e ihtiyaç duymayacaktır. Bunun yerine yüklenme tamamlandığında Promise objesi dönecektir. Dıştaki kod `.then` kullanarak başka işleyiciler ekleyebilir:

```js run
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}
```

Kullanım:

```js run
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('Another handler...'));
```
callback tarzı yazmadan daha iyi olan bir kaç özellik hemen görülebilir:

| Promises | Callbacks |
|----------|-----------|
| Söz ile işlemler doğal sırası dahilinde gerçekleşir. Önce `loadScript(script)` çalıştırılır, sonra `then` ile sonuç işlenir. | `loadScript` çalışmadan önce sonuç ile ne yapılacağı bilinmelidir. |
| `.then` fonksiyonunu bir sözde istediğimiz kadar kullanabiliriz. Her defasında listeye "yeni fan" eklenebilir.Bunun ile ilgili bir sonraki bölüme bakılabilir: [](info:promise-chaining). | Sadece bir tane callback olmalı. |

<<<<<<< HEAD
Söz bize daha iyi bir akış ve esneklik sağlamaktadır.Bir sonraki bölümde diğer yararlarını da göreceğiz.
=======
So promises give us better code flow and flexibility. But there's more. We'll see that in the next chapters.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5
