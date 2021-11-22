# Promise ( Söz )

Diyelim ki çok iyi bir sanatçısınız ve fanlarınız size sabah akşam ne zaman yeni şarkılarınızın geleceğini soruyor.

Siz de biraz rahatlamak için yeni şarkı yayınladığınızda onlara göndereceğinize söz verdiniz. Onlara bir liste verdiniz ve güncellemeleri buradan yayınlayacağınızı söylediniz. Böylece onlar da kendi email adreslerini yazar ve yeni şarkılar geldiğinde hemen bunları görebilir. Diyelimki bir şey yanış gitti ve yeni şarkıyı yayınlayamadınız bu şekliyle bile onlara bildirim gider.

Böylece herkes mutlu, sizi artık kimse darlamayacak, ve hiçbir yeni şarkınızı kaçırmayacaklar.

Bu programlamada karşılaştığımız olayların gerçek-hayattaki analojisi:

1. Zaman alan "Kod üretme". Örneğin ağ üzerinden veri yükleyen bir uygulama, yani "Şarkıcı"
2. Üretilen kodu hazır olduğunda "tüketmek isteyen" kod. Birçok fonksiyon bu sonuca ihtiyaç duyabilir. Bu da "fanlar"'dır.
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

- `durum` - ilk önce "bekleniyor (pending)" sonrasında "yerine getirildi" veya "red edildi" durumuna getirilir.
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

```smart header="`Error` objesi ile reddetme"
Bazı durumlar beklenmediği gibi gidebilir. Böyle durumlarda `reject`'i bir argüman ile çağırabiliriz. `Error` objesini kullanmanız daha iyi olacaktır. Bunun nedeni ileride daha açık olacaktır.
```

````smart header="Anında `çözüm`/`reject` objelerinin çağırılması"
Prakikte, çalıştırıcı genelde asenkron çalışır ve `çözüm`/`red`'den bir tanesini bir süre sonra çağırır, aslında çağırmasa da olur. Bunun yerine doğrudan `çözüm` veya `redded` çağrılabilir. Örneğin:

```js
let promise = new Promise(function(resolve, reject) {
  // Hiç zaman almadan 
  resolve(123); // Anında sonucu bu şekilde verebiliriz
});
```

Bu durum işe başladığınızda fakat sonrasında değişen bir şey olmadığının görünüp hiç çalışmadan gönderilmek istendiğinde gerçekleştirilebilir.

Bu aslında iyi bir çözüm. Böylece söz hemen çözülmüş olur.
````

```smart header="`state`(durum) ve `result`(sonuç) dahilidir"
Promise objesinin `durum` ve `sonuç` özellikleri dahilidir. Bundan dolayı "tüketici kod" içerisinden doğrudan erişemeyiz. Bunun yerine `.then`/`.catch`/`.finally` gibi metodları kullanırız. Aşağıda bunlar açıklanmaktadır.
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

1. Promise sonuca ulaştığında çalışır.
2. Sonucu alır.

İkinci argümanı:

1. Söz reddedildiğinde
2. Hata alır.

Örneğin, aşağıdaki başarılı bir şekilde çözülen söz örneği:

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

Red durumunda ikincisi çalışır:

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

`.finally(f)` çağrısı `.then(f,f)`'ye benzemektedir. Söz yerine getirildiğinde, ister çözüm veya ret olsun, bu fonksiyon çalışır.

`finally` temizlik için oldukça iyi bir işleyicidir. Örneğin yükleniyor belirtecinin durdurulması gibi. En nihayetinde olumlu veya olumsuz olarak söz tamamlanmıştır.

Aşağıdaki gibi:

```js
new Promise((resolve, reject) => {
  /* zaman alan bir iş yap ve çözüm/red'i çağır. */
})
*!*
  // Söz herhangi bir şekilde tamamlandığında çalıştır.
  .finally(() => stop loading indicator)
*/!*
  .then(result => show result, err => show error)
```

Aslında doğrudan `then(f,f)` ile aynı diyemeyiz. Bazı önemli farklılıklar bulunmaktadır:

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
      .catch(err => alert(err));  // <-- .catch hata objesini işler.
    ```  
    Aslında bu çok uygun, çünkü `finally` içerisinde sözün sonucunu işleme gibi bir niyetimiz yok. Bunları üzerinden geçirse yeterli.
    
    Promiseler ve bunların zincirlemesi hakkında ilerleyen konularda daha derin bilgi verilecektir.
    
3. `finally(f)` kullanmak yazım olarak `.then(f,f)`'den daha uygundur çünkü `f` fonksiyonunu tekrar yazmanıza gerek kalmaz.

````smart header="Bitmiş sözün işleyicilerini anında çalıştırtırma"
Eğer bir söz bekleme durumunda ise `.then/catch/finally` işleyicileri sonuç için beklerler. Diğer türlü, söz bittiğinde, anında çalıştırılır:

```js run
// anında biten söz
let promise = new Promise(resolve => resolve("done!"));

promise.then(alert); // done! (hemen görünür)
```
`.then` işleyicisi her türlü çalışır, söz zaman alsa da anında bitse de önemli değil.
````
Bir sonraki bölümde, sözlerin nasıl asenkron kod yazarken işimize yarayabileceği üzerinde duralım.

## Örnek: loadScript [#loadscript]

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

promise.then(script => alert('One more handler to do something else!'));
```
callback tarzı yazmadan daha iyi olan bir kaç özellik hemen görülebilir:

| Promises | Callbacks |
|----------|-----------|
| Söz ile işlemler doğal sırası dahilinde gerçekleşir. Önce `loadScript(script)` çalıştırılır, sonra `then` ile sonuç işlenir. | `loadScript` çalışmadan önce sonuç ile ne yapılacağı bilinmelidir. |
| `.then` fonksiyonunu bir sözde istediğimiz kadar kullanabiliriz. Her defasında listeye "yeni fan" eklenebilir.Bunun ile ilgili bir sonraki bölüme bakılabilir: [](info:promise-chaining). | Sadece bir tane callback olmalı. |

Söz bize daha iyi bir akış ve esneklik sağlamaktadır.Bir sonraki bölümde diğer yararlarını da göreceğiz.
