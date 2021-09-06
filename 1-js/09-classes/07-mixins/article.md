# Mixinler

JavaScript sadece bir objeden kalıtım yapmaya izin verir. Bir obje için sadece bir tane `[[Prototype]]` olabilir. Ayrıca bir sınıf sadece bir sınıfı genişletebilir.

<<<<<<< HEAD
Bu bizi sınırlandırabilir. Örneğin, `StreetSweeper` ve `Bycicle` adında iki tane sınıfınız var ve bunlardan `StreetSweepingBycicle` adında bir sınıf yaratmak istiyorsunuz.

Veya programlama hakkında konuşacak olursak, `Renderer`adında şablonu uygulayan ve `EventEmitter` adında olayları işleyen bir sınıfımız olsun, ve bu fonksiyonaliteyi birlikte `Page` adında bir sınıfta kullanmak istiyoruz. Böylece page hem şabloları kullanabiliecek hemde hemde olayları yayacak(emit).
=======
But sometimes that feels limiting. For instance, we have a class `StreetSweeper` and a class `Bicycle`, and want to make their mix: a `StreetSweepingBicycle`.

Or we have a class `User` and a class `EventEmitter` that implements event generation, and we'd like to add the functionality of `EventEmitter` to `User`, so that our users can emit events.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Burada bize `mixin` konsepti yardımcı olabilir.

