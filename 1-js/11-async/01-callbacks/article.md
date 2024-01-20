

# Callback fonksiyonlarına giriş

```warn header="Buradaki örneklerde tarayıcı yöntemlerini kullanıyoruz"
Callback, promises ve diğer soyut kavramları göstermek için belirli tarayıcı yöntemlerini kullanacağız: özellikle, betikleri yüklemek ve basit belge manipülasyonları gerçekleştirmek.

Bu yöntemlerle alışık değilseniz ve örneklerdeki kullanımı anlamakta zorlanıyorsanız, [sonraki bölüm](/document)den birkaç bölümü okumanız faydalı olabilir.

Yine de, her şeyi mümkün olduğunca açık hale getirmeye çalışacağız. Tarayıcı yöntemleri ve işlemleri ile ilgili gerçekten karmaşık bir şey olmayacak.
```

JavaScript'in çalıştığı geliştirme ortamları tarafından sağlanan birçok fonksiyon, *asenkron* eylemleri planlamanıza olanak tanır. Başka bir deyişle, şu an başlattığımız ancak daha sonra tamamlanan eylemler.

Örneğin, setTimeout fonksiyonu, bu türden bir fonksiyona örnektir.

Asenkron eylemlerin diğer gerçek dünya örnekleri de bulunmaktadır, örneğin, betik ve modülleri yükleme (bunları daha sonraki bölümlerde ele alacağız).

İşte loadScript(src) adlı fonksiyonu inceleyin; bu fonksiyon, verilen src ile bir betiği yükler:

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

Diyelim ki kod yüklendikten sonra yeni kodu kullanmak istiyor olalım. Yeni fonksiyonlar yaratılmışsa bunları kullanacağımızı varsayalım.

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
2. İkinci argüman ise başarılı bir sonuçta gönderilir. Sonra `callback(null, result1, result2...)` çağırılır.

Böylece tek bir `callback` fonksiyonu ile hem hata gönderilebilir, hem de cevap dönülebilir.

## Kıyamet pramidi

İlk bakıldığında asenkron kodlama mantıklı gelebilir. Gerçekten de öyle. Bir veya iki çağrı fena görünmüyor.

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
    })
  }
});
```

Yukarıdaki kodda:
1. Önce `1.js`'yi yükledik. 
2. Hata yoksa `2.js`'yi yükle.
3. Hata yoksa `3.js`'yi ve en sonda da `(*)` çalıştırılır.

Çağrılar çoğaldıkça kod daha derinlere inmekte ve bunun yönetimi de zorlaşmaktadır, özellikle içerisinde `...` yerine gerçek kod varsa bu birçok döngüye, koşula sahip olacaktır.

Bunun için "callback cehennemi" veya "Kıyamet piramidi" denilebilir.

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
};
```
Gördüğünüz gibi aynısı, fakat iç içe yazılmış derinlemesine bir fonksiyon yok. Her iş ayrı bir fonksiyonda tamamlanıyor.

Tamamdır. Artık çalışıyor fakat ayrı ayrı bir tablo gibi duruyor. Okuması oldukça zor, sizin de fark edeceğiniz gibi okurken sürekli ileri geri kodları inceliyorsunuz. Bu kullanışsız bir yöntem oldu, hele ki kod okumayla pek uğraşmayanlar nereye zıplayacaklarını anlayamayacaklardır.

Ayrıca `step*` fonksiyonu tek kullanımlık oldu. Amaç sadece "kıyamet piramidi"nden korunmak. Bu fonksiyonları başka kimse kullanmayacaktır. Böylece boş bir sürü isim kullandık ve çöplüğe çevirdik.

Bu problemi çözmek için daha iyi bir yöntem mevcut.

Bunun için kullanılacak en iyi yöntemlerden biri "promises" kullanmaktır. Bir sonraki bölümde bu konuya değineceğiz.
