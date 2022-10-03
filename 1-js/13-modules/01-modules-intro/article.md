
# Modüller, giriş

Uygulamalarımız büyüdükçe, onu dosyalar halinde bölmek isteriz. Bu dosyalar modül olarak isimlendirilir. Bir modül genellikle bir sınıf ya da kullanışlı fonksiyonları barındıran bir kütüphane içerir.

Uzun bir süredir JavaScript'te dil seviyesinde bir modül sözdizimi bulunmuyordu. Bu bir sorun değildi, çünkü başlangıçta program parçaları (scripts) küçük ve basitti. Dolayısıyla modüler yapıya ihtiyaç yoktu.

Ancak zamanla yazılan programlar karmaşıklaşınca, JavaScript topluluğu kodu modüller şeklinde organize etmenin çeşitli yollarını buldu.

Örneğin:

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- en eski modül sistemlerinden biri, başlangıçta [require.js](http://requirejs.org/) kütüphanesince gerçekleştirildi.
- [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) -- Node.js sunucusu için yaratılan modül sistemi.
- [UMD](https://github.com/umdjs/umd) -- geniş kapsamlı bir modül sistemi, AMD ve CommonJS ile uyumlu.

Artık tüm bu sistemlerin kullanımı yavaş yavaş azalmaktadır ancak yine de eski programlarda karşımıza çıkabilmektedirler. Dil seviyesindeki modül sistemi 2015 yılında standartlaştı ve o zamandan beri kademeli olarak evirilip, bugün başlıca tarayıcılar ve Node.js tarafından desteklenir hale geldi.

## Modül nedir?

Modül sadece bir dosyadır, tek bir program. Bu kadar basit.

`export` ve `import` yönergeleri modüller arasında işlevselliğin yer değiştirmesini sağlar:

- `export` anahtar kelimesi tanımlandıkları dosyanın dışında da ulaşılmak istenen değişken ve fonksiyonları etiketler.
- `import` başka modüldeki değişken ve fonksiyonların içeri aktarılmasına imkan tanır.

Örneğin, bir fonksiyonu dışarı aktaran bir `sayHi.js` dosyası varsa:

```js
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Merhaba, ${user}!`);
}
```

...Daha sonra başka bir dosya bunu içeri aktarıp, kullanabilir:

```js
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // fonksiyon...
sayHi('John'); // Merhaba, John!
```

Bu derste dilin kendisine odaklanacağız, ama tarayıcıyı gösterim ortamı olarak kullanacağımız için modüllerin tarayıcıda nasıl çalıştığına bakalım.

Modülleri kullanabilmek için, `<script>` etiketinin `type` niteliğini `<script type="module">`, şeklinde ayarlamalıyız:

[codetabs src="say" height="140" current="index.html"]

Tarayıcı içeri aktarılanları otomatik olarak getirir, değerlendirir ve programı çalıştırır.

## Temel modül özellikleri

Sıradan programlara göre modüllerde ne farklıdır?

Hem tarayıcı hem de sunucu taraflı JavaScript için geçerli temel özellikler vardır.

### Daima "use strict"

Modüller daima `strict` yapıdadır. Örneğin, deklare edilmemiş bir değişkene değer atama işlemi hata verir.

```html run
<script type="module">
  a = 5; // error
</script>
```

Bunu burada tarayıcıda görüyoruz ancak aynı durum tüm modüller için geçerlidir.

### Modül seviyesinde kapsam

Her modülün kendi üst seviye kapsamı vardır. Diğer bir deyişle, bir modülün üst seviyedeki değişken ve fonksiyonları, diğer programlarda görünmez.

Aşağıdaki örnekte, iki program içeri aktarılıyor ve `hello.js` `user.js` de deklare edilen `user` değişkenini kullanmaya çalışıp, hata veriyor:

[codetabs src="scopes" height="140" current="index.html"]

Modüller dışarıdan ulaşılmasını istediğini `export` ile dışa aktarmalı, ve `import` ile ihtiyaç duyduğunu içe aktarmalıdır.

Dolayısıyla `user.js` modülünü `index.html` yerine aşağıda gösterildiği gibi doğrudan `hello.js` dosyasına aktarmalıyız:

[codetabs src="scopes-working" height="140" current="hello.js"]

Tarayıcıda, Her bir `<script type="module">` için de bağımsız üst seviye kapsam bulunmaktadır:

```html run
<script type="module">
  // The variable is only visible in this module script
  let user = "John";
</script>

<script type="module">
  *!*
  alert(user); // Error: user is not defined
  */!*
