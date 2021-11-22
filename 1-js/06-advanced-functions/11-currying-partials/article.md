libs:
  - lodash

---


# Tımarlama ve kısmi fonksiyonlar

Şimdiye kadar fonksiyon bağlar iken sadece `this` hakkında konuşmuştuk. Bunu bir adım ileri götürme vakti geldi.

Aslında sadece `this` değil argümanları da bağlamak mümkün. Çok nadir yapılan bir teknik fakat bilmekte fayda var.

[cut]

`bind`'ın yazımı:

```js
let bound = func.bind(context, arg1, arg2, ...);
```

Bu kaynağı `this` olarak bağlamaya ve ardından argümanları tanımlaya olanak verir.

Örneğin çarpma fonksiyonu `mul(a,b)`:

```js
function mul(a, b) {
  return a * b;
}
```

Bunun iki katını almak için `double` fonksiyonunu şu şekilde bağlayarak yaratabiliriz:

```js run
*!*
let double = mul.bind(null, 2);
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

`mul.bind(null,2)` ile `double` fonksiyonu yaratılır. Bu fonksiyon `mul`'a kaynağı `null` yaparak fakat ilk argüman 2 olacak şekilde iletilir. Bundan sonraki argümanlar da "olduğu gibi" iletilir.

Bu olaya [kısmi fonksiyon uygulaması](https://en.wikipedia.org/wiki/Partial_application) denir -- var olan fonksiyonun parametrelerini değiştirerek yeni bir fonksiyon yaratma olayı.

Dikkat ederseniz aslında biz burada `this`'i hiç kullanmıyoruz. Fakat `bind`'ın buna ihtiyacı var bundan dolayı `null` gibi bir değer koymak zorundayız.

Üç ile çarpma olayını ( `triple` ) ise şu şekilde yazabiliriz 

```js run
*!*
let triple = mul.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

Neden kısmi fonksiyon kullanıyoruz? 

Burada amaç var olan fonksiyon üzerinden okunabilir bağımsız bir fonksiyon yaratmaktır ( `double`, `triple`) Böylece bunu kullanabilir ve her defasında ilk argümanı yazmak zorunda kalmayız çünkü `bind` ile bu sabitlenmiş olur.

Diğer bir durumda kısmı uygulamalar jenerik fonksiyon yaratmada oldukça yararlıdır, ayrıca daha genel fonksiyondan özele doğru inmeye yarar. Kullanışlılık böylece artar.

Örneğin, `send(from, to, text)` adında bir fonksiyonumuz olsun. `user` objesinin içerisinde bunun bir farklı versiyonu olan ve o anki kullanıcıyı gönderen `sendTo(to,text)` kullanmak isteyelim.

## İçerik olmadan kısmı fonksiyon kullanımı

Diyelim ki bazı argümanları düzeltmek istiyorsunuz fakat `this` ile bağlamak istemiyorsunuz?

Bildiğiniz gibi `bind` buna izin vermez. Doğrudan kaynağı atlayıp argümanları yazamazsınız.

Neyseki sadece argümanları bağlayabilen bir `kısmi` fonksiyon çok kolay bir şekilde yazılabilir.

Şu şekilde:

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

// kullanımı:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// herhangi bir şey söyleyen kısmi bir metod ile ilk argümanı düzeltebilirsiniz.
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello"); // kaynak bulunmamakta 
// Aşağıdaki gibi:
// [10:00] Hello, John!
```

`partial(func[, arg1, arg2...])` saklayıcıyı çağırıyor ve `(*)` fonksiyonu `func`'ı aşağıdaki bilgiler ile çağırıyor.

- `this` burada ( `user.sayNow` , `user`'ı çağırır)
- Sonra `...argsBound` -- `kısmi` fonksiyondan gelen değer (`"10:00"`)
- Sonra `...args` -- saklayıcıya gönderilen argüman (`"Hello"`)

Yayma operatörü ile oldukça kolay değil mi?

Bu olayın hazır halini [_.partial](https://lodash.com/docs#partial) lodash kütüphanesinde bulabilirsiniz.

## Tımarlamak

Bazen programcılar kısmı fonksiyonlar ile tımarlama olayını karıştırmaktadırlar. Tımarlama fonksiyonlar ile yapılabilecek ilginç bir tekniktir. Burada bahsetmekte fayda var.

[Tımarlama](https://en.wikipedia.org/wiki/Currying) `f(a, b, c)` olarak çağırılan bir fonksiyonu `f(a)(b)(c)` şeklinde çağırılabilmesini sağlayan bir tekniktir.

Binary fonksiyonunu tımarlamala işlemi aşağıdaki gibi yapılır. Bu fonksiyon `f(a, b)`'yı `f(a)(b)` şekline getirir:

```js run
*!*
function curry(func) {
  return function(a) {
    return function(b) {
      return func(a, b);
    };
  };
}
*/!*

