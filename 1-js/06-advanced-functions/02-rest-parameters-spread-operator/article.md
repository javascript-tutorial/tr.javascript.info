# Gerisi parametreleri ve yayma operatörleri

Çoğu JavaScript fonksiyonu istenilen sayıda argümanın yazılabilmesini desteklemektedir.

Örneğin:

- `Math.max(arg1, arg2, ..., argN)` -- en büyük sayıyı döndürür.
- `Object.assign(dest, src1, ..., srcN)` -- `src1..N`'in özelliklerini `dest`'e kopyalar.
- ...vs.

Bu bölümde biz fonksiyonlarımızda bunları nasıl kullanabiliriz konusu üzerinde durulacaktır. Daha da önemlisi böyle fonksiyonlar ile nasıl rahat bir şekilde çalışılabilir bu gösterilecektir.

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

Örneğin tüm elemanları `args` dizisine almak için:

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

  // geri kalanlar basliklar degiskenine atanır.
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

Önceden, geriye kalanlar parametresi eklenmemişti, `arguments` değişkeni tüm argümanların alınacağı yegane yöntemdi.

Hala çalışmakta ve eski şekliyle kullanılabilir.

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
Hatırlayacaksınız ok fonksiyonlarının kendisine ait `this`'i bulunmamaktadır. Şimdi `arguments`'in olmadığını da biliyorsunuz.

````

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

*Yayma operatörü* bu durumda yardıma koşar. Geriye kalanlar parametrelerine benzer, `...`'yi bu da kullanır fakat tam olarak zıttıdır.

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
...Ayrıca yayma operatörü ile normal operatörleri birlikte kullanabilirsiniz:


```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

Operatörler dizileri birleştirmek için de kullanılabilirler.

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2];
*/!*

alert(merged); // 0,3,5,1,2,8,9,15 (0, then arr, then 2, then arr2)
```

Yukarıdaki örnekte dizi kullanarak yayma operatörü gösterilmiştir. Sadece dizi değil her döngüye alınabilen üzerinde bu işlem yapılır.

Örneğin, aşağıdaki yayma operatörü metini karakterlerin dizisi şekline çevirir

```js run
let str = "Hello";

alert( [...str] ); // H,e,l,l,o
```
Yayma operatörü içte döngü ile elemanları alır, aynı `for..of`'ta olduğu gibi.

Bundan dolayı, karakter `for..of` kullanıldığında `...str` `"h","e","l","l","o"` şekline çevrilir. Karakter listesi dizi olarak tanımlanır  `[...str]`

Bu iş için `Array.from`'da kullanılabilir. Çünkü `Array.from` döngüye alınabilenleri ( karakter dizisi gibi) dizi yapar:

```js run
let str = "Hello";

// Döngüye alınabilenleri dizi haline getirir.
alert( Array.from(str) ); // H,e,l,l,o
```

Sonuç `[...str]` ile aynıdır. Fakat `Array.from(obj)` and `[...obj]` ince bir fark bulunmaktadır.

- `Array.from` hem dizi-benzerlerinde hem de döngüye alınabilirlerde ( array-likes, iterables ) kullanılabilirler.
- Yayma operatörü ise sadece döngüye alınabilirlerde uygulanır.

Bundan dolayı, bir şeyi diziye çevirmek için `Array.from` kullanmak daha mantıklı olacaktır.


## Özet

`"..."`'karakterlerini kodda görünce bunların geriye kalan veya yayma karakterleri olduğu söylenebilir.

Bunların ayrımını daha kolay yapabilmek için

- Eğer `...` fonksiyonun sonunda yer alırsa "geriye kalanlar" parametresidir ve geriye kalanlar diziye alınırlar.
- Eğer `...` fonksiyon çağrımında veya benzeri bir olayda kullanılırsa buna "yayma operatörü" denir ve diziyi listeye çevirir.

Kalıpların kullanılması:
- Geriye kalan parametresi isteğe göre argüman girilmesine yardımcı olur.
- Yayma operatörü diziyi normalde argüman listesi bekleyen fonksiyona atmaya yarar.

Birlikte parametrelerin dizisi ve listesi arasında dolanırlar.

Tüm argümanlar `arguments` içerisinde de yer alır.
