# Sınıf kalıtımı, super

Sınıflar başka sınıfları genişletebilirler. Bunun için prototip kalıtımı tabanlı güzel bir yazılışı bulunmaktadır.

<<<<<<< HEAD
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

=======
Class inheritance is a way for one class to extend another class.

So we can create new functionality on top of the existing.

## The "extends" keyword

Let's say we have class `Animal`:

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
  }
}

let animal = new Animal("My animal");
```

Here's how we can represent `animal` object and `Animal` class graphically:

![](rabbit-animal-independent-animal.svg)

...And we would like to create another `class Rabbit`.

As rabbits are animals, `Rabbit` class should be based on `Animal`, have access to animal methods, so that rabbits can do what "generic" animals can do.

The syntax to extend another class is: `class Child extends Parent`.

Let's create `class Rabbit` that inherits from `Animal`:

```js
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
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

<<<<<<< HEAD
`extends` kelimesi aslında  `Rabbit.prototype`'dan referans alıp bunun  `[[Prototype]]`'ını `Animal.prototype`'a ekler. Aynen daha önce de gördüğümüz gibi.

![](animal-rabbit-extends.svg)

Artık `rabbit` hem kendi metodlarına hem de `Animal` metodlarına erişebilir.

````smart header="`extends`'ten sonra her türlü ifade kullanılabilir."
=======
Object of `Rabbit` class have access to both `Rabbit` methods, such as `rabbit.hide()`, and also to `Animal` methods, such as `rabbit.run()`.

Internally, `extends` keyword works using the good old prototype mechanics. It sets `Rabbit.prototype.[[Prototype]]` to `Animal.prototype`. So, if a method is not found in `Rabbit.prototype`, JavaScript takes it from `Animal.prototype`.

![](animal-rabbit-extends.svg)

For instance, to find `rabbit.run` method, the engine checks (bottom-up on the picture):
1. The `rabbit` object (has no `run`).
2. Its prototype, that is `Rabbit.prototype` (has `hide`, but not `run`).
3. Its prototype, that is (due to `extends`) `Animal.prototype`, that finally has the `run` method.

As we can recall from the chapter <info:native-prototypes>, JavaScript itself uses prototypal inheritance for built-in objects. E.g. `Date.prototype.[[Prototype]]` is `Object.prototype`. That's why dates have access to generic object methods.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

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

<<<<<<< HEAD
Şimdi biraz daha ileri gidelim ve metodun üstüne yazalım. Şimdiden sonra `Rabbit` `stop` metodunu kalıtım alır, bu metod `this.speed=0`'ı `Animal` sınıfında ayarlamaya yarar.

Eğer `Rabbit` içerisinde kendi `stop` metodunuzu yazarsanız buna üstüne yazma denir ve `Animal`'da yazılmış `stop` metodu kullanılmaz.
=======
Now let's move forward and override a method. By default, all methods that are not specified in `class Rabbit` are taken directly "as is" from `class Animal`.

