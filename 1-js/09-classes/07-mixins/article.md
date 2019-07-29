# Mixinler

JavaScript sadece bir objeden kalıtım yapmaya izin verir. Bir obje için sadece bir tane `[[Prototype]]` olabilir. Ayrıca bir sınıf sadece bir sınıfı genişletebilir.

Bu bizi sınırlandırabilir. Örneğin, `StreetSweeper` ve `Bycicle` adında iki tane sınıfınız var ve bunlardan `StreetSweepingBycicle` adında bir sınıf yaratmak istiyorsunuz.

Veya programlama hakkında konuşacak olursak, `Renderer`adında şablonu uygulayan ve `EventEmitter` adında olayları işleyen bir sınıfımız olsun, ve bu fonksiyonaliteyi birlikte `Page` adında bir sınıfta kullanmak istiyoruz. Böylece page hem şabloları kullanabiliecek hemde hemde olayları yayacak(emit).

Burada bize `mixin` konsepti yardımcı olabilir.

Wikipedia'da şu şekilde tanımlanmıştır: [mixin](https://en.wikipedia.org/wiki/Mixin) sınıfı diğer sınıflar tarafından kullanılacak metodları olan ve bunun için bir üst sınıfa ihtiyaç duymayan yapıdır.

Diğer bir deyişle *mixin* belirli davranışları uygulayan metodları sağlar, fakat bunu tek başına kullanmayız, bunu diğer sınıflara başka davranışlar eklemek için kullanırız.

## Mixin örneği

JavaScript mixini yapmak için en kolay yol kullanışlı metodlarla donatılmış bir objedir. Böylece kolayca birleştirebilir ve herhangi bir sınıfın prototipine koyabiliriz.

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
  __proto__: sayMixin, // (veya Object.create ile de prototipi ayarlayabilirdik)

  sayHi() {
    *!*
    // call parent method
    */!*
    super.say("Hello " + this.name);
  },
  sayBye() {
    super.say("Bye " + this.name);
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

Dikkat ederseniz `sayHiMixin` içinde `super.say() çağırıldığında o mixin'in prototipindeki metoduna bakar, sınıfın değil.

![](mixin-inheritance.svg)

Çünkü `sayHiMixin` metodları `[[HomeObject]]`'e ayarlanmıştır. Bundan dolayı `super` aslında `User.__proto__` değil de `sayHiMixin.__proto__` anlamına gelir.

## EventMixin

Artık gerçek olaylar için mixin yapabiliriz.

Çoğu objenin en önemli özelliği olaylar(event) çalışabilmesidir.

Bir obje önemli bir olay olduğunda "olay" yaratacak metoda sahip olmalıdır. Diğer objeler ise böyle bir olayı "dinlemeli"'dir.

Bir olay isme sahip olmalıdır, bunun ile birlikte ek verileri de barındırabilir.

Örneğin `user` objesi kullanıcı giriş yapacağı zaman `"login"` olayını oluşturabilir. Diğer bir `calendar` objesi ise bu olayı alıp giriş yapan kullanıcı için takvimi doldurabilir.

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
    let handlers = this._eventHandlers && this._eventHandlers[eventName];
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
    if (!this._eventHandlers || !this._eventHandlers[eventName]) {
      return; // Bu olayın ismi ile başka kotarıcı yok.
    }

    // kotarıcıyı çağır.
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
};
```

Burada 3 tane metod var:

1. `.on(eventName, handler)` `handler`(kotarıcı)'da belirtilen isimle bir olay çalışırsa kotarıcıyı ata. Kotarıcılar `_eventHandlers` özelliğinde saklanır.
2. `.off(eventName, handler)` -- kotarıcı listesinden fonksiyon siler.
3. `.trigger(eventName, ...args)` -- olay yaratır; tüm kotarıcılar çağırılır ve `args` bunlara argüman olarak iletilir.

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

Artık kullanıcının seçimine farklılık gösteren bir kodumuz var ise bunu `menu.on(...)` ile kullanabiliriz.

`eventMix` böyle bir davranışa istediğimiz kadar sınıfa eklenebilir bunu yaparken de kalıtım zincirine dokunulmamış olur.

## Özet

*Mixin* -- geniş bir nesne tabanlı programlama deyimidir buna göre; bir sınıf diğer sınıflar için metodlar içerebilir.

Python gibi bazı diller birden fazla kalıtım ile mixin yaratmaya izin verir. JavaScript bunu desteklemez, fakat mixinleri prototipe kopyalayarak uygulanmasına izin verir.

Ayrıca mixinleri kullanarak bir sınıfın davranışlarını genişletebiliriz, bunu yukarıdaki olay-kotarıcı'da görmekteyiz.

Mixinler gerçek sınıfın metodlarının üzerine yazılarak çatışmaya neden olabilir. Bundan dolayı genellikle mixinleri isimlendirirken dikkatli olmalı ve problemi en aza indirmelisiniz.
