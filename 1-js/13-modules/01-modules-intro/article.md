
# Modüller, giriş

<<<<<<< HEAD
Uygulamalarımız büyüdükçe, onu dosyalar halinde bölmek isteriz. Bu dosyalar modül olarak isimlendirilir. Bir modül genellikle bir sınıf ya da kullanışlı fonksiyonları barındıran bir kütüphane içerir.
=======
As our application grows bigger, we want to split it into multiple files, so called "modules". A module may contain a class or a library of functions for a specific purpose.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Uzun bir süredir JavaScript'te dil seviyesinde bir modül sözdizimi bulunmuyordu. Bu bir sorun değildi, çünkü başlangıçta program parçaları (scripts) küçük ve basitti. Dolayısıyla modüler yapıya ihtiyaç yoktu.

Ancak zamanla yazılan programlar karmaşıklaşınca, JavaScript topluluğu kodu modüller şeklinde organize etmenin çeşitli yollarını buldu.

<<<<<<< HEAD
Örneğin:

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- en eski modül sistemlerinden biri, başlangıçta [require.js](http://requirejs.org/) kütüphanesince gerçekleştirildi.
- [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) -- Node.js sunucusu için yaratılan modül sistemi.
- [UMD](https://github.com/umdjs/umd) -- geniş kapsamlı bir modül sistemi, AMD ve CommonJS ile uyumlu.

Artık tüm bu sistemlerin kullanımı yavaş yavaş azalmaktadır ancak yine de eski programlarda karşımıza çıkabilmektedirler. Dil seviyesindeki modül sistemi 2015 yılında standartlaştı ve o zamandan beri kademeli olarak evirilip, bugün başlıca tarayıcılar ve Node.js tarafından desteklenir hale geldi.
=======
To name some (for historical reasons):

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- one of the most ancient module systems, initially implemented by the library [require.js](https://requirejs.org/).
- [CommonJS](https://wiki.commonjs.org/wiki/Modules/1.1) -- the module system created for Node.js server.
- [UMD](https://github.com/umdjs/umd) -- one more module system, suggested as a universal one, compatible with AMD and CommonJS.

Now these all slowly became a part of history, but we still can find them in old scripts.

The language-level module system appeared in the standard in 2015, gradually evolved since then, and is now supported by all major browsers and in Node.js. So we'll study the modern JavaScript modules from now on.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

## Modül nedir?

<<<<<<< HEAD
Modül sadece bir dosyadır, tek bir program. Bu kadar basit.

`export` ve `import` yönergeleri modüller arasında işlevselliğin yer değiştirmesini sağlar:

- `export` anahtar kelimesi tanımlandıkları dosyanın dışında da ulaşılmak istenen değişken ve fonksiyonları etiketler.
- `import` başka modüldeki değişken ve fonksiyonların içeri aktarılmasına imkan tanır.
=======
A module is just a file. One script is one module. As simple as that.

Modules can load each other and use special directives `export` and `import` to interchange functionality, call functions of one module from another one:

- `export` keyword labels variables and functions that should be accessible from outside the current module.
- `import` allows the import of functionality from other modules.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

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

<<<<<<< HEAD
Bu derste dilin kendisine odaklanacağız, ama tarayıcıyı gösterim ortamı olarak kullanacağımız için modüllerin tarayıcıda nasıl çalıştığına bakalım.

Modülleri kullanabilmek için, `<script>` etiketinin `type` niteliğini `<script type="module">`, şeklinde ayarlamalıyız:

[codetabs src="say" height="140" current="index.html"]

Tarayıcı içeri aktarılanları otomatik olarak getirir, değerlendirir ve programı çalıştırır.
=======
The `import` directive loads the module by path `./sayHi.js` relative to the current file, and assigns exported function `sayHi` to the corresponding variable.

Let's run the example in-browser.

As modules support special keywords and features, we must tell the browser that a script should be treated as a module, by using the attribute `<script type="module">`.

Like this:

[codetabs src="say" height="140" current="index.html"]

The browser automatically fetches and evaluates the imported module (and its imports if needed), and then runs the script.

```warn header="Modules work only via HTTP(s), not locally"
If you try to open a web-page locally, via `file://` protocol, you'll find that `import/export` directives don't work. Use a local web-server, such as [static-server](https://www.npmjs.com/package/static-server#getting-started) or use the "live server" capability of your editor, such as VS Code [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to test modules.
```
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

## Temel modül özellikleri

Sıradan programlara göre modüllerde ne farklıdır?

Hem tarayıcı hem de sunucu taraflı JavaScript için geçerli temel özellikler vardır.

### Daima "use strict"

<<<<<<< HEAD
Modüller daima `strict` yapıdadır. Örneğin, deklare edilmemiş bir değişkene değer atama işlemi hata verir.
=======
Modules always work in strict mode. E.g. assigning to an undeclared variable will give an error.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```html run
<script type="module">
  a = 5; // error
</script>
```

<<<<<<< HEAD
Bunu burada tarayıcıda görüyoruz ancak aynı durum tüm modüller için geçerlidir.

### Modül seviyesinde kapsam
=======
### Module-level scope
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Her modülün kendi üst seviye kapsamı vardır. Diğer bir deyişle, bir modülün üst seviyedeki değişken ve fonksiyonları, diğer programlarda görünmez.

<<<<<<< HEAD
Aşağıdaki örnekte, iki program içeri aktarılıyor ve `hello.js` `user.js` de deklare edilen `user` değişkenini kullanmaya çalışıp, hata veriyor:

[codetabs src="scopes" height="140" current="index.html"]

Modüller dışarıdan ulaşılmasını istediğini `export` ile dışa aktarmalı, ve `import` ile ihtiyaç duyduğunu içe aktarmalıdır.

Dolayısıyla `user.js` modülünü `index.html` yerine aşağıda gösterildiği gibi doğrudan `hello.js` dosyasına aktarmalıyız:

[codetabs src="scopes-working" height="140" current="hello.js"]

Tarayıcıda, Her bir `<script type="module">` için de bağımsız üst seviye kapsam bulunmaktadır:
=======
In the example below, two scripts are imported, and `hello.js` tries to use `user` variable declared in `user.js`. It fails, because it's a separate module (you'll see the error in the console):

[codetabs src="scopes" height="140" current="index.html"]

Modules should `export` what they want to be accessible from outside and `import` what they need.

- `user.js` should export the `user` variable.
- `hello.js` should import it from `user.js` module.

In other words, with modules we use import/export instead of relying on global variables.

This is the correct variant:

[codetabs src="scopes-working" height="140" current="hello.js"]

In the browser, if we talk about HTML pages, independent top-level scope also exists for each `<script type="module">`.

Here are two scripts on the same page, both `type="module"`. They don't see each other's top-level variables:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

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

<<<<<<< HEAD
Eğer gerçekten tarayıcı içi global bir değişkene ihtiyaç duyuyorsak, bu değişkeni (`user`) açık olarak `window` nesnesine atayıp, `window.user` ile ona ulaşabiliriz. Ancak bu işleme gerçekten makul bir sebep olduğunda başvurulmalıdır.
=======
```smart
In the browser, we can make a variable window-level global by explicitly assigning it to a `window` property, e.g. `window.user = "John"`. 

Then all scripts will see it, both with `type="module"` and without it. 

That said, making such global variables is frowned upon. Please try to avoid them.
```
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

### Modülün kodu içe aktarıldığı ilk yerde değerlendirilir.

<<<<<<< HEAD
Eğer aynı modül birden fazla yerde içe aktarılırsa, içindeki kod sadece ilk seferinde çalıştırılır. Daha sonra bu kodun çıktıları tüm içe aktarılan yerlere verilir.

Bunun önemli sonuçları vardır. Bunu örnekler üzerinden görelim.
=======
If the same module is imported into multiple other modules, its code is executed only once, upon the first import. Then its exports are given to all further importers.

The one-time evaluation has important consequences, that we should be aware of. 

Let's see a couple of examples.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

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
<<<<<<< HEAD
import `./alert.js`; // (hiçbir şey)
```

Pratikte, üst seviyedeki modül kodu çoğunlukla başlatma işlemi için kullanılır. Veri yapılarını üretir, bunlara başlangıç değerleri verir ve tekrar kullanılabilir olmalarını istiyorsak da bunları dışa aktarırız.

Şimdi daha ileri bir örnek.
=======
import `./alert.js`; // (shows nothing)
```

The second import shows nothing, because the module has already been evaluated.

There's a rule: top-level module code should be used for initialization, creation of module-specific internal data structures. If we need to make something callable multiple times - we should export it as a function, like we did with `sayHi` above.

Now, let's consider a deeper example.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

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
<<<<<<< HEAD
// Hem 1.js hem de 2.js aynı nesneyi içe aktardı
// 1.js yapılan değişiklikler 2.js dosyasına da yansır
*/!*
```

Tekrar edecek olursak, modül yalnızca bir kez çalıştırılır. Dışa aktarımlar gerçekleştirilir ve bunlar içe aktarıldıkları bu yerlerde paylaşılır. Dolayısıyla eğer bir şey `admin` nesnesini değiştirirse, diğer modüller bu değişikliği görecektir.

Böyle bir özellik konfigürasyon gerektiren modüller için harikadır. Gereken özellikleri ilk içe aktarımda ayarlayıp, daha sonraki içe aktarmalar için modülü hazır hale getiririz.

Örneğin, `admin.js` modülü bazı işlevleri sağlayabilir ancak bunları gerçekleştirebilmek için dışarıdan bazı bilgileri alması gerekebilir:
=======
// Both 1.js and 2.js reference the same admin object
// Changes made in 1.js are visible in 2.js
*/!*
```

As you can see, when `1.js` changes the `name` property in the imported `admin`, then `2.js` can see the new `admin.name`.

That's exactly because the module is executed only once. Exports are generated, and then they are shared between importers, so if something changes the `admin` object, other importers will see that.

**Such behavior is actually very convenient, because it allows us to *configure* modules.**

In other words, a module can provide a generic functionality that needs a setup. E.g. authentication needs credentials. Then it can export a configuration object expecting the outer code to assign to it.

Here's the classical pattern:
1. A module exports some means of configuration, e.g. a configuration object.
2. On the first import we initialize it, write to its properties. The top-level application script may do that.
3. Further imports use the module.

For instance, the `admin.js` module may provide certain functionality (e.g. authentication), but expect the credentials to come into the `config` object from outside:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
// 📁 admin.js
export let config = { };

export function sayHi() {
<<<<<<< HEAD
  alert(`Hizmete hazır, ${admin.name}!`);
}
```

Uygulamamızın ilk programı olan `init.js` dosyasında, `admin.name` için değer atıyoruz. Bu işlemden sonra `admin.js` dosyasının kendisi de dahil, fonksiyonu çağıranlar bu değeri görebileceklerdir:
=======
  alert(`Ready to serve, ${config.user}!`);
}
```

Here, `admin.js` exports the `config` object (initially empty, but may have default properties too).

Then in `init.js`, the first script of our app, we import `config` from it and set `config.user`:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
// 📁 init.js
import {config} from './admin.js';
config.user = "Pete";
```

...Now the module `admin.js` is configured. 

Further importers can call it, and it correctly shows the current user:

```js
// 📁 another.js
import {sayHi} from './admin.js';

sayHi(); // Hizmete hazır, *!*Pete*/!*!
```


### import.meta

`import.meta` nesnesi kullanılmakta olan modül hakkında bilgileri içerir.

<<<<<<< HEAD
İçeriği ortama bağlıdır. Tarayıcıda programın URL bilgisini ya da eğer HTML içindeyse ilgili web sayfasının URL bilgisini içerir:

```html run height=0
<script type="module">
  alert(import.meta.url); // script URL (satır içi program için html sayfasının URL bilgisi)
</script>
```

### Üst seviye "this"in değeri undefined dır.
=======
Its content depends on the environment. In the browser, it contains the URL of the script, or a current webpage URL if inside HTML:

```html run height=0
<script type="module">
  alert(import.meta.url); // script URL
  // for an inline script - the URL of the current HTML-page
</script>
```

### In a module, "this" is undefined
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Bu detay bir bilgidir ancak eksik bir şey bırakmamak adına bundan söz etmeliyiz.

<<<<<<< HEAD
Bir modülde üst seviye `this`in değeri, modül olmayan programdaki bir global nesnenin tersine, tanımsızdır (undefined):
=======
In a module, top-level `this` is undefined.

Compare it to non-module scripts, where `this` is a global object:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

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

<<<<<<< HEAD
Bu makaleyi ilk defa okuyorsan ya da JavaScript'i tarayıcıda kullanmıyorsan bu konuyu atlamak isteyebilirsin.
=======
You may want to skip this section for now if you're reading for the first time, or if you don't use JavaScript in a browser.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

### Modül programları ertelenir

Modül programları *daima* `defer` niteliği ([](info:script-async-defer) bölümünde anlatıldı) ile aynı etkiyi yaratarak hem harici hem de satır içi programlar için ertelenir.

<<<<<<< HEAD
Diğer bir deyişle:
- harici modül programları `<script type="module" src="...">` HTML'nin işlenmesini engellemez.
- modül programları HTML belgesi tamamen hazır olana kadar bekler.
- göreli sıralama korunur: belgede önde yer alan program daha önce çalıştırılır.

Bir yan etki olarak, modül programları altlarındaki HTML elemanlarını daima görebilir.
=======
In other words:
- downloading external module scripts `<script type="module" src="...">` doesn't block HTML processing, they load in parallel with other resources.
- module scripts wait until the HTML document is fully ready (even if they are tiny and load faster than HTML), and then run.
- relative order of scripts is maintained: scripts that go first in the document, execute first.

As a side effect, module scripts always "see" the fully loaded HTML-page, including HTML elements below them.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

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
<<<<<<< HEAD
  alert(typeof button); // Hata: düğme elemanı tanımsızdır, program aşağısındaki elemanları göremez
=======
  alert(typeof button); // button is undefined, the script can't see elements below
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
*/!*
  // sıradan programlar sayfanın tamamı işlenmeden hemen çalışır
</script>

<button id="button">Button</button>
```

<<<<<<< HEAD
Lütfen dikkat edin: ikinci program aslında ilkinden önce çalışır! Dolayısıyla önce `undefined` sonra `object` görürüz.

Bu modüllerin çalıştırılması belgenin işlenmesi tamamlanana kadar ertelendiği içindir. Sıradan programlar hemen çalışır ve dolayısıyla çıktısını önce görürüz.

Modülleri kullanırken, HTML belgesinin JavaScript uygulamasının hazır olmasından önce görünebileceğinin farkında olmalıyız. Bazı fonksiyonlar henüz çalışmayabilir. Kullanıcıları bu durumdan haberdar etmek için sayfaya bir "yüklenme göstergesi" (loading indicators) koyabiliriz.
=======
Please note: the second script actually runs before the first! So we'll see `undefined` first, and then `object`.

That's because modules are deferred, so we wait for the document to be processed. The regular script runs immediately, so we see its output first.

When using modules, we should be aware that the HTML page shows up as it loads, and JavaScript modules run after that, so the user may see the page before the JavaScript application is ready. Some functionality may not work yet. We should put "loading indicators", or otherwise ensure that the visitor won't be confused by that.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

### Async satır içi programlarda çalışır

<<<<<<< HEAD
Async niteliği `<script async type="module">` hem satır içi hem de harici programlarda kullanılabilir. Async programlar diğer programlardan veya HTML belgesinden bağımsız olarak, içe aktarılan modüller işlenir işlenmez çalışmaya başlar.

Örneğin, aşağıdaki programın `async` niteliği vardır, dolayısıyla başka bir şeyi beklemesi gerekmez.

İçe aktarma işlemini gerçekleştirir (`./analytics.js` dosyasına ulaşır) ve hazır olduğunda (HTML belgesinin yüklenmesi bitmemiş veya başka bir program askıda bekliyor olsa bile) çalışır.
=======
For non-module scripts, the `async` attribute only works on external scripts. Async scripts run immediately when ready, independently of other scripts or the HTML document.

For module scripts, it works on inline scripts as well.

For example, the inline script below has `async`, so it doesn't wait for anything.

It performs the import (fetches `./analytics.js`) and runs when ready, even if the HTML document is not finished yet, or if other scripts are still pending.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

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

<<<<<<< HEAD
Harici modüllerin iki belirgin farkı vardır:

1. Aynı `src`ye sahip harici programlar yalnızca bir kez çalışır:
=======
External scripts that have `type="module"` are different in two aspects:

1. External scripts with the same `src` run only once:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
    ```html
    <!--  my.js programına ulaşılır ve yalnızca bir kez çalıştırılır. -->
    <script type="module" src="my.js"></script>
    <script type="module" src="my.js"></script>
    ```

<<<<<<< HEAD
2. Farklı bir alan adından ulaşılan harici programlar [CORS](mdn:Web/HTTP/CORS) üstbilgisini gerektirir. Başka bir deyişle, eğer modüle başka bir alan adından ulaşılıyorsa, bu erişime izin verildiğini belirtmek açısından uzak sunucu bir `Access-Control-Allow-Origin: *` üstbilgisini sağlamalıdır (`*` yerine ulaşılan alan adının ismi kullanılabilir).
=======
2. External scripts that are fetched from another origin (e.g. another site) require [CORS](mdn:Web/HTTP/CORS) headers, as described in the chapter <info:fetch-crossorigin>. In other words, if a module script is fetched from another origin, the remote server must supply a header `Access-Control-Allow-Origin` allowing the fetch.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
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

<<<<<<< HEAD
Node.js ve sarmalama araçları (bundle tools) gibi bazı ortamlar modülleri bulmak için kendi yöntemleri ve bunların ince ayarı için kendi çengelleri (hooks) olduğundan, yalın modüllerin kullanımına izin verir. Ancak tarayıcılar henüz yalın modülleri desteklememektedir.
=======
Certain environments, like Node.js or bundle tools allow bare modules, without any path, as they have their own ways for finding modules and hooks to fine-tune them. But browsers do not support bare modules yet.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

### Uyumluluk, "nomodule"

<<<<<<< HEAD
Eski tarayıcılar `type="module"` niteliğini desteklemez. Bilinmeyen tipteki programlar göz ardı edilir. Bu tarayıcılar için `nomodule` niteliği ile tedbir alınabilir:
=======
Old browsers do not understand `type="module"`. Scripts of an unknown type are just ignored. For them, it's possible to provide a fallback using the `nomodule` attribute:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```html run
<script type="module">
  alert("Runs in modern browsers");
</script>

<script nomodule>
  alert("Modern browsers know both type=module and nomodule, so skip this")
  alert("Old browsers ignore script with unknown type=module, but execute this.");
</script>
```

<<<<<<< HEAD
Eğer sarmalama araçlarını kullanırsak, modüller birlikte toplanacağı için bunların `import/export` ifadeleri özel sarmalayıcı çağrıları ile yer değiştirir. Dolayısıyla, oluşan dosya `type="module"` ifadesini gerektirmez ve bu dosyayı sıradan bir `<script>` etiketinin içine koyabiliriz:

```html
<!-- Webpack bir araç ile bundle.js dosyası oluşturduğumuzu varsayarsak  -->
<script src="bundle.js"></script>
```

## Sarmalama araçları
=======
## Build tools
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Gerçek hayatta tarayıcı modülleri nadiren ham halleriyle kullanılır. Genellikle bunları [Webpack](https://webpack.js.org/) gibi özel bir araç ile bir araya getirip, sarmalarız ve üretim sunucusuna aktarırız.

Sarmalama kullanmanın yararlarından biri modüllerin çözümleneceği konusunda kontrol sağlaması, yalın modüllerin ve  CSS/HTML modülleri gibi daha fazlasının kullanımına olanak tanımasıdır.

Sarmalama araçları aşağıdakileri yapar:

<<<<<<< HEAD
1. HTML'de `<script type="module">` etiketi içerisine konan ana modülü alır.
2. Bu modülün bağımlılıklarını analiz eder: içe aktarmalar ve bunların içe aktarmaları, vb.
3. Tüm modülleri içeren tek bir dosya (ya da ayarlanabilen birden fazla dosya) oluşturur, doğal `import` çağrılarını sarmalama fonksiyonları ile değiştirir. Bu sayede HTML/CSS modülleri gibi özel modüller de desteklenmiş olur.
4. Süreç sırasında diğer dönüşümler ve optimizasyonlar da uygulanabilir:
    - Ulaşılamayan kodlar kaldırılır.
    - Kullanılmayan dışa aktarmalar kaldırılır ("ağaç silkeleme").
    - Geliştirme esnasında kullanılan `console` ve `debugger` ifadeler kaldırılır.
    - Modern, deneysel JavaScript sözdizimi [Babel](https://babeljs.io/) ile benzer işlevselliğe sahip eskisi ile değiştirilebilir.
    - Sonuçta oluşan dosya küçültülür (boşluklar kaldırılır, değişkenler daha kısa isimler ile değiştirilir, vs.)
=======
1. Take a "main" module, the one intended to be put in `<script type="module">` in HTML.
2. Analyze its dependencies: imports and then imports of imports etc.
3. Build a single file with all modules (or multiple files, that's tunable), replacing native `import` calls with bundler functions, so that it works. "Special" module types like HTML/CSS modules are also supported.
4. In the process, other transformations and optimizations may be applied:
    - Unreachable code removed.
    - Unused exports removed ("tree-shaking").
    - Development-specific statements like `console` and `debugger` removed.
    - Modern, bleeding-edge JavaScript syntax may be transformed to older one with similar functionality using [Babel](https://babeljs.io/).
    - The resulting file is minified (spaces removed, variables replaced with shorter names, etc).

If we use bundle tools, then as scripts are bundled together into a single file (or few files), `import/export` statements inside those scripts are replaced by special bundler functions. So the resulting "bundled" script does not contain any `import/export`, it doesn't require `type="module"`, and we can put it into a regular script:

```html
<!-- Assuming we got bundle.js from a tool like Webpack -->
<script src="bundle.js"></script>
```
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Bununla birlikte, doğal modüller de kullanılabilir. Dolayısıyla burada Webpack kullanmayacağız: bunu siz daha sonra yapılandırabilirsiniz.

## Özet

Özetlersek, esas kavramlar:

<<<<<<< HEAD
1. Modül bir dosyadır. `import/export` ifadelerinin çalışabilmesi için, tarayıcıların, pek çok farklılığa işaret eden `<script type="module">` etiketini kullanması gerekir:
    - varsayılan olarak ertelenir.
    - Async satır içi programlarda çalışır.
    - Harici programlar CORS üstbilgisine ihtiyaç duyar.
    - Mükerrer harici program dosyaları görmezden gelinir.
2. Modüllerin kendi yerel üst seviye kapsamları vardır ve işlevselliği `import/export` yoluyla değiştirir.
3. Modüller daima `use strict` kullanır.
4. Modül kodu yalnızca bir kez çalıştırılır. Dışa aktarımlar bir kez yaratılır ve içe aktarılan yerlerle paylaşılır.

Dolayısıyla, genellikle, modülleri kullandığımızda, her modül sağladığı işlevselliği dışa aktarır. Daha sonra bu işlevselliği ihtiyaç duyulan yerde `import` ile içe aktarırız. Tarayıcı bu program dosyalarını otomatik bir şekilde yükler ve değerlendirir.
=======
1. A module is a file. To make `import/export` work, browsers need `<script type="module">`. Modules have several differences:
    - Deferred by default.
    - Async works on inline scripts.
    - To load external scripts from another origin (domain/protocol/port), CORS headers are needed.
    - Duplicate external scripts are ignored.
2. Modules have their own, local top-level scope and interchange functionality via `import/export`.
3. Modules always `use strict`.
4. Module code is executed only once. Exports are created once and shared between importers.

When we use modules, each module implements the functionality and exports it. Then we use `import` to directly import it where it's needed. The browser loads and evaluates the scripts automatically.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Üretim aşamasında performans ve diğer nedenlerden ötürü modülleri bir araya getirmek için sıklıkla [Webpack](https://webpack.js.org) gibi sarmalama aracı kullanılır.

Bir sonraki bölümde daha fazla modül örneği ve içe/dışa aktarımların nasıl yapılabileceğini göreceğiz.
