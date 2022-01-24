# Sınıf kontrolü: "instanceof"

`instanceof` operatörü bir objenin belirli bir sınıfa ait olup olmadığını kontrol eder. Kalıtımı da hesaba kadar.

Böyle bir kontrole birçok durumda ihtiyacımız olabilir. Aşağıda *polymorphic* fonksiyon inşa etmek için, argümanların tipine göre farklı davranış sergileyen bir yapı yer almaktadır.

[cut]

## instanceof operatorü [#ref-instanceof]


Yazımı şu şekildedir:
```js
obj instanceof Class
```

Eğer `obj`'e `Class`'a aitse `true` döner. ( Veya `Class`'tan türüyorsa)

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

Dikkat edin `arr` ayrıca `Object` sınıfına da aittir. Çünkü `Array` prototipi `Object`'ten kalıtım alır.

`instanceof` operatörü prototip zincirini kontrol eder. `Symbol.hasInstance` statik metodu ile daha performanslı yapılabilir.

`obj instanceof Class` algoritması kabaca aşağıdaki gibi çalışır:

1. Eğer `Symbol.hasInstance` statik metodu var ise onu kullan. Şu şekilde:

    ```js run
    // canEat yapabilen her şeyi animal varsayalım.
    class Animal {
      static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
      }
    }

    let obj = { canEat: true };
    alert(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) çağırıldı.
    ```

2. Çoğu sınıf `Symbol.hasInstance`'a sahip değildir. Bu durumda eğer `Class.prototype` `obj`'nin bir prototipine zincirde olup olmadığını kontrol eder.

    Diğer bir deyişle:
    ```js
    obj.__proto__ == Class.prototype
    obj.__proto__.__proto__ == Class.prototype
    obj.__proto__.__proto__.__proto__ == Class.prototype
    ...
    ```

    Yukarıdaki örnekte `Rabbit.prototype == rabbit.__proto__`, cevabı doğrudan verir.
    
    Kalıtım yönünden ise `rabbit` üst sınıfın da instanceof'u dur.
    
    ```js run
    class Animal {}
    class Rabbit extends Animal {}

    let rabbit = new Rabbit();
    *!*
    alert(rabbit instanceof Animal); // true
    */!*
    // rabbit.__proto__ == Rabbit.prototype
    // rabbit.__proto__.__proto__ == Animal.prototype (match!)
    ```

Aşağıda `rabbit instanceof Animal`'ın `Animal.prototype`a karşılaştırılması gösterilmiştir.

![](instanceof.svg)

Ayrıca [objA.isPrototypeOf(objB)](mdn:js/object/isPrototypeOf) metodu ile eğer `objA` `objB`'nin prototip zincirinin herhangi bir yerindeyse `true` döner. `obj instanceof Class` şu şekilde de yazılabilir `Class.prototype.isPrototypeOf(obj)`

`Class` yapıcısının kendisi bu kontrolde yer almaz, garip değil mi? Sadece `Class.prototype` ve prototiplerin zinciri önemlidir.

Bu `prototip` değiştiğinde farklı sonuçlara yol açabilir.

Aşağıdaki gibi:


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

Prototip'i değiştirmemeniz ve daha güvenli tutmanız için bir diğer neden daha olmuş oldu. 

## Bonus: Tip için Object toString

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

alert( objectToString.call(arr) ); // [object Array]
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

Çoğu çevre-özel objelerde böyle özellikler bulunur. Aşağıda tarayıcı tabanlılar yer almaktadır:

```js run
// Çevre-özel objeler ve sınıflar için toStringTag 
alert( window[Symbol.toStringTag]); // window
alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

alert( {}.toString.call(window) ); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
```
Gördüğünüz gibi, sonuç kesinlikle `Symbol.toStringTag`'dır ve varsa `[object ...]` içerisinde saklanır.

Sonunda daha güçlü bir typeof'a sahip olduk. Artık sadece ilkel datalar için değil, gömülü gelen objeler için bile çalışabilir durumdadır.

Gömülü gelen objeler için tipi karakter dizi olarak almak istediğimizde `instanceof` yerine bunu kullanabiliriz. Instanceof sadece kontrol işlemi yapmaktaydı.

## Özet
Bildiğimiz tip kontrol metodlarının üzerinden geçecek olursak:

|               | çalışır   |  döner      |
|---------------|-------------|---------------|
| `typeof`      | ilkellerde  |  string       |
| `{}.toString` | ilkellerde, gömülü ve `Symbol.toStringTag`'li objelerde   |       string |
| `instanceof`  | objelerde     |  true/false   |

Gördüğünüz gibi `{}.toString` teknik olarak "en gelişmiş" `typeof`'tur denebilir.

`instanceof` operatörü sınıf hiyerarşilerileri ve bu hiyerarşiyi göz önüne alacak sınıf için bulunmaz bir kaynaktır.
