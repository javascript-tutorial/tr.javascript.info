# Promise API

`Promise`de 5 statik yöntem vardır. Kullanım davalarını burada hızlı bir şekilde ele alacağız.

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

Bunun için `Promise.all`.

Söz dizimi:

```js
let promise = Promise.all([...promises...]);
```

Yeni bir söz alır ve bir dizi söz alır (technically can be any iterable, but usually an array.)

Yeni söz, listelenen tüm sözlerin yerine getirildiği ve sonuçların bir dizisine sahip olduğunda karar verir.

Örneğin, aşağıdaki `Promise.all` 3 saniye sonra yerleşir ve sonucu `[1, 2, 3]` dizisidir:

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 sözler hazır olduğunda: her söz bir dizi üyesine katkıda bulunur
```

Lütfen göreli siparişin aynı olduğunu unutmayın. İlk sözün sözülmesi uzun sürse bile sonuçta ilk sırada yer almaktadır. 

Yayın bir hile, bir dizi iş verisini bir dizi sözle eşleştirmek ve ardından bunu `Promise.all` içine kaydırmaktır. 

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

Bir dizi github kullanıcısı için kullanıcı bilgilerini adlarına göre almakla ilgili daha büyük bir örnek (veya bir mal dizisini kimlikleriyle alabiliriz. Mantık aynıdır):


```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // Tüm cevaplar hazır. HTTP durum kodlarını gösterebiliriz
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // Her URL için 200 gösterir
    }

    return responses;
  })
  // Yanıt dizisini, içeriğini okumak için response.json() dizisine eşleyin
  .then(responses => Promise.all(responses.map(r => r.json())))
  // Tüm JSON cevapları ayrıştırılır: "users" bunların dizisidir.
  .then(users => users.forEach(user => alert(user.name)));
```

**Eğer sözlerden herhangi biri ret edildiyse  `Promise.all` bu hatayı hemen ret eder**

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

İşte ikinci söz iki saniye içinde reddediyor. Bu `Promise.all`un hemen reddedilmesine yol açar, bu yüzden `.catch` çalıştırır: reddedilme hatası tüm `Promise.all`un sonucudur. 


```warn header="In case of an error, other promises are ignored"
Eğer bir söz reddederse, `Promise.all` derhal reddeder. Listedeki diğerlerini tamamen unutur. Onların sonuçları göz ardı edilir. 

Örneğin, yukarıdaki örnekte olduğu gibi birden fazla `fetch` çağrısı varsa ve biri başarısız olursa diğeri hala yürütülmeye devam eder. Ancak `Promise.all` artık onları izlememektedir. Muhtemelen yerleşecekler ancak sonuç göz ardı edilecektir. 

`Promise.all` sözlerinde "iptal" kavramı olmadığı için onları iptal edecek hiçbir şey yapmaz. [Başka bir bölümde](fetch-abort) bu konuda yardımcı olmayı amaçlayan `AbortController`ı ele alacağız. Ancak bu Promise API'sinin bir parçası değil.
```

````smart header="`Promise.all(...)` allows non-promise items in `iterable`"
Normalde, `Promise.all(...)` sözlerin yenilenebilir (çoğu durumda bir dizi) kabul eder. Ancak bu nesnelerden herhangi biri bir söz değilse `Promise.respove` içine sarılır.
```

Örneğin burada `[1, 2, 3]` döner:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2, // Promise.resolve(2) olarak kabul edildi.
  3  // Promise.resolve(3) olarak kabul edildi.
]).then(alert); // 1, 2, 3
```

Bu yüzden uygun olmayan durumlarda `Promise.all`a söz etmeyen değerleri aktarabiliriz. 

````

## Promise.allSettled

[recent browser="new"]

Herhangi bir söz reddederse `Promise.all` bir bütün olarak eder. Devam etmek için *all* sonuçlarına ihtiyacımız olduğunda bu iyidir: 

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // render yöntemi hepsine ihtiyaç duyuyor
```

`Promise.allSettled` waits for all promises to settle: even if one rejects, it waits for the others. The resulting array has:

- `{status:"fulfilled", value:result}` for successful responses,
- `{status:"rejected", reason:error}` for errors.

For example, we'd like to fetch the information about multiple users. Even if one request fails, we're interested in the others.

Let's use `Promise.allSettled`:

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

The `results` in the line `(*)` above will be:
```js
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```

So, for each promise we get its status and `value/reason`.

### Polyfill

If the browser doesn't support `Promise.allSettled`, it's easy to polyfill:

```js
if(!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(v => ({
      state: 'fulfilled',
      value: v,
    }), r => ({
      state: 'rejected',
      reason: r,
    }))));
  };
}
```

In this code, `promises.map` takes input values, turns into promises (just in case a non-promise was passed) with `p => Promise.resolve(p)`, and then adds `.then` handler to it.

That handler turns a successful result `v` into `{state:'fulfilled', value:v}`, and an error `r` into `{state:'rejected', reason:r}`. That's exactly the format of `Promise.allSettled`.

Then we can use `Promise.allSettled` to get the results or *all* given promises, even if some of them reject.

## Promise.race

Similar to `Promise.all`, it takes an iterable of promises, but instead of waiting for all of them to finish, it waits for the first result (or error), and goes on with it.

The syntax is:

```js
let promise = Promise.race(iterable);
```

For instance, here the result will be `1`:

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

So, the first result/error becomes the result of the whole `Promise.race`. After the first settled promise "wins the race", all further results/errors are ignored.

## Summary

There are 5 static methods of `Promise` class:

1. `Promise.resolve(value)` -- makes a resolved promise with the given value.
2. `Promise.reject(error)` -- makes a rejected promise with the given error.
3. `Promise.all(promises)` -- waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, then it becomes the error of `Promise.all`, and all other results are ignored.
4. `Promise.allSettled(promises)` (a new method) -- waits for all promises to resolve or reject and returns an array of their results as object with:
    - `state`: `'fulfilled'` or `'rejected'`
    - `value` (if fulfilled) or `reason` (if rejected).
5. `Promise.race(promises)` -- waits for the first promise to settle, and its result/error becomes the outcome.

Of these five, `Promise.all/allSettled` are the most common in practice.
