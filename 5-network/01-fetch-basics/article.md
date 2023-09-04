
# Fetch: Temel Bilgiler

`fetch()` yöntemi, HTTP üzerinden istek göndermenin modern bir yoludur.

Birkaç yılda geliştirildi ve geliştirilmeye devam ediliyor, şu anda tarayıcılar arasında desteği oldukça sağlam.

Temel sözdizimi şöyledir:

```js
let promise = fetch(url, [options])
```

- **`url`** -- erişilecek URL.
- **`options`** -- isteğe bağlı parametreler: method, headers vb.

Tarayıcı isteği başlatır ve bir `promise` döndürür.

Yanıt alma işlemi genellikle iki aşamalıdır.

**Sunucu başlıklarını yanıtladığında, `promise` otomatik olarak oluşturulmuş [Response](https://fetch.spec.whatwg.org/#response-class) sınıfının bir nesnesiyle çözümlenir.**

Bu şekilde HTTP durumunu kontrol edebiliriz (status), başlıkları kontrol edebiliriz (head), ancak henüz gövdeyi (body) alamayız.

`fetch`, HTTP isteği yapamadığında (örneğin, ağ sorunları varsa veya böyle bir site yoksa) 
`promise `, reddeder. 404 veya 500 gibi HTTP hataları bile normal akış olarak kabul edilir.

Bunları response özelliklerinde görebiliriz:

- **`ok`** -- boolean, HTTP durum kodu 200-299 ise true döndürür.
- **`status`** -- HTTP durum kodu.

Örneğin:

```js
let response = await fetch(url);

if (response.ok) { // if HTTP-status is 200-299
  // get the response body (see below)
  let json = await response.json();
} else {
  alert("HTTP-Error: " + response.status);
}
```

Response gövdesini (body) almak için, ek bir yöntem çağrısı yapmamız gerekiyor.

`Response` gövdesine erişmek için birden fazla format ve özellik vardır:

- **`response.json()`** -- yanıtı JSON nesnesi olarak ayrıştırır,
- **`response.text()`** -- yanıtı metin (text) olarak döndürür,
- **`response.formData()`** -- yanıtı FormData nesnesi olarak döndürür (form/çok parçalı kodlama),
- **`response.blob()`** -- yanıtı Blob türünde döndürür [Blob](info:blob) (binary data tipi (ikili)),
- **`response.arrayBuffer()`** -- yanıtı [ArrayBuffer](info:arraybuffer-binary-arrays) türünde döndürür (saf ikili veri),
- ek olarak,  `response.body` bir, [ReadableStream](https://streams.spec.whatwg.org/#rs-class) nesnesidir, gövdeyi parça parça okumaya izin verir, daha sonra bir örnek göreceğiz.


Örneğin, burada GitHub'dan en son commitleri içeren bir JSON nesnesi alıyoruz:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

*!*
let commits = await response.json(); // yanıt gövdesini okuyun ve JSON olarak ayrıştırın
*/!*

alert(commits[0].author.login);
```

Ya da promises sözdizimi kullanarak aynısını yapabilirsiniz:

```js run
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

Metni almak için:
```js
let text = await response.text();
```

Ve binary örneği için, bir görsel getirelim ve gösterelim (bloblar üzerindeki işlemler hakkında ayrıntılar için [Blob](info:blob) bölümüne bakın):

```js async run
let response = await fetch('/article/fetch/logo-fetch.svg');

*!*
let blob = await response.blob(); // Blob nesnesi olarak indirme
*/!*

// create <img> for it
let img = document.createElement('img');
img.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(img);

// Gösterme
img.src = URL.createObjectURL(blob);

setTimeout(() => { // 2 saniye sonra gizle
  img.remove();
  URL.revokeObjectURL(img.src);
}, 2000);
```

```warn
Yalnızca bir gövde ayrıştırma yöntemi seçebiliriz.
```
Yanıtı `response.text()` ile aldıysak, gövde içeriği zaten işlenmiş olduğundan `response.json()` çalışmayacaktır.

````js
let text = await response.text(); // yanıt gövdesi çevirildi
let parsed = await response.json(); // hata (yukarıda zaten çevirilmişti)
````

## Başlıklar (Headers)

`response.headers` içinde Map benzeri bir headers nesnesi vardır.

Başlıkları tek tek alabilir veya üzerinde yineleme yapabiliriz:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// sadece bir başlık alma
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// tüm başlıkları çekme
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
```

Bir başlık ayarlamak için aşağıdaki `headers` seçeneğini deneyebilirsiniz:

```js
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'abcdef'
  }
});
```
...Ancak ayarlayamayacağımız yasaklı [HTTP başlıklarının](https://fetch.spec.whatwg.org/#forbidden-header-name) bir listesi var:

- `Accept-Charset`, `Accept-Encoding`
- `Access-Control-Request-Headers`
- `Access-Control-Request-Method`
- `Connection`
- `Content-Length`
- `Cookie`, `Cookie2`
- `Date`
- `DNT`
- `Expect`
- `Host`
- `Keep-Alive`
- `Origin`
- `Referer`
- `TE`
- `Trailer`
- `Transfer-Encoding`
- `Upgrade`
- `Via`
- `Proxy-*`
- `Sec-*`

Bu başlıklar düzgün ve güvenli HTTP isteği sağlar, bu nedenle yalnızca tarayıcı tarafından kontrol edilirler.

## POST istekleri

`POST` isteği veya başka bir yöntemle istek yapmak için `fetch` seçeneklerini kullanmamız gerekir:

- **`method`** -- HTTP-methodu, örn. `POST`,
- **`body`** -- örnekler:
  -  string değer (örn. JSON),
  - `FormData` nesnesi olarak göndermek için `form/multipart`,
  - `Blob`/`BufferSource` ikili (binary) veri göndermek için,
  - [URLSearchParams](info:url), verileri `x-www-form-urlencoded`, göndermek için, nadiren kullanılır.

Hadi örneklere bakalım.

## Json Veri Göndermek

Bu kod bir `user` objesini JSON olarak gönderir:

```js run async
let user = {
  name: 'John',
  surname: 'Smith'
};

