# Fonksiyon ifadeleri.

JavaScript'te fonksiyonlar, "büyülü dil yapısı" değil yalnızca özel bir değer tipidir.
[cut]

Daha önceden *fonksiyon tanımlama* için aşağıdaki form kullanılmıştı.

```js
function selamVer() {
  alert("Merhaba");
}
```

Diğer bir şekilde de fonksiyon tanımlanabilir. Bu da *fonksiyon ifadesi* olarak adlandırılır.

Aşağıdaki gibi görünür:


```js
let selamVer = function() {
  alert("Merhaba");
};
```

Burada fonksiyon yaratıldı ve doğrudan değişkene atandı, tıpkı diğer dillerde olduğu gibi. Fonksiyonun nasıl tanımlandığına bakmaksızın, bu fonksiyon sadece `selamVer` içinde saklanan bir değerdir.

Yukarıdaki kod örneklerinin anlamları aynıdır: "bir fonksiyon yarat ve bunu `selamVer` değişkenine ata"

Hatta yazdığımız fonksiyonu `alert` ile ekrana basmak da mümkündür.

```js run
function selamVer() {
  alert("Merhaba");
}

*!*
alert( selamVer ); // fonksiyonun kodunu gösterir.
*/!*
```

Dikkat ederseniz son kodda `()` bulunmamaktadır. Bundan dolayı `selamVer` fonksiyonu çalışmayacaktır. Bazı dillerde ne zaman fonksiyonun ismini verseniz çalışır fakat JavaScript'te çalışabilmesi için `()` kullanmanız gerekmektedir.

JavaScript'te fonksiyonlar değer olduğundan dolayı bunlarla uğraşılabilir. Yukarıdaki kod ekrana kaynak kodunu basar.

Tabiki `selamVer()` diye çağırılabildiğinden dolayı özel bir değerdir.

Fakat yine de değerdir. Bundan dolayı diğer değerlerle uğraşıldığı gibi bununla da aynı şekilde çalışılabilir.

Örneğin bir fonksiyon başka bir değişkene kopyalanabilir.


```js run no-beautify
function selamVer() {   // (1) oluştur
  alert("Merhaba");
}

let func = selamVer;    // (2) kopyala

func(); // Merhaba     // (3) kopyası!
selamVer(); // Merhaba    //    kendisi.
```

Detayına bakılacak olursa:

1.`(1)` fonksiyon tanımlanır ve `selamVer` değişkenine atanır.
2. `(2)` bunu `func` değişkenine kopyalar.

Tekrardan hatırlatmak gerekirse: `selamVer` etrafında parantez bulunmamaktadır. Eğer `func = selamVer()` şeklinde parantez ile yazılacak olsaydı, 
func değişkenine atanan değer `selamVer` fonksiyonunun kendisi değil, bu fonksiyonun çıktısı olurdu.

3. Fonksiyon bundan sonra `selamVer()` ve `func()` şeklinde çağırılabilir.
 
Ayrıca ilk satır için *fonksiyon ifadesi* de kullanılabilirdi:

```js
let selamVer = function() { ... };

let func = selamVer;
// ...
```

Herşey aynı olduğu gibi çalışırdı. Hatta neyin ne olduğu daha açık değil mi?


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


Cevap basit:
- Kod bloklarının sonunda `;` e gerek yoktur. Örneğin `if{ ...}`, `for{ ... }`, `for { }`, `function f{}` vs.
- Fonksiyon ifadesi bir ifade içinde kullanıldığından `let selamVer = ....;` bir değerdir. Kod bloğu değildir. Cümle sonlarında değer ne olursa olsun `;` kullanılması önerilir. Bundan dolayı `;` *fonksiyon ifadesi* ile alaklı değildir. Sadece tanımlamanın sonunu göstermek içindir. Tıpkı diğer tanımlamalarda olduğu gibi.
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
  if (confirm(soru)) evet()
  else hayir();
}
*/!*

function tamamGoster() {
  alert("Kabul ettiniz");
}

function iptalGoster() {
  alert("Çalışmasını durdurdunuz");
}
// kullanım: tamamGoster, iptalGoster fonksiyona parametre olarak gönderilmiştir.
sor("Kabul ediyor musunuz?", tamamGoster, iptalGoster);
```

Daha kısa yolunu yazmadan önce söylemek gerekir ki bu tür fonksiyonlar oldukça sıkça kullanılmaktadır. Gerçek hayattaki örnekleri ile yukarıdaki arasında fark ise gerçek hayatta basit bir `confirm` yerine daha karmaşık olaylar için kullanılıyor olmalarıdır. 

**`sor` fonksiyonunun argümanları *callbacks* veya *geri çağrım fonksiyonları* olarak adlandırılırlar.

Fikir fonksiyonu bizim baştan paslayıp ana fonksiyon içerisinde daha sonra duruma göre çağırılmasından kaynaklanmaktadır. Örneğe bakarsanız `tamamGoster` "evet" cevabı için *geri çağrım fonksiyonu*'dur.

Fonksiyon İfadesi kullanarak aynı fonksiyonu daha kısa bir şekilde yazmak mümkün:

```js run no-beautify
function sor(soru, evet, hayir) {
  if (confirm(soru)) evet()
  else hayir();
}

*!*
sor(
  "Kabul Ediyor musun?",
  function() { alert("Kabul ettin"); },
  function() { alert("Çalışmayı durdurdun."); }
);
*/!*
```
Gördüğünüz gibi yukarıda fonksiyonlar doğrudan `sor(...)` içerisinde tanımlandı. Hiç bir isim kullanılmadığından dolayı. Böyle fonksiyonlara *anonim* veya *anonymous* fonksiyonlar denir. Bu fonksiyonlar `sor` fonksiyonu dışında ulaşılabilir değillerdir(çünkü hiç bir değişkene atanmazlar).

Bu şekilde isimsiz kullanım JavaScript içerisinde çok doğaldır. Bu JavaScript'in ruhunda var diyebiliriz.


```smart header="Fonksiyon "fiil" bildiren bir değerdir."
Normal değerler örneğin karakter dizisi ve sayılar *veri*dir.
Fonksiyon *fiil* olarak adlandırılabilir.