</script>
```

Eğer gerçekten tarayıcı içi global bir değişkene ihtiyaç duyuyorsak, bu değişkeni (`user`) açık olarak `window` nesnesine atayıp, `window.user` ile ona ulaşabiliriz. Ancak bu işleme gerçekten makul bir sebep olduğunda başvurulmalıdır.

### Modülün kodu içe aktarıldığı ilk yerde değerlendirilir.

Eğer aynı modül birden fazla yerde içe aktarılırsa, içindeki kod sadece ilk seferinde çalıştırılır. Daha sonra bu kodun çıktıları tüm içe aktarılan yerlere verilir.

Bunun önemli sonuçları vardır. Bunu örnekler üzerinden görelim.

İlk olarak, eğer bir modülü çalıştırmak bir mesajı göstermek şeklinde bir yan etkiye sebep oluyorsa, bu modülün çok kez içe aktarılması onun yalnızca ilk seferinde tetiklenmesi gerçeğini değiştirmez:

```js
// 📁 alert.js
alert("Modül değerlendirildi!");
```

```js
// Aynı modülü diğer dosylarda içe aktar

// 📁 1.js
import `./alert.js`; // Modül değerlendirildi!

// 📁 2.js
import `./alert.js`; // (hiçbir şey)
```

Pratikte, üst seviyedeki modül kodu çoğunlukla başlatma işlemi için kullanılır. Veri yapılarını üretir, bunlara başlangıç değerleri verir ve tekrar kullanılabilir olmalarını istiyorsak da bunları dışa aktarırız.

Şimdi daha ileri bir örnek.

Diyelim bir modül bir nesneyi dışa aktarıyor:

```js
// 📁 admin.js
export let admin = {
  name: "John"
};
```

Eğer bu modül birden fazla dosyada içe aktarılırsa, bu modül sadece ilk seferinde değerlendirilir, `admin` nesnesi yaratılır ve sonra içe aktarıldığı tüm yerlere gönderilir.

Nesneyi içe aktaran tüm dosyalar aynı `admin` nesnesini alırlar:

```js
// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

*!*
// Hem 1.js hem de 2.js aynı nesneyi içe aktardı
// 1.js yapılan değişiklikler 2.js dosyasına da yansır
*/!*
```

Tekrar edecek olursak, modül yalnızca bir kez çalıştırılır. Dışa aktarımlar gerçekleştirilir ve bunlar içe aktarıldıkları bu yerlerde paylaşılır. Dolayısıyla eğer bir şey `admin` nesnesini değiştirirse, diğer modüller bu değişikliği görecektir.

Böyle bir özellik konfigürasyon gerektiren modüller için harikadır. Gereken özellikleri ilk içe aktarımda ayarlayıp, daha sonraki içe aktarmalar için modülü hazır hale getiririz.

Örneğin, `admin.js` modülü bazı işlevleri sağlayabilir ancak bunları gerçekleştirebilmek için dışarıdan bazı bilgileri alması gerekebilir:

```js
// 📁 admin.js
export let admin = { };

export function sayHi() {
  alert(`Hizmete hazır, ${admin.name}!`);
}
```

Uygulamamızın ilk programı olan `init.js` dosyasında, `admin.name` için değer atıyoruz. Bu işlemden sonra `admin.js` dosyasının kendisi de dahil, fonksiyonu çağıranlar bu değeri görebileceklerdir:

```js
// 📁 init.js
import {admin} from './admin.js';
admin.name = "Pete";
```

```js
// 📁 other.js
import {admin, sayHi} from './admin.js';

alert(admin.name); // *!*Pete*/!*

sayHi(); // Hizmete hazır, *!*Pete*/!*!
```

### import.meta

`import.meta` nesnesi kullanılmakta olan modül hakkında bilgileri içerir.

İçeriği ortama bağlıdır. Tarayıcıda programın URL bilgisini ya da eğer HTML içindeyse ilgili web sayfasının URL bilgisini içerir:

```html run height=0
<script type="module">
  alert(import.meta.url); // script URL (satır içi program için html sayfasının URL bilgisi)
</script>
```

### Üst seviye "this"in değeri undefined dır.

Bu detay bir bilgidir ancak eksik bir şey bırakmamak adına bundan söz etmeliyiz.

Bir modülde üst seviye `this`in değeri, modül olmayan programdaki bir global nesnenin tersine, tanımsızdır (undefined):

```html run height=0
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

## Tarayıcıya özgü özellikler

Sıradan bir script etiketi içinde yer alan programlara göre bu tagın `type="module"` niteliğine sahip olduğu durumda ilgili programın tarayıcıya özgü bazı farklılıkları vardır.

Bu makaleyi ilk defa okuyorsan ya da JavaScript'i tarayıcıda kullanmıyorsan bu konuyu atlamak isteyebilirsin.

