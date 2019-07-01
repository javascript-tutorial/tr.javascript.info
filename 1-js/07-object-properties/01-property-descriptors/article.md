
# Özellik bayrakları ve tanımlayıcılar

Objelerin özellikleri saklayabildiğini biliyorsunuz.

Şimdiye kadar özellik basit "anahtar-değer" ikilisiydi. Fakat objenin özelliği aslında bundan daha karmaşık ve daha farklılaştırılabilir özellikler taşımaktadır.

## Özellik Bayrakları

Obje özellikleri **`değer`** dışında, 3 özelliğe sahiptir ( bunlara "bayraklar" denir. )

- **`yazılabilir`** -- eğer `true` ise değiştirilebilir aksi halde sadece okunabilir.
- **`sayılabilir`** -- eğer `true` ise döngü içinde listelenmiştir, aksi halde listelenmemiştir.
- **`ayarlanabilir`** -- eğer `true` ise özellik silinebilir ve nitelikler ( attributes ) değiştirilebilir, diğer türlü değiştirilemez.

Bunları henüz görmediniz, genel olarak da zaten pek gösterilmezler. Bir özellik yarattığınızda "normal yolla" bu değerlerin tümü `true` olarak ayarlanır. Fakat biz bunları istediğimiz zaman değiştirebiliriz.

İlk önce bu bayraklar nasıl alınır buna bakalım:

[Object.getOwnPropertyDescriptor](mdn:js/Object/getOwnPropertyDescriptor) metodu bir özellik hakkındaki *tüm* bilgilerin sorgulanabilmesini sağlar.

Yazımı:
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

Yazımı:


```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`, `propertyName`
: Üzerinde çalışılacak obje ve özellik.

`descriptor`
: Uygulanacak özellik tanımlayıcı

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

`user.name`'i sadece okunabilir yapmak için `writable` bayrağının değiştirilmesi gerekir.

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
user.name = "Pete"; // Error: Salt okunur özelliğe değer atanamaz.
*/!*
```
Artık kimse kendi `defineProperty` metodunu yazmadıkça kullanıcının ismini değiştiremez. 

Aynı işlem bir `özellik` olmadığı durumda:

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
  value: "Pete",
  // yeni özellikler için neyin doğru olduğu  özellikle belirtilmelidir.
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // Pete
user.name = "Alice"; // Error
```


## Non-enumerable

Şimdi `user`'a `toString` metodu ekleyelim.

Normalde `toString` objeler için non-enumerable'dır yani for ile objenin özelliklerini dönerken görünmez. Fakat bu özellikği kendiniz eklerseniz `for..in` içeriisnde görünür. Şu şekilde:

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
Eğer beğenmiyorsanız, `enumerable:false`'u ayarlayabilirsiniz. Böylece `for..in` döngüsünün içerisinde normalde olduğu gibi görünmez olur:

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

Bir ayarlanamayan özellik silinemez veya `defineProperty` ile değiştirilemez.
Örneğin, `MATH.PI` hem sadece okunabilir, hem döngü içinde görünmez ( non-enumerable) hem de değiştirilemez:

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
Math.PI = 3; // Hatta

// delete Math.PI 'de çalışmayacaktır.
```
Bir özelliği değiştirilemez yapmak tek yönlü bir yoldu. Bunu geri çeviremeyiz çünkü `defineProperty` ayarlanamaz özellikler üzerinde çalışmaz.

Burada `user.name` tamamen mühürlü bir sabit yapılmaktadır:

```js run
let user = { };

Object.defineProperty(user, "name", {
  value: "John",
  writable: false,
  configurable: false
});

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
```

## Object.defineProperties

[Object.defineProperties(obj, descriptors)](mdn:js/Object/defineProperties) metodu birçok metodun tek bir seferde tanımlanmasını sağlar. 

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

Tüm özelliklerin tanımlarını bir defada almak için [Object.getOwnPropertyDescriptors(obj)](mdn:js/Object/getOwnPropertyDescriptors) metodunu kullanabilirsiniz.

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

Diğer bir fark ise `for..in` sembolik özellikleri görmezden gelir. Fakat `Object.getOwnPropertyDescriptors` *tüm* özellikleri, sembolik olanlar dahil, dönderir.

## Objeleri globalde kilitlemek

Özellik tanımları tekil özellikler seviyesinde çalışır.

Bunun ile birlikte *tüm* objeyi limitleyen metodlar bulunmaktadır:

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

Bu metodlar pratikte çok az kullanılır.
