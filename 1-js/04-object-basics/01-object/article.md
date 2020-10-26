
# Objeler

<<<<<<< HEAD
<info:types> bölümünde hatırlanacağı üzere, JavaScript'te yedi tane farklı tip olduğundan bahsedilmşiti. Altı tanesi "basit" tipler, değerleri sadece tek birşeye eşit olabilir. ( karakter dizisi, sayı vs.)
=======
As we know from the chapter <info:types>, there are eight data types in JavaScript. Seven of them are called "primitive", because their values contain only a single thing (be it a string or a number or whatever).
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

Buna karşın objeler anahtar bilgileri ile değerlerini tutar ve daha karmaşık veri yapıları oluşturabilirler. JavaScript'te bu objeler dilin neredeyse her alanına etki etmiş durumdadır. Bundan dolayı daha derinlere inmeden nasıl çalıştıklarının öğrenilmesi gerekmekte.

[cut]

Obje `{...}` işareti ile yaratılabilir. Objenin kendine has *özellikleri* mevcuttur. Bir özellik anahtar:değer ikilisinden oluşur. `key`( anahtar) genelde karakter dizisi olur ve "özellik ismi" olarak adlandırılır. Değer ise herhangi bir tip olabilir.

<<<<<<< HEAD
Obje bir dolap gibi düşünülebilir. Bu dolabın içindeki her klasörün bir ismi var ve bu isme göre içinde değerler mevcut. Bu `key`(anahtar) değerine göre dosyayı bulmak, eklemek ve silmek daha kolay olacaktır.
=======
![](object.svg)
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

![](object.svg)

Boş obje ( boş dolap ) iki türlü oluşturulabilir.

```js
let kullanici = new Object(); 
let kullanici = {}; 
```

![](object-user-empty.svg)

Genelde `{...}` kullanılmaktadır. Bu şekilde tanımlamaya **obje kelimesi**

## **kelimeler** ve özellikler

Doğrudan `{...}` içerisine "anahtar:değer" ikilisi ile özellik eklemek mümkündür:

```js
let kullanici = {     // obje
  isim: "Mahsun",  // isim anahtarı, Mahsun değerini tutar.
  yas: 30        // yaş anahtarı 30 değerini tutar.
};
```
Özellik obje anahtarı ve değerden oluşur. Obje anahtarı (tanımlayıcısı) `":"`'den önce tanımlanmalı değeri ise `":"` den sonra.

`kullanici` objesinde iki tip özellik vardır.

1. İlk özellik `"isim"` anahtarına sahiptir ve değeri `"Mahsun"`'dur.
2. İkinci özellik ise `"yaş"` anahtarına sahiptir ve değeri `30` dur.

`kullanici` objesi bir dolap ve içinde "isim" ve "yaş" değerlerinin olduğu iki klasör olarak hayal edilebilir.

<<<<<<< HEAD
![kullanici objesi](object-user.svg)
=======
![user object](object-user.svg)
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

Bu klasörleri istediğimiz zaman okuyabilir, yazabilir ve silebiliriz.

Özellik değerlerine `.` yazımı ile ulaşılabilir.

```js
<<<<<<< HEAD
// objenin özellikleri:
alert( kullanici.isim ); // Mahsun
alert( kullanici.yas ); // 30
=======
// get property values of the object:
alert( user.name ); // John
alert( user.age ); // 30
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5
```
Değer her tipten olabilir. Boolean değeri aşağıdaki gibi eklenebilir :

```js
kullanici.adminMi = true;
```

<<<<<<< HEAD
![kullanici objesi 2](object-user-isadmin.svg)
=======
![user object 2](object-user-isadmin.svg)
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

`delete` operatörü ile bir özellik silinebilir:

```js
delete kullanici.yas;
```

<<<<<<< HEAD
![kullanici objesi 3](object-user-delete.svg)
=======
![user object 3](object-user-delete.svg)
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

Birkaç kelimeden oluşan özellik ismi yazabilirsiniz. Fakat bu durumda anahtar çift tırnak içine alınmalıdır:

```js
let kullanici = {
  isim: "Mahsun",
  yas: 30,
  "Nemrudun Kızı": true  // birkaç kelimeden oluştuğunda görüldüğü üzere tırnak içine alınması gerekmektedir.
};
```

![](object-user-props.svg)


````smart header="Virgül"
Her özellikten sonra virgül konulmalıdır. Son özellikten sonra virgül ile bitirilebilir.

```js
let kullanici = {
  name: "Mahsun",
  age: 30*!*,*/!*
}
```
Bu vigüle "bekletme" virgülü denir. Böylece yeni özellik ekleme veya silme daha kolay olur. Çünkü tüm satırlar aynıdır.
````

<<<<<<< HEAD
## Köşeli parantez
=======
````smart header="Object with const can be changed"
Please note: an object declared as `const` *can* be modified.

For instance:

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

It might seem that the line `(*)` would cause an error, but no. The `const` fixes the value of `user`, but not its contents.

The `const` would give an error only if we try to set `user=...` as a whole.

There's another way to make constant object properties, we'll cover it later in the chapter <info:property-descriptors>.
````

## Square brackets
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

Eğer özellik anahtarı birkaç kelimeden oluşuyorsa nokta ile bu özelliğe erişilemez:

```js run
// yazım hatası
kullanici.Nemrudun Kızı = true
```
Çünkü `.` aslında bir değişken ismi beklemektedir. Değişken tanımlarken boşluk ve başka sınırlamalar aynen `.` yazımı için de geçerlidir.

<<<<<<< HEAD
Bunun yerine köşeli parantez yazımı ile bunu çözebilirsiniz:
=======
JavaScript doesn't understand that. It thinks that we address `user.likes`, and then gives a syntax error when comes across unexpected `birds`.

The dot requires the key to be a valid variable identifier. That implies: contains no spaces, doesn't start with a digit and doesn't include special characters (`$` and `_` are allowed).

There's an alternative "square bracket notation" that works with any string:
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

```js run
let kullanici = {};

// değer ata
kullanici["Nemrudun Kızı"] = true;

// değer al
alert(kullanici["Nemrudun Kızı"]); // true

// sil
delete kullanici["Nemrudun Kızı"];
```

Herşey beklendiği gibi çalışıyor. Dikkat ederseniz köşeli parantez içerisindeki kelimeler tırnak içerisinde yazılır, tek tırnak veya çift tırnak önemli değildir. Her ikisi de aynı görevi görür.

Bunun yanında aşağıdaki gibi değişken üzerinden de gidilebilir:

```js
let anahtar = "Nemrudun Kızı";

// kullanici["Nemrudun Kızı"] = true; //ile aynı
kullanici[anahtar] = true;
```
Burada `anahtar` çalışma anında veya kullanıcının gireceği değere göre atanır. Sonrasında istenen özelliğe erişmek için kullanılabilir. Nokta yazımı köşeli parantez kadar etkin değildir. Köşeli parantez esneklik sağlar.

<<<<<<< HEAD
Örneğin:
=======
Here, the variable `key` may be calculated at run-time or depend on the user input. And then we use it to access the property. That gives us a great deal of flexibility.

For instance:
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

```js run
let kullanici = {
  isim: "Mahsun",
  yas: 30
};

let anahtar = prompt("Kullanıcı hakkında ne bilmek istiyorsun?", "isim");

// değişkene göre değer alınır.
alert( kullanici[anahtar] ); // Mahsun (eğer "isim" girerse )
```

The dot notation cannot be used in a similar way:

```js run
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined
```

### Hesaplanmış Özellikler

<<<<<<< HEAD
Obje tanımında da köşeli parantez kullanabiliriz. Buna **Hesaplanmış Özellikler** ( Computed Properties ) denir.
=======
We can use square brackets in an object literal, when creating an object. That's called *computed properties*.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

Örneğin:

```js run
let meyve = prompt("Hangi meyveyi istersin?", "elma");

let poset = {
*!*
  [meyve]: 5, // meyve değişkeninden objenin anahtarı alınıyor.
*/!*
};

alert( poset.elma ); // eğer meyve "elma" girildiyse 5 değeri döner.
```

