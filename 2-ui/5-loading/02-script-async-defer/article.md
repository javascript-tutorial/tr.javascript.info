
# Komut Dosyaları (Scripts): async, defer

Modern websitelerinde, genellikle komut dosyaları (scripts), HTML kodlarından daha yoğunluktadır: onların indirme boyutu daha fazla ve işlem süreleri daha uzundur.

Tarayıcı HTML'i yüklediği sırada `<script>...</script>` kısmına denk geldiğinde, DOM'u oluşturmaya devam edemeyebilir. Tarayıcı böyle bir durumda script'i çalıştırmak zorundadır. Benzer durum `<script src="..."></script>` şeklinde dışarıdan aktarılan script'ler içinde geçerlidir: tarayıcı, script indirilene kadar bekleyecek, onu çalıştıracak ve sonrasında sayfanın geri kalanını işleyecektir.

Bu durum iki önemli soruna yol açar:

1. Script'ler, onların altındaki DOM öğelerini (element) göremeyebilir, yani işleyici fonksiyonlar (handlers) vb. ekleyemezsiniz.
2. Sayfanın üst kısmında büyük bir script varsa, bu "sayfanın yüklenmesini engeller". Kullanıcılar, script indirilip, çalıştırılana kadar sayfa içeriğini göremez. 

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

Bu tür durumlar çok hızlı bir internet bağlantısına sahip olanlar için önemsizdir, fakat dünyada birçok insan hala yavaş bir internet hızına sahip ve mükemmel olmaktan uzak olan mobil interneti kullanıyor.

Neyse ki, bizim için bu sorunu çözen iki tane `<script>` niteliği (attribute) vardır: `defer` ve `async`. 

## defer

`defer` niteliği, tarayıcıya sayfayı yüklemeye devam etmesini, ve script'in "arkaplanda" yüklemesini, sonrasında sayfa yüklendikten sonra script'in çalıştırılmasını söyler.

Yukarıdaki ile aynı örnek, fakat burada `defer` niteliği mevcut:

```html run height=100
<p>...script'lerden önceki içerik...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- hemen görülebilir -->
<p>...script'lerden sonraki içerik...</p>
```

- `defer` kullanılan script, sayfayı engellemez.
- `defer` kullanılan script, her zaman DOM hazır olduğunda, `DOMContentLoaded` olayından (event) önce çalıştırılır.

Aşağıdaki örnek bunu göstermektedir:

```html run height=100
<p>...script'lerden önceki içerik...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ertelemeden (defer) sonra hazır!")); // (2)
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...script'lerden sonraki içerik...</p>
```

1. Sayfa içeriği hemen görünür.
2. `DOMContentLoaded`, ertelenmiş (deferred) script'i bekler. Sadece script `(2)` indirilip, çalıştırıldığında tetiklenir. 

Ertelenmiş script'ler (deferred scripts), tıpkı normal script'ler gibi göreli sıralarını korurlar.

Yani, ilk olarak büyük bir script'e ve sonrasında küçük bir tanesine sahipsek, sonuncusu bekler.

```html
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```

```smart header="Küçük komut dosyası önce indirilir, sonra çalıştırılır."
Tarayıcılar, performansı artırmak için sayfadaki komut dosyalarını tarar ve paralel/eş zamanlı olarak indirmeye başlar. Yani yukarıdaki örnekte her iki komut dosyasıda eş zamanlı olarak indirilir. Muhtemelen `small.js` ilk önce indirilecektir.

Ancak komut dosyalarının sayfadaki sıraya göre çalıştırılması gerekir, bu nedenle `long.js` çalıştırılmasını bekler.
```

```smart header="`defer` niteliği yalnızca dışarıdan aktarılan komut dosyaları içindir"
Eğer `<script>` etiketinde `src` yoksa `defer` niteliği yok sayılır.
```


## async

`async` niteliği, bir script'in tamamiyle bağımsız olduğu anlamına gelir:

