# Değişkenler

Çoğu zaman JavaScript uygulamaları bilgi ile çalışır. Örnek vermek gerekirse:
1. Online Mağaza -- satılacak ürün bilgileri.
2. Sohbet Uygulaması -- Kullanıcı ve mesaj bilgisi.

Değişkenler bu bilgileri tutmak için kullanılırlar.

## Değişken

[Değişken](https://tr.wikipedia.org/wiki/De%C4%9Fi%C5%9Fken)  "isimlendirilmiş hafıza" olarak adlandırılır. Değişkenler ile kullanıcıları, ürünleri ve diğer tipteki bilgileri tutabiliriz.  

JavaScript dilinde değişken `let` kelimesiyle üretilir.

Aşağıdaki cümle "mesaj" isminde bir değişken üretir (diğer bir deyişle *tanımlar*):

<<<<<<< HEAD
=======
The statement below creates (in other words: *declares*) a variable with the name "message":
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
let mesaj;
```
Artık bunun içerisine bilgi koyulabilir. Bunu atama operatörü ile `=` yapabilirsiniz.

```js
let mesaj;

*!*
<<<<<<< HEAD
mesaj = 'Merhaba'; // Merhaba karakter dizisini mesaja atadınız
=======
message = 'Hello'; // store the string 'Hello' in the variable named message
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
*/!*
```

Artık karakter dizi değişken ile ilintili olan hafıza bölgesine kaydedildi. Artık değişken ismi kullanarak bu değere erişilebilir.

```js run
let mesaj;
mesaj = 'Hello!';

*!*
alert(mesaj); // değişkenin içeriğini gösterir.
*/!*
```
Daha açıklayıcı olması açısından değişkeni aynı anda tanımlayıp değer atayabilirsiniz.

```js run
let mesaj = 'Merhaba!'; // Değişken tanımlandı ve değer atandı

alert(mesaj); // Merhaba!
```
Birden fazla değişkeni bir satırda tanımlamak da mümkündür.

```js no-beautify
let kullanici = 'Ahmet', yas = 25, mesaj = 'Merhaba';
```

Kısa görünse bile yukarıdaki yazım önerilmez. Okunabilirlik açısından her değişkenin bir ayrı bir satırda yazılması daha iyi olacaktır.

Tabi her değişken için ayrı satır kullanırsanız biraz uzun olur fakat okunması açısından daha kolaydır.

```js
let kullanici = 'Ahmet';
let yas = 25;
let mesaj = 'Merhaba';
```

<<<<<<< HEAD
Bazı programcılar ise şu şekilde kullanmaktadırlar:
=======
Some people also define multiple variables in this multiline style:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js no-beautify
let kullanici = 'Ahmet',
  age = 25,
  mesaj = 'Merhaba';
```

Hatta bazıları şu şekilde kullanır:

```js no-beautify
let kullanici = 'Ahmet'
  , yas = 25
  , mesaj = 'Merhaba';
```

Teknik olarak bu yazımların hepsi doğrudur. Gerisi sizin yazım tarzınıza kalmış. Her yiğidin yoğurt yiyişi farklıdır.

<<<<<<< HEAD
````smart header=" `let` yerine `var` kullanma"
Eski kodlarda `let` yerine `var` kullanıldığını görürsünüz.

=======
````smart header="`var` instead of `let`"
In older scripts, you may also find another keyword: `var` instead of `let`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
*!*var*/!* mesaj = 'Merhaba';
```
`var` kelimesi *neredeyse* `let` ile aynı anlama gelmektedir. `var` kelimesi de değişken üretmeye yarar fakat bunu eski tarzda yapar.

<<<<<<< HEAD
`let` ile `var` arasında nüans farkı vardır. İkisi de istediğimizi yerine getirir. Bunun ile ilgili detaylı bilgi <info:var> konusuna gelindiğinde verilecektir.

=======
The `var` keyword is *almost* the same as `let`. It also declares a variable but in a slightly different, "old-school" way.

There are subtle differences between `let` and `var`, but they do not matter to us yet. We'll cover them in detail in the chapter <info:var>.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
````

## Gerçek hayat ile benzeşim

"Değişken" konsepti "kutu" olarak tanımlanabilir. Her kutunun üzerinde farklı bir etiket yapıştırılmıştır. 

<<<<<<< HEAD
Örneğin `mesaj` değişkeni üzerinde `"mesaj"` yazısı olan ve değeri `"Merhaba!"` olan bir kutu olarak hayal edilebilir.
=======
For instance, the variable `message` can be imagined as a box labelled `"message"` with the value `"Hello!"` in it:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

![](variable.svg)

Kutuya istediğiniz değeri koyabilirsiniz. Ayrıca içerisindeki değeri istediğiniz kadar değiştirebilirsiniz.

<<<<<<< HEAD
=======
We can also change it as many times as we want:

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```js run
let mesaj;

mesaj = 'Merhaba!';

mesaj = 'Dünya!'; // değer değişti

alert(mesaj);
```
Değer değiştiğinde, değişkenin eski değeri silinir.

![](variable-change.svg)

<<<<<<< HEAD
Ayrıca iki değişken tanımlayıp içerilerindeki değerleri bir diğerine aktarabilirsiniz.
=======
![](variable-change.svg)
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3


```js run
let merhaba = 'Merhaba Dünya!';

let mesaj;

*!*
// merhaba değişkeninin içeriğini mesaj değişkenine aktarın
mesaj = merhaba;
*/!*

// artık iki değişken de aynı değeri taşır.
alert(merhaba); // Merhaba Dünya!
alert(mesaj); // Merhaba Dünya!
```

<<<<<<< HEAD
```smart header="Fonksiyonel Diller"
=======
````warn header="Declaring twice triggers an error"
A variable should be declared only once.

A repeated declaration of the same variable is an error:

```js run
let message = "This";

// repeated 'let' leads to an error
let message = "That"; // SyntaxError: 'message' has already been declared
```
So, we should declare a variable once and then refer to it without `let`.
````

```smart header="Functional languages"
It's interesting to note that there exist so-called [pure functional](https://en.wikipedia.org/wiki/Purely_functional_programming) programming languages, such as [Haskell](https://en.wikipedia.org/wiki/Haskell), that forbid changing variable values.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

İlginç bir bilgi olarak [Scala](http://www.scala-lang.org/) veya [Erlang](http://www.erlang.org/) gibi [fonksiyonel](https://tr.wikipedia.org/wiki/Fonksiyonel_programlama) diller değişkenin değerinin değiştirilmesine izin vermez.

<<<<<<< HEAD
Böyle dillerde değer bir kutunun içerisinde sonsuza kadar saklanır. Eğer farklı bir değer kaydetmek istenirse bu diller bizi yeni bir kutu oluşturmaya iter. Eskisi yeniden kullanıp değeri değiştirilemez.

İlk başta biraz garip gelse de, bu diller genel olarak ciddi işlerin yapılabildiği dillerdir. Değişkenlerin tekrar atanamaması  kodların paralel bir şekilde çalışmasında oldukça etkin öneme sahiptir. Bu diller üzerine çalışmanız programlamaya farklı açılardan bakmanızı sağlar.
=======
Though it may seem a little odd at first sight, these languages are quite capable of serious development. More than that, there are areas like parallel computations where this limitation confers certain benefits.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Değişken isimlendirme [#degisken-isimlendirme]

JavaScript dilinde değişken oluştururken iki sınırlama vardır.

1. Değişken ismi sadece harfler, rakamlar, `$` ve `_` karakterlerinden oluşabilir.
2. İlk karakter rakam olamaz.

Geçerli birkaç örnek şu şekildedir:

```js
let kullaniciAdi;
let test123;
```

Eğer isim birden fazla kelime kullanıyorsa [deveHörgücü veya camelCase](https://en.wikipedia.org/wiki/CamelCase)  küçük harfle başlanıp her kelimenin baş harfi büyük olacak şekilde devam etme yöntemine deveHörgücü yöntemi denir. Bu yöntem yaygın bir şekilde kullanılır. Örneğin : benimUzunDegiskenim gibi. 

`'$'` işareti ve `'_'` işareti de isimlerde harf gibi kullanılabilir. Farklı bir anlamı yoktur.

Aşağıdaki isimlendirmeler geçerlidir:

```js run untrusted
let $ = 1; //  "$" adında bir değişken üret ve değerini 1 yap.
let _ = 2; // "_" adında bir değişken üret ve değerini 2 yap.

alert($ + _); // 3
```

Geçersiz isimlendirmeler:

```js no-beautify
let 1a; // Rakam ile başlanılmaz.

let my-name; // isimlendirmede '-' karakteri kullanılamaz.
```

<<<<<<< HEAD
```smart header="Büyük küçük fark önemli"

`elma` ve `Elma` iki farklı değişken tanımlar. Bu değişkenler birbirlerinden farklıdır.
```

````smart header="İngilizce harici harfler geçerlidir fakat önerilmez."
Herhangi bir dili kullanmak mümkündür. Hatta aşağıdaki gibi resim yazısı bile kullanabilirsiniz:
=======
```smart header="Case matters"
Variables named `apple` and `APPLE` are two different variables.
```

````smart header="Non-Latin letters are allowed, but not recommended"
It is possible to use any language, including Cyrillic letters, Chinese logograms and so on, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
let имя = '...';
let 我 = '...';
```
<<<<<<< HEAD
Teknik olarak bir hata olmamasına ve bu şekilde kullanıma izin verilesine rağmen genel olarak uluslararası gelenek olarak değişkenler İngilizce isimlendirilirler. En basit bir kod parçasının bile önünde uzun bir hayat olabilir. Diğer ülkedeki insanların bu kodları okuması gerekebilir.
=======

Technically, there is no error here. Such names are allowed, but there is an international convention to use English in variable names. Even if we're writing a small script, it may have a long life ahead. People from other countries may need to read it sometime.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
````

````warn header="Saklı tutulan isimler"
Değişken olarak kullanılamayacak dilin kendisine saklı tuttuğu isimler mevcuttur.

Örneğin : `let`, `class`, `return`, `function` gibi kelimeleri değişken ismi olarak adlandıramazsınız.

Aşağıdaki örnek yazım yanlışı (syntax error) verecektir:

```js run no-beautify
let let = 5; // değişken ismi "let" verilemez, hata!
let return = 5; // değişken ismi return verilemez, hata!
```
````

````warn header="`use strict` kullanmadan değer atama"

Normalde değişkeni kullanmak için önce tanımlamanız gerekmektedir. Fakat eski zamanlarda tanımlamadan da , `let` kullanmadan da , değer atamak mümkündü. Eğer `use strict` kullanmıyorsanız hâlâ eskisi gibi kullanabilirsiniz. Bu davranış eski kodlarla uyumluluk açısından olduğu gibi bırakılmıştır.


```js run no-strict
// not: bu örnekte "use strict" kullanılmamıştır

num = 5; // eğer "num" değişkeni daha önce yaratılmadıysa yaratılır ve 5 değeri atanır.

alert(num); // 5
```
Bu kötü bir kullanımdır. Eğer sıkı moda geçerseniz hata alırsınız.


```js run untrusted
"use strict";

*!*
num = 5; // error: num tanımlanmadı.
*/!*
```

````
## Sabitler

Sabit(değişmeyen) tanımlamak için `let` yerine `const` kullanabilirsiniz.

```js
const benimDogumGunum = '18.04.1982';
```

<<<<<<< HEAD
`const` ile tanımlanan değişkenler "constants" (Sabit) olarak tanımlanır. Bunlar değiştirilemezler, değiştirilmek istendiğinde hata alınır:

=======
Variables declared using `const` are called "constants". They cannot be reassigned. An attempt to do so would cause an error:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
const benimDogumGunum = '18.04.1982';

benimDogumGunum = '01.01.2001'; // hata, sabit'in değeri değiştirilemez!
```
<<<<<<< HEAD
Programcı değişkenin değerinin değişmeyeceğine eminse `const` bunu garantiler. Ayrıca bu kodu kullanan herkese bunun garantilendiğini bildirmiş olur.

=======

When a programmer is sure that a variable will never change, they can declare it with `const` to guarantee and communicate that fact to everyone.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

### Sabitlerin Büyük Harf İle İsimlendirilmesi

<<<<<<< HEAD
Genel kullanımda sabitler büyük harf ile isimlendirilirler. Eğer birden fazla kelimeden oluşuyorsa "_" ile bu kelimeleri ayırmak mümkündür.
=======
There is a widespread practice to use constants as aliases for difficult-to-remember values that are known before execution.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3


Örneğin:

```js run
const RENK_KIRMIZI = "#F00";
const RENK_YESIL = "#0F0";
const RENK_MAVI = "#00F";
const RENK_TURUNCU = "#FF7F00";

// ...Resim seçmek istediğimizde
let renk = RENK_TURUNCU;
alert(renk); // #FF7F00
```

Yararları:

- `RENK_TURUNCU` `"#FF7F00"` a göre hatırlanması daha kolaydır.
- `"#FF7F00"` yazarken yanlış yazma olasılığı `RENK_TURUNCU`'ya göre yüksektir.
- Kodu okurken `RENK_TURUNCU` `#FF7F00`'dan daha fazla anlam ifade eder.

Sabitler için ne zaman büyük harf kullanılmalı ne zaman kullanılmamalı ? 

<<<<<<< HEAD
"Sabit" değeri hiç değişmeyen demek. Fakat bazı değişkenler örneğin kırmızının hexadecimal karşılığı çalışmadan önce bilinirken bazıları çalışma zamanında hesaplanır fakat sonrasında değişmez.

Örneğin
=======
Being a "constant" just means that a variable's value never changes. But some constants are known before execution (like a hexadecimal value for red) and some constants are *calculated* in run-time, during the execution, but do not change after their initial assignment.

For instance:

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```js
const sayfaYuklenmeSuresi = /* Sayfanın yüklenme süresini tutar. */;
```

<<<<<<< HEAD
`sayfaYuklenmeSuresi` çalışmadan önce değeri bilinmeyen bir değerdir. Bundan dolayı normal isimlendirme kullanılır. Çalıştıktan sonra sadece bir defa tanımlanıp daha da değişmeyen bir değer olduğundan hâlâ "sabit" denilebilir.

Diğer bir deyişle büyük harfle yazılan değişken isimleri sadece önceden bilinen değerleri tanımlamak için kullanılır.
=======
The value of `pageLoadTime` is not known before the page load, so it's named normally. But it's still a constant because it doesn't change after the assignment.

In other words, capital-named constants are only used as aliases for "hard-coded" values.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## İsimlendirmeyi doğru yapmak

İsimlendirmeden konuşuyorsak düzgün isimlendirmeyi atlamamak gereklidir. Aslında en önemli konu da budur.
Eğer değişken için isim bulamıyorsanız lütfen biraz daha düşünüp mantıklı bir isim bulun.

<<<<<<< HEAD
Proje daha karmaşıklaştıkça isimlendirmenin önemi daha da anlaşılır. Değişken isimlerine göre kodun yeni kodlamaya başlayan birisi tarafından mı yoksa tecrübeli birisi tarafından mı yazıldığını anlaşılabilir.

Çoğu projede zaman var olan kodların değiştirilmesi, bu kodlardan yeni fonksiyonlar yapılması üzerinedir. Yeni bir şey yapılacağında çoğunlukla eskisinin üzerine yapılır. Eski kodlara baktığınızda değişkenlere bakarak konuyu anlamak daha kolay olacaktır. 

Lütfen değişkenleri isimlendirirken iyice düşünün sonrasında çok işinize yarayacak.
=======
A variable name should have a clean, obvious meaning, describing the data that it stores.

Variable naming is one of the most important and complex skills in programming. A glance at variable names can reveal which code was written by a beginner versus an experienced developer.

In a real project, most of the time is spent modifying and extending an existing code base rather than writing something completely separate from scratch. When we return to some code after doing something else for a while, it's much easier to find information that is well-labelled. Or, in other words, when the variables have good names.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Birkaç kural şu şekildedir:

- İnsan-okuyabilir değişken ismi verin `kullaniciAdi` veya `alisverisSepeti` gibi.
- `a`, `b`, `c` gibi kısaltmaları kullanmayın. Tabi ne yaptığınızı kesin olarak biliyorsanız kullanabilirsiniz.

<<<<<<< HEAD
- İsimlerin açıklayıcı olmasına önem verin. Örneğin `veri` ve `deger` adindaki değişkenler bir şey ifade etmezler. Tabi eğer kod bloğunda bunların bir anlamı var ise kullanılabilir.
- Bazı tanımları kafanızda takımınızın kullandığı şekil ile uyumlu şekilde oturtun. Örneğin siteyi ziyaret eden kişi `kullanici` ise kullanıcı ile olan değişkenleri `anlikKullanici` veya `yeniKullanici` gibi kullanın fakat `yeniZiyaretci` veya `yeniCocuk` gibi kullanmayın.
=======
- Use human-readable names like `userName` or `shoppingCart`.
- Stay away from abbreviations or short names like `a`, `b`, and `c`, unless you know what you're doing.
- Make names maximally descriptive and concise. Examples of bad names are `data` and `value`. Such names say nothing. It's only okay to use them if the context of the code makes it exceptionally obvious which data or value the variable is referencing.
- Agree on terms within your team and in your mind. If a site visitor is called a "user" then we should name related variables `currentUser` or `newUser` instead of `currentVisitor` or `newManInTown`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Basit değil mi? Gerçekten öyle, fakat pratikte bu kadar da basit değil. Umarım bunu siz gerçekleştirirsiniz.

```smart header="Tekrar mı kullanmalı yoksa yeni mi oluşturmalı?"
Son olarak. Bazı miskin programcılar yeniden değişken yaratmaktansa eskisini kullanmayı yeğlerler.

Sonuç olarak değişken bir kutu gibidir üstüne yapıştırdığınız etiketi değiştirmeden içerisine farklı şeyler atılabilir. Fakat sonunda kutunun içinde ne olduğunu anlamak için tekrar tekrar kontrol etmek gerekir.

Böyle programcılar tanımlarken biraz zaman kazanırlar fakat bunun 10 mislini kodu takip etmek için harcarlar.

Fazladan bir değişken düşman değildir.

Modern JavaScript sıkıştırıcılar ve tarayıcılar kodları oldukça iyi optimize etmektedirler. Hatta farklı değerler için farklı değişken isimleri kullanmak JavaScript motorunun optimize etmesine yardımcı bile olabilir.

```

## Özet

Verileri saklamak için değişken tanımlayabilirsiniz. Bu işlemi `var` veya `let` veya `const` ile yapabilirsiniz.

<<<<<<< HEAD
- `let` -- modern değişken tanımlama. Chrome üzerinde `let` ile değişken tanımlamak istiyorsanız sıkı modda (strict mode) çalışmanız gerekmekte.
- `var` -- eski tip değişken tanımlama. Yeni kodlarda çok nadir kullanılır, belki yakında hiç kullanılmayacak. Bu konu ileride `let` ile `var` arasındaki nüans farkı <info:var> bölümünde incelenecek.
- `const` -- bu da `let` gibi fakat değeri değiştirilemez.
=======
- `let` -- is a modern variable declaration.
- `var` -- is an old-school variable declaration. Normally we don't use it at all, but we'll cover subtle differences from `let` in the chapter <info:var>, just in case you need them.
- `const` -- is like `let`, but the value of the variable can't be changed.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Değişkenler bulundukları yerdeki anlamlarına göre isimlendirilmelidirler.
