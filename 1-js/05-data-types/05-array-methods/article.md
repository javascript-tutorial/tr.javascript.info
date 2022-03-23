# Dizi Metodları

Diziler birçok metod sunarlar. İşleri daha kolaylaştırmak için bu bölüm ikiye ayrılacaktır.

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

[arr.splice(str)](mdn:js/Array/splice) metodu isviçre çakısı gibi her işe yarar. Diziye yeni bir eleman ekleyebilir ve silebilir.

Yazımı:

```js
arr.splice(index[, deleteCount, elem1, ..., elemN])
```
`index`'ten başlar ve `deleteCount`kadar elemanı siler ve sonra `elem1, ..., elemN` şeklinde yerlerine yerleştirir. Diziden silinen elemanları dönderir.

Bu metodu örnek ile anlamak çok daha kolaydır.

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
`splice` metodu ayrıca hiçbir şey silmeden de ekleme yapabilir. Bunun için `deleteCount`'u `0` yapmanız gerekmektedir:

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
arr.slice(start, end)
```
Yeni bir dizi döndürür. Bu dizi içerisinde `"start"` ile `"end"` arasında ( `"end"` dahil olmadan ) tüm elemanları kopyalar. `start` ve `end` negatif olabilir. Negatif durumlarda dizi sondan değer başlar.

`str.slice` gibi çalışır fakat karakter dizisi(string) yapmak yerine alt-dizi yapar.

Örneğin:

```js run
let str = "test";
let arr = ["t", "e", "s", "t"];

alert( str.slice(1, 3) ); // es
alert( arr.slice(1, 3) ); // e,s

alert( str.slice(-2) ); // st
alert( arr.slice(-2) ); // s,t
```

### concat

[arr.concat](mdn:js/Array/concat) metodu dizi ile diğer dizileri veya elemanları birbirine eklemeye yarar.

Yazımı:

```js
arr.concat(arg1, arg2...)
```

İstenildiği kadar argümanı kabul eder, bunlar dizi veya değer olabilir.

Sonuç `arr`, ardından `arg1`, `arg2` şeklinde tüm dizileri ve değerleri içeren bir dizi olur.

Eğer bir argüman dizi ve `Symbol.isConcatSpreadable` özelliğine sahip ise ise bunun tüm alt elemanları kopyalanır. Diğer türlü argümanın sadece kendisi kopyalanır.

Örneğin:

```js run
let arr = [1, 2];

// diziyi [3,4] ile birleştir
alert( arr.concat([3, 4])); // 1,2,3,4

// diziyi [3,4] ve [5,6] ile birleştir
alert( arr.concat([3, 4], [5, 6])); // 1,2,3,4,5,6

// diziyi [3,4] ile birleştir ve ardından 5, 6 ekle 
alert( arr.concat([3, 4], 5, 6)); // 1,2,3,4,5,6
```
Normalde, dizide bulunan elemanları kopyalar. Diğer objeler dizi olsalar bile bir bütün olarak eklenirler.

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]
//[1, 2, arrayLike]
```

...Fakat dizi benzeri obje `Symbol.isConcatSpreadable` özelliğine sahipse, bunların elemanları eklenir:


```js run
let arr = [1, 2];

let arrayLike = {
  0: "başka",
  1: "bir şey",
*!*
  [Symbol.isConcatSpreadable]: true,
*/!*
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,başka,bir şey
```

## Dizide arama

Dizi içerisinde aramak için bazı metodlar bulunmaktadır.

### indexOf/lastIndexOf ve includes

[arr.indexOf](mdn:js/Array/indexOf), [arr.lastIndexOf](mdn:js/Array/lastIndexOf) ve [arr.includes](mdn:js/Array/includes) aynı yazıma sahiptirler, ve aslında hepsi aynı işi yapar. Sadece karakterler yerine elemanlar üzerinde çalışırlar.

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

Burada [arr.find](mdn:js/Array/find) metodu yararlı olur.

Yazımı:
```js
let result = arr.find(function(elaman, index, dizi) {
  //  eğer aranan eleman bulunursa true döndürmeli.
});
```
Bu fonksiyon her eleman için tekrar tekrar çağırılır.

- `elaman` eleman'ı tanımlar.
- `index` indeks'i tanımlar.
- `array` dizinin kendisidir.

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

[arr.findIndex](mdn:js/Array/findIndex) metodu da aynı find metodu gibi çalışır fakat elemanın kendi yerine `index`'ini döndürür.

### filter

`find` metodu sadece fonksiyonu `true` yapan elemana bakar.

Birden fazlası için ise [arr.filter(fn)](mdn:js/Array/filter) kullanılabilir.

