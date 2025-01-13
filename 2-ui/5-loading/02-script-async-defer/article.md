
# Komut Dosyaları (Scripts): async, defer

Modern websitelerinde, genellikle script'ler HTML'den daha baskındır: script'lerin dosya/indirme boyutları büyüktür ve işlenme süreleri uzundur.

<<<<<<< HEAD
Tarayıcı, HTML'i yüklerken `<script>...</script>` etiketiyle karşılaştığında, DOM'u oluşturmaya devam edemez. Böyle bir durumda script'i çalıştırmak zorundadır. Benzer durum `<script src="..."></script>` şeklinde dışarıdan aktarılan script'ler içinde geçerlidir: Tarayıcı script indirilene kadar bekleyecek, sonrasında onu çalıştıracak ve en sonunda sayfanın geri kalananı işleyecektir.
=======
When the browser loads HTML and comes across a `<script>...</script>` tag, it can't continue building the DOM. It must execute the script right now. The same happens for external scripts `<script src="..."></script>`: the browser must wait for the script to download, execute the downloaded script, and only then can it process the rest of the page.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Bu durum iki önemli soruna yol açar:

<<<<<<< HEAD
1. Script'ler, onların altındaki DOM öğelerini (element) göremeyebilir, yani işleyici fonksiyonlar (handlers) vb. ekleyemezsiniz.
2. Sayfanın üst kısmında büyük bir script varsa, bu "sayfanın yüklenmesini engeller". Kullanıcılar, script indirilip, çalıştırılana kadar sayfa içeriğini göremez. 
=======
1. Scripts can't see DOM elements below them, so they can't add handlers etc.
2. If there's a bulky script at the top of the page, it "blocks the page". Users can't see the page content till it downloads and runs:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```html run height=100
<p>...script'ten önceki içerik...</p>

<script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- Bu, script yüklenene kadar gözükmeyecek -->
<p>...script'ten sonraki içerik...</p>
```

Bunun içi bazı geçici çözümler vardır. Örneğin, script'i sayfanın alt kısmına yerleştirebiliriz. Bu sayede script, kendinden önce bulunan öğeleri görebilir ve sayfa içeriğinin görüntülenmesini engellemez:

```html
<body>
  ...tüm içerik script'in üzerindedir...

  <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
</body>
```

Fakat bu çözüm mükemmel olmaktan uzaktır. Örneğin, tarayıcı, script'i HTML belgesinin tamamını indirdikten sonra farkeder (ve onu indirmeye başlayabilir). Uzun HTML belgelesi için, bu fark edilebilir bir gecikme olabilir.

<<<<<<< HEAD
Bu tür durumlar çok hızlı bir internet bağlantısına sahip olanlar için önemsizdir, fakat dünyada birçok insan hala yavaş bir internet hızına sahip ve mükemmel olmaktan uzak olan mobil interneti kullanıyor.
=======
Such things are invisible for people using very fast connections, but many people in the world still have slow internet speeds and use a far-from-perfect mobile internet connection.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Neyse ki, bizim için bu sorunu çözen iki tane `<script>` niteliği (attribute) vardır: `defer` ve `async`. 

## defer

<<<<<<< HEAD
`defer` niteliği, tarayıcıya sayfayı yüklemeye devam etmesini, ve script'in "arkaplanda" yüklemesini, sonrasında sayfa yüklendikten sonra script'in çalıştırılmasını söyler.
=======
The `defer` attribute tells the browser not to wait for the script. Instead, the browser will continue to process the HTML, build DOM. The script loads "in the background", and then runs when the DOM is fully built.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Yukarıdaki ile aynı örnek, fakat burada `defer` niteliği mevcut:

```html run height=100
<p>...script'lerden önceki içerik...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- hemen görülebilir -->
<p>...script'lerden sonraki içerik...</p>
```

<<<<<<< HEAD
- `defer` kullanılan script, sayfayı engellemez.
- `defer` kullanılan script, her zaman DOM hazır olduğunda, `DOMContentLoaded` olayından (event) önce çalıştırılır.

Aşağıdaki örnek bunu göstermektedir:
=======
In other words:

- Scripts with `defer` never block the page.
- Scripts with `defer` always execute when the DOM is ready (but before `DOMContentLoaded` event).

The following example demonstrates the second part:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```html run height=100
<p>...script'lerden önceki içerik...</p>

<script>
<<<<<<< HEAD
  document.addEventListener('DOMContentLoaded', () => alert("DOM ertelemeden (defer) sonra hazır!")); // (2)
=======
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready after defer!"));
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...script'lerden sonraki içerik...</p>
```

<<<<<<< HEAD
1. Sayfa içeriği hemen görünür.
2. `DOMContentLoaded`, ertelenmiş (deferred) script'i bekler. Sadece script `(2)` indirilip, çalıştırıldığında tetiklenir. 

Ertelenmiş script'ler (deferred scripts), tıpkı normal script'ler gibi göreli sıralarını korurlar.

