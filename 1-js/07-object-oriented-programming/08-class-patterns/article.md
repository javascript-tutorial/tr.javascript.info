
# Sınıf Desenleri

```quote author="Wikipedia"
Sınıf, nesne yönelimli programlama dillerinde nesnelerin özelliklerini, davranışlarını ve başlangıç durumlarını tanımlamak için kullanılan şablonlara verilen addır. Bir sınıftan türetilmiş bir nesne ise o sınıfın örneği olarak tanımlanır.
```

JavaScript dilinde yapıcı `class` sözcüğü bulunmaktadır. Fakat bunu çalışmadan önce, "class" sözcüğünün Nesne Yönelimli Programlamadan geldiğini söylemek gerekir. Tanım yukarıda alıntılanmıştır, dil bağımsızdır.

JavaScript dilinde bilinen birkaç programlama deseni bulunmaktadır, bu şekilde `class` anahtarını kullanmadan bile sınıflar yapılabilir. Öncelikle bunlardan bahsedelim.

`class` yapıcısı bir sonraki bölümde anlatılacaktır. Aslında class yapısı JavaScript'te bu "syntax sugar"'dır yani bir desenin uzantısıdır. 

[cut]


## Fonksiyonel Sınıf Deseni

Tanıma göre aşağıdaki kurucu fonksiyon bir "sınıf"'tır:

```js run
function User(name) {
  this.sayHi = function() {
    alert(name);
  };
}

let user = new User("John");
user.sayHi(); // John
```
Tüm gerekli özellikleri taşımaktadır:

1. Obje yaratmak için "Program-kod-teması"'dır. `new` ile çağırılabilir.
2. Durum için gerekli değerleri sağlar ( parametre'den `name` argümanın alınabilir olması)
3. Metodlar sağlaması ( `sayHi` ).

Buna *Fonksiyonel Sınıf Deseni* denir.

Fonksiyonel desende, `user` içindeki yerel değişkenler ve fonksiyonlar, `this` ile atanmasalar, içeriden görünür fakat dışarıdan erişilemez olurlar.

Bundan dolayı kolayca `calcAge()` gibi iç fonksiyonları ekleyebiliriz:

```js run
function User(name, birthday) {

*!*
  // Sadece User içerisindeki diğer metodlar tarafından kullanılabilir.
  function calcAge() {
    return new Date().getFullYear() - birthday.getFullYear();
  }
*/!*

  this.sayHi = function() {
    alert(name + ', age:' + calcAge());
  };
}

let user = new User("John", new Date(2000,0,1));
user.sayHi(); // John
```

Yukarıdaki kodda `name`, `birthda` ve `calcAge()` fonksiyonları iç fonksiyonlardır objeye *private*(özel)'dir. Sadece kendi içerisinden çağırılabilir.

Diğer taraftan `sayHi` dış *public* bir metoddur. `user`'ı oluşturan kod buna erişebilir.
From the other hand, `sayHi` is the external, *public* method. The external code that creates `user` can access it.

Böylece yardımcı metodları ve başka sınıflar tarafından kullanılmasını istemediğimiz kodları gizleyebiliriz. Bunlar sadece `this`'e atanırsa görünür olurlar.

## Factory Sınıf Deseni

`new` kullanmadan da aslında sınıf yaratmak mümkündür.

Şu şekilde:

```js run
function User(name, birthday) {
  // only visible from other methods inside User
  function calcAge() {
    return new Date().getFullYear() - birthday.getFullYear();
  }

  return {
    sayHi() {
      alert(name + ', age:' + calcAge());
    }
  };
}

*!*
let user = User("John", new Date(2000,0,1));
*/!*
user.sayHi(); // John
```

Gördüğünüz gibi, `User` bir obje döner ve buna ait kamusal özellikler ve metodlar mevcuttur. Bunun en büyük artısı `new` yazmamıza gerek kalmamasıdır;  `let user = new User(...)` yerin  `let user = User(...)` şeklinde yazabiliriz. Diğer bir deyişle fonksiyonel desen ile neredeyse aynıdır.

## Prototip tabanlı sınıflar

Prototip-tabanlı sınıflar en önemlisi ve genelde de en iyisidir. Fonksiyonel ve Factory sınıfları deseni pratikte çok nadir olarak kullanılırlar.

Yakında bunun nedenin göreceksiniz.

Yukarıdaki sınıfı prototip kullanarak yazacak olursak:

```js run
function User(name, birthday) {
*!*
  this._name = name;
  this._birthday = birthday;
*/!*
}

*!*
User.prototype._calcAge = function() {
*/!*
  return new Date().getFullYear() - this._birthday.getFullYear();
};

User.prototype.sayHi = function() {
  alert(this._name + ', age:' + this._calcAge());
};

let user = new User("John", new Date(2000,0,1));
user.sayHi(); // John
```

Kod yapısı:

- Yapıcı `User` sadece başlangıçtaki obje durumunu ayarlar.
- Metodlar `User.prototype`'a eklenir.

Görüleceği üzere, metodlar yazım olarak `function User` içerisinde değildir. Ortak bir sözcük ortamını paylaşmazlar. Eğer `function User` içerisinde bir değişken tanımlanırsa, bu metodlarda görünebilir olmaz.

Bundan dolayı genelde içte kullanılan özellikler ve metodlar `"_"` ön eki eklenerek belirtilir. Örneğin `_name` veya `_calcAge()` gibi. teknik olarak bu sadece bir anlaşmadır, dıştaki kod aslında hala bu değişkenlere değişebilir. Fakat çoğu programcı `"_"` ne demek olduğunu anlayacak ve bu ön ekli özelliklere ve metodlara dış kodlarında dokunmayacaklardır.

Prototip deseninin fonksiyonel'e üstünlüğü şu şekildedir:

- Fonksiyonel desende, her objenin metodunda kendi kopyası bulunur. `this.sayHi = function(){...}` ve diğer metodlarının yapıcı metod'da kopyası oluşturulur.
- Prototip deseninde, `User.prototype` içindeki tüm metodlar kullanıcı objelerinde aynıdır. Objenin kendisi kendi verisini tutar.

Bundan dolayı prototip deseninin en hafıza-verimli desen olduğunu söyleyebiliriz.

...Sadece bu değil. Prototipler kalıtımı da çok etkin bir şekilde oluşturabilmemizi sağlar. Gömülü JavaScript objelerinin hepsi prototip kullanır. Ayrıca özel bir yazımla : "class", daha iyi bir yazım sağlar. Bunun yanında prototip desen'in diğer desenlere göre daha iyi olmasını sağlayan çok sayıda neden vardır.

## Sınıflar için prototip-tabanlı kalıtım.

Diyelim ki prototip-tabanlı sınıflarımız var.

`Rabbit`:

```js
function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype.jump = function() {
  alert(this.name + ' jumps!');
};

let rabbit = new Rabbit("My rabbit");
```

![](rabbit-animal-independent-1.png)

...ve `Animal`:

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  alert(this.name + ' eats.');
};