Yazımı neredeyse `find` ile aynıdır, fakat tek bir eleman yerine kurala uyan elemanları dizi halinde döner.

```js
let results = arr.filter(function(eleman, index, dizi) {
  // eğer elemanlar filtreye uygunsa true döndürür.
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

## Dizi dönüşümleri
Bu bölüm dizinin dönüşümleri veya yeniden sıralanması hakkındadır.


### map

[arr.map](mdn:js/Array/map) metodu en fazla kullanılan ve kullanışlı olan metodlardandır.

Yazımı:

```js
let sonuc = arr.map(function(eleman, index, dizi) {
  // eleman yerine yeni değer döndürür.
})
```
Dizinin her elemanı için fonksiyonu çalıştırır ve sonuçlarını dizi olarak döner.

Örneğin elemanların uzunlukları ile ilgili bir değişiklik yapılabilir:

```js run
let uzuluklar = ["Bilbo", "Gandalf", "Nazgul"].map(eleman => eleman.length)
alert(uzunluklar); // 5,7,6
```

### sort(fn)

[arr.sort](mdn:js/Array/sort) metodu diziyi olduğu yerde sıralar.

Örneğin:

```js run
let arr = [ 1, 2, 15 ];

// metod dizinin içeriğini sıralar ve döndürür.
arr.sort();

alert( arr );  // *!*1, 15, 2*/!*
```
Çıktısında bir şey fark ettiniz mi?

Sıralama `1, 15, 2` oldu. Yanlış. Neden peki?

**Diziler varsayılan olarak karakter sıralamasına göre sıralanırlar.**

Tüm elemanlar karakter dizisine çevrilir ve karşılaştırılır. Bundan dolayı karakter sırasına göre `"2" > "15"` karşılaştırılır. 

Kendi sıralamanızı yapmak için, iki argümanlı bir fonksiyonu `arr.sort()`'ın argüman olarak alması gerekmektedir.


Fonksiyon aşağıdaki şekilde çalışmalıdır:

```js
function compare(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}
```

Örneğin:

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

Ne olduğunu düşünürsek. `arr` her şeyi tutabilir, değil mi? Sayı, karakter veya html elementi vs. tutabilir. İçinde bulunanları sıralamak için karşılaştırmayı yapan *sıralama fonksiyonu*na ihtiyaç vardır. Bunun da varsayılanı karakter sıralamadır.

`arr.sort(fn)` metodu içinde sıralama algoritmasına sahiptir. Bu sıralamanın nasıl çalıştığına dair bir bilgimiz olmasına gerek yok (Çoğu zaman [quicksort](https://en.wikipedia.org/wiki/Quicksort) kullanılır). Diziyi dolanır ve elemanları verilen algoritmaya göre karşılaştırır ve sıralar. Tek bilmeniz gereken `fn` fonksiyonunun karşılaştırmayı yaptığıdır.

Eğer hangi elemanın karşılaştırıldığını öğrenmek istiyorsanız elbette bunu görebilirsiniz.


```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
});
```
Algoritma aynı elemanı bir kaç defa çalıştırma ihtiyacı duyabilir, fakat yine de olduğunca az karşılaştırmaya çalışır.



````smart header="Karşılaştırma fonksiyonu herhangi bir sayıyı döndürebilir."

Aslında, karşılaştırma fonksiyonu "büyük" olduğunu belirtmek için pozisitif sayı, "az" olduğunu belirtmek için negatif sayı döndürmelidir.

Bu daha kısa fonksiyon yazılmasına olanak sağlar:

```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```
````

````smart header="Daha zarif bir fonksiyon için ok kullanmak."
[Ok fonksiyonlarını](info:arrow-functions-basics) hatırlarsanız burada daha zarif bir biçimde sıralama yapılabilir:

```js
arr.sort( (a, b) => a - b );
```
Bu, daha uzun versiyonu ile aynı şekilde çalışır.
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

[arr.join(str)](mdn:js/Array/join) `split` in tam tersini yapar. `arr`'den karakter dizileri yaratır.

Örnek:

```js run
let dizi = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = dizi.join(';');

