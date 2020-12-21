# Objelerin metodları ve "this" kelimesi.

Objeler genelde dünyada var olan şeyler gibidirler, kullanıcılar, emirler, vs.

```js
let kullanici = {
  isim: "İhsan",
  yas: 30
};
```

Kullanıcıların *işlem* yapma yetenekleri vardır: alışveriş sepeti, giriş, çıkış vs.

Bu aksiyonlar Javascript'te özellikler için fonksiyon kullanarak çözülür.


[cut]

## Metod Örnekleri

Başlangıç olarak `kullanici` merhaba desin:

```js run
let kullanici = {
  isim: "İhsan",
  yas: 30
};

*!*
kullanici.selamVer = function() {
  alert("Merhaba");
};
*/!*

kullanici.selamVer(); // Merhaba
```
Burada Fonksiyon ifadesi ile fonksiyon yaratıldı ve `kullanici.selamVer` özelliğine atandı.

<<<<<<< HEAD
Ardından bu metod çağırıldı ve kullanıcı selam verdi.

Bir objenin özelliği olan fonksiyona *metod* denir.

Öyleyse `kullanici` objesinin `selamVer` metodu bulunmaktadır.
=======
Here we've just used a Function Expression to create a function and assign it to the property `user.sayHi` of the object.

Then we can call it as `user.sayHi()`. The user can now speak!

A function that is a property of an object is called its *method*.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Tabii ki metodları önceden tanımlanmış fonksiyonlarla da oluşturabilirsiniz. Örneğin:

```js run
let kullanici = {
  // ...
};

*!*
// önce tanımla
function selamVer() {
  alert("Merhaba!");
};

// Sonra bunu metod olarak objeye ekle
kullanici.selamVer = selamVer;
*/!*

kullanici.selamVer(); // Merhaba!
```

<<<<<<< HEAD
```smart header="Nesne Tabanlı Programlama"

Varlıkların obje olarak tanımlandığı dillere  [obje tabanlı diller](https://en.wikipedia.org/wiki/Object-oriented_programming), kısaca: "OOP"(Objet-Oriented Programming)

OOP kendi başına kitaplar dolusu anlatılacak bir konudur. Nasıl doğru varlıklar seçilmeli? Bu varlıklar arasında nasıl bir iletişim olmalı? Mimarisi nasıl olmalı, gibi konuların her birisi ile ilgili ayrı ayrı kitaplar bulunmaktadır. Örneğin "Design Patterns: Elements of Reusable Object-Oriented Software" by E.Gamma, R.Helm, R.Johnson, J.Vissides or "Object-Oriented Analysis and Design with Applications" by G.Booch, vs. Bu kitapta <info:object-oriented-programming> sadece başlangıç seviyesinde anlatılacaktır.
=======
```smart header="Object-oriented programming"
When we write our code using objects to represent entities, that's called [object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming), in short: "OOP".

OOP is a big thing, an interesting science of its own. How to choose the right entities? How to organize the interaction between them? That's architecture, and there are great books on that topic, like "Design Patterns: Elements of Reusable Object-Oriented Software" by E. Gamma, R. Helm, R. Johnson, J. Vissides or "Object-Oriented Analysis and Design with Applications" by G. Booch, and more.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f
```
### Metod Kısayolu

Metodları yaratmak için daha kolay bir kullanım mevcuttur:

```js
// aşağıdaki objeler aynı işleri yapar.

let kullanici = {
  selamVer: function() {
    alert("Merhaba");
  }
};