But if we specify our own method in `Rabbit`, such as `stop()` then it will be used instead:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js
class Rabbit extends Animal {
  stop() {
<<<<<<< HEAD
    // ... rabbit.stop() için artık bu kullanılacak.
=======
    // ...now this will be used for rabbit.stop()
    // instead of stop() from class Animal
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
  }
}
```

<<<<<<< HEAD
...Fakat genelde üst metodun üzerine yazmak istenmez, bunun yerine küçük değişiklikler yapmak veya fonksiyonliteyi genişletmek daha fazla tercih edilen yöntemdir. Metodda birçeyler yapar ve genelde bundan önce/sonra veya işlerken üst metodu çağırırız.

Sınıflar bunun için `"super"` anahtar kelimesini sağlarlar.
=======
Usually we don't want to totally replace a parent method, but rather to build on top of it to tweak or extend its functionality. We do something in our method, but call the parent method before/after it or in the process.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017


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
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
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
rabbit.stop(); // White Rabbit stands still. White rabbit hides!
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

<<<<<<< HEAD
Şimdiye kadar `Rabbit` kendisine ait `yapıcı`'ya sahipti.
=======
Until now, `Rabbit` did not have its own `constructor`.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

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

<<<<<<< HEAD
Kısa cevap: Türemiş sınıftaki yapıcı kesinlikle `super(...)` i çağırmalıdır. Bu `this`'den önce olmalıdır.
=======
Whoops! We've got an error. Now we can't create rabbits. What went wrong?

The short answer is:

- **Constructors in inheriting classes must call `super(...)`, and (!) do it before using `this`.**
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

...Peki neden? Çok garip değilmi?

<<<<<<< HEAD
Tabi bu açıklanabilir bir olay. Detayına girdikçe daha iyi anlayacaksınız.

JavaScript'te "türeyen sınıfın yapıcı fonksiyonu" ve diğerleri arasında farklılıklar mevcuttur. Türemiş sınıflarda eş yapcıı fonksiyonlar içsel olarak `[[ConstructorKind]]:"derived"` şeklinde etiketlenir. 

Farklılık:

- Normal yapıcı çalıştığında boş bir objeyi `this` olarak yaratır ve bunun ile devam eder.
- Fakat türemiş sınıfın yapıcısı çalıştığında bunu yapmaz. Üst fonksiyonun yapıcısının bunu yapmasını bekler.

Eğer kendimiz bir yapıcı yazarsak bundan dolayı `super` i çağırmamız gerekmektedir. Aksi halde `this` referansı oluşturulmaz ve biz de hata alırız.

`Rabbit`'in çalışabilmesi için `this`'den önce `super()` çağırılmalıdır.
=======
Of course, there's an explanation. Let's get into details, so you'll really understand what's going on.

In JavaScript, there's a distinction between a constructor function of an inheriting class (so-called "derived constructor") and other functions. A derived constructor has a special internal property `[[ConstructorKind]]:"derived"`. That's a special internal label.

That label affects its behavior with `new`.

- When a regular function is executed with `new`, it creates an empty object and assigns it to `this`.
- But when a derived constructor runs, it doesn't do this. It expects the parent constructor to do this job.

So a derived constructor must call `super` in order to execute its parent (base) constructor, otherwise the object for `this` won't be created. And we'll get an error.

For the `Rabbit` constructor to work, it needs to call `super()` before using `this`, like here:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

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

<<<<<<< HEAD
Artık `super`'in derinliklerine dalma vakti geldi. Altında yatan ilginç şeyler nelermiş bunları göreceğiz.

Öncelikle, şimdiye kadar öğrendiklerimizle `super` ile çalışmak mümkün değil.
=======

### Overriding class fields: a tricky note

```warn header="Advanced note"
This note assumes you have a certain experience with classes, maybe in other programming languages.

It provides better insight into the language and also explains the behavior that might be a source of bugs (but not very often).

If you find it difficult to understand, just go on, continue reading, then return to it some time later.
```

We can override not only methods, but also class fields.

Although, there's a tricky behavior when we access an overridden field in parent constructor, quite different from most other programming languages.

Consider this example:

```js run
class Animal {
  name = 'animal'

  constructor() {
    alert(this.name); // (*)
  }
}

class Rabbit extends Animal {
  name = 'rabbit';
}

new Animal(); // animal
*!*
new Rabbit(); // animal
*/!*
```

Here, class `Rabbit` extends `Animal` and overrides `name` field with its own value.

There's no own constructor in `Rabbit`, so `Animal` constructor is called.

What's interesting is that in both cases: `new Animal()` and `new Rabbit()`, the `alert` in the line `(*)` shows `animal`.

**In other words, parent constructor always uses its own field value, not the overridden one.**

What's odd about it?

If it's not clear yet, please compare with methods.

Here's the same code, but instead of `this.name` field we call `this.showName()` method:

```js run
class Animal {
  showName() {  // instead of this.name = 'animal'
    alert('animal');
  }

  constructor() {
    this.showName(); // instead of alert(this.name);
  }
}

class Rabbit extends Animal {
  showName() {
    alert('rabbit');
  }
}

new Animal(); // animal
*!*
new Rabbit(); // rabbit
*/!*
```

Please note: now the output is different.

And that's what we naturally expect. When the parent constructor is called in the derived class, it uses the overridden method.

...But for class fields it's not so. As said, the parent constructor always uses the parent field.

Why is there the difference?

Well, the reason is in the field initialization order. The class field is initialized:
- Before constructor for the base class (that doesn't extend anything),
- Immediately after `super()` for the derived class.

In our case, `Rabbit` is the derived class. There's no `constructor()` in it. As said previously, that's the same as if there was an empty constructor with only `super(...args)`.

So, `new Rabbit()` calls `super()`, thus executing the parent constructor, and (per the rule for derived classes) only after that its class fields are initialized. At the time of the parent constructor execution, there are no `Rabbit` class fields yet, that's why `Animal` fields are used.

This subtle difference between fields and methods is specific to JavaScript

Luckily, this behavior only reveals itself if an overridden field is used in the parent constructor. Then it may be difficult to understand what's going on, so we're explaining it here.

If it becomes a problem, one can fix it by using methods or getters/setters instead of fields.


## Super: internals, [[HomeObject]]

```warn header="Advanced information"
If you're reading the tutorial for the first time - this section may be skipped.