Hesaplanmış özelliklerin anlamı basittir: `[meyve]`, özellik isminin `meyve` değişkeninden alınması gerektiğini bildirir.

Öyleyse eğer kullanıcı `"elma"` değerini girerse `poset` `{elma:5}` olacaktır.

Aslında aşağıdaki ile aynı şekilde çalışacaktır:
```js run
let meyve = prompt("Hangi meyveyi istersin?", "elma");
let poset = {};

// meyve değişkeninden objenin anahtarı alınıyor.
poset[meyve] = 5;
```

...fakat biraz daha iyi görünür.

Köşeli parantez içerisinde daha karmaşık ifadeler de kullanabilirsiniz:

```js
let meyve = 'elma';
let poset = {
  [meyve + 'Yedim']: 5 // poset.elmaYedim = 5
};
```
Köşeli parantez nokta yazımına göre çok daha güçlüdür. Her türlü özellik ismini ve değişkeni desteklerler. Fakat yazımı biraz  gariptir.

<<<<<<< HEAD
Eğer özellik isimleri tek kelime ise çoğunlukla nokta yazımı kullanılır. Eğer daha karmaşık ise bu durumda köşeli parantez kullanılır.

````smart header="JavaScript dili için ayrılmış kelimeler obje içerisinde kullanılabilir."

Değişken ismi  `for`,`let`,`return` gibi dil için ayrılmış kelimelerden oluşamaz. 

Fakat obje özellikleri için böyle bir sınırlama yoktur. Değişken her türlü adlandırılabilir.

```js run
let obj = {
  for: 1,
  let: 2,
  return: 3
}

alert( obj.for + obj.let + obj.return );  // 6
```
Temelde tüm isimlere izin verilir, fakat bir tane özel isim vardır `"__proto__"` bu özel bir davranış sergiler. Örneğin obje olmayan değeri atayamazsınız:

```js run
let obj = {};
obj.__proto__ = 5;
alert(obj.__proto__); // [object Object], beklendiği gibi çalışmadı.
```
Kodda göründüğü üzere, 5, ilkel bir tip olduğundan dolayı atanamadı ve görmezden gelindi.

Bundan dolayı eğer kullanıcıya `anahtar` tanımlattırılırsa bu aslında hatalara ve güvenlik açıklarına neden olabilir.

Böyle bir durumda kullanıcı "__proto__" seçerse tüm mantık yukarıdaki gibi çalışmaz hale gelir.

`__proto__`'yu normal özellik olarak tanıtma yöntemi de bulunmaktadır, bunu ilerleyen zamanlarda işlenecektir. 

Farklı bir veri yapısı daha vardır  [Map](info:map-set-weakmap-weakset). Bu <info:map-set-weakmap-weakset> bölümünden incelenebilir, ki bu her türlü anahtarı kabul eder.
````


## Özellik değeri kısaltması
=======
Square brackets are much more powerful than the dot notation. They allow any property names and variables. But they are also more cumbersome to write.

So most of the time, when property names are known and simple, the dot is used. And if we need something more complex, then we switch to square brackets.

## Property value shorthand
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

Kod yazarken genelde var olan değişkenleri özelliklere isim olarak atarız.

Örneğin:

```js run
function kullaniciOlustur(isim, yas) {
  return {
<<<<<<< HEAD
    isim: isim,
    yas: yas
    // ...diğer özellikler
=======
    name: name,
    age: age,
    // ...other properties
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5
  };
}

let kullanici = kullaniciOlustur("Mazlum", 30);
alert(kullanici.isim); // Mazlum
```

Yukarıdaki örnekte özellikler değişkenler ile aynı isme sahipler. Bu çeşit kullanım çok yaygındır, hatta bundan dolayı *kısaltma* bile yapılmıştır.
`isim:isim` yazmak yerine sadece `isim` yazılabilir:

```js
function kullaniciOlustur(isim, yas) {
*!*
  return {
<<<<<<< HEAD
    isim, //  isim: name ile aynı
    yas   // age: age ile aynı
=======
    name, // same as name: name
    age,  // same as age: age
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5
    // ...
  };
*/!*
}
```
Aynı obje içerisinde kısaltma ve normal versiyonu kullanılabilir:

