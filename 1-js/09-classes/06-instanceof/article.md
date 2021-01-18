# Sınıf kontrolü: "instanceof"

`instanceof` operatörü bir objenin belirli bir sınıfa ait olup olmadığını kontrol eder. Kalıtımı da hesaba kadar.

<<<<<<< HEAD
Böyle bir kontrole bir çok durumda ihtiyacımız olabilir. Aşağıda *polymorphic* fonksiyon inşa etmek için, argümanların tipine göre farklı davranış sergileyen bir yapı yer almaktadır.
=======
Such a check may be necessary in many cases. For example, it can be used for building a *polymorphic* function, the one that treats arguments differently depending on their type.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

[cut]

## instanceof operatorü [#ref-instanceof]


Yazımı şu şekildedir:
```js
obj instanceof Class
```

<<<<<<< HEAD
Eğer `obj`'e `Class`'a aitse `true` döner. ( Veya `Class`'tan türüyorsa)
=======
It returns `true` if `obj` belongs to the `Class` or a class inheriting from it.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

Örneğin:

```js run
class Rabbit {}
let rabbit = new Rabbit();

// `Rabbit` sınıfının bir objesimidir?
*!*
alert( rabbit instanceof Rabbit ); // true
*/!*
```

Bu yapıcı fonksiyonlar için de çalışır:

```js run
*!*
// instead of class
function Rabbit() {}
*/!*

alert( new Rabbit() instanceof Rabbit ); // true
```

...`Array` gibi gömülü sınıflar için de

```js run
let arr = [1, 2, 3];
alert( arr instanceof Array ); // true
alert( arr instanceof Object ); // true
```

<<<<<<< HEAD
Dikkat edin `arr` ayrıca `Object` sınıfına da aittir. Çünkü `Array` prototipi `Object`'ten kalıtım alır.

`instanceof` operatörü prototip zincirini kontrol eder. `Symbol.hasInstance` statik metodu ile daha performanslı yapılabilir.
=======
Please note that `arr` also belongs to the `Object` class. That's because `Array` prototypically inherits from `Object`.

Normally, `instanceof` examines the prototype chain for the check. We can also set a custom logic in the static method `Symbol.hasInstance`.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

`obj instanceof Class` algoritması kabaca aşağıdaki gibi çalışır:

<<<<<<< HEAD
1. Eğer `Symbol.hasInstance` statik metodu var ise onu kullan. Şu şekilde:

    ```js run
    // canEat yapabilen herşeyi animal varsayalım.
=======
1. If there's a static method `Symbol.hasInstance`, then just call it: `Class[Symbol.hasInstance](obj)`. It should return either `true` or `false`, and we're done. That's how we can customize the behavior of `instanceof`.

    For example:

    ```js run
    // setup instanceOf check that assumes that
    // anything with canEat property is an animal
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
    class Animal {
      static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
      }
    }

    let obj = { canEat: true };
    alert(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) çağırıldı.
    ```

<<<<<<< HEAD
2. Çoğu sınıf `Symbol.hasInstance`'a sahip değildir. Bu durumda eğer `Class.prototype` `obj`'nin bir prototipine zincirde olup olmadığını kontrol eder.

    Diğer bir deyişle:
    ```js
    obj.__proto__ == Class.prototype
    obj.__proto__.__proto__ == Class.prototype
    obj.__proto__.__proto__.__proto__ == Class.prototype
=======
2. Most classes do not have `Symbol.hasInstance`. In that case, the standard logic is used: `obj instanceOf Class` checks whether `Class.prototype` is equal to one of the prototypes in the `obj` prototype chain.

    In other words, compare one after another:
    ```js
    obj.__proto__ === Class.prototype?
    obj.__proto__.__proto__ === Class.prototype?
    obj.__proto__.__proto__.__proto__ === Class.prototype?
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
    ...
    // if any answer is true, return true
    // otherwise, if we reached the end of the chain, return false
    ```

<<<<<<< HEAD
    Yukarıdaki örnekte `Rabbit.prototype == rabbit.__proto__`, cevabı doğrudan verir.
    
    Kalıtım yönünden ise `rabbit` üst sınıfın da instanceof'u dur.
    
=======
    In the example above `rabbit.__proto__ === Rabbit.prototype`, so that gives the answer immediately.

    In the case of an inheritance, the match will be at the second step:

>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
    ```js run
    class Animal {}
    class Rabbit extends Animal {}

    let rabbit = new Rabbit();
    *!*
    alert(rabbit instanceof Animal); // true
    */!*
<<<<<<< HEAD
    // rabbit.__proto__ == Rabbit.prototype
    // rabbit.__proto__.__proto__ == Animal.prototype (match!)
=======

    // rabbit.__proto__ === Rabbit.prototype
    *!*
    // rabbit.__proto__.__proto__ === Animal.prototype (match!)
    */!*
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
    ```

Aşağıda `rabbit instanceof Animal`'ın `Animal.prototype`a karşılaştırılması gösterilmiştir.

![](instanceof.svg)

Ayrıca [objA.isPrototypeOf(objB)](mdn:js/object/isPrototypeOf) metodu ile eğer `objA` `objB`'nin prototip zincirinin herhangi bir yerindeyse `true` döner. `obj instanceof Class` şu şekilde de yazılabilir `Class.prototype.isPrototypeOf(obj)`

