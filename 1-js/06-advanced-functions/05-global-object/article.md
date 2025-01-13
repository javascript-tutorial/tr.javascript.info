
# Evrensel Objeler

<<<<<<< HEAD
JavaScript dili yazılırken "evrensel obje" diye bir obje fikri vardı. Bu obje tüm değişken ve fonksiyonları içinde barındırarak tarayıcıda bulunan kodların evrensel obje yardımıyla değişkenleri paylaşabileceği düşünülmüştü.
=======
The global object provides variables and functions that are available anywhere. By default, those that are built into the language or the environment.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Tabi o zamandan beri JavaScript çok değişti, artık evrensel obje göze batar oldu. Modern JavaScript'te bu objenin yerini module yapısı aldı.

<<<<<<< HEAD
Evrensel obje hala dil içerisinde yer almaktadır.
=======
Recently, `globalThis` was added to the language, as a standardized name for a global object, that should be supported across all environments. It's supported in all major browsers.

We'll use `window` here, assuming that our environment is a browser. If your script may run in other environments, it's better to use `globalThis` instead.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Tarayıcı için bu "window" ve NodeJs için ise "global"'dir. Diğer ortamlar da kendine ait evrensel objelere sahiptirler.

<<<<<<< HEAD
İki şeyi yapmaktadır:

1. Dil dahilindeki fonksiyon ve değişkenlere erişim sağlar.
    Örneğin, `alert` doğrudan veya `window`'un bir metodu olarak çağırılabilir.

    ```js run
    alert("Merhaba");

    // aynısı 
    window.alert("Merhaba");
    ```
    Bu aynı şekilde diğer dahili fonksiyon ve değişkenler için de geçerlidir. Örneğin `Array` yerine `window.Array` kullanılabilir.

2. Global `var` değişkeni tanımlamaya olanak tanır. `window` özellikleri ile okuma ve yazma sağlanabilir. Örneğin

    <!-- no-strict to move variables out of eval -->
    ```js untrusted run no-strict refresh
    var selam = "Merhaba";

    function selamVer() {
      alert(selam);
    }

    // window'dan okunabilir
    alert( window.terim ); // Merhaba (global var)
    alert( window.selamVer ); // function (global function declaration)

    // window'a yazılabilir. (yeni global değişken oluşturur.)

    window.test = 5;

    alert(test); // 5
    ```
...Fakat global obje `let/const` ile tanımlanmış değişkenler barındıramaz.

```js untrusted run no-strict refresh
*!*let*/!* kullanici = "Ahmet";
alert(kullanici); // Ahmet

alert(window.kullanici); // tanımsız, let ile tanımlama yapılamaz.
alert("kullanici" in window); // false
```

```smart header="Evrensel Obje global ortam kaydı değildir"
ECMAScript ES-2015 öncesi `let/const` değişkenleri bulunmamaktaydı, sadece `var` değişkeni vardı. Global objeler global ortam kaydı olarak kullanılıyordu.
=======
```js run
alert("Hello");
// is the same as
window.alert("Hello");
```

In a browser, global functions and variables declared with `var` (not `let/const`!) become the property of the global object:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Fakat ES-2015 sonrası, bu varlıklar ayrıldı. Artık evrensel sözcük ortamı ve bunun ortam kaydı. İkinci olarak evrensel obje ve bunun sunduğu bazı "evrensel değişkenler" bulunmaktadır.

Uygulamada evrensel `let/const` değişkenleri global Evrensel Kayıtta tanımlanmış özelliklerdir fakat evrensel obje'de bulunmamaktadırlar.

Doğal olarak, evrensel objenin "evrensel olan her şeye erişebilir" fikri eski zamanlarda kalmıştır. Artık bu iyi bir şey olarak görülmemektedir. `let/const` gibi dil özellikleri bunu desteklememektedir, fakat eski olanlara hala destek verir.
```
## "window"'un kullanım alanları

<<<<<<< HEAD
Node.JS gibi sunucu ortamlarında, `global` obje çok az kullanılır. Hatta `hiçbir zaman` diyebiliriz.

Buna rağmen `window` bazı durumlarda kullanılmaktadır.
=======
Function declarations have the same effect (statements with `function` keyword in the main code flow, not function expressions).

Please don't rely on that! This behavior exists for compatibility reasons. Modern scripts use [JavaScript modules](info:modules) where such a thing doesn't happen.

If we used `let` instead, such thing wouldn't happen:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Genelde, kullanmak çok iyi bir fikir olmasa da, aşağıda bazı örnekleri görebilirsiniz.

1. Eğer evrenselde bulunan değişken ile fonksiyon içindeki değişken ismi aynı ise;

    ```js untrusted run no-strict refresh
    var kullanici = "Evrensel";

    function selamVer() {
      var kullanici = "Yerel";

    *!*
      alert(window.kullanici); // Evrensel
    */!*
    }

    selamVer();
    ```

<<<<<<< HEAD
    Bu sizi çözüme ulaştırır fakat değişkenlere farklı isimler vermek daha iyidir, böylece `window` kullanmanıza gerek kalmaz. Ayrıca dikkat ederseniz `kullanici` tanımlamak için `var` kullanılmıştır. `let` kullanılmış olsaydı `window`'dan bu değeri alamazdınız.
    
