# Fonksiyonlar

Çoğu zaman kod yazarken belirli bölümleri tekrarlama ihtiyacı duyulur.

Örneğin kullanıcı hesabına giriş yaptığında veya çıktığında güzel görünümlü bir mesaj göstermek istenebilir.

Fonksiyonlar programın "yapı taşıdır". Bir çok defa bu fonksiyonlar çağırılarak tekrardan bu kodları yazmaktan kurtulunur.

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
`function` kelimesi önce yazılır, ardından *fonksiyonun adı* ve sonra parametlerin yazılacağı parantez açılır ve ihtiyaç duyulan parametreler yazılır, sonrasında ise kapatılıp süslü parantez ile *fonksiyon gövdesi*ne başlanır.
=======
The `function` keyword goes first, then goes the *name of the function*, then a list of *parameters* between the parentheses (comma-separated, empty in the example above) and finally the code of the function, also named "the function body", between curly braces.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3:1-js/02-first-steps/15-function-basics/article.md

```js
function name(parameters) {
  ...body...
}
```

Yeni fonksyion ismiyle şu şekilde çağırılır: `mesaGoster()`.

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

`mesajGoster()` fonksiyonu kodu çalıştırır. Bu kod sonrasında `Merhaba millet` uyarsını iki defa göreceksiniz.

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

Genelde fonksiyonlar yapacakları işe ait tüm değişkenleri tanımlarlara, global değişkenler ise sadece proje seviyesinde bilgi tutarlar, çünkü proje seviyesinde bilgilerin projenin her yerinden erişilebilir olması oldukça önemlidir. Modern kodda az veya hiç global değer olmaz. Çoğu fonksiyona ait değişkenlerdir.

```

## Parametreler
Paramterelere isteğe bağlı olarak veri paslanabilir. Bunlara *fonksiyon argümanları* da denir.

Aşağıdaki fonksiyon iki tane parametreye sahiptir. `gonderen` ve `metin`

```js run
function mesajGoster(*!*gonderen, metin*/!*) { // argümanlar: gonderen, metin
  alert(gonderen + ': ' + metin);
}

*!*
mesajGoster('Ahmet', 'Merhaba!'); // Ahmet: Merhaba! (*)
mesajGoster('Mehmet', "Naber?"); // Mehmet: Naber? (**)
*/!*
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

### Varsayılan Değerler

Eğer fonksiyon argümanına bir değer gönderilmemişse fonksiyon içerisinde bu değişken `undefined` olur.

Örneğin `mesajGoster(gonderen,metin)` fonksiyonu tek argüman ile de çağırılabilir.

```js
mesajGoster("Mahmut");
```
Bu bir hata değildir. Fonksiyon eğer bu şekilde çağırılırsa, yani `metin` yoksa, `metin == undefined` varsayılır. Yukarıdaki fonksiyon çağırıldığında sonuç "Mahmut: undefined" olacaktır.

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md
Eğer "varsayılan" olarak `metin` değeri atamak istiyorsanız, `=` işareti ile tanımlamanız gerekmekte.
=======
That's not an error. Such a call would output `"*Ann*: undefined"`. There's no `text`, so it's assumed that `text === undefined`.

If we want to use a "default" `text` in this case, then we can specify it after `=`:
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3:1-js/02-first-steps/15-function-basics/article.md

```js run
function mesajGoster(gonderen, *!*metin = "metin gönderilmedi"*/!*) {
  alert(gonderen + ": " + metin );
}

mesajGoster("Mahmut"); // Mahmut: metin gönderilmedi
```
Eğer `metin` değeri paslanmazsa, `"metin gönderilmedi"` çıktısı alınır.

`"metin gönderilmedi"` şu anda karakter dizisidir. Fakat daha karmaşık yapılar olabilir. Sadece parametre gönderilmez ise bu değer atanır. Aşağıdaki kullanım da pekala doğrudur.

```js run
function mesajGoster(gonderen, metin = digerFonksiyon()) {
  // eğer metin gönderilmez ise digerFonksiyon çalışır ve sonucu "metin" değişkenine atanır.
}
```

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md

````smart header="Eski tip varsayılan parametreler"
Eski tip JavaScript varsayılan parametreleri desteklememekteydi. Bundan dolayı farklı yöntemler geliştirdi. Eğer eskiden yazılmış kodları okursanız bu kodlara rastlayabilirsiniz.

Örneğin doğrudan  `undefined` kontrolü:
```js
function mesajGoster(gonderen, metin) {
*!*
  if (metin === undefined) {
    text = 'metin gönderilmedi';
  }
*/!*

  alert( gonderen + ": " + metin );
=======
```smart header="Evaluation of default parameters"
In JavaScript, a default parameter is evaluated every time the function is called without the respective parameter.