// kısa yolu daha güzel görünüyor değil mi?
let kullanici = {
*!*
  selamVer() { // "selamVer: function()" ile aynı
*/!*
    alert("Merhaba");
  }
};
```

Yukarıda da gösterildiği gibi `"function"` pas geçilerek sadece `selamVer()` yazılabilir.

Doğrusunu söylemek gerekirse iki fonksiyonda birbiri ile aynı. Altta yatan farklılık ise kalıtım ile alakalı ki bu da şimdilik bir sorun teşkil etmiyor. Çoğu durumda kısa yazım tercih edilmektedir.


## Metodlarda `this` kullanımı

Obje metodlarının objelerde bulunan diğer bilgilere ulaşması çok büyük bir gerekliliktir. 
Örneğin `kullanici.selamVer()` `kullanici` ismine ihtiyaç duyar.


**Objeye ulaşabilmek içim metod `this` kelimesine ihtiyaç duyar.**

"noktadan önce" yazılan `this` o objeye referans verir. Örneğin:

```js run
let kullanici = {
  isim: "İhsan",
  yas: 30,

  selamVer() {
*!*
<<<<<<< HEAD
    alert(this.isim);
=======
    // "this" is the "current object"
    alert(this.name);
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f
*/!*
  }

};

kullanici.selamVer(); // İhsan
```

Yukarıda `kullanici.selamVer()` fonksiyonu çalıştırılırken `this` `kullanici` olacaktır.

Teknik olarak `this` olmadan da objenin özelliklerine erişmek mümkündür. Bu dıştaki değişkene referans vererek yapılabilir:

```js
let kullanici = {
  isim: "İhsan",
  yas: 30,

  selamVer() {
*!*
    alert(kullanici.isim); // "this" yerine "kullanici" kullanılmıştır.
*/!*
  }

};
```
... Fakat böyle bir koda güvenilez. Diyelim ki `kullanici` objesini kopyaladınız ve `yonetici = kullanici` yaptınız. Sonra `kullanici` objesinin üzerine yazdınız bu durumda yanlış objeye erişmiş olacaksınız. Bir örnekle açıklamak gerekirse:

```js run
let kullanici = {
  isim: "İhsan",
  yas: 30,

  selamVer() {
*!*
    alert( kullanici.isim ); // hataya neden olur
*/!*
  }

};


let yonetici = kullanici;
kullanici = null; 

<<<<<<< HEAD
yonetici.selamVer(); // `selamVer()` içerisinde `kullanici` kullanıldığından dolayı hata verecektir.
=======
*!*
admin.sayHi(); // TypeError: Cannot read property 'name' of null
*/!*
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f
```

Eğer `kullanici.isim` yerine `this.isim` yazmış olsaydınız kod çalışacaktı.


<<<<<<< HEAD
## "this" bağımsız bir şekilde kullanılabilir.

Diğer dillerden farklı olarak "this" kelimesi yer gözetmeksizin kullanılabilir. Her fonksiyonun içinde kullanılabilir.

Aşağıdaki kodda bir yazım hatası yoktur:
=======
In JavaScript, keyword `this` behaves unlike most other programming languages. It can be used in any function, even if it's not a method of an object.

There's no syntax error in the following example:
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

```js
function selamVer() {
  alert( *!*this*/!*.isim );
}
```

<<<<<<< HEAD
`this`'in değeri çalışma anında değerlendirilir. Herşey olabilir.
=======
The value of `this` is evaluated during the run-time, depending on the context.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Örneğin `this` farklı objelerden çağırıldıklarında değerler alabilirler:

```js run
let kullanici = { isim: "İhsan" };
let yonetici = { isim: "Macide" };

function selamVer() {
  alert( this.isim );
}

*!*
// aynı fonksiyonu iki farklı objeye atandı.
kullanici.f = selamVer;
yonetici.f = selamVer;
*/!*

// iki fonksiyon da farklı `this` e sahip.
// "noktadan" önceki "this" objeye referans verir.
kullanici.f(); // İhsan  (this == kullanici)
yonetici.f(); // Yonetici  (this == yonetici)

yonetici['f'](); // Köşeli parantez veya noktalı yazım farketmez, her ikisi de çalışır.
```

````smart header="Obje olmadan çağırma: `this == undefined`"
Aslında fonksiyonu obje olmadan da çağırmak mümkündür.

```js run
function selamVer() {
  alert(this);
}

