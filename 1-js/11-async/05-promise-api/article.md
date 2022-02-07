# Promise API

<<<<<<< HEAD
`Promise`de 5 statik yöntem vardır. Kullanım durumlarını burada hızlı bir şekilde ele alacağız.

## Promise.resolve

Söz dizimi:

```js
let promise = Promise.resolve(value);
```

Verilen `value` ile çözülmüş olan bir söz verir.
Buradaki gibi:

```js
let promise = new Promise(resolve => resolve(value));
```

Yöntem zaten bir değere sahipken kullanılır. Ancal bir söz içine "sarılmış" olmasını ister.

Örneğin, `loadCached` fonksiyonu aşağıda `url`yi alır ve sonucu hatırlar. Böylece aynı URL'deki gelecekteki çağrılar hemen döndürülür.

```js
function loadCached(url) {
  let cache = loadCached.cache || (loadCached.cache = new Map());

  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

`loadCached(url).then(…)` kullanabiliriz. Çünkü fonksiyonun bir söz döndürmesi garantilidir. Amaç `Promise.resolve` `(*)` doğrultusunda hizmet eder: Arayüzünün birleşik olduğundan emin olun. `.then`den sonra her zaman `loadCached` kullanabiliriz.

## Promise.reject

Söz dizimi:

```js
let promise = Promise.reject(error);
```

`error` ile reddedilen bir söz oluşturun.

Yukarıdaki ile aynı:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

Gerçek kodda nadiren kullanılan, bütünlük için buradayız.

## Promise.all

Paralel olarak yürütülmek için birçok söz vermek isteriz ve hepsinin hazır olmasını bekleriz.

Örneğin, paralel olarak birkaç URL'yi indirin ve hepsi bittiğinde içeriği işleyin.
=======
There are 6 static methods in the `Promise` class. We'll quickly cover their use cases here.

## Promise.all

Let's say we want many promises to execute in parallel and wait until all of them are ready.

For instance, download several URLs in parallel and process the content once they are all done.
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

Bunun için `Promise.all`.

Söz dizimi:

```js
let promise = Promise.all([...promises...]);
```

<<<<<<< HEAD
Yeni bir söz alır ve bir dizi söz alır (Teknik olarak herhangi bir yinelenebilir nesne, ama çoğunlukla bir array.)

Yeni söz, listelenen tüm sözlerin yerine getirildiği ve sonuçların bir dizisine sahip olduğunda karar verir.
=======
`Promise.all` takes an array of promises (it technically can be any iterable, but is usually an array) and returns a new promise.

The new promise resolves when all listed promises are resolved, and the array of their results becomes its result.
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

Örneğin, aşağıdaki `Promise.all` 3 saniye sonra yerleşir ve sonucu `[1, 2, 3]` dizisidir:

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 sözler hazır olduğunda: her söz bir dizi üyesine katkıda bulunur
```

<<<<<<< HEAD
Lütfen göreli siparişin aynı olduğunu unutmayın. İlk sözün sözülmesi uzun sürse bile sonuçta ilk sırada yer almaktadır. 

Yayın bir hile, bir dizi iş verisini bir dizi sözle eşleştirmek ve ardından bunu `Promise.all` içine kaydırmaktır. 
=======
Please note that the order of the resulting array members is the same as in its source promises. Even though the first promise takes the longest time to resolve, it's still first in the array of results.
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

Örneğin, eğer bir dizi URL'miz varsa hepsini şöyle getirebiliriz: 


```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// Her URL'yi getirme sözüyle eşleyin
let requests = urls.map(url => fetch(url));

// Tüm işler çözülene kadar Promise.all bekler
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

<<<<<<< HEAD
Bir dizi github kullanıcısı için kullanıcı bilgilerini adlarına göre almakla ilgili daha büyük bir örnek (veya bir mal dizisini kimlikleriyle alabiliriz. Mantık aynıdır):

=======
A bigger example with fetching user information for an array of GitHub users by their names (we could fetch an array of goods by their ids, the logic is identical):
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
<<<<<<< HEAD
    // Tüm cevaplar hazır. HTTP durum kodlarını gösterebiliriz
=======
    // all responses are resolved successfully
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // Her URL için 200 gösterir
    }

    return responses;
  })
<<<<<<< HEAD
  // Yanıt dizisini, içeriğini okumak için response.json() dizisine eşleyin
=======
  // map array of responses into an array of response.json() to read their content
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6
  .then(responses => Promise.all(responses.map(r => r.json())))
  // Tüm JSON cevapları ayrıştırılır: "users" bunların dizisidir.
  .then(users => users.forEach(user => alert(user.name)));
```

<<<<<<< HEAD
**Eğer sözlerden herhangi biri ret edildiyse  `Promise.all` bu hatayı hemen ret eder**
=======
**If any of the promises is rejected, the promise returned by `Promise.all` immediately rejects with that error.**
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