alert( str ); // Bilbo;Gandalf;Nazgul
```

### reduce/reduceRight

Dizi elemanlarının üzerinden geçilmek istendiğinde `forEach` kullanmak mümkündür.

[arr.reduce](mdn:js/Array/reduce) ve [arr.reduceRight](mdn:js/Array/reduceRight) metodları da bu işe yarar fakat daha dallı budaklıdır. Genelde dizilere göre tek bir karakter dizisini hesaplamaya yarar.

Yazımı:

```js
let value = arr.reduce(function(previousValue, item, index, arr) {
  // ...
}, initial);
```

Fonksiyon elemanlara uygulanır. İkinciden itibaren benzer bir yazıma rastlayabilirsiniz.

- `item` -- dizinin o anki elemanı.
- `index` -- elemanın pozisyonu.
- `arr` -- dizi.

Şimdiye kadar `forEach/map` gibi. Fakat bir argüman daha var:

- `previousValue` bir önceki fonksiyonun sonucudur `initial` ilk çağrının sonucudur.

Örnekle anlatmak gerekirse:

Aşağıda dizinin toplamı bir satırda alınmaktadır:

```js run
let arr = [1, 2, 3, 4, 5]

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```
Burada `reduce` fonksiyonunun en çok kullanılan 2 argümanlı şekli kullanıldı.

Detaylarına bakılacak olursa:

1. İlk çalıştırıldığında `sum` başlangıç değerini alır ( `reduce`'un son argümanı ) `0`, ve `current` dizinin ilk elemanıdır `1`. Bundan dolayı sonuç `1` olur.
2. İkinci döngüde `sum = 1`, buna ikinci dizi elemanı olan `2` eklenir ve döndürülür.
3. Üçüncü döngüde ise `sum = 3` ve buna bir sonraki dizi elemanı eklenir ve böyle devam eder.

Hesaplama akışı:

![](reduce.svg)

Form tablosunda bunu daha açık bir şekilde görebilirsiniz. Satırlar fonksiyon çağrılarını göstermektedir.

|   |`toplam`|`şimdiki`|`sonuç`|
|---|-----|---------|---------|
|birinci çağrı|`0`|`1`|`1`|
|ikinci çağrı|`1`|`2`|`3`|
|üçüncü çağrı|`3`|`3`|`6`|
|dördüncü çağrı|`6`|`4`|`10`|
|beşinci çağrı|`10`|`5`|`15`|

Gördüğünüz gibi bir önceki fonksiyonun sonucu sonraki fonksiyonun argümanı olmakta.

Bunun ile birlikte başlangıç değerini pas geçmekte mümkün:

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

Bundan dolayı her zaman başlangıç değeri kullanılması önerilir.

[arr.reduceRight](mdn:js/Array/reduceRight) metodu da `reduce` metodu ile aynı işi yapar fakat diziyi sağdan sola doğru okur.

## Tekrar: forEach

[arr.forEach](mdn:js/Array/forEach) metodu her eleman için bir fonksiyon çalıştırmaya yarar.

Yazımı:
```js
arr.forEach(function(item, index, array) {
  // ... elemanla bir şeyler yap
});
```
Örneğin aşağıdaki kod dizinin her elemanını göstermeye yarar:

```js run
// her eleman için alert çağır
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

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

## Özet

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
  - `forEach(func)` -- dizide bulunan her eleman için `func` çağrılır. hiçbir şey döndürmez.

- Ek olarak:
  - `Array.isArray(arr)`  `arr`'in dizi olup olmadığını kontrol eder.

Bu metodların içinden sadece `sort`, `reverse` ve `splice` doğrudan dizinin kendisi üzerinden işlem yapar. Diğerleri değer döndürür.


Yukarıdaki metodlar projelerin çoğundaki kullanılan dizi fonksiyonlarının %99'unu kapsar. Fakat bunun yanında farklı metodlar da bulunmaktadır:

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) diziyi kontrol eder.

  Dizinin her elemanı için `fn` çağırılır. `Map`'e çok benzer fakat herhangi biri/hepsi `true` ise `true` döndürür. Diğer türlü `false` döndürür.
  
- [arr.fill(value, start, end)](mdn:js/Array/fill) -- diziyi tekrar eden `value` değeri ile `start` ile `index` arasına doldurur.

- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- `start` tan `end`'e kadar olan elemanları `target`'tan itibaren var olanların üzerine yazarak yapıştırır.

Tüm liste için [kullanım talimatları](mdn:js/Array) sayfasına bakabilirsiniz.

Görünürde çok fazla metod varmış gibi ve ezberlemesi zormuş gibi görünse de aslında göründüğünden çok daha kolaydır.

Sadece tanımların bulunduğu sayfaya bakmanız yeterlid. Ardından bu bölümdeki örnekleri çözerek pratik yaparsanız metodlar ile ilgili yeteri kadar bilgi sahibi olmuş olursunuz.

Daha sonrasında metodlar ile ilgili bir şey yapmak istediğinizde, nasıl yapıldığını bilmiyorsanız, buraya tekrar gelip doğru metodu bulabilirsiniz.
Buradaki örnekler doğru bir şekilde yazmanıza yardımcı olacaktır. Sonrasında metodları hiçbir özel çaba harcamadan hatırlayacak duruma gelebilirsiniz.
