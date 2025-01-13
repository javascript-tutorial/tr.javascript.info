
# Metodlar ve prototipler

Bu bölümde prototipler ile çalışmak için ek metodlardan bahsedeceğiz

<<<<<<< HEAD
Bizim bildiğimizin haricinde prototipi ayarlamak ve almak için başka yöntemler de bulunmaktadır:

- [Object.create(proto[, descriptors])](mdn:js/Object/create) -- verilen `proto`'yu `[[Prototype]]` şeklinde alarak ve opsiyonel tanımlayıcı özelliği kullanarak boş bir obje oluşturur.
- [Object.getPrototypeOf(obj)](mdn:js/Object.getPrototypeOf) -- `obj`'nin `[[Prototype]]`'ını döndürür.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object.setPrototypeOf) -- `obj`'nin `[[Prototype]]`'ını `proto`'ya ayarlar.

[cut]

Örneğin:
=======
Setting or reading the prototype with `obj.__proto__` is considered outdated and somewhat deprecated (moved to the so-called "Annex B" of the JavaScript standard, meant for browsers only).

The modern methods to get/set a prototype are:

- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- returns the `[[Prototype]]` of `obj`.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto`.

The only usage of `__proto__`, that's not frowned upon, is as a property when creating a new object: `{ __proto__: ... }`.

Although, there's a special method for this too:

- [Object.create(proto[, descriptors])](mdn:js/Object/create) -- creates an empty object with given `proto` as `[[Prototype]]` and optional property descriptors.

For instance:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let animal = {
  eats: true
};

// animal prototipi ile yeni bir rabbit objesi yaratma.
*!*
let rabbit = Object.create(animal); // same as {__proto__: animal}
*/!*

alert(rabbit.eats); // true

*!*
<<<<<<< HEAD
alert(Object.getPrototypeOf(rabbit) === animal); // rabbit'in prototipini alma
=======
alert(Object.getPrototypeOf(rabbit) === animal); // true
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
*/!*

*!*
Object.setPrototypeOf(rabbit, {}); // rabbit'in prototipini {}'e çevirme.
*/!*
```
<<<<<<< HEAD
`Object.create` opsiyonel olarak ikinci bir argümana sahiptir: özellik tanımlayıcı. Aşağıdaki gibi yeni objeye özellikler ekleyebiliriz:
=======

The `Object.create` method is a bit more powerful, as it has an optional second argument: property descriptors.

We can provide additional properties to the new object there, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let animal = {
  eats: true
};

let rabbit = Object.create(animal, {
  jumps: {
    value: true
  }
});

