# Diziler 

Objeler değerlerin anahtarlı bir şekilde koleksiyon halinde tutulmasını sağlar. 

Fakat bazı durumlarda *sıralı koleksiyon* tutmak gerekebilir, 1., 2. ve 3. elemente ihtiyaç olabilir. Örneğin kullanıcıların, ürünlerin, HTML elementlerinin liste halinde tutulmasını istediğinizde;

Obje kullanmak mantıklı değildir, çünkü elemanların sırasını tutmaz bu objeler. Var olanların "arasına" yeni bir özellik girilemez. Objeler böyle kullanımlara uygun değildir.

Bunun için özel bir veri yapısı vardır. `Array` sıralı koleksiyonları tutar.

## Tanımlama

Boş dizi oluşturmak için iki yöntem vardır:

```js
let arr = new Array();
let arr = [];
```
Neredeyse her zaman ikinci yazım kullanılır. Başlangıç değerlerini köşeli parantez içinde verebilirsiniz:

```js
let meyveler = ["Elma", "Portakal", "Erik"];
```
Diziler sıfır ile başlarlar.

```js run
let meyveler = ["Elma", "Portakal", "Erik"];

alert( meyveler[0] ); // Elma
alert( meyveler[1] ); // Portakal
alert( meyveler[2] ); // Erik
```
Elamanı değiştirmek mümkündür:

```js
meyveler[2] = 'Armut'; // Şimdi ["Elma", "Portakal", "Armut"]
```
... Veya diziye yeni bir eleman eklemek mümkündür:

```js
meyveler[3] = 'Limon'; // Şimdi ["Elma", "Portakal", "Armut", "Limon"]
```
Dizide bulunan elemanların boyutu `length` metodu ile öğrenilebilir:

```js run
let meyveler = ["Elma", "Portakal", "Erik"];

alert( meyveler.length ); // 3
```

Ayrıca `alert` kullanarak tüm dizinin gösterilmesi de mümkündür:
```js run
let meyveler = ["Elma", "Portakal", "Erik"];

alert( meyveler ); // Elma,Portakal,Erik
```
Dizi her türlü elemanı tutabilir.

Örneğin:

```js run no-beautify
// Karmaşık tipler
let arr = [ 'Elma', { isim: 'Ahmet' }, true, function() { alert('merhaba'); } ];

// Birinci indeksteki değeri al ve "isim" özelliğini görüntüle
alert( arr[1].isim ); // John

// 3. indeksteki fonksiyonu al ve çalıştır.
arr[3](); // merhaba
```


````smart header="Virgül sonrası"
Diziler objeler gibi virgül ile bitebilir:

```js 
let meyveler = [
  "Elma", 
  "Portakal", 
  "Erik"*!*,*/!*
];
```
"Sürekli virgül" stili yeni eleman ekleme veya çıkarma işlemlerini kolaylaştırır.
````

## Get last elements with "at"

[recent browser="new"]

Let's say we want the last element of the array.

Some programming languages allow the use of negative indexes for the same purpose, like `fruits[-1]`.

Although, in JavaScript it won't work. The result will be `undefined`, because the index in square brackets is treated literally.

We can explicitly calculate the last element index and then access it: `fruits[fruits.length - 1]`.

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits[fruits.length-1] ); // Plum
```

A bit cumbersome, isn't it? We need to write the variable name twice.

Luckily, there's a shorter syntax: `fruits.at(-1)`:

```js run
let fruits = ["Apple", "Orange", "Plum"];

