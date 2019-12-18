# Promise API

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

Bunun için `Promise.all`.

Söz dizimi:

```js
let promise = Promise.all([...promises...]);
```

Yeni bir söz alır ve bir dizi söz alır (Teknik olarak herhangi bir yinelenebilir nesne, ama çoğunlukla bir array.)

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

`Promise.allSettled` tüm sözlerin yerine getirilmesini bekler: biri reddetse bile diğerini bekler. Sonuçta ortaya çıkan dizin:

- `{status:"fulfilled", value:result}` başarılı cevap için,
- `{status:"rejected", reason:error}` hatalar için.

Örneğin, birden fazla kullanıcı hakkında bilgi edinmek istiyoruz. Bir istek başarısız olsa bile diğerleriyle de ilgileniyoruz

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

Dolayısıyla, her söz için onun satütüsünü ve `değer/sebep` bilgisini alırız.

### Polyfill

Eğer tarayıcı `Promise.allSettled` özelliğini desteklemiyorsa, polyfill kolaydır.

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

Bu kodda, `promises.map` giriş değerini alır, `p => Promise.resolve(p)` ile sözleri döndürüyor (sadece bir söz verilmemişse) ve sonra bunu işleyiciye ekler.

Bu işleyici başarılı bir `v` sonucusunu `{state:'fulfilled', value:v}` ve bir `r` hatasını `{state:'rejected', reason:r}` olarak çevirir. Bu `Promise.allSettled` formatıyla aynıdır.

Sonra bazı sonuçları reddetse bile sonuçları almak  ya da *all* sözleri vermek için `Promise.allSettled`i kullanabiliriz. 

## Promise.race

`Promise.all` benzer şekilde sözler yenilenebilir. Ancak hepsinin bitmesini beklemek yerine ilk sonucu (veya hatayı) bekler ve devam eder.

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