It's about the internal mechanisms behind inheritance and `super`.
```

Let's get a little deeper under the hood of `super`. We'll see some interesting things along the way.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Ever gerçekten, kendimize soralım, nasıl teknik olarak böyle birşey çalışabilir? Bir obje metodu çalıştığında var olan objeyi `this` olarak alır. Eğer biz `super.method()`'u çağırırsak `metod`'u nasıl alabilir? Doğal olarak `method`'u var olan objenin prototipinden almak gerekmektedir. Peki teknik olarak bunu JavaScript motoru nasıl halledebilir?

<<<<<<< HEAD
Belki `this`in `[[Prototype]]`'ını `this.__proto__.method` olarak alıyordur? Malesef böyle çalışmıyor.
=======
Yeah, indeed, let's ask ourselves, how it should technically work? When an object method runs, it gets the current object as `this`. If we call `super.method()` then, the engine needs to get the `method` from the prototype of the current object. But how?
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Bunu test edelim. Sınıflar olmadan basit objelerle, fazladan karmaşıklaştırmadan deneyelim.

<<<<<<< HEAD
Aşağıda `rabbit.eat()`, kendisinin üst metodu `animal.eat()`'i çağırmalıdır:
=======
Let's demonstrate the problem. Without classes, using plain objects for the sake of simplicity.

You may skip this part and go below to the `[[HomeObject]]` subsection if you don't want to know the details. That won't harm. Or read on if you're interested in understanding things in-depth.

In the example below, `rabbit.__proto__ = animal`. Now let's try: in `rabbit.eat()` we'll call `animal.eat()`, using `this.__proto__`:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

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
    // ...uzun kulaklar ile birşeyler yap ve üst sınıfı çağır.
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

<<<<<<< HEAD
1. `longEar.eat()` içerisinde `(**)` satırı `rabbit.eat`'i `this=longEar` olarak çağırmakta.
=======
![](this-super-loop.svg)

1. Inside `longEar.eat()`, the line `(**)` calls `rabbit.eat` providing it with `this=longEar`.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
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

The very existence of `[[HomeObject]]` violates that principle, because methods remember their objects. `[[HomeObject]]` can't be changed, so this bond is forever.

The only place in the language where `[[HomeObject]]` is used -- is `super`. So, if a method does not use `super`, then we can still consider it free and copy between objects. But with `super` things may go wrong.

Here's the demo of a wrong `super` result after copying:

```js run
let animal = {
  sayHi() {
    alert(`I'm an animal`);
  }
};

// rabbit inherits from animal
let rabbit = {
  __proto__: animal,
  sayHi() {
    super.sayHi();
  }
};

let plant = {
  sayHi() {
    alert("I'm a plant");
  }
};

// tree inherits from plant
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

A call to `tree.sayHi()` shows "I'm an animal". Definitely wrong.

The reason is simple:
- In the line `(*)`, the method `tree.sayHi` was copied from `rabbit`. Maybe we just wanted to avoid code duplication?
- Its `[[HomeObject]]` is `rabbit`, as it was created in `rabbit`. There's no way to change `[[HomeObject]]`.
- The code of `tree.sayHi()` has `super.sayHi()` inside. It goes up from `rabbit` and takes the method from `animal`.

<<<<<<< HEAD
=======
Here's the diagram of what happens:

>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
![](super-homeobject-wrong.svg)

### Methods, not function properties

`[[HomeObject]]` is defined for methods both in classes and in plain objects. But for objects, methods must be specified exactly as `method()`, not as `"method: function()"`.

The difference may be non-essential for us, but it's important for JavaScript.

In the example below a non-method syntax is used for comparison. `[[HomeObject]]` property is not set and the inheritance doesn't work:

```js run
let animal = {
  eat: function() { // intentionally writing like this instead of eat() {...
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
- Arrow functions don't have their own `this` or `super`, so they transparently fit into the surrounding context.
