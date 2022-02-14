
# Getter ve Setter Özellikleri ( Alıcılar ve Ayarlayıcılar )

<<<<<<< HEAD
İki türlü özellik mevcuttur.

Bunlardan ilki *veri özellikleri*. Bunu zaten biliyorsunuz. Aslında şimdiye kadar kullandığınız tüm özellikler *veri özellikleri*'dir.

İkinci tip özellikler ise *erişim özellikleri*'dir. Bunlar değerleri almak(get) ve ayarlamak(set) için kullanılan fonksiyonlardır, dışarıdaki koddan sanki bir özellikmiş gibi görünürler.
=======
There are two kinds of object properties.

The first kind is *data properties*. We already know how to work with them. All properties that we've been using until now were data properties.

The second type of properties is something new. It's *accessor properties*. They are essentially functions that execute on getting and setting a value, but look like regular properties to an external code.
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834


## Alıcılar ve Ayarlayıcılar

Erişim özellikleri "alıcı" ve "ayarlayıcı" metodlar ile tanımlanır. Obje içerisinde tam olarak `get` ve `set` şeklinde belirtilir:


```js
let obj = {
  *!*get propName()*/!* {
    // obj.propName yazıldığında burası çalışır.
  },

  *!*set propName(value)*/!* {
    // ayarlayıcı  obj.propName = value ayarlandığında burası çalışır.
  }
};
```
Alıcı metodlar `obj.propName` okunduğunda, ayarlayıcı metodlar ise atama yapıldığında çalışır.

Örneğin `user` objemiz olsun ve bunun `name` ve `surname` özellikleri olsun:

```js
let user = {
  name: "John",
  surname: "Smith"
};
```
<<<<<<< HEAD
"fullName" adında bir özellik eklemek istenirser, elbette var olan kodu kopyala yapıştır yapmayacağız bunun yerine erişim özelliği kullanabiliriz:
=======

Now we want to add a `fullName` property, that should be `"John Smith"`. Of course, we don't want to copy-paste existing information, so we can implement it as an accessor:
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834

```js run
let user = {
  name: "John",
  surname: "Smith",

*!*
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
*/!*
};

*!*
alert(user.fullName); // John Smith
*/!*
```

<<<<<<< HEAD
Dışardan, bu özellik normal görünür. Aslında fikir de tam olarak budur. Biz `user.fullName` 'i fonksiyon olarak çağırmıyoruz. Onu normal bir şekilde özellikmiş gibi okuyoruz. Alıcı perdenin arkasında çalışıyor.

Şu anda `fullName`'in sadece alıcısı var. Eğer `user.fullName=` şeklinde atamaya çalışırsanız hata alırsınız.
=======
From the outside, an accessor property looks like a regular one. That's the idea of accessor properties. We don't *call* `user.fullName` as a function, we *read* it normally: the getter runs behind the scenes.

As of now, `fullName` has only a getter. If we attempt to assign `user.fullName=`, there will be an error:

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

*!*
user.fullName = "Test"; // Error (property has only a getter)
*/!*
```
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834

Bunu düzeltmek için ayarlayıcı metodu eklemek gerekmektedir:

```js run
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

*!*
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
};

// FullName ayarlandı.
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```
Şimdi yeni bir "sanal" özelliğimiz oldu. Okunabiliyor, yazılabiliyor fakat aslında yok.

<<<<<<< HEAD
```smart header="Erişim özellikleri sadece get/set ile erişilebilir"

Bir özellik ya "veri özelliği" ya da "erişim özelliği" olabilir, aynı anda ikisi olamaz.

Bir özellik `get prop()` ile veya `set prop()` ile tanımlanmışsa, artık erişim özelliğidir. Bundan dolayı okuyabilmek için alıcı ve atama yapabilmek için ayarlayıcı olması gerekir.

Bazen sadece ayarlayıcı veya alıcı olabilir. Fakat böyle bir durumda özellik okunabilir veya yazılabilir olmaz. Her ikisinin de yazılmış olması gerekir.