// same as fruits[fruits.length-1]
alert( fruits.at(-1) ); // Plum
```

In other words, `arr.at(i)`:
- is exactly the same as `arr[i]`, if `i >= 0`.
- for negative values of `i`, it steps back from the end of the array.

## pop/push, shift/unshift işlemleri için metodlar

[Kuyruk](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) dizilerin en fazla kullanıldığı yerdir. Bilgisayar biliminde, sıralı elemanların koleksiyonları  iki operasyonu desteklemelidir:

- Sonuna yeni eleman eklemeli : `push`.
- `shift` ile başlangıçtan eleman alındığında ikinci eleman birinci olmalı.

<<<<<<< HEAD
=======
![](queue.svg)
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

![](queue.svg)

Diziler bu iki işlemi de destekler.

Bu işlemler ile çokça karşılaşılır. Örneğin, kuyruktaki mesajların hepsinin ekranda gösterilmesi gerekebilir.

Dizilerin diğer bir kullanım amacı ise diğer bir veri yapısı içindir. [Stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type))

İki operasyonu destekler


- `push` : sona eleman ekler.
- `pop` : sondan eleman alır.

<<<<<<< HEAD
Bundan dolayı yeni elemanlar her zaman sondan alınır veya sona eklenir.
=======
![](stack.svg)
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Yığın bir deste kart olarak düşünülebilir: yeni kartlar eklendiğinde en üste konulur veya en üstten alınır.

<<<<<<< HEAD
![](stack.svg)

Yığına en son eklenen eleman ilk olarak alınır, Buna LIFO (Last-In-First-Out) Son giren ilk çıkar prensibi denir. Kuyruklar için ise FIFO (First-In-First-Out) yani ilk giren ilk çıkar prensibi kullanılır.
=======
Arrays in JavaScript can work both as a queue and as a stack. They allow you to add/remove elements, both to/from the beginning or the end.

In computer science, the data structure that allows this, is called [deque](https://en.wikipedia.org/wiki/Double-ended_queue).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

JavaScript'te diziler yığın veya kuyruk olarak kullanılabilirler. Başlangıca veya sona yeni eleman eklenebilir veya çıkartılabilir.

Bilgisayar biliminde bu işlemlere izin veren veri yapılarına [deque](https://en.wikipedia.org/wiki/Double-ended_queue) denir.


**Dizilerin sonu ile ilgili metodlar:**

`pop`
: Dizinin son elemanını döndürür:

    ```js run
    let meyveler = ["Elma", "Portakal", "Armut"];

    alert( meyveler.pop() ); // Armutu sil ve bunu ekranda bildir.

    alert( meyveler ); // Elma, Portakal
    ```

    Both `fruits.pop()` and `fruits.at(-1)` return the last element of the array, but `fruits.pop()` also modifies the array by removing it.

`push`
: Dizinin sonuna elaman ekler:

    ```js run
    let meyveler = ["Elma", "Portakal"];

    meyveler.push("Armut");

    alert( meyveler ); // Elma, Portakal, Armut
    ```
    `fruit.push()` ile `fruit[fruits.length] = ...` birbiri ile aynı anlama gelirler.
    
**Dizilerin başlangıcı ile ilgili metodlar:**

`shift`
: Dizinin ilk elemanını döndürür:

<<<<<<< HEAD
    ```js
    let meyveler = ["Elma", "Portakal", "Armut"];
=======
    ```js run
    let fruits = ["Apple", "Orange", "Pear"];
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    alert( meyveler.shift() ); // Elmayı sil ve bunu ekranda bildir.

    alert( meyveler ); // Portakal, Armut
    ```

`unshift`
: Dizinin başlangıcına eleman ekleme:

<<<<<<< HEAD
    ```js
    let meyveler = ["Portakal", "Armut"];
=======
    ```js run
    let fruits = ["Orange", "Pear"];
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    meyveler.unshift('Elma');

    alert( meyveler ); // Elma, Portakal, Armut
    ```

`push` ve `unshift` metodları aynı anda birden fazla eleman ekleyebilirler:

```js run
let meyveler = ["Elma"];

meyveler.push("Portakal", "Armut");
meyveler.unshift("Ananas", "Limon");

// ["Ananas", "Limon", "Elma", "Portakal", "Armut"]
alert( meyveler );
```

## Özellikler

Dizi özel bir tip objedir. `arr[0]` ile özelliğe erişme aslında objelerden gelen bir yazım şeklidir. Sayılar anahtar olarak kullanılmaktadır.

Objeleri daha genişleterek sıralı veri koleksiyonları ve `length` gibi özellikler alması sağlanmıştır. Fakat derininde diziler objedir.

<<<<<<< HEAD
Hatırlarsanız, JavaScript'te sadece 7 basit tip bulunmaktadır. Dizi obje olduğundan obje gibi davranır.
=======
Remember, there are only eight basic data types in JavaScript (see the [Data types](info:types) chapter for more info). Array is an object and thus behaves like an object.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Örneğin referans ile kopyalanır:

```js run
let meyveler = ["Muz"]

let arr = meyveler; // iki değişken aynı diziye referans verir. ( referans ile kopyalama )

alert( arr === fruits ); // true
 
arr.push("Armut"); // diziyi referans ile düzenleme

alert( meyveler ); // Muz, Armut - 2 eleman
```
... Fakat dizileri asıl önemli kılan içinde neler olduğudur. JavaScript motoru elemanları ardışık hafıza alanlarında tutmaya çalışır. Böylece diziler çok hızlı şekilde çalışabilirler.

<<<<<<< HEAD
Fakat eğer "sıralı koleksiyon" olan diziden çıkılır ve obje olarak çalıştırılırsa her şey bozulur.
=======
...But what makes arrays really special is their internal representation. The engine tries to store its elements in the contiguous memory area, one after another, just as depicted on the illustrations in this chapter, and there are other optimizations as well, to make arrays work really fast.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Örneğin, teknik olarak aşağıdaki örnek bunu yansıtır:

```js
let meyveler = []; // Dizi yap

