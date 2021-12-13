Cevap iki parçadan oluşmaktadır

Birinci bölüm, kolay olan kalıtım yapan sınıf yapıcı metodda `super()`'i çağırmalıdır. Diğer türlü `"this"` "tanımsız" olacaktır.

Çözümü şu şekildedir:

```js run
class Rabbit extends Object {
  constructor(name) {
*!*
    super(); // kalıtım yapıldığında üst sınıf çağırılmalıdır.
*/!*
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // true
```
Fakat henüz bitmedi.

Bu problem düzeltildikten sonra bile, `"class Rabbit extends Object"` ile `class Rabbit` arasında önemli bir fark vardır.

Bildiğiniz gibi "extends" yazımı iki prototip kurar:


<<<<<<< HEAD:1-js/09-classes/02-class-inheritance/3-class-extend-object/solution.md
1. Yapıcı fonksiyonların `"prototype"` ları arasında ( metodlar için )
2. Yapıcı fonksiyonların kendileri arasında ( statik metodlar için ) 
=======
1. Between `"prototype"` of the constructor functions (for methods).
2. Between the constructor functions themselves (for static methods).
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269:1-js/09-classes/03-static-properties-methods/3-class-extend-object/solution.md

Bizim durumumuzda `class Rabbit extends Object`:

```js run
class Rabbit extends Object {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) true
```
anlamına gelir.

`Object`'in statik metodlarına `Rabbit` ile şu şekilde erişebiliriz:

```js run
class Rabbit extends Object {}

*!*
// normlade Object.getOwnPropertyNames'i çağırırız.
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b
*/!*
```
Eğer `extends` kullanılmaz ise `class Rabbit` ikinci referansı alamaz.

Aşağıdaki ile karşılaştırabilirsiniz:

```js run
class Rabbit {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) false (!)

*!*
// hata, Rabbit diye bir fonksiyon bulunmamaktadır.
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Hata
*/!*
```

Basit `class Rabbit` için `Rabbit` fonksiyonu aynı prototipe sahiptir.

```js run
class Rabbit {}

// (2) yerine kullanılır. Rabbit için doğrudur. (diğer fonksiyonlar için de)
alert( Rabbit.__proto__ === Function.prototype );
```
Bu arada `Function.prototype`'ın "generic" fonksiyonları bulunmaktadır. Bunlar, `call`, `bind` vs gibi metodlardır. Her iki durumda da bunlar mevcuttur çünkü `Object` yapısında varsayılan olarak bulunmaktadır. `Object.__proto__ === Function.prototype` 

Son tahlilde görüntü şu şekildedir:

![](rabbit-extends-object.svg)

Özetlersek:

| class Rabbit | class Rabbit extends Object  |
|--------------|------------------------------|
| --             | yapıcı metodda `super()` çağırılmalıdır. |
| `Rabbit.__proto__ === Function.prototype` | `Rabbit.__proto__ === Object` |
