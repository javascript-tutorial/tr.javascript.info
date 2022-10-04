
# Map, Set, WeakMap ve WeakSet

Şu ana kadar bu karmaşık veri yapılarını gördük:

- Anahtar değere sahip verileri tutan objeler.
- Sıralı bir biçimde verileri tutan Diziler.

Ancak bunlar yeterli olmayabiliyorlar. Bu yüzden `Map` ve `Set` diye yapılar bulunuyor. (Collections)

## Map

[Map](mdn:js/Map), anahtar değere sahip veriler tutan bir yapıdır (collection). Tıpkı `Obje` gibi. Fakat aralarındaki en önemli farklardan biri `Map`ler anahtar değer olarak herhangi bir tipte olabilirler.

Ana fonksiyonlar şu şekildedir:

- `new Map()` -- map yaratır.
- `map.set(key, value)` -- Anahtara değer atar.
- `map.get(key)` -- Anahtarın değerini döndürür. Eğer öyle bir `anahtar` yoksa `undefined` döndürür.
- `map.has(key)` -- Eğer öyle bir anahtar varsa `true` yoksa `false` döndürür.
- `map.delete(key)` -- Verilen anahtara ait değeri siler.
- `map.clear()` -- Mapin içini temizler.
- `map.size` -- anlık eleman sayısını döndürür.

Örneğin:

```js run
let map = new Map();

map.set('1', 'str1');   // String tipinde anahtar
map.set(1, 'num1');     // Sayı tipinde anahtar
map.set(true, 'bool1'); // boolean tipinde anahtar

// sıradan Objeleri hatırlıyorsunuzdur. Anahtar değerleri stringe dönüşürdü
// Map anahtar tipini de korur, tıpkı şu 2 farklı şekilde olduğu gibi:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

Gördüğümüz üzere, objelerden farklı olarak, anahtarlar stringe dönüşmediler. Herhangi bir tipte anahtar kullanmak mümkündür.

**Map'ler ayrıca anahtar olarak Obje de kullanabilir.**

Örneğin:
```js run
let john = { name: "John" };

// John'un ziyaret sayısını tutalım
let ziyaretSayisiMap = new Map();

// john map için anahtar olarak kullanıldı
ziyaretSayisiMap.set(john, 123);

alert( ziyaretSayisiMap.get(john) ); // 123
```

Nesneleri anahtar olarak kullanmak, en dikkate değer ve önemli `Map` özelliklerinden biridir. String anahtarlar için `Obje` yeterli olabilir fakat yukarıdaki örnek için `Map` yerine `Obje` kullanmak daha zordur.

Eskiden, `Map`in olmadığı zamanlarda, geliştiriciler objelere eşsiz tanımlayıcılar eklerdi:

```js run
// id değeri ekledik
let john = { name: "John", *!*id: 1*/!* };

let ziyaretSayisi = {};

// şimdi id kullanarak veriyi tuttuk
ziyaretSayisi[john.id] = 123;

alert( ziyaretSayisi[john.id] ); // 123
```
ziyaretSayisi bir nesne olduğundan, John gibi tüm anahtarları dizelere dönüştürür, bu nedenle "[object Object]" dize anahtarına sahibiz.


...Ama `Map` kullanması çok daha hoş.


`Map` anahtarları nasıl karşılaştırır"

Değerlerin eşitliğini test etmek için 'Map' [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero) algoritmasını kullanır. Bu algoritma sıkı eşitlik `===` ile kabaca aynıdır fakat farkı `NaN`ın `NaN`a eşit olmasıdır. Böylece `NaN` bir anahtar değer olarak kullanılabilir.

Bu algoritma değiştirilemez veya özelleştirilemez.
````


````"Zincirleme"

Tüm `map.set` çağırmaları mapin kendisini döndürür. Böylece çağırmaları `zincir`leyebiliriz:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

## Objeden Map

Bir `Map` oluşturduğumuzda anahtar-değer çifti olarak dizi kullanabiliriz:

```js
// [key, value] çiftlerinden oluşan dizi
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);
```

Tıpkı bu formatta objeler için anahtar/değer çifti dizisi döndüren bir yerleşik fonksiyon [Object.entries(obj)](mdn:js/Object/entries) vardır.

Böylece bir objeden bir map oluşturabiliriz:

```js
let map = new Map(Object.entries({
  name: "John",
  age: 30
}));
```

Burada, `Object.entries` anahtar/değer çifti dizisi döndürür: `[ ["name","John"], ["age", 30] ]`. `Map`in ihtiyacı olan da buydu.

## Map üzerinde yineleme

`Map` üzerinde döngü yapmak için 3 metod vardır:

- `map.keys()` -- anahtarlar için bir yinelenebilir döndürür.
- `map.values()` -- değerler için bir yinelenebilir döndürür.
- `map.entries()` -- `[key, value]` girişleri için bir yinelenebilir döndürür, `for..of` içinde varsayılan olarak kullanılır.

Örneğin:

```js run
let yemekMap = new Map([
  ['salatalik', 500],
  ['domates', 350],
  ['sogan',    50]
]);

