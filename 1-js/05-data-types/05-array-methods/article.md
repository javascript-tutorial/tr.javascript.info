# Dizi Metodları

Diziler bir çok metod sunarlar. İşleri daha kolaylaştırmak için bu bölüm ikiye ayrılacaktır.

## Elaman silme/ekleme

Eleman eklemenin ve silmenin baştan ve sondan nasıl olacağını gördünüz:

- `arr.push(...items)` -- elemanları sona ekler,
- `arr.pop()` -- sondaki elemanı çıkarır.
- `arr.shift()` -- başlangıçtan eleman çıkarır.
- `arr.unshift(...items)` -- başlangıça eleman ekler.

Diğer birkaç metod ise aşağıdaki gibidir.

### splice

Diziden eleman nasıl silinir?

Diziler de obje olduklarından dolayı, `delete` kullanarak silinebilir.

```js run
let arr = ["eve", "gitmek", "istiyorum"];

delete arr[1]; // "gitmek" silinecek 

alert( arr[1] ); // undefined

// şimdi arr = ["eve",  , "istiyorum"];
alert( arr.length ); // 3
```

Eleman silinmesine rağmen, dizi hala 3 elemana sahip. Bunu `arr.length == 3` kontrolünü yaparak görebilirsiniz.

Olması gereken de bu, çünkü `delete obj.key` değeri `anahtara` göre siler. Sadece bu işi yapar. Bu da objeler için yeterlidir. Fakat diziler için genelde istediğimiz elamanların birbirlerinin yerleri doldurmasıdır. Bundan dolayı dizinin kısaldığını görmemiz lazım.

Bundan dolayı özel metodlar kullanılmalıdır.

<<<<<<< HEAD
[arr.splice(str)](mdn:js/Array/splice) metodu isviçre çakısı gibi her işe yarar. Diziye yeni bir eleman ekleyebilir ve silebilir.
=======
The [arr.splice](mdn:js/Array/splice) method is a swiss army knife for arrays. It can do everything: insert, remove and replace elements.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Yazımı:

```js
arr.splice(start[, deleteCount, elem1, ..., elemN])
```
`index`'ten başlar ve `deleteCount`kadar elemanı siler ve sonra `elem1, ..., elemN` şeklinde yerlerine yerleştirir. Diziden silinen elemanları dönderir.

<<<<<<< HEAD
Bu metodu örnek ile anlamak çok daha kolaydır.
=======
It modifies `arr` starting from the index `start`: removes `deleteCount` elements and then inserts `elem1, ..., elemN` at their place. Returns the array of removed elements.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Silme işlemi ile başlayalım:

```js run
let arr = ["Ben", "JavaScript", "çalışıyorum"];

*!*
arr.splice(1, 1); // index 1'den 1 elaman sil
*/!*

alert( arr ); // ["Ben", "çalışıyorum"]
```
Kolay değil mi? `1`. indeksten başlayarak 1 eleman sildi.

Bir sonraki örnekte ise 4 eleman silinecek ve yeni bir eleman bunların yerine konulacak.

```js run
let arr = [*!*"Ben", "şu", "an", "JavaScript",*/!* "çalışıyorum"];

// İlk 4 elamanı sil ve öncesine yeni eleman ekle.
arr.splice(0, 4, "Ders")

alert( arr ) // Şimdi [Ders çalışıyorum]
```
Burada `splice` in silinen elemanları döndürdüğü görülebilir.

```js run
let arr = [*!*"Ben", "şu",*/!* "an", "JavaScript", "çalışıyorum"];

// ilk iki elemanı sil.
let removed = arr.splice(0, 2);

alert( removed ); // "Ben", "şu" <-- silinen elemanlar
```
`splice` metodu ayrıca hiç birşey silmeden de ekleme yapabilir. Bunun için `deleteCount`'u `0` yapmanız gerekmektedir:

```js run
let arr = ["Ben", "JavaScript", "çalışıyorum"];

// 1. indeksten
// 0 tane sil
// Sonrasında "karmaşık" ekle
arr.splice(1, 0,  "karmaşık");

alert( arr ); // "Ben", "karmaşık", "JavaScript", "çalışıyorum"
```

````smart header="Negatif indeksler de kullanılabilir"
Bu ve diğer metodlarda negatif indeksler kullanılabilir. Negatif indeksler dizinin sonundan başına doğrudur. Örneğin:

```js run
let arr = [1, 2, 5]

// indeks -1 ( sondan birinci ) 
// 0 eleman sil,
// 3 vs 4 ekle
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```
````

### slice

[arr.slice](mdn:js/Array/slice) metodu `arr.splice`'a göre daha basittir.

