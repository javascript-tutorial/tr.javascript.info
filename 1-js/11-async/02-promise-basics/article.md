# Promise ( Söz )

Diyelim ki çok iyi bir sanatçısınız ve fanlarınız size sabah akşam ne zaman yeni şarkılarınızın geleceğini soruyor.

Siz de biraz rahatlamak için yeni şarkı yayınladığınızda onlara göndereceğinize söz verdiniz. Onlara bir liste verdiniz ve güncellemeleri buradan yayınlayacağınızı söylediniz. Böylece onlar da kendi email adreslerini yazar ve yeni şarkılar geldiğinde hemen bunları görebilir. Diyelimki birşey yanış gitti ve yeni şarkıyı yayınlayamadınız bu şekliyle bile onlara bildirim gider.

Böylece herkes mutlu, sizi artık kimse darlamayacak, ve hiç bir yeni şarkınızı kaçırmayacaklar.

Bu programlamada karşılaştığımız olayların gerçek-hayattaki analojisi:

1. Zaman alan "Kod üretme". Örneğin ağ üzerinden veri yükleyen bir uygulama, yani "Şarkıcı"
2. Üretilen kodu hazır olduğunda "tüketmek isteyen" kod. Bir çok fonksiyon bu sonuca ihtiyaç duyabilir. Bu da "fanlar"'dır.
3. *promise*(söz) bir çeşif özel JavaScript objesidir. Bu obje "üreten kod" ile "tüketen kod'u" birleştirir. Bizim kurduğumuz analoji'de bu "üyelik listesi"'ne denk gelir. "Kod üreten"'in ne kadar sürede üreteceği belli değildir.  Bu söz hazır olduğunda tüm üyelere bunu bildirir.

Bu analoji tam olarak doğru değildir, aslında JavaScript promise'leri üyelik listesinden çok daha karmaşıktır: Bazı ek özellikleri ve sınırlılıkları mevcuttur. Fakat başlangıç olarak iyi diyebiliriz.

Promise objesinin yapıcı yazımı şu şekildedir:

```js
let promise = new Promise(function(resolve, reject) {
  // çalıştırıcı (üretici kod, "şarkıcı")
});
```
`new Promise`'e gönderilen fonksiyona *çalıştırıcı*. Promise üretildiğinde, bu çalıştırıcı otomatik olarak başlar. Bu üretici kodu kapsar, sonrasında sonuç üretilir. Yukarıdaki analojiye göre: çalıştırıcı "şarkıcı"'dır.

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

"işliyor" durumundan bir sn sonra çalıştırıcı "resolve("done")`'ı çağırır ve sonucu üretir:

![](promise-resolve-1.svg)

İşlem başarılı bir şekilde tamamlandığındna dolayı, "söz yerine getirildi".

Aşağıda ise sözü hata ile reddeden bir çalıştırıcı örneği görülmektedir:

```js
let promise = new Promise(function(resolve, reject) {
  // çalışmaya başladıktan bir sn sonra iş hata ile sonuçlandı.
  setTimeout(() => *!*reject(new Error("Whoops!"))*/!*, 1000);
});
```

![](promise-reject-1.svg)

Özetlemek gerekirse çalıştırıcı ( bir süre alabilir ) işi bittikten sonra `resolve` veya `reject`'i çağırarak gerekli Promise objesinin durumunu değiştirir.

`resolve` edilmiş veya `reject` edilmiş Promise(Söz) objesine "yerleşmiş" denilir. Daha öncesinde ise bu durum "pending"(askıda) idi.

````smart header="Sadece tek bir sonuç veya hata olabilir"
Çalıştırıcı sadece bir `çözüm` veya bir `red`'i çağırmalıdır. Söz'ün durumu değişikliği son olur.

Bundan sonraki her türlü `çözüm` veya `red` görmezden gelinir:


```js
let promise = new Promise(function(resolve, reject) {
  resolve("done");

  reject(new Error("…")); // önemsenmez
  setTimeout(() => resolve("…")); // önemsenmez
});
```
Buradaki fikir çalıştırıcının sadece bir tane sonuç veya bir tane hata dönmesi üzerinedir.

Ayrıca `çözüm`/`red` sadece bir tane (veya hiç) argüman kabul eder ve geri kalanlarını önemsemez.
````

```smart header="Reject with `Error` objects"
In case something goes wrong, we can call `reject` with any type of argument (just like `resolve`). But it is recommended to use `Error` objects (or objects that inherit from `Error`). The reasoning for that will soon become apparent.
```

````smart header="Anında `çözüm`/`reject` objelerinin çağırılması"
Prakikte, çalıştırıcı genelde asenkron çalışır ve `çözüm`/`red`'den bir tanesini bir süre sonra çağırır, aslında çağırmasa da olur. Bunun yerine doğrudan `çözüm` veya `redded` çağrılabilir. Örneğin:

```js
let promise = new Promise(function(resolve, reject) {
  // Hiç zaman almadan 
  resolve(123); // Anında sonucu bu şekilde verebiliriz
});
```

Bu durum işe başladığınızda fakat sonrasında değişen birşey olmadığının görünüp hiç çalışmadan gönderilmek istendiğinde gerçekleştirilebilir.

Bu aslında iyi bir çözüm. Böylece söz hemen çözülmüş olur.
````

