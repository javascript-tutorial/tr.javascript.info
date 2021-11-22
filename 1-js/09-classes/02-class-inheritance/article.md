# Sınıf kalıtımı, super

Sınıflar başka sınıfları genişletebilirler. Bunun için prototip kalıtımı tabanlı güzel bir yazılışı bulunmaktadır.

Diğer bir sınıftan kalıtım sağlamak için `"extends"` ile belirtmek gerekmektedir. 

[cut]

Aşağıda `Animal`'dan kalıtım alan `Rabbit` sınıfı gösterilmektedir:

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    alert(`${this.name} stopped.`);
  }

}

*!*
// Inherit from Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}
*/!*

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!
```

`extends` kelimesi aslında  `Rabbit.prototype`'dan referans alıp bunun  `[[Prototype]]`'ını `Animal.prototype`'a ekler. Aynen daha önce de gördüğümüz gibi.

![](animal-rabbit-extends.svg)

Artık `rabbit` hem kendi metodlarına hem de `Animal` metodlarına erişebilir.

````smart header="`extends`'ten sonra her türlü ifade kullanılabilir."

`Extends`'ten sonra sadece sınıf değil her türlü ifade kullanılabilir.

Örneğin, üst sınıfı yaratan yeni bir fonksiyon çağrısı:

```js run
function f(phrase) {
  return class {
    sayHi() { alert(phrase) }
  }
}

*!*
class User extends f("Hello") {}
*/!*

new User().sayHi(); // Hello
```
Burada `class User` `f("Hello")`'nun sonucunu kalıtır.

Bu belki çok ileri teknik programlama kalıpları için  kullanışlı olabilir. Böylece birçok koşula göre fonksiyonları kullanarak farklı sınıflar oluşturabilir ve bunlardan kalıtım alınabilir. 
````

## Bir metodu geçersiz kılma, üstüne yazma.

Şimdi biraz daha ileri gidelim ve metodun üstüne yazalım. Şimdiden sonra `Rabbit` `stop` metodunu kalıtım alır, bu metod `this.speed=0`'ı `Animal` sınıfında ayarlamaya yarar.

Eğer `Rabbit` içerisinde kendi `stop` metodunuzu yazarsanız buna üstüne yazma denir ve `Animal`'da yazılmış `stop` metodu kullanılmaz.

```js
class Rabbit extends Animal {
  stop() {
    // ... rabbit.stop() için artık bu kullanılacak.
  }
}
```

...Fakat genelde üst metodun üzerine yazmak istenmez, bunun yerine küçük değişiklikler yapmak veya fonksiyonliteyi genişletmek daha fazla tercih edilen yöntemdir. Metodda birçeyler yapar ve genelde bundan önce/sonra veya işlerken üst metodu çağırırız.

Sınıflar bunun için `"super"` anahtar kelimesini sağlarlar.


- `super.method(...)` üst class'ın metodunu çağırmak için.

- `super(...)` üst metodun yapıcısını ( constructor) çağırmak için kullanılır.

Örneğin, Rabbit otomatik olarak durduğunda gizlensin.

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    alert(`${this.name} stopped.`);
  }

}

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }

*!*
  stop() {
    super.stop(); // üst sınıfın stop metodunu çağır.
    this.hide(); // sonra gizle
  }
*/!*
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.stop(); // White Rabbit stopped. White rabbit hides!
```
Artık `Rabbit`, `stop` metodunda üst sınıfın `super.stop()`'unu çağırmaktadır.

````smart header="Ok fonksiyonlarının `super`'i bulunmamaktadır."
<info:arrow-functions> bölümünde bahsedildiği gibi, ok fonksiyonlarının `super`'i bulunmamaktadır.

Eğer erişim olursa bu `super` dışarıdaki fonksiyonundur. Örneğin:
```js
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // üst'ün stop'unu 1 sn sonra çağır. 
  }
}
```
Ok fonksiyonu içerisindeki `super` ile `stop()` içerisine yazılan `super` aynıdır. Eğer "sıradan" bir fonksiyon tanımlarsak bu hataya neden olabilir:

```js
// Unexpected super
setTimeout(function() { super.stop() }, 1000);
```
````


## Yapıcı metodu ezmek.

Yapıcı metodlar ile yapılan şeyler biraz çetrefillidir.