Yazımı:

```js
arr.slice([start], [end])
```
Yeni bir dizi döndürür. Bu dizi içerisinde `"start"` ile `"end"` arasında ( `"end"` dahil olmadan ) tüm elemanları kopyalar. `start` ve `end` negatif olabilir. Negatif durumlarda dizi sondan değer başlar.

<<<<<<< HEAD
`str.slice` gibi çalışır fakat karakter dizisi(string) yapmak yerine alt-dizi yapar.
=======
It returns a new array copying to it all items from index `start` to `end` (not including `end`). Both `start` and `end` can be negative, in that case position from array end is assumed.

It's similar to a string method `str.slice`, but instead of substrings it makes subarrays.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Örneğin:

```js run
let arr = ["t", "e", "s", "t"];

alert( arr.slice(1, 3) ); // e,s (copy from 1 to 3)

alert( arr.slice(-2) ); // s,t (copy from -2 till the end)
```

We can also call it without arguments: `arr.slice()` creates a copy of `arr`. That's often used to obtain a copy for further transformations that should not affect the original array.

### concat

<<<<<<< HEAD
[arr.concat](mdn:js/Array/concat) metodu dizi ile diğer dizileri veya elemanları birbirine eklemeye yarar.
=======
The method [arr.concat](mdn:js/Array/concat) creates a new array that includes values from other arrays and additional items.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Yazımı:

```js
arr.concat(arg1, arg2...)
```

İstenildiği kadar argümanı kabul eder, bunlar dizi veya değer olabilir.

Sonuç `arr`, ardından `arg1`, `arg2` şeklinde tüm dizileri ve değerleri içeren bir dizi olur.

<<<<<<< HEAD
Eğer bir argüman dizi ve `Symbol.isConcatSpreadable` özelliğine sahip ise ise bunun tüm alt elemanları kopyalanır. Diğer türlü argümanın sadece kendisi kopyalanır.
=======
If an argument `argN` is an array, then all its elements are copied. Otherwise, the argument itself is copied.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Örneğin:

```js run
let arr = [1, 2];

<<<<<<< HEAD
// diziyi [3,4] ile birleştir
alert( arr.concat([3, 4])); // 1,2,3,4

// diziyi [3,4] ve [5,6] ile birleştir
alert( arr.concat([3, 4], [5, 6])); // 1,2,3,4,5,6

// diziyi [3,4] ile birleştir ve ardından 5, 6 ekle 
alert( arr.concat([3, 4], 5, 6)); // 1,2,3,4,5,6
```
Normalde, dizide bulunan elemanları kopyalar. Diğer objeler dizi olsalar bile bir bütün olarak eklenirler.
=======
// create an array from: arr and [3,4]
alert( arr.concat([3, 4]) ); // 1,2,3,4

// create an array from: arr and [3,4] and [5,6]
alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

// create an array from: arr and [3,4], then add values 5 and 6
alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6
```

Normally, it only copies elements from arrays. Other objects, even if they look like arrays, are added as a whole:
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]
```

<<<<<<< HEAD
...Fakat dizi benzeri obje `Symbol.isConcatSpreadable` özelliğine sahipse, bunların elemanları eklenir:

=======
...But if an array-like object has a special `Symbol.isConcatSpreadable` property, then it's treated as an array by `concat`: its elements are added instead:
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

```js run
let arr = [1, 2];

let arrayLike = {
  0: "başka",
  1: "birşey",
*!*
  [Symbol.isConcatSpreadable]: true,
*/!*
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,başka,birşey
```

## Dizide arama

Dizi içerisinde aramak için bazı metodlar bulunmaktadır.

### indexOf/lastIndexOf ve includes

<<<<<<< HEAD
[arr.indexOf](mdn:js/Array/indexOf), [arr.lastIndexOf](mdn:js/Array/lastIndexOf) ve [arr.includes](mdn:js/Array/includes) aynı yazıma sahiptirler, ve aslında hepsi aynı işi yapar. Sadece karakterler yerine elemanlar üzerinde çalışırlar.
=======
Now let's cover methods that search in an array.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

- `arr.indexOf(eleman, balangic)` `baslangic` indeksinden itibaren `eleman`'ı arar ve bulursa bunun indeksini döner, bulamazsa `-1` döner.
- `arr.lastIndexOf(eleman, baslangic)` -- aynı, fakat bu sağdan sola doğru bakar.
- `arr.includes(eleman, baslangic)` --  `eleman` `baslangıc`'tan başlayarak elemanları kontrol eder. Bulursa `true` döner.


Örneğin:

