
# Sınıflar

"class" yapısı prototip-tabanlı sınıfların temiz ve güzel bir yazıma sahip olmasını sağlar.

[cut]

## "class" Yazımı 

`class` yazımı oldukça değişkendir. Öncelikle en basit olanıyla başlayalım

Aşağıda prototip-bazlı `User` sınıfını görmektesiniz:

```js run
function User(name) {
  this.name = name;
}

User.prototype.sayHi = function() {
  alert(this.name);
}

let user = new User("John");
user.sayHi();
```

...Aşağıda ise bunun `class` yazımıyla tekrar yazılmış hali bulunmaktadır:

```js run
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

let user = new User("John");
user.sayHi();
```
İkisinin de aynı olduğu kolayca görülmektedir. Dikakat ederseniz class içerisindeki metodların arasında virgül yoktur. Bazen bunu unutabilirsiniz bu durumda `class` çalışmayackatır. Bu normal obje değildir, sadece  `class` yazımıdır.

Peki `class` tam olarak ne işe yarar? Eğer dil-seviyesinde yeni bir varlık olarak algılarsanız yanlış olur.

Burada `class User{....}` aslında iki şey yapıyor:

1. `"constructor"` fonksiyonunu referens alan veren bir `User` değişkeni oluşturur.
2. Tanımındakileri `User.prototype`'a koyar. Burada `sayHi` ve `constructor`'u içerir.

Sınıf daha derinlemesine incelenirse aslında şu şekildedir:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name);  }
}

*!*
// kanır: User constructor(yapıcı) fonksiyondur.
*/!*
alert(User == User.prototype.constructor); // true

*!*
// Kanıt: "prototipte" iki tane metod vardır.
*/!*
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

Aşağıda `class User` in yarattıkları hakkında bir görsel bulunmaktadır:

![](class-user.png)


`class` demekki yapıcı metod ve prototip metodlarını tanımlayan özel bir yazımdır.

...Sadece bu değil. Küçük bazı farklılıkları da vardır:

Yapıcılar `new`'e ihtiyaç duyarlar. Normal fonksiyonların aksine bir sınıfın `constructor`'(yapıcı)u `new` olmadan çağırılamaz:

```js run
class User {
  constructor() {}
}

alert(typeof User); // function
User(); // Hata: Sınıf yapıcı User `new` olmadan uyarılamaz.
```

Farklı karakter dizisi çıktıları
: Eğer `alert(User)` gibi çıktı verirsek, bazı javascript motorları bunu `"class User..."`, bazıları ise `"function User..."` şeklinde gösterir.

Karakter dizisi gösterimleri farklılık gösterse bile bunlar hala fonksiyondur ve JavaScript dilinde "class" diye varlık(entity) yoktur.

Sınıf metodları döngülenemezler
: Bir Class tanımı  `"prototype"`'da bulunan tüm metodların `enumerable`(döngülenebilir) bayrağını `false` yapar. Bu iyidir çünkü eğer objeyi `for..in` ile dönersek aslında sınıf metodlarını istemeyiz.

Sınıflar varsayılan olarak `constructor(){}`'a sahiptirler.
: Eğer `class` içerisinde `constructor` bulunmazsa, boş bir ofnksiyon üretilir ve sanki biz `constructor(){}` yazmışız gibi çalışır.

Sınıflar her zaman `use strict` kullanır.
: Sınıf içerisindeki tüm kodlar otomatik olarak `sıkı` moda tabidir.

### Alıcı/ayarlayıcılar

Sınıflar alıcı/ayarlayıcıları da içerebilirler. Aşağıdaki `user.name` bunun uygulamasını gösterir:

```js run
class User {

  constructor(name) {
    // invokes the setter
    this.name = name;
  }

*!*
  get name() {
*/!*
    return this._name;
  }

*!*
  set name(value) {
*/!*
    if (value.length < 4) {
      alert("Name too short.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

user = new User(""); // Name too short.
```
İçindeki alıcı/ayarlayıcılar aslında `User` prototipinde yaratılırlar, aşağıdaki gibi:

```js
Object.defineProperty(User.prototype, {
  name: {
    get() {
      return this._name
    },
    set(name) {
      // ...
    }
  }
});
```
### Sadece metodlar

Obje değişmezlerinden farklı olarak `özellik:değer` sınıf içerisinde tanımlanamaz. Sadece metodlar ve alıcı/ayarlayıcılar. Şartnamede bu sınırlamayı kaldırmak için bazı çalışmalar bulunmakla beraber henüz bitirilmemiştir.

Eğer gerçekten fonksiyon olmayan değerleri prototip'e koymak istiyorsanız, `prototype`'ı açağıdaki gibi değiştirmeniz gerekmektedir:

```js run
class User { }

User.prototype.test = 5;

alert( new User().test ); // 5
```
Yani teknik olarak bu mümkündür, fakat bunu neden yaptığınıza emin olmalısınız. Çünkü böyle özellikler bu sınıfın tüm objelerinde paylaşılacaktır.

