# JSON metodları, toJSON

Diyelimki karmaşık bir yapı var, bunu karakter dizisine çevirip ağ üzerinden loglanması için başka bir yere iletilmek isteniyor.

Doğal olarak, bu karakter dizisi tüm önemli özellikleri içermeli

Bu çevirim şu şekilde yapılabilir:

```js run
let kullanici = {
  adi: "Ahmet",
  yasi: 30,

*!*
  toString() {
    return `{adi: "${this.adi}", yasi: ${this.yasi}}`;
  }
*/!*
};

alert(kullanici); // {adi: "Ahmet", yasi: 30}
```

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
... Fakat geliştirme esnasında yeni özellikler eklendi ve öncekiler ya silindi ya da isim değiştirdi. Böyle bir durumda `toString` metoduyla her zaman değişiklik yapmak oldukça zordur. Özellikleri döngüye sokup buradan değerler alınabilir. Bu durumda da iç içe objelere ne olacak? Bunlarında çevirimlerini yapmak gerekir. Ayrıca ağ üzerinden objeyi göndermeye çalıştığınızda ayrıca bu objenin alan yer tarafından nasıl okunacağına dair bilgi göndermek zorundasınız.
=======
...But in the process of development, new properties are added, old properties are renamed and removed. Updating such `toString` every time can become a pain. We could try to loop over properties in it, but what if the object is complex and has nested objects in properties? We'd need to implement their conversion as well.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5:1-js/05-data-types/12-json/article.md

Neyseki bunların hiç biri için kod yazmaya gerek yok. Bu problem bizim için çözülmüş durumda.

[cut]

## JSON.stringify