```js
let kullanici = {
  isim,  // isim:isim ile aynı.
  yas: 30
};
```

<<<<<<< HEAD
## Varlık kontrolü

Bir objedeki her özellik erişilebilirdir. Eğer o özellik olmasa bile hata vemez!!! Olmayan bir özelliğe ulaşmaya çalıştığınızda `undefined` değeri döner. Bu da kolayca o özelliğin olup olmadığını kontrol etmenizi sağlar.
=======

## Property names limitations

As we already know, a variable cannot have a name equal to one of language-reserved words like "for", "let", "return" etc.

But for an object property, there's no such restriction:

```js run
// these properties are all right
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

In short, there are no limitations on property names. They can be any strings or symbols (a special type for identifiers, to be covered later).

Other types are automatically converted to strings.

For instance, a number `0` becomes a string `"0"` when used as a property key:

```js run
let obj = {
  0: "test" // same as "0": "test"
};

// both alerts access the same property (the number 0 is converted to string "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (same property)
```

There's a minor gotcha with a special property named `__proto__`. We can't set it to a non-object value:

```js run
let obj = {};
obj.__proto__ = 5; // assign a number
alert(obj.__proto__); // [object Object] - the value is an object, didn't work as intended
```

As we see from the code, the assignment to a primitive `5` is ignored.

We'll cover the special nature of `__proto__` in [subsequent chapters](info:prototype-inheritance), and suggest the [ways to fix](info:prototype-methods) such behavior.

## Property existence test, "in" operator

A notable feature of objects in JavaScript, compared to many other languages, is that it's possible to access any property. There will be no error if the property doesn't exist!

Reading a non-existing property just returns `undefined`. So we can easily test whether the property exists:
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

```js run
let kullanici = {};

alert( kullanici.olmayanOzellik === undefined ); // true "böyle bir özellik yok" demektir.
```
Ayrıca bunu kontrol için `"in"` operatörü de kullanılabilir.

<<<<<<< HEAD
Yazımı:
=======
There's also a special operator `"in"` for that.

The syntax is:
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5
```js
"anahtar" in obje
```

Örneğin:

```js run
let kullanici = { isim: "Mazlum", yas: 30 };

alert( "yas" in kullanici ); // true, kullanici.age özelliği mevcut.
alert( "blabla" in kullanici ); // false, kullanici.blabla namevcut.
```

Yazıma dikkat edersenin `in` in sol tarafında *özellik ismi* tırnak içinde yazılır.

Eğer tırnağı unutursanız bu durumda değişkenin değerini obje içinde arar halbuki bizim amacımız değişkenin isminin obje içinde aranmasıydı.

<<<<<<< HEAD
Örneğin:
=======
If we omit quotes, that means a variable, it should contain the actual name to be tested. For instance:
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

```js run
let kullanici = { yas: 30 };

<<<<<<< HEAD
let anahtar = "yas";
alert( *!*anahtar*/!* in kullanici ); // true, değişkenden değerini alır ve kontrol eder.
```

````smart header="Özellik undefined dönderiyorsa nasıl kontrol edilmeli?"
Genelde sıkı karşılaştırma `"=== undefined"` doğru çalışır. Fakat burada özel bir durum mevcuttur ve sıkı karşılaştırma da başarısız olur, fakat bu durumda bile `"in"` doğru çalışır.
=======
let key = "age";
alert( *!*key*/!* in user ); // true, property "age" exists
```

Why does the `in` operator exist? Isn't it enough to compare against `undefined`?

Well, most of the time the comparison with `undefined` works fine. But there's a special case when it fails, but `"in"` works correctly.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

Bu olay objenin özelliğinin var olduğu fakat `undefined` döndürdüğü durumda meydana gelir.

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // undefined - yani böyle bir özellik yok mu?

