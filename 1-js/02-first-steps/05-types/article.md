# Data types

Bir javascript değişkeni her türlü veriyi tutabilir. Önce karakter dizisi(String) atansa da sonra sayısal değer alabilir:

```js
// Hata yok
let mesaj = "merhaba";
mesaj = 123456;
```

Bu şekilde olaylara izin veren tipdeki dillere "dinamik tip" dil denir. Veri yapıları olsa bile değişkenler bu yapılara bağlı değildir.

JavaScript dilinde yedi farklı veri tipi bulunmaktadır. Şimdilik bu tiplerden bahsedeceğiz gelecek bölümlerde ise daha derinlemesine bu tipleri inceleyeceğiz.

##  Number - Sayı

```js
let s = 123;
s = 12.345;
```

*sayı* hem integer hem de floating point sayıları için kullanılır. Sayılar `*`, `/`, `+` veya `-` işlemlerine girebilirler.
Normal sayıların haricinde "özel sayısal değerler" de sayı olarak tanımlanabilir. Bunlar : `Infinity`, `-Infinity` ve `NaN` gibi değerlerdir.


- `Infinity` matematiksel sonsuzluğu ifade eder.
- `Infinity` represents the mathematical [Sonsuz](https://tr.wikipedia.org/wiki/Sonsuz) ∞. Diğer tüm sayılardan büyük olan özel bir sayıdır.

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

    `NaN` is sticky. Any further operation on `NaN` would give `NaN`:

    ```js run
    alert( "not a number" / 2 + 5 ); // NaN
    ```

    Öyleyse matematiksel işlemlerin herhangi bir yerinde `NaN` alınıyorsa bu hesabın tamamını etkiler.

```smart header="Matematiksel hesapların güvenliği"
JavaScript üzerinden matematik hesapları yapmak güvenlidir. Her işlemi yapabilirsiniz. 0'a bölme normal harf dizesini bir sayıya bölmeye çalışma vs.

Kodunuzun tamamı hiç durmadan çalışacaktır. En kötü ihtimalle `NaN` sonucunu alınır.
```
Özel sayısal değerler "number" tipine aittir. Tabiki sayı bizim bildiğimiz tipte sayı değillerdir. 
<info:number> bölümünde sayısal değerler ile çalışmayı daha derinlemesine göreceksiniz.

## String - Karakter Dizisi

JavaScriptte karakter dizileri çift tırnak içerisine alınmalıdır.

```js
let str = "Merhaba";
let str2 = 'Tek tırnak da çalışır';
let phrase = `değer gömülebilir ${str}`;
```
JavaScriptte 3 çeşit tırnak içine alma yöntemi vardır.

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
`${...}` içerisinde yazılan ifade çalıştığında karakter dizisinin bir parçası olur. `${...}` içerisine herşeyi koyabiliriz: değişken ismi `adi` veya matematiksel ifade `1+2` gibi.

Lütfen unutmayın ki bunu sadece kesme tırnak "`" ile yapabilirsiniz.
```js run
alert( "sonuç ${1 + 2}" ); // örneğin burada normal çift tırnak kullanıldığından ekrana "sonuç ${1+2}" diye çıktı verir.
```
Karakter dizileri konusunu <info:string> bölümünde daha derinlemesine incelenecektir.

```smart header="*Karakter* tipi diye bir tip yoktur."
Bazı dillerde "character" - Karakter adında sadece bir karakteri tutan veri tipleri mevcuttur. Bu tip Java ve C'de `char` olarak tanımlanır.

Javascriptte böyle bir tip bulunmamaktadır. Tek karakterli değişken de karakter dizisidir.(String). Karakter dizisi bir veya birden fazla karakteri tutar.
```

## Boolean ( doğru/yanlış) tipi

Boolean tipi `true` ve `false` olmak üzere sadece iki değer tutabilir.

Genelde bu tip veriler doğru - yanlış sorularını tutmak için kullanılır. `true` doğru demek `false` ise yanlış demektir.


Örneğin:

```js
let isimKontrolu = true; // isimKontrolu yapıldi
let yasKontrolu = false; // yas kontrolü yapılmadı.
```

Ayrıca karşılaştırma sonuçları boolean verir.


```js run
let buyuk = 4 > 1;

alert( buyuk ); // true (cevap görüldüğü gibi "doğru" çıkacaktır.)
```

Boolean ve diğer mantıksal işlemler <info:logical-operators> bölümünde daha derinlemesine incelenecektir.

## "null" değeri

"null" değeri yukarıda tanımlanan hiçbir tipe dahil değildir.

Kendi başına `null` değerini tutar.


```js
let yas = null;
```
Javascriptte `null` olmayan objeyi referans göstermez veya başka dillerdeki gibi "null pointer" değildir.

"olmayan", "boş", "bilinmeyen değer" anlamında bir özel değerdir.

Yukarıdaki `yas` boş veya bilinmeyen bir değerdir.

## "undefined" değeri

Bir diğer özel değer ise `undefined`dır. Kendi başına `null` gibi bir değerdir.

`undefined` anlam olarak "herhangi bir değer atanmamıştır" anlamına gelir.

Eğer bir değişken tanımlanmış fakat hiç bir değer atanmamışsa tam olarak bu değeri alır.

```js run
let x;

alert(x); // "undefined" çıktısı verir.
```
Teknik olarak `undefined` değerini herhangi bir değişkene atamak mümkündür:

```js run
let x = 123;

x = undefined;

alert(x); // "undefined"
```

Fakat bu şekilde tanımlanmasa daha iyi olur. Normalde `null` kullanılarak değişkenin boş veya bilinmeyen olduğu tanımlanır, `undefined` değişkene bir değer atanmış mı? Sorusunu kontrol eder.

## Objeler ve Semboller
`Obje` özel bir tiptir.

Diğer tüm tipler "primitive" yani basit veya ilkel tiplerdir. Bu değişkenler sadece birşey tutabilirler( karakter dizisi veya sayı ). Buna karşılık objeler veri koleksiyonları (collections) veya karmaşık yapılar tutabilirler. <info:object> konusunda Obje daha derinlemesine incelenecektir. 

<<<<<<< HEAD
`symbol` objeler için benzersiz tanımlayıcılar oluşturmak için kullanılır. Bu konuyu objeleri öğrendikten sonra öğrenmek daha iyi olacaktır.
=======
The `symbol` type is used to create unique identifiers for objects. We mention it here for completeness, but we'll study it after objects.
>>>>>>> 71ff8f81b05e2438a3c56507888e06c528a71182

## typeof operatörü [#type-typeof]
`typeof` argüman tipini bildirir. Farklı tipler için farklı akışlarınız varsa bunu kullanabilirsiniz.

İki türlü yazımı vardır:

1. Operatör olarak: `typeof x`.
2. Fonksiyonel tipte: `typeof(x)`.

Diğer bir deyişle parantezli de çalışır parantez olmadan da çalışır. Sonuç aynı olacaktır.

`typeof x`'i çalıştırdığınızda bu fonksiyon karakter dizisi(String) dönderir:


```js
typeof undefined // "undefined"

typeof 0 // "number"

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
1. `Math` matematiksal operasyonlar için kullanılacak JavaScript dilinde var olan bir objedir. <info:number> konusunda buna değinilecektir.  Burada sadece objenin örneklenmesi için kullanılmıştır.
2. `typeof null` sonucu `"object"` dir. Aslında yanlış. Bu `typeof` fonksiyonunun bilinen bir hatasıdır. Eski versiyonlara uygunluk açısından bu şekliyle bırakılmıştır. Yoksa `null` bir obje değildir. Kendine has bir tiptir. Tekrar söylemek gerekirse bu JavaScript dilinin bir hatasıdır.
3. `typeof alert` fonksiyondur. Çünkü `alert` dilde doğrudan var olan bir fonksiyondur. `Math` ile farklı gördüğünüz gibi. Bir sonraki bölümde fonksiyonlar anlatılacaktır. Fonksiyonlar obje tipine dahildir. Fakat `typeof` bunları farklı yorumlar. Resmi olarak yanlış olsa da pratikte çokça kullanılan bir özelliktir.
=======
1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's wrong. It is an officially recognized error in `typeof`, kept for compatibility. Of course, `null` is not an object. It is a special value with a separate type of its own. So, again, this is an error in the language.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That's not quite correct, but very convenient in practice.
>>>>>>> 71ff8f81b05e2438a3c56507888e06c528a71182


## Özet

Javascript dilinde 7 tane basit tip bulunmaktadır.


- `number` her türlü sayı için ( integer veya floating point)
- `string` bir veya birden fazla karakter için
- `boolean` , `true`/`false` yani doğru-yanlış değerleri için.
- `null` bilinmeyen değerler için.
- `undefined` değer atanmamış değişkenler için.
- `object` daha karmaşık veri yapıları için.
- `symbol` eşsiz tanımlamalar için.

`typeof` operatörü değişkenin tipini verir.
- İki türlü kullanılabilir: `typeof x` veya `typeof(x)`
- Geriye karakter dizisi olarak değişkenin tipini dönderir. Örneğin: `"string"`
- `null` için `"object"` der. Fakat bu dile ait bir hatadır. Normalde `null` obje değildir.

Bir sonraki bölümde basit tiplere yoğunlaşılacaktır. Bu tipleri kullanmak alışkanlık haline geldiğinde objelere geçilebilir.