Şimdiye kadar `Rabbit` kendisine ait `yapıcı`'ya sahipti.

[Şartname](https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation)'ye göre eğer bir sınıf diğer başka bir sınıftan türer ve `constructor`'a sahip değil ise aşağıdaki `yapıcı` otomatik olarak oluşturulur.

```js
class Rabbit extends Animal {
  // yapıcısı olmayan ve türetilen sınıf için oluşturulur.
*!*
  constructor(...args) {
    super(...args);
  }
*/!*
}
```
Gördüğünüz gibi aslında üst sınıfın `yapıcı`'sını tüm argümanları göndererek çağırır. Eğer kendimiz bir yapıcı yazmazsak bu meydana gelir.

Özel olarak uyarlanmış bir yapıcı oluşturalım. Bu isim ile birlikte `earLength`'i de tanımlasın:

```js run
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  // ...
}

class Rabbit extends Animal {

*!*
  constructor(name, earLength) {
    this.speed = 0;
    this.name = name;
    this.earLength = earLength;
  }
*/!*

  // ...
}

*!*
// Çalışmaz!
let rabbit = new Rabbit("White Rabbit", 10); // Error: this is not defined.
*/!*
```
Nasıl ya! Hata aldık. Şimdi de rabbit oluşturamıyoruz. Neden peki?

Kısa cevap: Türemiş sınıftaki yapıcı kesinlikle `super(...)` i çağırmalıdır. Bu `this`'den önce olmalıdır.

...Peki neden? Çok garip değilmi?

Tabi bu açıklanabilir bir olay. Detayına girdikçe daha iyi anlayacaksınız.

JavaScript'te "türeyen sınıfın yapıcı fonksiyonu" ve diğerleri arasında farklılıklar mevcuttur. Türemiş sınıflarda eş yapcıı fonksiyonlar içsel olarak `[[ConstructorKind]]:"derived"` şeklinde etiketlenir. 

Farklılık:

- Normal yapıcı çalıştığında boş bir objeyi `this` olarak yaratır ve bunun ile devam eder.
- Fakat türemiş sınıfın yapıcısı çalıştığında bunu yapmaz. Üst fonksiyonun yapıcısının bunu yapmasını bekler.

Eğer kendimiz bir yapıcı yazarsak bundan dolayı `super` i çağırmamız gerekmektedir. Aksi halde `this` referansı oluşturulmaz ve biz de hata alırız.

`Rabbit`'in çalışabilmesi için `this`'den önce `super()` çağırılmalıdır.

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  // ...
}

class Rabbit extends Animal {

  constructor(name, earLength) {
*!*
    super(name);
*/!*
    this.earLength = earLength;
  }

  // ...
}

