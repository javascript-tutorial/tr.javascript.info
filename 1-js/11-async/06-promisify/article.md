# Promisification

Promisification -- basit bir dönüşüm için uzun bir kelime. Bu callback kabul eden bir fonksiyonun promise dönen bir fonksiyona dönüştürülmesidir.

Daha kesin olmak gerekirse, aynı şeyi yapan, orjinali dahili olarak çağıran, fakat bir promise dönen bir sarmalayıcı fonksiyon oluşturuyoruz.

Birçok fonksiyon ve kütüphane callback-based olduğundan, bu tür dönüşümlere gerçek hayatta ihtiyaç duyulur.

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

Promisify yapalım. Yeni `loadScriptPromise(src)` fonksiyonu aynı şeyi yapacak, fakat sadece `src` (callback değil) kabul edecek ve bir promise dönecek.

```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err)
      else resolve(script);
    });
  })
}

// kulllanımı:
// loadScriptPromise('path/script.js').then(...)
```

Şimdi `loadScriptPromise` promise-based kodumuza çok iyi uyuyor.

Görebileceğimiz gibi, tüm işi orijinal `loadScript`e devrederek, `resolve/reject` promise'ına dönüşen kendi callback'ini sağlar.

Pek çok fonksiyonu promisify etmemiz gerekebileceğinden bir helper kullanmak mantıklı olur.

Bu aslında çok basit -- `promisify(f)` bir to-promisify `f` fonksiyonu alır ve bir sarmalayıcı fonksiyonu döner.

Bu sarmalayıcı yukarıdaki kodla aynı şeyi yapar: bir promise döndürür ve aramayı orijinal `f`e iletir, sonucu özel bir callback izler:

```js
function promisify(f) {
  return function (...args) { // bir sarmalayıcı fonksiyon döner
    return new Promise((resolve, reject) => {
      function callback(err, result) { // f için özel callback
        if (err) {
          return reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // argümanların sonuna özel callback'imizi ekler

      f.call(this, ...args); // orijinal fonksiyonu çağırır
    });
  };
};

// kullanımı:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

Burada orijinal fonksiyonun iki argümanlı bir callback beklediğini varsayıyoruz `(err, result)`. En sık karşılaştığımız şey bu. O zaman özel callback'imiz tam olarak doğru biçimdedir ve `promisify` böyle bir durum için harika çalışır.

Ama ya orijinal `f` daha fazla argümanlı bir callback bekliyorsa `callback(err, res1, res2)`?

İşte bir dizi çoklu callback sonucu döndüren bir `promisify` modifikasyonu:

```js
// bir dizi sonuç elde etmek için promisify(f, true) 
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // f için özel callback'imiz
        if (err) {
          return reject(err);
        } else {
          // manyArgs belirtilirse tüm callback sonuçlarıyla çözümle
          *!*resolve(manyArgs ? results : results[0]);*/!*
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
};

// kullanımı:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)
```

Bazı durumlarda `err` olmayabilir: `callback(result)` veya callback biçiminde egzotik bir şey varsa, bu tür fonksiyonları helper kullanmadan manuel olarak promisify edebiliriz.

Biraz daha esnek promisification fonksiyonlarına sahip modüller de vardır, örnek [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). Node.js'de bunun için yerleşik bir `util.promisify` fonksiyonu vardır. 

```smart
Promisification, özellikle `async/await` kullandığınızda harika bir yaklaşımdır (sonraki bölüme bakın), ancak callbacklerin tam olarak yerine geçmez.

Unutmayın, bir promise yalnızca bir sonuca sahip olabilir, ancak bir callback teknik olarak birçok kez çağrılabilir.

Bu nedenle, promisification yalnızca callback'i bir kez çağıran fonksiyonlar içindir. Diğer çağırmalar göz ardı edilecektir.
```