```js run
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

Bu metodlar eşitlik kontrolü için `===` kullanır. Bundan dolayı `false`'a bakacak olursanız `0` ile eşit değildir. Sadece `false` ile eşittir.
Eğer sadece dizi içinde var olup olmadığını kontrol etmek istiyorsanız `arr.includes` tercih edilir.
 
### find and findIndex

Objelerden oluşma bir dizinin olduğunu varsayın. Bazı şartları sağlayan objeleri nasıl bulursunuz.

<<<<<<< HEAD
Burada [arr.find](mdn:js/Array/find) metodu yararlı olur.
=======
Here the [arr.find(fn)](mdn:js/Array/find) method comes in handy.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Yazımı:
```js
let result = arr.find(function(elaman, index, dizi) {
  //  eğer aranan eleman bulunursa true döndürmeli.
});
```
Bu fonksiyon her eleman için tekrar tekrar çağırılır.

<<<<<<< HEAD
- `elaman` eleman'ı tanımlar.
- `index` indeks'i tanımlar.
- `array` dizinin kendisidir.
=======
The function is called for elements of the array, one after another:

- `item` is the element.
- `index` is its index.
- `array` is the array itself.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Eğer `true` döndürür ise arama durur ve `eleman`'ın kendisi döner. Eğer bulunamazsa `undefined` döndürülür.

Örneğin, kullanıcıların bulunduğu bir dizi ve her dizide `id` ve `isim` alanları bulunsun. `id == 1` olan elemanı bulalım.

```js run
let kullanicilar = [
  {id: 1, isim: "Ahmet"},
  {id: 2, isim: "Muzaffer"},
  {id: 3, isim: "Emine"}
];

let kullanici = kullanicilar.find(eleman => eleman.id == 1);

