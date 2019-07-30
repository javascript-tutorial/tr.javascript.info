

# Callback fonksiyonlarına giriş

Çoğu JavaScript eylemleri *asenkron*'dur

Aşağıdaki `loadScript(src)` fonksiyonuna bakacak olursanız:

```js
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```
Bu fonksiyonun amacı yeni kodu yüklemektir. `<script src="...">`'yi dökümana ekler ve çalıştırır.

Aşağıdaki gibi kullanılabilir.

```js
// kodu yükler ve çalıştırır.
loadScript('/my/script.js');
```
Bu fonksiyon "asenkron" olarak adlandırılır, çünkü işlerini hemen değil de daha sonra bitirir.

Çağrı ile script yüklenmeye başlar ve sonrasında çalıştırılır. Yüklerken aşağıdaki kod çalışmayı bitirebilir ve eğer bu yükleme zaman alırsa aynı anda diğer kodlar da çalışabilir.


```js
loadScript('/my/script.js');
// loadScript altındaki kodlar loadScript'in bitmesini beklemeden çalışmaktadır.
// ...
```

Diyelimki kod yüklendikten sonra yeni kodu kullanmak istiyor olalım. Yeni fonksiyonlar yaratılmışsa bunları kullanacağımızı varsaylım.

Eğer bunu doğrudan `loadScript(…)` çağrısı sonrasına yaparsanız çalışmaz:

```js
loadScript('/my/script.js'); //  "function newFunction() {…}" a sahip olduğunu varsayalım

*!*
newFunction(); // böyle bir fonksiyon bulunmamaktadır.
*/!*
```
Doğal olarak, tarayıcı kodu yükleyecek zaman bulamadı. Bundan dolayı doğrudan yeni fonksiyonu çağırdığında hata meydana geldi. Bundan sonra `loadScript` fonksiyonu yüklemenin ne durumda olduğunu bildiremez. Script en nihayetinde yüklenir ve sonrasında çalıştırılır, bu kadar. Fakat biz bunun ne zaman olduğunu bilmek istiyoruz. Yüklenen koddaki fonksiyonlar ve değişkenleri kullanmak istiyoruz.

`callback` fonksiyonunu ikinci bir parametre olarak `loadScript` e ekleyelim, bu kod yüklendiğinde çalışması lazım.

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
  alert(`Cool, the ${script.src} is loaded`);
  alert( _ ); // yüklenmiş kodlar içerisinde bu fonksiyon tanımlı.
});
*/!*
```
Buna "callback-tabanlı" asenkron programlama tipi denir. Bir fonksiyon asenkron olarak bir iş yapıyorsa `callback`'i de sunmalıdır. Böylece bundan sonra neyin çalışacağına karar verebiliriz.

Burada `loadScript` için kullandık, fakat bu genel bir yaklaşımdır.

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

  })

});
```
Böylece, her yeni eylem callback içerisinde kalır. Bu birkaç aksiyon için sorun olmaz fakat daha çok ise sorun yaratacaktır.

## Hataları İşlemek

Yukarıdaki örnekte hataları düşünmedik. Ya kod hata verirse? Callback fonksiyonu buna göre hareket edebilmelidir.

Aşağıda `loadScript`'in hataları takip eden, geliştirilmiş versiyonu yer almaktadır:

```js run
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

## Pyramid of Doom

From the first look, it's a viable way of asynchronous coding. And indeed it is. For one or maybe two nested calls it looks fine.

But for multiple asynchronous actions that follow one after another we'll have code like this:

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
            // ...continue after all scripts are loaded (*)
  */!*
          }
        });

      }
    })
  }
});
```

In the code above:
1. We load `1.js`, then if there's no error.
2. We load `2.js`, then if there's no error.
3. We load `3.js`, then if there's no error -- do something else `(*)`.

As calls become more nested, the code becomes deeper and increasingly more difficult to manage, especially if we have a real code instead of `...`, that may include more loops, conditional statements and so on.

That's sometimes called "callback hell" or "pyramid of doom."

![](callback-hell.svg)

The "pyramid" of nested calls grows to the right with every asynchronous action. Soon it spirals out of control.

So this way of coding isn't very good.

We can try to alleviate the problem by making every action a standalone function, like this:

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
};
```

See? It does the same, and there's no deep nesting now because we made every action a separate top-level function.

It works, but the code looks like a torn apart spreadsheet. It's difficult to read, and you probably noticed that one needs to eye-jump between pieces while reading it. That's inconvenient, especially if the reader is not familiar with the code and doesn't know where to eye-jump.

Also, the functions named `step*` are all of single use, they are created only to avoid the "pyramid of doom." No one is going to reuse them outside of the action chain. So there's a bit of a namespace cluttering here.

We'd like to have something better.

Luckily, there are other ways to avoid such pyramids. One of the best ways is to use "promises," described in the next chapter.