[JSON](http://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) genelde objelerin değerlerini ifade eder.[RFC 4627](http://tools.ietf.org/html/rfc4627) standardında tanımı yapılmıştır. Öncelikle JavaScript düşünülerek yapılmış olsa da birçok dil de kendine has kütüphanelerle JSON desteği vermektedir. Böylece client JavaScript kullanırken server Ruby/PHP/Java/Herneyse... kullansa bile JSON kullanımında bir sorun oluşturmaz.

JavaScript aşağıdaki metodları destekler:

- `JSON.stringify` objeyi JSON'a çevirir.
- `JSON.parse` JSON'dan objeye çevirmeye yarar.

Örneğin, aşağıda `JSON.stringify` metodu ögrenci objesi için kullanılmıştır:

```js run
let ogrenci = {
  adi: 'Ahmet',
  yasi: 30,
  adminMi: false,
  dersler: ['html', 'css', 'js'],
  esi: null
};

*!*
let json = JSON.stringify(ogrenci);
*/!*

alert(typeof json); // string dönecektir.!

alert(json);
*!*
/* JSON'a çevirilmiş obje:
{
  "adi": 'Ahmet',
  "yasi": 30,
  "adminMi": false,
  "dersler": ['html', 'css', 'js'],
  "esi": null
}
*/
*/!*
```
`JSON.stringify(ogrenci)` metodu objeyi alır ve bunu karaktere çevirir, buna *Json-kodlanmış* , *seri hale getirilmiş* veya *karakter haline getirilmiş* denir. Bunu ağ üzerinden karşı tarafa göndermek veya basit bir şekilde kaydetmek mümkündür.

JSON kodlanmış objenin normal obje ile arasında bir kaç tane önemli farklılık vardır:

- Karakterler çift tırnak kullanır. JSON'da tek tırnak veya ters tırnak kullanılmaz. Bundan dolayı `'Ahmet'` -> `"Ahmet"` olur. 
- Obje özelliklerinin isimleri de çift tırnak içinde alınır. Bu da zorunludur. Bundan dolayı `yas:30` , `"yas":30` olur.

`JSON.stringify` ilkel tiplere de uygulanabilir.

Desteklenen JSON tipleri:

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
- Objeler `{ ... }`
- Diziler `[ ... ]`
- İlkel Tipler:
    - karakterler,
    - sayılar,
    - boolean değerler `true/false`,
=======
`JSON.stringify` can be applied to primitives as well.

JSON supports following data types:

- Objects `{ ... }`
- Arrays `[ ... ]`
- Primitives:
    - strings,
    - numbers,
    - boolean values `true/false`,
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5:1-js/05-data-types/12-json/article.md
    - `null`.

Örneğin:

```js run
// normal bir sayı JSON için de normal bir sayıdır.
alert( JSON.stringify(1) ) // 1

// karakterler de JSON içinde karakterdir fakat çift tırnak içinde gösterilir.
alert( JSON.stringify('test') ) // "test"

alert( JSON.stringify(true) ); // true

alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]
```
JSON sadece veriyi tanımlayan diller arası bir şartname bulunmaktadır. Bundan dolayı Javascript'e özel obje özelliklerikleri `JSON.stringify` tarafından pas geçilir.

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
Yani:

- Fonksiyon özellikleri ( metodlar ).
- Sembolik özellikler.
- `undefined`'ı saklayan özellikler.
=======
JSON is data-only language-independent specification, so some JavaScript-specific object properties are skipped by `JSON.stringify`.

Namely:

- Function properties (methods).
- Symbolic keys and values.
- Properties that store `undefined`.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5:1-js/05-data-types/12-json/article.md

```js run
let kullanici = {
  merhaba() { // ihmal edilir
    alert("Merhaba");
  },
  [Symbol("id")]: 123, // ihmal edilir
  baska: undefined // ihmal edilir
};

alert( JSON.stringify(kullanici) ); // {} (boş obje)
```
Bu özellik kabul edilebilir. Eğer istediğiniz bu değilse, bu işlemi nasıl özelleştirebilirsiniz bunu göreceksiniz.

Harika olan ise iç içe objeler otomatik olarak çevrilir.

Örneğin:

```js run
let tanisma = {
  baslik: "Konferans",
*!*
  oda: {
    sayi: 123,
    katilimcilar: ["ahmet", "mehmet"]
  }
*/!*
};

alert( JSON.stringify(tanisma) );
/* tüm yapı karakter şekline çevrildi:
{
  "tanisma":"baslik",
  "oda":{"sayi":23,"katilimcilar":["ahmet","mehmet"]},
}
*/
```
Önemli bir sınırlama: Dairesel referans olmamalıdır.

Örneğin:

```js run
let oda = {
  sayi: 23
};

let tanisma = {
  baslik: "Konferans",
  katilimcilar: ["ahmet", "mehmet"]
};

tanisma.yeri = oda;       // tanisma odaya referans veriyor.
oda.dolduruldu = tanisma; // oda tanismaya referans veriyor

*!*
JSON.stringify(tanisma); // Hata: Dairesel yapı JSON'a çevrilememiştir.
*/!*
```
Çeviri yapılırken hata olmasının nedeni: `oda.dolduruldu` `tanisma`'ya referans olurken. `tanisma.yeri` `oda`'ya referans verir.

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
=======
Here, the conversion fails, because of circular reference: `room.occupiedBy` references `meetup`, and `meetup.place` references `room`:

>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5:1-js/05-data-types/12-json/article.md
![](json-meetup.svg)


## Hariç tutmak ve dönüştürmek: yer değiştirici ( replacer )

`JSON.stringfy`'ın tam yazımı:

```js
let json = JSON.stringify(deger[, degistirici, bosluk])
```

deger
: Kodlanacak metin.

degistirici
: Maplema ( haritalama ) fonksiyonu ( `function(key,value)`) veya kodlanacak özelliklerin dizisi.

boşluk
: Formatlanmak için kullanılacak boşluk.

Çoğu zaman `JSON.stringify`'ın sadece ilk argümanı kullanılır. Fakat daha derinlemesine bir değiştirici işlemi yapmak istiyorsanız. Örneğin dairesel referansı filtrelemek gibi, `JSON.stringify`'ın diğer argümanlarını da kullanabilirsiniz.

Eğer üçüncü parametreyi de gönderirseniz, sadece gönderdiğiniz özellikler kodlanacaktır.

Örneğin:

```js run
let oda = {
  sayi: 23
};

let tanisma = {
  baslik: "Konferans",
  katilimcilar: [{adi: "Ahmet"}, {adi: "Mehmet"}],
  yer: oda // tanışma odayı referans gösteriyor.
};

oda.dolduruldu = tanisma; // oda tanışmayı referans gösteriyor.

alert( JSON.stringify(tanisma, *!*['baslik', 'katilimcilar']*/!*) );
// {"baslik":"Konferans","katilimcilar":[{},{}]}
```
Burada çok sıkı kullandık. Özellik listesi tüm yapı için kullanıldı. Bundan ddolayı katılımcılar boş döndür, `adi` alanı da istenseydi bu durumda değer gelecekti.

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
Dairesel referansa neden olabilecek `oda.dolduruldu` hariç hepsini içermek isterseniz:
=======
Here we are probably too strict. The property list is applied to the whole object structure. So the objects in `participants` are empty, because `name` is not in the list.

Let's include in the list every property except `room.occupiedBy` that would cause the circular reference:
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5:1-js/05-data-types/12-json/article.md

```js run
let oda = {
  sayi: 23
};

let tanisma = {
  baslik: "Konferans",
  katilimcilar: [{adi: "Ahmet"}, {adi: "Mehmet"}],
  yer: oda // tanışma odayı referans gösteriyor.
};

oda.dolduruldu = tanisma; // oda tanışmayı referans gösteriyor.

alert( JSON.stringify(tanisma, *!*['baslik', 'katilimcilar', 'yer', 'adi', 'sayi']*/!*) );

/*
{
  "baslik":"Konferans",
  "katilimcilar":[{"adi":"Ahmet"},{"adi":"Mehmet"}],
  "yer":{"sayi":23}
}
*/
```
Şimdi ise `dolduruldu` hariç her yer seri haline getirildi. Fakat özelliklerin listesi oldukça büyük oldu.

Neyseki `degistirici` yerine fonksiyon kullanılabilir.

Bu fonksiyon her `(anahtar, deger)` ikilisi için çağırılabilir ve "değiştirilmiş" değeri çevirir, bu da orjinalinin yerine geçer.

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
Daha önce yaptığımız örnekte `dolduruldu` özelliği hariç diğer özelliklerin  `deger`'in olduğu gibi kullanılabilir. `dolduruldu` özelliğini pas geçmek için aşağıdaki kod `undefined` döndürür.
=======
The function will be called for every `(key, value)` pair and should return the "replaced" value, which will be used instead of the original one. Or `undefined` if the value is to be skipped.

In our case, we can return `value` "as is" for everything except `occupiedBy`. To ignore `occupiedBy`, the code below returns `undefined`:
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5:1-js/05-data-types/12-json/article.md

```js run
let oda = {
  sayi: 23
};

let tanisma = {
  baslik: "Konferans",
  katilimcilar: [{adi: "Ahmet"}, {adi: "Mehmet"}],
  yer: oda // tanışma odayı referans gösteriyor.
};

oda.dolduruldu = tanisma; // oda tanışmayı referans gösteriyor

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
alert( JSON.stringify(tanisma, function degistirici(anahtar, deger) {
  alert(`${anahtar}: ${deger}`); // degistiriciye gelen
  return (anahtar == 'dolduruldu') ? undefined : deger;
=======
alert( JSON.stringify(meetup, function replacer(key, value) {
  alert(`${key}: ${value}`);
  return (key == 'occupiedBy') ? undefined : value;
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5:1-js/05-data-types/12-json/article.md
}));

/* degistiriciye gelen anahtar:deger çifti:
:             [object Object]
baslik:        Conference
katilimci:    [object Object],[object Object]
0:            [object Object]
adi:         Ahmet
1:            [object Object]
<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
adi:         Mehmet
yer:        [object Object]
sayi:       23
=======
name:         Alice
place:        [object Object]
number:       23
occupiedBy: [object Object]
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5:1-js/05-data-types/12-json/article.md
*/
```

`degistirici` fonksiyonu içiçe objeler ve diziler dahil herşeyi alır. Tüm objelere yinelemeli olarak uygulanır. `this`'in değeri `degistirici` içerisinde o anki özellikleri tutar.

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
İlk çağrı özeldir. "Sarıcı obje" vasıtasıyla: `{"": tanisma}`. Diğer bir deyişle ilk `(anahtar, deger)` çifti boş anahtar ile gelir ve değeri hedef objenin tamamıdır. Bundan dolayı yukarıdaki örnekte ilk satır: `":[object Object]"`'dir.
=======
The idea is to provide as much power for `replacer` as possible: it has a chance to analyze and replace/skip even the whole object if necessary.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5:1-js/05-data-types/12-json/article.md

Fikir `degistirici`'yi olabildiğince güçlü yapmaktır: Böylece gelen tüm objeyi pas geçme veya analiz etme gibi imkanlar sağlanır.

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
## Formatlama: bosluk

`JSON.stringify(deger, degistirici, boşluk)`'ın 3. argümanı formatlamayı güzel yapmak için kaç boşluk bırakılması gerektiği bilgisini alır.

Önceden, karakter dizisi haline getirilmiş objelerin hiç boşlukları bulunmamaktaydı. Eğer bunu obje üzerinden göndermek istiyorsanız pek önemli değildir. `bosluk` sadece güzel çıktı vermek amacıyla kullanılır.

Burada `bosluk = 2` kullanılmıştır, iç içe objelerin bir kaç satırda ve objeler arasında 2 boşluk olacak şekilde ayarlamasını söyler.
=======
## Formatting: space

The third argument of `JSON.stringify(value, replacer, space)` is the number of spaces to use for pretty formatting.

Previously, all stringified objects had no indents and extra spaces. That's fine if we want to send an object over a network. The `space` argument is used exclusively for a nice output.

Here `space = 2` tells JavaScript to show nested objects on multiple lines, with indentation of 2 spaces inside an object:
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5:1-js/05-data-types/12-json/article.md

```js run
let kullanici = {
  adi: "Ahmet",
  yas: 25,
  roller: {
    admin: false,
    editor: true
  }
};

alert(JSON.stringify(kullanici, null, 2));
/* iki boşluk:
{
  "adi": "Ahmet",
  "yasi": 25,
  "roller": {
    "admin": false,
    "editor": true
  }
}
*/

/*  JSON.stringify(user, null, 4) için ise çıktı aşağıdaki gibi olur:
{
    "adi": "Ahmet",
    "yasi": 25,
    "roller": {
        "admin": false,
        "editor": true
    }
}
*/
```
`bosluk` genelde loglama veya güzel çıktı almak için kullanılır.

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
## İsteğe göre uyarlanmış "toJSON"
=======
The third argument can also be a string. In this case, the string is used for indentation instead of a number of spaces.

The `space` parameter is used solely for logging and nice-output purposes.

## Custom "toJSON"
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5:1-js/05-data-types/12-json/article.md

Karakterlerin çeviriminde `toString` metodunun kullanılabileceğini daha önce söylemiştil. Objeler için `toJSON` metodu varsa `JSON.stringify` çağırıldığında bu otomatik olarak çağrılır.

Örneğin:

```js run
let oda = {
  sayi: 23
};

let toplanti = {
  baslik: "Konferans",
  tarih: new Date(Date.UTC(2017, 0, 1)),
  oda
};

alert( JSON.stringify(toplanti) );
/*
  {
    "baslik":"Konferans",
*!*
    "tarih":"2017-01-01T00:00:00.000Z",  // (1)
*/!*
    "oda": {"sayi":23}               // (2)
  }
*/
```
Gördüğünüz gibi `date` `(1)` karaktere dönüştü. Bunun nedeni date objesinin `toJSON` metoduna sahip olmasıdır.

Eğer `toJSON` metodunu `oda` objesine uygularsanız:

```js run
let oda = {
  sayi: 23,
*!*
  toJSON() {
    return this.sayi;
  }
*/!*
};

let toplanti = {
  baslik: "Konferans",
  oda
};

*!*
alert( JSON.stringify(oda) ); // 23
*/!*

alert( JSON.stringify(toplanti) );
/*
  {
    "baslik":"Konferans",
*!*
    "oda": 23
*/!*
  }
*/
```
<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
Gördüğünüz gibi `toJSON` hem doğrudan çağrı için hem de iç içe objeler için kullanılabilir.
=======

As we can see, `toJSON` is used both for the direct call `JSON.stringify(room)` and when `room` is nested in another encoded object.

>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5:1-js/05-data-types/12-json/article.md

## JSON.parse

JSON-karakterinin kodlamasını geri çevirmek için ( decode ), [JSON.parse](mdn:js/JSON/parse) adında diğer bir metoda ihtiyaç vardır.

Yazımı:
```js
<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
let deger = JSON.parse(str[, alıcı]);
=======
let value = JSON.parse(str, [reviver]);
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5:1-js/05-data-types/12-json/article.md
```

str
: Çözülecek JSON metni.

alıcı
: Opsiyonel function(anahtar,deger) ile her `(anahtar,deger)` çifti için çağrılacaktır. Bu değerler fonksiyon içerisinde değiştirilebilir.

Örneğin:

```js run
// metne çevrilmiş dizi
let sayilar = "[0, 1, 2, 3]";

sayilar = JSON.parse(sayilar);

alert( sayilar[1] ); // 1
```

İç içe objeler için:

```js run
<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
let kullanici = '{ "adi": "Ahmet", "yasi": 35, "admin": false, "arkadaslar": [0,1,2,3] }';

kullanici = JSON.parse(kullanici);
=======
let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

let user = JSON.parse(userData);
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5:1-js/05-data-types/12-json/article.md

alert( kullanici.arkadaslar[1] ); // 1
```
JSON gerektiği kadar karmaşık olabilir, içerisinde objeler diziler ve bu objelerin içerisinde objeler diziler olabilir. Tek yapması gereken formata uymaktır.

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
Aşağıda elle yazılan JSON'da en çok karşılaşılan hatalar sıralanmıştır. ( Bazen test etme amaçlı elle JSON yazılabilir)
=======
The JSON may be as complex as necessary, objects and arrays can include other objects and arrays. But they must obey the same JSON format.

Here are typical mistakes in hand-written JSON (sometimes we have to write it for debugging purposes):
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5:1-js/05-data-types/12-json/article.md

```js
let json = `{
  *!*adi*/!*: "Ahmet",                     // hata: İki tırnak olmadan anahtar yazmak
  "soyadi": *!*'Güngör'*/!*,               // hata: Değerde tek tırnak kıllanılmıştır. Bu çift tırnak olmalı
  *!*'admin'*/!*: false                  // hata: Anahtar için tek tırnak kullanılmıştır.
  "dogumGunu": *!*new Date(2000, 2, 3)*/!*, // hata: "new" değeri kabul edilmez, sadece değer girilmelidir.
  "friends": [0,1,2,3]              // hata yok!
}`;
```
Bunun yanında JSON yorumlara izin vermez. Yorum eklenirse JSON çalışmaz hale gelir.

[JSON5](http://json5.org/) adında farklı bir format bulunmaktadır. Bu format tırnaksız yazıma ve yorumlara izin vermektedir. Fakat bu ayrı bir kütüphanedir ve JSON'un şartnamesinde bulunmamaktadır.

JSON'un daha sıkı yazıma sahip olmasının nedeni geliştiricilerinin tembel olması vs değildir. Asıl amaç çok daha hızlı ayrıştırma algoritması uygulayabilmektir.

## Alıcı kullanma 

Diyelimki sunucunuzda `tanisma` diye bir objeyi metin şeklinde tutuyorsunuz.

Aşağıdaki gibi görünecektir:

```js
// baslik: (tanisma basligi), tarih: (tanisma tarihi)
let str = '{"baslik":"Konferans","tarih":"2017-11-30T12:00:00.000Z"}';
```

... Şimdi bunun tekrar obje haline getirilmesi gerekmektedir. ( *deserialize* )

`JSON.parse` kullanarak yapıldığından:

```js run
let str = '{"baslik":"Konferans","tarih":"2017-11-30T12:00:00.000Z"}';

let tanisma = JSON.parse(str);

*!*
alert( tanisma.date.getDate() ); // Hata!
*/!*
```

HATA!

`tanisma.tarih` karakter dizisidir, tarih değil. `JSON.parse` bu karakter dizisini `Date` objesine çevireceğini nasıl bilebilir ? 

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
Bunu Alıcı fonksiyon ile tüm değerler olduğu gibi alıp sadece tarih `Date` objesi olarak çevrilebilir.
=======
Let's pass to `JSON.parse` the reviving function as the second argument, that returns all values "as is", but `date` will become a `Date`:
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5:1-js/05-data-types/12-json/article.md

```js run
let str = '{"baslik":"Konferans","tarih":"2017-11-30T12:00:00.000Z"}';

*!*
let tanisma = JSON.parse(str, function(anahtar, deger) {
  if (anahtar == 'tarih') return new Date(deger);
  return deger;
});
*/!*

alert( tanisma.tarih.getDate() ); // Şimdi çalışıyor!
```
Bu iç içe objeler için de aynı şekilde çalışır:

```js run
let program = `{
  "tanismalar": [
    {"baslik":"Konferans","tarih":"2017-11-30T12:00:00.000Z"},
    {"baslik":"DogumGunu","tarih":"2017-04-18T12:00:00.000Z"}
  ]
}`;

program = JSON.parse(program, function(anahtar, deger) {
  if (anahtar == 'tarih') return new Date(deger);
  return deger;
});

*!*
alert( program.tanismalar[1].tarih.getDate() ); // çalışır!
*/!*
```

## Özet

- JSON kendine ait standardı olan ve birçok programlama dilinde kütüphanesi olan bir veri formatıdır.
- JSON basit objeleri, dizileri, karakterleri, sayıları, boolean değerleri ve `null`'u destekler.
- JavaScript objeleri seri hale getirmek için [JSON.stringify](mdn:js/JSON/stringify) metodunu ve tekrar obje haline getirmek için [JSON.parse](mdn:js/JSON/parse) metodunu sağlar.
- Her iki metod da çevirilerde kendinize ait fonksiyonlar kullanmanıza olanak verir.
- Eğer obje `toJSON` metoduna sahipse, `JSON.stringify` sırasında bu metod kullanılır.
