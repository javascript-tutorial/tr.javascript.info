# Veri Tipleri

<<<<<<< HEAD
Bir JavaScript değişkeni her türlü veriyi tutabilir. Önce karakter dizisi (string) atansa da sonra sayısal değer alabilir:
=======
A value in JavaScript is always of a certain type. For example, a string or a number.

There are eight basic data types in JavaScript. Here, we'll cover them in general and in the next chapters we'll talk about each of them in detail.

We can put any type in a variable. For example, a variable can at one moment be a string and then store a number:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
// Hata yok
let mesaj = "merhaba";
mesaj = 123456;
```

<<<<<<< HEAD
Bu şekilde olaylara izin veren tipteki dillere "dinamik tip" dil denir. Veri yapıları olsa bile değişkenler bu yapılara bağlı değildir.

JavaScript dilinde sekiz farklı veri tipi bulunmaktadır. Şimdilik bu tiplerden bahsedeceğiz gelecek bölümlerde ise daha derinlemesine bu tipleri inceleyeceğiz.

##  Number - Sayı
=======
Programming languages that allow such things, such as JavaScript, are called "dynamically typed", meaning that there exist data types, but variables are not bound to any of them.

## Number
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
let s = 123;
s = 12.345;
```

*sayı* hem integer hem de floating point sayıları için kullanılır. Sayılar `*`, `/`, `+` veya `-` işlemlerine girebilirler.
Normal sayıların haricinde "özel sayısal değerler" de sayı olarak tanımlanabilir. Bunlar : `Infinity`, `-Infinity` ve `NaN` gibi değerlerdir.