<<<<<<< HEAD
`Class` yapıcısının kendisi bu kontrolde yer almaz, garip değil mi? Sadece `Class.prototype` ve prototiplerin zinciri önemlidir.

Bu `prototip` değiştiğinde farklı sonuçlara yol açabilir.

Aşağıdaki gibi:
=======
It's funny, but the `Class` constructor itself does not participate in the check! Only the chain of prototypes and `Class.prototype` matters.

That can lead to interesting consequences when a `prototype` property is changed after the object is created.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311


```js run
function Rabbit() {}
let rabbit = new Rabbit();

// prototip değişti
Rabbit.prototype = {};

// ...artık rabbit değil!
*!*
alert( rabbit instanceof Rabbit ); // false
*/!*
```

<<<<<<< HEAD
Prototip'i değiştirmemeniz ve daha güvenli tutmanız için bir diğer neden daha olmuş oldu. 

## Bonus: Tip için Object toString
=======
## Bonus: Object.prototype.toString for the type
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

Bildiğiniz gibi basit objeler karakter dizisine `[object Object]` şeklinde çevrilir.

```js run
let obj = {};

alert(obj); // [object Object]
alert(obj.toString()); // the same
```
Bu `toString`'i bu şekilde tanımlamalarından dolayıdır. Fakat görünenden daha güçlü bir `toString` yazmak için gizli özellikler bulunmaktadır. Bunu `typeof`'un daha genişi ve `instanceof`'un alternatifi olarak görmek mümkün.

Garip geliyor değilmi. Bakalım neymiş

[Şartname](https://tc39.github.io/ecma262/#sec-object.prototype.tostring), incelendiğinde gömülü gelen `toString` metodunun objeden çıkarılabileceği ve başka bir değerin kaynağında çalıştırabileceği görülmektedir. Sonucu da bu değere göre gelir.

- Sayı için `[object Number]`
- Boolean değerler için `[object Boolean]`
- `null` için: `[object Null]`
- `undefined` için: `[object Undefined]`
- Diziler için: `[object Array]`
- ...vs (düzenlenebilir).

Bir örnekle gösterelim:

```js run
// kolaylık olması için `toString` metodunu bir değişkene kopyalayalım
let objectToString = Object.prototype.toString;

// Bu hangi tipte?
let arr = [];

alert( objectToString.call(arr) ); // [object *!*Array*/!*]
```
Burada [call](mdn:js/function/call)'i kullandık ve [](info:call-apply-decorators) bölümünde `objectToString` fonksiyonunun nasıl `this=arr` kaynağında kullanılacağı gösterilmişti.

Dahili olarak `toString` algoritması `this`'i kontrol eder ve buna denk gelen sonucu döner. Örneğin:

```js run
let s = Object.prototype.toString;

alert( s.call(123) ); // [object Number]
alert( s.call(null) ); // [object Null]
alert( s.call(alert) ); // [object Function]
```

### Symbol.toStringTag

Objenin `toString` metodu özel bir özellikle `Symbol.toStringTag` düzenlenebilir.

Örneğin:

```js run
let user = {
  [Symbol.toStringTag]: 'User'
};

alert( {}.toString.call(user) ); // [object User]
```

<<<<<<< HEAD
Çoğu çevre-özel objelerde böyle özellikler bulunur. Aşağıda tarayıcı tabanlılar yer almaktadır:

```js run
// Çevre-özel objeler ve sınıflar için toStringTag 
alert( window[Symbol.toStringTag]); // window
=======
For most environment-specific objects, there is such a property. Here are some browser specific examples:

```js run
// toStringTag for the environment-specific object and class:
alert( window[Symbol.toStringTag]); // Window
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

alert( {}.toString.call(window) ); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
```
Gördüğünüz gibi, sonuç kesinlikle `Symbol.toStringTag`'dır ve varsa `[object ...]` içerisinde saklanır.

<<<<<<< HEAD
Sonunda daha güçlü bir typeof'a sahip olduk. Artık sadece ilkel datalar için değil, gömülü gelen objeler için bile çalışabilir durumdadır.
=======
As you can see, the result is exactly `Symbol.toStringTag` (if exists), wrapped into `[object ...]`.

At the end we have "typeof on steroids" that not only works for primitive data types, but also for built-in objects and even can be customized.

We can use `{}.toString.call` instead of `instanceof` for built-in objects when we want to get the type as a string rather than just to check.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

Gömülü gelen objeler için tipi karakter dizi olarak almak istediğimizde `instanceof` yerine bunu kullanabiliriz. Instanceof sadece kontrol işlemi yapmaktaydı.

<<<<<<< HEAD
## Özet
Bildiğimiz tip kontrol metodlarının üzerinden geçecek olursak:
=======
Let's summarize the type-checking methods that we know:
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

|               | çalışır   |  döner      |
|---------------|-------------|---------------|
| `typeof`      | ilkellerde  |  string       |
| `{}.toString` | ilkellerde, gömülü ve `Symbol.toStringTag`'li objelerde   |       string |
| `instanceof`  | objelerde     |  true/false   |

Gördüğünüz gibi `{}.toString` teknik olarak "en gelişmiş" `typeof`'tur denebilir.

`instanceof` operatörü sınıf hiyerarşilerileri ve bu hiyerarşiyi göz önüne alacak sınıf için bulunmaz bir kaynaktır.