*!*
let response = await fetch('/article/fetch-basics/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});
*/!*

let result = await response.json();
alert(result.message);
```

Kısa bir not, göndereceğim değer string ise, `Content-Type` değerini `text/plain;charset=UTF-8` olarak belirlememiz gerekiyor. Json veri göndereceğimiz için `headers` objesine `application/json` özelliğini ekliyoruz.

## Form verisini göndermek

Aynı şeyi bir HTML `<form>`'u ile yapalım.


```html run
<form id="formElem">
  <input type="text" name="name" value="John">
  <input type="text" name="surname" value="Smith">
</form>

<script>
(async () => {
  let response = await fetch('/article/fetch-basics/post/user', {
    method: 'POST',
*!*
    body: new FormData(formElem)
*/!*
  });

  let result = await response.json();

  alert(result.message);
})();
</script>
```

Burada [FormData](https://xhr.spec.whatwg.org/#formdata) formu otomatik olarak encode eder, `<input type="file">` alanları işlenir ve, `Content-Type: form/multipart` olarak gönderir.

## Görselleri göndermek

Görsel verisini gönderirken ikili (binary) veri olarak göndermemiz gerekir.

Direkt olarak `Blob` veya `BufferSource` kullanarak gönderebiliriz.

Örneğin, burada fareyi hareket ettirerek çizim yapabileceğimiz bir `<canvas>` var. "Gönder" butonuna tıklandığında görsel sunucuya gönderilir:

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
      let response = await fetch('/article/fetch-basics/post/image', {
        method: 'POST',
        body: blob
      });
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

Burada ayrıca `Content-Type` manuel olarak ayarlamamız gerekmedi, çünkü `Blob` nesnesinin yerleşik bir türü vardır (burada `toBlob` tarafından oluşturulan `image/png`).

Ayrıca `submit()` fonksiyonu `async/await` olmadan şu şekilde yazabiliriz:

```js
function submit() {
  canvasElem.toBlob(function(blob) {        
    fetch('/article/fetch-basics/post/image', {
      method: 'POST',
      body: blob
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
  }, 'image/png');
}
```

## Görsel içeren Formdata'yı göndermek

Pratikte bir görseli "name" ve diğer meta veriler gibi ek alanlarla birlikte formun bir parçası olarak göndermek genellikle daha uygundur.

Ayrıca, sunucular genellikle ham ikili veriler yerine çok parçalı kodlanmış formları(multipart-encoded forms) kabul etmeye daha uygundur.

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

*!*
      let formData = new FormData();
      formData.append("name", "myImage");
      formData.append("image", blob);
*/!*    

      let response = await fetch('/article/fetch-basics/post/image-form', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

Şimdi, sunucu açısından bakıldığında, görsel formdaki bir "dosya "dır.

## Özet

Tipik bir fetch isteği iki bölümden oluşur  `awaits`:

```js
let response = await fetch(url, options); // başlık kurallara göre okunur
let result = await response.json(); // gövdeyi json olarak geri döndürü

Veya, promise stilinde:
```js
fetch(url, options)
  .then(response => response.json())
  .then(result => /* process result */)
```

Yanıt(Response) Özellikleri
- `response.status` -- HTTP durum kodunu içerir,
- `response.ok` -- `true` ise değer 200-299 arası olmalıdır
- `response.headers` -- Başlıklarını içeren bir map benzeri nesne döndürür

Yanıt Gövdesini (Response Body) alma yöntemleri:
- **`response.json()`** -- yanıtı bir JSON objesine çevirir,
- **`response.text()`** -- yanıtı bir text olarak döndürür,
- **`response.formData()`** -- yanıtı bir FormData objesi olarak döndürür (form/multipart encoding),
- **`response.blob()`** -- yanıtı [Blob](info:blob) (binary data tipi) olarak döndürür,
- **`response.arrayBuffer()`** -- yanıtı [ArrayBuffer](info:arraybuffer-binary-arrays) (saf ikili veri (binary)) olarak döndürür,

Şimdiye kadarki "Fetch" seçenekleri:
- `method` -- HTTP methodları (POST,GET vs,),
- `headers` -- istek başlıklarını içeren bir nesne (herhangi bir başlığa izin verilmez),
- `body` -- string/FormData/BufferSource/Blob/UrlSearchParams türünde gönderilecek veriler

Sonraki bölümlerde daha fazla seçenek ve kullanım durumu göreceğiz.
