# Atamaların ayrıştırılması

JavaScript'te en fazla kullanılan veri yapıları `Obje` ve `Dizi`'dir.

Objeler bir çok bilgiyi tek bir varlık altında toplamaya yarar. Diziler ise sıralı koleksiyonları tutmaya yarar. Böyleyece obje veya dizi tek bir varlık olarak başka fonksiyonlara paslanabilir.

*Atamaların ayrıştırılması* dizileri veya objeleri *paketinden çıkarma* ve değişkenlerine kadar ayrıştırma olarak tanımlanabilir. Bu ayrıştırma birçok parametre alan karmaşık fonksiyonlar, varsayılan değerler için de oldukça kullanışlıdır.

[cut]

## Dizi ayrıştırma

Dizinin değişkenlerine nasıl ayrıştırılacağı aşağıdaki örnekte gösterilmiştir:

```js
// Adı ve soyadı şeklinde bir dizi
let arr = ["Ahmet", "Pamuk"]

*!*
// dizi ayrıştırma
let [adi, soyadi] = arr;
*/!*

alert(adi); // Ahmet
alert(soyadi);  // Pamuk
```
Şimdi dizi ile çalışmak yerine doğrudan değişkenler ile çalışabilirsiniz.

`split` ile birlikte harika bir şekilde çalışabilir:

```js
let [adi, soyadi] = "Ahmet Pamuk".split(' ');
```

````smart header="\"Ayrıştırma\" \"parçalayıp değer kaybetme\" anlamına gelmez"
*Ayrıştırma* bozma anlamına gelmez. Değerleri değişkenlere atamaya yarar. Fakat dizinin kendisinde bir değişiklik olmaz.

Sadece daha kısa yazım sağlar:
```js
// let [adi, soyadi] = arr;
let adi = arr[0];
let soyadi = arr[1];
```
````

````smart header="İlk elemanları görmezden gel"
İstenmeyen elemanlar fazladan virgül ile diziden atılabilir.

```js run
*!*
// birinci ve ikinci elemanlar gerekli değil
let [, , baslik] = ["Julius", "Caesar", "Konsil", "Roma Cumhuriyeti"];
*/!*

alert( baslik ); // Konsil
```
Yukarıdaki örnekte, birinci ve ikinci eleman pas geçilmesine rağmen üçüncü eleman `baslik` olarak atanmıstır. Geri kalan da pas geçilmiştir.
````

````smart header="Eşitliğin sağ taraftaki herhangi bir sıralı erişim objesiyle(iterable) çalışabilir."

... Aslında,  sadece diziler değil, her türlü sıralı erişim objesinyle çalışabilir:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [bir, iki, üç] = new Set([1, 2, 3]);
```

````


````smart header=Herşeyi sol tarafa ata"

Sol tarafta sadece "atanabilirler" kullanılmaktadır.

Örneğin, bir obje özelliği:

```js run
let kullanici = {};
[kullanici.adi, kullanici.soyadi] = "Ahmet Pamuk".split(' ');

alert(kullanici.adi); // Ahmet
```

````

````smart header=" .entries() ile döngü"

Bir önceki konuda [Object.entries(obj)](mdn:js/Object/entries) metodu kullanıldı.

Bu metodu objenin anahtar-değer ikilisinin üzerinden dönmek ve bunları ayrıştırmak için kullanabilirsiniz:

```js run
let kullanici = {
  adi: "Ahmet",
  yasi: 30
};

// anahtar-deger döngüsü
*!*
for(let [key, value] of Object.entries(kullanici)) {
*/!*
  alert(`${key}:${value}`); // adi:Ahmet, sonra yasi:30
}
```
... Map de aynı şekilde:

```js run
let kullanici = new Map();
user.set("adi", "Ahmet");
user.set("yasi", "30");

*!*
for(let [key, value] of kullanici.entries()) {
*/!*
  alert(`${key}:${value}`); // adi:Ahmet, sonra yasi:30
}
```
````
### Geri kalan '...'

Sadece ilk değerler değil de, geri kalanlar da alınmak istenirse -- bir parametre `"..."` ile "geri kalanını al" demek mümkündür:

```js run
let [adi1, adi2, *!*...geri_kalan*/!*] = ["Julius", "Caesar", *!*"Konsil", "Roma Cumhuriyeti"*/!*];

alert(adi1); // Julius
alert(adi2); // Caesar

