
# Özellik bayrakları ve tanımlayıcılar

Objelerin özellikleri saklayabildiğini biliyorsunuz.

<<<<<<< HEAD
Şimdiye kadar özellik basit "anahtar-değer" ikilisiydi. Fakat objenin özelliği aslında bundan daha karmaşık ve daha farklılaştırılabilir özellikler taşımaktadır.
=======
Until now, a property was a simple "key-value" pair to us. But an object property is actually a more flexible and powerful thing.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Özellik Bayrakları

Obje özellikleri **`değer`** dışında, 3 özelliğe sahiptir ( bunlara "bayraklar" denir. )

- **`yazılabilir`** -- eğer `true` ise değiştirilebilir aksi halde sadece okunabilir.
- **`sayılabilir`** -- eğer `true` ise döngü içinde listelenmiştir, aksi halde listelenmemiştir.
- **`ayarlanabilir`** -- eğer `true` ise özellik silinebilir ve nitelikler ( attributes ) değiştirilebilir, diğer türlü değiştirilemez.

<<<<<<< HEAD
Bunları henüz görmediniz, genel olarak da zaten pek gösterilmezler. Bir özellik yarattığınızda "normal yolla" bu değerlerin tümü `true` olarak ayarlanır. Fakat biz bunları istediğimiz zaman değiştirebiliriz.
=======
- **`writable`** -- if `true`, the value can be changed, otherwise it's read-only.
- **`enumerable`** -- if `true`, then listed in loops, otherwise not listed.
- **`configurable`** -- if `true`, the property can be deleted and these attributes can be modified, otherwise not.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

İlk önce bu bayraklar nasıl alınır buna bakalım:

[Object.getOwnPropertyDescriptor](mdn:js/Object/getOwnPropertyDescriptor) metodu bir özellik hakkındaki *tüm* bilgilerin sorgulanabilmesini sağlar.

<<<<<<< HEAD
Yazımı:
=======
The method [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) allows to query the *full* information about a property.

The syntax is:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: Bilgi alınacak obje

`propertyName`
: Özelliğin ismi

Buradan dönen bir değer döner buna "özellik tanımlayıcısı" denir. Bu obje tüm bayrak bilgilerini içerir.

Örneğin:

```js run
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* property descriptor:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```
Bayrakları değiştirmek için [Object.defineProperty](mdn:js/Object/defineProperty) kullanılabilir.

<<<<<<< HEAD
Yazımı:
=======
To change the flags, we can use [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3


```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`, `propertyName`
<<<<<<< HEAD
: Üzerinde çalışılacak obje ve özellik.

`descriptor`
: Uygulanacak özellik tanımlayıcı
=======
: The object and its property to apply the descriptor.

`descriptor`
: Property descriptor object to apply.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Eğer özellik var ise `defineProperty` bu özelliğin bayraklarını günceller. Diğer türlü, bu özelliği yaratır ve verilen bayrakları ayarlar. Bu durumda eğer bayrak verilmemiş ise `false` kabul edilir.

Örneğin, aşağıda tüm bayrakları `false` olarak tanımlanmış bir `name` özelliğini görmektesiniz.

```js run
let user = {};

*!*
Object.defineProperty(user, "name", {
  value: "John"
});
*/!*

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
*!*
  "writable": false,
  "enumerable": false,
  "configurable": false
*/!*
}
 */
```
Bunu "normal yoll" yaratılmış `user.name` ile karşılaştırdığınızda tüm bayrakların `false` olduğunu görebilirsiniz. Eğer bizim istediğimiz bu değilse bunları `true` yapmakta fayda var.

Şimdi bu bayrakların etkilerini inceleyebiliriz.

## Salt Oku

<<<<<<< HEAD
`user.name`'i sadece okunabilir yapmak için `writable` bayrağının değiştirilmesi gerekir.
=======
## Non-writable

Let's make `user.name` non-writable (can't be reassigned) by changing `writable` flag:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
*!*
  writable: false
*/!*
});

