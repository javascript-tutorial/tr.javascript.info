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

Please note that the relative order is the same. Even though the first promise takes the longest time to resolve, it is still first in the array of results.

A common trick is to map an array of job data into an array of promises, and then wrap that into `Promise.all`.

For instance, if we have an array of URLs, we can fetch them all like this:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// map every url to the promise of the fetch
let requests = urls.map(url => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

A bigger example with fetching user information for an array of github users by their names (or we could fetch an array of goods by their ids, the logic is same):

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // all responses are ready, we can show HTTP status codes
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // shows 200 for every url
    }

    return responses;
  })
  // map array of responses into array of response.json() to read their content
  .then(responses => Promise.all(responses.map(r => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then(users => users.forEach(user => alert(user.name)));
```

**If any of the promises is rejected, `Promise.all` immediately rejects with that error.**

For instance:

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
```

Here the second promise rejects in two seconds. That leads to immediate rejection of `Promise.all`, so `.catch` executes: the rejection error becomes the outcome of the whole `Promise.all`.

```warn header="In case of an error, other promises are ignored"
If one promise rejects, `Promise.all` immediately rejects, completely forgetting about the other ones in the list. Their results are ignored.

For example, if there are multiple `fetch` calls, like in the example above, and one fails, other ones will still continue to execute, but `Promise.all` don't watch them any more. They will probably settle, but the result will be ignored.

`Promise.all` does nothing to cancel them, as there's no concept of "cancellation" in promises. In [another chapter](fetch-abort) we'll cover `AbortController` that aims to help with that, but it's not a part of the Promise API.
```

````smart header="`Promise.all(...)` allows non-promise items in `iterable`"
Normally, `Promise.all(...)` accepts an iterable (in most cases an array) of promises. But if any of those objects is not a promise, it's wrapped in `Promise.resolve`.

For instance, here the results are `[1, 2, 3]`:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2, // treated as Promise.resolve(2)
  3  // treated as Promise.resolve(3)
]).then(alert); // 1, 2, 3
```

So we are able to pass non-promise values to `Promise.all` where convenient.

````

## Promise.allSettled

[recent browser="new"]

`Promise.all` rejects as a whole if any promise rejects. That's good in cases, when we need *all* results to go on:

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // render method needs them all
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
