# JSON metodları, toJSON

Diyelim ki karmaşık bir yapı var, bunu karakter dizisine çevirip ağ üzerinden loglanması için başka bir yere iletilmek isteniyor.

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

... Fakat geliştirme esnasında yeni özellikler eklendi ve öncekiler ya silindi ya da isim değiştirdi. Böyle bir durumda `toString` metoduyla her zaman değişiklik yapmak oldukça zordur. Özellikleri döngüye sokup buradan değerler alınabilir. Bu durumda da iç içe objelere ne olacak? Bunlarında çevirimlerini yapmak gerekir. Ayrıca ağ üzerinden objeyi göndermeye çalıştığınızda ayrıca bu objenin alan yer tarafından nasıl okunacağına dair bilgi göndermek zorundasınız.

Neyse ki bunların hiçbiri için kod yazmaya gerek yok. Bu problem bizim için çözülmüş durumda.

[cut]

## JSON.stringify

[JSON](http://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) genelde objelerin değerlerini ifade eder.[RFC 4627](http://tools.ietf.org/html/rfc4627) standardında tanımı yapılmıştır. Öncelikle JavaScript düşünülerek yapılmış olsa da birçok dil de kendine has kütüphanelerle JSON desteği vermektedir. Böylece client JavaScript kullanırken server Ruby/PHP/Java/Her neyse... kullansa bile JSON kullanımında bir sorun oluşturmaz.

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

JSON kodlanmış objenin normal obje ile arasında birkaç tane önemli farklılık vardır:

- Karakterler çift tırnak kullanır. JSON'da tek tırnak veya ters tırnak kullanılmaz. Bundan dolayı `'Ahmet'` -> `"Ahmet"` olur. 
- Obje özelliklerinin isimleri de çift tırnak içinde alınır. Bu da zorunludur. Bundan dolayı `yas:30` , `"yas":30` olur.

`JSON.stringify` ilkel tiplere de uygulanabilir.

Desteklenen JSON tipleri:

- Objeler `{ ... }`
- Diziler `[ ... ]`
- İlkel Tipler:
    - karakterler,
    - sayılar,
    - boolean değerler `true/false`,
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
JSON sadece veriyi tanımlayan diller arası bir şartname bulunmaktadır. Bundan dolayı JavaScript'e özel obje özelliklerikleri `JSON.stringify` tarafından pas geçilir.

Yani:

- Fonksiyon özellikleri ( metodlar ).
- Sembolik özellikler.
- `undefined`'ı saklayan özellikler.

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
Çeviri yapılırken hata olmasının nedeni: `oda.dolduruldu` `tanisma`'ya referans olurken, `tanisma.yeri` `oda`'ya referans verir.

![](json-meetup.svg)


## Hariç tutmak ve dönüştürmek: yer değiştirici ( replacer )

`JSON.stringfy`'ın tam yazımı:

```js
let json = JSON.stringify(deger[, degistirici, bosluk])
```

deger
: Kodlanacak metin.

degistirici
: Mapleme (haritalama) fonksiyonu ( `function(key,value)`) veya kodlanacak özelliklerin dizisi.

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
Burada çok sıkı kullandık. Özellik listesi tüm yapı için kullanıldı. Bundan dolayı katılımcılar boş döndür, `adi` alanı da istenseydi bu durumda değer gelecekti.

Dairesel referansa neden olabilecek `oda.dolduruldu` hariç hepsini içermek isterseniz:

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

Neyse ki `degistirici` yerine fonksiyon kullanılabilir.

Bu fonksiyon her `(anahtar, deger)` ikilisi için çağırılabilir ve "değiştirilmiş" değeri çevirir, bu da orijinalinin yerine geçer.

Daha önce yaptığımız örnekte `dolduruldu` özelliği hariç diğer özelliklerin  `deger`'in olduğu gibi kullanılabilir. `dolduruldu` özelliğini pas geçmek için aşağıdaki kod `undefined` döndürür.

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

alert( JSON.stringify(tanisma, function degistirici(anahtar, deger) {
  alert(`${anahtar}: ${deger}`); // degistiriciye gelen
  return (anahtar == 'dolduruldu') ? undefined : deger;
}));

/* degistiriciye gelen anahtar:deger çifti:
:             [object Object]
baslik:        Conference
katilimci:    [object Object],[object Object]
0:            [object Object]
adi:         Ahmet
1:            [object Object]
adi:         Mehmet
yer:        [object Object]
sayi:       23
*/
```

`degistirici` fonksiyonu iç içe objeler ve diziler dahil her şeyi alır. Tüm objelere yinelemeli olarak uygulanır. `this`'in değeri `degistirici` içerisinde o anki özellikleri tutar.

İlk çağrı özeldir. "Sarıcı obje" vasıtasıyla: `{"": tanisma}`. Diğer bir deyişle ilk `(anahtar, deger)` çifti boş anahtar ile gelir ve değeri hedef objenin tamamıdır. Bundan dolayı yukarıdaki örnekte ilk satır: `":[object Object]"`'dir.

Fikir `degistirici`'yi olabildiğince güçlü yapmaktır: Böylece gelen tüm objeyi pas geçme veya analiz etme gibi imkanlar sağlanır.

## Formatlama: bosluk

`JSON.stringify(deger, degistirici, boşluk)`'ın 3. argümanı formatlamayı güzel yapmak için kaç boşluk bırakılması gerektiği bilgisini alır.

Önceden, karakter dizisi haline getirilmiş objelerin hiç boşlukları bulunmamaktaydı. Eğer bunu obje üzerinden göndermek istiyorsanız pek önemli değildir. `bosluk` sadece güzel çıktı vermek amacıyla kullanılır.

Burada `bosluk = 2` kullanılmıştır, iç içe objelerin birkaç satırda ve objeler arasında 2 boşluk olacak şekilde ayarlamasını söyler.

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

## İsteğe göre uyarlanmış "toJSON"

Karakterlerin çeviriminde `toString` metodunun kullanılabileceğini daha önce söylemiştik. Objeler için `toJSON` metodu varsa `JSON.stringify` çağırıldığında bu otomatik olarak çağırılır.

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
Gördüğünüz gibi `toJSON` hem doğrudan çağrı için hem de iç içe objeler için kullanılabilir.

## JSON.parse

JSON-karakterinin kodlamasını geri çevirmek için ( decode ), [JSON.parse](mdn:js/JSON/parse) adında diğer bir metoda ihtiyaç vardır.

Yazımı:
```js
let deger = JSON.parse(str[, alıcı]);
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
let kullanici = '{ "adi": "Ahmet", "yasi": 35, "admin": false, "arkadaslar": [0,1,2,3] }';

kullanici = JSON.parse(kullanici);

alert( kullanici.arkadaslar[1] ); // 1
```
JSON gerektiği kadar karmaşık olabilir, içerisinde objeler diziler ve bu objelerin içerisinde objeler diziler olabilir. Tek yapması gereken formata uymaktır.

Aşağıda elle yazılan JSON'da en çok karşılaşılan hatalar sıralanmıştır. (Bazen test etme amaçlı elle JSON yazılabilir)

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

Diyelim ki sunucunuzda `tanisma` diye bir objeyi metin şeklinde tutuyorsunuz.

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

Bunu Alıcı fonksiyon ile tüm değerler olduğu gibi alıp sadece tarih `Date` objesi olarak çevrilebilir.

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