- Sayfa asenkron script'leri (async scripts) beklemez, içerik işlenir ve görüntülenir.
- `DOMContentLoaded` ve asenkron script'ler (async scripts) birbirlerini beklemezler:
    - `DOMContentLoaded` ya bir asenkron script'ten (async script) önce gerçekleşebilir (bir asenkron script sayfa tamamlandıktan sonra yüklemeyi bitirirse)
    - ...ya da bir asenkron script'ten sonra (bir asenkron script küçük ya da HTTP önbelleğinde mevcut ise)
- Diğer script'ler, `async` script'leri için, `async` script'leri de onlar için beklemez.


Dolasıyla, birden fazla `async` script'imiz varsa, onlar herhangi bir sırada çalıştırılır. İlk önce hangisi yüklenirse o çalıştırılır: 

```html run height=100
<p>...script'lerden önceki içerik...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM hazır!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...script'lerden sonraki içerik...</p>
```

1. Sayfa içeriği hemen görünür: `async` sayfayı engellemez.
2. `DOMContentLoaded`, `async`'den öncede gerçekleşebilir, sonrada gerçekleşebilir. Burada garanti yok.
3. Asenkron script'ler birbirlerini beklemezler. Küçük script `small.js` ikinci sıradadır, fakat muhtemelen `long.js`'den önce yüklenecektir, dolayısıyla önce o çalıştırılacaktır. Buna "ilk sıradakini yükle" denir.

Asenkron script'ler, bağımsız bir üçüncü taraf script'i sayfaya eklediğimizde harikadır: sayaçlar, reklamlar vb. bizim script'lerimize bağlı olmadıkları için komut dosyalarımız onları beklememelidir.

```html
<!-- Google Analytics genellikle bu şekilde eklenir -->
<script async src="https://google-analytics.com/analytics.js"></script>
```


## Dinamik Komut Dosyaları (Dynamic Scripts)

Ayrıca, JavaScript kullanarak dinamik olarak bir script ekleyebiliriz:

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


## Özet

`async` ve `defer` niteliklerinin ortak bir özelliği vardır: sayfanın yüklenmesini (render) engellemezler. Böylece kullanıcı sayfa içeriğini okuyabilir ve sayfayla hemen etkileşime geçebilir.

Ama onların arasında temel farklılıklar var:

|         | Sıra | `DOMContentLoaded` |
|---------|---------|---------|
| `async` | *İlk sırayı yükle*. Belgedeki sıraları önemleri değildir -- hangisi önce yüklenirse |  Alakasız. Henüz belgenin tamamı indirilmemişken yüklenebilir ve çalıştırılabilir. Bu durum, eğer scriptler küçük veya önbellekte mevcut ise ve belge yeterince uzun ise gerçekleşir.|
| `defer` | *Belge sırası* (belgeye girdikleri gibi). |  Belge yüklenip, çözümlendendikten sonra (gerekirse beklerler), `DOMContentLoaded` olayından (event) hemen önce çalıştırılır. |

```warn header="Sayfa, scriptler olmadan kullanılabilir olmalıdır."
`defer` kullanıyorsanız, lütfen sayfanın script yüklenmeden *önce* görüntüleneceğini unutmayın.

Yani kullanıcılar sayfayı okuyabilir, fakat bazı grafiksel bileşenler muhtemelen henüz hazır değildir.

Kullanıcıya neyin hazır olup, neyin olmadığını göstermek için uygun yerlere "yükleniyor" ifadesi yerleştirilmeli, çalışmayan düğmeler (button) devre dışı bırakılmalıdır.
```

Pratikte, `defer` tüm DOM'a ihtiyaç duyan ve/ya da göreli yürütme sırası önemli olan scriptler için kullanılır. Ve `async` sayaçlar, reklamlar gibi bağımsız scriptler için kullanılır. Ve onlarda sıra önemli değildir.