- `Infinity` matematiksel [Sonsuzluğu](https://tr.wikipedia.org/wiki/Sonsuz) ∞ ifade eder. Diğer tüm sayılardan büyük olan özel bir sayıdır.

    0'a bölünmede sonuç sonsuzu verir:

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

    veya doğrudan ekranda gösterebilirsiniz:

    ```js run
    alert( Infinity ); // Infinity
    ```
- `NaN` hesaplamalarda bir hata olduğunu gösterir. Hatalı veya tanımsız matematiksel hesapları gösterir, örneğin:

    ```js run
    alert( "Sayı Değil ( Not a Number) " / 2 ); // NaN, böyle bir bölme işlemi yapılamaz.
    ```

<<<<<<< HEAD
    `NaN` yapışkandır. `NaN` üzerinde yapılacak herhangi bir işlem yeniden `NaN` çıktısı verecektir:
=======
    `NaN` is sticky. Any further mathematical operation on `NaN` returns `NaN`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    alert( NaN + 1 ); // NaN
    alert( 3 * NaN ); // NaN
    alert( "not a number" / 2 - 1 ); // NaN
    ```

<<<<<<< HEAD
    Öyleyse matematiksel işlemlerin herhangi bir yerinde `NaN` alınıyorsa bu hesabın tamamını etkiler.
=======
    So, if there's a `NaN` somewhere in a mathematical expression, it propagates to the whole result (there's only one exception to that: `NaN ** 0` is `1`).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```smart header="Matematiksel hesapların güvenliği"
JavaScript üzerinden matematik hesapları yapmak güvenlidir. Her işlemi yapabilirsiniz. 0'a bölme normal harf dizesini bir sayıya bölmeye çalışma vs.

Kodunuzun tamamı hiç durmadan çalışacaktır. En kötü ihtimalle `NaN` sonucunu alınır.
```
Özel sayısal değerler "number" tipine aittir. Tabii ki sayı bizim bildiğimiz tipte sayı değillerdir. 
<info:number> bölümünde sayısal değerler ile çalışmayı daha derinlemesine göreceksiniz.

## BigInt - Büyük Sayı

JavaScript'te "number" türü, şundan büyük tamsayı değerlerini temsil edemez <code>(2<sup>53</sup>-1)</code> (bu `9007199254740991`), veya daha az <code>-(2<sup>53</sup>-1)</code> negatifler için. Dahili temsillerinden kaynaklanan teknik bir sınırlamadır.

<<<<<<< HEAD
Çoğu amaç için bu oldukça yeterlidir, ancak bazen gerçekten büyük sayılara ihtiyacımız olabilir, kriptografi veya mikrosaniye hassasiyetli zaman damgaları için.
=======
## BigInt [#bigint-type]

In JavaScript, the "number" type cannot safely represent integer values larger than <code>(2<sup>53</sup>-1)</code> (that's `9007199254740991`), or less than <code>-(2<sup>53</sup>-1)</code> for negatives.

To be really precise, the "number" type can store larger integers (up to <code>1.7976931348623157 * 10<sup>308</sup></code>), but outside of the safe integer range <code>±(2<sup>53</sup>-1)</code> there'll be a precision error, because not all digits fit into the fixed 64-bit storage. So an "approximate" value may be stored.

For example, these two numbers (right above the safe range) are the same:

```js
console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992
```

So to say, all odd integers greater than <code>(2<sup>53</sup>-1)</code> can't be stored at all in the "number" type.

For most purposes <code>±(2<sup>53</sup>-1)</code> range is quite enough, but sometimes we need the entire range of really big integers, e.g. for cryptography or microsecond-precision timestamps.

`BigInt` type was recently added to the language to represent integers of arbitrary length.

A `BigInt` value is created by appending `n` to the end of an integer:

```js
// the "n" at the end means it's a BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

As `BigInt` numbers are rarely needed, we don't cover them here, but devoted them a separate chapter <info:bigint>. Read it when you need such big numbers.

## String
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Son zamanlarda, isteğe bağlı uzunluktaki tam sayıları temsil etmek için dile `BigInt` türü eklendi.

Bir tamsayının sonuna `n` eklenerek `BigInt` değeri oluşturulur:

```js
<<<<<<< HEAD
// Sondaki "n" bu değerin bir BigInt olduğu anlamına gelir
const bigInt = 1234567890123456789012345678901234567890n;
=======
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

`BigInt` sayılarına nadiren ihtiyaç duyulduğundan, onları burada ele almıyoruz, ancak onlara ayrı bir bölüm <info:bigint> ayırdık. Bu kadar büyük sayılara ihtiyacınız olduğunda okuyun.


<<<<<<< HEAD
```smart header="Compatibility issues"
Şu anda, `BigInt` Firefox/Chrome/Edge/Safari'de destekleniyor, ancak IE'de desteklenmiyor.
=======
Double and single quotes are "simple" quotes. There's practically no difference between them in JavaScript.

Backticks are "extended functionality" quotes. They allow us to embed variables and expressions into a string by wrapping them in `${…}`, for example:

```js run
let name = "John";

// embed a variable
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// embed an expression
alert( `the result is *!*${1 + 2}*/!*` ); // the result is 3
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

Bir tarayıcının hangi sürümlerinin desteklendiğini öğrenmek için [* MDN * BigInt uyumluluk tablosunu](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) kontrol edebilirsiniz.

## String - Karakter Dizisi

<<<<<<< HEAD
JavaScript'te karakter dizileri çift tırnak içerisine alınmalıdır.
=======
We'll cover strings more thoroughly in the chapter <info:string>.

```smart header="There is no *character* type."
In some languages, there is a special "character" type for a single character. For example, in the C language and in Java it is called "char".

In JavaScript, there is no such type. There's only one type: `string`. A string may consist of zero characters (be empty), one character or many of them.
```

## Boolean (logical type)

The boolean type has only two values: `true` and `false`.

This type is commonly used to store yes/no values: `true` means "yes, correct", and `false` means "no, incorrect".

For instance:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
let str = "Merhaba";
let str2 = 'Tek tırnak da çalışır';
let phrase = `değer gömülebilir ${str}`;
```
JavaScript'te 3 çeşit tırnak içine alma yöntemi vardır.

1. Çift tırnak: `"Hello"`.
2. Tek tırnak: `'Hello'`.
3. Ters tırnak: <code>&#96;Hello&#96;</code>.

Çift tırnak ile tek tırnak "basit" tırnaklardır. Aralarında bir farklılık yoktur.

Ters tırnak ise "genişletilmiş fonksiyonlu" tırnaktır. Bunu kullanarak karakter dizisi içerisine `${...}` gibi başka bir dizi yerleştirebiliriz. Örneğin:

```js run
let isim = "Ahmet";

// değişken gömme
alert( `Hello, *!*${isim}*/!*!` ); // Merhaba Ahmet!

// ifade gömme
alert( `sonuç : *!*${1 + 2}*/!*` ); //sonuç :  3
```
`${...}` içerisinde yazılan ifade çalıştığında karakter dizisinin bir parçası olur. `${...}` içerisine her şeyi koyabiliriz: değişken ismi `adi` veya matematiksel ifade `1+2` gibi.

Lütfen unutmayın ki bunu sadece kesme tırnak "`" ile yapabilirsiniz.
```js run
alert( "sonuç ${1 + 2}" ); // örneğin burada normal çift tırnak kullanıldığından ekrana "sonuç ${1+2}" diye çıktı verir.
```
Karakter dizileri konusunu <info:string> bölümünde daha derinlemesine incelenecektir.

```smart header="*Karakter* tipi diye bir tip yoktur."
Bazı dillerde "character" - Karakter adında sadece bir karakteri tutan veri tipleri mevcuttur. Bu tip Java ve C'de `char` olarak tanımlanır.

JavaScript'te böyle bir tip bulunmamaktadır. Tek karakterli değişken de karakter dizisidir (string). Karakter dizisi bir veya birden fazla karakteri tutar.
```

## Boolean (doğru/yanlış) tipi

Boolean tipi `true` ve `false` olmak üzere sadece iki değer tutabilir.

Genelde bu tip veriler doğru - yanlış sorularını tutmak için kullanılır. `true` doğru demek `false` ise yanlış demektir.


Örneğin:

```js
let isimKontrolu = true; // İsim kontrolü yapıldı.
let yasKontrolu = false; // Yaş kontrolü yapılmadı.
```

Ayrıca karşılaştırma sonuçları boolean verir.


<<<<<<< HEAD
```js run
let buyuk = 4 > 1;
=======
The code above states that `age` is unknown.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

alert( buyuk ); // true (cevap görüldüğü gibi "doğru" çıkacaktır.)
```

Boolean ve diğer mantıksal işlemler <info:logical-operators> bölümünde daha derinlemesine incelenecektir.

## "null" değeri

"null" değeri yukarıda tanımlanan hiçbir tipe dahil değildir.

Kendi başına `null` değerini tutar.


```js
let yas = null;
```
JavaScript'te `null` olmayan objeyi referans göstermez veya başka dillerdeki gibi "null pointer" değildir.

"olmayan", "boş", "bilinmeyen değer" anlamında bir özel değerdir.

Yukarıdaki `yas` boş veya bilinmeyen bir değerdir.

## "undefined" değeri

Bir diğer özel değer ise `undefined`dır. Kendi başına `null` gibi bir değerdir.

`undefined` anlam olarak "herhangi bir değer atanmamıştır" anlamına gelir.

Eğer bir değişken tanımlanmış fakat hiçbir değer atanmamışsa tam olarak bu değeri alır.

```js run
let age;

<<<<<<< HEAD
alert(x); // "undefined" çıktısı verir.
```
Teknik olarak `undefined` değerini herhangi bir değişkene atamak mümkündür:
=======
alert(age); // shows "undefined"
```

Technically, it is possible to explicitly assign `undefined` to a variable:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let age = 100;

// change the value to undefined
age = undefined;

alert(age); // "undefined"
```

<<<<<<< HEAD
Fakat bu şekilde tanımlanmasa daha iyi olur. Normalde `null` kullanılarak değişkenin boş veya bilinmeyen olduğu tanımlanır, `undefined` değişkene bir değer atanmış mı? Sorusunu kontrol eder.
=======
...But we don't recommend doing that. Normally, one uses `null` to assign an "empty" or "unknown" value to a variable, while `undefined` is reserved as a default initial value for unassigned things.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Objeler ve Semboller
`Obje` özel bir tiptir.

Diğer tüm tipler "primitive" yani basit veya ilkel tiplerdir. Bu değişkenler sadece bir şey tutabilirler (karakter dizisi veya sayı). Buna karşılık objeler veri koleksiyonları (collections) veya karmaşık yapılar tutabilirler. <info:object> konusunda Obje daha derinlemesine incelenecektir. 

<<<<<<< HEAD
`Symbol` objeler için benzersiz tanımlayıcılar oluşturmak için kullanılır. Bu konuyu objeleri öğrendikten sonra öğrenmek daha iyi olacaktır.

## typeof Operatörü [#type-typeof]
`typeof` argüman tipini bildirir. Farklı tipler için farklı akışlarınız varsa bunu kullanabilirsiniz.
=======
All other types are called "primitive" because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections of data and more complex entities.

Being that important, objects deserve a special treatment. We'll deal with them later in the chapter <info:object>, after we learn more about primitives.

The `symbol` type is used to create unique identifiers for objects. We have to mention it here for the sake of completeness, but also postpone the details till we know objects.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

İki türlü yazımı vardır:

<<<<<<< HEAD
1. Operatör olarak: `typeof x`.
2. Fonksiyonel tipte: `typeof(x)`.

Diğer bir deyişle parantezli de çalışır parantez olmadan da çalışır. Sonuç aynı olacaktır.

`typeof x`'i çalıştırdığınızda bu fonksiyon karakter dizisi (string) döndürür:

=======
The `typeof` operator returns the type of the operand. It's useful when we want to process values of different types differently or just want to do a quick check.

A call to `typeof x` returns a string with the type name:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

Son üç satır diğerlerinden farklıdır. Şu şekilde;

<<<<<<< HEAD
1. `Math` matematiksel operasyonlar için kullanılacak JavaScript dilinde var olan bir objedir. <info:number> konusunda buna değinilecektir.  Burada sadece objenin örneklenmesi için kullanılmıştır.
2. `typeof null` sonucu `"object"` dir. Aslında yanlış. Bu `typeof` fonksiyonunun bilinen bir hatasıdır. Eski versiyonlara uygunluk açısından bu şekliyle bırakılmıştır. Yoksa `null` bir obje değildir. Kendine has bir tiptir. Tekrar söylemek gerekirse bu JavaScript dilinin bir hatasıdır.
3. `typeof alert` fonksiyondur. Çünkü `alert` dilde doğrudan var olan bir fonksiyondur. `Math` ile farklı gördüğünüz gibi. Bir sonraki bölümde fonksiyonlar anlatılacaktır. Fonksiyonlar obje tipine dahildir. Fakat `typeof` bunları farklı yorumlar. Resmi olarak yanlış olsa da pratikte çokça kullanılan bir özelliktir.
=======
1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's an officially recognized error in `typeof`, coming from very early days of JavaScript and kept for compatibility. Definitely, `null` is not an object. It is a special value with a separate type of its own. The behavior of `typeof` is wrong here.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn't correct, but can be convenient in practice.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```smart header="The `typeof(x)` syntax"
You may also come across another syntax: `typeof(x)`. It's the same as `typeof x`.

To put it clear: `typeof` is an operator, not a function. The parentheses here aren't a part of `typeof`. It's the kind of parentheses used for mathematical grouping.

Usually, such parentheses contain a mathematical expression, such as `(2 + 2)`, but here they contain only one argument `(x)`. Syntactically, they allow to avoid a space between the `typeof` operator and its argument, and some people like it.

Some people prefer `typeof(x)`, although the `typeof x` syntax is much more common.
```

## Özet

<<<<<<< HEAD
Javascript dilinde 8 tane basit tip bulunmaktadır.

=======
There are 8 basic data types in JavaScript.

- Seven primitive data types:
    - `number` for numbers of any kind: integer or floating-point, integers are limited by <code>±(2<sup>53</sup>-1)</code>.
    - `bigint` for integer numbers of arbitrary length.
    - `string` for strings. A string may have zero or more characters, there's no separate single-character type.
    - `boolean` for `true`/`false`.
    - `null` for unknown values -- a standalone type that has a single value `null`.
    - `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
    - `symbol` for unique identifiers.
- And one non-primitive data type:
    - `object` for more complex data structures.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

- `number` her türlü sayı için (integer veya floating point)
- `bigint` isteğe bağlı uzunluktaki tam sayılar içindir.
- `string` bir veya birden fazla karakter için
- `boolean` , `true`/`false` yani doğru-yanlış değerleri için.
- `null` bilinmeyen değerler için.
- `undefined` değer atanmamış değişkenler için.
- `object` daha karmaşık veri yapıları için.
- `symbol` eşsiz tanımlamalar için.

<<<<<<< HEAD
`typeof` operatörü değişkenin tipini verir.
- İki türlü kullanılabilir: `typeof x` veya `typeof(x)`
- Geriye karakter dizisi olarak değişkenin tipini döndürür. Örneğin: `"string"`
- İstisna olarak `null` kontrolünde `"object"` çıktısı verir. Fakat bu dile ait bir hatadır. Normalde `null` obje değil, kendi başına bir tiptir.
=======
- Usually used as `typeof x`, but `typeof(x)` is also possible.
- Returns a string with the name of the type, like `"string"`.
- For `null` returns `"object"` -- this is an error in the language, it's not actually an object.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Bir sonraki bölümde basit tiplere yoğunlaşılacaktır. Bu tipleri kullanmak alışkanlık haline geldiğinde objelere geçilebilir.