// anahtarlar üzerinde yineleme (sebzeler)
for(let vegetable of yemekMap.keys()) {
  alert(vegetable); // salatalik, domates, sogan
}

// değerler üzerinde yineleme (miktarlar)
for(let amount of yemekMap.values()) {
  alert(amount); // 500, 350, 50
}

// [anahtar, değer] üzerinde yineleme
for(let entry of yemekMap) { // yemekMap.entries() ile aynı
  alert(entry); // salatalik,500 (vb.)
}
```

```smart header="Eklenme sırasıyla kullanıldı"
Yineleme değerlerin eklenme sırasıyla yapıldı. Sıradan `Obje`lerden farklı olarak `Map` bu sırayı korur.

```

Bunun yanı sıra, `Map` yerleşik `forEach` metoduna sahiptir, tıpkı `Dizi` gibi:

```js
yemekMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // salatalik: 500 vb.
});
```


## Set

`Set` her değerin sadece birer kez olabileceği yapılardır (collection).

Ana fonksiyonlar şu şekildedir:

- `new Set(iterable)` -- set oluşturur, isteğe bağlı olarak değerler içeren diziden de oluşturulabilir.
- `set.add(value)` -- bir değer ekler, set'in kendisini döndürür
- `set.delete(value)` -- değeri siler. Eğer öyle bir `değer` varsa `true` yoksa `false` döndürür.
- `set.has(value)` -- Eğer öyle bir `değer` varsa `true` yoksa `false` döndürür.
- `set.clear()` -- set'in içindeki her şeyi siler.
- `set.size` -- eleman sayısını döndürür.

Örneğin, misafirlerimiz geliyor ve herkesi hatırlamak istiyoruz. Fakat ikinci defa gelenlerin tekrarlanmasını istemiyoruz. Bir ziyaretçinin sadece bir kez "sayılması" gerekiyor.

`Set` tam olarak ihtiyacımız olan şey:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// ziyaretler, bazıları birden çok kez gelmiş
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set sadece eşsiz değerler tutar
alert( set.size ); // 3

for(let user of set) {
  alert(user.name); // John (sonraki döngülerde Pete and Mary)
}
```

Kullanıcılardan oluşan bir dizi `Set`e alternatif olabilir ve [arr.find](mdn:js/Array/find) kullanarak her ekleme yaparken aynısından var mı diye kontrol yapabiliriz. Fakat bu kodumuzun performansını azaltır. Çünkü bu metod ile her seferinde dizinin tüm elemanlarını kontrol etmemiz gerekir. `Set` eşsizlik kontrolü yapmak için daha iyi optimize edilmiştir.

## Set üzerinde yineleme

'for..of' veya 'forEach' kullanarak set üzerinde yineleme yapmamız mümkündür:

```js run
let set = new Set(["portakal", "elma", "muz"]);

for(let value of set) alert(value);

// forEach ile de aynı şekilde:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

Komiktir ki `Set` içerisindeki forEach` fonksiyonu 3 argümana sahiptir: bir değer, sonra *tekrardan bir değer*, ve hedef obje. Aslında aynı değeri argümanda 2 kez görürüz.

Bu, 3 argüman alan `forEach` fonksiyonuna sahip olan `Map` ile uyumlu olması için yapılmıştır.

`Map`in sahip olduğu yineleme yapan fonksiyonlar burada da vardır:

- `set.keys()` -- değerler için bir yinelenebilir nesne döndürür,
- `set.values()` -- `set.keys` ile aynı, `Map` ile uyumlu olması için yapılmış,
- `set.entries()` -- `[value, value]` girişleri için yinelenebilir obje döndürür, `Map` ile uyumlu olması için vardır.

## WeakMap and WeakSet

`WeakSet`, JavaScript'in WeakSet'teki ögeleri bellekten kaldırmasını engellemeyen özel bir tür `Set` dir. `WeakMap` de `Map` için aynı şeydir.

<info:garbage-collection> konusundan bildiğimiz üzere, JavaScript motoru bir değeri ona erişebildiği(ve potansiyel olarak kullanılabildiği) sürece bellekte tutar.