alert(rabbit.jumps); // true
```
Tanımlayıcıların <info:property-descriptors> bölümünde üstünden geçilmiştir. Formatları aynıdır.
`Object.create` kullanarak obje klonlama işlemini yapabiliriz. Bu objenin özelliklerini `for..in` ile dolanmaktan daha etkin bir yöntemdir.

```js
<<<<<<< HEAD
// Objenin yüzeysel klonu
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
=======
let clone = Object.create(
  Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)
);
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```
Bu tam olarak `obj`'nin aynısını verir. Tüm özellikler: dönülebilir veya dönülemez, veri özellikleri, alıcı ve ayarlayıcılar --  her şey, ayrıca doğru `[[Prototype]]` ile

## Tarihçe

<<<<<<< HEAD
`[[Prototype]]`'ı ayarlayabileceğimiz yöntemleri saymaya kalsak baya zorluk yaşarız. Çok fazla yöntem bulunmaktadır.

Neden?

Birçok nedeni bulunmaktadır.
=======

## Brief history

There're so many ways to manage `[[Prototype]]`. How did that happen? Why?
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

- Yapıcının `"prototype"` özelliği ilk javascript ortaya çıktığından beri bulunmaktadır.
- 2012'de: `Object.create` bir standart olarak oturdu. Bu verilen prototip ile objeleri yaratmaya izin verdi. Fakat bunları almaya veya ayarlamaya değil. Bundan dolayı tarayıcılar bir standart olmayan `__proto__` erişimcilerini uygulayarak alıcı ve ayarlayıcılara ( get/set)'e izin verdi.
- 2015'te: `Object.setPrototypeOf` ve `Object.getPrototypeOf` bir standart olarak eklendi. `__proto__` defakto şeklinde aslında her yerde kullanılmıştı, Bundan dolayı çokta kulllanılan özellikler olmadı, sadece tarayıcı harici çevrelerde kullanılır oldu.

<<<<<<< HEAD
Artık bunların hepsi bizim kullanımımızdadır.

Teknik olarak `[[Prototype]]`'ı istediğimiz an alma/ayarlama işi yapabiliriz. Fakat genelde bunu sadece obje yaratırken kullanır ve daha sonra düzenleme yapmayız: `rabbit`, `animal`dan kalıtım alır fakat onu değiştirmez. JavaScript motorları da bunu yüksek derecede optimize edebilir. Prototipi `Object.setPrototypeOf` veya `obj.__proto__` ile sonradan değiştirmek oldukça yavaş bir operasyondur. Ama mümkündür.

## "En basit" Objeler

Bildiğiniz gibi objeler anahtar/değer ikilisini tutan ilişkisel dizi şeklinde kullanılabilir.

...Eğer içerisinde *kullanıcı-kaynaklı*  anahtarlar ( örneğin kullanıcının girdiği sözlük tipi veriler) var ise, ilginç bir aksaklık meydana gelir: `"__proto_"` haricinde tüm anahtarlar doğru çalışır.

Örneğin:
=======
The prototypal inheritance was in the language since its dawn, but the ways to manage it evolved over time.

- The `prototype` property of a constructor function has worked since very ancient times. It's the oldest way to create objects with a given prototype.
- Later, in the year 2012, `Object.create` appeared in the standard. It gave the ability to create objects with a given prototype, but did not provide the ability to get/set it. Some browsers implemented the non-standard `__proto__` accessor that allowed the user to get/set a prototype at any time, to give more flexibility to developers.
- Later, in the year 2015, `Object.setPrototypeOf` and `Object.getPrototypeOf` were added to the standard, to perform the same functionality as `__proto__`. As `__proto__` was de-facto implemented everywhere, it was kind-of deprecated and made its way to the Annex B of the standard, that is: optional for non-browser environments.
- Later, in the year 2022, it was officially allowed to use `__proto__` in object literals `{...}` (moved out of Annex B), but not as a getter/setter `obj.__proto__` (still in Annex B).

Why was `__proto__` replaced by the functions `getPrototypeOf/setPrototypeOf`?

Why was `__proto__` partially rehabilitated and its usage allowed in `{...}`, but not as a getter/setter?

That's an interesting question, requiring us to understand why `__proto__` is bad.

And soon we'll get the answer.

```warn header="Don't change `[[Prototype]]` on existing objects if speed matters"
Technically, we can get/set `[[Prototype]]` at any time. But usually we only set it once at the object creation time and don't modify it anymore: `rabbit` inherits from `animal`, and that is not going to change.

And JavaScript engines are highly optimized for this. Changing a prototype "on-the-fly" with `Object.setPrototypeOf` or `obj.__proto__=` is a very slow operation as it breaks internal optimizations for object property access operations. So avoid it unless you know what you're doing, or JavaScript speed totally doesn't matter for you.
```

## "Very plain" objects [#very-plain]

As we know, objects can be used as associative arrays to store key/value pairs.

...But if we try to store *user-provided* keys in it (for instance, a user-entered dictionary), we can see an interesting glitch: all keys work fine except `"__proto__"`.

Check out the example:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let obj = {};

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // [object Object] olarak döner ,  "some value" değil!
```
Eğer kullanıcı tipleri `__proto__` içerisinde ise atama görmezden gelinir!

<<<<<<< HEAD
Bu aslında çok da sürpriz olmasa gerek. `__proto__` farklı bir özelliktir: Ya obje olur veya `null`,  mesela bir karakter dizisi prototip olamaz.

Fakat buradaki amacımız böyle bir davranışı uygulamak değildi, değil mi? Biz key/value ikililerini kaydetmekti. `"__proto__"` anahtarı düzgün bir şekilde kaydedilmedi. Bundan dolayı bu bir bugdır. Burada etkisi berbat değildir fakat diğer durumlarda prototip gerçekten değişebilir ve çalışma tamamen istenmeyen bir sonuca varabilir.
=======
Here, if the user types in `__proto__`, the assignment in line 4 is ignored!

That could surely be surprising for a non-developer, but pretty understandable for us. The `__proto__` property is special: it must be either an object or `null`. A string can not become a prototype. That's why an assignment a string to `__proto__` is ignored.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Daha kötüsü -- genelde geliştiriciler böyle bir ihtimali düşünmezler bile. Bundan dolayı böyle bir bug'lar fark edilebilir ve saldırıya açık hale gelirler, özellikle JavaScript server tarafında kullanıldıysa.

<<<<<<< HEAD
Böyle bir olay sadece `__proto__`'da meydana gelir diğer tüm özellikler normalde "atanabilir"'dir.

Bu problemden nasıl kaçınılabilir?

Öncelikle `Map` kullanılabilir, her şey doğru çalışır.

Fakat burada bize `Obje` yardımcı olabilir, çünkü dili yaratıcılar bu konuları uzun zaman önce düşünmüşler.