alert( "test" in obj ); // true, özellik mevcut!
```
Yukarıdaki örnekte `obj.test` teknik olarak mevcut. Bundan dolayı `in` operatörü doğru bir şekilde çalışır.

<<<<<<< HEAD
Bu türde olaylar çok nadir yaşanır, çünkü bir özelliğe neredeyse kimse `undefined` atamaz. Genelde `bilinmeyen` için `null` veya boş değer kullanılır. Bundan dolayı `in` operatörü kodda yabancı görünür.
````
=======
In the code above, the property `obj.test` technically exists. So the `in` operator works right.

Situations like this happen very rarely, because `undefined` should not be explicitly assigned. We mostly use `null` for "unknown" or "empty" values. So the `in` operator is an exotic guest in the code.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5


## "for..in" döngüsü

Objenin içindeki `anahtarlar` içini adım adım gezen `for..in` döngüsü bulunmaktadır. Bu `for(;;)` döngüsünden tamamen farklıdır.

Yazım:

```js
for(anahtar in object) {
  // her anahtar için döngü gövdesini çalıştırır.
}
```
Örneğin, `kullanici` objesinin tüm özelliklerinin çıktısını alalım:

```js run
let kullanici = {
  isim: "Mazlum",
  yas: 30,
  mazlumuGetirin: true
};

for(let anahtar in kullanici) {
  // anahtarlar
  alert( anahtar );  // isim, yas, mazlumuGetirin
  // anahtarlara göre değerler
  alert( kullanici[anahtar] ); // Mazlum, 30, true
}
```

Dikkat ederseniz, "for" yapısına göre döngü içerisinde `let anahtar` tanımı yapılabilir.

<<<<<<< HEAD
Elbette `anahtar` yerine istediğiniz herhangi bir değişken ismini koyabilirsiniz. Örneğin `key` veya `property` 

### Obje sıralaması
=======
### Ordered like an object
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

Objeler sıralı mıdır? Diğer bir deyişle, eğer döngü içerisinde obje yazdırılırsa bu objeye yerleştirme sırasına göre mi yazılır?

Kısa cevap: "özel bir şekilde sıralanır", eğer tamsayı ise değerlerine göre, diğer türlü objeye eklenme sırasına göre sıralanır. 

Örneğin telefon kodları:

```js run
let kodlar = {
  "49": "Almanya",
  "41": "İsveç",
  "44": "İngiltere",
  // ..,
  "1": "Amerika Birleşik Devletleri"
};

*!*
for(let kod in kodlar) {
  alert(kod); // 1, 41, 44, 49
}
*/!*
```
Bu obje belki açılan kutu içerisinde kullanılacaktı, Alman kullanıcılar düşünülerek yapılmış olabilir. Onun için Almanya birinci sıraya konulmuş fakat gördüğünüz üzere anahtar `49` olduğundan ilk değil de sonuncu sırada.

Kodu çalıştırdığınızda:

- Amerika Birleşik Devletleri 1. sırada
- Sonra İsveç vs.

Telefon kodları tam sayı olduğundan dolayı bu sıraya göre dizilmişlerdir.


````smart header="Özellik anahtarları nasıl tam sayı olabilir ?"

Burada "tam sayı" aslında sayı tipinde değil de karakter tipinde sayı olmakta. Sıralama yapılacağı sırada sayısal olarak çevriliyor ve buna göre sıralanıyor.
````

...Diğer yandan, eğer anahtarlar tam sayı değilse bu durumda objeye eklenme sırasına göre çıktı alınır:

```js run
let kullanici = {
  isim: "İhsan",
  soyisim: "Mümtaz"
};
kullanici.yas = 25; // yeni bir özellik ekledik

*!*
// tam sayı olaman anahtarlar objeye eklenme sırasına göre gelir.
*/!*
for (let ozellik in kullanici) {
  alert( ozellik ); // isim, soyisim, yas
}
```
Peki telefon kodları ( tam sayı değerleri) nasıl eklenme sırasına göre kullanılabilir? Bunun için her koddan önce `"+"` işaretini kullanmak yeterli olacaktır.

Şu şekilde:

```js run
let kodlar = {
  "49": "Almanya",
  "41": "İsveç",
  "44": "İngiltere",
  // ..,
  "1": "Amerika Birleşik Devletleri"
};