Örneğin: 

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
```

<<<<<<< HEAD
İşte ikinci söz iki saniye içinde reddediyor. Bu `Promise.all`un hemen reddedilmesine yol açar, bu yüzden `.catch` çalıştırır: reddedilme hatası tüm `Promise.all`un sonucudur. 

=======
Here the second promise rejects in two seconds. That leads to an immediate rejection of `Promise.all`, so `.catch` executes: the rejection error becomes the outcome of the entire `Promise.all`.
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

```warn header="In case of an error, other promises are ignored"
Eğer bir söz reddederse, `Promise.all` derhal reddeder. Listedeki diğerlerini tamamen unutur. Onların sonuçları göz ardı edilir. 

<<<<<<< HEAD
Örneğin, yukarıdaki örnekte olduğu gibi birden fazla `fetch` çağrısı varsa ve biri başarısız olursa diğeri hala yürütülmeye devam eder. Ancak `Promise.all` artık onları izlememektedir. Muhtemelen yerleşecekler ancak sonuç göz ardı edilecektir. 

`Promise.all` sözlerinde "iptal" kavramı olmadığı için onları iptal edecek hiçbir şey yapmaz. [Başka bir bölümde](fetch-abort) bu konuda yardımcı olmayı amaçlayan `AbortController`ı ele alacağız. Ancak bu Promise API'sinin bir parçası değil.
```

````smart header="`Promise.all(...)` allows non-promise items in `iterable`"
Normalde, `Promise.all(...)` sözlerin yenilenebilir (çoğu durumda bir dizi) kabul eder. Ancak bu nesnelerden herhangi biri bir söz değilse `Promise.respove` içine sarılır.
```
=======
For example, if there are multiple `fetch` calls, like in the example above, and one fails, the others will still continue to execute, but `Promise.all` won't watch them anymore. They will probably settle, but their results will be ignored.

`Promise.all` does nothing to cancel them, as there's no concept of "cancellation" in promises. In [another chapter](info:fetch-abort) we'll cover `AbortController` that can help with that, but it's not a part of the Promise API.
```

````smart header="`Promise.all(iterable)` allows non-promise \"regular\" values in `iterable`"
Normally, `Promise.all(...)` accepts an iterable (in most cases an array) of promises. But if any of those objects is not a promise, it's passed to the resulting array "as is".
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

Örneğin burada `[1, 2, 3]` döner:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
<<<<<<< HEAD
  2, // Promise.resolve(2) olarak kabul edildi.
  3  // Promise.resolve(3) olarak kabul edildi.
]).then(alert); // 1, 2, 3
```

Bu yüzden uygun olmayan durumlarda `Promise.all`a söz etmeyen değerleri aktarabiliriz. 

=======
  2,
  3
]).then(alert); // 1, 2, 3
```

So we are able to pass ready values to `Promise.all` where convenient.
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6
````

## Promise.allSettled

[recent browser="new"]

<<<<<<< HEAD
Herhangi bir söz reddederse `Promise.all` bir bütün olarak eder. Devam etmek için *all* sonuçlarına ihtiyacımız olduğunda bu iyidir: 
=======
`Promise.all` rejects as a whole if any promise rejects. That's good for "all or nothing" cases, when we need *all* results successful to proceed:
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
<<<<<<< HEAD
]).then(render); // render yöntemi hepsine ihtiyaç duyuyor
```

