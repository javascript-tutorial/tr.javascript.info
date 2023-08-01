
# Fetch API

Şimdiye kadar fetch hakkında biraz bilgi edindik.

Şimdi tamamını kapsayacak şekilde API’nin tüm yeteneklerini görelim.

Varsayılan değerleriyle olası tüm fetch işlemlerinin tam listesi işte burada (diğer alternatifler yorumlarda)

```js
let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE vb.
  headers: {
    "Content-Type": "text/plain;charset=UTF-8" // for a string body, depends on body
  },
  body: undefined // string, FormData, Blob, BufferSource ya da URLSearchParams
  referrer: "about:client", // no-referrer için "" ya da mevcut başlangıç noktasından bir URL
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
  mode: "cors", // same-origin, no-cors
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache ya da only-if-cached
  redirect: "follow", // manual, error
  integrity: "", // bir hash, "sha256-abcdef1234567890" gibi
  keepalive: false, // true
  signal: undefined, // İsteği iptal etmek için AbortController
  window: window // null
});
```

Etkileyici bir liste, değil mi?

 <info:fetch-basics> bölümünde `method`, `headers` ve `body` tamamıyla ele alındı .

`signal` ise <info:fetch-abort> bölümünde ele alındı.

Şimdi diğer özelliklerini inceleyelim.

## referrer, referrerPolicy

Bu özellikler `fetch` işleminin  HTTP `Referer` bilgisini nasıl ayarladığını düzenler.

Bu başlık, istek yapan sayfanın URL’sini içerir. Çoğu durumda çok küçük bir bilgilendirme rolü oynar ama bazen güvenlik amacıyla kaldırmak veya değiştirmek daha mantıklıdır.

**`referrer`  özelliği başlangıçtaki mevcut herhangi bir `Referer`'ın ayarlanmasına veya devre dışı bırakılmasına izin verir.**

Referer göndermemek için boş bir string yazın:
```js
fetch('/page', {
*!*
  referrer: "" // Referer içeriği boş
*/!*
});
```

Mevcut başlangıç noktasında başka bir URL ayarlamak için:

```js
fetch('/page', {
  // https://javascript.info’da olduğumuzu varsayarsak
  // herhangi bir Referer bilgisini ayarlayabiliriz ancak sadece mevcut başlangıç noktası dahilinde
*!*
  referrer: "https://javascript.info/anotherpage"
*/!*
});
```

**`referrerPolicy`, `Referer` için genel kurallar belirler.**