// kullanımı
function sum(a, b) {
  return a + b;
}

let carriedSum = curry(sum);

alert( carriedSum(1)(2) ); // 3
```
Gördüğünüz gibi aslında birçok saklayıcının ard arda uygulanmasından meydana gelmektedir.

- `curry(func)`'ın sonucu `function(a)`'nın saklanmasıdır.
- `sum(1)` gibi bir çağrı yapıldığında arüman sözcük ortamına kaydedilir, ve yeni bir saklayıcı `function(b)` döndürürlür.
- Sonrasında `sum(1)(2)` en sonunda `function(b)`'i `2` değeri ile çağırır,  çağrıyı argümanların hepsi ile `sum` fonksiyonuna iletir.

Tımarlamanın daha gelişmiş bir versiyonu [_.curry](https://lodash.com/docs#curry) lodash kütüpyanesinde uygulanmıştır. Bu fonksiyonlar tüm argümanlar sağlandığında bir fonksiyonun normal olarak çalışmasını sağlayan saklayıcı fonksiyonu döndürür. Eğer tüm argümanlar sağlanmaz ise kısmı fonksiyon döndürür.

```js
function curry(f) {
  return function(..args) {
    // if args.length == f.length (f'in sahip olduğu kadar argüman var ise),
    //   çağrıyı f'e ilet.
    // diğer türlü args'ı ilk argüman olarak sabitleyen kısmı fonksiyon döndürülür.
  };
}
```

## Tımarlama? Neden yapılmalı?

Tımarlayarak hem fonksiyon normal olarak çağırılabilir  hem de kısmi olarak alınabilir. Yararını anlayabilmek için gerçekten de iyi bir örneğe gerek var.

Örneğin, bir loglama fonksiyonu olsun `log(data, importance, message)` gelen veriye göre çıktıyı formatlayabilsin. Projelerde böyle fonksiyonlar bunun yanında bir çok özelliğe sahip olabilir. Örneğin bunları ağ üzerinden iletmek veya filtrelemek gibi.

```js
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```

Hadi tımarlayalım!

```js
log = _.curry(log);
```
Bu `log` işleminden sonra hala normal olarak çalışır:

```js
log(new Date(), "DEBUG", "some debug");
```
... Bunun yanında tımarlı şekilde çağırılabilir:

```js
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
```
Bugünün loglarını daha kolay bir şekilde alabileceğimiz bir fonksiyon yazalım:

```js
// todayLog bugünün değeri sabit olacak şekilde oluşturulmuş bir kısmi fonksiyondur
let todayLog = log(new Date());

// kullanımı
todayLog("INFO", "message"); // [HH:mm] INFO message
```
Şimdi ise bugünün Debug değerlerini alabileceğimiz diğer bir fonksiyon yapalım:

```js
let todayDebug = todayLog("DEBUG");

todayDebug("message"); // [HH:mm] DEBUG message
```

Sonuç olarak:
1. Tımarladıktan sonra `log` fonksiyonundan birşey kaybetmedik. Hala aynı şekilde çağırabiliriz.
2. Kısmi fonksiyonlar ile işimize yarar birçok yeni fonksiyon geliştirebiliriz.


## İleri Tımarlama Uygulamaları

Bu konuyu daha "derinlemesine" incelemek istiyorsanız aşağıda daha önceki yazdığımız kodun gelişmiş vesiyonunu bulabilirsiniz.

```js run
function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

// normal şekilde çağırılabilir.
alert( curriedSum(1, 2, 3) ); // 6

