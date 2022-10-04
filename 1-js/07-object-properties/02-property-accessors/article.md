
# Getter ve Setter Özellikleri ( Alıcılar ve Ayarlayıcılar )

İki türlü özellik mevcuttur.

Bunlardan ilki *veri özellikleri*. Bunu zaten biliyorsunuz. Aslında şimdiye kadar kullandığınız tüm özellikler *veri özellikleri*'dir.

İkinci tip özellikler ise *erişim özellikleri*'dir. Bunlar değerleri almak(get) ve ayarlamak(set) için kullanılan fonksiyonlardır, dışarıdaki koddan sanki bir özellikmiş gibi görünürler.


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

```js run
let user = {
  name: "John",
  surname: "Smith"
};
```
"fullName" adında bir özellik eklemek istenirser, elbette var olan kodu kopyala yapıştır yapmayacağız bunun yerine erişim özelliği kullanabiliriz:

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

Dışardan, bu özellik normal görünür. Aslında fikir de tam olarak budur. Biz `user.fullName` 'i fonksiyon olarak çağırmıyoruz. Onu normal bir şekilde özellikmiş gibi okuyoruz. Alıcı perdenin arkasında çalışıyor.

Şu anda `fullName`'in sadece alıcısı var. Eğer `user.fullName=` şeklinde atamaya çalışırsanız hata alırsınız.

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

```smart header="Erişim özellikleri sadece get/set ile erişilebilir"

Bir özellik ya "veri özelliği" ya da "erişim özelliği" olabilir, aynı anda ikisi olamaz.

Bir özellik `get prop()` ile veya `set prop()` ile tanımlanmışsa, artık erişim özelliğidir. Bundan dolayı okuyabilmek için alıcı ve atama yapabilmek için ayarlayıcı olması gerekir.

Bazen sadece ayarlayıcı veya alıcı olabilir. Fakat böyle bir durumda özellik okunabilir veya yazılabilir olmaz. Her ikisinin de yazılmış olması gerekir.

```


## Erişim Tanımlayıcıları

Erişim tanımlayıcıları normal veri özelliklerine göre daha farklıdır.
Erişim özellikleri için `deger` ve `yazılabilir` yoktur, bunun yerine `get` ve `set` fonksiyonları vardır.

Öyleyse erişim tanımlayıcıları şunlara sahiptir:

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

Aynı tanımlayıcıda eğer hem `get` hem de `value` değerini kullanırsak aşağıdaki hata meydana gelir:

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

Getter/Setter "gerçek" özelliklerin üzerinde daha iyi kontrol amacıyla kurulabilir.

Örneğin, `user` gibi çok kısa isimler için `name` özelliğini `_name` içerisinde tutabilirsiniz. Sonrasında atamaları setter'da filteleyebilirsiniz:

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


## Uyumluluk için kullanma
Getter/setter fikrinin amacı aslında "normal" veri özelliklerinin kontrolünü her an elde tutabilmektir.

Örneğin, kullanıcı objesini `name` ve `age` özellikleri ekleyelim:

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

`age` için bir getter yazmak aslında bu problemi ortadan kaldırır.

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // yaş, geçerli tarih ve doğum gününden hesaplanır
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