alert(kullanici.isim); // Ahmet
```
Objelerin dizi içerisinde yer alması çokça karşılaşılan bir olaydır, bundan dolayı `find` metodu çok kullanışlıdır.

Dikkat ederseniz `find` metodunda sadece bir tane argüman kullanılmıştır `item => item.id == 1`. `find` metodunun diğer parametreleri çok nadir olarak kullanılır.

<<<<<<< HEAD
[arr.findIndex](mdn:js/Array/findIndex) metodu da aynı find metodu gibi çalışır fakat elemanın kendi yerine `index`'ini döndürür.
=======
Note that in the example we provide to `find` the function `item => item.id == 1` with one argument. That's typical, other arguments of this function are rarely used.

The [arr.findIndex](mdn:js/Array/findIndex) method is essentially the same, but it returns the index where the element was found instead of the element itself and `-1` is returned when nothing is found.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

### filter

`find` metodu sadece fonksiyonu `true` yapan elemana bakar.

Birden fazlası için ise [arr.filter(fn)](mdn:js/Array/filter) kullanılabilir.

<<<<<<< HEAD
Yazımı neredeyse `find` ile aynıdır, fakat tek bir eleman yerine kurala uyan elemanları dizi halinde döner.

```js
let results = arr.filter(function(eleman, index, dizi) {
  // eğer elemanlar filtreye uygunsa true döndürür.
=======
The syntax is similar to `find`, but `filter` returns an array of all matching elements:

```js
let results = arr.filter(function(item, index, array) {
  // if true item is pushed to results and the iteration continues
  // returns empty array if nothing found
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f
});
```

Örneğin:

```js run
let kullanicilar = [
  {id: 1, isim: "Ahmet"},
  {id: 2, isim: "Muzaffer"},
  {id: 3, isim: "Emine"}
];

// ilk iki kullaniciyi döndürür.
let baziKullanicilar = kullanicilar.filter(eleman => eleman.id < 3);

alert(baziKullanicilar.length); // 2
```

<<<<<<< HEAD
## Dizi dönüşümleri
Bu bölüm dizinin dönüşümleri veya yeniden sıralanması hakkındadır.

=======
## Transform an array

Let's move on to methods that transform and reorder an array.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

### map

[arr.map](mdn:js/Array/map) metodu en fazla kullanılan ve kullanışlı olan metodlardandır.

<<<<<<< HEAD
Yazımı:

```js
let sonuc = arr.map(function(eleman, index, dizi) {
  // eleman yerine yeni değer döndürür.
})
=======
It calls the function for each element of the array and returns the array of results.

The syntax is:

```js
let result = arr.map(function(item, index, array) {
  // returns the new value instead of item
});
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f
```
Dizinin her elemanı için fonksiyonu çalıştırır ve sonuçlarını dizi olarak döner.

<<<<<<< HEAD
Örneğin elemanların uzunlukları ile ilgili bir değişiklik yapılabilir:
=======
For instance, here we transform each element into its length:
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

```js run
let uzuluklar = ["Bilbo", "Gandalf", "Nazgul"].map(eleman => eleman.length)
alert(uzunluklar); // 5,7,6
```

### sort(fn)

<<<<<<< HEAD
[arr.sort](mdn:js/Array/sort) metodu diziyi olduğu yerde sıralar.
=======
The call to [arr.sort()](mdn:js/Array/sort) sorts the array *in place*, changing its element order.

It also returns the sorted array, but the returned value is usually ignored, as `arr` itself is modified.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Örneğin:

```js run
let arr = [ 1, 2, 15 ];

<<<<<<< HEAD
// metod dizinin içeriğini sıralar ve döndürür.
=======
// the method reorders the content of arr
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f
arr.sort();

alert( arr );  // *!*1, 15, 2*/!*
```
Çıktısında birşey fark ettiniz mi?

Sıralama `1, 15, 2` oldu. Yanlış. Neden peki?

**Diziler varsayılan olarak karakter sıralamasına göre sıralanırlar.**

Tüm elemanlar karakter dizisine çevrilir ve karşılaştırılır. Bundan dolayı karakter sırasına göre `"2" > "15"` karşılaştırılır. 

<<<<<<< HEAD
Kendi sıralamanızı yapmak için, iki argümanlı bir fonksiyonu `arr.sort()`'ın argüman olarak alması gerekmektedir.


Fonksiyon aşağıdaki şekilde çalışmalıdır:

=======
Literally, all elements are converted to strings for comparisons. For strings, lexicographic ordering is applied and indeed `"2" > "15"`.

To use our own sorting order, we need to supply a function as the argument of `arr.sort()`.

The function should compare two arbitrary values and return:
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f
```js
function compare(a, b) {
  if (a > b) return 1; // if the first value is greater than the second
  if (a == b) return 0; // if values are equal
  if (a < b) return -1; // if the first value is less than the second
}
```

<<<<<<< HEAD
Örneğin:
=======
For instance, to sort as numbers:
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

```js run
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

*!*
arr.sort(compareNumeric);
*/!*

alert(arr);  // *!*1, 2, 15*/!*
```
Şimdi beklendiği gibi çalışmakta.

Ne olduğunu düşünürsek. `arr` herşeyi tutabilir, değil mi? Sayı, karakter veya html elementi vs. tutabilir. İçinde bulunanları sıralamak için karşılaştırmayı yapan *sıralama fonksiyonu*na ihtiyaç vardır. Bunun da varsayılanı karakter sıralamadır.

<<<<<<< HEAD
`arr.sort(fn)` metodu içinde sıralama algoritmasına sahiptir. Bu sıralamanın nasıl çalıştığına dair bir bilgimiz olmasına gerek yok (Çoğu zaman [quicksort](https://en.wikipedia.org/wiki/Quicksort) kullanılır). Diziyi dolanır ve elemanları verilen algoritmaya göre karşılaştırır ve sıralar. Tek bilmeniz gereken `fn` fonksiyonunun karşılaştırmayı yaptığıdır.

Eğer hangi elemanın karşılaştırıldığını öğrenmek istiyorsanız elbette bunu görebilirsiniz.
=======
Let's step aside and think what's happening. The `arr` can be array of anything, right? It may contain numbers or strings or objects or whatever. We have a set of *some items*. To sort it, we need an *ordering function* that knows how to compare its elements. The default is a string order.

The `arr.sort(fn)` method implements a generic sorting algorithm. We don't need to care how it internally works (an optimized [quicksort](https://en.wikipedia.org/wiki/Quicksort) or [Timsort](https://en.wikipedia.org/wiki/Timsort) most of the time). It will walk the array, compare its elements using the provided function and reorder them, all we need is to provide the `fn` which does the comparison.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f


```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
  return a - b;
});
```
Algoritma aynı elemanı bir kaç defa çalıştırma ihtiyacı duyabilir, fakat yine de olduğunca az karşılaştırmaya çalışır.


<<<<<<< HEAD

````smart header="Karşılaştırma fonksiyonu herhangi bir sayıyı döndürebilir."
=======
The algorithm may compare an element with multiple others in the process, but it tries to make as few comparisons as possible.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Aslında, karşılaştırma fonksiyonu "büyük" olduğunu belirtmek için pozisitif sayı, "az" olduğunu belirtmek için negatif sayı döndürmelidir.

Bu daha kısa fonksiyon yazılmasına olanak sağlar:

```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```
````

<<<<<<< HEAD
````smart header="Daha zarif bir fonksiyon için ok kullanmak."
[Ok fonksiyonlarını](info:arrow-functions-basics) hatırlarsanız burada daha zarif bir biçimde sıralama yapılabilir:
=======
````smart header="Arrow functions for the best"
Remember [arrow functions](info:arrow-functions-basics)? We can use them here for neater sorting:
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

```js
arr.sort( (a, b) => a - b );
```
<<<<<<< HEAD
Bu, daha uzun versiyonu ile aynı şekilde çalışır.
=======

This works exactly the same as the longer version above.
````

````smart header="Use `localeCompare` for strings"
Remember [strings](info:string#correct-comparisons) comparison algorithm? It compares letters by their codes by default.

For many alphabets, it's better to use `str.localeCompare` method to correctly sort letters, such as `Ö`.

For example, let's sort a few countries in German:

```js run
let countries = ['Österreich', 'Andorra', 'Vietnam'];

alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (wrong)

alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (correct!)
```
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f
````

### reverse

[arr.reverse](mdn:js/Array/reverse) metodu `arr`'in sıralamasını terse çevirir.

Örneğin:

```js run
let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1
```
Ayrıca terse çevirmesinden sonra `arr`'i döndürür.

### split and join

Bunun uygulamasını gerçek hayatta şu şekilde görmek mümkndür. Bir mesajlaşma uygulaması yazıdğınızı düşünün. Gönderen kişi alıcıları virgülle ayırarak yazsın. Örneğin `Ahmet, Mehmet, Muzaffer` gibi. Fakat bizim için bunun bir dizi olması karakter dizisi olmasından daha kullanışlıdır. Peki bu nasıl yapılmalı?

[str.split(delim)](mdn:js/String/split) tam olarak bunu yapmaktadır. Karakterleri verilen `delim` e göre ayırır ve sonrasında bunları dizi olarak döner.

Aşağıdaki örnekte isimler virgül ve ardından boşluk yazarak ayrılmıştır.

```js run
let isimler = 'Bilbo, Gandalf, Nazgul';

let arr = isimler.split(', ');

for (let isim of arr) {
  alert( ` ${name}'e mesaj.` ); // Bilbo'e mesaj ve diğerleri.
}
```
`split` metodu isteğe bağlı ikincil bir sayısal argüman alabilir - dizinin boyutu. Eğer bu verilirse, dizi bu verilen uzunluk kadar dolduktan sonra geri kalanlar görmezden gelinir. Pratikte çok nadir kullanılır.

```js run
let dizi = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
```

````smart header="Harflere Çevirme"
`split(s)`i boş `s` ile çağırırsanız harflerin dizisi haline getirirsiniz.

```js run
let str = "test";

alert( str.split('') ); // t,e,s,t
```
````

<<<<<<< HEAD
[arr.join(str)](mdn:js/Array/join) `split` in tam tersini yapar. `arr`'den karakter dizileri yaratır.
=======
The call [arr.join(glue)](mdn:js/Array/join) does the reverse to `split`. It creates a string of `arr` items joined by `glue` between them.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Örnek:

```js run
let dizi = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';'); // glue the array into a string using ;