// önce curried(1) ile kısmı fonksiyon alınır sonra diğer iki argüman ile çağırılır.
alert( curriedSum(1)(2,3) ); // 6

// tamamı tımarlanmış hali.
alert( curriedSum(1)(2)(3) ); // 6
```
Yeni yazdığımız `tımar` fonksiyonu karmaşık görünebilir, fakat aslında anlaması oldukça kolay.

`curr(func)`'ın sonucu `curried`'ın saklayıcısıdır ve aşağıdaki gibi görünür:

```js
// func dönüştürülecek fonksiyondur.
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function pass(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};
```
İki farklı şekilde çalışabilir:
1. Anlık çağrı: Eğer `args` sayısı orjinal fonksiyon tanımıyla aynıysa ( `func.length` )  veya uzunsa, sadece çağrıyı ilet.
2. Kısmi al: Diğer türlü, `func` henüz çağırılmamış olur. Bunun yerine `pass` döner. Bu tekrar bir önceki argümanları yeni fonksiyona iletirek `tımarlama` yapar. Yeni bir çağrıda yeniden (yeteri kadar argüman yoksa ) kısmı fonksiyon alır veya ( argüman tam ise ) sonucu alır

`sum(a, b, c)` şeklinde üç argümanlı bir çağrı durumunda nasıl çalışacağına bakalım:

`curried(1)(2)(3)` çağrısı için:

1. İlk `curried(1)` çağrısı `1`'i kendi sözcük çevresinde hatırlar ve `pass` adında bir saklayıcı döner.
2. `pass` saklayıcısı `(2)` ile çağırılır: bir önceki argüman ( `1`)'i alır ve `(2)` ile birleştirir. Böylece çağrı `curred(1,2)` şeklini alır.

    Argüman sayısı hala 3'den az olduğundan `curry` yine `pass` döndürür.
3. `pass` bu defa `(3)` ile tekrar çağırılır, bir sonraki çağrıda `pass(3)` bir önceki argümanları (`1`,`2`) alır ve bunlara `3` ekler. Böylece çağrı `curried(1, 2, 3)` şeklini alır. En sonunda 3 tane değişken oldu ve artık bu değerler orjinal fonksiyona gönderilir.

Eğer hala açık değil ise çağrıları bir kağıt üzerinde veya kafanızda sıralı şekilde takip edin.

```smart header="Sadece belirli uzunluktaki fonksiyonlar"
Tımarlama için fonksiyonların belirli bir sayıda argümanı olması gerekir.
```

```smart header="Tımarlamanın biraz ötesi"
Tanım olarak tımarlama `sum(a, b, c)` yi `sum(a)(b)(c)` şekline sokmalıdır.

Fakat tımarlamanın çoğu uygulaması daha önce anlatıldığı gibi ileri seviyedir: Fonksiyonların birkaç farklı argüman çeşidi ile çağırılabilir olması.
```

## Özet

- Var olan bir fonksiyonun argümanlarını düzeltirsek, sonuçtaki fonksiyon *kısmi* fonksiyon olur. `bind` kullanarak kısmi bölüm alınabilir, fakat farklı yolları da vardır.

    Kısmi fonksiyonlar aynı argümanın defalarca tekrarlanması istenmediğinde kullanışlı olur. Örneğin `send(from, to)` diye bir fonksiyonumuz olsun ve bizim yapacağımız işte `from`'un her zaman aynı olduğunu varsayarsak bunun için fonksiyonun kısmi bölümünü alıp bunun ile devam edebiliriz.
    
- *Tımarlama* `f(a, b, c)`'yi çağırılabilir `f(a)(b)(c)` şekline getirmektir. Javascript versiyonu hem fonksiyonu normal şekilde çağırılabilir tutarken hep de argüman sayısı yeterli olmadığında kısmi olarak geri dönderir.

    Tımarlama kolay bir şekilde kısmileştirmek istediğimizde harikadır. Loglama örneğinde gördüğünüz gibi: `log(date, importance, message)` gibi bir global fonksiyon tek bir argüman ile `log(date)` veya iki argüman ile `log(date, importance) çağırıldığında kısmilerini döner.