`__proto__` objenin bir özelliği değildir. Fakat `Object.prototype`'a erişim sağlar (accessor):

![](object-prototype-2.svg)

Bundan dolayı, Eğer `obj.__proto__` okunur veya atanırsa, ilgili alıcı/ayarlayıcı prototipten çağırılır, böylece `[[Prototoy]]` alınır/ayarlanır.

Başlangıçta `__proto__` , `[[Prototype]]`a erişmek için bir yol olarak tanımlanmıştır, `[[Prototype]]` değil.

Eğer, eğer objeyi ilişkisel dizi olarak kullanmak istiyorsanız şu şekilde yapabilirsiniz:
=======
Here the consequences are not terrible. But in other cases we may be storing objects instead of strings in `obj`, and then the prototype will indeed be changed. As a result, the execution will go wrong in totally unexpected ways.

What's worse -- usually developers do not think about such possibility at all. That makes such bugs hard to notice and even turn them into vulnerabilities, especially when JavaScript is used on server-side.

Unexpected things also may happen when assigning to `obj.toString`, as it's a built-in object method.

How can we avoid this problem?

First, we can just switch to using `Map` for storage instead of plain objects, then everything's fine:

```js run
let map = new Map();

let key = prompt("What's the key?", "__proto__");
map.set(key, "some value");

alert(map.get(key)); // "some value" (as intended)
```

...But `Object` syntax is often more appealing, as it's more concise.

Fortunately, we *can* use objects, because language creators gave thought to that problem long ago.

As we know, `__proto__` is not a property of an object, but an accessor property of `Object.prototype`:

![](object-prototype-2.svg)

So, if `obj.__proto__` is read or set, the corresponding getter/setter is called from its prototype, and it gets/sets `[[Prototype]]`.

As it was said in the beginning of this tutorial section: `__proto__` is a way to access `[[Prototype]]`, it is not `[[Prototype]]` itself.

Now, if we intend to use an object as an associative array and be free of such problems, we can do it with a little trick:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
*!*
let obj = Object.create(null);
// or: obj = { __proto__: null }
*/!*

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // "some value"
```

`Object.create(null)`  prototip'i olmayan boş bir obje yaratır.(`[[Prototype]]` null'dur):

![](object-prototype-null.svg)

Bundan dolayı `__proto__`  için atadan kalan alıcı/ayarlayıcı bulunmamaktadır. Artık sıradan bir veri özelliği olarak işlenir, bundan dolayı yukarıdaki örnek doğru bir şekilde çalışır.

<<<<<<< HEAD
Böyle objelere "en basit" veya "saf sözlük objeleri" denir, Çünkü bunlar sıradan objelerden `{...}` bile daha basittirler.
=======
We can call such objects "very plain" or "pure dictionary" objects, because they are even simpler than the regular plain object `{...}`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Bu objelerin kötü tarafı ise, içinde hiçbir varsayılan metod bulunmaz, Örneğin: `toString`:

```js run
*!*
let obj = Object.create(null);
*/!*

alert(obj); // Error (no toString)
```
...Fakat bu genelce ilişkili diziler için problem oluşturmaz.

<<<<<<< HEAD
Çoğu obje-bağlantılı metodlar `Object.something(...)` şeklindedir ve Object.keys(obj) gibi olduğundan prototipte yer almazlar, bundan dolayı şu şekilde çalışmaya devam ederler:
=======
...But that's usually fine for associative arrays.

Note that most object-related methods are `Object.something(...)`, like `Object.keys(obj)` -- they are not in the prototype, so they will keep working on such objects:

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let chineseDictionary = Object.create(null);
chineseDictionary.hello = "ni hao";
chineseDictionary.bye = "zai jian";

alert(Object.keys(chineseDictionary)); // hello,bye
```

## Tüm özellikleri alma

<<<<<<< HEAD
Bir objeden Anahtar/değer ikilisini almak için birçok yol bulunmaktadır.

Aşağıdaki kullanımını zaten biliyorsunuz:

- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- kendi  adı/değerleri/anahtar-değer ikilileri şeklinde döngü yapılabilir. Metodları sadece *enumerable* ( döngülenebilir ) ve *anahtarları karakter dizisi olanlar* .

Eğer sembolik özellikler istenirse:

- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- kendi sembolik özellik isimlerini döndürür.

Eğer döngülenemez özellikleri istenirse:

- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- kendine ait tüm karakter dizisi özellikleri dizi olarak döner.

Eğer *tüm* özellikler istenir ise:

- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) -- kendine ait tüm karakter dizisi özellikleri dizi olarak döner..

