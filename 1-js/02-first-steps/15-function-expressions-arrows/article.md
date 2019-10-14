# Fonksiyon ifadeleri ve oklar.

JavaScript'te fonksiyonlar "büyülü dil yapısı" değil sadece özel bir tip değerdir.
[cut]

Daha önceden *fonksiyon tanımlama* için aşağıdaki form kullanılmıştı.

```js
function selamVer() {
  alert( "Merhaba" );
}
```

Diğer bir şekilde de fonksiyon tanımlanabilir. Bu da *fonksiyon ifadesi* olarak adlandırılır.

Aşağıdaki gibi görünür:


```js
let selamVer = function() {
  alert( "Merhaba" );
};
```

<<<<<<< HEAD
Burada fonksiyon yaratıldı ve doğrudan değişkene atandı, tıpkı diğer dillerde olduğu gibi. Fonksiyonun nasıl tanımlandığına bakmaksızın, bu fonksiyon sadece `selamVer` içinde saklanan bir değerdir.

Yukarıdaki kod örneklerinin anlamları aynıdır: "bir fonksiyon yarat ve bunu `selamVer` değişkenine ata"
=======
Here, the function is created and assigned to the variable explicitly, like any other value. No matter how the function is defined, it's just a value stored in the variable `sayHi`.

The meaning of these code samples is the same: "create a function and put it into the variable `sayHi`".
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

Hatta yazdığımız fonksiyonu `alert` ile ekrana basmak da mümkündür.

```js run
function selamVer() {
  alert( "Merhaba" );
}

*!*
alert( selamVer ); // fonksiyonun kodunu gösterir.
*/!*
```

Dikkat ederseniz son kodda `()` bulunmamaktadır. Bundan dolayı `selamVer` fonksiyonu çalışmayacaktır. Bazı dillerde ne zaman fonksiyonun ismini verseniz çalışır fakat JavaScript'te çalışabilmesi için `()` kullanmanız gerekmektedir.

JavaScript'te fonksiyonlar değer olduğundan dolayı bunlarla uğraşılabilir. Yukarıdaki kod ekrana kaynak kodunu basar.

Tabiki `selamVer()` diye çağırılabildiğinden dolayı özel bir değerdir.

<<<<<<< HEAD
Fakat yine de değerdir. Bundan dolayı diğer değerlerle uğraşıldığı gibi bununla da aynı şekilde çalışılabilir.
=======
Surely, a function is a special value, in the sense that we can call it like `sayHi()`.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

Örneğin bir fonksiyon başka bir değişkene kopyalanabilir.


```js run no-beautify
function selamVer() {   // (1) oluştur
  alert( "Merhaba" );
}

let func = selamVer;    // (2) kopyala

func(); // Merhaba     // (3) kopyası!
selamVer(); // Merhaba    //    kendisi.
```

Detayına bakılacak olursa:

<<<<<<< HEAD
1.`(1)` fonksiyon tanımlanır ve `selamVer` değişkenine atanır.
2. `(2)` bunu `func` değişkenine kopyalar.

    Tekrardan hatırlatmak gerekirse: `selamVer` etrafında parantez bulunmamaktadır. Eğer parantez ile yazılacak olsaydı `func = selamVer()`, `selamVer()` fonksiyonunun çıktısı `func` değişkenine atanırdı fonksiyon değil.
=======
1. The Function Declaration `(1)` creates the function and puts it into the variable named `sayHi`.
2. Line `(2)` copies it into the variable `func`. Please note again: there are no parentheses after `sayHi`. If there were, then `func = sayHi()` would write  *the result of the call* `sayHi()` into `func`, not *the function* `sayHi` itself.
3. Now the function can be called as both `sayHi()` and `func()`.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

3. Fonksiyon bundan sonra `selamVer()` ve `func()` şeklinde çağırılabilir.
 
Ayrıca ilk satır için *fonksiyon ifadesi* de kullanılabilirdi:

```js
<<<<<<< HEAD
let selamVer = function() { ... };
=======
let sayHi = function() {
  alert( "Hello" );
};
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

let func = selamVer;
// ...
```

<<<<<<< HEAD
Herşey aynı olduğu gibi çalışırdı. Hatta neyin ne olduğu daha açık değil mi?
=======
Everything would work the same.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac


````smart header="Neden sonunda noktalı virgül var"

Aklınıza bir soru takılabilir. Neden *fonksiyon ifadesi*nin sonunda `;` bulunmakta fakat *fonksiyon tanımla*da kullanılmıyor:

```js
function selamVer() {
  // ...
}

let selamVer = function() {
  // ...
}*!*;*/!*
```

<<<<<<< HEAD

Cevap basit:
- Kod bloklarının sonunda `;` e gerek yoktur. Örneğin `if{ ...}`, `for{ ... }`, `for { }`, `function f{}` vs.
- Fonksiyon ifadesi bir ifade içinde kullanıldığından `let selamVer = ....;` bir değerdir. Kod bloğu değildir. Cümle sonlarında değer ne olursa olsun `;` kullanılması önerilir. Bundan dolayı `;` *fonksiyon ifadesi* ile alaklı değildir. Sadece tanımlamanın sonunu göstermek içindir. Tıpkı diğer tanımlamalarda olduğu gibi.
=======
The answer is simple:
- There's no need for `;` at the end of code blocks and syntax structures that use them like `if { ... }`, `for {  }`, `function f { }` etc.
- A Function Expression is used inside the statement: `let sayHi = ...;`, as a value. It's not a code block, but rather an assignment. The semicolon `;` is recommended at the end of statements, no matter what the value is. So the semicolon here is not related to the Function Expression itself, it just terminates the statement.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac
````

## Geriçağrım Fonksiyonları ( Callback functions )

Fonksiyonların değer olarak paslanması ve fonksiyon ifadelerini biraz daha incelenmesi yerinde olur.

`sor(soru,evet,hayir)` adında 3 parametre alan bir fonksiyon yazılacak olursa:

`soru`
: Soru cümlesi

`evet`
: Eğer doğru ise çalışacak fonksiyon

`hayir`
: Eğer cevap yanlış ise yapılacak fonksiyon

Fonksiyon `soru` sormalı, bu sorunun cevabına göre `evet()` veya `hayir()` fonksiyonları çağırılacaktır.


```js run
*!*
function sor(soru, evet, hayir) {
  if (confirm(soru)) yes()
  else no();
}
*/!*

function tamamGoster() {
  alert( "Kabul ettiniz" );
}

function iptalGoster() {
  alert( "Çalışmasını durdurdunuz" );
}
// kullanım: tamamGoster, iptalGoster fonksiyona parametre olarak gönderilmiştir.
sor("Kabul ediyor musunuz?", tamamGoster, iptalGoster);
```

<<<<<<< HEAD
Daha kısa yolunu yazmadan önce söylemek gerekir ki bu tür fonksiyonlar oldukça sıkça kullanılmaktadır. Gerçek hayattaki örnekleri ile yukarıdaki arasında fark ise gerçek hayatta basit bir `confirm` yerine daha karmaşık olaylar için kullanılıyor olmalarıdır. 

**`sor` fonksiyonunun argümanları *callbacks* veya *geri çağrım fonksiyonları* olarak adlandırılırlar.

Fikir fonksiyonu bizim baştan paslayıp ana fonksiyon içerieinde daha sonra duruma göre çağırılmasından kaynaklanmaktadır. Örneğe bakarsanız `tamamGoster` "evet" cevabı için *geri çağrım fonksiyonu*'dur.
=======
In practice, such functions are quite useful. The major difference between a real-life `ask` and the example above is that real-life functions use more complex ways to interact with the user than a simple `confirm`. In the browser, such function usually draws a nice-looking question window. But that's another story.

**The arguments `showOk` and `showCancel` of `ask` are called *callback functions* or just *callbacks*.**

The idea is that we pass a function and expect it to be "called back" later if necessary. In our case, `showOk` becomes the callback for "yes" answer, and `showCancel` for "no" answer.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

Fonksiyon İfadesi kullanarak aynı fonksiyonu daha kısa bir şekilde yazmak mümkün:

```js run no-beautify
function sor(soru, evet, hayir) {
  if (confirm(soru)) evet()
  else hayir();
}

*!*
ask(
  "Kabul Ediyormusun?",
  function() { alert("Kabul ettin"); },
  function() { alert("Çalışmayı durdurdun."); }
);
*/!*
```
Gördüğünüz gibi yukarıda fonksiyonlar doğrudan `sor(...)` içerisinde tanımlandı. Hiç bir isim kullanılmadığından dolayı. Böyle fonksiyonlara *anonim* veya *anonymous* fonksiyonlar denir. Bu fonksiyonlar `sor` fonksiyonu dışında ulaşılabilir değillerdir(çünkü hiç bir değişkene atanmazlar).

<<<<<<< HEAD
Bu şekilde isimsiz kullanım JavaScript içerisinde çok doğaldır. Bu JavaScript'in ruhunda var diyebiliriz.

=======
Here, functions are declared right inside the `ask(...)` call. They have no name, and so are called *anonymous*. Such functions are not accessible outside of `ask` (because they are not assigned to variables), but that's just what we want here.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

```smart header="Fonksiyon "fiil" bildiren bir değerdir."
Normal değerler örneğin karakter dizisi ve sayılar *veri*dir.
Fonksiyon *fiil* olarak adlandırılabilir.

<<<<<<< HEAD
Değişkenler arasında paylaşılabilir. İstendiği zaman çalıştırılabilir.

```
=======
```smart header="A function is a value representing an \"action\""
Regular values like strings or numbers represent the *data*.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac


## Fonksiyon ifadesi ile Fonksiyon tanımının karışalaştırılması

Eğer Fonksiyon ifades ile fonksiyon tanımı arasındaki önemli farkları açıklamak gerekirse;

Yazım: Kodda neyin ne olduğunu görme.


- *Fonksiyon Tanımlama:* bir fonksiyon ana kod yapısında farklı bir cümle olarak tanımlanır.


    ```js
    // Fonksiyon Tanımlama
    function toplam(a, b) {
      return a + b;
    }
    ```
- *Fonksiyon ifadesi:* bir fonksiyon ifadenin içinde  veya diğer bir yazım yapısı ile ifade edilir.

    Burada fonksiyon "atama ifadesinin =" sağ tarafında tanımlanmıştır.
    ```js
    // Fonksiyon tanımı
    let toplam = function(a, b) {
      return a + b;
    };
    ```

Daha ince bir değişiklik ise fonksiyonun JavaScript motorunda ne zaman yaratılacağıdır.

<<<<<<< HEAD
**Fonksiyon ifadesi kod çalışırken fonksiyona geldikten sonra kullılır**
=======
**A Function Expression is created when the execution reaches it and is usable only from that moment.**
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

Çalışma atamanın sağ tarafaını geçince `let sum = function...`, bu noktadan sonra fonksiyon artık yaratıldı. Bundan böyle çağırılabilir veya başka bir değişkene atanabilir.

Fonksiyon tanımlama ise farklıdır.

<<<<<<< HEAD
**Fonksiyon tanımlama tüm kod bloğu içerisinde kullanılabilir**

Diğer bir deyişle, JavaScript kod bloğunu çalıştırmaya *hazırlandığında*, önce fonksiyon tanımlamalarına bakar ve fonksiyonları yaratır. Bunu bir "başlatma evresi* olarak görmek mümkündür.

Tüm Fonksiyon tanımlamaları tamamlandıktan sonra çalışmaya devam eder.

Sonuç olarak, fonksiyon tanımı ile bu tanımdan önce çağırılabilir.
=======
**A Function Declaration can be called earlier than it is defined.**

For example, a global Function Declaration is visible in the whole script, no matter where it is.

That's due to internal algorithms. When JavaScript prepares to run the script, it first looks for global Function Declarations in it and creates the functions. We can think of it as an "initialization stage".

And after all Function Declarations are processed, the code is executed. So it has access to these functions.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

Örnek verecek olursak:

```js run refresh untrusted
*!*
selamVer("Ahmet"); // Merhaba Ahmet
*/!*

function sayHi(isim) {
  alert( `Merhaba, ${isim}` );
}
```

Fonksiyon Tanımı olan `selamVer` JavaScript'in hazırlanma evresinde tanımlanır. Kod çalıştığında kodun her yerinden bu koda erişmek mümkündür.

Eğer bu bir Fonksiyon tanımı olsaydı, çalışmazdı.

<<<<<<< HEAD
=======
...If it were a Function Expression, then it wouldn't work:
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

```js run refresh untrusted
*!*
selamVer("Ahmet"); // hata!
*/!*

