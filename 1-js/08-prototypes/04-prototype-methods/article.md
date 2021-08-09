
# Metodlar ve prototipler

Bu bölümde prototipler ile çalışmak için ek metodlardan bahsedeceğiz

Bizim bildiğimizin haricinde prototipi ayarlamak ve almak için başka yöntemler de bulunmaktadır:

- [Object.create(proto[, descriptors])](mdn:js/Object/create) -- verilen `proto`'yu `[[Prototype]]` şeklinde alarak ve opsiyonel tanımlayıcı özelliği kullanarak boş bir obje oluşturur.
- [Object.getPrototypeOf(obj)](mdn:js/Object.getPrototypeOf) -- `obj`'nin `[[Prototype]]`'ını döndürür.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object.setPrototypeOf) -- `obj`'nin `[[Prototype]]`'ını `proto`'ya ayarlar.

<<<<<<< HEAD
[cut]
=======
- [Object.create(proto, [descriptors])](mdn:js/Object/create) -- creates an empty object with given `proto` as `[[Prototype]]` and optional property descriptors.
- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- returns the `[[Prototype]]` of `obj`.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto`.
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b

Örneğin:

```js run
let animal = {
  eats: true
};

// animal prototipi ile yeni bir rabbit objesi yaratma.
*!*
let rabbit = Object.create(animal);
*/!*

alert(rabbit.eats); // true

*!*
<<<<<<< HEAD
alert(Object.getPrototypeOf(rabbit) === animal); // rabbit'in prototipini alma
=======
alert(Object.getPrototypeOf(rabbit) === animal); // true
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b
*/!*

*!*
Object.setPrototypeOf(rabbit, {}); // rabbit'in prototipini {}'e çevirme.
*/!*
```
`Object.create` opsiyonel olarak ikinci bir argümana sahiptir: özellik tanımlayıcı. Aşağıdaki gibi yeni objeye özellikler ekleyebiliriz:

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
=======
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```
Bu tam olarak `obj`'nin aynısını verir. Tüm özellikler: dönülebilir veya dönülemez, veri özellikleri, alıcı ve ayarlayıcılar --  herşey, ayrıca doğru `[[Prototype]]` ile

<<<<<<< HEAD
## Tarihçe

`[[Prototype]]`'ı ayarlayabileceğimiz yöntemleri saymaya kalsak baya zorluk yaşarız. Çok fazla yöntem bulunmaktadır.
=======
This call makes a truly exact copy of `obj`, including all properties: enumerable and non-enumerable, data properties and setters/getters -- everything, and with the right `[[Prototype]]`.

## Brief history

If we count all the ways to manage `[[Prototype]]`, there are a lot! Many ways to do the same thing!

Why?
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b

Neden?

<<<<<<< HEAD
Birçok nedeni bulunmaktadır.
=======
- The `"prototype"` property of a constructor function has worked since very ancient times.
- Later, in the year 2012, `Object.create` appeared in the standard. It gave the ability to create objects with a given prototype, but did not provide the ability to get/set it. So browsers implemented the non-standard `__proto__` accessor that allowed the user to get/set a prototype at any time.
- Later, in the year 2015, `Object.setPrototypeOf` and `Object.getPrototypeOf` were added to the standard, to perform the same functionality as `__proto__`. As `__proto__` was de-facto implemented everywhere, it was kind-of deprecated and made its way to the Annex B of the standard, that is: optional for non-browser environments.
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b

- Yapıcının `"prototype"` özelliği ilk javascript ortaya çıktığından beri bulunmaktadır.
- 2012'de: `Object.create` bir standart olarak oturdu. Bu verilen prototip ile objeleri yaratmaya izin verdi. Fakat bunları almaya veya ayarlamaya değil. Bundan dolayı tarayıcılar bir standart olmayan `__proto__` erişimcilerini uygulayarak alıcı ve ayarlayıcılara ( get/set)'e izin verdi.
- 2015'te: `Object.setPrototypeOf` ve `Object.getPrototypeOf` bir standart olarak eklendi. `__proto__` defakto şeklinde aslında her yerde kullanılmıştı, Bundan dolayı çokta kulllanılan özellikler olmadı, sadece tarayıcı harici çevrelerde kullanılır oldu.

Artık bunların hepsi bizim kullanımımızdadır.

