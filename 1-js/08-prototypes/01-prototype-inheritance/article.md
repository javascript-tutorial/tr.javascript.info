# Protitipsel Kalıtım

Programlarken genelde bir şeyi alır ve bunu genişletmek isteriz.

Örneğin, `kullanici` adında bir obje ve bunun özellikleri ve metodları olsun, bunu biraz düzenleyerek `admin` ve `misafir` gibi iki farklı obje oluşturmak isteriz. Yani `kullanici` objesini doğrudan kopyalamak veya metodlarını tekrardan uygulamak değil bunlar üzerinden yeni objeler yaratmak isteyebiliriz.

*Prototip kalıtımı* buna olanak sağlamaktadır.

## [[Prototype]]

Javascript objeleri gizli bir özellik olan `[[Prototype]]` özelliğine sahiptirler. Bu `null` olabilir veya başka objeye referans verebilir.  Referans verilen obje "prototip" olarak adlandırılır.

<<<<<<< HEAD
![prototip](object-prototype-empty.svg)

`[[Prototip]]`'in "büyülü" bir anlamı bulunmaktadır. Objeden bir özellik okunmak istendiğinde, ve bu obje bulunamadığında JavaScript bunu otomatik olarak prototip'ten alır. Programlamada buna `prototip kalıtımı` denir. Birçok dil özelliği ve programlama tekniği bunun üzerine kuruludur.
=======
![prototype](object-prototype-empty.svg)

When we read a property from `object`, and it's missing, JavaScript automatically takes it from the prototype. In programming, such thing is called "prototypal inheritance". And soon we'll study many examples of such inheritance, as well as cooler language features built upon it.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

`[[Prototpe]]` gizli bir özelliktir, fakat bunu ayarlamanın bir çok yolu vardır.

<<<<<<< HEAD
Bunlardan biri `__proto__` kullanmaktır:
=======
One of them is to use the special name `__proto__`, like this:
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

```js run
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal
*/!*
```

<<<<<<< HEAD
Aklınızda bulunsun `__proto__` `[[Prototype]]` ile *aynı değildir*. Bunun için alıcı/ayarlayıcı ( getter/setter)'dır. Bunun hakkında ilerleyen bölümlerde daha fazla açıklama yapılacaktır fakat şimdilik `__proto__` yeterlidir.

Örneğin `rabbit` adında bir özelliğe arasanız ve bu özellik yoksa, JavaScript bunu otomatik olarak `animal`'dan alır.

Örneğin:
=======
Now if we read a property from `rabbit`, and it's missing, JavaScript will automatically take it from `animal`.

For instance:
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

```js
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal; // (*)
*/!*

// Artık her ikisini de rabbit'te bulabilirsiniz.
*!*
alert( rabbit.eats ); // true (**)
*/!*
alert( rabbit.jumps ); // true
```

`(*)` satırında `animal`'ın `rabbit` in özleliği olması sağlanır

Sonrasında `alert` `rabbit.eats` `(**)`'i okur. Bu `rabbit`'te olmadığından JavaScript `[[Prototype]]`'ı takip eder ve bunu `animal`'in içerinde bulur.

![](proto-animal-rabbit.svg)

<<<<<<< HEAD
Böylece "`animal`" `rabbit`'in prototip'i veya "`rabbit` prototipsel olarak `animal` kalıtımını almıştır" diyebiliriz.
=======
![](proto-animal-rabbit.svg)
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

Diyelim ki `animal`'ın birçok özelliği ve metodu olsun, bunları otomatik olarak `rabbit` de kullanabilir. Bu çeşit özelliklere `kalıtılmış` özellikler denir.

Eğer `animal`'da bir metodumuz varsa bu metod `rabbit` tarafından çağırılabilir olmaktadır.


```js run
let animal = {
  eats: true,
*!*
  walk() {
    alert("Animal walk");
  }
*/!*
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

// walk prototipten alınmıştır.
*!*
rabbit.walk(); // Animal walk
*/!*
```
Metod prototipten otomatik olarak şu şekilde alınmıştır:

<<<<<<< HEAD
![](proto-animal-rabbit-walk.svg)
Prototip zinciri daha da uzun olabilir:
=======
The method is automatically taken from the prototype, like this:

![](proto-animal-rabbit-walk.svg)

The prototype chain can be longer:
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

```js run
let animal = {
  eats: true,
  walk() {
    alert("Animal walk");
  }
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

let longEar = {
  earLength: 10,
  __proto__: rabbit
}

// walk prorotip zincirinden alınmıştır.
longEar.walk(); // Animal walk
alert(longEar.jumps); // true (rabbit'ten gelmekte)
```

![](proto-animal-rabbit-chain.svg)

<<<<<<< HEAD
Aslında iki tane kısıtlama bulunmaktadır:

=======
Now if we read something from `longEar`, and it's missing, JavaScript will look for it in `rabbit`, and then in `animal`.

There are only two limitations:

1. The references can't go in circles. JavaScript will throw an error if we try to assign `__proto__` in a circle.
2. The value of `__proto__` can be either an object or `null`. Other types are ignored.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

1. Referanslar kapalı devre olamaz. Böyle bir duurmda hata verir.
2. `__proto__`'nun değeri ya obje olur ya da `null` Diğer türlüsü ( tüm ilkel veri tipleri ) görmezden gelinir.

<<<<<<< HEAD
Çok açık olsa da tekrar söylemekte yarar var. Bir obje sadece bir tane `[[Prototype]]`'a sahip olabilir. Bir objenin iki farklı objeden kalıtım alamaz.
=======

```smart header="`__proto__` is a historical getter/setter for `[[Prototype]]`"
It's a common mistake of novice developers not to know the difference between these two.

Please note that `__proto__` is *not the same* as the internal `[[Prototype]]` property. It's a getter/setter for `[[Prototype]]`. Later we'll see situations where it matters, for now let's just keep it in mind, as we build our understanding of JavaScript language.

The `__proto__` property is a bit outdated. It exists for historical reasons, modern JavaScript suggests that we should use `Object.getPrototypeOf/Object.setPrototypeOf` functions instead that get/set the prototype. We'll also cover these functions later.

By the specification, `__proto__` must only be supported by browsers. In fact though, all environments including server-side support `__proto__`, so we're quite safe using it.

As the `__proto__` notation is a bit more intuitively obvious, we use it in the examples.
```

## Writing doesn't use prototype
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

## Kuralların Okuması/Yazılması.


Prototip sadece özelliklerin *okunması* için kullanılır.

Veri özelliklerinin yazılma/silinme ( alıcı/ayarlayıcı değil) işi doğrudan obje üzerinden yapılır.


Aşağıdaki örnekte `rabbit`'e kendi `walk` metodu atanmıştır:

```js run
let animal = {
  eats: true,
  walk() {
    /* Bu metod rabbit tarafından kullanılmayacaktır. */  
  }
};

let rabbit = {
  __proto__: animal
}

*!*
rabbit.walk = function() {
  alert("Rabbit! Bounce-bounce!");
};
*/!*

rabbit.walk(); // Rabbit! Bounce-bounce!
```
Artık `rabbit.wal()` metodu doğrudan kendi içerisinde bulur ve çalıştırır. Prototip kullanmaz:

<<<<<<< HEAD
![](proto-animal-rabbit-walk-2.svg)

Alıcı/Ayarlayıcı için ise eğer özellik okunursa bu doğrudan prototipte okunur ve uyarılır.
=======
From now on, `rabbit.walk()` call finds the method immediately in the object and executes it, without using the prototype:

![](proto-animal-rabbit-walk-2.svg)

Accessor properties are an exception, as assignment is handled by a setter function. So writing to such a property is actually the same as calling a function.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

Örneğin aşağıdaki `admin.fullName` özelliğine bakın:

```js run
let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

alert(admin.fullName); // John Smith (*)

// Ayarlayıcılar uyarıldı!
admin.fullName = "Alice Cooper"; // (**)

alert(admin.fullName); // Alice Cooper, state of admin modified
alert(user.fullName); // John Smith, state of user protected
```

`(*)` satırında `admin.fullName` özelliği `user` prototipinde alıcıya sahiptir. Bundan dolayı çağırılır. `(**)` satırında ise ayarlayıcıya sahip olduğundan bu da çağırılır.

## "this"'in değeri

<<<<<<< HEAD
Yukarıdaki örnekte aklınıza şöyle bir soru gelebilir. `set fullName(value)` içerisinde `this`'in değeri nedir? `this.name` ve `this.surname` yazılan yerlerde `admin` mi yoksa `user` mı kullanılır?
=======
An interesting question may arise in the example above: what's the value of `this` inside `set fullName(value)`? Where are the properties `this.name` and `this.surname` written: into `user` or `admin`?
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

Cevap basittir: `this` prototip tarafından hiç bir şekilde etkilenmez.

**Metodun bulunduğu yerin önemi olmaksızın, metod çağrısında `this` her zaman noktadan önceki bölümdür.**

Öyleyese aslında ayarlayıcı `admin`'i `this` olarak kullanır. `user`'ı değil.

<<<<<<< HEAD
Çok büyük bir objeye ve buna ait birçok metoda, kalıtıma sahip olabileceğimizden dolayı bu aslında çok önemli bir olaydır.  Sonrasında büyük objenin değil kalıtılmış objelerin metodlarını çalıştırabilir ve bunların özelliklerini değiştirebiliriz.
=======
That is actually a super-important thing, because we may have a big object with many methods, and have objects that inherit from it. And when the inheriting objects run the inherited methods, they will modify only their own states, not the state of the big object.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

Örneğin burada `animal` aslında "metod deposu"'nu temsil etmektedir. `rabbit` ise bunu kullanır.

`rabbit.sleep()` çağrısı `rabbit` üzerinde `this.isSleeping`'i ayarlar:

```js run
// animal metodları
let animal = {
  walk() {
    if (!this.isSleeping) {
      alert(`I walk`);
    }
  },
  sleep() {
    this.isSleeping = true;
  }
};

let rabbit = {
  name: "White Rabbit",
  __proto__: animal
};

// rabbit.isSleeping'i modifiye eder.
rabbit.sleep();

alert(rabbit.isSleeping); // true
<<<<<<< HEAD
alert(animal.isSleeping); // undefined (prototipte böyle bir özellik bulunmamaktadır.)
=======
alert(animal.isSleeping); // undefined (no such property in the prototype)
```

The resulting picture:

![](proto-animal-rabbit-walk-3.svg)

If we had other objects, like `bird`, `snake`, etc., inheriting from `animal`, they would also gain access to methods of `animal`. But `this` in each method call would be the corresponding object, evaluated at the call-time (before dot), not `animal`. So when we write data into `this`, it is stored into these objects.

As a result, methods are shared, but the object state is not.

## for..in loop

The `for..in` loop iterates over inherited properties too.

For instance:

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

*!*
// Object.keys only returns own keys
alert(Object.keys(rabbit)); // jumps
*/!*

*!*
// for..in loops over both own and inherited keys
for(let prop in rabbit) alert(prop); // jumps, then eats
*/!*
```

If that's not what we want, and we'd like to exclude inherited properties, there's a built-in method [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): it returns `true` if `obj` has its own (not inherited) property named `key`.

So we can filter out inherited properties (or do something else with them):

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

for(let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    alert(`Our: ${prop}`); // Our: jumps
  } else {
    alert(`Inherited: ${prop}`); // Inherited: eats
  }
}
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b
```
Sonuç görseli:

<<<<<<< HEAD
![](proto-animal-rabbit-walk-3.svg)
=======
Here we have the following inheritance chain: `rabbit` inherits from `animal`, that inherits from `Object.prototype` (because `animal` is a literal object `{...}`, so it's by default), and then `null` above it:

![](rabbit-animal-object.svg)
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

Eğer `bird`, `sname` gibi `animal`'dan miras alan objelere sahip olsaydık bunlar da `animal`'in metodlarına erişebilirlerdi. Fakat her metoddaki `this` bağlı bulunduğu objeye göre çalışırdı. Yani noktadan önceki metoda göre, `animal`'e göre değil. Bundan dolayı ne zaman `this`'e veri yazılsa o objelerin içerisine yazılır.

<<<<<<< HEAD
Sonuç olarak metodlar paylaşılsa bile objelerin durumları paylaşılmaz.
=======
...But why does `hasOwnProperty` not appear in the `for..in` loop like `eats` and `jumps` do, if `for..in` lists inherited properties?

The answer is simple: it's not enumerable. Just like all other properties of `Object.prototype`, it has `enumerable:false` flag. And `for..in` only lists enumerable properties. That's why it and the rest of the `Object.prototype` properties are not listed.

```smart header="Almost all other key/value-getting methods ignore inherited properties"
Almost all other key/value-getting methods, such as `Object.keys`, `Object.values` and so on ignore inherited properties.

They only operate on the object itself. Properties from the prototype are *not* taken into account.
```
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

## Özet

<<<<<<< HEAD
- JavaScript'te tüm objelerin gizli `[[Prototype]]`'ı bulunmaktaıd. Bu özellik ya başka bir objedir veya `null`'dur.
- Erişmek için `obj.__proto__` kullanılabilir. (elbette diğer yollar da mevcuttur, ilerde bunlara değineceğiz.)
- `[[Prototype]]` tarafından temsil edilen objeye "prototip" denir.
- Eğer bir `obj`'nin özelliğini okumak veya bir metodunu çağırmak istersek ve o metod yok ise JavaScript bunu prototipte bulmaya çalışır. Yazma/Silme operasyonları doğrudan obje üzerinde çalıştırılır. Özellik ayarlayıcı olmadığı sürece prototip kullanılmaz.
- Eğer `obj.method()`'u çağırırsak ve `method` prototipten alınırsa `this` yine de `obj`'i temsil eder. Bundan dolayı metodlar her zaman o anki obje ile çalışırlar miras kalsalar bile.
=======
- In JavaScript, all objects have a hidden `[[Prototype]]` property that's either another object or `null`.
- We can use `obj.__proto__` to access it (a historical getter/setter, there are other ways, to be covered soon).
- The object referenced by `[[Prototype]]` is called a "prototype".
- If we want to read a property of `obj` or call a method, and it doesn't exist, then JavaScript tries to find it in the prototype.
- Write/delete operations act directly on the object, they don't use the prototype (assuming it's a data property, not a setter).
- If we call `obj.method()`, and the `method` is taken from the prototype, `this` still references `obj`. So methods always work with the current object even if they are inherited.
- The `for..in` loop iterates over both its own and its inherited properties. All other key/value-getting methods only operate on the object itself.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b