<<<<<<< HEAD
Wikipedia'da şu şekilde tanımlanmıştır: [mixin](https://en.wikipedia.org/wiki/Mixin) sınıfı diğer sınıflar tarafından kullanılacak metodları olan ve bunun için bir üst sınıfa ihtiyaç duymayan yapıdır.
=======
As defined in Wikipedia, a [mixin](https://en.wikipedia.org/wiki/Mixin) is a class containing methods that can be used by other classes without a need to inherit from it.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Diğer bir deyişle *mixin* belirli davranışları uygulayan metodları sağlar, fakat bunu tek başına kullanmayız, bunu diğer sınıflara başka davranışlar eklemek için kullanırız.

## Mixin örneği

<<<<<<< HEAD
JavaScript mixini yapmak için en kolay yol kullanışlı metodlarla donatılmış bir objedir. Böylece kolayca birleştirebilir ve herhangi bir sınıfın prototipine koyabiliriz.
=======
The simplest way to implement a mixin in JavaScript is to make an object with useful methods, so that we can easily merge them into a prototype of any class.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Örneğin aşağoda `sayHiMixin`, `User` için "speech" metodunu ekler:

```js run
*!*
// mixin
*/!*
let sayHiMixin = {
  sayHi() {
    alert("Hello " + this.name);
  },
  sayBye() {
    alert("Bye " + this.name);
  }
};

*!*
// usage:
*/!*
class User {
  constructor(name) {
    this.name = name;
  }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// Artık User sayHi metodunu çağırabilir
new User("Dude").sayHi(); // Hi Dude!
```

Burada gördüğünüz gibi kalıtım yoktur. Yapılan sadece basit metod kopyalamadır. `User` diğer sınıfları genişletebilir, hatta bu sınıflar da kendi içerilerinde mixin'lere sahip olabilirler. Örnek vermek gerekirse:

```js
class User extends Person {
  // ...
}

Object.assign(User.prototype, sayHiMixin);
```
Mixinler kendi içlerinde kalıtım benzeri yapılar oluşturabilirler.

Örneğin `sayHiMixin`, `sayMixin`'ten kalıtılmıştır:

```js run
let sayMixin = {
  say(phrase) {
    alert(phrase);
  }
};

let sayHiMixin = {
<<<<<<< HEAD
  __proto__: sayMixin, // (veya Object.create ile de prototipi ayarlayabilirdik)
=======
  __proto__: sayMixin, // (or we could use Object.setPrototypeOf to set the prototype here)
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

  sayHi() {
    *!*
    // call parent method
    */!*
<<<<<<< HEAD
    super.say("Hello " + this.name);
  },
  sayBye() {
    super.say("Bye " + this.name);
=======
    super.say(`Hello ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Bye ${this.name}`); // (*)
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
  }
};

class User {
  constructor(name) {
    this.name = name;
  }
}

// metodları kopyala
Object.assign(User.prototype, sayHiMixin);

// artık kullanıcı sayHi'yi çağırabilir.
new User("Dude").sayHi(); // Hello Dude!
```

<<<<<<< HEAD
Dikkat ederseniz `sayHiMixin` içinde `super.say() çağırıldığında o mixin'in prototipindeki metoduna bakar, sınıfın değil.

![](mixin-inheritance.svg)

Çünkü `sayHiMixin` metodları `[[HomeObject]]`'e ayarlanmıştır. Bundan dolayı `super` aslında `User.__proto__` değil de `sayHiMixin.__proto__` anlamına gelir.
=======
Please note that the call to the parent method `super.say()` from `sayHiMixin` (at lines labelled with `(*)`) looks for the method in the prototype of that mixin, not the class.

Here's the diagram (see the right part):

![](mixin-inheritance.svg)

That's because methods `sayHi` and `sayBye` were initially created in `sayHiMixin`. So even though they got copied, their `[[HomeObject]]` internal property references `sayHiMixin`, as shown in the picture above.

As `super` looks for parent methods in `[[HomeObject]].[[Prototype]]`, that means it searches `sayHiMixin.[[Prototype]]`, not `User.[[Prototype]]`.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

## EventMixin

Artık gerçek olaylar için mixin yapabiliriz.

Çoğu objenin en önemli özelliği olaylar(event) çalışabilmesidir.

<<<<<<< HEAD
Bir obje önemli bir olay olduğunda "olay" yaratacak metoda sahip olmalıdır. Diğer objeler ise böyle bir olayı "dinlemeli"'dir.

Bir olay isme sahip olmalıdır, bunun ile birlikte ek verileri de barındırabilir.

Örneğin `user` objesi kullanıcı giriş yapacağı zaman `"login"` olayını oluşturabilir. Diğer bir `calendar` objesi ise bu olayı alıp giriş yapan kullanıcı için takvimi doldurabilir.
=======
An important feature of many browser objects (for instance) is that they can generate events. Events are a great way to "broadcast information" to anyone who wants it. So let's make a mixin that allows us to easily add event-related functions to any class/object.

- The mixin will provide a method `.trigger(name, [...data])` to "generate an event" when something important happens to it. The `name` argument is a name of the event, optionally followed by additional arguments with event data.
- Also the method `.on(name, handler)` that adds `handler` function as the listener to events with the given name. It will be called when an event with the given `name` triggers, and get the arguments from the `.trigger` call.
- ...And the method `.off(name, handler)` that removes the `handler` listener.

After adding the mixin, an object `user` will be able to generate an event `"login"` when the visitor logs in. And another object, say, `calendar` may want to listen for such events to load the calendar for the logged-in person.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Veya bir `menu` `"select"` adında menüden seçim yapıldığında oluşturulan bir olay yaratabilir, diğer objeler bilgi alabilir ve bu olaya göre işlem yapabilir.

Olaylar "bilgileri paylaşmak" için bir yöntemdir. Bunlar her sınıfta kullanışlı olabilir, bir örnek yapalım:

```js run
let eventMixin = {
  /**
   * Olaya kayıt olma, kullanımı:
   *  menu.on('select', function(item) { ... }
  */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /**
   * Olaydan kaydı silme, kullanımı:
   *  menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    for(let i = 0; i < handlers.length; i++) {
      if (handlers[i] == handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
   * Olay yarat ve buna veri ekle
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
<<<<<<< HEAD
    if (!this._eventHandlers || !this._eventHandlers[eventName]) {
      return; // Bu olayın ismi ile başka kotarıcı yok.
=======
    if (!this._eventHandlers?.[eventName]) {
      return; // no handlers for that event name
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
    }

    // kotarıcıyı çağır.
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
};
```

Burada 3 tane metod var:

<<<<<<< HEAD
1. `.on(eventName, handler)` `handler`(kotarıcı)'da belirtilen isimle bir olay çalışırsa kotarıcıyı ata. Kotarıcılar `_eventHandlers` özelliğinde saklanır.
2. `.off(eventName, handler)` -- kotarıcı listesinden fonksiyon siler.
3. `.trigger(eventName, ...args)` -- olay yaratır; tüm kotarıcılar çağırılır ve `args` bunlara argüman olarak iletilir.
=======
- `.on(eventName, handler)` -- assigns function `handler` to run when the event with that name occurs. Technically, there's an `_eventHandlers` property that stores an array of handlers for each event name, and it just adds it to the list.
- `.off(eventName, handler)` -- removes the function from the handlers list.
- `.trigger(eventName, ...args)` -- generates the event: all handlers from `_eventHandlers[eventName]` are called, with a list of arguments `...args`.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Kullanım:

```js run
// Sınıf yap
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
// mixin ekle
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// seçildiğinde kotarıcıyı çağır.
*!*
menu.on("select", value => alert("Value selected: " + value));
*/!*

// olayı çalıştır ->  Value selected: 123 gösterilir
menu.choose("123"); // value selected
```

<<<<<<< HEAD
Artık kullanıcının seçimine farklılık gösteren bir kodumuz var ise bunu `menu.on(...)` ile kullanabiliriz.
=======
Now, if we'd like any code to react to a menu selection, we can listen for it with `menu.on(...)`.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

`eventMix` böyle bir davranışa istediğimiz kadar sınıfa eklenebilir bunu yaparken de kalıtım zincirine dokunulmamış olur.

## Özet

*Mixin* -- geniş bir nesne tabanlı programlama deyimidir buna göre; bir sınıf diğer sınıflar için metodlar içerebilir.

<<<<<<< HEAD
Python gibi bazı diller birden fazla kalıtım ile mixin yaratmaya izin verir. JavaScript bunu desteklemez, fakat mixinleri prototipe kopyalayarak uygulanmasına izin verir.

Ayrıca mixinleri kullanarak bir sınıfın davranışlarını genişletebiliriz, bunu yukarıdaki olay-kotarıcı'da görmekteyiz.

Mixinler gerçek sınıfın metodlarının üzerine yazılarak çatışmaya neden olabilir. Bundan dolayı genellikle mixinleri isimlendirirken dikkatli olmalı ve problemi en aza indirmelisiniz.
=======
Some other languages allow multiple inheritance. JavaScript does not support multiple inheritance, but mixins can be implemented by copying methods into prototype.

We can use mixins as a way to augment a class by adding multiple behaviors, like event-handling as we have seen above.

Mixins may become a point of conflict if they accidentally overwrite existing class methods. So generally one should think well about the naming methods of a mixin, to minimize the probability of that happening.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