*!*
// Şimdi düzgün bir şekilde çalışır.
let rabbit = new Rabbit("White Rabbit", 10);
alert(rabbit.name); // White Rabbit
alert(rabbit.earLength); // 10
*/!*
```

## Super: dahililer, [[HomeObject]]

Artık `super`'in derinliklerine dalma vakti geldi. Altında yatan ilginç şeyler nelermiş bunları göreceğiz.

Öncelikle, şimdiye kadar öğrendiklerimizle `super` ile çalışmak mümkün değil.

Ever gerçekten, kendimize soralım, nasıl teknik olarak böyle bir şey çalışabilir? Bir obje metodu çalıştığında var olan objeyi `this` olarak alır. Eğer biz `super.method()`'u çağırırsak `metod`'u nasıl alabilir? Doğal olarak `method`'u var olan objenin prototipinden almak gerekmektedir. Peki teknik olarak bunu JavaScript motoru nasıl halledebilir?

Belki `this`in `[[Prototype]]`'ını `this.__proto__.method` olarak alıyordur? Malesef böyle çalışmıyor.

Bunu test edelim. Sınıflar olmadan basit objelerle, fazladan karmaşıklaştırmadan deneyelim.

Aşağıda `rabbit.eat()`, kendisinin üst metodu `animal.eat()`'i çağırmalıdır:

```js run
let animal = {
  name: "Animal",
  eat() {
    alert(this.name + " eats.");
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {
*!*
    // bizim tahminimze göre super.eat() bu şekilde çalışabilir.
    this.__proto__.eat.call(this); // (*)
*/!*
  }
};

rabbit.eat(); // Rabbit eats.
```
`(*)` satırında `animal` prototipinden `eat`'i almakta ve var olan obje kaynağından çağırmaktayız. Dikkat edin burada `.call(this)` oldukça önemlidir. Çünkü basit `this.__proto__.eat()` üst `eat`'i prototipin kaynağı ile çağırır, var olan objenin değil.

Yukarıdaki kod beklendiği gibi çalışmaktadır. Doğru `alert` vermektedir.

Şimdi bu zincire bir tane daha obje ekleyelim. İşler nasıl bozuluyor görelim:

```js run
let animal = {
  name: "Animal",
  eat() {
    alert(this.name + " eats.");
  }
};

let rabbit = {
  __proto__: animal,
  eat() {
    // ...tavşan-stili ayla ve üst sınıfı çağır.
    this.__proto__.eat.call(this); // (*)
  }
};

let longEar = {
  __proto__: rabbit,
  eat() {
    // ...uzun kulaklar ile bir şeyler yap ve üst sınıfı çağır.
    this.__proto__.eat.call(this); // (**)
  }
};

*!*
longEar.eat(); // Error: Maximum call stack size exceeded
*/!*
```
Yazdığınız kod artık çalışmıyor! `longEar.eat()`'i çağırırken hata olduğunu görebilirsiniz.

Bu çok açık olmayabilir, fakat `longEar.eat()` in hata kodlarını takip ederseniz nedenini anlayabilirsiniz. `(*)` ve `(**)` satırlarında `this` var olan (`longEar`) objesidir. Hatırlayın: Tüm objeclerin metodları `this` olarak var olan objeyi alır, prototipini değil.

Öyleyse, `(*)`,`(**)` ve `this.__proto__` tamamen aynıdır: `rabbit`. Hepsi `rabbit.eat`'i sonsuz zincire çıkmadan çağırır.

Aşağıda ne olduğunu daha iyi anlatan bir görsel bulunmakta:

![](this-super-loop.svg)

1. `longEar.eat()` içerisinde `(**)` satırı `rabbit.eat`'i `this=longEar` olarak çağırmakta.
    ```js
    // longEar.eat() içerisinde this = longEar şeklinde kullanmaktayız.
    this.__proto__.eat.call(this) // (**)
    // olur
    longEar.__proto__.eat.call(this)
    // bu da 
    rabbit.eat.call(this);
    ```
2. Sonra `rabbit.eat`'in `(*)` satırı içerisinde bu zinciri daha üstlere çıkarmaya çalışıyoruz, fakat `this=longEar`, yani `this.__proto__.eat` yine `rabbit.eat`!

    ```js
    // rabbit.eat() içerisinde thiss= longEar bulunmakta
    this.__proto__.eat.call(this) // (*)
    // olur
    longEar.__proto__.eat.call(this)
    // veya (yine)
    rabbit.eat.call(this);
    ```

3. ... Artık `rabbit.eat` 'in kendisini neden sonsuz defa çağırdığını görmüş olduk.

Problem sadece `this` kullanılarak çözülemez.

### `[[HomeObject]]`

Buna bir çözüm sağlamak için, JavaScript fonksiyonlar için bir tane dahili özellik eklemiştir: `[[HomeObject]]`

**Bir fonksiyon sınıf veya obje metodu olarak tanımlandığında, bunun `[[HomeObject]]`'i kendisi olur**

Bu aslında bağımsız fonksiyonlar fikrini bozmaktadır, çünkü metodlar kendi objelerini hatırlamaktadır. Ayrıca `[[HomeObject]]` değiştirilemez, yani bu bağ sonsuza kadardır. Aslında bu dilde yapılan oldukça büyük bir değişiklik.

Fakat bu değişiklik güvenlidir. `[[HomeObject]]` sadece üst sınıfın metodlarını `super`'de çağırmaya yarar. Bundan dolayı uyumluluğu bozmaz.

Şimdi `super` ile nasıl çalışıyor bunu inceleyelim --tekrardan, sade objeleri kullanalım:

```js run
let animal = {
  name: "Animal",
  eat() {         // [[HomeObject]] == animal
    alert(this.name + " eats.");
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {         // [[HomeObject]] == rabbit
    super.eat();
  }
};

let longEar = {
  __proto__: rabbit,
  name: "Long Ear",
  eat() {         // [[HomeObject]] == longEar
    super.eat();
  }
};

*!*
longEar.eat();  // Long Ear eats.
*/!*
```
Her metod kendi objesinin `[[HomeObject]]` özelliğini hatırlamakta. Sonra `super`bunu üst objenin prototipini çözerken kullanır.

`[[HomeObject]]` sınıflar veya sade objeler'de tanımlanan metodlar için tanımlanır. Fakat objeler için, metodlar aynen şu şekilde tanımlanmalıdır: `method()`,  `"method:function()"` şeklinde değil.

Aşağıdaki örnekte karşılaştırma için metod-olmayan yazım kullanılmıştır. `[[HomeObject]]` özelliği tanımlanmadı bundan dolayı da kalıtım çalışmayacaktır.

```js run
let animal = {
  eat: function() { // kısa yazım: eat() {...} olmalıdır.
    // ...
  }
};

let rabbit = {
  __proto__: animal,
  eat: function() {
    super.eat();
  }
};

*!*
rabbit.eat();  // super'i çalıştırırken hata oldu çünkü [[HomeObject]] bulunmamakta.
*/!*
```


It works as intended, due to `[[HomeObject]]` mechanics. A method, such as `longEar.eat`, knows its `[[HomeObject]]` and takes the parent method from its prototype. Without any use of `this`.

### Methods are not "free"

As we've known before, generally functions are "free", not bound to objects in JavaScript. So they can be copied between objects and called with another `this`.

The very existance of `[[HomeObject]]` violates that principle, because methods remember their objects. `[[HomeObject]]` can't be changed, so this bond is forever.

The only place in the language where `[[HomeObject]]` is used -- is `super`. So, if a method does not use `super`, then we can still consider it free and copy between objects. But with `super` things may go wrong.

Here's the demo of a wrong `super` call:

```js run
let animal = {
  sayHi() {
    console.log(`I'm an animal`);
  }
};

let rabbit = {
  __proto__: animal,
  sayHi() {
    super.sayHi();
  }
};

let plant = {
  sayHi() {
    console.log("I'm a plant");
  }
};

let tree = {
  __proto__: plant,
*!*
  sayHi: rabbit.sayHi // (*)
*/!*
};

*!*
tree.sayHi();  // I'm an animal (?!?)
*/!*
```

A call to `tree.sayHi()` shows "I'm an animal". Definitevely wrong.

The reason is simple:
- In the line `(*)`, the method `tree.sayHi` was copied from `rabbit`. Maybe we just wanted to avoid code duplication?
- So its `[[HomeObject]]` is `rabbit`, as it was created in `rabbit`. There's no way to change `[[HomeObject]]`.
- The code of `tree.sayHi()` has `super.sayHi()` inside. It goes up from `rabbit` and takes the method from `animal`.

![](super-homeobject-wrong.svg)

### Methods, not function properties

`[[HomeObject]]` is defined for methods both in classes and in plain objects. But for objects, methods must be specified exactly as `method()`, not as `"method: function()"`.

The difference may be non-essential for us, but it's important for JavaScript.

In the example below a non-method syntax is used for comparison. `[[HomeObject]]` property is not set and the inheritance doesn't work:

```js run
let animal = {
  eat: function() { // should be the short syntax: eat() {...}
    // ...
  }
};

let rabbit = {
  __proto__: animal,
  eat: function() {
    super.eat();
  }
};

*!*
rabbit.eat();  // Error calling super (because there's no [[HomeObject]])
*/!*
```

## Summary

1. To extend a class: `class Child extends Parent`:
    - That means `Child.prototype.__proto__` will be `Parent.prototype`, so methods are inherited.
2. When overriding a constructor:
    - We must call parent constructor as `super()` in `Child` constructor before using `this`.
3. When overriding another method:
    - We can use `super.method()` in a `Child` method to call `Parent` method.
4. Internals:
    - Methods remember their class/object in the internal `[[HomeObject]]` property. That's how `super` resolves parent methods.
    - So it's not safe to copy a method with `super` from one object to another.

Also:
- Arrow functions don't have own `this` or `super`, so they transparently fit into the surrounding context.
