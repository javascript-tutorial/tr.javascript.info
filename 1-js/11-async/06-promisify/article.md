# Promisification

<<<<<<< HEAD
Promisification -- basit bir dönüşüm için uzun bir kelime. Bu callback kabul eden bir fonksiyonun promise dönen bir fonksiyona dönüştürülmesidir.

Daha kesin olmak gerekirse, aynı şeyi yapan, orjinali dahili olarak çağıran, fakat bir promise dönen bir sarmalayıcı fonksiyon oluşturuyoruz.

Birçok fonksiyon ve kütüphane callback-based olduğundan, bu tür dönüşümlere gerçek hayatta ihtiyaç duyulur.
=======
"Promisification" is a long word for a simple transformation. It's the conversion of a function that accepts a callback into a function that returns a promise.

Such transformations are often required in real-life, as many functions and libraries are callback-based. But promises are more convenient, so it makes sense to promisify them.

For better understanding, let's see an example.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Örneğin, <info:callbacks> bölümünden `loadScript(src, callback)` var.

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`${src} için script yüklenme hatası`));

  document.head.append(script);
}

// kullanımı:
// loadScript('path/script.js', (err, script) => {...})
```

<<<<<<< HEAD
Promisify yapalım. Yeni `loadScriptPromise(src)` fonksiyonu aynı şeyi yapacak, fakat sadece `src` (callback değil) kabul edecek ve bir promise dönecek.
=======
The function loads a script with the given `src`, and then calls `callback(err)` in case of an error, or `callback(null, script)` in case of successful loading. That's a widespread agreement for using callbacks, we saw it before.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Let's promisify it.

We'll make a new function `loadScriptPromise(src)`, that does the same (loads the script), but returns a promise instead of using callbacks.

In other words, we pass it only `src` (no `callback`) and get a promise in return, that resolves with `script` when the load is successful, and rejects with the error otherwise.

Here it is:
```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// kulllanımı:
// loadScriptPromise('path/script.js').then(...)
```

<<<<<<< HEAD
Artık `loadScriptPromise` promise-based kodumuza çok iyi uyuyor.

Görebileceğimiz gibi, tüm işi orijinal `loadScript`e devrederek, `resolve/reject` promise'ına dönüşen kendi callback'ini sağlar.

Pek çok fonksiyonu promisify etmemiz gerekebileceğinden bir helper kullanmak mantıklı olur.

Bu aslında çok basit -- `promisify(f)` bir to-promisify `f` fonksiyonu alır ve bir sarmalayıcı fonksiyonu döner.

Bu sarmalayıcı yukarıdaki kodla aynı şeyi yapar: bir promise döndürür ve aramayı orijinal `f`e iletir, sonucu özel bir callback izler:

```js
function promisify(f) {
  return function (...args) { // bir sarmalayıcı fonksiyon döner
    return new Promise((resolve, reject) => {
      function callback(err, result) { // f için özel callback
=======
As we can see, the new function is a wrapper around the original `loadScript` function. It calls it providing its own callback that translates to promise `resolve/reject`.

Now `loadScriptPromise` fits well in promise-based code. If we like promises more than callbacks (and soon we'll see more reasons for that), then we will use it instead.

In practice we may need to promisify more than one function, so it makes sense to use a helper.

We'll call it `promisify(f)`: it accepts a to-promisify function `f` and returns a wrapper function.

```js
function promisify(f) {
  return function (...args) { // return a wrapper-function (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f (**)
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

<<<<<<< HEAD
      args.push(callback); // argümanların sonuna özel callback'imizi ekler
=======
      args.push(callback); // append our custom callback to the end of f arguments
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

      f.call(this, ...args); // orijinal fonksiyonu çağırır
    });
  };
}

// kullanımı:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

<<<<<<< HEAD
Burada orijinal fonksiyonun iki argümanlı bir callback beklediğini varsayıyoruz `(err, result)`. En sık karşılaştığımız şey bu. O zaman özel callback'imiz tam olarak doğru biçimdedir ve `promisify` böyle bir durum için harika çalışır.

Ama ya orijinal `f` daha fazla argümanlı bir callback bekliyorsa `callback(err, res1, res2)`?

İşte bir dizi çoklu callback sonucu döndüren bir `promisify` değişikliği:
=======
The code may look a bit complex, but it's essentially the same that we wrote above, while promisifying `loadScript` function.

A call to `promisify(f)` returns a wrapper around `f` `(*)`. That wrapper returns a promise and forwards the call to the original `f`, tracking the result in the custom callback `(**)`.

Here, `promisify` assumes that the original function expects a callback with exactly two arguments `(err, result)`. That's what we encounter most often. Then our custom callback is in exactly the right format, and `promisify` works great for such a case.

But what if the original `f` expects a callback with more arguments `callback(err, res1, res2, ...)`?

We can improve our helper. Let's make a more advanced version of `promisify`.

- When called as `promisify(f)` it should work similar to the version above.
- When called as `promisify(f, true)`, it should return the promise that resolves with the array of callback results. That's exactly for callbacks with many arguments.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
// bir dizi sonuç elde etmek için promisify(f, true) 
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // f için özel callback'imiz
        if (err) {
          reject(err);
        } else {
          // manyArgs belirtilirse tüm callback sonuçlarıyla çözümle
          *!*resolve(manyArgs ? results : results[0]);*/!*
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}

// kullanımı:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...);
```

<<<<<<< HEAD
Bazı durumlarda `err` olmayabilir: `callback(result)` veya callback biçiminde farklı bir şey varsa, bu tür fonksiyonları helper kullanmadan manuel olarak promisify edebiliriz.
=======
As you can see it's essentially the same as above, but `resolve` is called with only one or all arguments depending on whether `manyArgs` is truthy.

For more exotic callback formats, like those without `err` at all: `callback(result)`, we can promisify such functions manually without using the helper.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Biraz daha esnek promisification fonksiyonlarına sahip modüller de vardır, örnek [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). Node.js'de bunun için yerleşik bir `util.promisify` fonksiyonu vardır. 

```smart
<<<<<<< HEAD
Promisification, özellikle `async/await` kullandığınızda harika bir yaklaşımdır (sonraki bölüme bakın), ancak callbacklerin tam olarak yerine geçmez.
=======
Promisification is a great approach, especially when you use `async/await` (covered later in the chapter <info:async-await>), but not a total replacement for callbacks.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Unutmayın, bir promise yalnızca bir sonuca sahip olabilir, ancak bir callback teknik olarak birçok kez çağrılabilir.

Bu nedenle, promisification yalnızca callback'i bir kez çağıran fonksiyonlar içindir. Diğer çağırmalar göz ardı edilecektir.
```