### Modül programları ertelenir

Modül programları *daima* `defer` niteliği ([](info:script-async-defer) bölümünde anlatıldı) ile aynı etkiyi yaratarak hem harici hem de satır içi programlar için ertelenir.

Diğer bir deyişle:
- harici modül programları `<script type="module" src="...">` HTML'nin işlenmesini engellemez.
- modül programları HTML belgesi tamamen hazır olana kadar bekler.
- göreli sıralama korunur: belgede önde yer alan program daha önce çalıştırılır.

Bir yan etki olarak, modül programları altlarındaki HTML elemanlarını daima görebilir.

Örneğin:

```html run
<script type="module">
*!*
  alert(typeof button); // object: program aşağıdaki düğme elemanını görebilir
*/!*
  // modüller ertelendiğinden, program tüm sayfa yüklendikten sonra çalışır
</script>

<script>
*!*
  alert(typeof button); // Hata: düğme elemanı tanımsızdır, program aşağısındaki elemanları göremez
*/!*
  // sıradan programlar sayfanın tamamı işlenmeden hemen çalışır
</script>

<button id="button">Button</button>
```

Lütfen dikkat edin: ikinci program aslında ilkinden önce çalışır! Dolayısıyla önce `undefined` sonra `object` görürüz.

Bu modüllerin çalıştırılması belgenin işlenmesi tamamlanana kadar ertelendiği içindir. Sıradan programlar hemen çalışır ve dolayısıyla çıktısını önce görürüz.

Modülleri kullanırken, HTML belgesinin JavaScript uygulamasının hazır olmasından önce görünebileceğinin farkında olmalıyız. Bazı fonksiyonlar henüz çalışmayabilir. Kullanıcıları bu durumdan haberdar etmek için sayfaya bir "yüklenme göstergesi" (loading indicators) koyabiliriz.

### Async satır içi programlarda çalışır

Async niteliği `<script async type="module">` hem satır içi hem de harici programlarda kullanılabilir. Async programlar diğer programlardan veya HTML belgesinden bağımsız olarak, içe aktarılan modüller işlenir işlenmez çalışmaya başlar.

Örneğin, aşağıdaki programın `async` niteliği vardır, dolayısıyla başka bir şeyi beklemesi gerekmez.

İçe aktarma işlemini gerçekleştirir (`./analytics.js` dosyasına ulaşır) ve hazır olduğunda (HTML belgesinin yüklenmesi bitmemiş veya başka bir program askıda bekliyor olsa bile) çalışır.

Bu işlevsellik için iyidir. Böylelikle sayaçlar, reklamlar veya belge düzeyinde olay dinleyicilerinden bağımsız olarak programımız çalışabilir.

```html
<!-- tüm destek dosyalarına ulaşılır (analytics.js), ve program çalışır -->
<!-- belgesi ya da diğer <script> etiketlerini beklemez -->
<script *!*async*/!* type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>
```

### Harici programlar

Harici modüllerin iki belirgin farkı vardır:

1. Aynı `src`ye sahip harici programlar yalnızca bir kez çalışır:
    ```html
    <!--  my.js programına ulaşılır ve yalnızca bir kez çalıştırılır. -->
    <script type="module" src="my.js"></script>
    <script type="module" src="my.js"></script>
    ```

2. Farklı bir alan adından ulaşılan harici programlar [CORS](mdn:Web/HTTP/CORS) üstbilgisini gerektirir. Başka bir deyişle, eğer modüle başka bir alan adından ulaşılıyorsa, bu erişime izin verildiğini belirtmek açısından uzak sunucu bir `Access-Control-Allow-Origin: *` üstbilgisini sağlamalıdır (`*` yerine ulaşılan alan adının ismi kullanılabilir).
    ```html
    <!-- another-site.com Access-Control-Allow-Origin sağlamalıdır-->
    <!-- aksi halde, program çalışmayacaktır -->
    <script type="module" src="*!*http://another-site.com/their.js*/!*"></script>
    ```

    Bu gereklilik güvenliği artırıcı bir unsurdur.

### Yalın modüllere izin verilmez

