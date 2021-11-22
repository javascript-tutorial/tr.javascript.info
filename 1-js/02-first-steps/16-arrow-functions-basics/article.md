# Ok Fonksiyonlarına Giriş

Fonksiyonları yaratmak için daha kısa bir yöntem daha vardır, bu Fonksiyon İfadesinden daha iyi denilebilir. Bunlara "Ok Fonksiyonları" denir. Çünkü "ok" gibi görünürler.

```js
let func = (arg1, arg2, ...argN) => ifade
```

Yukarıda yazılan kod `func` adında `arg1..argN`'e kadar argüman alan ve sonunda `ifade`yi çalıştıran bir fonksiyon bulunmaktadır.

Diğer bir deyişle, aşağıdaki ile neredeyse aynı kod yazılmıştır.

```js
let func = function(arg1, arg2, ...argN) {
  return ifade;
}
```
... Fakat `ok` ile yazılan daha özlüdür.

Örneğin:
```js run
let topla = (a, b) => a + b;

/* ok fonksiyonu aşağıdaki fonksiyon ifadesinin daha özlü yazılmış halidir.:

let topla = function(a, b) {
  return a + b;
};
*/

alert( topla(1, 2) ); // 3

```
Eğer tek argüman olsaydı, bu durumda parantez de çıkarılabilirdi, böylece daha da kolay olurdu:


```js run
// aynısı
// let ikiKati = function(n) { return n * 2 }
*!*
let ikiKati = n => n * 2;
*/!*

alert( ikiKati(3) ); // 6
```

Eğer hiçbir değer yoksa parantez eklenmelidir. ( Bir değer olduğunda yukarıdaki gibi kullanılabilir.)


```js run
let selamVer = () => alert("Merhaba!");

selamVer();
```
Ok Fonksiyonları Fonksiyon ifadeleri ile aynı şekilde kullanılabilirler.

Örneğin aşağıda `merhaba()` fonksiyonunun Ok Fonksiyonu şekliyle görebilirsiniz.

```js run
let yas = prompt("Kaç Yaşındasın?", 18);

let merhaba = (yas < 18) ?
  () => alert('Merhaba') :
  () => alert("Merhabalar!");

merhaba(); 
```

Ok fonksiyonları ilk yazılmaya başlandığında göze yabancı gelebilir. Fakat zamanla göz bu yapıya alışacak ve hemen ayak uyduracaktır.

Uzunca yazmak istemiyorsanız, kolayca tek kelimelik fonksiyonlar yazabilirsiniz.


```smart header="Çok satırlı Ok Fonksiyonları"

Yukarıdaki örnekte argüman `=>` solundan alınır ve sağında çalıştırılır.

Bazen bundan daha karmaşık yapılara ihtiyaç duyabilirsiniz. Bunun için sağ tarafa başlarken `{` parantez ile başlar ve bittiğinde de `}` ile fonksiyonu kapatırsanız içerisine fonksiyonun gövdesini yazabilirsiniz.

Bunun gibi:

```js run
let toplam = (a, b) => {  // birden fazla satır yazmak için `{` kullanılmalıdır.
  let sonuc = a + b;
*!*
  return sonuc; // eğer süslü parantez kullanıyorsanız değer döndürmek için return yazmanız gerekmektedir.
*/!*
};

alert( toplam(1, 2) ); // 3
```

```smart header="Dahası var"
Şu anda sadece Ok Fonksiyonlarına giriş yaptık. Fakat elbette tamamı bu değil! Ok fonksiyonun başka ilginç özellikleri de mevcut. Bunlara <info:arrow-functions> bölümünde değinilecektir.

Şimdilik tek satırlı fiillerde ve geri çağrım fonksiyonlarında kullabilirsiniz.
```

## Özet

Ok Fonksiyonları tek satır için kullanışlıdır. İki türlüsü vardır:

1. Süslü parantez olmadan: Fonksiyon sağ taraftaki ifadeyi çalıştırır ve sonucu dönderir. Tek satırda biten işlemler için kullanılmalıdır.
2. Süslü parantez ile `(...args) => { gövde }` -- süslü parantez bizim birden fazla satır yazmamızı sağlar.  Fakat gövde içerisinde `return` kullanılması gerekmektedir.
