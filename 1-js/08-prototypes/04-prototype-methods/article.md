
# Metodlar ve prototipler

Bu bölümde prototipler ile çalışmak için ek metodlardan bahsedeceğiz

Bizim bildiğimizin haricinde prototipi ayarlamak ve almak için başka yöntemler de bulunmaktadır:

- [Object.create(proto[, descriptors])](mdn:js/Object/create) -- verilen `proto`'yu `[[Prototype]]` şeklinde alarak ve opsiyonel tanımlayıcı özelliği kullanarak boş bir obje oluşturur.
- [Object.getPrototypeOf(obj)](mdn:js/Object.getPrototypeOf) -- `obj`'nin `[[Prototype]]`'ını döndürür.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object.setPrototypeOf) -- `obj`'nin `[[Prototype]]`'ını `proto`'ya ayarlar.

[cut]

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
alert(Object.getPrototypeOf(rabbit) === animal); // rabbit'in prototipini alma
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
// Objenin yüzeysel klonu
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```
Bu tam olarak `obj`'nin aynısını verir. Tüm özellikler: dönülebilir veya dönülemez, veri özellikleri, alıcı ve ayarlayıcılar --  her şey, ayrıca doğru `[[Prototype]]` ile

## Tarihçe

`[[Prototype]]`'ı ayarlayabileceğimiz yöntemleri saymaya kalsak baya zorluk yaşarız. Çok fazla yöntem bulunmaktadır.

Neden?

Birçok nedeni bulunmaktadır.

- Yapıcının `"prototype"` özelliği ilk javascript ortaya çıktığından beri bulunmaktadır.
- 2012'de: `Object.create` bir standart olarak oturdu. Bu verilen prototip ile objeleri yaratmaya izin verdi. Fakat bunları almaya veya ayarlamaya değil. Bundan dolayı tarayıcılar bir standart olmayan `__proto__` erişimcilerini uygulayarak alıcı ve ayarlayıcılara ( get/set)'e izin verdi.
- 2015'te: `Object.setPrototypeOf` ve `Object.getPrototypeOf` bir standart olarak eklendi. `__proto__` defakto şeklinde aslında her yerde kullanılmıştı, Bundan dolayı çokta kulllanılan özellikler olmadı, sadece tarayıcı harici çevrelerde kullanılır oldu.

Artık bunların hepsi bizim kullanımımızdadır.

Teknik olarak `[[Prototype]]`'ı istediğimiz an alma/ayarlama işi yapabiliriz. Fakat genelde bunu sadece obje yaratırken kullanır ve daha sonra düzenleme yapmayız: `rabbit`, `animal`dan kalıtım alır fakat onu değiştirmez. JavaScript motorları da bunu yüksek derecede optimize edebilir. Prototipi `Object.setPrototypeOf` veya `obj.__proto__` ile sonradan değiştirmek oldukça yavaş bir operasyondur. Ama mümkündür.

## "En basit" Objeler

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

Bu aslında çok da sürpriz olmasa gerek. `__proto__` farklı bir özelliktir: Ya obje olur veya `null`,  mesela bir karakter dizisi prototip olamaz.

Fakat buradaki amacımız böyle bir davranışı uygulamak değildi, değil mi? Biz key/value ikililerini kaydetmekti. `"__proto__"` anahtarı düzgün bir şekilde kaydedilmedi. Bundan dolayı bu bir bugdır. Burada etkisi berbat değildir fakat diğer durumlarda prototip gerçekten değişebilir ve çalışma tamamen istenmeyen bir sonuca varabilir.

Daha kötüsü -- genelde geliştiriciler böyle bir ihtimali düşünmezler bile. Bundan dolayı böyle bir bug'lar fark edilebilir ve saldırıya açık hale gelirler, özellikle JavaScript server tarafında kullanıldıysa.

Böyle bir olay sadece `__proto__`'da meydana gelir diğer tüm özellikler normalde "atanabilir"'dir.

Bu problemden nasıl kaçınılabilir?

Öncelikle `Map` kullanılabilir, her şey doğru çalışır.

Fakat burada bize `Obje` yardımcı olabilir, çünkü dili yaratıcılar bu konuları uzun zaman önce düşünmüşler.

`__proto__` objenin bir özelliği değildir. Fakat `Object.prototype`'a erişim sağlar (accessor):

![](object-prototype-2.svg)

Bundan dolayı, Eğer `obj.__proto__` okunur veya atanırsa, ilgili alıcı/ayarlayıcı prototipten çağırılır, böylece `[[Prototoy]]` alınır/ayarlanır.

Başlangıçta `__proto__` , `[[Prototype]]`a erişmek için bir yol olarak tanımlanmıştır, `[[Prototype]]` değil.

Eğer, eğer objeyi ilişkisel dizi olarak kullanmak istiyorsanız şu şekilde yapabilirsiniz:

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

Böyle objelere "en basit" veya "saf sözlük objeleri" denir, Çünkü bunlar sıradan objelerden `{...}` bile daha basittirler.

Bu objelerin kötü tarafı ise, içinde hiçbir varsayılan metod bulunmaz, Örneğin: `toString`:

```js run
*!*
let obj = Object.create(null);
*/!*

alert(obj); // Error (no toString)
```
...Fakat bu genelce ilişkili diziler için problem oluşturmaz.

Çoğu obje-bağlantılı metodlar `Object.something(...)` şeklindedir ve Object.keys(obj) gibi olduğundan prototipte yer almazlar, bundan dolayı şu şekilde çalışmaya devam ederler:

```js run
let chineseDictionary = Object.create(null);
chineseDictionary.hello = "ni hao";
chineseDictionary.bye = "zai jian";

alert(Object.keys(chineseDictionary)); // hello,bye
```

## Tüm özellikleri alma

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