alert( str ); // Bilbo;Gandalf;Nazgul
```

### reduce/reduceRight

Dizi elemanlarının üzerinden geçilmek istendiğinde `forEach` kullanmak mümkündür.

[arr.reduce](mdn:js/Array/reduce) ve [arr.reduceRight](mdn:js/Array/reduceRight) metodları da bu işe yarar fakat daha dallı budaklıdır. Genelde dizilere göre tek bir karakter dizisini hesaplamaya yarar.

Yazımı:

```js
<<<<<<< HEAD
let value = arr.reduce(function(previousValue, item, index, arr) {
=======
let value = arr.reduce(function(accumulator, item, index, array) {
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f
  // ...
}, [initial]);
```

<<<<<<< HEAD
Fonksiyon elemanlara uygulanır. İkinciden itibaren benzer bir yazıma rastlayabilirsiniz.

- `item` -- dizinin o anki elemanı.
- `index` -- elemanın pozisyonu.
- `arr` -- dizi.

Şimdiye kadar `forEach/map` gibi. Fakat bir argüman daha var:

- `previousValue` bir önceki fonksiyonun sonucudur `initial` ilk çağrının sonucudur.
=======
The function is applied to all array elements one after another and "carries on" its result to the next call.

Arguments:

- `accumulator` -- is the result of the previous function call, equals `initial` the first time (if `initial` is provided).
- `item` -- is the current array item.
- `index` -- is its position.
- `array` -- is the array.

As function is applied, the result of the previous function call is passed to the next one as the first argument.

So, the first argument is essentially the accumulator that stores the combined result of all previous executions. And at the end it becomes the result of `reduce`.

Sounds complicated?
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Örnekle anlatmak gerekirse:

Aşağıda dizinin toplamı bir satırda alınmaktadır:

```js run
let arr = [1, 2, 3, 4, 5]

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```
Burada `reduce` fonksiyonunun en çok kullanılan 2 argümanlı şekli kullanıldı.

<<<<<<< HEAD
Detaylarına bakılacak olursa:

1. İlk çalıştırıldığında `sum` başlangıç değerini alır ( `reduce`'un son argümanı ) `0`, ve `current` dizinin ilk elemanıdır `1`. Bundan dolayı sonuç `1` olur.
2. İkinci döngüde `sum = 1`, buna ikinci dizi elemanı olan `2` eklenir ve döndürülür.
3. Üçüncü döngüde ise `sum = 3` ve buna bir sonraki dizi elemanı eklenir ve böyle devam eder.
=======
The function passed to `reduce` uses only 2 arguments, that's typically enough.

Let's see the details of what's going on.

1. On the first run, `sum` is the `initial` value (the last argument of `reduce`), equals `0`, and `current` is the first array element, equals `1`. So the function result is `1`.
2. On the second run, `sum = 1`, we add the second array element (`2`) to it and return.
3. On the 3rd run, `sum = 3` and we add one more element to it, and so on...
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Hesaplama akışı:

![](reduce.svg)

Form tablosunda bunu daha açık bir şekilde görebilirsiniz. Satırlar fonksiyon çağrılarını göstermektedir.

<<<<<<< HEAD
|   |`toplam`|`şimdiki`|`sonuç`|
=======
|   |`sum`|`current`|result|
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f
|---|-----|---------|---------|
|birinci çağrı|`0`|`1`|`1`|
|ikinci çağrı|`1`|`2`|`3`|
|üçüncü çağrı|`3`|`3`|`6`|
|dördüncü çağrı|`6`|`4`|`10`|
|beşinci çağrı|`10`|`5`|`15`|

<<<<<<< HEAD
Gördüğünüz gibi bir önceki fonksiyonun sonucu sonraki fonksiyonun argümanı olmakta.

Bunun ile birlikte başlangıç değerini pas geçmekte mümkün:
=======
Here we can clearly see how the result of the previous call becomes the first argument of the next one.

We also can omit the initial value:
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

```js run
let arr = [1, 2, 3, 4, 5];

// başlangıç değeri silindi, 0 değil.
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15
```
Sonuç aynı. Başlangıç değeri olmadığından dolayı, `reduce` fonksiyonu diznin ilk elemanını başlangıç değeri olarak almakta ve ikinciden itibaren döngüye başlamaktadır.

Hesaplama tablosu yukarıdaki ile aynı olmaktadır, sadece birinci satır silinir.

Fakat böyle kullanımda çok dikkatli olunmalıdır. Eğer dizi boş ise, `recude` çağrısı başlangıç değeri olmadığında hata verir.

Örneğin:

```js run
let arr = [];

// Hata: Başlangıç değeri olmayan boş dizi ile `reduce` fonksiyonu kullanıldı.
// Eğer başlangıç değeri olsaydı, `reduce` boş diziyi döndürebilirdi.
arr.reduce((sum, current) => sum + current);
```

<<<<<<< HEAD
Bundan dolayı her zaman başlangıç değeri kullanılması önerilir.

[arr.reduceRight](mdn:js/Array/reduceRight) metodu da `reduce` metodu ile aynı işi yapar fakat diziyi sağdan sola doğru okur.

## Tekrar: forEach

[arr.forEach](mdn:js/Array/forEach) metodu her eleman için bir fonksiyon çalıştırmaya yarar.

Yazımı:
```js
arr.forEach(function(item, index, array) {
  // ... elemanla birşeyler yap
});
```
Örneğin aşağıdaki kod dizinin her elemanını göstermeye yarar:

```js run
// her eleman için alert çağır
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```
=======
So it's advised to always specify the initial value.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Aşağıdaki kod elemanın dizideki pozisyonu hakkında daha açıklayıcıdır:

```js run
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} ${array}'in ${index}. indeksinde`);
});
```
Eğer fonksiyonun bir sonucu varsa bu görmezden gelinir.

## Array.isArray

Diziler farklı bir tip değildir. Obje üzerine kurulmuşlardır.

Bundan dolayı `typeof` normal obje ile diziyi ayırt etmekte yardımcı olamaz:

```js run
alert(typeof {}); // object
alert(typeof []); // aynısı
```

... Fakat diziler çok kullanıldığından dolayı buna has metod bulunmaktadır: [Array.isArray(value)](mdn:js/Array/isArray) . Eğer değer `dizi` ise `true` döndürür. Diğer türlü `false` döndürür.

```js run
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## Çoğu metod "thisArg"'ı destekler

