
# "new Function" yazımı

Çok az kullanılsa da bir çeşit daha fonksiyon yaratma şekli vardır. Çok az kullanılsa da bazen alternatifsizdirler.

## Yazım

Fonksiyon yaratmak için:

```js
let func = new Function('a', 'b', 'return a + b');
```

`new Function`'ın tüm argümanları karakter dizisidir. Parametreler önce, çalışacak kodun içeriği en son olarak yazılır.

Örneğin:

```js run
let sum = new Function('arg1', 'arg2', 'return arg1 + arg2');

alert( sum(1, 2) ); // 3
```

Eğer argüman yok ise, sadece gövde ile fonksiyon yaratılır:

```js run
let selamVer = new Function('alert("Selam")');

selamVer(); // Selam
```

Diğer yöntemlere göre en büyük farklılık -- fonksiyon gerçektende sadece karakter dizisinden oluşuyor, bu çalışma anında gerçekleşiyor.

Diğer tüm tanımlamalar programcıların kod yazmasını gerektirir.

Fakat `new Function` herhangi bir metini fonksiyona çevirebilir. Örneğin sunucudan metin olarak bir fonksiyon alıp bunu çalıştırmak mümkündür.

```js
let str = ... Serverdan dinamik olarak gelen metin...

let func = new Function(str);
func();
```

Tabi bunlar çok özel haller, örneğin sunucudan bir metini alıp çalıştırmak, veya temadan dinamik olarak derleme. Bunun gibi ihtiyaçlar genelde geliştirmenin ileriki safhalarında karşılaşılır.

## Closure

<<<<<<< HEAD
Fonksiyon genelde doğduğu yeri hatırlar `[[Ortam]]`. Bulunduğu Sözcüksel Ortama yaratıldığı yerden referans verir.

Bir fonksiyon `new Function` ile yaratıldığında `[[Ortam]]` referansı o anki bulunduğu ortamı değil de evrensel ortama referans verir.

```js run

function FonkAl() {
  let deger = "test";
=======
Usually, a function remembers where it was born in the special property `[[Environment]]`. It references the Lexical Environment from where it's created  (we covered that in the chapter <info:closure>).

But when a function is created using `new Function`, its `[[Environment]]` is set to reference not the current Lexical Environment, but the global one.

So, such function doesn't have access to outer variables, only to the global ones.

```js run
function getFunc() {
  let value = "test";
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93

*!*
  let func = new Function('alert(deger)');
*/!*

  return func;
}

FonkAl()(); // hata: deger tanımlı değildir.
```

Normal davranış şu şekildedir:

```js run 
function FonkAl() {
  let deger = "test";

*!*
  let func = function() { alert(deger); };
*/!*

  return func;
}

FonkAl()(); // *!*"test"*/!*, FonkAl'ın sözcüksel ortamından.
```

`new Function` özelliği biraz garip dursa da çok kullanışlı ve pratiktir.

Düşününkü gerçekten de karakter dizisinden fonksiyon yaratmanız gerekti. O fonksiyonun ne olduğu hangi kodları ihtiva ettiği baştan belli olmayacaktı ( bundan dolayı normal fonksiyonlar kullanılamaz ), fakat çalışma anında fonksiyon yaratılacak. Bu fonksiyon sunucudan veya diğer bir kaynaktan alınabilir.

Yeni fonksiyon ana kod akışı ile etkileşime geçme ihtiyacında olabilir.

Belki dışta bulunan yerel değişkene erişmek gerekmektedir.

Fakat burada şöyle bir problem var. JavaScript canlı ortama çıkmadan *sıkıştırıcı* (minifier) kullanılır ve böylece gereksiz boşluklar vs kaldırılır. Fakat daha da önemlisi, yerel değişkenler kısaltılarak işlenir.

<<<<<<< HEAD
Örneğin bir fonksiyon `let kullaniciAdi` diye bir fonksiyona sahip olsa, *sıkıştırıcı* bunu `let k` şeklinde veya bu değişken daha önce kullanılmışsa başka küçük bir değişken ile tutar. Bu aslında mantıklı olandır. Değişken zaten yerel bir değişkendir ve dışarıdan buna erişilemez. Bundan dolayı fonksiyonun içerisinde kullanılan her `kullaniciAdi` yeni değişken ismiyle değiştirilir. *Sıkıştırıcılar* kodu ve kod yapısını analiz ederler sadece bul ve değiştir işlemi yapmazlar.
=======
For instance, if a function has `let userName`, minifier replaces it with `let a` (or another letter if this one is occupied), and does it everywhere. That's usually a safe thing to do, because the variable is local, nothing outside the function can access it. And inside the function, minifier replaces every mention of it. Minifiers are smart, they analyze the code structure, so they don't break anything. They're not just a dumb find-and-replace.
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93

Fakat `new Function` dıştaki değişkenlere erişebilir olsa isi bu defa `kullaniciAdi`'nı bulamazdı.

**Dış fonksiyonlara erişilme mümkün olsa bile `new Function` sıkıştırıcılar ile problem yaşardı**

<<<<<<< HEAD
`new Function`'ın bir özelliği bizi hata yapmaktan kurtarır ve daha iyi kod yazmamıza yardımcı olur.
=======
Besides, such code would be architecturally bad and prone to errors.

To pass something to a function, created as `new Function`, we should use its arguments.
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93

Eğer `new Function` ile yazılmış bir fonksiyona argüman göndermek istiyorsanız, bunu argümanları birer birer belirterek yapmanız gerekmektedir.

"topla" fonksiyonu aslında bunu doğru bir şekilde yapmaktadır:

```js run 
*!*
let topla = new Function('a', 'b', ' return a + b; ');
*/!*

let a = 1, b = 2;

*!*
// Dış değerler argüman olarak gönderilmiştir.
alert( topla(a, b) ); // 3
*/!*
```

## Özet

<<<<<<< HEAD
Yazım:
=======
These three declarations mean the same:
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93

```js
let func = new Function(arg1, arg2, ..., govde);
```

Eski kodlara uyumluluktan dolayı argümanlar virgül ile ayrılmış liste olarak da verilebilir.

Aşağıdaki üç örnekte birbiri ile aynıdır:

```js 
new Function('a', 'b', ' return a + b; '); // basit yazım
new Function('a,b', ' return a + b; '); // virgül ile ayrılmış yazım
new Function('a , b', ' return a + b; '); //virgül ve boşluk ile ayrılmış yazım.
```

<<<<<<< HEAD
`new Function` kullanılarak yaratılan fonksiyonlar, `[[Ortam]]` olarak Evrensel Sözcük Ortamını referans verir, dış değil. Bundan dolayı dıştaki değişkeni kullanamazlar. Fakat bu aslında iyi birşeydir, bizi hatalardan korur. Bire bir parametre gönderme de mimari olarak çok başarılır. Ayrıca *sıkıştırıcı* ile de probleme neden olmamaktadır.
=======
Functions created with `new Function`, have `[[Environment]]` referencing the global Lexical Environment, not the outer one. Hence, they cannot use outer variables. But that's actually good, because it insures us from errors. Passing parameters explicitly is a much better method architecturally and causes no problems with minifiers.
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93
