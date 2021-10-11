

# Callback fonksiyonlarına giriş

<<<<<<< HEAD
Çoğu JavaScript eylemleri *asenkron*'dur

Aşağıdaki `loadScript(src)` fonksiyonuna bakacak olursanız:
=======
```warn header="We use browser methods in examples here"
To demonstrate the use of callbacks, promises and other abstract concepts, we'll be using some browser methods: specifically, loading scripts and performing simple document manipulations.

If you're not familiar with these methods, and their usage in the examples is confusing, you may want to read a few chapters from the [next part](/document) of the tutorial.

Although, we'll try to make things clear anyway. There won't be anything really complex browser-wise.
```

Many functions are provided by JavaScript host environments that allow you to schedule *asynchronous* actions. In other words, actions that we initiate now, but they finish later.

For instance, one such function is the `setTimeout` function.

There are other real-world examples of asynchronous actions, e.g. loading scripts and modules (we'll cover them in later chapters).

Take a look at the function `loadScript(src)`, that loads a script with the given `src`:
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

```js
function loadScript(src) {
  // creates a <script> tag and append it to the page
  // this causes the script with given src to start loading and run when complete
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```
Bu fonksiyonun amacı yeni kodu yüklemektir. `<script src="...">`'yi dökümana ekler ve çalıştırır.

<<<<<<< HEAD
Aşağıdaki gibi kullanılabilir.

```js
// kodu yükler ve çalıştırır.
=======
It inserts into the document a new, dynamically created, tag `<script src="…">` with the given `src`. The browser automatically starts loading it and executes when complete.

We can use this function like this:

```js
// load and execute the script at the given path
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2
loadScript('/my/script.js');
```
Bu fonksiyon "asenkron" olarak adlandırılır, çünkü işlerini hemen değil de daha sonra bitirir.

<<<<<<< HEAD
Çağrı ile script yüklenmeye başlar ve sonrasında çalıştırılır. Yüklerken aşağıdaki kod çalışmayı bitirebilir ve eğer bu yükleme zaman alırsa aynı anda diğer kodlar da çalışabilir.


```js
loadScript('/my/script.js');
// loadScript altındaki kodlar loadScript'in bitmesini beklemeden çalışmaktadır.
// ...
```

Diyelimki kod yüklendikten sonra yeni kodu kullanmak istiyor olalım. Yeni fonksiyonlar yaratılmışsa bunları kullanacağımızı varsaylım.
=======
The script is executed "asynchronously", as it starts loading now, but runs later, when the function has already finished.

If there's any code below `loadScript(…)`, it doesn't wait until the script loading finishes.

```js
loadScript('/my/script.js');
// the code below loadScript
// doesn't wait for the script loading to finish
// ...
```

Let's say we need to use the new script as soon as it loads. It declares new functions, and we want to run them.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

Eğer bunu doğrudan `loadScript(…)` çağrısı sonrasına yaparsanız çalışmaz:

```js
loadScript('/my/script.js'); //  "function newFunction() {…}" a sahip olduğunu varsayalım

*!*
newFunction(); // böyle bir fonksiyon bulunmamaktadır.
*/!*
```
Doğal olarak, tarayıcı kodu yükleyecek zaman bulamadı. Bundan dolayı doğrudan yeni fonksiyonu çağırdığında hata meydana geldi. Bundan sonra `loadScript` fonksiyonu yüklemenin ne durumda olduğunu bildiremez. Script en nihayetinde yüklenir ve sonrasında çalıştırılır, bu kadar. Fakat biz bunun ne zaman olduğunu bilmek istiyoruz. Yüklenen koddaki fonksiyonlar ve değişkenleri kullanmak istiyoruz.

<<<<<<< HEAD
`callback` fonksiyonunu ikinci bir parametre olarak `loadScript` e ekleyelim, bu kod yüklendiğinde çalışması lazım.
=======
Naturally, the browser probably didn't have time to load the script. As of now, the `loadScript` function doesn't provide a way to track the load completion. The script loads and eventually runs, that's all. But we'd like to know when it happens, to use new functions and variables from that script.

Let's add a `callback` function as a second argument to `loadScript` that should execute when the script loads:
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

```js
function loadScript(src, *!*callback*/!*) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(script);
*/!*

  document.head.append(script);
}
```
Eğer kod içerisindeki bir fonksiyonu çağırmak istiyorsak, callback içerisine yazmalıyız:

```js
loadScript('/my/script.js', function() {
  // callback kod yüklendikten sonra çalışacaktır.
  newFunction(); // artık çalışır.
  ...
});
```
Fikir: ikinci argüman bir fonksiyondur (genelde isimsiz ) ve eylem tamamlandıktan sonra çalışır.

Aşağıda kodun çalıştırılabilir hali bulunmaktadır:

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

*!*
loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
<<<<<<< HEAD
  alert(`Cool, the ${script.src} is loaded`);
  alert( _ ); // yüklenmiş kodlar içerisinde bu fonksiyon tanımlı.
=======
  alert(`Cool, the script ${script.src} is loaded`);
  alert( _ ); // function declared in the loaded script
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2
});
*/!*
```
Buna "callback-tabanlı" asenkron programlama tipi denir. Bir fonksiyon asenkron olarak bir iş yapıyorsa `callback`'i de sunmalıdır. Böylece bundan sonra neyin çalışacağına karar verebiliriz.