Yani, ilk olarak büyük bir script'e ve sonrasında küçük bir tanesine sahipsek, sonuncusu bekler.
=======
1. The page content shows up immediately.
2. `DOMContentLoaded` event handler waits for the deferred script. It only triggers when the script is downloaded and executed.

**Deferred scripts keep their relative order, just like regular scripts.**

Let's say, we have two deferred scripts: the `long.js` and then `small.js`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```html
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```

<<<<<<< HEAD
```smart header="Küçük komut dosyası önce indirilir, sonra çalıştırılır."
Tarayıcılar, performansı artırmak için sayfadaki komut dosyalarını tarar ve paralel/eş zamanlı olarak indirmeye başlar. Yani yukarıdaki örnekte her iki komut dosyasıda eş zamanlı olarak indirilir. Muhtemelen `small.js` ilk önce indirilecektir.

Ancak komut dosyalarının sayfadaki sıraya göre çalıştırılması gerekir, bu nedenle `long.js` çalıştırılmasını bekler.
```
=======
Browsers scan the page for scripts and download them in parallel, to improve performance. So in the example above both scripts download in parallel. The `small.js` probably finishes first.

...But the `defer` attribute, besides telling the browser "not to block", ensures that the relative order is kept. So even though `small.js` loads first, it still waits and runs after `long.js` executes.

That may be important for cases when we need to load a JavaScript library and then a script that depends on it.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```smart header="`defer` niteliği yalnızca dışarıdan aktarılan komut dosyaları içindir"
Eğer `<script>` etiketinde `src` yoksa `defer` niteliği yok sayılır.
```

## async

<<<<<<< HEAD
`async` niteliği, bir script'in tamamiyle bağımsız olduğu anlamına gelir:

- Sayfa asenkron script'leri (async scripts) beklemez, içerik işlenir ve görüntülenir.
- `DOMContentLoaded` ve asenkron script'ler (async scripts) birbirlerini beklemezler:
    - `DOMContentLoaded` ya bir asenkron script'ten (async script) önce gerçekleşebilir (bir asenkron script sayfa tamamlandıktan sonra yüklemeyi bitirirse)
    - ...ya da bir asenkron script'ten sonra (bir asenkron script küçük ya da HTTP önbelleğinde mevcut ise)
- Diğer script'ler, `async` script'leri için, `async` script'leri de onlar için beklemez.
=======
The `async` attribute is somewhat like `defer`. It also makes the script non-blocking. But it has important differences in the behavior.

The `async` attribute means that a script is completely independent:

- The browser doesn't block on `async` scripts (like `defer`).
- Other scripts don't wait for `async` scripts, and `async` scripts don't wait for them.
- `DOMContentLoaded` and async scripts don't wait for each other:
    - `DOMContentLoaded` may happen both before an async script (if an async script finishes loading after the page is complete)
    - ...or after an async script (if an async script is short or was in HTTP-cache)
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

In other words, `async` scripts load in the background and run when ready. The DOM and other scripts don't wait for them, and they don't wait for anything. A fully independent script that runs when loaded. As simple, as it can get, right?

<<<<<<< HEAD
Dolasıyla, birden fazla `async` script'imiz varsa, onlar herhangi bir sırada çalıştırılır. İlk önce hangisi yüklenirse o çalıştırılır: 
=======
Here's an example similar to what we've seen with `defer`: two scripts `long.js` and `small.js`, but now with `async` instead of `defer`.

They don't wait for each other. Whatever loads first (probably `small.js`) -- runs first:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```html run height=100
<p>...script'lerden önceki içerik...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM hazır!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...script'lerden sonraki içerik...</p>
```

<<<<<<< HEAD
1. Sayfa içeriği hemen görünür: `async` sayfayı engellemez.
2. `DOMContentLoaded`, `async`'den öncede gerçekleşebilir, sonrada gerçekleşebilir. Burada garanti yok.
3. Asenkron script'ler birbirlerini beklemezler. Küçük script `small.js` ikinci sıradadır, fakat muhtemelen `long.js`'den önce yüklenecektir, dolayısıyla önce o çalıştırılacaktır. Buna "ilk sıradakini yükle" denir.
=======
- The page content shows up immediately: `async` doesn't block it.
- `DOMContentLoaded` may happen both before and after `async`, no guarantees here.
- A smaller script `small.js` goes second, but probably loads before `long.js`, so `small.js` runs first. Although, it might be that `long.js` loads first, if cached, then it runs first. In other words, async scripts run in the "load-first" order.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Asenkron script'ler, bağımsız bir üçüncü taraf script'i sayfaya eklediğimizde harikadır: sayaçlar, reklamlar vb. bizim script'lerimize bağlı olmadıkları için komut dosyalarımız onları beklememelidir.

```html
<!-- Google Analytics genellikle bu şekilde eklenir -->
<script async src="https://google-analytics.com/analytics.js"></script>
```

```smart header="The `async` attribute is only for external scripts"
Just like `defer`, the `async` attribute is ignored if the `<script>` tag has no `src`.
```

## Dinamik Komut Dosyaları (Dynamic Scripts)

<<<<<<< HEAD
Ayrıca, JavaScript kullanarak dinamik olarak bir script ekleyebiliriz:
=======
There's one more important way of adding a script to the page.

We can create a script and append it to the document dynamically using JavaScript:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";
document.body.append(script); // (*)
```