let animal = new Animal("My animal");
```

![](rabbit-animal-independent-2.png)

Şu anda her ikiside tamamen birbirinden bağımsızdır.

Fakat biz `Rabbit`'in `Animal`'dan türemesini istemekteyiz. Diğer bir deyişle `rabbits` `animal` tabanlı olmalıdır. `Animal`'ın metodlarına erişebilmeli ve bunları kendince, kendi metodlarında değiştirebilmelidir.

Bu prototip deseninde ne anlama gelmektedir?

Şimdiliki `rabbit` objelerinin metodları `Rabbit.prototype` içerisinde bulunur. Fakat biz `rabbit`'in `Animal.prototype`'ını "fallback" olarak kullanır, yani eğer `Rabbit.prototype`'  metod tanımlı değilse kullanır.

Bundan dolayı prototip zinciri şu anda `rabbit` -> `Rabbit.prototype` -> `Animal.prototype` şeklinde ilerler.

Aşağıdaki gibi:

![](class-inheritance-rabbit-animal.png)

Bunu hazırlayan kod ise şu şekildedir:

```js run
// Öncekinin aynısı
function Animal(name) {
  this.name = name;
}

// Tüm hayvanlar yer, değil mi?
Animal.prototype.eat = function() {
  alert(this.name + ' eats.');
};

// Rabbit'in aynısı
function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype.jump = function() {
  alert(this.name + ' jumps!');
};

*!*
// Kalıtım zinciri oluşturuluyor
Rabbit.prototype.__proto__ = Animal.prototype; // (*)
*/!*

let rabbit = new Rabbit("White Rabbit");
*!*
rabbit.eat(); // Rabbitler'de artık yiyebilir.
*/!*
rabbit.jump();
```

`(*)` prototip zincirinin oluşturulduğu yerdir. Bundan dolayı `rabbit` metodları önce `Rabbit.prototype`, sonra `Animal.prototype`'de arar. Diyelim ki `Animal.prototype` içerisinde de bulamadı bu durumda `Object.prototype` içeriisnde arar çünkü aslında `Animal.prototype`'da `Object` tabanlıdır.

Aşağıda tüm resmi görebilirsiniz:

![](class-inheritance-rabbit-animal-2.png)

## Özet

"class" terimi nesne tabanlı programlamadan gelir. JavaScript'te bu genelde sınıf desenine veya prototip desenine denk gelir. Prototip deseni daha güçlü ve hafıza-verimlidir, bundan dolayı tercih etmeniz önerilir.

Prototip desenine göre:
1. Metodlar `Class.prototype` içerisinde saklanır.
2. Prototipler birbirine kalıtılabilir.

Bir sonraki bölümde `class` terimi ve kurulumu gösterilecektir. Bu prototip sınıflarının daha kolay yazılabilmesini sağlar, bunun yanında ek yararlara sahiptir.