```smart header="`state`(durum) ve `result`(sonuç) dahilidir"
Promise objesinin `durum` ve `sonuç` özellikleri dahilidir. Bundan dolayı "tüketici kod" içerisinden doğrudan erişemeyiz. Bunun yerine `.then`/`.catch`/`.finally` gibi metodları kullanırız. Aşağıda bunlar açıklanmaktadır.
```

## Consumers: then, catch, finally

A Promise object serves as a link between the executor (the "producing code" or "singer") and the consuming functions (the "fans"), which will receive the result or error. Consuming functions can be registered (subscribed) using methods `.then`, `.catch` and `.finally`.

### then

The most important, fundamental one is `.then`.

The syntax is:

```js
promise.then(
  function(result) { *!*/* handle a successful result */*/!* },
  function(error) { *!*/* handle an error */*/!* }
);
```

The first argument of `.then` is a function that:

1. runs when the promise is resolved, and
2. receives the result.

The second argument of `.then` is a function that:

1. runs when the promise is rejected, and
2. receives the error.

For instance, here's a reaction to a successfully resolved promise:

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve runs the first function in .then
promise.then(
*!*
  result => alert(result), // shows "done!" after 1 second
*/!*
  error => alert(error) // doesn't run
);
```

The first function was executed.

And in the case of a rejection -- the second one:

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject runs the second function in .then
promise.then(
  result => alert(result), // doesn't run
*!*
  error => alert(error) // shows "Error: Whoops!" after 1 second
*/!*
);
```

If we're interested only in successful completions, then we can provide only one function argument to `.then`:

```js run
let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

*!*
promise.then(alert); // shows "done!" after 1 second
*/!*
```

### catch

If we're interested only in errors, then we can use `null` as the first argument: `.then(null, errorHandlingFunction)`. Or we can use `.catch(errorHandlingFunction)`, which is exactly the same:


```js run
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

*!*
// .catch(f) is the same as promise.then(null, f)
promise.catch(alert); // shows "Error: Whoops!" after 1 second
*/!*
```

The call `.catch(f)` is a complete analog of `.then(null, f)`, it's just a shorthand.

### finally

Just like there's a `finally` clause in a regular `try {...} catch {...}`, there's `finally` in promises.

The call `.finally(f)` is similar to `.then(f, f)` in the sense that it always runs when the promise is settled: be it resolve or reject.

`finally` is a good handler for performing cleanup, e.g. stopping our loading indicators, as they are not needed anymore, no matter what the outcome is.

Like this:

```js
new Promise((resolve, reject) => {
  /* do something that takes time, and then call resolve/reject */
})
*!*
  // runs when the promise is settled, doesn't matter successfully or not
  .finally(() => stop loading indicator)
*/!*
  .then(result => show result, err => show error)
```

It's not exactly an alias of `then(f,f)` though. There are several important differences:

1. A `finally` handler has no arguments. In `finally` we don't know whether the promise is successful or not. That's all right, as our task is usually to perform "general" finalizing procedures.
2. A `finally` handler passes through results and errors to the next handler.

    For instance, here the result is passed through `finally` to `then`:
    ```js run
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("result"), 2000)
    })
      .finally(() => alert("Promise ready"))
      .then(result => alert(result)); // <-- .then handles the result
    ```

    And here there's an error in the promise, passed through `finally` to `catch`:

    ```js run
    new Promise((resolve, reject) => {
      throw new Error("error");
    })
      .finally(() => alert("Promise ready"))
      .catch(err => alert(err));  // <-- .catch handles the error object
    ```  

    That's very convenient, because `finally` is not meant to process a promise result. So it passes it through.

    We'll talk more about promise chaining and result-passing between handlers in the next chapter.

3. Last, but not least, `.finally(f)` is a more convenient syntax than `.then(f, f)`: no need to duplicate the function `f`.

````smart header="On settled promises handlers runs immediately"
If a promise is pending, `.then/catch/finally` handlers wait for the result. Otherwise, if a promise has already settled, they execute immediately:

```js run
// an immediately resolved promise
let promise = new Promise(resolve => resolve("done!"));

promise.then(alert); // done! (shows up right now)
```

The good thing is: a `.then` handler is guaranteed to run whether the promise takes time or settles it immediately.
````

Next, let's see more practical examples of how promises can help us to write asynchronous code.

## Example: loadScript [#loadscript]

We've got the `loadScript` function for loading a script from the previous chapter.

Here's the callback-based variant, just to remind us of it:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}
```

Let's rewrite it using Promises.

The new function `loadScript` will not require a callback. Instead, it will create and return a Promise object that resolves when the loading is complete. The outer code can add handlers (subscribing functions) to it using `.then`:

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

Usage:

```js run
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('One more handler to do something else!'));
```

We can immediately see a few benefits over the callback-based pattern:


| Promises | Callbacks |
|----------|-----------|
| Promises allow us to do things in the natural order. First, we run `loadScript(script)`, and `.then` we write what to do with the result. | We must have a `callback` function at our disposal when calling `loadScript(script, callback)`. In other words, we must know what to do with the result *before* `loadScript` is called. |
| We can call `.then` on a Promise as many times as we want. Each time, we're adding a new "fan", a new subscribing function, to the "subscription list". More about this in the next chapter: [](info:promise-chaining). | There can be only one callback. |

So Promises give us better code flow and flexibility. But there's more. We'll see that in the next chapters.
