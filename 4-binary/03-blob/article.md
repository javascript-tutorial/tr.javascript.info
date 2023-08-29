# Blob

`ArrayBuffer` ve view'lar, JavaScript'in bir parçası olan ECMA standardının bir parçasıdır.

Tarayıcıda başta `Blob` olmak üzere, [File API](https://www.w3.org/TR/FileAPI/)'da tanımlanmış olan çeşitli ek yüksek seviye nesneler de bulunur.

`Blob`, isteğe bağlı bir `type` karakter dizisi (genellikle bir MIME tipi) ve buna ek olarak `blobParts` - Başka `Blob` objelerinin, stringlerin ve `BufferSource`ların bir dizisi - bölümlerinden meydana gelir.

![](blob.svg)

Kurucu sözdizimi şu şekildedir:

```js
new Blob(blobParts, options);
```

- **`blobParts`**, `Blob`/`BufferSource`/`String` değerlerinden oluşan bir dizidir.
- **`options`** isteğe bağlı objesi:
  - **`type`** blob tipidir ve genellikle örneğin `image/png` gibi bir MIME tipidir.
  - **`endings`**, blob'un mevcut işletim sisteminin yeni satır karakterlerine (`\r\n\` veya `\n`) uyumlu olabilmesi için, için satır sonu karakterlerinin dönüştürülüp dönüştürülmeyeceği ayarı. Varsayılan olarak `"şeffaf"` (hiçbir şey yapma) şeklindedir, fakat aynı şekilde `"yerel"` (dönüştür) değeri de alabilir.

Örneğin:

```js
// bir karakter dizisinden Blob oluştur
let blob = new Blob(["<html>…</html>"], {type: 'text/html'});
// not: ilk argüman bir dizi olmalıdır [...]
```

```js
// tipli dizi ve karakter dizilerinden bir Blob oluştur
let hello = new Uint8Array([72, 101, 108, 108, 111]); // ikili formatta "hello" değeri

let blob = new Blob([hello, ' ', 'world'], {type: 'text/plain'});
```


Blob dilimlerini şöyle çıkartabiliriz:

```js
blob.slice([byteStart], [byteEnd], [contentType]);
```

- **`byteStart`** başlangıç Byte'ı, varsayılan olarak 0'dır.
- **`byteEnd`** son Byte (özel, varsayılan olarak sona kadardır)
- **`contentType`** yeni blob'un `type`ı, varsayılan olarak kaynakla aynıdır

Argümanlar `array.slice` ile benzerdir, negatif sayılar da kabul edilir.

```smart header="Blob'lar değişmezdir"
Blob'taki bir veriyi doğrudan değiştiremeyiz fakat blob'u parçalara bölerek bunlardan yeni blob'lar yaratıp bunları da yeni bir blob'ta birleştirebiliriz vesaire.

Bu durum JavaScript karakter dizilerininkine benzerdir: bir karakter dizisindeki bir karakteri değiştiremeyiz, fakat düzeltilmiş yeni bir karakter dizisi oluşturabiliriz.
```

## URL olarak Blob

Bir Blob `<a>`, `<img>` gibi etiketler için, içeriklerini göstermek adına kolayca URL olarak kullanılabilir.

`type` özelliği sağ olsun aynı zamanda blob indirip yükleyebiliriz ve doğal bir şekilde `Content-Type` değerini de ağ isteği içerisinde taşıyor olacaktır.

Basit bir örnekle başlayalım. Linke\
 tıkladığınızda `Merhaba Dünya` içeriğini taşıyan, dinamik olarak oluşturulmuş bir blob'u bir dosya olarak indirebiliyor olun.

```html run
<!-- download özelliği tarayıcıyı adrese gitmektense indirmeye zorlayacaktır -->
<a download="hello.txt" href='#' id="link">İndir</a>

<script>
let blob = new Blob(["Merhaba Dünya!"], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);
</script>
```

Aynı zamanda JavaScript'te bir link yaratabilir ve tıklama eylemini `link.click()` ile simüle edebiliriz, ardından indirme otomatik olarak başlayacaktır.

Aşağıda hiç HTML içermeden kullanıcının yaratılmış bir Blob'u otomatik olarak indirmesini sağlayacak bir kod yer alıyor:

```js run
let link = document.createElement('a');
link.download = 'merhaba.txt';

let blob = new Blob(['Merhaba Dünya!'], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);

link.click();

URL.revokeObjectURL(link.href);
```

`URL.createObjectURL`, bir blob'u alır ve ondan `blob:<kaynak>:<uuid>` formatında benzersiz bir URL oluşturur.

`link.href`in değeri şunun gibi olacaktır:

```
blob:https://tr.javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273
```

`URL.createObjectURL` ile oluşturulmuş her bir URL'in tarayıcısı, url -> blob iç adreslemesini barındırır. Bu nedenle URL'ler kısadır fakat blob'a erişmeye izin verir.

Oluşturulmuş URL (ve dolayısıyla onunla bağlantılı link) yalnızca içinde bulunduğu mevcut belge için, açık olduğu sürece geçerlidir ve `<img>`, `<a>` gibi, bir URL bekleyen herhangi bir objedeki blob'u göstermeyi sağlar.

Ancak burada bir yan etki vardır. Bir blob adreslendiğinde blob'un kendisi hafızada bulunur. Tarayıcı onu hafızadan silemez.

The mapping is automatically cleared on document unload, so blobs are freed then. But if an app is long-living, then that doesn't happen soon.

**So if we create an URL, that blob will hang in memory, even if not needed any more.**

`URL.revokeObjectURL(url)` removes the reference from the internal mapping, thus allowing the blob to be deleted (if there are no other references), and the memory to be freed.

In the last example, we intend the blob to be used only once, for instant downloading, so we call `URL.revokeObjectURL(link.href)` immediately.

In the previous example though, with the clickable HTML-link, we don't call `URL.revokeObjectURL(link.href)`, because that would make the blob url invalid. After the revocation, as the mapping is removed, the url doesn't work any more.

## Blob to base64

An alternative to `URL.createObjectURL` is to convert a blob into a base64-encoded string.

That encoding represents binary data as a string of ultra-safe "readable" characters with ASCII-codes from 0 to 64. And what's more important -- we can use this encoding in "data-urls".

A [data url](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) has the form `data:[<mediatype>][;base64],<data>`. We can use such urls everywhere, on par with "regular" urls.

For instance, here's a smiley:

```html
<img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">
```

The browser will decode the string and show the image: <img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">


To transform a blob into base64, we'll use the built-in `FileReader` object. It can read data from Blobs in multiple formats. In the [next chapter](info:file) we'll cover it more in-depth.

Here's the demo of downloading a blob, now via base-64:

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

*!*
let reader = new FileReader();
reader.readAsDataURL(blob); // converts the blob to base64 and calls onload
*/!*

reader.onload = function() {
  link.href = reader.result; // data url
  link.click();
};
```

Both ways of making an URL of a blob are usable. But usually `URL.createObjectURL(blob)` is simpler and faster.

```compare title-plus="URL.createObjectURL(blob)" title-minus="Blob to data url"
+ We need to revoke them if care about memory.
+ Direct access to blob, no "encoding/decoding"
- No need to revoke anything.
- Performance and memory losses on big blobs for encoding.
```

## Image to blob

We can create a blob of an image, an image part, or even make a page screenshot. That's handy to upload it somewhere.

Image operations are done via `<canvas>` element:

1. Draw an image (or its part) on canvas using [canvas.drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage).
2. Call canvas method [.toBlob(callback, format, quality)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob) that creates a blob and runs `callback` with it when done.

In the example below, an image is just copied, but we could cut from it, or transform it on canvas prior to making a blob:

```js run
// take any image
let img = document.querySelector('img');

// make <canvas> of the same size
let canvas = document.createElement('canvas');
canvas.width = img.clientWidth;
canvas.height = img.clientHeight;

let context = canvas.getContext('2d');

// copy image to it (this method allows to cut image)
context.drawImage(img, 0, 0);
// we can context.rotate(), and do many other things on canvas

// toBlob is async opereation, callback is called when done
canvas.toBlob(function(blob) {
  // blob ready, download it
  let link = document.createElement('a');
  link.download = 'example.png';

  link.href = URL.createObjectURL(blob);
  link.click();

  // delete the internal blob reference, to let the browser clear memory from it
  URL.revokeObjectURL(link.href);
}, 'image/png');
```

If we prefer `async/await` instead of callbacks:
```js
let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
```

For screenshotting a page, we can use a library such as <https://github.com/niklasvh/html2canvas>. What it does is just walks the page and draws it on `<canvas>`. Then we can get a blob of it the same way as above.

## From Blob to ArrayBuffer

The `Blob` constructor allows to create a blob from almost anything, including any `BufferSource`.

But if we need to perform low-level processing, we can get the lowest-level `ArrayBuffer` from it using `FileReader`:

```js
// get arrayBuffer from blob
let fileReader = new FileReader();

*!*
fileReader.readAsArrayBuffer(blob);
*/!*

fileReader.onload = function(event) {
  let arrayBuffer = fileReader.result;
};
```


## Summary

While `ArrayBuffer`, `Uint8Array` and other `BufferSource` are "binary data", a [Blob](https://www.w3.org/TR/FileAPI/#dfn-Blob) represents "binary data with type".

That makes Blobs convenient for upload/download operations, that are so common in the browser.

Methods that perform web-requests, such as [XMLHttpRequest](info:xmlhttprequest), [fetch](info:fetch-basics) and so on, can work with `Blob` natively, as well as with other binary types.

We can easily convert betweeen `Blob` and low-level binary data types:

- We can make a Blob from a typed array using `new Blob(...)` constructor.
- We can get back `ArrayBuffer` from a Blob using `FileReader`, and then create a view over it for low-level binary processing.
