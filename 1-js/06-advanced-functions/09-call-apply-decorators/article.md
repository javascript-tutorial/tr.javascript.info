# Dekoratörler ve iletilme, call/apply

JavaScript fonksiyonlar ile uğraşırken inanılmaz derecede esneklik sağlamaktadır. Fonksiyonlar başka fonksiyonlara gönderilebilir, obje olarak kullanılabilir. Şimdi ise bunların nasıl *iletileceği* ve nasıl *dekore* edileceğinden bahsedilecektir;

## Saydam Saklama

Diyelim ki `slow(x)` diye yoğun işlemci gücüne ihtiyaç duyan bir fonksiyonunuz olsun, buna rağmen sonucları beklediğiniz şekilde vermekte.

<<<<<<< HEAD
Eğer bu fonksiyon sık sık çağırılıyor ise farklı x'ler için sonucu saklamak bizi tekrar hesaplamadan kurtarabilir.

Fakat bunu `slow()` fonksiyonunun içine yazmak yerine yeni bir wrapper yazmak daha iyi olacaktır. Göreceğiniz üzere size oldukça fazla yardımı olacaktır.
=======
If the function is called often, we may want to cache (remember) the results to avoid spending extra-time on recalculations.

But instead of adding that functionality into `slow()` we'll create a wrapper function, that adds caching. As we'll see, there are many benefits of doing so.
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c

Kod aşağıdaki gibidir:

```js run
function slow(x) {
  // burada baya yoğun işlemci gücüne ihtiyaş duyan işler yapılmaktadır.
  alert(`${x} ile çağırıldı`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
<<<<<<< HEAD
    if (cache.has(x)) { // eğer sonuç map içerisinde ise 
      return cache.get(x); // değeri gönder
    }

    let result = func(x); // aksi halde hesap yap

    cache.set(x, result); // sonra sonucu sakla 
=======
    if (cache.has(x)) {    // if there's such key in cache
      return cache.get(x); // read the result from it
    }

    let result = func(x);  // otherwise call func

    cache.set(x, result);  // and cache (remember) the result
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c
    return result;
  };
}

slow = cachingDecorator(slow);

<<<<<<< HEAD
alert( slow(1) ); // slow(1) saklandı
alert( "Tekrar: " + slow(1) ); // aynısı döndü

alert( slow(2) ); // slow(2) saklandı
alert( "Tekrar: " + slow(2) ); // bir önceki ile aynısı döndü.
=======
alert( slow(1) ); // slow(1) is cached and the result returned
alert( "Again: " + slow(1) ); // slow(1) result returned from cache

alert( slow(2) ); // slow(2) is cached and the result returned
alert( "Again: " + slow(2) ); // slow(2) result returned from cache
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c
```

Yuarkıdaki kodda `cachingDecorator` bir *dekoratör*'dür: Diğer bir fonksiyonu alan ve bunun davranışını değiştiren özel bir fonksiyon fonksiyon.

Aslında her bir fonksiyon için `cachingDecorator` çağrılabilir ve o da saklama mekanizmasını kullanır. Harika, bu şekilde ihtiyacı olacak bir çok fonksiyonumuz olabilir. Tek yapmamız gereken bu fonksiyonlara `cachingDecorator` uygulamak.

Saklama olayını ana fonksiyonldan ayırarak aslında daha temiz bir yapıya da geçmiş olduk.

<<<<<<< HEAD
Detayına inmeye başlayabiliriz.

`cachingDecorator(func)` bir çeşit "wrapper(saklayıcı)"'dır. Bu işlem `func(x)` i "saklama" işine yarar.

![](decorator-makecaching-wrapper.svg)

Gördüğünüz gibi, saklayıcı `func(x)`'ı olduğu gibi dönderir. Saklayıcının dışındaki `yavaş` olan fonksiyon hala aynı şekilde çalışır. Aslında davranışın üstüne sadece saklama(caching) mekanizması gelmiştir.
=======
The result of `cachingDecorator(func)` is a "wrapper": `function(x)` that "wraps" the call of `func(x)` into caching logic:

![](decorator-makecaching-wrapper.svg)

From an outside code, the wrapped `slow` function still does the same. It just got a caching aspect added to its behavior.
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c

Özetlersek, ayrı bir `cachingDecorator` kullanmanın faydaları şu şekildedir:

<<<<<<< HEAD
- `cachingDecorator` tekrar kullanılabilir. Başka bir fonksiyona da uygulanabilir.
- Saklama(caching) mantığı ayrılmıştır böylece `yavaş` kodun içine daha fazla kod yazıp karışıklaştırılmamaktadır.
- Eğer ihtiyaç birden fazla dekoratör birlikte kullanılabilir.

## Kaynak için "func.all" kullanmak.

Yukarıda bahsettiğimiz saklama dekoratörü obje metodları ile çalışmak için müsait değildir.
=======
- The `cachingDecorator` is reusable. We can apply it to another function.
- The caching logic is separate, it did not increase the complexity of `slow` itself (if there was any).
- We can combine multiple decorators if needed (other decorators will follow).

## Using "func.call" for the context
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c

Örneğin aşağıdaki kodda `user.format()` dekorasyondan sonra çalışmayı durdurur:

```js run
//  worker.slow sakla yapılacaktır.
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
<<<<<<< HEAD
    // burada çok zorlu bir görev olabilir.  
=======
    // scary CPU-heavy task here  
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

// eskisiyle aynı kod
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
*!*
    let result = func(x); // (**)
*/!*
    cache.set(x, result);
    return result;
  };
}

alert( worker.slow(1) ); // orjinal metod çalışmakta

worker.slow = cachingDecorator(worker.slow); // şimdi saklamaya alındı.

*!*
alert( worker.slow(2) ); // Whoops! Error: Özellik okunamamaktadır. `someMethod` tanımsız.
*/!*
```
`(*)` satırında hata olur `this.someMethod`'a erişmeye çalışır fakat başırılı olamaz. Nedeni ne olabilir ?

Sebebi `(**)` satırında orjinal `func(x)` çağırılmıştır. Bu şekilde çağırıldığında, fonksiyon `this = undefined` alır.

Aşağıdaki kod çalıştırılırsa da aynısı görülebilir:

```js
let func = worker.slow;
func(2);
```

Saklayıcı çağrıyı gerçek çalışacak metoda gönderir. Fakat `this` olmadığından dolayı hata alır.

Bunu düzeltmek için.

Özel bir metod bulunmaktadır [func.call(context, ...args)](mdn:js/Function/call) `this`'i belirterek doğrudan fonksiyonu çağırmaya yarar.

Yazımı aşağıdaki gibidir:

```js
func.call(context, arg1, arg2, ...)
```

İlk argüman `this`'dir diğerleri ise fonksiyon için gerekli argümanlardır.

Kullanımı şu şekildedir:

```js
func(1, 2, 3);
func.call(obj, 1, 2, 3)
```

Her ikisi de aslında `func` fonksiyonlarını `1`, `2`, `3` argümanları ile çağırır tek fark `func.call` fonksiyonunda `this`de gönderilir.

Örneğin, aşağıdaki kod `sayHi` metodunu iki farklı objeye değer atayarak çağırır. Birinci satırda `this=user` ikinci satırda ise `this=admin` değeri atanarak bu çağrı gerçekleştirilir.

```js run
function sayHi() {
  alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

<<<<<<< HEAD
// farklı objeler "this" objesi olarak gönderilebilir.
=======
// use call to pass different objects as "this"
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c
sayHi.call( user ); // John
sayHi.call( admin ); // Admin
```

Burada `say` metodunu çağırarak ne söyleneceğini gönderiyoruz:


```js run
function say(phrase) {
  alert(this.name + ': ' + phrase);
}

let user = { name: "John" };

// user `this` olmakta ve `phrase` ilk argüman olmaktadır. 
say.call( user, "Hello" ); // John: Hello
```

<<<<<<< HEAD
Bizim durumumuzda saklayıcı içinde `call` kullanarak içeriği orijinal fonksiyona aktarabiliriz:
=======
In our case, we can use `call` in the wrapper to pass the context to the original function:
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c

```js run
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    alert(x + "ile çağırıldı");
    return x * this.someMethod(); // (*)
  }
};

function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
*!*
    let result = func.call(this, x); // "this" is passed correctly now
*/!*
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator(worker.slow); // now make it caching

alert( worker.slow(2) ); // çalışır
alert( worker.slow(2) ); // orjinali değilde hafızadaki çalışır.
```

Şimdi her şey beklendiği gibi çalışıyor.

Daha açıklayıcı olması için `this`'in nasıl ilerlediğini inceleyebiliriz:

1. Dekorasyon işleminden sonra `worker.slow` artık `function(x){ ...}` halini almıştır.
2. Öyleyse `worker.slow(2)` çalıştırıldığında saklayıcı `2` ve `this=worker` ( noktadan önceki obje ) argümanlarını alır.
3. Saklayıcı(wrapper) içinde sonucun henüz belleğe alınmadığını varsayarsak `func.call(this,x)` o anki `this` (`=worker`) ve ('=2`) değerini orjinal metoda gönderir.

<<<<<<< HEAD
=======
## Going multi-argument
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c

## "func.apply" ile çoklu argüman kullanımı

`cachingDecorator` daha evrensel yapmak için ne değişiklikler yapmalıdır?

```js
let worker = {
  slow(min, max) {
    return min + max; // CPU'ya çok yük bindiren bir işlem.
  }
};

// aynı argüman ile çağırılmalıdır.
worker.slow = cachingDecorator(worker.slow);
```

<<<<<<< HEAD
Burada çözmemiz gereken iki problem bul

İlki `min` ve `max` değerlerinin bu `bellek` haritasında anahtar olarak nasıl tutulacağı. Önceki konuda tek `x` argümanı için `cache.set(x,result)` şeklinde sonucu belleğe kaydetmiş ve sonra `cache.get(x)` şeklinde almıştık. Fakat şimdi sonucu *argümanların birleşimi* şeklinde hatırlamak gerekmektedir. Normalde `Map` anahtarı tek değer olarak almaktadır.
=======
Previously, for a single argument `x` we could just `cache.set(x, result)` to save the result and `cache.get(x)` to retrieve it. But now we need to remember the result for a *combination of arguments* `(min,max)`. The native `Map` takes single value only as the key.
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c


Bu sorunun çözümü için bazı çözümler şu şekildedir:

<<<<<<< HEAD
1. Map-benzeri bir yapı kurarak birkaç anahtarı kullanabilen bir veri yapısı oluşturmak.
2. İç içe map kullanarak; Örneğin `cache.set(min)` aslında `(max, result)`'ı tutmaktadır. Böylece `result` `cache.get(min).get(max)` şeklinde alınabilir.
3. İki değeri teke indirerek. Bizim durumumuzda bu `"min,max"` şeklinde bir karakter dizisini `Map`'in anahtarı yapmak olabilir. Ayrıca *hashing fonksiyonu*'u dekoratöre sağlayabiliriz. Bu fonksiyon da birçok değerden bir değer yapabilir.

Çoğu uygulama için 3. çözüm yeterlidir. Biz de bu çözüm ile devam edeceğiz.

İkinci görev ise fonksiyona birden fazla argümanın nasıl gönderileceğidir. Şu anda saklayıcı fonksiyona `function(x)` şeklinde tek argüman gönderilmektedir. Bu da `func.call(this,x)` şeklinde uygulanır.

Burada kullanılacak diğer metod [func.apply](mdn:js/Function/apply)'dır.

Yazımı:

```js
func.apply(context, args)
```

Bu `func`'ı `this=context` ve args için dizi benzeri bir argüman dizisi ile çalıştırır.

Örneğin aşağıdaki iki çağrı tamamen aynıdır.

```js
func(1, 2, 3);
func.apply(context, [1, 2, 3])
```
Her ikisi de `func`'ı `1,2,3`argümanları ile çalıştırır. Fakat `apply` ayrıca `this=context`'i ayarlar.

```js run
function say(time, phrase) {
  alert(`[${time}] ${this.name}: ${phrase}`);
}

let user = { name: "John" };

let messageData = ['10:00', 'Hello']; // time, phrase'e dönüşür.

*!*
// this = user olur , messageData liste olarak (time,phrase) şeklinde gönderilir.
say.apply(user, messageData); // [10:00] John: Hello (this=user)
*/!*
```
`call` argüman listesi beklerken `apply` dizi benzeri bir obje ile onları alır.

Yayma operatörü <info:rest-parameters-spread-operator>  konusunda `...` yayma operatörünün ne iş yaptığını işlemiştik. Dizilerin argüman listesi şeklinde gönderilebileceğinden bahsemiştik. Öyleyse `call` ile bunu kullanırsak neredeyse `apply`'ın işlevini görebiliriz.

Aşağıdaki iki çağrı birbirinin aynısıdır:

```js
let args = [1, 2, 3];

*!*
func.call(context, ...args); // dizileri yayma operatörü ile liste şeklinde gönderir.
func.apply(context, args);   // aynısını apply ile yapar.
*/!*
```

İşleme daha yakından bakılacak olursa `call` ile `apply` arasında oldukça küçük bir fark vardır.

- Yayma operatörü `...` list gibi *döngülenebilir* argümanları `call` edilmek üzere iletebilir.
- `apply` ise sadece *dizi-benzeri* `args` alır.

Öyleyse bu çağrılar birbirinin tamamlayıcısıdır. `Döngülenebilir` beklediğimizde `call`, `dizi-benzeri` beklediğimizde ise `apply` çalışır.

Eğer `args` hem `döngülenebilir` bende `dizi` ise teknik olarak ikisini de kullanabiliriz, fakat `apply` muhtemelen daha hızlı olacaktır. Çünkü tek bir işlemden oluşur. Çoğu JavaScript motoru bir kaç `call + spread` kullanmaktan daha iyi şekilde optimizasyon yapar.

Apply'ın en çok  çağrıyı diğer fonksiyona iletirken işe yarar:

```js
let wrapper = function() {
  return anotherFunction.apply(this, arguments);
};
```
Buna *çağrı iletme* denir. Saklayıcı sahip olduğu herşeyi iletir: `this` ile argümanları `anotherFunction`'a iletir ve sonucunu döner.

Böyle bir saklayıcı kod çağırıldığında içerideki orjinal fonksiyon çağıran tarafından ayrıştırılamaz.

Şimdi bunları daha güçlü `cachingDecoratır`'da işleyelim:
=======
For many practical applications, the 3rd variant is good enough, so we'll stick to it.

Also we need to pass not just `x`, but all arguments in `func.call`. Let's recall that in a `function()` we can get a pseudo-array of its arguments as `arguments`, so `func.call(this, x)` should be replaced with `func.call(this, ...arguments)`.

Here's a more powerful `cachingDecorator`:
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c

```js run
let worker = {
  slow(min, max) {
    alert(`${min},${max} ile çağırıldı`);
    return min + max;
  }
};

function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
*!*
    let key = hash(arguments); // (*)
*/!*
    if (cache.has(key)) {
      return cache.get(key);
    }

*!*
    let result = func.call(this, ...arguments); // (**)
*/!*

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

alert( worker.slow(3, 5) ); // works
alert( "Again " + worker.slow(3, 5) ); // same (cached)
```
Şimdi saklayıcı(wrapper) birçok argüman ile çalışabilir.

<<<<<<< HEAD
İki tane değişiklik oldu:

- `(*)` satırında bir `has` ile argümanlardan tek bir anahtar meydana getirildi. Bunun için basit "birleştirme" fonksiyonu kullanılmıştır. `(3,5)` `"3,5"` şekline getirildi. Tabi başka hash fonksiyonları için daha karmaşık bir yapı gerekebilir. 
- `(**)` satırında ise `func.apply` ile hem kaynak ( this ) hem de saklayıcı argümanları (ne kadar olduğu önemli değil) orjinal fonksiyona iletilmiştir.
=======
Now it works with any number of arguments (though the hash function would also need to be adjusted to allow any number of arguments. An interesting way to handle this will be covered below).

There are two changes:

- In the line `(*)` it calls `hash` to create a single key from `arguments`. Here we use a simple "joining" function that turns arguments `(3, 5)` into the key `"3,5"`. More complex cases may require other hashing functions.
- Then `(**)` uses `func.call(this, ...arguments)` to pass both the context and all arguments the wrapper got (not just the first one) to the original function.

## func.apply

Instead of `func.call(this, ...arguments)` we could use `func.apply(this, arguments)`.

The syntax of built-in method [func.apply](mdn:js/Function/apply) is:

```js
func.apply(context, args)
```

It runs the `func` setting `this=context` and using an array-like object `args` as the list of arguments.

The only syntax difference between `call` and `apply` is that `call` expects a list of arguments, while `apply` takes an array-like object with them.

So these two calls are almost equivalent:

```js
func.call(context, ...args);
func.apply(context, args);
```

They perform the same call of `func` with given context and arguments.

There's only a subtle difference regarding `args`:

- The spread syntax `...` allows to pass *iterable* `args` as the list to `call`.
- The `apply` accepts only *array-like* `args`.

...And for objects that are both iterable and array-like, such as a real array, we can use any of them, but `apply` will probably be faster, because most JavaScript engines internally optimize it better.

Passing all arguments along with the context to another function is called *call forwarding*.

That's the simplest form of it:

```js
let wrapper = function() {
  return func.apply(this, arguments);
};
```

When an external code calls such `wrapper`, it is indistinguishable from the call of the original function `func`.
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c

## Metod Ödünç Alma  [#method-borrowing]

Hash fonksiyonunda biraz değişiklik yapalım:

```js
function hash(args) {
  return args[0] + ',' + args[1];
}
```

Bundan sonra bu fonksiyon sadece iki argümanla çalışacak. Bunun yerine belirsiz sayıdaki argümanla çalışsa daha iyi olur.

Bunu kullanmanın doğal yolu [arr.join](mdn:js/Array/join) metodudur:

```js
function hash(args) {
  return args.join();
}
```
... Malesef bu çalışmaz. Çünkü `hash(argümanlar)` çağırılmakta ve `arguments` objei hem `döngülenebilir` hemde `dizi-benzeri` olduğundan, fakat gerçek dizi olmadığından çalışmaz.

<<<<<<< HEAD
Öyleyse `join` bu durumda çağırılamaz, örneğin:
=======
...Unfortunately, that won't work. Because we are calling `hash(arguments)`, and `arguments` object is both iterable and array-like, but not a real array.

So calling `join` on it would fail, as we can see below:
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c

```js run
function hash() {
*!*
  alert( arguments.join() ); // Error: arguments.join fonksiyon değil.

*/!*
}

hash(1, 2);
```

Fakat yine de dizi birleştirme kullanmanın kolay bir yolu vardır.

```js run
function hash() {
*!*
  alert( [].join.call(arguments) ); // 1,2
*/!*
}

hash(1, 2);
```

Bu cambazlığa *metod ödünç alma* denir.

<<<<<<< HEAD
Normal diziden `[].join` join ödünç alınır. Sonrasında `arguments` contexi ile çağrı yapılır `[].join.call`
=======
We take (borrow) a join method from a regular array (`[].join`) and use `[].join.call` to run it in the context of `arguments`.
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c

Peki neden çalışır?

Çünkü gerçek dizinin `join` metodu oldukça basittir.

Tanımından "olduğu" gibi alındığında işlem şu şekildedir:

1. `yapistir` ilk argüman olsun, eğer argüman yoksa `","` ilk argüman olsun.
2. `sonuc` boş karakter dizisi olsun
3. `this[0]`'ı sonuca ekle.
4. `yapistir` ve `this[1]`'i ekle
5. `yapistir` ve `this[2]`'i ekle
6. ... `this.length`'e kadarki tüm elemanlar yapıştırılana kadar ekle.
7. `sonuc` dön
7. Return `result`.

Teknik olarak `this`'i alır ve `this[0]`, `this[1]` ...vs. şeklinde birleştirir. Bu şekilde yazılarak tüm `dizi-gibi`'lerin `this` şeklinde çalışmasını sağlar. Bundan dolayı `this=arguments` şeklinde de çalışır.

<<<<<<< HEAD
## Özet
=======
## Decorators and function properties

It is generally safe to replace a function or a method with a decorated one, except for one little thing. If the original function had properties on it, like `func.calledCount` or whatever, then the decorated one will not provide them. Because that is a wrapper. So one needs to be careful if one uses them.

E.g. in the example above if `slow` function had any properties on it, then `cachingDecorator(slow)` is a wrapper without them.

Some decorators may provide their own properties. E.g. a decorator may count how many times a function was invoked and how much time it took, and expose this information via wrapper properties.

There exists a way to create decorators that keep access to function properties, but this requires using a special `Proxy` object to wrap a function. We'll discuss it later in the article <info:proxy#proxy-apply>.

## Summary
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c

*Decoratör* fonksiyonun davranışını değiştiren saklayıcılardır(wrapper). İş hala ana fonksiyonda yapılır.

<<<<<<< HEAD
Genelde gerçek fonksiyonu dekoratör ile değiştirmek güvenlidir, bir olay haricinde. Eğer orjinal fonksiyon `func.calledCount` gibi bir özelliğe sahipse, dekoratör bunu sağlamayacaktır çünkü bu bir saklayıcıdır. Bundan dolayı kullanırken dikkatli olunmalıdır. Bazı dekoratörler kendine ait özellikler tutarlar.

`cachingDecorator` kullanmak için bazı metodlar denedik:
=======
Decorators can be seen as "features" or "aspects" that can be added to a function. We can add one or add many. And all this without changing its code!
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c

- [func.call(context, arg1, arg2...)](mdn:js/Function/call) -- `func`'ı verilen kaynak ve argümanlar ile çağırır.
- [func.apply(context, args)](mdn:js/Function/apply) -- `kaynak`'ı `this` olarak ve `array-benzeri` argümanları liste olarak iletir.

*çağrı iletme* genelde `apply` ile gerçekleştirilir:

```js
let wrapper = function() {
  return original.apply(this, arguments);
};
```

<<<<<<< HEAD
Ayrıca *metod ödünç alma*'yı da gördük. Bir metotdan obje alındığında ve bu diğer objenin kaynağında(context) `çağırıldığında` gerçekleşir. Dizi metodlarını alıp argümanlara uygulama çokça kullanılır. Bunun alternatifi `geriye kalan` parametre objelerini kullanmaktır. Bunlar gerçek dizilerdir.

Araştırırsanız birçok dekoratör görebilirsiniz. Bu bölümdeki görevleri çözerekte kendinizi geliştirebilirsiniz.
=======
We also saw an example of *method borrowing* when we take a method from an object and `call` it in the context of another object. It is quite common to take array methods and apply them to `arguments`. The alternative is to use rest parameters object that is a real array.

There are many decorators there in the wild. Check how well you got them by solving the tasks of this chapter.
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c