*!*
<<<<<<< HEAD
user.name = "Pete"; // Error: Salt okunur özelliğe değer atanamaz.
=======
user.name = "Pete"; // Error: Cannot assign to read only property 'name'
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
*/!*
```
Artık kimse kendi `defineProperty` metodunu yazmadıkça kullanıcının ismini değiştiremez. 

<<<<<<< HEAD
Aynı işlem bir `özellik` olmadığı durumda:
=======
Now no one can change the name of our user, unless they apply their own `defineProperty` to override ours.

```smart header="Errors appear only in strict mode"
In non-strict mode, no errors occur when writing to non-writable properties and such. But the operation still won't succeed. Flag-violating actions are just silently ignored in non-strict.
```

Here's the same example, but the property is created from scratch:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
<<<<<<< HEAD
  value: "Pete",
  // yeni özellikler için neyin doğru olduğu  özellikle belirtilmelidir.
=======
  value: "John",
  // for new properties we need to explicitly list what's true
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // John
user.name = "Pete"; // Error
```

## Non-enumerable

Şimdi `user`'a `toString` metodu ekleyelim.

<<<<<<< HEAD
Normalde `toString` objeler için non-enumerable'dır yani for ile objenin özelliklerini dönerken görünmez. Fakat bu özellikği kendiniz eklerseniz `for..in` içeriisnde görünür. Şu şekilde:
=======
Normally, a built-in `toString` for objects is non-enumerable, it does not show up in `for..in`. But if we add a `toString` of our own, then by default it shows up in `for..in`, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

// Varsayılan olarak, var olan özelliklerimiz görünecektir. 
for(let key in user) alert(key); // name, toString
```
<<<<<<< HEAD
Eğer beğenmiyorsanız, `enumerable:false`'u ayarlayabilirsiniz. Böylece `for..in` döngüsünün içerisinde normalde olduğu gibi görünmez olur:
=======

If we don't like it, then we can set `enumerable:false`. Then it won't appear in a `for..in` loop, just like the built-in one:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

Object.defineProperty(user, "toString", {
*!*
  enumerable: false
*/!*
});

*!*
// Artık toString görünmeyecektir:
*/!*
for(let key in user) alert(key); // name
```
Non-enumerable özellikler de `Object.keys`'den çıkarılacaktır:

```js
alert(Object.keys(user)); // name
```

## Non-configurable ( Ayarlanamaz )

`configurable:false` bayrağı bazen varsayılan objeler ve özellikler için standart olarak gelir.

<<<<<<< HEAD
Bir ayarlanamayan özellik silinemez veya `defineProperty` ile değiştirilemez.
Örneğin, `MATH.PI` hem sadece okunabilir, hem döngü içinde görünmez ( non-enumerable) hem de değiştirilemez:
=======
A non-configurable property can't be deleted, its attributes can't be modified.

For instance, `Math.PI` is non-writable, non-enumerable and non-configurable:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/
```
Öyleyse, `Math.PI` hem değiştirilemez hem de üzerine yazılamaz.

```js run
<<<<<<< HEAD
Math.PI = 3; // Hatta
=======
Math.PI = 3; // Error, because it has writable: false
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

// delete Math.PI 'de çalışmayacaktır.
```
Bir özelliği değiştirilemez yapmak tek yönlü bir yoldu. Bunu geri çeviremeyiz çünkü `defineProperty` ayarlanamaz özellikler üzerinde çalışmaz.

<<<<<<< HEAD
Burada `user.name` tamamen mühürlü bir sabit yapılmaktadır:
=======
We also can't change `Math.PI` to be `writable` again:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
// Error, because of configurable: false
Object.defineProperty(Math, "PI", { writable: true });
```

There's absolutely nothing we can do with `Math.PI`.

Making a property non-configurable is a one-way road. We cannot change it back with `defineProperty`.

**Please note: `configurable: false` prevents changes of property flags and its deletion, while allowing to change its value.**