Bu metodlar hangi özellikleri döndürecekleri hususunda farklılıkları olsa da hepsi objenin kendi üzerinde çalışır. Prototipte bulunan özellikler listelenmez.

`for..in` döngüsü ise biraz farklıdır: Kalıtılmış özellikler'i de döngüye alır.

Örneğin:

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

*!*
// Sadece kendi anahtarları
alert(Object.keys(rabbit)); // jumps
*/!*

*!*
// kalıtılmış anahtarları da içerir.
for(let prop in rabbit) alert(prop); // jumps, sonra  eats
*/!*
```
Eğer kalıtılmış özellikler ayrıştırılmak istenirse bunun için varolan [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty) kullanılabilir: Eğer `obj` `key` adında kalıtımsal olmayan bir özelliğe sahipse `true` dönderir.

Kalıtımsal özellikleri bu şekilde filtreleyebilir veya başka bir şey yapabiliriz:

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

for(let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);
  alert(`${prop}: ${isOwn}`); // jumps:true, then eats:false
}
```
Şu şekilde kalıtım zinciri oluşmuştur: `rabbit`, sonra `animal` ve en son `Object.prototype` ( çünkü `animal` tam objedir {..} ), sonra bunun üzerine `null`:

![](rabbit-animal-object.svg)
=======
- To create an object with the given prototype, use:

    - literal syntax: `{ __proto__: ... }`, allows to specify multiple properties
    - or [Object.create(proto[, descriptors])](mdn:js/Object/create), allows to specify property descriptors.

    The `Object.create` provides an easy way to shallow-copy an object with all descriptors:

    ```js
    let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
    ```

- Modern methods to get/set the prototype are:

    - [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- returns the `[[Prototype]]` of `obj` (same as `__proto__` getter).
    - [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto` (same as `__proto__` setter).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

- Getting/setting the prototype using the built-in `__proto__` getter/setter isn't recommended, it's now in the Annex B of the specification.

<<<<<<< HEAD
Zincire bakarsanız `rabbit.hasOwnProperty` nereden geliyor görebilirsiniz. `Object.prototype.hasOwnPropery`, diğer bir deyişle kalıtılmış.

... Fakat öyleyse neden `for..in` içerisinde görünmüyor. Halbuki `for..in` ile kalıtılmış tüm özelliklerin listeleneceğini söylemiştik. Aslında cevap basit, bu döngüye alınamaz. Tıpkı diğer `Object.prototype`'larda olduğu gibi. Bundan dolayı listelenmemiştir.

## Özet
Bu bölümde anlatılanların üzerinden kısaca geçecek olursak:

- [Object.create(proto[, descriptors])](mdn:js/Object/create) -- verilen `proto` ile yeni bir obje yaratır, ayrıca opsiyonel olarak özellik tanımlıyıcılar verilebilir.
- [Object.getPrototypeOf(obj)](mdn:js/Object.getPrototypeOf) -- `obj`'nin `[[Prototype]]`ını döner ( `__proto__` alıcısı (getter) ile aynı işi yapar)).
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object.setPrototypeOf) -- `obj`'nin `[[Prototype]]`'ını verilen `proto`'ya ayarlar. ( `__proto__` ayarlayıcısı (setter) ile aynı işi yapar)
- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- döngülenebilir karakter dizisi/ değerler/ anahtar-değer ikilisi dizisi döner.
- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- tüm sembolik özelliklerin dizisini döner.
- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- özelliklerin tüm karakter dizisi isimlerini dizi olarak döner.
- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) -- tüm özelliklerin isimlerini dizi olarak döner.
- [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): Eğer `obj` kalıtılmış değilse ve `key` adında bir özelliği varsa `true` döner.


Şunu da belirtmiş olalım `__proto__` `[[Prototype]]` için alıcı/ayarlayıcıdır. Bu `Object.prototype` içerisinde yer alır, tıpkı diğer metodlar gibi.

Prototip olmadan bir objeyi `Object.create(null)` şeklinde yaratmak mümkündür. Bu tür objeler "saf dictionary yapısı" olarak kullanılır. `"__proto__"` anahtarı ile bir problemi bulunmamaktadır.

Obje özelliklerini döndüren ( `Object.keys` ve diğerleri ) -- "kendi" özelliklerini döndürür. Eğer kalıtılmış olanlarını da istersek `for..in` kullanabiliriz.
=======
- We also covered prototype-less objects, created with `Object.create(null)` or `{__proto__: null}`.

    These objects are used as dictionaries, to store any (possibly user-generated) keys.

    Normally, objects inherit built-in methods and `__proto__` getter/setter from `Object.prototype`, making corresponding keys "occupied" and potentially causing side effects. With `null` prototype, objects are truly empty.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