for(let kod in kodlar) {
  alert( +kod ); // 49, 41, 44, 1
}
```

Olması gerektiği gibi çalışır.

<<<<<<< HEAD
## Referans İle Kopyalama

Objeler ile ilkel tipler ( karakter dizisi, sayı, boolean vs.) arasındaki temel fark objelerin saklanması ve kopyalanması "referans" ile olur.

Fakat ilkel tipler tamamen kopyalanır.

Örneğin:

```js
let mesaj = "Merhaba!";
let karsilama = mesaj;
```
Sonuç olarak birbirinden bağımsız iki değişken de `"Merhaba!"` değerini tutar.

![](variable-copy-value.svg)

Objeler bu şekilde çalışmaz:

**Obje değişkeni objenin kendisini değil hafızadaki adresini tutar. Diğer bir deyişle referansını tutar.**

Bir objenin resmi aşağıdaki gibidir:

```js
let kullanici = {
  isim: "Mümtaz"
};
```

![](variable-contains-reference.svg)

Obje hafızada herhangi bir yerde saklandı ve `kullanici` değişkeni buna "referans" oldu.

**Obje değişkeni kopyalandığında aslında objenin referansı kopyalanır hafızadaki obje kopyalanmaz**

Yine objeyi bir dolap olarak düşünürseniz değişken bu dolabın anahtarıdır. Kopyaladığınız zaman dolabı değil de anahtarı kopyalamış olursunuz.

Örneğin:

```js no-beautify
let kullanici = { isim: "Mümtaz" };

let yonetici = kullanici; // referansı kopyalar.
```
Artık iki tane değişken var ve ikisi de aynı objeye referans oldu:

![](variable-copy-reference.svg)

Bu iki değişkenden birini kullanarak objenin içeriği değiştirilebilir:

```js run
let kullanici = { isim: 'Mümtaz' };

let yonetici = kullanici;

*!*
yonetici.isim = 'İhsan'; // yonetici referansı kullanılarak değiştirildi.
*/!*

alert(*!*kullanici.isim*/!*); // 'İhsan', değişikliği kullanici referansında da etkili oldu. `Mümtaz` değişerek `İhsan` oldu.
```

Bu örnekten de anlaşılacağı üzere sadece bir tane obje var. Bir dolabın iki anahtarı olması gibi. Bu anahtarlardan biri `yonetici` diğeri `kullanici` dır. Yonetici ile dolabı açıp bir şey değiştirip daha sonra `kullanici` anahtarı ile açtığınızda dolabın içindeki değişikliği görebilirsiniz.

### Referansların karşılaştırılması

Eşitlik `==` ve sıkı eşitlik `===` operatörleri aynı şekilde çalışmaktadır.


**İki obje anca aynı objeler ise eşittir.**

Örneğin iki değişken aynı objeyi referans alırsa bu durumda eşit olurlar:

```js run
let a = {};
let b = a; // referansı kopyala

alert( a == b ); // true, iki değişken de aynı objeyi referans almaktadır.
alert( a === b ); // true
```
İki tane farklı objenin nasıl davrandığına bakılırsa:

```js run
let a = {};
let b = {}; // iki tane bağımsız obje

alert( a == b ); // false
```
Dikkat ederseniz ikisi de boş olsa bile birbirinden farklı objelerdir.

`obj1 > obj2` gibi karşılaştırmalar veya ilkel tipler ile karşılaştırmalar `obj == 5` mümkündür. Fakat objeler bu durumda ilkel tiplere dönüşür, nasıl çevirildiğini az sonra göreceksiniz. Fakat söylemek gerekir ki böyle karşılaştırmalar nadiren kullanılır ve kullandığında genelde kodlama hatasına neden olur.

### Sabit Objeler

Sabit (`const`) olarak tanımlanan objeler *değiştirilebilir* .

Örneğin:
```js run
const kullanici = {
  isim: "Mümtaz"
};

*!*
kullanici.yas = 25; // (*)
*/!*