Fonksiyonları çağıran neredeyse tüm dizi metodları -- `find`, `filter`, `map` gibi `sort` hariç, ayrıca opsiyonel `thisArg` parametresini kabul eder.

Yukarıdaki bölümde bu parametreden bahsedilmedi, bunun sebebi çok nadir olarak kullanılmasından dolayıdır. Fakat bütünlüğün sağlanmasından dolayı üstünden geçmekte fayda var.

Bu metodlarla "thisArg"'ın yazımı aşağıdaki gibidir:

```js
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg isteğe bağlı olarak kullanılan bir argümandır.
```
`thisArg` değeri `func` için `this` olmaktadır.

<<<<<<< HEAD
Örneğin, aşağıda objenin metodu filtre olarak kullanılmaktadır ve `thisArg` bu durumda oldukça kullanışlıdır:

```js run
let kullanici = {
  yas: 18,
  dahaGenc(digerKullanici) {
    return digerKullanici.yas < this.yas;
  }
};

let kullanicilar = [
  {yas: 12},
  {yas: 16},
  {yas: 32}
];

*!*
// kullanıcıdan daha genç kullanıcıları bulunuz
let dahaGencKullanicilar = kullanicilar.filter(kullanici.dahaGenc, kullanici);
*/!*

alert(dahaGencKullanicilar.length); // 2
```

Yukarıdaki çağrıda `kullanici.dahaGenc` filtre olarak kullanılmaktadır. Ayrıca `kullanici` bu fonksiyona gönderilmektedir. Eğer `kullanici.filter(kullanici.dahaGenc)`'i vermezseniz, `kullanici.dahaGenc` `this=undefined` olarak çağrılır. Bu da anında hata verir.
=======
The value of `thisArg` parameter becomes `this` for `func`.

For example, here we use a method of `army` object as a filter, and `thisArg` passes the context:

```js run
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

*!*
// find users, for who army.canJoin returns true
let soldiers = users.filter(army.canJoin, army);
*/!*

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23
```

If in the example above we used `users.filter(army.canJoin)`, then `army.canJoin` would be called as a standalone function, with `this=undefined`, thus leading to an instant error.

A call to `users.filter(army.canJoin, army)` can be replaced with `users.filter(user => army.canJoin(user))`, that does the same. The latter is used more often, as it's a bit easier to understand for most people.

## Summary
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

## Özet

<<<<<<< HEAD
Dizi metodlarının kısa açıklamaları:

- Eleman ekleme/silme metodları:
  - `push(...items)` -- elemanları sona ekler,
  - `pop()` -- en sondaki elemanı alır,
  - `shift()` -- başlangıçtan eleman alır,
  - `unshift(...items)` -- başlangıça eleman ekler
  - `splice(pos, deleteCount, ...items)` --  `pos` indeksinde `deleteCount` sayısı kadar elemanı siler ve bunları `items`'a ekler.
  - `slice(start, end)` -- `start` ile `end` pozisyonları arasındaki (`end` dahil değil) elemanları yeni bir diziye kopyalar. 
  - `concat(...items)` -- yeni bir dizi döndürür: var olan dizideki tüm elemanları kopyalar ve `items`'ı ekler. Eğer `items` dizi ise bunun elemanları da alınır.
  
- Elemanları aramaya yönelik metodlar:
  - `indexOf/lastIndexOf(item, pos)` -- `pos`'tan başlayarak `item`'ı arar. Bulursa indeksini döndürür, bulamaz ise `-1` döndürür.
  - `includes(value)` -- eğer dizi `value`'ya sahipse `true` döndürür. Diğer türlü `false` döndürür.
  - `find/filter(func)` -- Elemanları fonksiyonlar ile filtreler. Buna göre fonksiyonu `true` yapan ilk veya tamamını döner.
  - `findIndex` aynı `find` gibidir fakat bir değer yerine index döner.
  
- Diziler üzerinde dönüşümler:
  - `map(func)` -- her eleman için `func` çağrılır ve bunların sonuçlarından bir dizi üretilerek döndürülür.
  - `sort(func)` -- diziyi olduğu yerde sıralar ve döndürür.
  - `reverse()` -- diziyi terse çevirir ve döndürür.
  - `split/join` -- karakterleri diziye çevirir veya dizileri karaktere çevirir.
  - `reduce(func, initial)` -- dizide bulunan elemanlar sıra ile `func` fonksiyonu üzerinden hesaplanır ve son değer döndürülür.
  
