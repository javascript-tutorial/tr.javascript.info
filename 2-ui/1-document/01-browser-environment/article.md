# Tarayıcı Ortamı, Özellikleri

<<<<<<< HEAD
Javascript dili başlangıçta internet tarayıcıları için oluşturuldu. O zamandan beri geliştirildi ve birçok kullanımı ve platformu ile bir dil haline geldi.


Bir platform tarayıcı, bir web sunucusu, bir çamaşır makinesi veya başka bir sunucu olabilir. Bunların her biri platforma özgü fonksiyonlar sağlar. JavaScript özelliklerinde bunu bir sunucu ortamı olarak adlandırılır.

Bir sunucu ortamı dil çekirdeğine ek olarak platforma özgü nesneler ve fonksiyonlar sağlar. İnternet tarayıcıları internet sayfalarını kontrol etmek için bir yol sunar. Node.js sunucu tarafı özellikleri vb. 


İşte javascriptin internet tarayıcısında çalıştığında elimizde ne olduğunu gösteren bir kuş bakışı.
=======
The JavaScript language was initially created for web browsers. Since then, it has evolved into a language with many uses and platforms.

A platform may be a browser, or a web-server or another *host*, or even a "smart" coffee machine if it can run JavaScript. Each of these provides platform-specific functionality. The JavaScript specification calls that a *host environment*.

A host environment provides its own objects and functions in addition to the language core. Web browsers give a means to control web pages. Node.js provides server-side features, and so on.

Here's a bird's-eye view of what we have when JavaScript runs in a web browser:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

![](windowObjects.svg)

`window` denilen bir "kök" nesnesi var. İki rolü vardır.

1. Birincisi, Javascript kodu için evrensel bir nesnedir. bölümde açıklandığı gibi info:global-object
2. İkincisi, "tarayıcı penceresini" temsil eder ve kontrol etmek için yöntemler sağlar. 

<<<<<<< HEAD
Örneğin, burada `window`u evrensel bir nesne olarak kullandık.

```js run
function selamSoyle() {
  alert("Selam");
}

// evrensel değişkenler `window` özellikleri olarak erişilebilir.
window.selamSoyle();
```

Ve burada `window`u pencerenin yüksekliğini görmek için tarayıcı penceresi olarak kullandık: 
=======
For instance, we can use it as a global object:

```js run global
function sayHi() {
  alert("Hello");
}

// global functions are methods of the global object:
window.sayHi();
```

And we can use it as a browser window, to show the window height:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
alert(window.innerHeight); // İç pencere yüksekliği
```

<<<<<<< HEAD
Daha fazla `window`a özgü yöntemler ve özellikler var, bunlardan daha sonra bahsedeceğiz.
=======
There are more window-specific methods and properties, which we'll cover later.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Document Object Model (DOM) (Belge Nesneli Modeli)

<<<<<<< HEAD
`document` nesnesi sayfa içeriğine erişimi sağlar. Sayfada herhangi bir şeyi değiştirebilir ya da oluşturabiliriz.
=======
The Document Object Model, or DOM for short, represents all page content as objects that can be modified.

The `document` object is the main "entry point" to the page. We can change or create anything on the page using it.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Örneğin:
```js run
// arka plan rengini kırmızı olarak değiştirelim.
document.body.style.background = 'red';