Script `(*)`, belgeye eklenir eklenmez yüklenmeye başlar.

**Dinamik scriptler varsayılan olarak "async" gibi davranır..**

Yani:
- Onlar herhangi bir şeyi beklemezler, hiçbir şeyde onları beklemez.
- İlk yüklenen script, önce çalıştırılır ("ilk sıradakini yükle")

<<<<<<< HEAD
`async` özelliğini `false` olarak ayarlarsak, yükleme sırasını belge sırası olacak şekilde değiştirebiliriz:

```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";

*!*
script.async = false;
*/!*

document.body.append(script);
```

Örneğin, burada iki adet script ekledik. `script.async=false` olmadığından ilk sıradakini yükleye göre çalıştırılacaktı (muhtemelen `small.js` önce çalışacaktı). Fakat bu flag sayesinde sıra "belgedeki sıra gibi" olur.
=======
This can be changed if we explicitly set `script.async=false`. Then scripts will be executed in the document order, just like `defer`.

In this example, `loadScript(src)` function adds a script and also sets `async` to `false`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

So `long.js` always runs first (as it's added first):

```js run
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}

// long.js, async=false olduğundan dolayı önce çalıştırılır.
loadScript("/article/script-async-defer/long.js");
loadScript("/article/script-async-defer/small.js");
```

Without `script.async=false`, scripts would execute in default, load-first order (the `small.js` probably first).

Again, as with the `defer`, the order matters if we'd like to load a library and then another script that depends on it.


## Özet

<<<<<<< HEAD
`async` ve `defer` niteliklerinin ortak bir özelliği vardır: sayfanın yüklenmesini (render) engellemezler. Böylece kullanıcı sayfa içeriğini okuyabilir ve sayfayla hemen etkileşime geçebilir.
=======
Both `async` and `defer` have one common thing: downloading of such scripts doesn't block page rendering. So the user can read page content and get acquainted with the page immediately.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ancak aralarında temel farklılıklar vardır:

|         | Sıra | `DOMContentLoaded` |
|---------|---------|---------|
<<<<<<< HEAD
| `async` | *İlk sırayı yükle*. Belgedeki sıraları önemleri değildir -- hangisi önce yüklenirse |  Alakasız. Henüz belgenin tamamı indirilmemişken yüklenebilir ve çalıştırılabilir. Bu durum, eğer scriptler küçük veya önbellekte mevcut ise ve belge yeterince uzun ise gerçekleşir.|
| `defer` | *Belge sırası* (belgeye girdikleri gibi). |  Belge yüklenip, çözümlendendikten sonra (gerekirse beklerler), `DOMContentLoaded` olayından (event) hemen önce çalıştırılır. |

```warn header="Sayfa, scriptler olmadan kullanılabilir olmalıdır."
`defer` kullanıyorsanız, lütfen sayfanın script yüklenmeden *önce* görüntüleneceğini unutmayın.

Yani kullanıcılar sayfayı okuyabilir, fakat bazı grafiksel bileşenler muhtemelen henüz hazır değildir.

Kullanıcıya neyin hazır olup, neyin olmadığını göstermek için uygun yerlere "yükleniyor" ifadesi yerleştirilmeli, çalışmayan düğmeler (button) devre dışı bırakılmalıdır.
```

Pratikte, `defer` tüm DOM'a ihtiyaç duyan ve/ya da göreli yürütme sırası önemli olan scriptler için kullanılır. Ve `async` sayaçlar, reklamlar gibi bağımsız scriptler için kullanılır. Ve onlarda sıra önemli değildir.
=======
| `async` | *Load-first order*. Their document order doesn't matter -- which loads first runs first |  Irrelevant. May load and execute while the document has not yet been fully downloaded. That happens if scripts are small or cached, and the document is long enough. |
| `defer` | *Document order* (as they go in the document). |  Execute after the document is loaded and parsed (they wait if needed), right before `DOMContentLoaded`. |

In practice, `defer` is used for scripts that need the whole DOM and/or their relative execution order is important.

And  `async` is used for independent scripts, like counters or ads. And their relative execution order does not matter.

```warn header="Page without scripts should be usable"
Please note: if you're using `defer` or `async`, then user will see the page *before* the script loads.

In such case, some graphical components are probably not initialized yet.

Don't forget to put "loading" indication and disable buttons that aren't functional yet. Let the user clearly see what he can do on the page, and what's still getting ready.
```
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
