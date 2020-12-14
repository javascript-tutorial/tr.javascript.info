<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
# Gerisi parametreleri ve yayma operatörleri
=======
# Rest parameters and spread syntax
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Çoğu JavaScript fonksiyonu istenilen sayıda argümanın yazılabilmesini desteklemektedir.

Örneğin:

- `Math.max(arg1, arg2, ..., argN)` -- en büyük sayıyı döndürür.
- `Object.assign(dest, src1, ..., srcN)` -- `src1..N`'in özelliklerini `dest`'e kopyalar.
- ...vs.

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Bu bölümde biz fonksiyonlarımızda bunları nasıl kullanabiliriz konusu üzerinde durulacaktır. Daha da önemlisi böyle fonksiyonlar ile nasıl rahat bir şekilde çalışılabilir bu gösterilecektir.
=======
In this chapter we'll learn how to do the same. And also, how to pass arrays to such functions as parameters.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

## Gerisi Parametreleri `...`

Fonksiyon istenildiği kadar argüman ile çağırılabilir, nasıl tanımlandığı önemli değidlir.

Aşağıdaki gibi:
```js run
function topla(a, b) {
  return a + b;
}

alert( topla(1, 2, 3, 4, 5) );
```
Çok fazla argüman yazdınız diye bir hata almazsınız. Fakat hesaplarken tabi ilk iki argüman işleme dahil olacaktır.

Geri kalanlar fonksiyon içerisinde `...`  ile gösterilebilir. Kelime anlamıyla "geri kalanları diziye al" anlamına gelir.

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Örneğin tüm elemanları `args` dizisine almak için:
=======
The rest of the parameters can be included in the function definition by using three dots `...` followed by the name of the array that will contain them. The dots literally mean "gather the remaining parameters into an array".

For instance, to gather all arguments into array `args`:
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

```js run
function hepsiniTopla(...args) { // args dizinin ismi
  let topla = 0;

  for(let arg of args) topla += arg;

  return topla;
}

alert( hepsiniTopla(1) ); // 1
alert( hepsiniTopla(1, 2) ); // 3
alert( hepsiniTopla(1, 2, 3) ); // 6
```
İlk parametreyi değişken olarak, geri kalanlar dizi olarak alınabilir.

Aşağıda ilk iki değişken alınır geriye kalanlar ise `basliklar`'a atanır:

```js run
function showName(adi, soyadi, ...basliklar) {
  alert( adi + ' ' + soyadi ); // Julius Caesar

  // geri kalanlar basliklar degikenine atanır.
  // Ör: basliklar = ["Konsil", "İmparator"]
  alert( basliklar[0] ); // Konsil
  alert( basliklar[1] ); // İmparator
  alert( basliklar.length ); // 2
}

showName("Julius", "Caesar", "Konsil", "İmparator");
```

````warn header="Geri kalanlar hep en sonda olmaldır"

Geri kalan parametreler hep en sonda olmalıdır. Bundan dolayı aşağıdaki kod pek mantıklı değildir.

```js
function f(arg1, ...rest, arg2) { // ...rest'ten sonra args ?!
  // error
}
```

`...rest` her zaman en sonda olmalıdır. 
````


## "arguments" değişkeni

`arguments` adında dizi benzeri bir obje yer almaktadır. Bu obje tüm argümanları indeksine göre tutar. 

Örneğin:

```js run
function argumanIsimleri() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // Döngüye de alınabilir
  // for(let arg of arguments) alert(arg);
}

// shows: 2, Julius, Caesar
argumanIsimleri("Julius", "Caesar");

// shows: 1, Ahmet, tanimsiz (ikinci bir argüman yok.)
argumanIsimleri("Ahmet");
```

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Önceden, geriye kalanlar parametresi eklenmemişti, `arguments` değişkeni tüm argümanların alınacağı yegane yöntemdi.