<<<<<<< HEAD
Burada `loadScript` için kullandık, fakat bu genel bir yaklaşımdır.
=======
That's called a "callback-based" style of asynchronous programming. A function that does something asynchronously should provide a `callback` argument where we put the function to run after it's complete.

Here we did it in `loadScript`, but of course it's a general approach.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

## Callback içinde callback

Aynı anda iki kod parçasını sıralı olarak nasıl yükleyebiliriz: ilk önce birincisini, bittikten sonra ikincisini.

Doğal olan ikinci `loadScript`'i callback içine aşağıdaki gibi koymaktır:

```js
loadScript('/my/script.js', function(script) {

  alert(`Cool, the ${script.src} is loaded, let's load one more`);

*!*
  loadScript('/my/script2.js', function(script) {
    alert(`Cool, the second script is loaded`);
  });
*/!*

});
```
Dıştaki `loadScript` tamamlandıktan sonra, içteki çalışmaya başlar.

Eğer bir tane daha istersek ...?

```js
loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

*!*
    loadScript('/my/script3.js', function(script) {
      // ...tüm kodlar yüklendikten sonra devam eder.
    });
*/!*

  });

});
```
Böylece, her yeni eylem callback içerisinde kalır. Bu birkaç aksiyon için sorun olmaz fakat daha çok ise sorun yaratacaktır.

## Hataları İşlemek

Yukarıdaki örnekte hataları düşünmedik. Ya kod hata verirse? Callback fonksiyonu buna göre hareket edebilmelidir.

Aşağıda `loadScript`'in hataları takip eden, geliştirilmiş versiyonu yer almaktadır:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
*/!*

  document.head.append(script);
}
```
Eğer başarılı bir şekilde çalışırsa `callback(null, script)`, hata alırsa `callback(error)` çağırılır.

Kullanımı:
```js
loadScript('/my/script.js', function(error, script) {
  if (error) {
    // handle error
  } else {
    // script loaded successfully
  }
});
```
Yine bu yöntemin genel bir kullanım olduğunu söyleyebiliriz. Buna "error-first callback" stili denilmektedir.

Düzen şu şekildedir:

1. `callback`'in ilk argümanı hata için ayrılır. Sonra `callback(err)` çağırılır.
2. İkinci argüman ise başarılı bir sonuçta gönderilir. Sonra `callback(null, result1, result2...)` çağrılır.

Böylece tek bir `callback` fonksiyonu ile hem hata gönderilebilir, hem de cevap dönülebilir.

## Kıyamet pramidi

İlk bakıldığında asenkron kodlama mantıklı gelebilir. Gerçekten de öyle. Bir veya iki çağrılar fena görünmüyor.

Fakat birden çok asenkron iş için kod aşağıdaki gibi olacaktır:

```js
loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
  *!*
            // ...tüm kodlar yüklendikten sonra devam et (*)
  */!*
          }
        });

      }
    });
  }
});
```

Yukarıdaki kodda:
1. Önce `1.js`'yi yükledik. 
2. Hata yoksa `2.js`'yi yükle.
3. Hata yoksa `3.js`'yi ve en sonda da `(*)` çalıştırılır.

<<<<<<< HEAD
Çağrılar çoğaldıkça kod daha derinlere inmekte ve bunun yönetimi de zorlaşmaktadır, özellikle içerisinde `...` yerine gerçek kod varsa bu bir çok döngüye, koşula sahip olacaktır.
=======
As calls become more nested, the code becomes deeper and increasingly more difficult to manage, especially if we have real code instead of `...` that may include more loops, conditional statements and so on.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

Bunun için "callback cehennemi" veya "Kıyamet piramidi" denilebilir.

<<<<<<< HEAD
=======
<!--
loadScript('1.js', function(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...
          }
        });
      }
    });
  }
});
-->

>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2
![](callback-hell.svg)

"Piramit" her bir çağrıda sağa doğru büyüyecek ve kontrolden çıkacaktır.

Bu şekliyle kodlamak pek de iyi görünmemekte.

Bunu her çağrıyı ayrı birer fonksiyon yaparak çözmeye çalışırsak:

```js
loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...continue after all scripts are loaded (*)
  }
}
```
Gördüğünüz gibi aynısı, fakat iç içe yazılmış derinelemesine bir fonksiyon yok. Her iş ayrı bir fonksiyonda tamamlanıyor.

Tamamdır. Artık çalışıyor fakat ayrı ayrı bir tablo gibi duruyor. Okuması oldukça zor, sizin de farkedeceğiniz gibi okurken sürekli ileri geri kodları inceliyorsunuz. Bu kullanışsız bir yöntem oldu, hele ki kod okumayla pek uğraşmayanlar nereye zıplayacaklarını anlayamayacaklardır.

<<<<<<< HEAD
Ayrıca `step*` fonksiyonu tek kullanımlık oldu. Amaç sadece "kıyamet piramidi"'nden korunmak. Bu fonksiyonları başka kimse kullanmayacaktır. Böylece boş bir sürü isim kullandık ve çöplüğe çevirdik.
=======
Also, the functions named `step*` are all of single use, they are created only to avoid the "pyramid of doom." No one is going to reuse them outside of the action chain. So there's a bit of namespace cluttering here.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

Bu problemi çözmek için daha iyi bir yöntem mevcut.

Bunun için kullanılacak en iyi yöntemlerden biri "promises" kullanmaktır. Bir sonraki bölümde bu konuya değineceğiz.