3. Global bir değişkenin var olup olmadığına bakar.
=======
That said, using global variables is generally discouraged. There should be as few global variables as possible. The code design where a function gets "input" variables and produces certain "outcome" is clearer, less prone to errors and easier to test than if it uses outer or global variables.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    Örneğin, `XMLHttpRequest`'in global bir fonksiyon olup olmadığını kontrol etmek isterseniz, `if (XMLHttpRequest)` şeklinde yazamazsınız, çünkü `XMLHttpRequest` yoksa hata verecektir.
    
    Bunu `window.XMLHttpRequest` üzerinden okuyabilirsiniz.
    
    ```js run
    if (window.XMLHttpRequest) {
      alert('XMLHttpRequest tanımlı!')
    }
    ```
    Eğer böyle bir global fonksiyon olmasaydı `undefined` dönerdi.
    
    `window` olmadan da bunu test etmek mümkündür:
    
    ```js
    if (typeof XMLHttpRequest == 'function') {
      /*  XMLHttpRequest? fonksiyonu var mı? */
    }
    ```
    Burada `window` kullanılmasa da (teorik olarak) daha az güvenilirdir, çünkü `typeof` yerel XMLHttpRequest kullanabilir, halbuki biz evrensel olanını kontrol etmek istiyoruz.


3. Doğru pencereden değişken alma. Bu en uygun kullanım şeklidir.

    Tarayıcıda birçok sekme ve pencere açılabilir. Bir pencere diğerini `<iframe>` içerisinde gösterebilir. Her tarayıcı kendine ait `window` objesine ve bunun global değişkenlerine sahiptir. JavaScript pencerelerin (aynı site içerisinde ise) birbirlerinden değişken almalarına izin verir.
    
    Bu biraz amacının dışında da olsa şuna benzer:
    ```html run
    <iframe src="/" id="iframe"></iframe>

    <script>
      alert( innerWidth ); //  içerideki boyutu alır ( sadece tarayıcı için) 
      alert( Array ); // o anki pencerenin dizisini alır.get Array of the current window (javascript core builtin)

      // when the iframe loads...
      iframe.onload = function() {
        // iframe'in genişliğini al
      *!*
        alert( iframe.contentWindow.innerWidth );
      */!*
        // iframe penceresinin dizisini al.
      *!*
        alert( iframe.contentWindow.Array );
      */!*
      };
    </script>
    ```

    Burada ilk iki alert var olan pencereyi kullanmaktadır, geriye kalan iki tanesi de `iframe`'den değişken almaktadır. Bu eğer `iframe` aynı protocol/host/port'tan besleniyor ise herhangi bir değişken olabilir.
    
## "this" ve evrensel objeler

Bazen, `this`'in değeri tamamen evrensel obje olur. Bu çok nadir de olsa bazı kod sayfalarında görülmektedir.

1. Tarayıcıda `this`'in global alandaki değeri `window`'dur:

    ```js run
    // fonksiyonların dışında
    alert( this === window ); // true
    ```
    Tarayıcı olmayan çevrelerde ise, `this` için farklı değer kullanabilirler.

2. Sıkı olmayan modda bir fonksiyon `this` çağırırsa, evrensel obje olan `this`'i kabul eder:
    ```js run no-strict
    // Sıkı modda değil (!)
    function f() {
      alert(this); // [object Window]
    }

    f(); // obje olmadan çağırıldı.
    ```

    Tanım gereği, `this` bu durumda evrensel obje olmalı, Node.JS ortamında olmasa bile `this` evrensel objedir. Bu eski kodlar ile uyumluluk amacıyladır, sıkı modda `this` tanımsız olabilir.

## Polyfill'ler İçin Kullanma

Modern dil özelliklerinin desteğini test etmek için global nesneyi kullanıyoruz.

Örneğin, yerleşik bir "Promise" nesnesinin olup olmadığını test edelim (gerçekten eski tarayıcılarda yoktur):
```js run
if (!window.Promise) {
  alert("Senin tarayıcın gerçekten çok yaşlı");
}
```

Hiçbiri yoksa (örneğin, eski bir tarayıcıdayız), "pollyfills(çoklu dolgular)" oluşturabiliriz: çevre tarafından desteklenmeyen, ancak modern standartta var olan işlevler ekleyebiliriz.

```js run
if (!window.Promise) {
  window.Promise = ... // modern dil özelliğinin özel uygulaması
}
```

## Özet

- Global nesne, her yerde bulunması gereken değişkenleri tutar.

  Buna "Array" gibi JavaScript yerleşikleri ve "window.innerHeight" gibi ortama özgü değerler - tarayıcıdaki pencere yüksekliği dahildir.
- Global nesnenin evrensel bir adı 'globalThis' vardır.

<<<<<<< HEAD
    ...Ancak daha sık olarak "window(tarayıcı)" ve "global(Node.js)" gibi "eski tarz" çevreye özgü adlarla anılır. "globalThis" yeni bir teklif olduğundan, Chromium Edge dışında desteklenmemektedir (ancak polyfilled olabilir).
    
- Değerleri yalnızca projemiz için gerçekten küresellerse global nesnede saklamalıyız. Ve sayılarını minimumda tutun.
- Tarayıcıda, [modules](info:modules) kullanmadığımız sürece, 'var' ile bildirilen global işlevler ve değişkenler global nesnenin bir özelliği haline gelir.
- Kodumuzu geleceğe dönük ve daha kolay anlaşılır kılmak için global nesnenin özelliklerine doğrudan "window.x" olarak erişmeliyiz.
=======
    ...But more often is referred by "old-school" environment-specific names, such as `window` (browser) and `global` (Node.js).
- We should store values in the global object only if they're truly global for our project. And keep their number at minimum.
- In-browser, unless we're using [modules](info:modules), global functions and variables declared with `var` become a property of the global object.
- To make our code future-proof and easier to understand, we should access properties of the global object directly, as `window.x`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