Sınıf içerisinde bunun alternatifi ise alıcı kullanmaktır:

```js run
class User {
  get test() {
    return 5;
  }
}

alert( new User().test ); // 5
```
Dışta ise kullanımı aynıdır. Fakat alıcı ile yazılan varyasyonu biraz daha yavaştır.

## Sınıf İfadeleri

Sınıflar da fonksiyonlar gibi diğer ifadelerin içerisinde tanımlanabilir, başka yerlere gönderilebilir, döndürülebilir vs.

Aşağıdaki sınıf fonksiyon döndürmektedir:

```js run
function makeClass(phrase) {
*!*
  // sınıf tanıma ve bunu döndür.
  return class {
    sayHi() {
      alert(phrase);
    };
  };
*/!*
}

let User = makeClass("Hello");

new User().sayHi(); // Hello
```
Aslında `sınıf`'ın sadece prototipe sahip fonksiyonun özel bir yazımı olduğunu hatırlarsanız bunun çok normal olduğu bellidir.

Ayrıca, isimli fonksiyon ifadeleri gibi, sınıfların da isimleri olabilir ve bunlar sadece sınıf içerisinden erişilebilir.

```js run
// "İsimli Sınıf tanımı" (böyle bir tanım yok ama bundan sonra bu şekliyle devam edeceğiz.)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); //MyClass sadece sınıf içerisinden erişilebilir.
  }
};

new User().sayHi(); // Çalışır ve MyClass tanımını gösterir.

alert(MyClass); // hata, MyClass sınıfın dışarından erişilemez.
```

## Statik metodlar

Sınıf fonksiyonlarına ayrıca metodlar atamak da mümkündür. Ama bu `"prototipine" atanmaz. Bu tür metodlar *static* olarak adlandırılır.

Örneğin:

```js run
class User {
*!*
  static staticMethod() {
*/!*
    alert(this == User);
  }
}

User.staticMethod(); // true
```
Aslında fonksiyon özelliği atamak ile aynı işi yapar.

```js
function User() { }

User.staticMethod = function() {
  alert(this == User);
};
```

`User.staticMethod()` içerindeki `this` sınıf yapıcı `User`'dır yani kendisi.

Genelde statik metodlar sınıfa ait olan fonksiyonların uygulamasında kullanılır, fakat bunun herhangi bir objesinde kullanılmaz.

Örneğin `Article` objelerimiz olsun ve bunların karşılaştırılması için bir fonksiyon yazalım. Bunun doğal çözümü `Article.compare` diye bir metod yazmaktır:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
*/!*
}

// usage
let articles = [
  new Article("Mind", new Date(2016, 1, 1)),
  new Article("Body", new Date(2016, 0, 1)),
  new Article("JavaScript", new Date(2016, 11, 1))
];

*!*
articles.sort(Article.compare);
*/!*

alert( articles[0].title ); // Body
```

Burada `Article.compare` `Article`'ların üzerinde bunları karşılaştırmak için gerekmektedir. Article`ın bir metodu olmaktan ziyada tüm sınıfındır.

Diğer bir örnek ise çokça dile getirilen "factory" sınıflarıdır. Article üretmek için bir kaç yol bulunmaktadır:

1. Verilen parametrelerle (`title`, `date` etc).
2. Bu günün tarihi ile boş bir obje üret.
3. ...

Birincisi yapıcı metodu uygulamaktır. İkincisi ise metodun bir statik metoduyla çözülebilir.

Örneğin `Article.createTodays()`:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static createTodays() {
    // remember, this = Article
    return new this("Todays digest", new Date());
  }
*/!*
}

let article = Article.createTodays();

alert( article.title ); // Todays digest
```
Artık ne zaman bugünün makalelerini istesrek sadece `Article.createTodays()` çağırmamız yeterlidir. Tekrardan bu metod article'ın değil aslında tüm sınıfın bir metodudur.

Statik metodlar ayrıca veritabanı-ilintili sınıflarda arama/kaydetme/silme gibi işlerde kullanılabilir.

```js
// Article'ın article'ları düzenleyen bir sınıf olduğunu varsayalım.
// Article'ları silen statik metod şu şekildedir.
Article.remove({id: 12345});
```

## Özet

Basit sınıf yazımı şu şekildedir:

```js
class MyClass {
  constructor(...) {
    // ...
  }
  method1(...) {}
  method2(...) {}
  get something(...) {}
  set something(...) {}
  static staticMethod(..) {}
  // ...
}
```
`MyClass`'ın değeri yapıcı olarak sağlanır. Eğer `yapıcı` yoksa, boş fonksiyon döner.

Her durumda, sınıf tanımında yer alan methodlar `prototip`'in bir üyesi olur, bunun bir istisnası statik sınıflardır. Statik sınıflar doğrudan `MyClass.staticMetod()` olarak çağrılabilir. Statik metodlar sınıfın fonksiyona bağlanmak istediğinde kullanılır. Objelerinde kullanılmaz.

Bir sonraki bölümde kalıtım ve sınıflar hakkında daha geniş bilgi verilecektir