Hala çalışmakta ve eski şekliyle kullanılabilir.
=======
In old times, rest parameters did not exist in the language, and using `arguments` was the only way to get all arguments of the function. And it still works, we can find it in the old code.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Fakat olumsuz tarafı, tam olarak dizi olmamasından dolayı dizilere ait bazi fonksiyonlar çağırılamaz. Örneğin `arguments.map(...)` mümkün değildir.

Ayrıca tüm argümanları alır, önceki geriye kalan parametrelerdeki gibi istenilen argüman başka bir değişkene atanamaz.

Eğer böyle bir özelliğe ihtiyacınız varsa bu durumda geriye kalanlar parametrelerini kullanmanız önerilir.

````smart header="Ok fonksiyonları `\"arguments\"` objesine sahip değillerdir."

Eğer `arguments` objesine ok fonksiyonlarında erişmeye çalışırsanız bu değerler dışta bulunan normal fonksiyondan alınan değerlerdir.

Örneğin:

```js run
function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
```
<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Hatırlayacaksınız ok fonksiyonlarının kendisine ait `this`'i bulunmamaktadır. Şimdi `arguments`'in olmadığını da biliyorsunuz.

````
=======

As we remember, arrow functions don't have their own `this`. Now we know they don't have the special `arguments` object either.
````


## Spread syntax [#spread-syntax]
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

## Yayma Operatörleri [#spread-operator]

Geriye kalan parametrelerden nasıl dizi oluşturulacağını bir önceki bölümde gördünüz.

Bazen bunun tam tersini yapmak gerekebilir.

Örneğin [Math.max](mdn:js/Math/max) fonksiyonu listede bulunan en büyük sayıyı dönmeye yarar:
```js run
alert( Math.max(3, 5, 1) ); // 5
```
Diyelim ki bir diziniz var `[3, 5, 1]` olsun. `Math.max` çağırıldığında ne olur.

Olduğu gibi bu dizi paslanırsa çalışmaz, çünkü `Math.max` sayısal argüman listesi bekler, dizi değil:


```js run
let arr = [3, 5, 1];

*!*
alert( Math.max(arr) ); // NaN
*/!*
```
... Ayrıca `Math.max(arg[0], arg[1], arg[2])` gibi sürekli indeksini elle yazacak haliniz yok, çünkü kaç tane olduğunu bilemeyebilirsiniz. Kodunuz çalıştıkça belki daha fazla olabilir veya daha az da olabilir bu durumda ortaya çirkin bir kod çıkacaktır.

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
*Yayma operatörü* bu durumda yardıma koşar. Geriye kalanlar parametrelerine benzer, `...`'yi bu da kullanır fakat tam olarak zıttıdır.
=======
And surely we can't manually list items in the code `Math.max(arr[0], arr[1], arr[2])`, because we may be unsure how many there are. As our script executes, there could be a lot, or there could be none. And that would get ugly.

*Spread syntax* to the rescue! It looks similar to rest parameters, also using `...`, but does quite the opposite.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Fonksiyon çağırıldığında `...arr` şeklinde kullanılırsa, döngüye alınabilir `arr` argüman listesi şekline dönüşür.

`Math.max` fonksiyonu için:

```js run
let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5 (diziyi argüman listesine çevirdi)
```
Ayrıca bu şekilde birçok dizi fonksiyona gönderilebilir:

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(...arr1, ...arr2) ); // 8
```
<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
...Ayrıca yayma operatörü ile normal operatörleri birlikte kullanabilirsiniz:
=======

We can even combine the spread syntax with normal values:
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/06-advanced-functions/02-rest-parameters-spread/article.md


```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Operatörler dizileri birleştirmek için de kullanılabilirler.
=======
Also, the spread syntax can be used to merge arrays:
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2];
*/!*

alert(merged); // 0,3,5,1,2,8,9,15 (0, then arr, then 2, then arr2)
```

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Yukarıdaki örnekte dizi kullanarak yayma operatörü gösterilmiştir. Sadece dizi değil her döngüye alınabilen üzerinde bu işlem yapılır.

Örneğin, aşağıdaki yayma operatörü metini karakterlerin dizisi şekline çevirir
=======
In the examples above we used an array to demonstrate the spread syntax, but any iterable will do.

For instance, here we use the spread syntax to turn the string into array of characters:
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

```js run
let str = "Hello";

