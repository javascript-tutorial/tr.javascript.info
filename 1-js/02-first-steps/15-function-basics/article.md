# Fonksiyonlar

Çoğu zaman kod yazarken belirli bölümleri tekrarlama ihtiyacı duyulur.

Örneğin kullanıcı hesabına giriş yaptığında veya çıktığında güzel görünümlü bir mesaj göstermek istenebilir.

Fonksiyonlar programın "yapı taşıdır". Birçok defa bu fonksiyonlar çağırılarak tekrardan bu kodları yazmaktan kurtulunur.

Aslında var olan `alert(mesaj)`, `prompt(mesaj,varsayilan)` ve `confirm(soru)` gibi fonksiyonları gördük. Fakat artık bunları yazmanın zamanı geldi.

## Fonksiyon Tanımlama

Fonksiyon tanımlamak için *function tanım* kullanılır.

Aşağıdaki gibi görünür:
```js
function mesajGoster() {
  alert( 'Merhaba millet!' );
}
```

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md
`function` kelimesi önce yazılır, ardından *fonksiyonun adı* ve sonra parametrelerin yazılacağı parantez açılır ve ihtiyaç duyulan parametreler yazılır, sonrasında ise kapatılıp süslü parantez ile *fonksiyon gövdesi*ne başlanır.
=======
The `function` keyword goes first, then goes the *name of the function*, then a list of *parameters* between the parentheses (comma-separated, empty in the example above, we'll see examples later) and finally the code of the function, also named "the function body", between curly braces.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/15-function-basics/article.md

```js
function name(parameter1, parameter2, ... parameterN) {
 // body
}
```

Yeni fonksyion ismiyle şu şekilde çağırılır: `mesajGoster()`.

Örneğin:

```js run
function mesajGoster() {
  alert( 'Merhaba millet' );
}

*!*
mesajGoster();
mesajGoster();
*/!*
```

`mesajGoster()` fonksiyonu kodu çalıştırır. Bu kod sonrasında `Merhaba millet` uyarısını iki defa göreceksiniz.

Bu örnek açıkça fonksiyonların ana amacını gösteriyor: Kod tekrarından kaçınma.

Eğer mesajı değiştirmek istersek bir yerde değiştirdiğimizde bu fonksiyonu kullanan her yerde değişiklik olacaktır.

## Yerel değişkenler

Fonksiyon içinde tanımlanan değişkene sadece o fonksiyon içerisinde erişilebilir.

Örneğin:

```js run
function mesajGoster() {
*!*
  let mesaj = "Merhaba! Ben Javascript"; // Yerel Değişken
*/!*

  alert( mesaj );
}

mesajGoster(); // Merhaba! Ben Javascript

alert( mesaj ); // <-- Hata! Bu değişken `mesajGoster` fonksiyonuna aittir.
```

## Dış Değişkenler

Fonksiyon, kendi dışında oluşturulmuş değişkenlere erişebilir. Örneğin:

```js run no-beautify
let *!*kullaniciAdi*/!* = 'Adem';

function mesajGoster() {
  let mesaj = 'Hello, ' + *!*kullaniciAdi*/!*;
  alert(mesaj);
}

mesajGoster(); // Merhaba, Adem
```

Fonksiyon dışarıda bulunan değişkenlere tam kontrol sağlar. Hatta modifiye edebilir.

Örneğin:

```js run
let *!*kullaniciAdi*/!* = 'Adem';

function mesajGoster() {
  *!*kullaniciAdi*/!* = "Yusuf"; // (1) dışarıda bulunan değişkenin değeri değişti.

  let mesaj = 'Merhaba, ' + *!*kullaniciAdi*/!*;
  alert(mesaj);
}

alert( kullaniciAdi ); // Fonksiyon çağırılmadan  *!*Adem*/!*

mesajGoster();

alert( kullaniciAdi ); // fonksiyon çağırıldıktan sonra *!*Yusuf*/!*,
```

Dışarıda bulunan değişkenler eğer yerel değişken yoksa kullanılırlar. Bazen eğer `let` ile değişken oluşturulmazsa karışıklık olabilir.

Eğer aynı isim ile fonksiyon içerisinde bir değişken oluşturulmuş ise, fonksiyon içerisindeki değişkenin değeri düzenlenebilir.  Örneğin aşağıda yerel bir değişken dıştaki değişken ile aynı isimdedir. Dolayısıyla yerel değişken düzenlenecektir. Dıştaki değişken bundan etkilenmeyecektir.

```js run
let kullaniciAdi = 'Adem';

function mesajGoster() {
*!*
  let kullaniciAdi = "Yusuf"; // yerel değişken tanımla
*/!*

  let mesaj = 'Merhaba, ' + kullaniciAdi; // *!*Yusuf*/!*
  alert(mesaj);
}

// buradaki fonksiyon kendi değişkenini yaratacak ve onu kullanacak.
mesajGoster();

alert( kullaniciAdi ); // *!*Adem*/!*, değişmedi!!!, fonksiyon dışarıda bulunan değişkene erişmedi.
```

```smart header="Evrensel(Global) Değişkenler"

Fonksiyonların dışına yazılan her değişken, yukarıda bulunan `kullaniciAdi` gibi, *evrensel* veya  *global* değişken olarak adlandırılırlar.

Global değişkenlere her fonksiyon içerisinden erişilebilir.(Yerel değişkenler tarafından aynı isimle bir değişken tanımlanmamışsa)

Genelde fonksiyonlar yapacakları işe ait tüm değişkenleri tanımlarlar, global değişkenler ise sadece proje seviyesinde bilgi tutarlar, çünkü proje seviyesinde bilgilerin projenin her yerinden erişilebilir olması oldukça önemlidir. Modern kodda az veya hiç global değer olmaz. Çoğu fonksiyona ait değişkenlerdir.

```

## Parametreler
Parametrelere isteğe bağlı olarak veri paslanabilir. Bunlara *fonksiyon argümanları* da denir.

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md
Aşağıdaki fonksiyon iki tane parametreye sahiptir. `gonderen` ve `metin`

```js run
function mesajGoster(*!*gonderen, metin*/!*) { // argümanlar: gonderen, metin
  alert(gonderen + ': ' + metin);
}

*!*
mesajGoster('Ahmet', 'Merhaba!'); // Ahmet: Merhaba! (*)
mesajGoster('Mehmet', "Naber?"); // Mehmet: Naber? (**)
*/!*
=======
We can pass arbitrary data to functions using parameters.

In the example below, the function has two parameters: `from` and `text`.

```js run
function showMessage(*!*from, text*/!*) { // parameters: from, text
  alert(from + ': ' + text);
}

*!*showMessage('Ann', 'Hello!');*/!* // Ann: Hello! (*)
*!*showMessage('Ann', "What's up?");*/!* // Ann: What's up? (**)
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/15-function-basics/article.md
```

Eğer fonksiyonlar `(*)` ve `(**)` deki gibi yazılırsa doğrudan fonksiyonda `gonderen` ve `metin` yerel değişkenlerine atanırlar. Sonrasında fonksiyon bunları kullanabilir.

Aşağıda `gonderen` değişkeni fonksiyona paslanmakta. Dikkat ederseniz fonksiyon içerisinde `gonderen` değişse bile bu dışarıda bulunan değişkeni etkilememekte. Çünkü fonksiyon bu değişkenin her zaman kopyasını kullanır:

```js run
function mesajGoster(gonderen,metin) {

*!*
  gonderen = '*' + gonderen + '*'; // "gonderen" biraz daha güzel hale getirildi.
*/!*

  alert( gonderen + ': ' + metin );
}

let gonderen = "Mahmut";

mesajGoster(gonderen, "Merhaba"); // *Mahmut*: Merhaba

// "gonderen" değişkeninin değeri sadece fonksiyon içerisinde değişti. Çünkü bu değişken paslandığında fonksiyon yerel bir kopyası üzerinde çalışır
alert( gonderen ); // Mahmut
```

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md
### Varsayılan Değerler

Eğer fonksiyon argümanına bir değer gönderilmemişse fonksiyon içerisinde bu değişken `undefined` olur.
=======
When a value is passed as a function parameter, it's also called an *argument*.

In other words, to put these terms straight:

- A parameter is the variable listed inside the parentheses in the function declaration (it's a declaration time term).
- An argument is the value that is passed to the function when it is called (it's a call time term).

We declare functions listing their parameters, then call them passing arguments.

In the example above, one might say: "the function `showMessage` is declared with two parameters, then called with two arguments: `from` and `"Hello"`".


## Default values

If a function is called, but an argument is not provided, then the corresponding value becomes `undefined`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/15-function-basics/article.md

Örneğin `mesajGoster(gonderen,metin)` fonksiyonu tek argüman ile de çağırılabilir.

```js
mesajGoster("Mahmut");
```
Bu bir hata değildir. Fonksiyon eğer bu şekilde çağırılırsa, yani `metin` yoksa, `metin == undefined` varsayılır. Yukarıdaki fonksiyon çağırıldığında sonuç "Mahmut: undefined" olacaktır.

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md
Eğer "varsayılan" olarak `metin` değeri atamak istiyorsanız, `=` işareti ile tanımlamanız gerekmekte.
=======
That's not an error. Such a call would output `"*Ann*: undefined"`. As the value for `text` isn't passed, it becomes `undefined`.

We can specify the so-called "default" (to use if omitted) value for a parameter in the function declaration, using `=`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/15-function-basics/article.md

```js run
function mesajGoster(gonderen, *!*metin = "metin gönderilmedi"*/!*) {
  alert(gonderen + ": " + metin );
}

mesajGoster("Mahmut"); // Mahmut: metin gönderilmedi
```
Eğer `metin` değeri paslanmazsa, `"metin gönderilmedi"` çıktısı alınır.

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md
`"metin gönderilmedi"` şu anda karakter dizisidir. Fakat daha karmaşık yapılar olabilir. Sadece parametre gönderilmez ise bu değer atanır. Aşağıdaki kullanım da pekala doğrudur.
=======
Now if the `text` parameter is not passed, it will get the value `"no text given"`.

The default value also jumps in if the parameter exists, but strictly equals `undefined`, like this:

```js
showMessage("Ann", undefined); // Ann: no text given
```

Here `"no text given"` is a string, but it can be a more complex expression, which is only evaluated and assigned if the parameter is missing. So, this is also possible:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/15-function-basics/article.md

```js run
function mesajGoster(gonderen, metin = digerFonksiyon()) {
  // eğer metin gönderilmez ise digerFonksiyon çalışır ve sonucu "metin" değişkenine atanır.
}
```

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md

````smart header="Eski tip varsayılan parametreler"
Eski tip JavaScript varsayılan parametreleri desteklememekteydi. Bundan dolayı farklı yöntemler geliştirdi. Eğer eskiden yazılmış kodları okursanız bu kodlara rastlayabilirsiniz.
=======
```smart header="Evaluation of default parameters"
In JavaScript, a default parameter is evaluated every time the function is called without the respective parameter.

In the example above, `anotherFunction()` isn't called at all, if the `text` parameter is provided.

On the other hand, it's independently called every time when `text` is missing.
```

````smart header="Default parameters in old JavaScript code"
Several years ago, JavaScript didn't support the syntax for default parameters. So people used other ways to specify them.

Nowadays, we can come across them in old scripts.

For example, an explicit check for `undefined`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/15-function-basics/article.md

Örneğin doğrudan  `undefined` kontrolü:
```js
function mesajGoster(gonderen, metin) {
*!*
  if (metin === undefined) {
    text = 'metin gönderilmedi';
  }
*/!*

  alert( gonderen + ": " + metin );
}
```
...Veya `||` operatörü:

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md

```js
function mesajGoster(gonderen, metin) {
  // eğer metin yanlış değer ise( bu durumda undefined yanlış değerdir hatırlarsanız ) 'metin gönderilmedi' ata.
  text = text || 'metin gönderilmedi';
=======
...Or using the `||` operator:

```js
function showMessage(from, text) {
  // If the value of text is falsy, assign the default value
  // this assumes that text == "" is the same as no text at all
  text = text || 'no text given';
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/15-function-basics/article.md
  ...
}
```
````


<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md
## Değer döndürme
=======
### Alternative default parameters

Sometimes it makes sense to assign default values for parameters at a later stage after the function declaration.

We can check if the parameter is passed during the function execution, by comparing it with `undefined`:

```js run
function showMessage(text) {
  // ...

*!*
  if (text === undefined) { // if the parameter is missing
    text = 'empty message';
  }
*/!*

  alert(text);
}

showMessage(); // empty message
```

...Or we could use the `||` operator:

```js
function showMessage(text) {
  // if text is undefined or otherwise falsy, set it to 'empty'
  text = text || 'empty';
  ...
}
```

Modern JavaScript engines support the [nullish coalescing operator](info:nullish-coalescing-operator) `??`, it's better when most falsy values, such as `0`, should be considered "normal":

```js run
function showCount(count) {
  // if count is undefined or null, show "unknown"
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown
```

## Returning a value
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/15-function-basics/article.md

Fonksiyon çağırıldığı yere değer döndürebilir.

En basit örnek iki değeri toplayan bir fonksiyon olabilir.

```js run no-beautify
function toplam(a, b) {
  *!*return*/!* a + b;
}

let sonuc = toplam(1, 2);
alert( sonuc ); // 3
```

`return` fonksiyon içerisinde her yerde kullanılabilir. Kod `return` satırına eriştiğinde fonksiyon durur ve değer fonksiyonun çağırıldığı yere geri gönderilir.

Bir fonksiyon içerisinde birden fazla `return` fonksiyonu da olabilir.

```js run
<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md
function yasKontrolu(yas) {
  if (yas > 18) {
=======
function checkAge(age) {
  if (age >= 18) {
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/15-function-basics/article.md
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Ebevenylerinin izni var mı?');
*/!*
  }
}

let yas = prompt('Kaç yaşındasın?', 18);

if ( yasKontrolu(yas) ) {
  alert( 'İzin verildi' );
} else {
  alert( 'Reddedildi' );
}
```
`return` değer döndürmek zorunda değildir. Bu fonksiyondan anında çıkmayı sağlar.

Örneğin:

```js
function filmGoster(age) {
  if ( !yasKontrolu(yas) ) {
*!*
    return;
*/!*
  }

  alert( "Filmleri izleyebilirsin" ); // (*)
  // ...
}
```
Yukarıdaki kodda  eğer `yasKontrolu(yas)` `false` döndürür ise  `filmGoster` fonksiyonu `alert`e erişemeyecektir.

````smart header="boş veya bir şey döndürmeyen fonksiyon `undefined` döndürür"
Eğer bir fonksiyon değer döndürmüyor ise bu fonksiyon `undefined` döndürüyor ile aynı anlama gelir.


```js run
function biseyYapma() { /* boş */ }

alert( biseyYapma() === undefined ); // true
```

Boş döndüren `return`, `return undefined` ile aynıdır.

```js run
function biseyYapma() {
  return;
}

alert( biseyYapma() === undefined ); // true
```
````

````warn header="`return` ve `değer` arasına hiçbir zaman satır eklemeyin"

Uzun `return` ifadelerinde, yeni bir satırda yazmak size kullanışlı gelebilir, örneğin aşağıdaki gibi:

```js
return
 (bazı + uzun + ifade + veya + baska + birsey  * f(a) + f(b))
```
Bu çalışmaz, çünkü JavaScript `return` kelimesinden sonra `;` varsayar ve `undefined` döner. Bu aşağıdaki ifade ile aynıdır:

```js
return*!*;*/!*
  (bazı + uzun + ifade + veya + baska + birsey  * f(a) + f(b))
```
<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md
Bundan dolayı, tam olarak boş return olur. Geri döndüreceğimiz değer ile return aynı satırda olmalıdır.

=======

So, it effectively becomes an empty return.

If we want the returned expression to wrap across multiple lines, we should start it at the same line as `return`. Or at least put the opening parentheses there as follows:

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```
And it will work just as we expect it to.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/15-function-basics/article.md
````

## Fonksiyonu isimlendirme [#fonksiyon-isimlendirme]

Fonksiyonlar eylemdir. Bundan dolayı isimleri yüklem olmalıdır. Net olmalı ve fonksiyonun ne işe yaradığını ifade edebilmelidir. Böylece kim ki kodu okur, ne yazıldığına dair bir fikri olur.

Genel itibari ile eylemi tanımlayan ön ek kullanmak iyi bir yöntemdir. Bu ön ekler ile ilgili birlikte kod yazdığınız kişiler ile uyum içerisinde olmalısınız.

Örneğin `"show"` fonksiyonu her zaman bir şeyleri `gösterir`.

Fonksiyonlar şöyle başlayabilir.

- `"get…"` -- değer döndürür,
- `"calc…"` -- bir şeyler hesaplar,
- `"create…"` -- bir şeyler yaratır,
- `"check…"` -- bir şeyleri kontrol eder ve boolean döndürür.

Böyle isimlere örnek:

Not: İngilizce'de bu daha kolay önce eylemi yazıyorlar. Türkçe'de fiil genelde sonda olduğundan dolayı sıkıntı yaşanmaktadır. Fonksiyonlarınızı adlandırırken İngilizce adlandırırsanız okunması daha kolay olacaktır.

```js no-beautify
sendMessage(..)     // mesaj gönderir
getAge(..)          // yaşı döndürür
calcSum(..)         // toplamı hesaplar ve geri döndürür.
createForm(..)      // form oluşturur ve genelde geri döndürür.
checkPermission(..) // izni kontor eder. true/false
```
Ön ek ile fonksiyonlar bir anlamda ipucu verir ve ne tür değerler dönmesi gerektiğini anlatır.

```smart header="Bir fonksiyon -- bir eylem"
Bir fonksiyon sadece isminin tanımladığı işi yapmalı.

İki birbirinden farklı eylem çoğu zaman iki fonksiyon ile yazılmalıdır, birlikte çağrılsalar bile ( bu durumda 3. bir fonksiyon bunları çağırmalıdır )

Bu kurallar şu şekilde bozulabilir:

- `getAge` -- Eğer bu fonksiyon içeride `alert` ile yaş gösteriyor ise yanlış olur. Bu fonksiyonun sadece yaşı alıp döndürmesi gerekmekte.
- `createForm` -- Eğer dökümanı değiştiriyorsa veya forma bir şey ekliyorsa yanlış olur. ( Sadece formu yaratmalı ve geri dönmelidir )
- `checkPermission` -- Eğer `izin verildi/reddedildi` gibi mesajları bu fonksiyon gösterirse yanlış olur. Sadece kontrol etmeli ve geri dönmelidir.

Bu örnekler genel olarak öneklerin nasıl tahmin edilmesi gerektiğini gösterir. Bunların ne anlama geleceği siz ve takımınıza kalmıştır. Belki sizin kodunuz için farklı bir şekilde davranması gayet doğal olabilir. Fakat yine de ön eklere ait bir anlamlandırmanız olmalıdır. Ön ek ne yapabilir ne yapamaz vs. Tüm aynı önekli fonksiyonlar sizin koyduğunuz kurala uymalı ve tüm takım bu kuralları biliyor olmalıdır.
```

```smart header="Aşırı derecede kısa fonksiyon isimleri"

Çokça kullanılan fonksiyonlar genelde aşırı derece kısa isimlere sahip olurlar.

Örneğin, [jQuery](http://jquery.com) kütüphanesi `$` fonksiyonu ile tanımlanır.  [LoDash](http://lodash.com/) kütüphanesi de keza kendine has fonksiyon `_` kullanır.

Bunlar istisnadır. Genel olarak fonksiyon isimleri kısa ve açıklayıcı olmalıdır.
```

## Fonksiyonlar == Yorumlar

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md
Fonksiyonlar kısa olmalı ve sadece bir şeyi yapmalıdırlar. Eğer uzun ise bu durumda ayırıp yeni bir fonksiyon yapmanız daha iyi olabilir. Bazen bu kuralı takip etmek zor olabilir. Fakat kesinlikle iyi bir şeydir.

Farklı fonksiyon daha kolay bir şekilde çalışması kontrol edilebilir. Varlığı harika bir yorumdur.
=======
For example, the [jQuery](https://jquery.com/) framework defines a function with `$`. The [Lodash](https://lodash.com/) library has its core function named `_`.

These are exceptions. Generally function names should be concise and descriptive.
```
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/15-function-basics/article.md

Örneğin, aşağıdaki iki `asalGoster(n)` fonksiyonunu karşılaştırın. [Asal Sayı](https://tr.wikipedia.org/wiki/Asal_say%C4%B1)

İlk tanım label kullanıyor:

```js
function asalGoster(n) {
  sonrakiAsal: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue sonrakiAsal;
    }

    alert( i ); // asal sayı
  }
}
```
İkinci tip ise `asalMi(n)` adında ikinci bir fonksiyon ile asal olup olmama durumunu kontrol ediyor.

```js
function asalGoster(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!asalMi(i)) continue;*/!*

    alert(i);  // asal sayı
  }
}

function asalMi(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```
İkinci örnek anlaşılması daha kolay değil mi? `asalMi` gibi fonksiyon isimleri yerine bazıları buna *kendi kendini açıklayan* demektedir.

Fonksiyonlar eğer tekrar kullanmayacağımızı bilsek bile oluşturulabilir. Kodu daha okunabilir yaparlar.

## Özet

Bir fonksiyonun tanımı aşağıdaki gibidir.
```js
function fonksiyon ismi(parametreler, virgül , ile, ayrilirlar) {
  /* code */
}
```

- Fonksiyona paslanan parametreler yerel değişken olarak fonksiyon içerisinde kopyalanırlar.
- Fonksiyon dışarıdaki değişkene erişebilir. Fakat içeride yaratılmış bir değişken dışarıda kullanılamaz.
- Fonksiyon değer döndürebilir. Eğer döndürmezse `undefined`olarak tanımlanır.

Kodun daha anlaşılır ve okunabilir olması için, fonksiyonlar içerisinde yerel değişken kullanılması önerilir. Dış değişkenler kullanılması önerilmez.

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md
Eğer fonksiyon parametre ile değer alır ve bu değer üzerinde çalışıp değer geri döndürürse anlaşılırlığı artar. Fakat eğer fonksiyon hiçbir parametre almadan sadece dışarıdaki değişkenleri değiştiriyor ise kodun anlaşılırlığı büyük ölçüde azalır.
=======
It is always easier to understand a function which gets parameters, works with them and returns a result than a function which gets no parameters, but modifies outer variables as a side effect.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/15-function-basics/article.md

Fonksiyon isimlendirme:

- Bir isim fonksiyonun ne işe yaradığını açıklayabiliyor olmalıdır. İyi bir isim fonksiyonun okunmadan ne iş yaptığına dair fikir verir.
- Fonksiyon bir fiili yerine getirdiğinden, fonksiyon isimleri yüklem olmalıdır.
- Bunlar için ön ek kullanabilirsiniz. Türkçe sondan eklemeli bir dil olduğundan dolayı fonksiyon ekleri sona gelmektedir. Örneğin `asalGoster`, bu tip kullanım aslında okunurluk açısından pekte iyi değil benim kanaatimce. Çünkü okurken önce ne yaptığını anlaşılmıyor. Fakat İngilizce örneğine bakarsanız `showPrime`, burada önce ne yaptığını söylüyor. Farzedin ki birçok fonksiyonunuz var ve okuduğunuzda önce ne iş yaptığını bilmek bunları filtrelemenizde size yardımcı olacaktır.
- Örnek kaç tane ek , `create...` , `show...`, `get...`, `check...` vs.

Fonksiyonlar kod yazarken kullanılan ana yapılardır. Artık temellerini anlaşıldığına göre kullanılmaya başlanabilir. Fakat sadece temellerinin gösterildiğini bilmekte fayda var. İleride defalarca fonksiyonlar konusuna geri dönülecektir.