Tarayıcıda, programlarda (HTML'de değil) `import`a göreli ya da mutlak URL eşlik etmelidir. Bu şekilde bir yola sahip olmayan ve yalın modül olarak isimlendirilen bu programın kullanımı hata verir.

Örneğin, bu `import` geçersizdir:
```js
import {sayHi} from 'sayHi'; // Hata, "yalın" modül
// './sayHi.js' şeklinde olmalıdır
```

Node.js ve sarmalama araçları (bundle tools) gibi bazı ortamlar modülleri bulmak için kendi yöntemleri ve bunların ince ayarı için kendi çengelleri (hooks) olduğundan, yalın modüllerin kullanımına izin verir. Ancak tarayıcılar henüz yalın modülleri desteklememektedir.

### Uyumluluk, "nomodule"

Eski tarayıcılar `type="module"` niteliğini desteklemez. Bilinmeyen tipteki programlar göz ardı edilir. Bu tarayıcılar için `nomodule` niteliği ile tedbir alınabilir:

```html run
<script type="module">
  alert("Runs in modern browsers");
</script>

<script nomodule>
  alert("Modern browsers know both type=module and nomodule, so skip this")
  alert("Old browsers ignore script with unknown type=module, but execute this.");
</script>
```

Eğer sarmalama araçlarını kullanırsak, modüller birlikte toplanacağı için bunların `import/export` ifadeleri özel sarmalayıcı çağrıları ile yer değiştirir. Dolayısıyla, oluşan dosya `type="module"` ifadesini gerektirmez ve bu dosyayı sıradan bir `<script>` etiketinin içine koyabiliriz:

```html
<!-- Webpack bir araç ile bundle.js dosyası oluşturduğumuzu varsayarsak  -->
<script src="bundle.js"></script>
```

## Sarmalama araçları

Gerçek hayatta tarayıcı modülleri nadiren ham halleriyle kullanılır. Genellikle bunları [Webpack](https://webpack.js.org/) gibi özel bir araç ile bir araya getirip, sarmalarız ve üretim sunucusuna aktarırız.

Sarmalama kullanmanın yararlarından biri modüllerin çözümleneceği konusunda kontrol sağlaması, yalın modüllerin ve  CSS/HTML modülleri gibi daha fazlasının kullanımına olanak tanımasıdır.

Sarmalama araçları aşağıdakileri yapar:

1. HTML'de `<script type="module">` etiketi içerisine konan ana modülü alır.
2. Bu modülün bağımlılıklarını analiz eder: içe aktarmalar ve bunların içe aktarmaları, vb.
3. Tüm modülleri içeren tek bir dosya (ya da ayarlanabilen birden fazla dosya) oluşturur, doğal `import` çağrılarını sarmalama fonksiyonları ile değiştirir. Bu sayede HTML/CSS modülleri gibi özel modüller de desteklenmiş olur.
4. Süreç sırasında diğer dönüşümler ve optimizasyonlar da uygulanabilir:
    - Ulaşılamayan kodlar kaldırılır.
    - Kullanılmayan dışa aktarmalar kaldırılır ("ağaç silkeleme").
    - Geliştirme esnasında kullanılan `console` ve `debugger` ifadeler kaldırılır.
    - Modern, deneysel JavaScript sözdizimi [Babel](https://babeljs.io/) ile benzer işlevselliğe sahip eskisi ile değiştirilebilir.
    - Sonuçta oluşan dosya küçültülür (boşluklar kaldırılır, değişkenler daha kısa isimler ile değiştirilir, vs.)

Bununla birlikte, doğal modüller de kullanılabilir. Dolayısıyla burada Webpack kullanmayacağız: bunu siz daha sonra yapılandırabilirsiniz.

## Özet

Özetlersek, esas kavramlar:

1. Modül bir dosyadır. `import/export` ifadelerinin çalışabilmesi için, tarayıcıların, pek çok farklılığa işaret eden `<script type="module">` etiketini kullanması gerekir:
    - varsayılan olarak ertelenir.
    - Async satır içi programlarda çalışır.
    - Harici programlar CORS üstbilgisine ihtiyaç duyar.
    - Mükerrer harici program dosyaları görmezden gelinir.
2. Modüllerin kendi yerel üst seviye kapsamları vardır ve işlevselliği `import/export` yoluyla değiştirir.
3. Modüller daima `use strict` kullanır.
4. Modül kodu yalnızca bir kez çalıştırılır. Dışa aktarımlar bir kez yaratılır ve içe aktarılan yerlerle paylaşılır.

Dolayısıyla, genellikle, modülleri kullandığımızda, her modül sağladığı işlevselliği dışa aktarır. Daha sonra bu işlevselliği ihtiyaç duyulan yerde `import` ile içe aktarırız. Tarayıcı bu program dosyalarını otomatik bir şekilde yükler ve değerlendirir.

Üretim aşamasında performans ve diğer nedenlerden ötürü modülleri bir araya getirmek için sıklıkla [Webpack](https://webpack.js.org) gibi sarmalama aracı kullanılır.

Bir sonraki bölümde daha fazla modül örneği ve içe/dışa aktarımların nasıl yapılabileceğini göreceğiz.
