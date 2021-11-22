
# Fonksiyon Objeleri, NFE

Bildiğiniz gibi JavaScript'te fonksiyonlar değerdir.

Her değerin bir tipi olduğuna göre fonksiyonun tipi nedir?

JavaScript'te fonksiyon bir objedir.

Daha iyi görselleyebilmek adına fonksiyonlara "aksiyon objeleri" denebilir. Sadece çağırarak değil, obje olarak da davranabilirsiniz: özellik ekleme çıkarma, referans paslama vs.

## "name" özelliği

Fonksiyon objelerinin kullanışlı özellikleri bulunmaktadır.

Örneğin, fonksiyonun ismi "name" özelliği ile alınabilir.

```js run
function selamVer() {
  alert("Selam");
}

alert(selamVer.name); // selamVer
```
"name" özelliği atama o kadar akıllıdır ki, fonksiyon tanımlama ifadelerindeki ismi bile doğru alır.

```js run
let selamVer = function() {
  alert("Selam");
}

alert(selamVer.name); // selamVer 
```
Hatta atama varsayılan değer ile yapıldığında bile çalışır:

```js run
function f(selamVer = function() {}) {
  alert(selamVer.name); // selamVer (çalıştı!)
}

f();
```
Tanımda bu özelliğe "bağlamsal isim" denir. Eğer fonksiyonda böyle bir şey yoksa, tanımlama bunu içerikten alır.

Object metodlarının da isimleri vardır:
```js run
let kullanici = {

  selamVer() {
    // ...
  },

  yolcuEt: function() {
    // ...
  }

}

alert(kullanici.selamVer.name); // selamVer
alert(kullanici.yolcuEt.name); // Güle güle
```
Burada bir sihir yoktur. İsmin çıkarılamadığı birçok durum meydana gelebilir.

Böyle durumlarda aşağıdaki gibi boş dönerler:

```js
// Dizinin içerisinde fonksiyon yaratılması
let arr = [function() {}];

alert( arr[0].name ); // <boş>
// motorun doğru ismi bulmasına imkan yok bundna dolayı boş dönüyor.
```
Pratikte çoğu fonksiyonun ismi bulunmaktadır.

## "length" özelliği 
"length" adında ayrı bir özellik daha bulunmaktadır. Bu özellik fonksiyon parametrelerinin sayısını döndürür:

```js run
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```
Gördüğünüz gibi geriye kalan parametresi `...` sayılmamaktadır.

`length` özelliği bazen diğer fonksiyonların üzerinde çalışan fonksiyonlara bir iç bakış oluşturur.

Mesela, aşağıdaki kodda `sor`fonksiyonu `soru` parametresi alır ve belirli olmayan sayıda `isleyici` fonksiyonunu çağırır.

Kullanıcı cevap verdiğinde `isleyici`(handler) çağırılır. İki türlü işleyici gönderilebilir:

- Argümansız fonksiyon, sadece pozitif cevaplarda çağırılır.
- Argümanlı fonksiyonlar, cevap alınan her durumda çağırılır.

Mantık şu şekildedir; cevap pozisit olduğunda argüman almayan isleyici calisir, fakat evrensel isleyiciye de izin verir.

`isleyici`'lerin doğru çalışması için, `length` özelliğinden faydalanılabilir.

```js run
function sor(soru, ...isleyiciler) {
  let dogruMu = confirm(soru);

  for(let isleyici of isleyiciler) {
    if (isleyici.length == 0) {
      if (dogruMu) isleyici();
    } else {
      isleyici(dogruMu);
    }
  }

}

// Olumlu cevap için, her ikisi çalışırken
// Olumsuz cevap için sadece ikincisi çalışmaktadır.
sor("Soru?", () => alert('Evet dedin'), sonuc => alert(sonuc));
```
Bu duruma [polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) denilmektedir. Bu argümanlara tiplerine göre farklı davranma olayıdır. Bu bizim durumumuzda `length`'e bağlıdır. Bu fikir  JavaScript  kütüphanelerinde de kullanılmaktadır.

## Özelleştirilmiş özellikler

Kendi özelliğinizi eklemek de mümkündür.
Örneğin aşağıda `counter` özelliği ile toplan çağrı sayısı tutulmaktadır:

```js run
function selamVer() {
  alert("Selam");

  *!*
  // Kaç defa çağırıldığını tutar.
  sayHi.counter++;
  */!*
}
selamVer.counter = 0; // ilk değer

selamVer(); // Selam
selamVer(); // Selam

alert( `selamVer ${selamVer.counter} defa çağırılmıştır` ); // selamVer 2 defa çağırılmıştır.
```

```warn header="Özellik değişken değildir"
Fonksiyona atanan `selamVer.counter = 0` selamVer fonksiyonunun içerisinde `counter` değişkenini tanımlamaz. Diğer bir deyişle `counter` özelliği ile `let counter` birbirinden tamamen farklı şeylerdir.

Fonksiyona obje gibi davranıp özellik eklenebilir. Bu çalışmasında bir etki yaratmaz. Değişkenler fonksiyon özelliklerini kullanmaz, keza fonksiyon özellikleri de değişkenleri kullanmaz.
```

Fonksiyon özellikleri closure kullanılarak tekrardan yazılabilir. Örneğin yukarıdaki sayaç örneğini <info:closure> kullanarak tekrardan yazacak olursak:

```js run
function makeCounter() {
    // let count = 0 yazmak yerine

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
```
`count` artık fonksiyonun içerisinde bulunur, dış ortamda değil.

Closure kullanmak iyi mi kötü mü?

Eğer `sayac`'ın değeri dışarıdaki değişkende bulunuyorsa, dışta bulunan kod buna erişemez. Sadece içteki fonksiyon bunu modifiye edebilir. Bu da anca fonksiyona bağlıysa gerçekleşebilir:


```js run
function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

*!*
counter.count = 10;
alert( counter() ); // 10
*/!*
```

Bundan dolayı asıl önemli olan sizin hangi şekilde kullanmak istediğiniz.

## İsimlendirilmiş Fonksiyon İfadeleri ( Named Function Expression - NFE ) 

İsimlendirilmiş fonksiyon ifadeleri , NFE, daha önce kullandığımız Fonksiyon İfadelerinin isimlendirilmiş halidir.

Örneğin, sıradan bir Fonksiyon İfadesi incelenecek olursa:

```js
let selamVer = function(kim) {
  alert(`Selam, ${kim}`);
};
```
... isimlendirilirse:

```js
let selamVer = function *!*func*/!*(kim) {
  alert(`Merhaba, ${kim}`);
};
```
Peki buradaki mantık ne? Ayrıca bir `"func"` eklemenin ne anlamı var?

Tekrar etmek gerekirse, hala bir Fonksiyon İfadeniz var. Fonksiyon ifadesine `"function"` 'dan sonra `"func"` eklemek bu fonksiyonu Fonksiyon Tanımı haline getirmez çünkü hala bir atama operasyonu ile tanımlanmıştır.

Böyle bir isim eklemek hiçbir soruna neden olmaz. 

Fonksiyon hala `selamVer()` şeklinde kullanılabilir:

```js run
let selamVer = function *!*func*/!*(kim) {
  alert(`Selam, ${kim}`);
};

selamVer("Ahmet"); // Selam, Ahmet
```
`func` ismine ait iki tane özellik vardır:

1.Bu şekilde fonksiyonun kendisine içerisinden referans vermek mümkündür.
2. Fonksiyonun dışından erişilemez.

Örneğin, `selamVer` fonksiyonu eğer bir parametre olmadan çağırılırsa kendisini `"Misafir"` ile tekrardan çağırabilir.

```js run
let selamVer = function *!*func*/!*(kim) {
  if (kim) {
    alert(`Selam, ${kim}`);
  } else {
*!*
    func("Misafir"); // kendisni yeniden çağırabilir.
*/!*
  }
};

selamVer(); // Selam, Misafir

// Fakat aşağıdaki çalışmayacaktır:
func(); // func tanımlı değildir. ( Fonksiyonun dışından erişilemez.)
```
Peki neden `func` kullanıyoruz? Sadece `selamVer` kullansak olmaz mı?

Aslında çoğu durumda olur:

```js
let selamVer = function(kim) {
  if (kim) {
    alert(`Selam, ${kim}`);
  } else {
*!*
    selamVer("Misafir");
*/!*
  }
};
```
Buradaki problem `selamVer`'in değeri değişebilir. Fonksiyon diğer bir değişkene gidebilir ardından hatalar vermeye başlar.

```js run
let selamVer = function(kim) {
  if (kim) {
    alert(`Selam, ${kim}`);
  } else {
*!*
    selamVer("Misafir");
*/!*
  }
};

let hosGeldin = selamVer;
selamVer = null;

hosGeldin(); //Artık selamVer çağırılamaz.
```
Bunun olmasının nedeni fonksiyonun `selamVer`'i dış ortamdan alıyor olmasıdır. Yerel bir `selamVer` bulunmadığından dıştaki değişken kullanılmaktadır. O anda da dışta bulunan `selamVer` `null`'dur.

Opsiyonel olarak konulan isim tam olarak Fonksiyon İfadesinin bu problemini çözer.

Bunu kullanarak kod şu şekilde düzeltilebilir:

```js run
let selamVer = function *!*func*/!*(kim) {
  if (kim) {
    alert(`Selam, ${kim}`);
  } else {
*!*
    func("Misafir"); // Şimdi hepsi doğru şekilde çalışır.
*/!*
  }
};

let hosGeldin = selamVer;
selamVer = null;

hosGeldin(); // Selam, Misafir (iç çağrı çalışır)
```

Şimdi çalışır, bunun nedeni `"func"`'in lokal fonksiyon olmasındandır. Dışarıdan alınmaz ( dışarıdan görünmez de ). Bu şekilde yazıldığında var olan fonksiyonu referans vereceği garantidir.

Dışta bulunan kod hala `selamVer` veya `hosGeldin` değişkenlerine sahiptir. Dıştaki değişkenlere bir şey olsa bile `func`"iç fonksiyon ismi"'dir. Kendisini gizli biçimde çağırabilir.

```smart header="Fonksiyon Tanımı diye bir şey yoktur."
"içsel isim" olarak tanımlanan özellik sadece Fonksiyon İfadeleri için geçerlidir. Fonksiyon Tanımlarında çalışmaz. Fonksiyon tanımları için "içsel" bir isim ekleme yöntemi yoktur.

Bazen güvenli bir isme ihtiyaç duyulduğunda Fonksiyon Tanımı tekrardan İsimlendirilmiş Fonksiyon İfadesi şekline getirilir.
```

## Özet
Fonksiyonlar objedir.

Özellikleri şu şekildedir:

- `name` -- Fonksiyon ismi. Sadece fonksiyon tanımlama da değil, atamalar ve obje özellikleri için.
- `length`  -- Fonksiyon tanımındaki argüman sayısı, geriye kalan parametreleri ( ... ) sayılmaz.

Eğer fonksiyon Fonksiyon Tanımı yöntemi ile ( ana akışta olmayan ) tanımlanmışsa ve isim taşıyorsa buna İsimlendirilmiş Fonksiyon Tanımı denir. İsim içersiinde veya recursive çağrılarda kullanılabilir.

Fonksiyonlar ayrıca başka özelliklerde taşıyabilirler. Çoğu bilinen JavaScript kütüphanesi bu özelliği ziyadesiyle kullanır.

Genelde bir "ana" fonksiyon ve bu fonksiyona bağlı birçok "yardımcı" fonksiyon tanımlarlar. Örneğin [jquery](https://jquery.com) `$` adında bir fonksiyon oluşturur. [lodash](https://lodash.com) fonksiyonu `_` adında bir fonksiyon oluşturu. Ardıncan `_.clone`, `_.keyBy` gibi özellikleri ekler. [Dökümantasyon](https://lodash.com/docs)'u inceleyebilirsiniz.  Aslında, global alanda baya temiz çalışırlar. Böylece bir kütüphane bir tane global değişken vermiş olur. Bu da isimlerin birbiriyle çakışmasını engeller.

Bundan dolayı bir fonksiyon kendince bir iş yapabilir ve özellikleri vasıtasıyla başka fonksiyonalitelere de sahip olabilir.