*!*
alert(geri_kalan[0]); // Konsil
alert(geri_kalan[1]); // Roma Cumhuriyeti
alert(geri_kalan.length); // 2
*/!*
```

`geri_kalan`, geriye kalan elemanları kapsayan dizidir. `geri_kalan` yerine istediğiniz bir değişken ismi kullanabilirsiniz. Fakat öncesine üç nokta eklemeyi unutmayın.

### Varsayılan Değerler

Eğer dizide atanabilecek değerden daha az veri varsa her hangi bir hata almazsınız. Sadece değer olmadığından dolayı değişkenler `undefined` olur:

```js run
*!*
let [adi, soyadi] = [];
*/!*

alert(adi); // undefined
```
Eğer tanımsız değişkenler için varsayılan değeri atamak istiyorsanız bunu `=` kullanarak yapabilirsiniz:

```js run
*!*
// varsayılan değerler
let [adi="Misafir", soyadi="Tanımsız"] = ["Julius"];
*/!*

alert(adi);    // Julius (diziden geleen)
alert(soyadi); // Anonymous (varsayılan)
```

Varsayılan değerler daha karmaşık veya fonksiyon bile olabilir. Sadece atanacak dizide değer yoksa çalıştırılır.

Örneğin burada ikisi değişkenin varsayılan değeri için `prompt` kullanıldı fakat sadece ikincisi için çalışır:

```js run
// sadece soyadı için çalışır.
let [adi=prompt('adi?'), soyadi=prompt('soyadi?')] = ["Julius"];

alert(adi);    // Julius (diziden)
alert(soyadi); // prompt'tan değer alır.
```



## Objelerin ayrıştırılması

Ayrıştırma objeler için de çalışır.

Yazımı:

```js
let {var1, var2} = {var1:…, var2…}
```
Eşitliğin sağ tarafında ayrıştırmak istenilen objeler bulunmaktadır. Sol tarafta ise denk gelen özellikler için bir "şablon" bulunmaktadır.

Basit durumda, değişken isimlerini içeren `{ ... }` bir listedir.

Örneğin:

```js run
let ozellikler = {
  baslik: "Menü",
  genislik: 100,
  yukseklik: 200
};

*!*
let {baslik, genislik, yukseklik} = ozellikler;
*/!*

alert(baslik);  // Menü
alert(genislik);  // 100
alert(yukseklik); // 200
```

`ozellikler.baslik`, `ozellikler.genislik` ve `ozellikler.yukseklik` isimleri denk  gelen değişkenlere atandılar. Sıralama önemli değildir. Aşağıdaki de çalışır:

```js
// let {...}  içerisindeki özelliklerin sırası değiştirildi
let {yukseklik, genislik, baslik} = { baslik: "Menü", yukseklik: 200, genislik: 100 }
```
Sol taraftaki şablon özellikler ile değişkenleri düzgün bir şekilde eşlemeye çalıştığından dolayı karmaşık olabilir.

Eğer özelliği değişkene farklı bir isimle tanımlamak istiyorsanız. Örneğin `ozellikler.genislik`'in değişken ismi `g` olabilir. Bunu `:` kullanarak ayarlayabilirsiniz.

```js run
let ozellikler = {
  baslik: "Menü",
  genislik: 100,
  yukseklik: 200
};

*!*
// { kaynakOzelligi: hedefDegiskeni }
let {genislik: g, yukseklik: y, baslik} = ozellikler;
*/!*

// genislik -> g
// yukseklik -> y
// baslik -> baslik

alert(baslik);  // Menu
alert(genislik);      // 100
alert(yukseklik);      // 200
```

İki nokta üst üste "hangisi : nereye" ikilisini gösterir. Yukarıdaki örnekte `genislik` `g` olur, `yukseklik` `h` olur ve `baslik` aynı isime atanır.

Var olması garanti olmayan özelliklerin varsayılan değerleri `"="` ile atanır. Örneğin:


```js run
let ozellikler = {
  baslik: "Menü"
};

*!*
let {genislik=100, yukseklik=200, baslik} = ozellikler;
*/!*

alert(baslik);  // Menü
alert(genislik);  // 100
alert(yukseklik); // 200
```
Dizilerde veya fonksiyon parametrelerinde olduğu gibi, varsayılan değerler ifade veya fonksiyon çağrısı bile olabilir. Değer sağlanmadığında bunlar çalışır.

Aşağıdaki kod genişlik için sorar fakat başlık için sormaz.

```js run
let ozellikler = {
  baslik: "Menü"
};

*!*
let {genislik=prompt("genislik?"), baslik=prompt("baslik?")} = ozellikler;
*/!*

