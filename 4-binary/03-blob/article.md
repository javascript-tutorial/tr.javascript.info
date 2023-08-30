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

Adresleme döküman kapatıldığında otomatik olarak silinir, böylece blob'lar temizlenmiş olur. Ancak uygulama uzun ömürlü bir yapıdaysa bu hemen gerçekleşmeyecektir.

**Bu nedenle yeni bir URL oluşturduğumuzda ona ihtiyacımız kalmasa bile blob hafızada tutulmaya devam edecektir.**

`URL.revokeObjectURL(url)`, referansı iç adreslemeden silecektir; böylece blob'un silinmesini (eğer başka referans kalmadıysa) ve hafızanın boşaltılmasını sağlayacaktır.

Son örnekte blob'un yalnızca bir kere anlık indirme için kullanılacağı bir senaryo oluşturduk ve direkt olarak `URL.revokeObjectURL(link.href)` metodunu çağırdık.

Ancak tıklanabilir bir HTML linki bulunan önceki örnekte `URL.revokeObjectURL(link.href)` metodunu çağırmadık çünkü bu durum blob'u geçersiz kılacaktı. Kaldırmanın ardından adreslemenin silinmesiyle URL bir daha çalışmayacaktı.

## Blob'tan base64'e

`URL.createObjectURL`'a bir alternatif de blob'u base64 olarak kodlanmış bir karakter dizisine dönüştürmek.

Bu kodlama, ikili veriyi oldukça güvenilir şekilde 0'dan 64'e ASCII kodlarından oluşan "okunabilir" karakterlerle temsil eder ve daha da önemlisi bu kodlamayı "veri URL'leri" içinde kullanabiliriz.

Bir [veri URL'i](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) `data:[<mediatype>][;base64],<data>` formundadır. Bu tür URL'leri sıradan URL'lerle birebir aynı şekilde her yerde kullanabiliriz.

Örneğin bu bir gülümseme ifadesi:

```html
<img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">
```

Tarayıcı bu karakter dizisini çözecek ve resmi gösterecek: <img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">


Blob'u base64'e çevirmek için `FileReader` yerleşik objesini kullanacağız. Bu, blob'lardan birçok formatta veri okuyabilmekte. [bir sonraki bölümde](info:file) bunu daha derinlemesine ele alacağız.

Aşağıdaki bir blob indirmenin şimdi base64 ile olan bir demosu:

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

Bir blob oluşturmanın bu iki yolu da kullanılabilir ancak genellikle `URL.createObjectURL(blob)` daha basit ve hızlıdır.

```compare title-plus="URL.createObjectURL(blob)" title-minus="Blob'tan veri URL'i"
+ Hafızaya önem veriyorsak kaldırmamız gerekiyor..
+ Blob'a doğrudan erişim. "Kodlama/çözme" yok.
- Herhangi bir şey kaldırmamız gerekmiyor.
- Performans ve hafıza büyük blob'ların kodlanması için harcanır.
```

## Resim'den blob'a

Bir resmin blob'unu oluşturabiliriz, bir resim parçası olabilir veya sayfanın ekran görüntüsünü dahi oluşturabiliriz. Bir yerlere yükleme yapmak için oldukça kullanışlı.

Resim işlemleri `<canvas>` öğesi aracılığıyla yapılır:

1. Canvas üzerinde [canvas.drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) kullanarak bir resim çiz (veya bir parçasını).
2. Canvas'ın bir blob oluşturan ve tamamlandığında `callback`ini çalıştıran [.toBlob(callback, format, quality)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob) metodunu çağır.

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

// toBlob asenkron bir işlem, tamamlandığında callback çağırılacak
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

For screenshotting a page, we can use a library such as <https://github.com/niklasvh/html2canvas>. What it does is just walks the page and draws it on `<canvas>`. Then we can get a blob of it the same way as above.

## Blob'tan ArrayBuffer'a

`Blob` kurucu metodu, herhangi bir `BufferSource` içeren neredeyse her şeyden bir blob yaratabilmeye olanak sağlar.

Yine de düşük seviye bir işleme ihtiyacımız varsa `FileReader`ı kullanarak en düşük seviyeli `ArrayBuffer`ı alabiliriz:

```js
// blob'tan fileReader al
let fileReader = new FileReader();

*!*
fileReader.readAsArrayBuffer(blob);
*/!*

fileReader.onload = function(event) {
  let arrayBuffer = fileReader.result;
};
```


## Özet

`ArrayBuffer`, `Uint8Array` ve diğer `BufferSource`lar "ikili veri"ler iken [Blob](https://www.w3.org/TR/FileAPI/#dfn-Blob) "tipi olan ikili veri"yi temsil eder.

Bu, Blob'ları tarayıcıda çok yaygın olan indirme/yükleme işlemleri için uygun hale getirir.

[XMLHttpRequest](info:xmlhttprequest), [fetch](info:fetch-basics) gibi web isteği gerçekleştiren metotlar, diğer ikili verilerle olduğu gibi `Blob` ile de doğal olarak çalışabilir.

`Blob` ve düşük seviye ikili veri tiplerini kolayca birbiri arasında dönüştürebiliriz:

- `new Blob(...)` kurucu metodunu kullanarak tipli bir diziden bir blob oluşturabiliriz.
- Blob'tan `ArrayBuffer`a `FileReader` kullanarak dönebiliriz ve ardından düşük seviye ikili veri işleme işlemleri için bir view oluşturabiliriz.