alert(kullanici.yas); // 25
```
`(*)` satırında hata alınacakmış gibi dursa da hata alınmaz ve bir sorun olmadan çalışır. Bunun nedeni `const`'un referansının değişmediğinde sorun yaratmamasıdır. Daha önce de `kullanici` aynı objeye referans gösteriyordu, daha sonra da. *içinde* ne olduğu `const`'u ilgilendirmez. Tekrar atama yapmadığınız sürece bir sorun teşkil etmez.

Örneğin `const` aşağıdaki gibi bir kullanımda, yani `kullanici` değişkenine başka bir obje referans etmeye çalıştığımızda hata verir:

```js run
const kullanici = {
  isim: "Mümtaz"
};

*!*
// Hata (kullanici'ya tekrar atama yapılamaz)
*/!*
kullanici = {
  isim : "İhsan"
};
```
... Peki ya objenin özellikleri nasıl sabit yapılabilir? Yani `kullanici.yas = 25` yazıldığında hata vermesi nasıl sağlanır? Bunu 
<info:property-descriptors> bölümüne geldiğinizde göreceksiniz.

## Klonlama, birleştirme, Object.assign

Obje kopyalanınca sadece yeni bir referans yaratıldığını söylemiştik. Peki ya objeyi kopyalamak istiyorsanız? Yani aynı dolaptan bir tane daha yapmak istiyorsanız ne yapmalısınız?

Bu elbette mümkün, bunun için JavaScript metodları bulunmaktadır. Fakat çok az ihtiyaç duyulur. Sadece referansı kopyalamak çoğu zaman yeterli olur.

Fakat bunu gerçekten istiyorsanız, yeni bir obje yaratmak ve kopyalanacak objenin yapısını adım adım kopyalamak zorundasınız.

Örneğin:

```js run
let kullanici = {
  isim: "Mümtaz",
  yas: 30
};

*!*
let klon = {}; // yeni obje

// tüm özelliklerin bunun içine kopyalanması gerekmekte.
for (let anahtar in kullanici) {
  klon[anahtar] = kullanici[anahtar];
}
*/!*

// şu anda klonu tamamen bağımsız durumda
klon.isim = "İhsan"; // İçindeki veri değiştirildi.

alert( klon.isim ); // orninal objede bu hala Mümtaz olarak durmakta.
```

Bunun yanında [Object.assign](mdn:js/Object/assign) metodu da kullanılabilir.

Yazımı:

```js
Object.assign(hedef[, kaynak1, kaynak2, kaynak3...])
```

- `hedef` ve `kaynak1,....,kaynak2,...., kaynakN` istenildiği kadar olabilir.
- `kaynak1,...,kaynakN` e kadar olan tüm objelerin özelliklerini `hedef` e kopyalar. Diğer bir deyişle, 2. argümandan itibaren tüm değerler birinci argümana kopyalanır, sonra `hedef` döndürülür.

Örneğin, birkaç tane objeyi bir objeye indirgemek için bu metod kullanılabilir.

```js
let kullanici = { isim: "Mümtaz" };

let izin1 = { okuma: true };
let izin2 = { duzenleme: true };

*!*
// bu özellikleri kullanıcıya kopyalamak için
Object.assign(kullanici, izin1, izin2 );
*/!*

// kullanıcının şimdiki özellikleri,  kullanici = { name: "Mümtaz", okuma: true, duzenleme: true }
```
Eğer obje(`kullanici`) aynı isimde özelliğe sahipse bu özelliklerin üstüne yazılır.


```js
let kullanici = { isim: "Mümtaz" };

// ismin üstüne yazılır, ve yonetici eklenir.
Object.assign(kullanici, { isim: "Pete", yonetici: true });

// şu anda: kullanici = { isim: "Pete", yonetici: true }
```
`Object.assign`ile basit bir objeyi kolayca klonlamak da mümkündür:

```js
let kullanici = {
  isim: "Mümtaz",
  yas: 30
};