Örneğin:
```js
let john = { name: "John" };

// Obje erişebilir, john da onun referansı

// referansın üzerine yazalım (overwrite)
john = null;

*!*
// obje daha fazla erişebilir olmadığı için bellekten silinir.
*/!*
```

Genellikle, bir veri yapısı hafızada bulunduğu sürece onun ögelerine (bir objenin özelliklerine veya bir dizinin elamanlarına) ulaşılabilir ve hafızada tutulabilir kabul edilir.

Normal `Map`te bir objeyi anahtar veya değer olarak tutmamızın bir önemi yoktur. Başka referansı olmasa bile bellekte tutulur.

Örneğin:
```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // referansın üzerine yazalım (overwrite)

*!*
// john map içinde tutuldu
// map.keys() kullanarak ona ulaşabiliriz
*/!*
```


`WeakMap/WeakSet` istisnası olarak.

**`WeakMap/WeakSet` nesnenin bellekten kaldırılmasını engellemez.**

`WeakMap` ile başlayalım.

`Map`ten ilk farkı, anahtarlar obje olmalı, ilkel tipte olamaz.

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // düzgün çalışır (anahtar bir obje)

*!*
weakMap.set("test", "Whoops"); // Hata verir, çünkü "test" ilkel bir tipte
*/!*
```

Şimdi, bir nesneyi anahtar olarak kullanırsak ve o nesneye başka referanslar yoksa - otomatik olarak bellekten (ve mapten) kaldırılır.

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // referansın üzerine yazalım (overwrite)

// john bellekten silindi!
```

Yukarıdaki normal `Map` örneğiyle karşılaştırın. Şimdi eğer `john` sadece `WeakMap` anahtarı olarak var olduysa -- otomatik olarak silinir.

...Ve `WeakMap` `keys()`, `values()`, `entries()` metodlarını desteklemez, yineleme yapamayız. Bu yüzden tüm anahtar veya değerleri çekmemizin bir yolu yoktur.

`WeakMap` sadece bu metodlara sahiptir:

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key, value)`
- `weakMap.has(key)`

Neden böyle bir sınırlama var? Teknik sebeplerden dolayı. Nesne diğer tüm referansları (yukarıdaki koddaki john gibi) kaybetmişse, otomatik olarak silinecektir. Ancak teknik olarak, *temizleme işlemi yapılırken* tam olarak belirtilmemiştir.

JavaScript motoru buna karar verir. Bellek temizliğini hemen gerçekleştirmeyi veya sonradan daha fazla silme işlemi yapılana kadar beklemeyi seçebilir. Bu nedenle, teknik olarak WeakMap'in geçerli eleman sayısı bilinmemektedir. Motor onu temizlemiş veya temizlememiş, veya bunu kısmen yapmış olabilir.  Bu nedenle, WeakMap'e bir bütün olarak erişen metodlar desteklenmez.

Şimdi böyle bir şeye nerede ihtiyacımız var?

WeakMap fikri, var olan bir nesne için sadece var olduğu sürece bir şeyler depolayabilmemizdir. Ancak, nesneyi, onun için bir şey depoladığımız gerçeğiyle yaşamaya zorlamıyoruz.

```js
weakMap.put(john, "gizli belgeler");
// eğer john ölürse, gizli belgeler yok olacak.
```

Objeler için bir yerde ana depolama alanına sahip olduğumuz ve sadece obje var olduğu sürece amacımıza yönelik ek bilgileri tutmamız gerektiği durumlarda kullanışlıdır.

Bir örnek görelim.

Örneğin, her kullanıcı için ziyaret sayısını tutan bir kodumuz var. Bilgiler bir map'te saklanır: kullanıcı anahtardır ve ziyaret sayısı değerdir. Bir kullanıcı ayrıldığında, ziyaret sayısını artık saklamak istemiyoruz.

Bunun bir yolu, terk eden kullanıcıları takip etmek ve depolamayı manuel olarak temizlemek olabilir:

```js run
let eda = { name: "Eda" };

// map: kullanıcı => ziyaret sayısı
let ziyaretSayisiMap = new Map();

// eda map için anahtardır
ziyaretSayisiMap.set(eda, 123);

// eğer eda bizi terk ederse, ona artık ihtiyacımız yoktur. (Gerçek hayatın aksine...)
eda = null;