- Elemanlar üzerinden dönme:
  - `forEach(func)` -- dizide bulunan her eleman için `func` çağrılır. Hiç birşey döndürmez.
=======
- To add/remove elements:
  - `push(...items)` -- adds items to the end,
  - `pop()` -- extracts an item from the end,
  - `shift()` -- extracts an item from the beginning,
  - `unshift(...items)` -- adds items to the beginning.
  - `splice(pos, deleteCount, ...items)` -- at index `pos` deletes `deleteCount` elements and inserts `items`.
  - `slice(start, end)` -- creates a new array, copies elements from index `start` till `end` (not inclusive) into it.
  - `concat(...items)` -- returns a new array: copies all members of the current one and adds `items` to it. If any of `items` is an array, then its elements are taken.

- To search among elements:
  - `indexOf/lastIndexOf(item, pos)` -- look for `item` starting from position `pos`, return the index or `-1` if not found.
  - `includes(value)` -- returns `true` if the array has `value`, otherwise `false`.
  - `find/filter(func)` -- filter elements through the function, return first/all values that make it return `true`.
  - `findIndex` is like `find`, but returns the index instead of a value.

- To iterate over elements:
  - `forEach(func)` -- calls `func` for every element, does not return anything.

- To transform the array:
  - `map(func)` -- creates a new array from results of calling `func` for every element.
  - `sort(func)` -- sorts the array in-place, then returns it.
  - `reverse()` -- reverses the array in-place, then returns it.
  - `split/join` -- convert a string to array and back.
  - `reduce/reduceRight(func, initial)` -- calculate a single value over the array by calling `func` for each element and passing an intermediate result between the calls.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

- Ek olarak:
  - `Array.isArray(arr)`  `arr`'in dizi olup olmadığını kontrol eder.

Bu metodların içinden sadece `sort`, `reverse` ve `splice` doğrudan dizinin kendisi üzerinden işlem yapar. Diğerleri değer döndürür.


<<<<<<< HEAD
Yukarıdaki metodlar projelerin çoğundaki kullanılan dizi fonksiyonlarının %99'unu kapsar. Fakat bunun yanında farklı metodlar da bulunmaktadır:
=======
- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) check the array.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) diziyi kontrol eder.

<<<<<<< HEAD
  Dizinin her elemanı için `fn` çağırılır. `Map`'e çok benzer fakat herhangi biri/hepsi `true` ise `true` döndürür. Diğer türlü `false` döndürür.
  
- [arr.fill(value, start, end)](mdn:js/Array/fill) -- diziyi tekrar eden `value` değeri ile `start` ile `index` arasına doldurur.
=======
  These methods behave sort of like `||` and `&&` operators: if `fn` returns a truthy value, `arr.some()` immediately returns `true` and stops iterating over the rest of items; if `fn` returns a falsy value, `arr.every()` immediately returns `false` and stops iterating over the rest of items as well.

  We can use `every` to compare arrays:
  ```js run
  function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }

  alert( arraysEqual([1, 2], [1, 2])); // true
  ```

- [arr.fill(value, start, end)](mdn:js/Array/fill) -- fills the array with repeating `value` from index `start` to `end`.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- `start` tan `end`'e kadar olan elemanları `target`'tan itibaren var olanların üzerine yazarak yapıştırır.

<<<<<<< HEAD
Tüm liste için [kullanım talimatları](mdn:js/Array) sayfasına bakabilirsiniz.

Görünürde çok fazla metod varmış gibi ve ezberlemesi zormuş gibi görünse de aslında göründüğünden çok daha kolaydır.
=======
- [arr.flat(depth)](mdn:js/Array/flat)/[arr.flatMap(fn)](mdn:js/Array/flatMap) create a new flat array from a multidimensional array.

For the full list, see the [manual](mdn:js/Array).

From the first sight it may seem that there are so many methods, quite difficult to remember. But actually that's much easier.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Sadece tanımların bulunduğu sayfaya bakmanız yeterlid. Ardından bu bölümdeki örnekleri çözerek pratik yaparsanız metodlar ile ilgili yeteri kadar bilgi sahibi olmuş olursunuz.

Daha sonrasında metodlar ile ilgili birşey yapmak istediğinizde, nasıl yapıldığını bilmiyorsanız, buraya tekrar gelip doğru metodu bulabilirsiniz.
Buradaki örnekler doğru bir şekilde yazmanıza yardımcı olacaktır. Sonrasında metodları hiç bir özel çaba harcamadan hatırlayacak duruma gelebilirsiniz.
