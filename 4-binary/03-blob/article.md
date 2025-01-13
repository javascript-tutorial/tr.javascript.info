# Blob

`ArrayBuffer` ve view'lar, JavaScript'in bir parçası olan ECMA standardının bir parçasıdır.

Tarayıcıda başta `Blob` olmak üzere, [File API](https://www.w3.org/TR/FileAPI/)'da tanımlanmış olan çeşitli ek yüksek seviye nesneler de bulunur.

<<<<<<< HEAD
`Blob`, isteğe bağlı bir `type` karakter dizisi (genellikle bir MIME tipi) ve buna ek olarak `blobParts` - Başka `Blob` objelerinin, stringlerin ve `BufferSource`ların bir dizisi - bölümlerinden meydana gelir.
=======
`Blob` consists of an optional string `type` (a MIME-type usually), plus `blobParts` -- a sequence of other `Blob` objects, strings and `BufferSource`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

![](blob.svg)

Kurucu sözdizimi şu şekildedir:

```js
new Blob(blobParts, options);
```

<<<<<<< HEAD
- **`blobParts`**, `Blob`/`BufferSource`/`String` değerlerinden oluşan bir dizidir.
- **`options`** isteğe bağlı objesi:
  - **`type`** blob tipidir ve genellikle `image/png` gibi bir MIME tipidir.
  - **`endings`**, blob'un mevcut işletim sisteminin yeni satır karakterlerine (`\r\n\` veya `\n`) uyumlu olabilmesi için satır sonu karakterlerinin dönüştürülüp dönüştürülmeyeceği ayarı. Varsayılan olarak `"şeffaf"` (hiçbir şey yapma) şeklindedir, fakat aynı şekilde `"yerel"` (dönüştür) değeri de alabilir.
=======
- **`blobParts`** is an array of `Blob`/`BufferSource`/`String` values.
- **`options`** optional object:
  - **`type`** -- `Blob` type, usually MIME-type, e.g. `image/png`,
  - **`endings`** -- whether to transform end-of-line to make the `Blob` correspond to current OS newlines (`\r\n` or `\n`). By default `"transparent"` (do nothing), but also can be `"native"` (transform).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Örneğin:

```js
// bir karakter dizisinden Blob oluştur
let blob = new Blob(["<html>…</html>"], {type: 'text/html'});
// not: ilk argüman bir dizi olmalıdır [...]
```

```js
<<<<<<< HEAD
// tipli dizi ve karakter dizilerinden bir Blob oluştur
let hello = new Uint8Array([72, 101, 108, 108, 111]); // ikili formatta "hello" değeri
=======
// create Blob from a typed array and strings
let hello = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in binary form
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

let blob = new Blob([hello, ' ', 'world'], {type: 'text/plain'});
```


<<<<<<< HEAD
Blob dilimlerini şöyle çıkartabiliriz:
=======
We can extract `Blob` slices with:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
blob.slice([byteStart], [byteEnd], [contentType]);
```

- **`byteStart`** başlangıç Byte'ı, varsayılan olarak 0'dır.
- **`byteEnd`** son Byte (özel, varsayılan olarak sona kadardır)
- **`contentType`** yeni blob'un `type`ı, varsayılan olarak kaynakla aynıdır

Argümanlar `array.slice` ile benzerdir, negatif sayılar da kabul edilir.

<<<<<<< HEAD
```smart header="Blob'lar değişmezdir"
Blob'taki bir veriyi doğrudan değiştiremeyiz fakat blob'u parçalara bölerek bunlardan yeni blob'lar yaratıp bunları da yeni bir blob'ta birleştirebiliriz vesaire.
=======
```smart header="`Blob` objects are immutable"
We can't change data directly in a `Blob`, but we can slice parts of a `Blob`, create new `Blob` objects from them, mix them into a new `Blob` and so on.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Bu durum JavaScript karakter dizilerininkine benzerdir: bir karakter dizisindeki bir karakteri değiştiremeyiz, fakat düzeltilmiş yeni bir karakter dizisi oluşturabiliriz.
```

## URL olarak Blob

<<<<<<< HEAD
Bir Blob `<a>`, `<img>` gibi etiketler için, içeriklerini göstermek adına kolayca URL olarak kullanılabilir.

`type` özelliği sağ olsun aynı zamanda blob indirip yükleyebiliriz ve doğal bir şekilde `Content-Type` değerini de ağ isteği içerisinde taşıyor olacaktır.

Basit bir örnekle başlayalım. Linke\
 tıkladığınızda `Merhaba Dünya` içeriğini taşıyan, dinamik olarak oluşturulmuş bir blob'u bir dosya olarak indirebiliyor olun.
=======
A Blob can be easily used as a URL for `<a>`, `<img>` or other tags, to show its contents.

Thanks to `type`, we can also download/upload `Blob` objects, and the `type` naturally becomes `Content-Type` in network requests.

Let's start with a simple example. By clicking on a link you download a dynamically-generated `Blob` with `hello world` contents as a file:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```html run
<!-- download özelliği tarayıcıyı adrese gitmektense indirmeye zorlayacaktır -->
<a download="hello.txt" href='#' id="link">İndir</a>

<script>
let blob = new Blob(["Merhaba Dünya!"], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);
</script>
```

Aynı zamanda JavaScript'te bir link yaratabilir ve tıklama eylemini `link.click()` ile simüle edebiliriz, ardından indirme otomatik olarak başlayacaktır.

<<<<<<< HEAD
Aşağıda hiç HTML içermeden kullanıcının yaratılmış bir Blob'u otomatik olarak indirmesini sağlayacak bir kod yer alıyor:
=======
Here's the similar code that causes user to download the dynamically created `Blob`, without any HTML:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let link = document.createElement('a');
link.download = 'merhaba.txt';

let blob = new Blob(['Merhaba Dünya!'], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);

link.click();

URL.revokeObjectURL(link.href);
```

<<<<<<< HEAD
`URL.createObjectURL`, bir blob'u alır ve ondan `blob:<kaynak>:<uuid>` formatında benzersiz bir URL oluşturur.
=======
`URL.createObjectURL` takes a `Blob` and creates a unique URL for it, in the form `blob:<origin>/<uuid>`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

`link.href`in değeri şunun gibi olacaktır:

```
blob:https://tr.javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273
```

<<<<<<< HEAD
`URL.createObjectURL` ile oluşturulmuş her bir URL'in tarayıcısı, url -> blob iç adreslemesini barındırır. Bu nedenle URL'ler kısadır fakat blob'a erişmeye izin verir.

Oluşturulmuş URL (ve dolayısıyla onunla bağlantılı link) yalnızca içinde bulunduğu mevcut belge için, açık olduğu sürece geçerlidir ve `<img>`, `<a>` gibi, bir URL bekleyen herhangi bir objedeki blob'u göstermeyi sağlar.

Ancak burada bir yan etki vardır. Bir blob adreslendiğinde blob'un kendisi hafızada bulunur. Tarayıcı onu hafızadan silemez.

Adresleme döküman kapatıldığında otomatik olarak silinir, böylece blob'lar temizlenmiş olur. Ancak uygulama uzun ömürlü bir yapıdaysa bu hemen gerçekleşmeyecektir.

**Bu nedenle yeni bir URL oluşturduğumuzda ona ihtiyacımız kalmasa bile blob hafızada tutulmaya devam edecektir.**

`URL.revokeObjectURL(url)`, referansı iç adreslemeden silecektir; böylece blob'un silinmesini (eğer başka referans kalmadıysa) ve hafızanın boşaltılmasını sağlayacaktır.

Son örnekte blob'un yalnızca bir kere anlık indirme için kullanılacağı bir senaryo oluşturduk ve direkt olarak `URL.revokeObjectURL(link.href)` metodunu çağırdık.

Ancak tıklanabilir bir HTML linki bulunan önceki örnekte `URL.revokeObjectURL(link.href)` metodunu çağırmadık çünkü bu durum blob'u geçersiz kılacaktı. Kaldırmanın ardından adreslemenin silinmesiyle URL bir daha çalışmayacaktı.
=======
For each URL generated by `URL.createObjectURL` the browser stores a URL -> `Blob` mapping internally. So such URLs are short, but allow to access the `Blob`.

A generated URL (and hence the link with it) is only valid within the current document, while it's open. And it allows to reference the `Blob` in `<img>`, `<a>`, basically any other object that expects a URL.

There's a side effect though. While there's a mapping for a `Blob`, the `Blob` itself resides in the memory. The browser can't free it.

The mapping is automatically cleared on document unload, so `Blob` objects are freed then. But if an app is long-living, then that doesn't happen soon.

**So if we create a URL, that `Blob` will hang in memory, even if not needed any more.**

`URL.revokeObjectURL(url)` removes the reference from the internal mapping, thus allowing the `Blob` to be deleted (if there are no other references), and the memory to be freed.

In the last example, we intend the `Blob` to be used only once, for instant downloading, so we call `URL.revokeObjectURL(link.href)` immediately.

In the previous example with the clickable HTML-link, we don't call `URL.revokeObjectURL(link.href)`, because that would make the `Blob` url invalid. After the revocation, as the mapping is removed, the URL doesn't work any more.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Blob'tan base64'e

<<<<<<< HEAD
`URL.createObjectURL`'a bir alternatif de blob'u base64 olarak kodlanmış bir karakter dizisine dönüştürmek.
=======
An alternative to `URL.createObjectURL` is to convert a `Blob` into a base64-encoded string.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Bu kodlama, ikili veriyi oldukça güvenilir şekilde 0'dan 64'e ASCII kodlarından oluşan "okunabilir" karakterlerle temsil eder ve daha da önemlisi bu kodlamayı "veri URL'leri" içinde kullanabiliriz.

<<<<<<< HEAD
Bir [veri URL'i](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) `data:[<mediatype>][;base64],<data>` formundadır. Bu tür URL'leri sıradan URL'lerle birebir aynı şekilde her yerde kullanabiliriz.
=======
A [data url](mdn:/http/Data_URIs) has the form `data:[<mediatype>][;base64],<data>`. We can use such urls everywhere, on par with "regular" urls.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Örneğin bu bir gülümseme ifadesi:

```html
<img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">
```

Tarayıcı bu karakter dizisini çözecek ve resmi gösterecek: <img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">


<<<<<<< HEAD
Blob'u base64'e çevirmek için `FileReader` yerleşik objesini kullanacağız. Bu, blob'lardan birçok formatta veri okuyabilmekte. [bir sonraki bölümde](info:file) bunu daha derinlemesine ele alacağız.
=======
To transform a `Blob` into base64, we'll use the built-in `FileReader` object. It can read data from Blobs in multiple formats. In the [next chapter](info:file) we'll cover it more in-depth.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Aşağıdaki bir blob indirmenin bu defa base64 ile olan bir demosu:

```js run
let link = document.createElement('a');
link.download = 'merhaba.txt';

let blob = new Blob(['Merhaba Dünya'], {type: 'text/plain'});

*!*
let reader = new FileReader();
reader.readAsDataURL(blob); // blob'u base64'e çevirir ve onload'ı çağırır
*/!*

reader.onload = function() {
  link.href = reader.result; // veri URL'i
  link.click();
};
```

<<<<<<< HEAD
Bir blob oluşturmanın bu iki yolu da kullanılabilir ancak genellikle `URL.createObjectURL(blob)` daha basit ve hızlıdır.

```compare title-plus="URL.createObjectURL(blob)" title-minus="Blob'tan veri URL'i"
+ Hafızaya önem veriyorsak kaldırmamız gerekiyor..
+ Blob'a doğrudan erişim. "Kodlama/çözme" yok.
- Herhangi bir şey kaldırmamız gerekmiyor.
- Performans ve hafıza büyük blob'ların kodlanması için harcanır.
=======
Both ways of making a URL of a `Blob` are usable. But usually `URL.createObjectURL(blob)` is simpler and faster.

```compare title-plus="URL.createObjectURL(blob)" title-minus="Blob to data url"
+ We need to revoke them if care about memory.
+ Direct access to blob, no "encoding/decoding"
- No need to revoke anything.
- Performance and memory losses on big `Blob` objects for encoding.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Resim'den blob'a

<<<<<<< HEAD
Bir resmin blob'unu oluşturabiliriz, bir resim parçası olabilir veya sayfanın ekran görüntüsünü dahi oluşturabiliriz. Bir yerlere yükleme yapmak için oldukça kullanışlı.
=======
We can create a `Blob` of an image, an image part, or even make a page screenshot. That's handy to upload it somewhere.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Resim işlemleri `<canvas>` öğesi aracılığıyla yapılır:

<<<<<<< HEAD
1. Canvas üzerinde [canvas.drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) kullanarak bir resim çiz (veya bir parçasını).
2. Canvas'ın bir blob oluşturan ve tamamlandığında `callback`ini çalıştıran [.toBlob(callback, format, quality)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob) metodunu çağır.
=======
1. Draw an image (or its part) on canvas using [canvas.drawImage](mdn:/api/CanvasRenderingContext2D/drawImage).
2. Call canvas method [.toBlob(callback, format, quality)](mdn:/api/HTMLCanvasElement/toBlob) that creates a `Blob` and runs `callback` with it when done.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Aşağıdaki örnekte resim henüz kopyalanmış ancak bu durumda onu kesebiliriz veya bir blob oluşturmadan önce dönüştürebiliriz:

```js run
// bir resim al
let img = document.querySelector('img');

// aynı boyutlarda <canvas> oluştur
let canvas = document.createElement('canvas');
canvas.width = img.clientWidth;
canvas.height = img.clientHeight;

let context = canvas.getContext('2d');

// resmi içine kopyala (bu metot resmi kesmeye izin verir)
context.drawImage(img, 0, 0);
// context.rotate() yapabiliriz ve canvas üzerinde birçok başka işlemde bulunabiliriz

<<<<<<< HEAD
// toBlob asenkron bir işlem, tamamlandığında callback çağırılacak
=======
// toBlob is async operation, callback is called when done
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
canvas.toBlob(function(blob) {
  // blob hazır, indir
  let link = document.createElement('a');
  link.download = 'example.png';

  link.href = URL.createObjectURL(blob);
  link.click();

  // tarayıcının hafızadan temizleyebilmesi için iç blob referansını sil
  URL.revokeObjectURL(link.href);
}, 'image/png');
```

If we prefer `async/await` instead of callbacks:
```js
let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
```

For screenshotting a page, we can use a library such as <https://github.com/niklasvh/html2canvas>. What it does is just walks the page and draws it on `<canvas>`. Then we can get a `Blob` of it the same way as above.

## Blob'tan ArrayBuffer'a

`Blob` kurucu metodu, herhangi bir `BufferSource` içeren neredeyse her şeyden bir blob yaratabilmeye olanak sağlar.

<<<<<<< HEAD
Yine de düşük seviye bir işleme ihtiyacımız varsa `FileReader`ı kullanarak en düşük seviyeli `ArrayBuffer`ı alabiliriz:

```js
// blob'tan fileReader al
let fileReader = new FileReader();
=======
But if we need to perform low-level processing, we can get the lowest-level `ArrayBuffer` from `blob.arrayBuffer()`:

```js
// get arrayBuffer from blob
const bufferPromise = await blob.arrayBuffer();
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

// or
blob.arrayBuffer().then(buffer => /* process the ArrayBuffer */);
```

## From Blob to stream

When we read and write to a blob of more than `2 GB`, the use of `arrayBuffer` becomes more memory intensive for us. At this point, we can directly convert the blob to a stream.

A stream is a special object that allows to read from it (or write into it) portion by portion. It's outside of our scope here, but here's an example, and you can read more at <https://developer.mozilla.org/en-US/docs/Web/API/Streams_API>. Streams are convenient for data that is suitable for processing piece-by-piece.

The `Blob` interface's `stream()` method returns a `ReadableStream` which upon reading returns the data contained within the `Blob`.

Then we can read from it, like this:

```js
// get readableStream from blob
const readableStream = blob.stream();
const stream = readableStream.getReader();

while (true) {
  // for each iteration: value is the next blob fragment
  let { done, value } = await stream.read();
  if (done) {
    // no more data in the stream
    console.log('all blob processed.');
    break;
  }

   // do something with the data portion we've just read from the blob
  console.log(value);
}
```

## Özet

`ArrayBuffer`, `Uint8Array` ve diğer `BufferSource`lar "ikili veri"ler iken [Blob](https://www.w3.org/TR/FileAPI/#dfn-Blob) "tipi olan ikili veri"yi temsil eder.

Bu, Blob'ları tarayıcıda çok yaygın olan indirme/yükleme işlemleri için uygun hale getirir.

<<<<<<< HEAD
[XMLHttpRequest](info:xmlhttprequest), [fetch](info:fetch-basics) gibi web isteği gerçekleştiren metotlar, diğer ikili verilerle olduğu gibi `Blob` ile de doğal olarak çalışabilir.

`Blob` ve düşük seviye ikili veri tiplerini kolayca birbiri arasında dönüştürebiliriz:

- `new Blob(...)` kurucu metodunu kullanarak tipli bir diziden bir blob oluşturabiliriz.
- Blob'tan `ArrayBuffer`a `FileReader` kullanarak dönebiliriz ve ardından düşük seviye ikili veri işleme işlemleri için bir view oluşturabiliriz.
=======
Methods that perform web-requests, such as [XMLHttpRequest](info:xmlhttprequest), [fetch](info:fetch) and so on, can work with `Blob` natively, as well as with other binary types.

We can easily convert between `Blob` and low-level binary data types:

- We can make a `Blob` from a typed array using `new Blob(...)` constructor.
- We can get back `ArrayBuffer` from a Blob using `blob.arrayBuffer()`, and then create a view over it for low-level binary processing.

Conversion streams are very useful when we need to handle large blob. You can easily create a `ReadableStream` from a blob. The `Blob` interface's `stream()` method returns a `ReadableStream` which upon reading returns the data contained within the blob.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