In the example above, `anotherFunction()` is called every time `showMessage()` is called without the `text` parameter.
```

### Alternative default parameters

Sometimes it makes sense to set default values for parameters not in the function declaration, but at a later stage, during its execution.

To check for an omitted parameter, we can compare it with `undefined`:

```js run
function showMessage(text) {
*!*
  if (text === undefined) {
    text = 'empty message';
  }
*/!*

  alert(text);
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3:1-js/02-first-steps/15-function-basics/article.md
}

showMessage(); // empty message
```
...Veya `||` operatörü:

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md

```js
function mesajGoster(gonderen, metin) {
  // eğer metin yanlış değer ise( bu durumda undefined yanlış değerdir hatırlarsanız ) 'metin gönderilmedi' ata.
  text = text || 'metin gönderilmedi';
=======
...Or we could use the `||` operator:

```js
// if text parameter is omitted or "" is passed, set it to 'empty'
function showMessage(text) {
  text = text || 'empty';
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3:1-js/02-first-steps/15-function-basics/article.md
  ...
}
```

Modern JavaScript engines support the [nullish coalescing operator](info:nullish-coalescing-operator) `??`, it's better when falsy values, such as `0`, are considered regular:

```js run
// if there's no "count" parameter, show "unknown"
function showCount(count) {
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown
```

## Değer dönderme

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
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3:1-js/02-first-steps/15-function-basics/article.md
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
`return` değer döndermek zorunda değildir. Bu fonksiyondan anında çıkmayı sağlar.

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
Yukarıdaki kodda  eğer `yasKontrolu(yas)` `false` dönderir ise  `filmGoster` fonksiyonu `alert`e erişemeyecektir.

````smart header="boş veya birşey döndermeyen fonksiyon `undefined` dönderir"
Eğer bir fonksiyon değer döndermiyor ise bu fonksiyon `undefined` dönderiyor ile aynı anlama gelir.


```js run
function biseyYapma() { /* boş */ }

alert( biseyYapma() === undefined ); // true
```

Boş dönderen `return`, `return undefined` ile aynıdır.

```js run
function biseyYapma() {
  return;
}

alert( biseyYapma() === undefined ); // true
```
````

````warn header="`return` ve `değer` arasına hiç bir zaman satır eklemeyin"

Uzun `return` ifadelerinde, yeni bir satırda yazmak size kullanışlı gelebilir, örneğin aşağıdaki gibi:

```js
return
 (bazı + uzun + ifade + veya + baska + birsey  * f(a) + f(b))
```
Bu çalışmaz, çünkü JavaScript `return` kelimesinden sonra `;` varsayara ve `undefined` döner. Bu aşağoıdaki ifade ile aynıdır:

```js
return*!*;*/!*
  (bazı + uzun + ifade + veya + baska + birsey  * f(a) + f(b))
```
<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md
Bundan dolayı, tam olarak boş return olur. Geri döndereceğimiz değer ile return aynı satırda olmalıdır.

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
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3:1-js/02-first-steps/15-function-basics/article.md
````

## Fonksiyonu isimlendirme [#fonksiyon-isimlendirme]

Fonksiyonlar eylemdir. Bundan dolayı isimleri yüklem olmalıdır. Net olmalı ve fonksiyonun ne işe yaradığını ifade edebilmelidir. Böylece kim ki kodu okur, ne yazıldığınına dair bir fikri olur.

Genel itibari ile eylemi tanımlayan önek kullanmak iyi bir yöntemdir. Bu önekler ile ilgili birlikte kod yazdığınız kişiler ile uyum içerisinde olmalısınız. 

Örneğin `"show"` fonksiyonu her zaman birşeyleri `gösterir`.

Fonksiyonlar şöyle başlayabilir.

- `"get…"` -- değer dönderir,
- `"calc…"` -- birşeyler hesaplar,
- `"create…"` -- birşeyler yaratır,
- `"check…"` -- birşeyleri kontrol eder ve boolean dönderir.

Böyle isimlere örnek:

Not: ingilizce de bu daha kolay önce eylemi yazıyorlar. Türkçe de fiil genelde sonda olduğundan dolayı sıkıntı yaşanmaktadır. Fonksiyonlarınızı adlandırırken ingilizce adlandırırsanız okunması daha kolay olacaktır.

```js no-beautify
sendMessage(..)     // mesaj gösterir
getAge(..)          // yaşı dönderir
calcSum(..)         // toplamı hesaplar ve geri dönderir.
createForm(..)      // form oluşturur ve genelde geri dönderir.
checkPermission(..) // izni kontor eder. true/false
```
Önek ile fonksiyonlar bir anlamda ipucu verir ve ne tür değerler dönmesi gerektiğini anlatır.

```smart header="Bir fonksiyon -- bir eylem"
Bir fonksiyon sadece isminin tanımladığı işi yapmalı.

İki birbirinden farklı eylem çoğu zaman iki fonksiyon ile yazılmalıdır, birlikte çağılsalar bile ( bu durumda 3. bir fonksiyon bunları çağırmalıdır )

Bu kurallar şu şekilde bozulabilir:

- `getAge` -- Eğer bu fonksiyon içeride `alert` ile yaş gösteriyor ise yanlış olur. Bu fonksiyonun sadece yaşı alıp döndermesi gerekmekte.
- `createForm` -- Eğer dökümanı değiştiriyorsa veya forma birşey ekliyorsa yanlış olur. ( Sadece formu yaratmalı ve geri dönmelidir )
- `checkPermission` -- Eğer `izin verildi/reddedildi` gibi mesajları bu fonksiyon gösterirse yanlış olur. Sadece kontrol etmeli ve geri dönmelidir.

Bu örnekler genel olarak öneklerin nasıl tahmin edilmesi gerektiğini gösterir. Bunların ne anlama geleceği siz ve takımınıza kalmıştır. Belki sizin kodunuz için farklı bir şekilde davranması gayet doğal olabilir. Fakat yine de öneklere ait bir anlamlandırmanız olmalıdır. Ön ek ne yapabilir ne yapamaz vs. Tüm aynı önekli fonksiyonlar sizin koyduğunuz kurala uymalı ve tüm takım bu kuralları biliyor olmalıdır.
```

```smart header="Aşırı derecede kısa fonksiyon isimleri"

Çokça kullanılan fonksiyonlar genelde aşırı derece kısa isimlere sahip olurlar. 

Örneğin, [jQuery](http://jquery.com) kütüphanesi `$` fonksiyonu ile tanımlanır.  [LoDash](http://lodash.com/) kütüphanesi de keza kendine has fonksiyon `_` kullanır.

Bunlar istisnadır. Genel olarak fonksiyon isimleri kısa ve açıklayıcı olmalıdır.
```

## Fonksiyonlar == Yorumlar

Fonksiyonlar kısa olmalı ve sadece birşeyi yapmalıdırlar. Eğer uzun ise bu durumda ayırıp yeni bir fonksiyon yapmanız daha iyi olabilir. Bazen bu kuralı takip etmek zor olabilir. Fakat kesinlikle iyi birşeydir.

Farklı fonksiyon daha kolay bir şekilde çalışması kontrol edilebilir. Varlığı harika bir yorumdur.

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

## Summary

Bir fonksiyonun tanımı aşağıdaki gibidir.
```js
function fonksiyon ismi(parametreler, virgül , ile, ayrilirlar) {
  /* code */
}
```

- Fonksiyona paslanan parametreler yerel değişken olarak fonksiyon içerisinde kopyalanırlar.
- Fonksiyon dışarıdaki değişkene erişebilir. Fakat içeride yaratılmış bir değişken dışarıda kullanılamaz.
- Fonksiyon değer dönderebilir. Eğer döndermezse `undefined`olarak tanımlanır.

Kodun daha anlaşılır ve okunabilir olması için, fonksiyonlar içerisinde yerel değişken kullanılması önerilir. Dış değişkenler kullanılması önerilmez.

Eğer fonksiyon parametre ile değer alır ve bu değer üzerinde çalışıp değer geri dönderirse anlaşılırlığı artar. Fakat eğer fonksiyon hiç bir parametre almadan sadece dışarıdaki değişkenleri değiştiriyor ise kodun anlaşılırlığı büyük ölçüde azalır.

Fonksiyon isimlendirme:

- Bir isim fonksiyonun ne işe yaradığını açıklayabiliyor olmalıdır. İyi bir isim fonksiyonun okunmadan ne iş yaptığına dair fikir verir.
- Fonksiyon bir fiili yerine getirdiğinden, fonksiyon isimleri yüklem olmalıdır.
- Bunlar için ön ek kullanabilirsiniz. Türkçe sondan eklemeli bir dil olduğundan dolayı fonksiyon ekleri sona gelmektedir. Örneğin `asalGoster`, bu tip kullanım aslında okunurluk açısından pekte iyi değil benim kanaatimce. Çünkü okurken önce ne yaptığını anlaşılmıyor. Fakat İngilizce örneğine bakarsanız `showPrime`, burada önce ne yaptığını söylüyor. Farzedin ki bir çok fonksiyonunuz var ve okuduğunuzda önce ne iş yaptığını bilmek bunları filtrelemenizde size yardımcı olacaktır.
- Örnek kaç tane ek , `create...` , `show...`, `get...`, `check...` vs.

Fonksiyonlar kod yazarken kullanılan ana yapılardır. Artık temellerini anlaşıldığına göre kullanılmaya başlanabilir. Fakat sadece temellerinin gösterildiğini bilmekte fayda var. ileride defalaraca fonksiyonlar konusuna geri dönülecektir.