*!*
let klon = Object.assign({}, kullanici);
*/!*
```
`kullanici` objesinin tüm özelliklerini boş bir objeye kopyalar ve bu objeyi döndürür. Aslında daha önce yapılan döngünün aynısı, fakat daha kısa.

Şimdiye kadar `kullanici` objesinin tüm özelliklerinin ilkel olduğunu varsayıldı. Fakat özellikler içlerinde başka obje barındırabilirler.

Örneğin:

```js run
let kullanici = {
  isim: "Mümtaz",
  beden: {
    boy: 182,
    en: 50
  }
};

alert( kullanici.beden.boy ); // 182
```
Artık eskisi gibi `klon.beden = kullanici.beden` demek yeterli olmayacaktır. Çünkü `kullanici.beden` artık bir objedir, objelerin referansları kopyalanır. Öyleyse `klon` ve `kullanici` aynı beden objesini kullanırlar.

Şu şekilde:
```js run
let kullanici = {
  isim: "Mümtaz",
  beden: {
    boy: 182,
    en: 50
  }
};

let klon = Object.assign({}, kullanici);

alert( kullanici.beden === klon.beden ); // true, doğru aynı obje

// diyelim ki kullanicida değişiklik yaptınız
kullanici.boyut.en++;       // change a property from one place
alert(klon.boyut.en); // 51, gördüğünüz üzere birinde yaptığınız değişiklik diğerini de etkiledi.
```

Bunu düzeltmek için klonlarken eğer obje ise içteki objenin yapısının da kopyalanması gerekmektedir. Buna derinlemesine klonlama denir.

Bu derin klonlama için kullanılan [Structured cloning algorithm](https://w3c.github.io/html/infrastructure.html#internal-structured-cloning-algorithm) adında bir algoritma bulunmaktadır. Tekeri tekrar bulmaya gerek olmadığından , uygulaması olan [lodash](https://lodash.com) kütüphanesinde bulunan 
[Structured cloning algorithm][_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) metodu kullanılabilir.



## Özet

Objeler ilişkisel dizilerdir. Bunun haricinde bir kaç tane de kendine has özellikleri vardır.
=======
## Summary
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

Özellikleri anahtar-değer şeklinde tutarlar:
- Anahtarlar karakter veya sembol olabilir, genelde karakter kullanılır.
- Değerler ise herhangi bir veri tipinde olabilir.

Özelliğe erişebilmek için :
- Nokta yazımı:`obj.ozellik`
- Köşeli parantez yazımı: `obj["özellik"]`. Köşeli parantez ayrıca değişkenden anahtar değerini de alabilir. Örn:`obj[varWithKey]`

Ek operatörler:
- Özelliği silmek için: `delete obj.ozellik`
- Varlığını kontrol etmek için `"anahtar" in obj`
- Döngüde kullanmak için `for(let anahtar in obj)` kullanılır.


<<<<<<< HEAD
Objeler değer değil de referans tutarlar, yani verilerin hafızadaki adresini. Bundan dolayı Obje değişkenini kopyalamak, veya bir parametreye göndermek demek aslında onun referansını kopyalamak veya referansını bir parametreye göndermek demektir. Tüm olaylar aslında aynı veri üzerinde olur. Bunlar özelliklerin eklenmesi veya silinmesi olabilir.

Eğer objenin "gerçek kopyası" , veya diğer bir deyişle `klonu` yapılmak istenirse `Object.assign` veya  [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) kullanılabilir.

Bu bölümde "basit obje" veya `Obje` konusunu işlendi.
=======
What we've studied in this chapter is called a "plain object", or just `Object`.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

JavaScript'te bir çok çeşit obje bulunmaktadır:

- `Dizi` sıralı olarak verileri tutar.,
- `Date` Tarih ve saat bilgilerini tutar.,
- `Error` Hata hakkındaki bilgileri tutar..
- ...ve daha bir çoğu.

Bunların kendilerine has özellikler ileride işlenecektir. Bazen okursunuz "Dizi tipinde" veya "Tarih tipinde" diye, halbuki `array` veya `Date` diye bir tip yoktur. Bunlar aslında bir objeden türemiştir.

JavaScript dilinde objeler çok güçlüdür. Şu ana kadar anlatılanlar sadece başlangıç seviyesindedir. Objelere daha yakından bakılacak ve ilerleyen bölümlerde daha fazla örnek verilecektir.