selamVer(); // tanımsız
```
Sıkı modda `this` `undefined` döndürür. Eğer `this.isim` yazılırsa hata verir.

Normal modda ise ( `use strict` unutulursa) `this` değeri *global obje* olur. Tarayıcı için bu `window`dur. Bu konuya daha sonra değinilecektir.


<<<<<<< HEAD
Obje olmadan `this` çağırmak normal değildir, bir programlama hatasıdır. Eğer fonksiyon `this` içeriyorsa, o objenin dahilinde çağırılabileceği anlamı çıkar.
=======
Usually such call is a programming error. If there's `this` inside a function, it expects to be called in an object context.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f
````

```smart header="Sınırsız `this` kullanmanın yan etkileri"

<<<<<<< HEAD
Diğer programlama dillerinden geliyorsanız, "bağımlı `this`" kullanımına alışmış olmalısınız. Metod içerisinde kullanılan `this`  her zaman o objeye referans olur.

JavaScript'te `this` bağımsızdır. Değeri çalışma anında belirlenir, hangi metodda yazıldığı önemli değildir, önemli olan "noktadan önceki" objedir.

Çalışma anında `this` kullanılabilmesinin artıları ve eksileri vardır. Bir taraftan fonksiyonlar diğer objelerde de kullanılabilirken, diğer yönden bu kadar esneklik hatalara neden olabilmektedir.

Burada amacımız programlama dilininin dizaynının kötü veya iyiliği değildir. Amaç nasıl çalıştığını anlayıp, nerelerde yarar nerelerde zarar getirileceğini bilmektir.

```

## Dahili Özellikler: Referans Tipleri

```warn header="Derinlemesine dil özellikleri"
Bu bölüm daha derinlemesine konuları içermektedir. 

Daha hızlı ilerlemek istiyorsanız bu bölümü geçebilir veya daha sonraya erteleyebilirsiniz.
```
Girift metod çağrıları `this` kelimesini kaybedebilir, örneğin:

```js run
let kullanici = {
  isim: "İhsan",
  selamVer() { alert(this.isim); },
  yolcuEt() { alert("Güle Güle"); }
};

kullanici.selamVer(); // Basit metod beklendiği gibi çalışır

*!*
// Şimdi isme göre selamVersin veya yolcuEt'sin.
(kullanici.isim == "İhsan" ? kullanici.selamVer : kullanici.yolcuEt)(); // Hata!
*/!*
```

Son satırda kullanıcı ismine göre `kullanici.selamVer` veya `kullanici.yolcuEt` cagrilir. `kullanici.selamVer` `()` ile çağrıldığında çalışmaz. 

Bunun nedeni çağrı içerisinde `this`'in `undefined` olmasıdır.

Aşağıdaki çalışır:
```js
kullanici.selamVer();
```
Aşağıdaki kod metodu çalıştırmaz:
```js
(kullanici.isim == "İhsan" ? kullanici.selamVer : kullanici.yolcuEt)(); // Hata!
```

Neden? Eğer bunun derinliklerine inmek isterseniz öncelikle bakmanız gereken yer `obj.method()` çağrısı olmalıdır.

Peki bu `obj.method()` cümlesi ne yapar:

1. `'.'` özelliği alır
2. `()` bu özelliği çalıştırır.

Peki `this` ilk bölümden ikincisine nasıl geçer?

Eğer bu olayı iki farklı satırda gösterecek olursak, `this` bu durumda kaybolacaktır:

```js run
let kullanici = {
  isim: "İhsan",
  selamVer() { alert(this.isim); }
}