// 1 saniye sonra tekrar değiştirelim
setTimeout(() => document.body.style.background = '', 1000);
```

<<<<<<< HEAD
Burada `document.body.style` kullandık fakat daha fazla parametreler var. Özellikleri ve yöntemleri tanımlamada açıklanmıştır. Tesadüf ki, bunu geliştiren iki grup vardır. 

DOM standartları : <https://dom.spec.whatwg.org>

Eskiden hiçbir standart yoktu. -- her tarayıcı her ne istiyorsa onu uyguladı. Bu yüzden farklı tarayıcıların aynı şeyler için farklı metotları ve özellikleri vardı. Geliştiriciler her bir tarayıcı için farklı kodlar yazmak zorunda kalıyordu. Karanlık dağınık zamanlar.

Şimdi bile bazen tarayıcılara özgü özellikleri kullanan ve uyumsuzluklar etrafında çalışan eski kodlarla çalışabiliriz ama bu derste modern şeyler kullanacağız: Onlara ihtiyacın olana kadar eski şeyler öğrenmeye gerek yok (şansın yüksek değil). 

Daha sonra herkesi ortak noktada toplamak için DOM standartı belirlendi. İlk versiyon "DOM Level 1" idi, sonra DOM Level 2 tarafından genişletildi, sonra DOM Level 3 ve şimdi DOM Level 4. WhatWG grubundan insanlar sürümden sıkıldılar ve numara olmadan sadece DOM olarak adlandırdılar. Öyleyse biz yapacağız.

```smart header="DOM yalnızca tarayıcı için değildir."
DOM özelliği bir belgenin yapısını açıklar ve onu işlemek için nesne sağlar. Onu kullanan tarayıcı olmayan araçlarda var.