Olası değerler [Referrer Policy](https://w3c.github.io/webappsec-referrer-policy/) spesifikasyonunda açıklanmıştır:

- **`"no-referrer-when-downgrade"`** -- Varsayılan değer: HTTPS'ten HTTP'ye bir istek göndermediğimiz sürece `Referer` her zaman gönderilir (güvenlik protokolü daha az).
- **`"no-referrer"`** -- Hiçbir zaman `Referer` göndermez.
- **`"origin"`** -- Belli bir URL'yi değil, sadece `Referer` kaynağını gönderir. Örneğin `http://site.com/path` yerine `http://site.com` gibi.
- **`"origin-when-cross-origin"`** -- Referer'ın tamamını aynı kaynağa gönderir ancak kaynaklar arasındaki istekler için yalnızca kaynak kısmını gönderir.
- **`"same-origin"`** -- Aynı kök URL'ye tam Referer gönderir, ancak farklı kök URL'ler arasındaki istekler için Referer göndermez.
- **`"strict-origin"`** -- Sadece kök URL'yi gönderir, HTTPS→HTTP istekleri için Referer göndermez.
- **`"strict-origin-when-cross-origin"`** --  Aynı kök URL'ye tam Referer gönderir, farklı kök URL'ler arasındaki istekler için sadece kök URL gönderir ancak HTTPS→HTTP isteği durumunda hiçbir şey göndermez.
- **`"unsafe-url"`** -- Her zaman `Referer`'da tam URL'yi gönderir.

Diyelim ki dışarıdan görünmemesi gereken URL yapılarına sahip bir yönetici bölgesi (admin zone) var.

Eğer farklı bir kaynaktan (cross-origin) bir istek gönderirsek varsayılan olarak isteğimiz `Referer` başlığını sayfanın tam URL'siyle birlikte gönderir (ancak HTTPS'ten HTTP'ye istek gönderdiğimizde `Referer` gönderilmez).

Örneğin `Referer: https://javascript.info/admin/secret/paths`.

Referrer'ı tamamen gizleme istiyorsak:

```js
fetch('https://another.com/page', {
  referrerPolicy: "no-referrer" // no Referer, referrer: ""'la aynı işlevi görür
});
```

Aksi takdirde, uzak tarafın isteğin nereden geldiğini görmesini istiyorsak, sadece URL'nin "origin" (kök) kısmını gönderebiliriz:

```js
fetch('https://another.com/page', {
  referrerPolicy: "strict-origin" // Referer: https://javascript.info
});
```

## mode

`mode` seçeneği, kaynaklararası istekleri önlemek için bir güvenlik önlemi olarak hizmet eder.

- **`"cors"`** -- Varsayılan olarak <info:fetch-crossorigin>'de  açıklandığı gibi kaynaklararası isteklere izin verilir,
- **`"same-origin"`** -- Kaynaklararası isteklere izin verilmez,
- **`"no-cors"`** -- Sadece basit olan kaynaklararası isteklere izin verilir.

Bu, fetch işleminin URL'sinin üçüncü taraf bir kaynaktan geldiği durumlarda ve kaynaklararası yeteneklerini sınırlamak için bir "güç kapama anahtarı" istediğimiz durumlarda faydalı olabilir. 

## credentials

`credentials`, `fetch` işleminin isteğiyle birlikte çerezleri ve HTTP-Authorization başlıklarını gönderip göndermeyeceğini belirtir.

- **`"same-origin"`** -- Varsayılan değerdir, kaynaklararası istekler için göndermez,
- **`"include"`** -- Her zaman gönderir ancak kaynaklararası sunucudan `Accept-Control-Allow-Credentials` gerektirir,
- **`"omit"`** -- Hiçbir zaman göndermez hatta aynı kök URL'ye sahip istekler için bile göndermez.

## cache

Varsayılan olarak `fetch` istekleri standart HTTP önbellekleme kurallarını kullanır. Yani `Expires`, `Cache-Control` başlıklarını dikkate alıp `If-Modified-Since` gibi başlıklar gönderir. Adeta normal HTTP istekleri gibi davranır.

`cache`, HTTP önbelleğini yok saymak veya kullanımını ayarlamak için kullanılır:

- **`"default"`** -- `fetch`, standart HTTP önbellekleme kurallarını ve başlıklarını kullanır;
- **`"no-store"`** -- HTTP önbelleğini tamamen yok sayar. Eğer `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match` veya `If-Range` başlıklarından herhangi birini set edersek bu mod varsayılan olur;
- **`"reload"`** --  Sonucu HTTP önbellekten almadan (eğer varsa) cevap ile önbelleği doldurur (eğer cevap başlıkları buna izin veriyorsa);
- **`"no-cache"`** -- Önbellekte bir yanıt varsa koşullu bir istek oluşturur aksi takdirde normal bir istek yapar. HTTP önbelleği ile cevabı doldurur;
- **`"force-cache"`** --  Yanıtı HTTP önbelleğinden alır hatta eskimiş olsa bile. Eğer HTTP önbelleğinde yanıt yoksa normal bir HTTP isteği yapar ve normal davranır;
- **`"only-if-cached"`** --  Yanıtı HTTP önbelleğinden alır hatta eskimiş olsa bile. Eğer HTTP önbelleğinde yanıt yoksa hata döner. Sadece `mode` değeri `"same-origin"` olduğunda çalışır.

## redirect

Normalde `fetch` işlemi 301, 302 gibi HTTP yönlendirmelerini şeffaf bir şekilde takip eder.

`redirect` seçeneği bu davranışı değiştirmemizi sağlar:

- **`"follow"`** -- Varsayılan değerdir, HTTP yönlendirmelerini takip eder,
- **`"error"`** -- HTTP yönlendirmesi durumunda hata verir,
- **`"manual"`** --  HTTP yönlendirmelerini takip etmez ancak `response.url` yeni URL olacak ve `response.redirected` değeri `true` olacak böylece ihtiyaç halinde yönlendirmeyi manuel olarak yeni URL'ye gerçekleştirebiliriz.

## integrity

`integrity`, yanıtın önceden bilinen bir karma (checksum) ile eşleşip eşleşmediğini kontrol etmemize olanak sağlar.

[specification](https://w3c.github.io/webappsec-subresource-integrity/)'da açıklandığı gibi, desteklenen fonksiyonlar SHA-256, SHA-384 ve SHA-512'dir ve tarayıcıya göre başka fonksiyonları da olabilir.

Örneğin bir dosyayı indiriyoruz ve dosyanın SHA-256 karma değerinin "abc" olduğunu biliyoruz (gerçek bir karma değeri tabii ki daha uzundur).

Bunu aşağıdaki gibi `integrity` seçeneğine ekleyebiliriz:

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abd'
});
```

Daha sonra `fetch` işlemi kendi başına SHA-256 hesaplar ve hesapladığı değeri bizim verdiğimiz değerle karşılaştırır. Eşleşme olmaması durumunda bir hata tetiklenir.

## keepalive

`keepalive`, isteğin sayfadan ayrıldıktan sonra dahi gerçekleştirilebileceğini belirtir.

Örneğin mevcut ziyaretçinin sayfamızı nasıl kullandığıyla ilgili istatistikleri topluyoruz (fare tıklamaları, görüntülediği sayfa parçaları) ve kullanıcı deneyimini iyileştirmek amacıyla bunları sunucumuza kaydetmek istiyoruz.

Ziyaretçi sayfadan ayrıldığında bu bilgileri sunucumuza kaydetmek istiyoruz.

Bunu yapmak için `window.onunload` özelliğini kullanabiliriz:

```js run
window.onunload = function() {
  fetch('/analytics', {
    method: 'POST',
    body: "statistics",
*!*
    keepalive: true
*/!*
  });
};
```

Normalde bir belge yüklenirken ilişkili tüm ağ istekleri iptal edilir ancak `keepalive` tarayıcının isteği arka planda yapmasını ve sayfadan ayrıldıktan sonra bile gerçekleştirmesini sağlar. Bu nedenle isteğin başarıyla gerçekleşmesi için bu seçeneğin kullanılması önemlidir.

- Megabaytlarca veri gönderemeyiz: `keepalive` istekleri için sınır 64 KB'dır
    - Daha fazla veri toplarsak düzenli olarak göndermemiz gerekir böylece "onunload" isteği için çok fazla veri olmaz.
    -  Limit tüm devam eden istekler için geçerlidir. Bu nedenle 64 KB boyutunda 100 istek oluşturarak bu sınırı aşabiliriz.
- `onunload` durumunda sunucu cevabını alamayız çünkü belge o zaman zaten yüklenmemiştir.
    - Genellikle sunucu böyle isteklere boş bir cevap gönderir bu nedenle bu durumda bir sorun olmaz.