*!*
// metodu alma ve çağırma iki satırda gösterilecek olursa
let selamVer = kullanici.selamVer;
selamVer(); // hata!, tanımsız
*/!*
```
Burada `selamVer = kullanici.selamVer` fonksiyonu değişkene atar, sonra son satırdaki yapılan ise tamamen ilkinden farklıdı. Bundan dolayı `this` bulunmamaktadır.

**`kullanici.selamVer()` çağrısının çalışabilmesi için bir çözüm bulunmaktadır. `'.'` fonksiyon değil [Referans Tipi] döndürmektedir.(https://tc39.github.io/ecma262/#sec-reference-specification-type)**

Referans Tipi "şartname tipidi". Doğrudan kullanılamaz, dil kendince kullanabilir bu tipleri.

Referans Tipi üç değerin birleşmesi ile oluşur `(base, name, strict)`:

- `base` objedir.
- `name` özelliktir.
- `strict` eğer `use strict` kullanılmışsa `true` olur.

`kullanici.selamVer` erişimi fonksiyon değil Referans Tipi döndürür. Sıkı mod kullanıldığında `kullanici.selamVer` aşağıdaki gibi döner:

```js
// Referans Tipi değeri
(kullanici, "selamVer", true)
```

Referans Tipinde `()` çağrıldığında obje ve onun metodu hakkında tüm bilgileri alınır ve `this` (bizim durumumuzda `kullanici` ) belirlenir.

Atama gibi işlemler `selamVer = kullanici.selamVer` referans tipini tamamen iptal eder, `kullanici.selamVer`(fonksiyon) değerini alır ve bunu paslar. Bu şekilde de `this` tanımsız kalır.

Bundan dolayı `this` in çalışabilmesi için metodun doğrudan `obj.metod()` şeklinde veya `obj[metod]()` şeklinde çalıştırılması gerekmektedir.

## Ok fonksiyonlarında "this" bulunmamaktadır.

Ok fonksiyonları özeldir: Kendilerinin `this`'i bulunmaz. Eğer yine de `this` kullanırsanız ok fonksiyonu dışındaki bölümü `this` olarak alır.
=======
In JavaScript `this` is "free", its value is evaluated at call-time and does not depend on where the method was declared, but rather on what object is "before the dot".

The concept of run-time evaluated `this` has both pluses and minuses. On the one hand, a function can be reused for different objects. On the other hand, the greater flexibility creates more possibilities for mistakes.

Here our position is not to judge whether this language design decision is good or bad. We'll understand how to work with it, how to get benefits and avoid problems.
```

## Arrow functions have no "this"
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Örneğin aşağıdaki `ok()` dışarıda bulunan `kullanici.selamVer()` metodunu kullanmaktadır:


```js run
let kullanici = {
  isim: "İhsan",
  selamVer() {
    let ok = () => alert(this.isim);
    ok();
  }
};

kullanici.selamVer(); // İhsan
```
Bu ok fonksiyonlarının bir özelliğidir. Ayrı bir `this` kullanmak yerine her zaman bir üstteki bölümden `this` i alması baya kullanışlıdır. <info:arrow-functions> bölümü içerisinde bu konu derinlemesine incelenecektir.

## Özet

- Objeler içerisinde saklanan fonksiyonlara "metod" denir.
- Metodlar objelerin `obje.biseylerYap()` seklinde çalışabilmesini sağlar.
- Metodlar objelere `this` şekline referans verebilir.

<<<<<<< HEAD
`this`'in değeri çalışma zamanında tanımlanır.
- Fonksiyon tanımlanırken `this` kullanabilir, fakat `this` bu metod çalışmadığı müddetçe bir anlam ifade etmez.
- O fonksiyon objeler arasında kopyalanabilir.
- Fonksiyon metod yazım şekliyle çağırıldığında `obje.metod()`, `this`'in değeri bu çağrı boyunca `obje`'dir.
=======
The value of `this` is defined at run-time.
- When a function is declared, it may use `this`, but that `this` has no value until the function is called.
- A function can be copied between objects.
- When a function is called in the "method" syntax: `object.method()`, the value of `this` during the call is `object`.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Ok fonksiyonlarında `this` bulunmamaktadır. Eğer bu fonksiyonlar içerisinde `this` çağırılırsa bunun değeri dışarıdan alınır.