`Promise.allSettled` tüm sözlerin yerine getirilmesini bekler: biri reddetse bile diğerini bekler. Sonuçta ortaya çıkan dizin:
=======
]).then(render); // render method needs results of all fetches
```

`Promise.allSettled` just waits for all promises to settle, regardless of the result. The resulting array has:
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

- `{status:"fulfilled", value:result}` başarılı cevap için,
- `{status:"rejected", reason:error}` hatalar için.

<<<<<<< HEAD
Örneğin, birden fazla kullanıcı hakkında bilgi edinmek istiyoruz. Bir istek başarısız olsa bile diğerleriyle de ilgileniyoruz
=======
For example, we'd like to fetch the information about multiple users. Even if one request fails, we're still interested in the others.
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

Hadi `Promise.allSettled` kullanalım:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

Yukarıdaki satırdaki `results` `(*)` olacak:
```js
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```

<<<<<<< HEAD
Dolayısıyla, her söz için onun satütüsünü ve `değer/sebep` bilgisini alırız.
=======
So for each promise we get its status and `value/error`.
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

### Polyfill

Eğer tarayıcı `Promise.allSettled` özelliğini desteklemiyorsa, polyfill kolaydır.

```js
if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });

  const resolveHandler = value => ({ status: 'fulfilled', value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
    return Promise.all(convertedPromises);
  };
}
```

<<<<<<< HEAD
Bu kodda, `promises.map` giriş değerini alır, `p => Promise.resolve(p)` ile sözleri döndürüyor (sadece bir söz verilmemişse) ve sonra bunu işleyiciye ekler.

Bu işleyici başarılı bir `v` sonucusunu `{state:'fulfilled', value:v}` ve bir `r` hatasını `{state:'rejected', reason:r}` olarak çevirir. Bu `Promise.allSettled` formatıyla aynıdır.

Sonra bazı sonuçları reddetse bile sonuçları almak  ya da *all* sözleri vermek için `Promise.allSettled`i kullanabiliriz. 

## Promise.race

`Promise.all` benzer şekilde sözler yenilenebilir. Ancak hepsinin bitmesini beklemek yerine ilk sonucu (veya hatayı) bekler ve devam eder.
=======
In this code, `promises.map` takes input values, turns them into promises (just in case a non-promise was passed) with `p => Promise.resolve(p)`, and then adds `.then` handler to every one.

That handler turns a successful result `value` into `{status:'fulfilled', value}`, and an error `reason` into `{status:'rejected', reason}`. That's exactly the format of `Promise.allSettled`.

Now we can use `Promise.allSettled` to get the results of *all* given promises, even if some of them reject.

## Promise.race

Similar to `Promise.all`, but waits only for the first settled promise and gets its result (or error).
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

Söz dizimi:

```js
let promise = Promise.race(iterable);
```

Mesela burada sonuç `1` olacak: 

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

<<<<<<< HEAD
Böylece ilk sonuç/hata bütün `Promise.race` sonucu olur. İlk kararlaştırılan sözün ardından "yarışı kazanır", diğer tüm sonuçlar/hatalar göz ardı edilir

## Özetle

`Promise` sınıfının 5 statik metodu vardır:

1. `Promise.resolve(value)` -- verilen değerle çözümlenmiş bir söz verir.
2. `Promise.reject(error)` -- verilen hata ile reddedilen bir söz verir..
3. `Promise.all(promises)` -- çözmek için tüm sözleri bekler ve sonuçlarının bir dizisini döndürür. Eğer verilen sözlerden herhangi biri reddederse o zaman `Promise.all` hatası olur ve diğer tüm sonuçlar göz ardı edilir.
4. `Promise.allSettled(promises)` (yeni bir metod) -- tüm sözlerin çözülmesini veya reddedilmesini bekler ve sonuçlarının bir dizisini nesne olarak döndürür.
    - `state`: `'fulfilled'` yada `'rejected'`
    - `value` (if fulfilled) ya da `reason` (reddedilirse).
5. `Promise.race(promises)` -- ilk yerlmeşmeye söz vermek için bekler ve sonucu/hatası sonuç olur.
Bu beş maddede `Promise.all/allSettled` en yaygın kullanılanıdır.
=======
The first promise here was fastest, so it became the result. After the first settled promise "wins the race", all further results/errors are ignored.


## Promise.any

Similar to `Promise.race`, but waits only for the first fulfilled promise and gets its result. If all of the given promises are rejected, then the returned promise is rejected with [`AggregateError`](mdn:js/AggregateError) - a special error object that stores all promise errors in its `errors` property.

The syntax is:

```js
let promise = Promise.any(iterable);
```

For instance, here the result will be `1`:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

The first promise here was fastest, but it was rejected, so the second promise became the result. After the first fulfilled promise "wins the race", all further results are ignored.

Here's an example when all promises fail:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error
});
```

As you can see, error objects for failed promises are available in the `errors` property of the `AggregateError` object.

## Promise.resolve/reject

Methods `Promise.resolve` and `Promise.reject` are rarely needed in modern code, because `async/await` syntax (we'll cover it [a bit later](info:async-await)) makes them somewhat obsolete.

We cover them here for completeness and for those who can't use `async/await` for some reason.

### Promise.resolve

`Promise.resolve(value)` creates a resolved promise with the result `value`.

Same as:

```js
let promise = new Promise(resolve => resolve(value));
```

The method is used for compatibility, when a function is expected to return a promise.

For example, the `loadCached` function below fetches a URL and remembers (caches) its content. For future calls with the same URL it immediately gets the previous content from cache, but uses `Promise.resolve` to make a promise of it, so the returned value is always a promise:

```js
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

We can write `loadCached(url).then(…)`, because the function is guaranteed to return a promise. We can always use `.then` after `loadCached`. That's the purpose of `Promise.resolve` in the line `(*)`.

### Promise.reject

`Promise.reject(error)` creates a rejected promise with `error`.

Same as:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

In practice, this method is almost never used.

## Summary

There are 6 static methods of `Promise` class:

1. `Promise.all(promises)` -- waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, it becomes the error of `Promise.all`, and all other results are ignored.
2. `Promise.allSettled(promises)` (recently added method) -- waits for all promises to settle and returns their results as an array of objects with:
    - `status`: `"fulfilled"` or `"rejected"`
    - `value` (if fulfilled) or `reason` (if rejected).
3. `Promise.race(promises)` -- waits for the first promise to settle, and its result/error becomes the outcome.
4. `Promise.any(promises)` (recently added method) -- waits for the first promise to fulfill, and its result becomes the outcome. If all of the given promises are rejected, [`AggregateError`](mdn:js/AggregateError) becomes the error of `Promise.any`.
5. `Promise.resolve(value)` -- makes a resolved promise with the given value.
6. `Promise.reject(error)` -- makes a rejected promise with the given error.

Of all these, `Promise.all` is probably the most common in practice.
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6