<<<<<<< HEAD
Teknik olarak `[[Prototype]]`'ı istediğimiz an alma/ayarlama işi yapabiliriz. Fakat genelde bunu sadece obje yaratırken kullanır ve daha sonra düzenleme yapmayız: `rabbit`, `animal`dan kalıtım alır fakat onu değiştirmez. JavaScript motorları da bunu yüksek derecede optimize edebilir. Prototipi `Object.setPrototypeOf` veya `obj.__proto__` ile sonradan değiştirmek oldukça yavaş bir operasyondur. Ama mümkündür.

## "En basit" Objeler
=======
```warn header="Don't change `[[Prototype]]` on existing objects if speed matters"
Technically, we can get/set `[[Prototype]]` at any time. But usually we only set it once at the object creation time and don't modify it anymore: `rabbit` inherits from `animal`, and that is not going to change.

And JavaScript engines are highly optimized for this. Changing a prototype "on-the-fly" with `Object.setPrototypeOf` or `obj.__proto__=` is a very slow operation as it breaks internal optimizations for object property access operations. So avoid it unless you know what you're doing, or JavaScript speed totally doesn't matter for you.
```

## "Very plain" objects [#very-plain]
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b

Bildiğiniz gibi objeler anahtar/değer ikilisini tutan ilişkisel dizi şeklinde kullanılabilir.

...Eğer içerisinde *kullanıcı-kaynaklı*  anahtarlar ( örneğin kullanıcının girdiği sözlük tipi veriler) var ise, ilginç bir aksaklık meydana gelir: `"__proto_"` haricinde tüm anahtarlar doğru çalışır.

Örneğin:

```js run
let obj = {};

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // [object Object] olarak döner ,  "some value" değil!
```
Eğer kullanıcı tipleri `__proto__` içerisinde ise atama görmezden gelinir!

<<<<<<< HEAD
Bu aslında çok da sürpriz olmasa gerek. `__proto__` farklı bir özelliktir: Ya obje olur veya `null`,  mesela bir karakter dizisi prototip olamaz.
=======
Here, if the user types in `__proto__`, the assignment is ignored!

That shouldn't surprise us. The `__proto__` property is special: it must be either an object or `null`. A string can not become a prototype.
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b

Fakat buradaki amacımız böyle bir davranışı uygulamak değildi, değil mi? Biz key/value ikililerini kaydetmekti. `"__proto__"` anahtarı düzgün bir şekilde kaydedilmedi. Bundan dolayı bu bir bugdır. Burada etkisi berbat değildir fakat diğer durumlarda prototip gerçekten değişebilir ve çalışma tamamen istenmeyen bir sonuca varabilir.

<<<<<<< HEAD
Daha kötüsü -- genelde geliştiriciler böyle bir ihtimali düşünmezler bile. Bundan dolayı böyle bir bug'lar fark edilebilir ve saldırıya açık hale gelirler, özellikle JavaScript server tarafında kullanıldıysa.

Böyle bir olay sadece `__proto__`'da meydana gelir diğer tüm özellikler normalde "atanabilir"'dir.

Bu problemden nasıl kaçınılabilir?

Öncelikle `Map` kullanılabilir, herşey doğru çalışır.

Fakat burada bize `Obje` yardımcı olabilir, çünkü dili yaratıcılar bu konuları uzun zaman önce düşünmüşler.

`__proto__` objenin bir özelliği değildir. Fakat `Object.prototype`'a erişimsağlar( accessor ):

![](object-prototype-2.svg)

Bundan dolayı, Eğer `obj.__proto__` okunur veya atanırsa, ilgili alıcı/ayarlayıcı prototipten çağırılır, böylece `[[Prototoy]]` alınır/ayarlanır.
=======
Here the consequences are not terrible. But in other cases we may be assigning object values, and then the prototype may indeed be changed. As a result, the execution will go wrong in totally unexpected ways.

What's worse -- usually developers do not think about such possibility at all. That makes such bugs hard to notice and even turn them into vulnerabilities, especially when JavaScript is used on server-side.

Unexpected things also may happen when assigning to `toString`, which is a function by default, and to other built-in methods.

How can we avoid this problem?

First, we can just switch to using `Map` for storage instead of plain objects, then everything's fine.

But `Object` can also serve us well here, because language creators gave thought to that problem long ago.

`__proto__` is not a property of an object, but an accessor property of `Object.prototype`:

![](object-prototype-2.svg)
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b

Başlangıçta `__proto__` , `[[Prototype]]`a erişmek için bir yol olarak tanımlanmıştır, `[[Prototype]]` değil.