alert(baslik);  // Menü
alert(genislik);  // prompt'ta yazılan değer
```
Ayrıca iki nokta üst üste ve eşitlik birleştirilebilir:

```js run
let ozellikler = {
  baslik: "Menü"
};

*!*
let {genislik:g=100, yukseklik:y=200, baslik} = ozellikler;
*/!*

alert(baslik);  // Menu
alert(g);      // 100
alert(y);      // 200
```

### Geriye Kalan operatörü

Eğer obje değişkenden fazla özelliğe sahipse ne olur? Bazılarını alıp "geriye kalan"'a atanabilir mi?

Burada kullanılabilecek geriye kalan operatörü ( üç nokta ) neredeyse standart olmuştur, fakat yine de çoğu tarayıcı henüz desteklememektedir.

Aşağıdaki gibi çalışır:

```js run
let ozellikler = {
  baslik: "Menü",
  yukseklik: 200,
  genislik: 100
};

*!*
let {baslik, ...geri_kalan} = ozellikler;
*/!*

// şimdi baslik="Menü", geri_kalan={yukseklik: 200, genislik: 100}
alert(geri_kalan.yukseklik);  // 200
alert(geri_kalan.genislik);   // 100
```



````smart header=" `let` kullanmak istenmediğinde düşünülmesi gereken"

Yukarıdaki örnekte `let {...} = {...}` şeklinde atamadan önce yeni bir değişken ataması yapılmıştır. Tabi ki daha önceden var olan değişkenler de kullanılabilir. Fakat burada düşünülmesi gereken bir nüans vardır.

Aşağıdaki çalışmayacaktır:

```js run
let baslik, genislik, yukseklik;

// error in this line
// bu satırda hata verir
{baslik, genislik, yukseklik} = {baslik: "Menü", genislik: 200, yukseklik: 100};
```

Problem şu ki JavaScript `{...}`'i ana kod akışında bir kod bloğu olarak düşünmektedir, diğer bir ifadenin içinde değil. Böyle kod blokları şu şekilde komutları gruplamak için kullanılır:

```js run
{
  // bir kod bloğu
  let mesaj = "Merhaba";
  // ...
  alert( mesaj );
}
```
JavaScript'e bunun bir kod bloğu olmadığını göstermek için tüm tanımlama `(...)` içine alınmalıdır:

```js run
let baslik, genislik, yukseklik;

// şimdi çalışır
*!*(*/!*{baslik, genislik, yukseklik} = {baslik: "Menü", genislik: 200, yukseklik: 100}*!*)*/!*;

alert( baslik ); // Menü
```



## İç içe ayrıştırma

Eğer bir obje diğer dizi veya objeleri içeriyorsa, eşitliğin sol tarafında daha karmaşık şablon kullanarak derinlere inilebilir.

Aşağıdaki kodda `ozellikler` içerisinde `boyut` adında başka bir obje ve `elemanlar` adında bir dizi içermektedir. Atamanın sol tarafında aynı yapı bulunmaktadır:

```js run
let ozellikler = {
  boyut: {
    genislik: 100,
    yukseklik: 200
  },
  elemanlar: ["Kek", "Ekmek"],
  ekstra: true    // ayrıştırılacak başka şeyler
};

// ayrıştırma daha açık olması için birkaç satırda yazılmıştır.
let {
  boyut: { // buraya boyutlar atanır.
    genislik,
    yukseklik
  },
  elemanlar: [eleman1, eleman2], // burada elemanlar atanır
  baslik = "Menü" // objede bulunmadığından varsayılan değer kullanılır.
} = ozellikler;

alert(baslik);  // Menü
alert(genislik);  // 100
alert(yukseklik); // 200
alert(eleman1);  // Kek
alert(eleman2);  // Ekmek
```
Tüm `ozellikler` objesi `ekstra` hariç karşılık gelen değişkene atanmıştır.

![](destructuring-complex.png)

Sonunda, `genislik`, `yukseklik`, `eleman1`, `eleman2` ve `baslik`'in varsayılan değeri elde edilmiş oldu.

Genelde çok karmaşık objelerde sadece işinize yarayanları almak daha mantıklıdır.

Farklı bir örnek:
```js
// boyut'un tek bir değişkene ata ve gerisini pas geç.

