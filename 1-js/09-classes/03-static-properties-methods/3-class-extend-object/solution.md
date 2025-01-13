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

<<<<<<< HEAD:1-js/09-classes/02-class-inheritance/3-class-extend-object/solution.md
Bildiğiniz gibi "extends" yazımı iki prototip kurar:
=======
Even after the fix, there's still an important difference between `"class Rabbit extends Object"` and `class Rabbit`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/09-classes/03-static-properties-methods/3-class-extend-object/solution.md


<<<<<<< HEAD:1-js/09-classes/02-class-inheritance/3-class-extend-object/solution.md
1. Yapıcı fonksiyonların `"prototype"` ları arasında ( metodlar için )
2. Yapıcı fonksiyonların kendileri arasında ( statik metodlar için ) 

Bizim durumumuzda `class Rabbit extends Object`:
=======
1. Between `"prototype"` of the constructor functions (for methods).
2. Between the constructor functions themselves (for static methods).

In the case of `class Rabbit extends Object` it means:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/09-classes/03-static-properties-methods/3-class-extend-object/solution.md

```js run
class Rabbit extends Object {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) true
```
anlamına gelir.

<<<<<<< HEAD:1-js/09-classes/02-class-inheritance/3-class-extend-object/solution.md
`Object`'in statik metodlarına `Rabbit` ile şu şekilde erişebiliriz:
=======
So `Rabbit` now provides access to the static methods of `Object` via `Rabbit`, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/09-classes/03-static-properties-methods/3-class-extend-object/solution.md

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

<<<<<<< HEAD:1-js/09-classes/02-class-inheritance/3-class-extend-object/solution.md
```js run
class Rabbit {}
=======
By the way, `Function.prototype` also has "generic" function methods, like `call`, `bind` etc. They are ultimately available in both cases, because for the built-in `Object` constructor, `Object.__proto__ === Function.prototype`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/09-classes/03-static-properties-methods/3-class-extend-object/solution.md

// (2) yerine kullanılır. Rabbit için doğrudur. (diğer fonksiyonlar için de)
alert( Rabbit.__proto__ === Function.prototype );
```
Bu arada `Function.prototype`'ın "generic" fonksiyonları bulunmaktadır. Bunlar, `call`, `bind` vs gibi metodlardır. Her iki durumda da bunlar mevcuttur çünkü `Object` yapısında varsayılan olarak bulunmaktadır. `Object.__proto__ === Function.prototype` 

<<<<<<< HEAD:1-js/09-classes/02-class-inheritance/3-class-extend-object/solution.md
Son tahlilde görüntü şu şekildedir:
=======
![](rabbit-extends-object.svg)
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/09-classes/03-static-properties-methods/3-class-extend-object/solution.md

![](rabbit-extends-object.svg)

Özetlersek:

| class Rabbit | class Rabbit extends Object  |
|--------------|------------------------------|
| --             | yapıcı metodda `super()` çağırılmalıdır. |
| `Rabbit.__proto__ === Function.prototype` | `Rabbit.__proto__ === Object` |