let selamVer = function(adi) {  // (*) büyü ortadan kalktı
  alert( `Merhaba, ${adi}` );
};
```
Fonksiyon tanımı kendisine ulaştığında çalışır. Yani `(*)`'gelmeden tanımlanmış olmalıydı ki `selamVer("Ahmet")` çalışabilsin.

<<<<<<< HEAD
**Fonksiyon tanımı eğer kod bloğunun içerisinde tanımlanırsa o bloğun içerisinde her yerde kullanılabilir. Fakat dışarıda kullanılamaz.**

Bazen sadece blok içinde o blokta kullanılacak yerel bir fonksiyon yaratmak daha kolay gelebilir. Fakat bu özellik problem yaratabilir.
=======
Function Expressions are created when the execution reaches them. That would happen only in the line `(*)`. Too late.

Another special feature of Function Declarations is their block scope.

**In strict mode, when a Function Declaration is within a code block, it's visible everywhere inside that block. But not outside of it.**
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

Örneğin, `hosgeldin()` fonksiyonunu `yas` değişkenine göre tanımlayalım. Böylece sonradan kullanılacak hale getirmiş oluruz.

<<<<<<< HEAD
Aşağıdaki kod çalışmayacaktır:
=======
If we use Function Declaration, it won't work as intended:
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

```js run
let yas = prompt("Kaç yaşındasın?", 18);

// Şarta göre fonksiyon tanımlama
if (yas < 18) {

  function merhaba() {
    alert("Merhaba!");
  }

} else {

  function merhaba() {
    alert("Merhabalar!");
  }

}

// ...sonra kullan...
*!*
merhaba(); // Hata: merhaba() tanımlı değil.
*/!*
```
Burada hata alınmasının nedeni Fonksiyon Tanımının `if..else` bloğu içerisinde tanımlandığından dolayı dışarıdan çağırılamamasından dolayıdır.

Diğer bir örnek:

```js run
let yas = 16; // yaş 16 diyelim.