Değişkenler arasında paylaşılabilir. İstendiği zaman çalıştırılabilir.

```


## Fonksiyon ifadesi ile Fonksiyon tanımının karşılaştırılması

Eğer Fonksiyon ifadesi ile fonksiyon tanımı arasındaki önemli farkları açıklamak gerekirse;

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

**Fonksiyon ifadesi kod çalışırken fonksiyona geldikten sonra kullılır**

Çalışma atamanın sağ tarafına geçince `let sum = function...`, bu noktadan sonra fonksiyon artık yaratıldı. Bundan böyle çağırılabilir veya başka bir değişkene atanabilir.

Fonksiyon tanımlama ise farklıdır.

**Fonksiyon tanımlama tüm kod bloğu içerisinde kullanılabilir**

Diğer bir deyişle, JavaScript kod bloğunu çalıştırmaya *hazırlandığında*, önce fonksiyon tanımlamalarına bakar ve fonksiyonları yaratır. Bunu bir "başlatma evresi* olarak görmek mümkündür.

Tüm Fonksiyon tanımlamaları tamamlandıktan sonra çalışmaya devam eder.

Sonuç olarak, fonksiyon tanımı ile bu tanımdan önce çağırılabilir.

Örnek verecek olursak:

```js run refresh untrusted
*!*
selamVer("Ahmet"); // Merhaba Ahmet
*/!*

function selamVer(isim) {
  alert( `Merhaba, ${isim}` );
}
```

Fonksiyon Tanımı olan `selamVer` JavaScript'in hazırlanma evresinde tanımlanır. Kod çalıştığında kodun her yerinden bu koda erişmek mümkündür.

Eğer bu bir Fonksiyon tanımı olsaydı, çalışmazdı.


```js run refresh untrusted
*!*
selamVer("Ahmet"); // hata!
*/!*

let selamVer = function(adi) {  // (*) büyü ortadan kalktı
  alert( `Merhaba, ${adi}` );
};
```
Fonksiyon tanımı kendisine ulaştığında çalışır. Yani `(*)`'gelmeden tanımlanmış olmalıydı ki `selamVer("Ahmet")` çalışabilsin.

**Fonksiyon tanımı eğer kod bloğunun içerisinde tanımlanırsa o bloğun içerisinde her yerde kullanılabilir. Fakat dışarıda kullanılamaz.**

Bazen sadece blok içinde o blokta kullanılacak yerel bir fonksiyon yaratmak daha kolay gelebilir. Fakat bu özellik problem yaratabilir.

Örneğin, `hosgeldin()` fonksiyonunu `yas` değişkenine göre tanımlayalım. Böylece sonradan kullanılacak hale getirmiş oluruz.

Aşağıdaki kod çalışmayacaktır:

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

  function merhaba() {     //  Yaş 16 olduğundan burası hiç bir zaman çalışmaz.
    alert("Merhabalar!");
  }
}

// Artık if bloğunun dışında olduğumuzdan dolayı burada fonksiyon tanımlarına ulaşamayız.

*!*
merhaba(); // Error: merhaba tanımlı değil.
*/!*
```
`merhaba` fonksiyonunu `if`in dışında da kullanılabilir kılmak için ne yapılmalıdır?

Doğru yaklaşım Fonksiyon İfadesini kullanarak `if` in dışına bir `merhaba` değişkeni yaratıp `if`in içinde bunun tanımını yapmak olabilir.

Artık beklenildiği gibi çalışır:

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


```smart header="Ne zaman Fonksiyon Tanımı, ne zaman Fonksiyon İfadesi kullanılmalıdır?"

Öncelikle eğer fonksiyon tanımlamak istiyorsanız Fonksiyon Tanımı yazımını düşünmeniz gerekmekte. Kodunuzu düzenlemeniz için size özgürlük sağlar. Çünkü fonksiyon tanımından önce fonksiyonu çağırmak mümkündür.

Ayrıca fonksiyon içerisinde `function f(...){}` ile araştırmak `let f= function(....){..}`e göre daha kolaydır. Fonksiyon Tanımı daha fazla göze batar.

Fakat eğer Fonksiyon Tanımı işimize yaramaz ise(yukarıda örnğin Fonksiyon ifadesini kullandık), bu durumda Fonksiyon İfadesi yöntemi kullanılmalıdır.
```

## Özet

- Fonksiyonlar değerdir. Atanabilir, kopyalanabilir ve kodun herhangi bir yerinde tanımlanabilirler.
- Eğer tanımı ana kod içerisinde ayrı bir cümle ise buna "Fonksiyon Tanımı" denir.
- Fonksiyon tanımları kod çalıştırmadan önce işlenir. Böylece kodun her yerinden ulaşılabilir olurlar.
- Fonksiyon tanımları ise kod çalışırken bu tanıma erişirse çalışır.

Çoğu zaman Fonksiyon Tanımı metodu tercih edilmelidir. Çünkü bu şekilde fonksiyon tanımlanmadan önce fonksiyon çağrısı yapmak mümkündür. Bu kodun daha düzenli tutulmasında yarcımdı olur. Ayrıca daha okunabilirdir.

Fonksiyon ifadesi sadece Fonksiyon Tanımı yetersiz kalırsa kullanılmalıdır. Bu örnek daha önce yukarıda yapılmıştı.