Örneğin, HTML sayfalarını indiren ve işleyen sunucu-taraflı araçlar. Ancak DOM özellikleri sadece bir bölümü destekleyebilir.
```

```smart header="Stil için CSSOM"
CSS kuralları ve stil sayfaları HTML yapısına benzemez. Bu yüzden nesneler olarak nasıl temsil edildiklerini ve nasıl okunup yazılacağını açıklayan bir tanımlama vardır. [CSSOM](https://www.w3.org/TR/cssom-1/)

CSSOM, belgi için stil kurallarını değiştirdiğimizde DOM ile birlikte kullanılıyor. Pratikte olsa CSSOM nadiren gereklidir. Çünkü genelde CSS kuralları statiktir. Javascript'e CSS kuralları ekleme/çıkarma nadiren ihtiyacımız var. Bu yüzden onu kapatmayız.
```

## BOM (Tarayıcı Nesne Modeli) 

HTML'in bir parçası (BOM), belge dışında her şey ile çalışmak için tarayıcı (sunucu ortamı) tarafından sağlanan ek nesnelerdir.
=======
Here, we used `document.body.style`, but there's much, much more. Properties and methods are described in the specification: [DOM Living Standard](https://dom.spec.whatwg.org).

```smart header="DOM is not only for browsers"
The DOM specification explains the structure of a document and provides objects to manipulate it. There are non-browser instruments that use DOM too.

For instance, server-side scripts that download HTML pages and process them can also use the DOM. They may support only a part of the specification though.
```

```smart header="CSSOM for styling"
There's also a separate specification, [CSS Object Model (CSSOM)](https://www.w3.org/TR/cssom-1/) for CSS rules and stylesheets, that explains how they are represented as objects, and how to read and write them.

The CSSOM is used together with the DOM when we modify style rules for the document. In practice though, the CSSOM is rarely required, because we rarely need to modify CSS rules from JavaScript (usually we just add/remove CSS classes, not modify their CSS rules), but that's also possible.
```

## BOM (Browser Object Model)

The Browser Object Model (BOM) represents additional objects provided by the browser (host environment) for working with everything except the document.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Örneğin:

<<<<<<< HEAD
- [navigator](mdn:api/Window/navigator) nesnesi tarayıcı ve işletim sistemi hakkında arkaplan bilgisi sağlar. Birçok özelliği var, fakat en çok bilinen ikisi şunlardır: `navigator.userAgent` -- mevcut tarayıcı hakkında, ve `navigator.platform` -- platform hakkında (Windows/Linux/Mac arasında farklılık olacağından yardım gerekebilir). 
- [location](mdn:api/Window/location) nesnesi geçerli adresi okumayı ve tarayıcıyı yenisine yönlendirmeyi sağlar
=======
- The [navigator](mdn:api/Window/navigator) object provides background information about the browser and the operating system. There are many properties, but the two most widely known are: `navigator.userAgent` -- about the current browser, and `navigator.platform` -- about the platform (can help to differentiate between Windows/Linux/Mac etc).
- The [location](mdn:api/Window/location) object allows us to read the current URL and can redirect the browser to a new one.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

`location` nesnesini bu şekilde kullanabiliriz: 

```js run
<<<<<<< HEAD
alert(location.href); // Geçerli URL'yi gösterir
if (confirm("wikipedia'ya git?")) {
  location.href = 'https://tr.wikipedia.org'; // Tarayıcı başka bir URL'ye yönlendirir.
}
```

`alert/confirm/prompt` fonksiyonları da BOM'un bir parçasıdır: Bunlar doğrudan belge ile ilgili değildir ancak kullanıcı ile tarayıcının saf iletişim kurmasını temsil eder. 

```smart header="HTML specification"
BOM genel kısmıdır[HTML specification](https://html.spec.whatwg.org).

Evet, doğru duydun. <https://html.spec.whatwg.org>'deki HTML özelliği yalnızca "HTML dili" (etiketler, nitelikler) ile ilgili değil, aynı zamanda birçok nesne, yöntem ve tarayıca özgü DOM uzantılarını da kapsar. Bu "geniş anlamda HTML"dir.
=======
alert(location.href); // shows current URL
if (confirm("Go to Wikipedia?")) {
  location.href = "https://wikipedia.org"; // redirect the browser to another URL
}
```

The functions `alert/confirm/prompt` are also a part of the BOM: they are not directly related to the document, but represent pure browser methods for communicating with the user.

```smart header="Specifications"
The BOM is a part of the general [HTML specification](https://html.spec.whatwg.org).

Yes, you heard that right. The HTML spec at <https://html.spec.whatwg.org> is not only about the "HTML language" (tags, attributes), but also covers a bunch of objects, methods, and browser-specific DOM extensions. That's "HTML in broad terms". Also, some parts have additional specs listed at <https://spec.whatwg.org>.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Özet

Standar hakkında konuşurken:

<<<<<<< HEAD
DOM tanımlaması
: belge yapısını, manipülasyonları, olayları açıklar, Bkz <https://dom.spec.whatwg.org>.

CSSOM tanımlaması
: stil sayfaları ve stil kurallarını açıklar, bunlarla yapılan manipülasyonları ve belge bağlanmalarını sağlar, Bkz <https://www.w3.org/TR/cssom-1/>.
=======
DOM specification
: Describes the document structure, manipulations, and events, see <https://dom.spec.whatwg.org>.

CSSOM specification
: Describes stylesheets and style rules, manipulations with them, and their binding to documents, see <https://www.w3.org/TR/cssom-1/>.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

HTML tanımlaması
: HTML dilini (etiketler vs.) ve ayrıca BOM (tarayıcı nesne modeli) -- çeşitli tarayıcı fonksiyonlar: `setTimeout`, `alert`, `location` vb açıklar, Bkz <https://html.spec.whatwg.org>. DOM özelliğini alır ve birçok ek özellik ve yöntemle geliştirir.

Lütfen yukarıdaki bağlantıları kontrol edin. Çünkü öğrenecek birçok şey var. Her şeyi hatırlamak imkansızdır.

<<<<<<< HEAD
Bir özellik ve yöntem hakkında okumak istediğinizde -- Mozilla kılavuzu <https://developer.mozilla.org/en-US/search> güzel kılavuzlardan bir tanesidir, ancak ilgili özelliklerin okunması daha iyi olabilir: daha karmaşık ve okunması uzun fakat temel bilginiz eksiksiz ve sağlam hale gelecektir.

Şimdi DOM öğrenmeye başlayacağız. Çünkü belge, kullanıcı arayüzünde önemli bir rol oynuyor, ayrıca onunla çalışmak en karmaşık kısımdır.
=======
Please note these links, as there's so much to learn that it's impossible to cover everything and remember it all.

When you'd like to read about a property or a method, the Mozilla manual at <https://developer.mozilla.org/en-US/> is also a nice resource, but the corresponding spec may be better: it's more complex and longer to read, but will make your fundamental knowledge sound and complete.

To find something, it's often convenient to use an internet search "WHATWG [term]" or "MDN [term]", e.g <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

Now, we'll get down to learning the DOM, because the document plays the central role in the UI.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