let { boyut } = ozellikler;
```

## Akıllı Fonksiyon Parametreleri

Bir fonksiyonun birçok parametresinin isteğe bağlı olduğu durumlar olabilir. Bu genelde kullanıcı arayüzü için geçerlidir. Diyelim ki menüyü oluşturan bir fonksiyon düşünün. Bu yükseklik, genişlik, başlık, elemanların listesi vs.. gibi bir çok parametreye sahip olabilir.

Aşağıda bunun nasıl kötü yazılabileceği gösterilmiştir:

```js
function menuyuGoster(baslik = "Başlıksız", genislik = 200, yukseklik = 100, elemanlar = []) {
  // ...
}
```
Buna fonksiyona değer gönderirken en büyük problem sıralamayı hatırlamaktır. Genelde IDE'ler bize bunun için yardımcı olur. Fakat yine de tam başarılı sayılmazlar. Diğer bir problem ise bu fonksiyonu çağırırken hangi argümana değer göndermezsek sorun çıkmaz bilgisidir. Bu bilgi de çok muallaktır.

Aşağıdaki gibi?

```js
menuyuGoster("Benim menüm", undefined, undefined, ["Birinci Eleman", "İkinci Eleman"])
```

Çok çirkin. Ayrıca daha fazla parametre olsa okuması da zor.

Burada ayrıştırma devreye giriyor!

Parametreler bir obje içerisinde gönderilebilir ve fonksyionun içerisinde bunlar değişkene atanabilir:

```js run
// objeleri fonksiyonlara gönderme
let ozellikler = {
  baslik: "Benim Menüm",
  elemanlar: ["Birinci Eleman", "İkinci Eleman"]
};

// ...  ve doğrudan değişkenlerine ayrılabilir.
function menuyuGoster(*!*{baslik = "Başlıksız", genislik = 200, yukseklik = 100, elemanlar = []}*/!*) {
  // baslik, elemanlar – bunlar ozellikler objesinden alınacak,
  // genislik, yukseklik – varsayılandakiler kullanılacak
  alert( baslik + ' ' + genislik + ' ' + yukseklik ); // Benim Menüm 200 100
  alert( items ); // Birinci Eleman, İkinci Eleman
}

menuyuGoster(ozellikler);
```
Daha karmaşık ayrıştırma kullanarak iç içe objeleri de kullanmak mümkündür:

```js run
let ozellikler = {
  baslik: "Benim Menüm",
  elemanlar: ["Birinci Eleman", "İkinci eleman"]
};

*!*
function menuyuGoster({
  baslik = "Başlıksız",
  genislik:g = 100,  // genislik g'ye atanır.
  yukseklik:h = 200, // yukseklik y'ye atanır.
  elemanlar: [eleman1, eleman2] // elemanların birincisi eleman1'e ikincisi eleman2'ye atanır.
}) {
*/!*
  alert( baslik + ' ' + g + ' ' + y ); // Benim menüm 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

menuyuGoster(ozellikler);
```

Yazımı daha önce yaptığınız ayrıştırma tanımı ile aynıdır:
```js
function({
  gelenOzellik: parametreAdi = vasayilanDeger
  ...
})
```
Dikkat edin bu şekilde ayrıştırma `menuyuGoster()` bir argüman aldığını varsayar. Eğer varsayılanda değerler olması isteniyor ise menuyuGoster({}) boş obje almalıdır:

```js
menuyuGoster({});

// Bu hata verir.
menuyuGoster();
```
Varsayılan değerleri göndermek için `{}` gönderilmesi gerekmektedir:

```js run
// daha net göstermek için bazı parametreler silinmiştir
function menuyuGoster(*!*{ baslik="Menü", genislik=100, yukseklik=200 } = {}*/!*) {
  alert( baslik + ' ' + genislik + ' ' + yukseklik );
}

menuyuGoster(); // Menü 100 200
```
Yukarıdaki kodda argümanın tamamı varsayılanda `{}` şeklindedir. Bundan dolayı her zaman ayrıştıracak birşey vardır.

## Özet

- Objeler veya diziler ayrıştırılarak birçok değişkene atanabilirler.  

- Obje Yazımı:
    ```js
    let {ozellik : degiskenAdi = varsayilan, ...} = obje
    ```
    Bu demek oluyor ki `ozellik` `degiskenAdi`'na gidecek ve eğer böyle bir özellik mevcut değilse `varsayilan` bu değer için kullanılacak.
    
- Dizi yazımı:

    ```js
    let [eleman1 = varsayilan, eleman2, ...geri_kalan] = dizi
    ```
    İlk eleman `eleman1`'e atanacak, ikincisi `eleman2`'ye ve geri kalan hepsi `geri_kalan` dizisine atanacak.
    
- Daha karmaşık yapılar için, eşitliğin sol tarafı sağ tarafı ile anyı olmalıdır.