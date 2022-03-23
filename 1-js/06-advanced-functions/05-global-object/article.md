
# Evrensel Objeler

JavaScript dili yazılırken "evrensel obje" diye bir obje fikri vardı. Bu obje tüm değişken ve fonksiyonları içinde barındırarak tarayıcıda bulunan kodların evrensel obje yardımıyla değişkenleri paylaşabileceği düşünülmüştü.

Tabi o zamandan beri JavaScript çok değişti, artık evrensel obje göze batar oldu. Modern JavaScript'te bu objenin yerini module yapısı aldı.

Evrensel obje hala dil içerisinde yer almaktadır.

Tarayıcı için bu "window" ve NodeJs için ise "global"'dir. Diğer ortamlar da kendine ait evrensel objelere sahiptirler.

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

    // window'a yazılabilir. ( yeni global değişken oluşturur.

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

Fakat ES-2015 sonrası, bu varlıklar ayrıldı. Artık evrensel sözcük ortamı ve bunun ortam kaydı. İkinci olarak evrensel obje ve bunun sunduğu bazı "evrensel değişkenler" bulunmaktadır.

Uygulamada evrensel `let/const` değişkenleri global Evrensel Kayıtta tanımlanmış özelliklerdir fakat evrensel obje'de bulunmamaktadırlar.

Doğal olarak, evrensel objenin "evrensel olan her şeye erişebilir" fikri eski zamanlarda kalmıştır. Artık bu iyi bir şey olarak görülmemektedir. `let/const` gibi dil özellikleri bunu desteklememektedir, fakat eski olanlara hala destek verir.
```
## "window"'un kullanım alanları

Node.JS gibi sunucu ortamlarında, `global` obje çok az kullanılır. Hatta `hiçbir zaman` diyebiliriz.

Buna rağmen `window` bazı durumlarda kullanılmaktadır.

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

    Bu sizi çözüme ulaştırır fakat değişkenlere farklı isimler vermek daha iyidir, böylece `window` kullanmanıza gerek kalmaz. Ayrıca dikkat ederseniz `kullanici` tanımlamak için `var` kullanılmıştır. `let` kullanılmış olsaydı `window`'dan bu değeri alamazdınız.
    
3. Global bir değişkenin var olup olmadığına bakar.

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
      alert( innerWidth ); //  içerideki boyutu olır ( sadece tarayıcı için) 
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

## Using for polyfills

We use the global object to test for support of modern language features.

For instance, test if a built-in `Promise` object exists (it doesn't in really old browsers):
```js run
if (!window.Promise) {
  alert("Your browser is really old!");
}
```

If there's none (say, we're in an old browser), we can create "polyfills": add functions that are not supported by the environment, but exist in the modern standard.

```js run
if (!window.Promise) {
  window.Promise = ... // custom implementation of the modern language feature
}
```

## Summary

- The global object holds variables that should be available everywhere.

    That includes JavaScript built-ins, such as `Array` and environment-specific values, such as `window.innerHeight` -- the window height in the browser.
- The global object has a universal name `globalThis`.

    ...But more often is referred by "old-school" environment-specific names, such as `window` (browser) and `global` (Node.js). As `globalThis` is a recent proposal, it's not supported in non-Chromium Edge (but can be polyfilled).
- We should store values in the global object only if they're truly global for our project. And keep their number at minimum.
- In-browser, unless we're using [modules](info:modules), global functions and variables declared with `var` become a property of the global object.
- To make our code future-proof and easier to understand, we should access properties of the global object directly, as `window.x`.