Here `user.name` is non-configurable, but we can still change it (as it's writable):

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Pete"; // works fine
delete user.name; // Error
```

And here we make `user.name` a "forever sealed" constant, just like the built-in `Math.PI`:

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});

<<<<<<< HEAD
*!*
// user.name veya bayrağı değiştirilemez. 
// hiçbiri çalışmayacaktır:
//   user.name = "Pete"
//   delete user.name
//   defineProperty(user, "name", ...)
Object.defineProperty(user, "name", {writable: true}); // Error
*/!*
```

```smart header="Hatalar sadece use strict ile görünür."
Sıkı olmayan modda, sadece okunabilir özelliklerin üzerine yazarsanız bir hata görmezsiniz. Fakat yine de işleminiz başarılı olmaz. Yapmamanız gereken bir aksiyonda sadece görmezden gelinir.
=======
// won't be able to change user.name or its flags
// all this won't work:
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", { value: "Pete" });
```

```smart header="The only attribute change possible: writable true -> false"
There's a minor exception about changing flags.

We can change `writable: true` to `false` for a non-configurable property, thus preventing its value modification (to add another layer of protection). Not the other way around though.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Object.defineProperties

<<<<<<< HEAD
[Object.defineProperties(obj, descriptors)](mdn:js/Object/defineProperties) metodu birçok metodun tek bir seferde tanımlanmasını sağlar. 
=======
There's a method [Object.defineProperties(obj, descriptors)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) that allows to define many properties at once.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Yazımı:

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```
Örneğin:

```js
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```
Öyleyse, birçok özelliği tek bir seferde tanımlayabiliriz.

## Object.getOwnPropertyDescriptors

<<<<<<< HEAD
Tüm özelliklerin tanımlarını bir defada almak için [Object.getOwnPropertyDescriptors(obj)](mdn:js/Object/getOwnPropertyDescriptors) metodunu kullanabilirsiniz.
=======
To get all property descriptors at once, we can use the method [Object.getOwnPropertyDescriptors(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

`Object.defineProperties` ile birlikte "bayrak-farkında" olacak şekilde objenin klonlanması için kullanılabilir:

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```
Normalde obje klonlandığında, atama ile özellikler aşağıdaki gibi kopyalanmalıdır:

```js
for(let key in user) {
  clone[key] = user[key]
}
```

...Fakat bu bayrakları kopyalamaz. Eğer "daha iyi" bir klon istenirse `Object.defineProperties` tercih edilmelidir.

<<<<<<< HEAD
Diğer bir fark ise `for..in` sembolik özellikleri görmezden gelir. Fakat `Object.getOwnPropertyDescriptors` *tüm* özellikleri, sembolik olanlar dahil, dönderir.
=======
Another difference is that `for..in` ignores symbolic and non-enumerable properties, but `Object.getOwnPropertyDescriptors` returns *all* property descriptors including symbolic and non-enumerable ones.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Objeleri globalde kilitlemek

Özellik tanımları tekil özellikler seviyesinde çalışır.

Bunun ile birlikte *tüm* objeyi limitleyen metodlar bulunmaktadır:

<<<<<<< HEAD
[Object.preventExtensions(obj)](mdn:js/Object/preventExtensions)
: Objeye özelliklerin eklenmesini engeller.

[Object.seal(obj)](mdn:js/Object/seal)
: Özellikleri ekleme ve silmeyi engeller. Var olan tüm özellikler için `configurable: false` olarak ayarlar.

[Object.freeze(obj)](mdn:js/Object/freeze)
: Özellikerin eklenmesini, silinmesini ve değiştirilmesini engeller, var olan tüm özellikler için `configurable:false, writable:false` ayarlanır.

Bunlar için testsler vardır:

[Object.isExtensible(obj)](mdn:js/Object/isExtensible)
: Eğer özellik engellenmiş ise `false` aksi halde `true` dönderilir.

[Object.isSealed(obj)](mdn:js/Object/isSealed)
: Eğer özellik ekleme/silme engellenmiş ise `true`, tüm var olan özellikler `configurable: false`'e sahipse.

[Object.isFrozen(obj)](mdn:js/Object/isFrozen)
: Eüer özellik ekleme/silme/değiştirme engellenmiş ve tüm özellikler `configurable:false, writable:false` ise `true` döndür.
=======
[Object.preventExtensions(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
: Forbids the addition of new properties to the object.

[Object.seal(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
: Forbids adding/removing of properties. Sets `configurable: false` for all existing properties.

[Object.freeze(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
: Forbids adding/removing/changing of properties. Sets `configurable: false, writable: false` for all existing properties.

And also there are tests for them:

[Object.isExtensible(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
: Returns `false` if adding properties is forbidden, otherwise `true`.

[Object.isSealed(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
: Returns `true` if adding/removing properties is forbidden, and all existing properties have `configurable: false`.

[Object.isFrozen(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
: Returns `true` if adding/removing/changing properties is forbidden, and all current properties are `configurable: false, writable: false`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Bu metodlar pratikte çok az kullanılır.