meyveler[99999] = 5; // boyutundan çokça büyük bir özelliğe veri ata.

meyveler.yas = 25; // doğrudan özelliğe isim vererek atama yap.
```
Diziler tabanda obje olduğundan dolayı yukarıdaki işlem geçerlidir. İstendiği şekilde özellik eklenebilir.

Fakat bu durumda JavaScript motoru bizim diziler ile değil de normal objeler üzerinde çalıştığımızı sanar. Bundan dolayı diziye özel optimizasyon uygulanmayacaktır.

Diziyi yanlış kullanma biçimleri:

- Sayısal olmayan bir özellik ekle `arr.test = 5`
- Delikler yap: `arr[0]` ekle sonra `arr[1000]` ekle ( arada hiçbir değer yok)
- Diziyi ters sıralı şekilde doldur, `arr[1000]`, `arr[999]` vs.

Dizileri sıralı şekilde veri tutan özel bir yapı olarak düşünün. Bunun için özel metodlara sahiptir. JavaScript motoru içerisinde diziler çok etkili ve hızlı bir şekilde çalıştırılmak üzere ayarlanmıştır. Sizde bu şekilde kullanmaya hassasiyet gösterin. Eğer özelliği belirtmek istiyorsanız, belki de normal obje kullanmanız gerekmektedir `{}`

## Performans

`push/pop` metodları hızlı çalışır, `shift/unshift` ise yavaş

![](array-speed.svg)

<<<<<<< HEAD
Peki neden dizinin başlangıcı ile bitişine eleman eklemek arasında hız farkı olmaktadır? Çalışma anında neler oluyor bakalım:
=======
![](array-speed.svg)

Why is it faster to work with the end of an array than with its beginning? Let's see what happens during the execution:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
meyveler.shift(); // Başlangıçtan bir eleman al
```
`0` indeksinde bulunan elemanı silmek yeterli değildir. Diğer elemanların tekrar numaralanması gerekmektedir.

<<<<<<< HEAD
`shift` metodunun yapması gereken 3 işlem vardır:
=======
It's not enough to take and remove the element with the index `0`. Other elements need to be renumbered as well.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

1. `0` indeksinde bulunan elemanın silinmesi
2. Tüm elemanların sola kaydırılması, indekslerin tekrar numaralandırılması `1`'den `0`'a, `2`'den `1`'e vs.
3. `uzunluk` özelliğini güncelle.

![](array-shift.svg)

<<<<<<< HEAD
**Daha fazla elaman, daha fazla taşınma süresi , daha fazla hafıza içi işlem demektir.**
=======
![](array-shift.svg)
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Aynı şey `unshift` için de geçerlidir: dizilerin başına eleman ekleneceği zaman öncelikle elemanların sağa kaydırılarak indeks artırılması gerekir.

Peki `push/pop` için böyle işlemlere gerek yok mu? Sondaki elemanı alabilmek için `pop` metodu indexi siler ve `length`'i bir azaltır.

`pop` metodunun yaptığı işlemler:

```js
fruits.pop(); // Sondan bir eleman al
```

![](array-pop.svg)

**`pop` hiçbir şey taşımaz çünkü diğer elemanların `index`'i değişmez. Bundan dolayı aşırı derecede hızlıdır.**

`push`'da aynı şekilde sona ekler.

## Döngüler

En eski yöntem `for` döngüsü kullanarak indeksler üzerinden dönmektir:

```js run
let dizi = ["Elma", "Portakal", "Armut"];

*!*
for (let i = 0; i < arr.length; i++) {
*/!*
  alert( arr[i] );
}
```
Diziler için diğer yöntem ise, `for..of`'tur:

```js run
let meyveler = ["Elma", "Portakal", "Erik"];

// Dizi elemanları üzerinden döner.
for(let meyve of meyveler) {
  alert( meyve ); 
}
```

`for..of` var olan elemanın kaçıncı eleman olduğunun görülmesine izin vermez, sadece değeri döner. Fakat çoğu durumda bu daha kısa ve yeterli bir kullanımdır.

Teknik olarak diziler objedir, bundan dolayı `for..in` kullanmak mümkündür.

```js run
let arr = ["Elma", "Portakal", "Erik"];

*!*
for (let key in arr) {
*/!*
  alert( arr[key] ); // Elma, Portakal, Erik
}
```
Fakat bu bazı problemlere neden olur:

1. `for..in` döngüsü var olan *tüm özelliklerin* üzerinden geçer, sadece sayısal olanların değil.

    "dizi-benzeri" objeler bazı tarayıcı ve diğer çevrelerde kullanılmaktadır. Bunlar "dizi gibi dururlar", `length` ve indeks özelliklerine sahiptirler fakat sayısal olmayan özelliklere sahip metodlar da bulunmaktadır. Genelde bunlara ihtiyaç duyulmaz. `for..in` döngüsü bunları da listeler. Bundan dolayı dizi-benzeri bir obje ile çalışılacaksa, bu "ekstra" özellikler problem teşkil edebilir.
    
2. `for..in` döngüsü genel objeler için kullanışlıdır, diziler için değil. Bundan dolayı diziler için kullanıldığında 10-100 kata kadar daha yavaştır. Tabi hala hızlı sayılır. Bu hız sadece darboğaz (bottleneck) olduğunda önem kazanır, aksi halde anlamsızdır. Fakat yine de bu farkı bilmek iyidir.

Genel olarak, `for..in` diziler ile kullanılmaz.


## "length" ile ilgili bir not.

`length` özelliği dizi düzenlendiğinde otomatik olarak güncellenir. Tam olarak bu uzunluk dizideki eleman sayısı değildir, en büyük sayısal indeksin bir fazlasıdır.

Örneğin indeksi büyük tek bir elemanlı dizi büyük uzunluk verir:

```js run
let meyveler = [];
meyveler[123] = "Elma";

alert( meyveler.length ); // 124
```
Genelde diziler bu şekilde kullanılmaz.

`length` hakkında diğer bir ilginç bilgi ise bu özelliğin yazılabilir olmasıdır.

Eğer elle bu değeri yükseltirseniz hiçbir şey olmaz, fakat düşürürseniz dizideki elemanlar silinir. Bu işlem geri döndürülemez, örneğin:

```js run
let arr = [1, 2, 3, 4, 5];

arr.length = 2; // 2 elemana düşür
alert( arr ); // [1, 2]

arr.length = 5; // uzunluğu geri al 
alert( arr[3] ); // undefined: değer dönmez
```
Dizinin içerisini silmenin kolay yolu : `arr.length=0`.


## new Array() [#new-array]

Dizi yaratmanın bir diğer yolu ise aşağıdaki gibidir:

```js
let arr = *!*new Array*/!*("Elma", "Armut", "vs");
```

<<<<<<< HEAD
Bu şekilde yazım daha nadir kullanılır, `[]` kullanımı daha kısadır. Farklı bir özelliği daha vardır:
=======
It's rarely used, because square brackets `[]` are shorter. Also, there's a tricky feature with it.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Eğer `new Array` sayı argümanı ile çağırılırsa, yeni bir boş dizi yaratır. İçerisine bir şey koymaz ve dizinin boyutunu belirtilen değer kadar tanımlar.

<<<<<<< HEAD
Bu özellik yanlış kullanıma müsaittir:
=======
Let's see how one can shoot themselves in the foot:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let arr = new Array(2); //  [2] diye bir dizi mi oluşturacak ?

alert( arr[0] ); // undefined! böyle bir eleman yok

alert( arr.length ); // length 2
```

<<<<<<< HEAD
Yukarıda `new Array(sayı)`'nın tüm elemanları `undefined` döndürür.

Böyle sürprizler ile karşılaşmamak için genelde `[]` kullanılır. 
=======
To avoid such surprises, we usually use square brackets, unless we really know what we're doing.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Çok Boyutlu Diziler

Dizilerin elemanları dizi olabilir. Matrisleri tutmak için çok boyutlu diziler kullanılabilir:

```js run
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

<<<<<<< HEAD
alert( matrix[1][1] ); // merkez eleman
=======
alert( matrix[0][1] ); // 2, the second value of the first inner array
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## toString

Dizilerin kendi `toString` uygulaması mevcuttur. Bu dizilerin arasına virgül konularak geri döndürülür.

Örneğin:


```js run
let arr = [1, 2, 3];

alert( arr ); // 1,2,3
alert( String(arr) === '1,2,3' ); // true
```
Şu şekilde denenirse:

```js run
alert( [] + 1 ); // "1"
alert( [1] + 1 ); // "11"
alert( [1,2] + 1 ); // "1,21"
```

Dizilerin `Symbol.toPrimitive` özellikleri yoktur, `valueOf` metodu da bulunmamaktadır. Sadece `toString` çevirimi mevcuttur. Bundan dolayı `[]` boş karakter dizisi döndürür ` ` , `[1]` 1, veya `[1,2]` `"1,2"` döndürür.