*!*
// Ama o hala map'te kalmaya devam eder, onu temizlememiz lazım! (Peki ya kalbimizden?)
*/!*
alert( ziyaretSayisiMap.size ); // 1
// Ayrıca hafızada da durur, çünkü Map onu anahtar olarak kullanıyor.
```

Bir diğer yol `WeakMap` kullanmak olabilir:

```js
let eda = { name: "Eda" };

let ziyaretSayisiMap = new WeakMap();

ziyaretSayisiMap.set(eda, 123);

// eğer eda bizi terk ederse, ona artık ihtiyacımız yoktur.
eda = null;

// WeakMap dışında bir referans yoktur,
// Bu yüzden obje hafıza ve ziyaretSayisiMap'ten otomatik olarak silinir.
```

Sıradan `Map` ile, bir kullanıcı ayrıldıktan sonra temizlik yapmak sıkıcı bir iş haline gelir: kullanıcıyı yalnızca ana depolama alanından (değişken veya dizi olsun) kaldırmamız değil, aynı zamanda ziyaretSayisiMap gibi ek alanları da temizlememiz gerekir. Ayrıca, kullanıcıların kodun bir yerinde yönetildiği ve ek yapının başka bir yerde olduğu ve kaldırma işlemleri hakkında bilgi almadığı daha karmaşık durumlarda hantal olabilir.

`WeakMap` işleri daha basit hale getirebilir, çünkü otomatik olarak temizlenir. Yukarıdaki örnekte ziyaret sayısı gibi bilgiler, yalnızca anahtar nesne var olduğunda yaşar.

`WeakSet` benzer şekilde davranır:

- `Set`e benzer, ancak `WeakSet`e yalnızca nesneler ekleyebiliriz (ilkel değil).
- Bir nesne ona başka bir yerden ulaşılabildiği sürece set içinde var olur.
- `Set` gibi, `add`, `has` ve `delete`yi destekler, ama `size`, `keys()` ve yinelemeleri desteklemez.

Örneğin, bir ögenin kontrol edilip edilmediğini takip etmek için kullanabiliriz:

```js
let messages = [
    {mesaj: "Merhaba", kimden: "John"},
    {mesaj: "Nasıl gidiyor?", kimden: "John"},
    {mesaj: "Görüşürüz", kimden: "Alice"}
];

// dizi elemanları ile doldur (3 eleman)
let unreadSet = new WeakSet(messages);

// unreadSet'i mesajın okunup okunmadığını görmek için kullanabiliriz
alert(unreadSet.has(messages[1])); // true
// okuduktan sonra sil
unreadSet.delete(messages[1]); // true

// mesaj geçmişini kaydırdığımızda set otomatik olarak temizlenir
messages.shift();
// unreadSet'i temizlememize gerek yok, şu an 2 elemanı var
// ne yazık ki, ögelerin tam sayısını elde etmek için bir yöntem yoktur, bu yüzden gösteremezsiniz
```

`WeakMap` ve `WeakSet`in en dikkate değer sınırlaması, yinelemelerin olmaması ve mevcut tüm içeriğin alınamamasıdır. Bu rahatsız edici görünebilir, ancak aslında `WeakMap / WeakSet`in ana işlerini yapmasını engellemez -- başka bir yerde saklanan / yönetilen nesneler için "ek" veri depolama alanı olur.

## Özet

- `Map` -- anahtarlı değerler tutan bir yapıdır.(collection)

    normal `Obje`den farkları:

    - Herhangi bir anahtar için objeler anahtar olabilir.
    - Yinelemeler eklenme sırasıyla yapılır.
    - Ek olarak kullanışlı metodlar, `size` özelliği.

- `Set` -- eşsiz değerler tutan bir yapı.(collection)

    - Bir dizi aksine elemanların tekrar sıralanmasına izin vermez.
    - Eklenme sırasıyla tutar.

- `WeakMap` -- anahtar olarak sadece obje alan ve başka yolla ulaşılamaz hale geldiklerinde onları silen `Map`in farklı bir biçimi.

    - Bir bütün olarak yapı üzerinde yapılan işlemleri desteklemez: `size` yok, `clear()` yok, yineleme yok.

- `WeakSet` -- sadece obje tutan ve başka yolla ulaşılamaz hale geldiklerinde onları silen `Set`in farklı bir biçimi.

    - Aynı şekilde `size/clear()` ve yinelemeleri desteklemez.

`WeakMap` ve `WeakSet`, "ana" nesne depolama alanına ek olarak "ikincil" veri yapıları olarak kullanılır. Nesne, ana depolama alanından kaldırıldığında, yalnızca `WeakMap / WeakSet` içinde kalır, otomatik olarak temizlenir.