```
=======
As the result, we have a "virtual" property `fullName`. It is readable and writable.
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834


<<<<<<< HEAD
## Erişim Tanımlayıcıları

Erişim tanımlayıcıları normal veri özelliklerine göre daha farklıdır.
Erişim özellikleri için `deger` ve `yazılabilir` yoktur, bunun yerine `get` ve `set` fonksiyonları vardır.

Öyleyse erişim tanımlayıcıları şunlara sahiptir:
=======
Descriptors for accessor properties are different from those for data properties.

For accessor properties, there is no `value` or `writable`, but instead there are `get` and `set` functions.

That is, an accessor descriptor may have:
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834

- **`get`** -- parametresi olmayan fonksiyon, sadece özellik okunduğunda çalışır.
- **`set`** -- bir parametreli fonksiyon, özellik ayarlanmak istendiğinde çalışır.
- **`enumerable`** -- bu veri özellikleri ile aynıdır.
- **`configurable`** -- bu veri özellikleri ile aynıdır.

Örneğin `fullName` ve `definePropery` erişim tanımlayıcıları için `get` ve `set`'i iletebiliriz.

```js run
let user = {
  name: "John",
  surname: "Smith"
};

*!*
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
});

alert(user.fullName); // John Smith

for(let key in user) alert(key);
```
Tekrar hatırlatmakta fayda var, bir özelliklik ya erişim özelliği veya veri özelliği olabilir, ikisi aynı anda olamaz.

<<<<<<< HEAD
Aynı tanımlayıcıda eğer hem `get` hem de `value` değerini kullanırsak aşağıdaki hata meydana gelir:
=======
Please note that a property can be either an accessor (has `get/set` methods) or a data property (has a `value`), not both.

If we try to supply both `get` and `value` in the same descriptor, there will be an error:
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834

```js run
*!*
// Error: Invalid property descriptor.
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## Akıllıca getters/setters kullanmak

<<<<<<< HEAD
Getter/Setter "gerçek" özelliklerin üzerinde daha iyi kontrol amacıyla kurulabilir.

Örneğin, `user` gibi çok kısa isimler için `name` özelliğini `_name` içerisinde tutabilirsiniz. Sonrasında atamaları setter'da filteleyebilirsiniz:
=======
Getters/setters can be used as wrappers over "real" property values to gain more control over operations with them.

For instance, if we want to forbid too short names for `user`, we can have a setter `name` and keep the value in a separate property `_name`:
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("İsim çok kısa, en az 4 karakter olmalıdır.");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // İsim çok kısa...
```
Teknik olarak, dışarıdan hala `user._name` ile erişilebilir. Fakat genel bir kural olarak `"_"` ile başlayan özellikler içte kullanılan değişkenlerdir ve dışarıdan hiçbir zaman erişilmemelidir.

<<<<<<< HEAD

## Uyumluluk için kullanma
Getter/setter fikrinin amacı aslında "normal" veri özelliklerinin kontrolünü her an elde tutabilmektir.

Örneğin, kullanıcı objesini `name` ve `age` özellikleri ekleyelim:
=======
So, the name is stored in `_name` property, and the access is done via getter and setter.

Technically, external code is able to access the name directly by using `user._name`. But there is a widely known convention that properties starting with an underscore `"_"` are internal and should not be touched from outside the object.


## Using for compatibility

One of the great uses of accessors is that they allow to take control over a "regular" data property at any moment by replacing it with a getter and a setter and tweak its behavior.

Imagine we started implementing user objects using data properties `name` and `age`:
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25
```

... Bu ilerde muhtemeldir değişebilir. Örneğin `age` yerine ileride `birthday` verisi tutmak istebiliriz, böylece daha kesin yaş bilgisi tutulabilir:

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));
```
Peki eski `age` özelliği ne olacak ?

Her yerde bunu arayıp düzeltebiliriz, fakat bu zaman alır ve kod başkaları tarafından yazıldıysa zor olur. Ayrıca `user` objesinin içinde `age` özelliği pek de fena bir fikir sayılmaz, değil mi?  Aslında bazı yerlerde tam da istediğimiz `age`'dir.

<<<<<<< HEAD
`age` için bir getter yazmak aslında bu problemi ortadan kaldırır.
=======
We can try to find all such places and fix them, but that takes time and can be hard to do if that code is used by many other people. And besides, `age` is a nice thing to have in `user`, right?

Let's keep it.

Adding a getter for `age` solves the problem:
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // age is calculated from the current date and birthday
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // birthday'e
alert( john.age );      // ... ve yaşa aynı anda erişilebilir.
```
Şimdi eski kod da çalışır, ayrıca yeni bir özelliğe de sahip olmuş oluruz.