`"+"` operatörü karakter dizisine ekleme yaptığında diğer bölümü de karakter dizisine çevirir. Bundan dolayı sonraki adım şu şekilde görülür:

```js run
alert( "" + 1 ); // "1"
alert( "1" + 1 ); // "11"
alert( "1,2" + 1 ); // "1,21"
```

<<<<<<< HEAD
## Özet
=======
## Don't compare arrays with ==

Arrays in JavaScript, unlike some other programming languages, shouldn't be compared with operator `==`.

This operator has no special treatment for arrays, it works with them as with any objects.

Let's recall the rules:

- Two objects are equal `==` only if they're references to the same object.
- If one of the arguments of `==` is an object, and the other one is a primitive, then the object gets converted to primitive, as explained in the chapter <info:object-toprimitive>.
- ...With an exception of `null` and `undefined` that equal `==` each other and nothing else.

The strict comparison `===` is even simpler, as it doesn't convert types.

So, if we compare arrays with `==`, they are never the same, unless we compare two variables that reference exactly the same array.

For example:
```js run
alert( [] == [] ); // false
alert( [0] == [0] ); // false
```

These arrays are technically different objects. So they aren't equal. The `==` operator doesn't do item-by-item comparison.

Comparison with primitives may give seemingly strange results as well:

```js run
alert( 0 == [] ); // true

alert('0' == [] ); // false
```

Here, in both cases, we compare a primitive with an array object. So the array `[]` gets converted to primitive for the purpose of comparison and becomes an empty string `''`.

Then the comparison process goes on with the primitives, as described in the chapter <info:type-conversions>:

```js run
// after [] was converted to ''
alert( 0 == '' ); // true, as '' becomes converted to number 0

alert('0' == '' ); // false, no type conversion, different strings
```

So, how to compare arrays?

That's simple: don't use the `==` operator. Instead, compare them item-by-item in a loop or using iteration methods explained in the next chapter.

## Summary
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Dizi özel bir çeşit objedir, verilerin sıralı bir şekilde saklanması için uygun bir tiptir.

<<<<<<< HEAD
- Tanım:

    ```js
    // köşeli parantez ile (genel kullanılan)
    let arr = [item1, item2...];

    // new Array (Çok nadir kullanım)
    let arr = new Array(item1, item2...);
    ```
    `new Array(number)` verilen boyutlarda yeni bir dizi yaratır, fakat eleman olmadan.

- `length` özelliği dizinin boyu ve daha net olmak gerekirse son index sayısı + 1 şeklindedir. Dizi metodları tarafından otomatik olarak ayarlanır.
- Eğer `length`'i elle küçültürseniz dizi de kısalacaktır, tabi bu veri kayıplarına neden olabilir.
=======
The declaration:

```js
// square brackets (usual)
let arr = [item1, item2...];

// new Array (exceptionally rare)
let arr = new Array(item1, item2...);
```

The call to `new Array(number)` creates an array with the given length, but without elements.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3


<<<<<<< HEAD
Dizi üzerinde aşağıdaki işlemler yapılabilir:
=======
Getting the elements:

- we can get element by its index, like `arr[0]`
- also we can use `at(i)` method that allows negative indexes. For negative values of `i`, it steps back from the end of the array. If `i >= 0`, it works same as `arr[i]`.

We can use an array as a deque with the following operations:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

- `push(...items)` `items`'ı sona ekler.
- `pop()` sondan bir eleman siler ve döndürür.
- `shift()` başlangıçtan eleman siler ve bunu döndürür.
- `unshift(...items)` başlangıca `items` ekler.

Dizinin elemanlarını `for` döngüsü ile dönme:
  
  - `for(let i=0; i<arr.length; i++)` -- hızlı çalışır ve eski tarayıcılara uyarlıdır.
  - `for(let item of arr)` -- sadece elemanların yazımı için modern yazım sağlar.
  - `for(let i in arr)` -- kullanılamaz.

<<<<<<< HEAD
Dizilere üzerinden tekrar geçilecektir. Diğer ekleme, silme, elemanların alınması, sıralanması gibi konulara <info:array-methods> bölümünde değinilecektir.
=======
To compare arrays, don't use the `==` operator (as well as `>`, `<` and others), as they have no special treatment for arrays. They handle them as any objects, and it's not what we usually want.

Instead you can use `for..of` loop to compare arrays item-by-item.

We will continue with arrays and study more methods to add, remove, extract elements and sort arrays in the next chapter <info:array-methods>.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