if (yas < 18) {
*!*
  merhaba();               // \   (çalışır)
*/!*
                           //  |
  function merhaba() {     //  |  
    alert("Merhaba!");     //  |  Fonksiyon tanımı bu blok içirisinde her yerden çağırılabilir.
  }                        //  |  
                           //  |
*!*
  merhaba();               // /   (çalışır)
*/!*

} else {

<<<<<<< HEAD
  function merhaba() {     //  Yaş 16 olduğundan burası hiç bir zaman çalışmaz.
    alert("Merhabalar!");
=======
  function welcome() {    
    alert("Greetings!");
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac
  }
}

// Artık if bloğunun dışında olduğumuzdan dolayı burada fonksiyon tanımlarına ulaşamayız.

*!*
merhaba(); // Error: merhaba tanımlı değil.
*/!*
```
`merhaba` fonksiyonunu `if`in dışında da kullanılabilir kılmak için ne yapılmalıdır?

Doğru yaklaşım Fonksiyon İfadesini kullanarak `if` in dışına bir `merhaba` değişkeni yaratıp `if`in içinde bunun tanımını yapmak olabilir.

<<<<<<< HEAD
Artık beklenildiği gibi çalışır:
=======
This code works as intended:
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

```js run
let yas = prompt("Kaç yaşındasın?", 18);

let merhaba;

if (yas < 18) {

  merhaba = function() {
    alert("Merhaba!");
  };

} else {

  merhaba = function() {
    alert("Merhabalar!");
  };

}

*!*
merhaba(); // artık çalışır.
*/!*
```

Veya `?` ile de bu fonksiyon şu şekilde yazılabilir:

```js run
let yas = prompt("Kaç yaşındasın?", 18);

let merhaba = (yas < 18) ?
  function() { alert("Merhaba!"); } :
  function() { alert("Merhabalar!"); };

*!*
merhaba(); // artık çalışır.
*/!*
```


<<<<<<< HEAD
```smart header="Ne zaman Fonksiyon Tanımı, ne zaman Fonksiyon İfadesi kullanılmalıdır?"

Öncelikle eğer fonksiyon tanımlamak istiyorsanız Fonksiyon Tanımı yazımını düşünmeniz gerekmekte. Kodunuzu düzenlemeniz için size özgürlük sağlar. Çünkü fonksiyon tanımından önce fonksiyonu çağırmak mümkündür.

Ayrıca fonksiyon içerisinde `function f(...){}` ile araştırmak `let f= function(....){..}`e göre daha kolaydır. Fonksiyon Tanımı daha fazla göze batar.
=======
```smart header="When to choose Function Declaration versus Function Expression?"
As a rule of thumb, when we need to declare a function, the first to consider is Function Declaration syntax. It gives more freedom in how to organize our code, because we can call such functions before they are declared.

That's also better for readability, as it's easier to look up `function f(…) {…}` in the code than `let f = function(…) {…}`. Function Declarations are more "eye-catching".

...But if a Function Declaration does not suit us for some reason, or we need a conditional declaration (we've just seen an example), then Function Expression should be used.
```
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

Fakat eğer Fonksiyon Tanımı işimize yaramaz ise(yukarıda örnğin Fonksiyon ifadesini kullandık), bu durumda Fonksiyon İfadesi yöntemi kullanılmalıdır.
```


## Ok Fonksiyonları [#arrow-functions]

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

<<<<<<< HEAD
=======
If we have only one argument, then parentheses around parameters can be omitted, making that even shorter:
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

```js run
// aynısı
// let ikiKati = function(n) { return n * 2 }
*!*
let ikiKati = n => n * 2;
*/!*

alert( ikiKati(3) ); // 6
```

Eğer hiç bir değer yoksa parantez eklenmelidir. ( Bir değer olduğunda yukarıdaki gibi kullanılabilir.)


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
let toplam = (a, b) => {  // birden fazla satır yazmak için `{` kullanılmalıdı.
  let sonuc = a + b;
*!*
  return sonuc; // eğer süslü parantez kullanıyorsanız değer döndürmek için return yazmanız gerekmektedir.
*/!*
};

alert( toplam(1, 2) ); // 3
```

```smart header="Dahası var"
Şu anda sadece Ok Fonksiyonlarına giriş yaptık. Fakat elbette tamamı bu değil! Ok fonksiyonun başka ilginç özellikleri de mevcut. Bunlara <info:arrow-functions> bölümünde değinilecektir.

<<<<<<< HEAD
Şimdilik tek satırlı fiillerde ve geri çağrım fonksiyonlarında kullabilirsiniz.
=======
For now, we can already use arrow functions for one-line actions and callbacks.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac
```


## Özet

<<<<<<< HEAD
- Fonksiyonlar değerdir. Atanabilir, kopyalanabilir ve kodun herhangi bir yerinde tanımlanabilirler.
- Eğer tanımı ana kod içerisinde ayrı bir cümle ise buna "Fonksiyon Tanımı" denir.
- Fonksiyon tanımları kod çalıştırmadan önce işlenir. Böylece kodun her yerinden ulaşılabilir olurlar.
- Fonksiyon tanımları ise kod çalışırken bu tanıma erişirse çalışır.

Çoğu zaman Fonksiyon Tanımı metodu tercih edilmelidir. Çünkü bu şekilde fonksiyon tanımlanmadan önce fonksiyon çağrısı yapmak mümkündür. Bu kodun daha düzenli tutulmasında yarcımdı olur. Ayrıca daha okunabilirdir.
=======
In most cases when we need to declare a function, a Function Declaration is preferable, because it is visible prior to the declaration itself. That gives us more flexibility in code organization, and is usually more readable.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

Fonksiyon ifadesi sadece Fonksiyon Tanımı yetersiz kalırsa kullanılmalıdır. Bu örnek daha önce yukarıda yapılmıştı.

Ok Fonksiyonları tek satır için kullanışlıdır. İki türlüsü vardır:

1. Süslü parantez olmadan: Fonksiyon sağ taraftaki ifadeyi çalıştırır ve sonucu dönderir. Tek satırda biten işlemler için kullanılmalıdır.
2. Süslü parantez ile `(...args) => { gövde }` -- süslü parantez bizim birden fazla satır yazmamızı sağlar.  Fakat gövde içerisinde `return` kullanılması gerekmektedir.