<<<<<<< HEAD
Eğer, eğer objeyi ilişkisel dizi olarak kullanmak istiyorsanız şu şekilde yapabilirsiniz:
=======
As it was said in the beginning of this tutorial section: `__proto__` is a way to access `[[Prototype]]`, it is not `[[Prototype]]` itself.

Now, if we intend to use an object as an associative array and be free of such problems, we can do it with a little trick:
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b

```js run
*!*
let obj = Object.create(null);
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
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b

Bu objelerin kötü tarafı ise, içinde hiç bir varsayılan metod bulunmaz, Örneğin: `toString`:

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

>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b

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
=======
Modern methods to set up and directly access the prototype are:

- [Object.create(proto, [descriptors])](mdn:js/Object/create) -- creates an empty object with a given `proto` as `[[Prototype]]` (can be `null`) and optional property descriptors.
- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- returns the `[[Prototype]]` of `obj` (same as `__proto__` getter).
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto` (same as `__proto__` setter).

The built-in `__proto__` getter/setter is unsafe if we'd want to put user-generated keys into an object. Just because a user may enter `"__proto__"` as the key, and there'll be an error, with hopefully light, but generally unpredictable consequences.
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b

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

Kalıtımsal özellikleri bu şekilde filtreleyebilir veya başka birşey yapabiliriz:

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


Zincire bakarsanız `rabbit.hasOwnProperty` nereden geliyor görebilirsiniz. `Object.prototype.hasOwnPropery`, diğer bir deyişle kalıtılmış.

... Fakat öyleyse neden `for..in` içerisinde görünmüyor. Halbuki `for..in` ile kalıtılmış tüm özelliklerin listeleneceğini söylemiştik. Aslında cevap basit, bu döngüye alınamaz. Tıpkı diğer `Object.prototype`'larda olduğu gibi. Bundan dolayı listelenmemiştir.

## Özet
Bu bölümde anlatılanların üzerinden kısaca geçecek olursak:

<<<<<<< HEAD
- [Object.create(proto[, descriptors])](mdn:js/Object/create) -- verilen `proto` ile yeni bir obje yaratır, ayrıca opsiyonel olarak özellik tanımlıyıcılar verilebilir.
- [Object.getPrototypeOf(obj)](mdn:js/Object.getPrototypeOf) -- `obj`'nin `[[Prototype]]`ını döner ( `__proto__` alıcısı ( getter ) ile aynı işi yapar)).
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object.setPrototypeOf) -- `obj`'nin `[[Prototype]]`'ını verilen `proto`'ya ayarlar. ( `__proto__` ayarlayıcısı ( setter) ile aynı işi yapar)
- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- döngülenebilir karakter dizisi/ değerler/ anahtar-değer ikilisi dizisi döner.
- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- tüm sembolik özelliklerin dizisini döner.
- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- özelliklerin tüm karakter dizisi isimlerini dizi olarak döner.
- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) -- tüm özelliklerin isimlerini dizi olarak döner.
- [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): Eğer `obj` kalıtılmış değilse ve `key` adında bir özelliği varsa `true` döner.


Şunu da belirtmiş olalım `__proto__` `[[Prototype]]` için alıcı/ayarlayıcıdır. Bu `Object.prototype` içerisinde yer alır, tıpkı diğer metodlar gibi.

Prototip olmadan bir objeyi `Object.create(null)` şeklinde yaratmak mümkündür. Bu tür objeler "saf dictionary yapısı" olarak kullanılır. `"__proto__"` anahtarı ile bir problemi bulunmamaktadır.

Obje özelliklerini döndüren ( `Object.keys` ve diğerleri ) -- "kendi" özelliklerini döndürür. Eğer kalıtılmış olanlarını da istersek `for..in` kullanabiliriz.
=======
We also made it clear that `__proto__` is a getter/setter for `[[Prototype]]` and resides in `Object.prototype`, just like other methods.

We can create an object without a prototype by `Object.create(null)`. Such objects are used as "pure dictionaries", they have no issues with `"__proto__"` as the key.

Other methods:

- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- returns an array of enumerable own string property names/values/key-value pairs.
- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- returns an array of all own symbolic keys.
- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- returns an array of all own string keys.
- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) -- returns an array of all own keys.
- [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): returns `true` if `obj` has its own (not inherited) key named `key`.

All methods that return object properties (like `Object.keys` and others) -- return "own" properties. If we want inherited ones, we can use `for..in`.
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b