alert( [...str] ); // H,e,l,l,o
```
Yayma operatörü içte döngü ile elemanları alır, aynı `for..of`'ta olduğu gibi.

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Bundan dolayı, karakter `for..of` kullanıldığında `...str` `"h","e","l","l","o"` şekline çevrilir. Karakter listesi dizi olarak tanımlanır  `[...str]`
=======
The spread syntax internally uses iterators to gather elements, the same way as `for..of` does.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Bu iş için `Array.from`'da kullanılabilir. Çünkü `Array.from` döngüye alınabilenleri ( karakter dizisi gibi) dizi yapar:

```js run
let str = "Hello";

// Döngüye alınabilenleri dizi haline getirir.
alert( Array.from(str) ); // H,e,l,l,o
```

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Sonuç `[...str]` ile aynıdır. Fakat `Array.from(obj)` and `[...obj]` ince bir fark bulunmaktadır.
=======
The result is the same as `[...str]`.

But there's a subtle difference between `Array.from(obj)` and `[...obj]`:

- `Array.from` operates on both array-likes and iterables.
- The spread syntax works only with iterables.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

- `Array.from` hem dizi-benzerlerinde hem de döngüye alınabilirlerde ( array-likes, iterables ) kullanılabilirler.
- Yayma operatörü ise sadece döngüye alınabilirlerde uygulanır.

Bundan dolayı, birşeyi diziye çevirmek için `Array.from` kullanmak daha mantıklı olacaktır.

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md

## Özet
=======
## Get a new copy of an array/object

Remember when we talked about `Object.assign()` [in the past](info:object-copy#cloning-and-merging-object-assign)?

It is possible to do the same thing with the spread syntax.

```js run
let arr = [1, 2, 3];
let arrCopy = [...arr]; // spread the array into a list of parameters
                        // then put the result into a new array

// do the arrays have the same contents?
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// are the arrays equal?
alert(arr === arrCopy); // false (not same reference)

// modifying our initial array does not modify the copy:
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3
```

Note that it is possible to do the same thing to make a copy of an object:

```js run
let obj = { a: 1, b: 2, c: 3 };
let objCopy = { ...obj }; // spread the object into a list of parameters
                          // then return the result in a new object

// do the objects have the same contents?
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// are the objects equal?
alert(obj === objCopy); // false (not same reference)

// modifying our initial object does not modify the copy:
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
```

This way of copying an object is much shorter than `let objCopy = Object.assign({}, obj);` or for an array `let arrCopy = Object.assign([], arr);` so we prefer to use it whenever we can.


## Summary

When we see `"..."` in the code, it is either rest parameters or the spread syntax.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

`"..."`'karakterlerini kodda görünce bunların geriye kalan veya yayma karakterleri olduğu söylenebilir.

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Bunların ayrımını daha kılay yapabilmek için
=======
- When `...` is at the end of function parameters, it's "rest parameters" and gathers the rest of the list of arguments into an array.
- When `...` occurs in a function call or alike, it's called a "spread syntax" and expands an array into a list.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

- Eğer `...` fonksiyonun sonunda yer alırsa "geriye kalanlar" parametresidir ve geriye kalanlar diziye alınırlar.
- Eğer `...` fonksiyon çağrımında veya benzeri bir olayda kullanılırsa buna "yayma operatörü" denir ve diziyi listeye çevirir.

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Kalıpların kullanılması:
- Geriye akaln parametresi isteğe göre argüman girilmesine yardımcı olur.
- Yayma operatörü diziyi normalde argüman listesi bekleyen fonksiyona atmaya yarar.
=======
- Rest parameters are used to create functions that accept any number of arguments.
- The spread syntax is used to pass an array to functions that normally require a list of many arguments.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Birlikte parametrelerin dizisi ve listesi arasında dolanırlar.

Tüm argümanlar `arguments` içerisinde de yer alır.
