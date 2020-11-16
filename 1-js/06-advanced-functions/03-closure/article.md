
# Variable scope, closure

<<<<<<< HEAD
JavaScript fonksiyon yönelimli bir dildir. Çok bağımsızlık verir. Fonksiyon bir yerde yaratılıp sonra başka bir değişkene atanarak diğer bir fonksiyona argüman olarak gönderilebilir ve sonra tamamen farklı bir yerden çağrılabilir.

Bildiğiniz gibi fonksiyon kendi dışında olan değişkenlere ulaşabilir ve bu özelliklik oldukça fazla kullanılır.

Peki ya dışarıdaki değişken değişirse? Fonksiyon en son değerini mi alacak yoksa yaratıldığında var olan değeri mi?

Ayrıca diyelim ki fonksiyon başka bir yere gönderildi ve oradan çağrıldığında ne olur, yeni yerinden dışarıda bulunan değişkenlere erişebilir mi?

Bu sorulara farklı diller farklı cevaplar vermektedir, bu bölümde JavaScriptin bu sorulara cevabını öğreneceksiniz.

[cut]

## Birkaç soru

Örnek olması amacıyla iki soru formülize edilecek olursa, sonrasında içsel mekanizması parça parça incelenecektir, ileride daha karmaşık sorularacevap verebilirsiniz.

1. `selamVer` fonksiyonu dışarıda bulunan `isim` değişkenini kullanmaktadır. Fonksiyon çalıştığında, hangi `isim` değişkeni kullanılacaktır?

    ```js
    let isim = "Ahmet";

    function selamVer() {
      alert("Merhaba, " + isim);
    }

    isim = "Mehmet";

    *!*
    selamVer(); // "Ahmet" mi yoksa "Mehmet" mi gösterilecek?
    */!*
    ```

    Böyle durumlara tarayıcı ve sunucu tabanlı geliştirmelerde oldukça sık karşılaşılır. Bir fonksiyon yaratıldığı anda değil de daha sonra çalışmak üzere programlanabilir. Örneğin bir kullanıcı aksiyonu veya ağ üzerinden istekler bu gruba girer.
    
    Öyleyse soru: son değişiklikleri alır mı?
    

2. `calisanYarat` diğer bir fonksiyon yaratır ve bunu döner. Bu yeni fonksiyon herhangi bir yerden çağrılabilir. Peki yaratıldığı yerin dışındaki değişkenlere veya çağrılan yerin dışındaki değişkenlere veya ikisine birden erişebilece mi?

    ```js
    function calisanYarat() {
      let isim = "Mehmet";

      return function() {
        alert(isim);
      };
    }

    let isim = "Zafer";

    // fonksiyon yarat
    let is = calisanYarat();

    // çağır
    *!*
    is(); // burada "Mehmet" mi yoksa "Zafer" mi gösterilecek ? 
    */!*
    ```


## Sözcüksel ortam ( Lexical Environment )

Ne olduğunu anlamak için önce "değişken"'in tekniksel anlamı üzerinde tartışmak lazım

JavaScript'te çalışan her fonksiyon, kod bloğu bir bütün olarak "Sözcüksel Ortam" adında bir objeye sahiptir.

Bu "Sözcüksel Ortam" iki bölümden oluşur:

1. *Ortam Kaydı* -- tüm yerel değişkenleri ve özelliklerini ( ve ek özellikleri `this` gibi ) tutan objedir.
2. *Dış Sözcüksel Ortam*'a referans genelde süslü parantezin dışındaki kod ile ilintilidir.

Öyleyse "değişken" içsel objedeki bir özelliktir, çevresel kayıtlar. "değişkeni almak veya değiştirmek" demek "o objenin özelliğini almak veya değiştirmek" demektir.

Örneğin, aşağıdaki kodda sadece bir tane Sözcüksel Ortam bulunmaktadır:

![Sözcüksel Ortam](lexical-environment-global.svg)

Buna evrensel sözcük ortamı denilmektedir, kodun tamamıyla alakalıdır. Tüm tarayıcılarda `<script>` etiketleri aynı evrensel ortamı paylaşır.

Yukarıdaki görselde, dikdörtgen ile gösterilen Çevresel Kayıt ( değişken kaynağı ) anlamına gelir ve ok işareti dışsal referanstır. Evrensel Sözcük Ortamından daha dış ortam bulunmamaktadır. Yani `null` dur. 

Aşağıda `let` değişkenlerinin nasıl çalıştığı görsel ile açıklanmıştır:

![Sözcüksel Ortam](lexical-environment-global-2.svg)

Sağ tarafta bulunan dikdörtgenler evrensel Sözcük Ortamının çalışırkenki değişikliklerini gösterir.

1. Kod çalışmaya başladığında, Sözcüksel Ortam boştur.
2. `let ifade`  tanımlaması görünür. İlk başta bir değeri bulunmamaktadır bundan `undefined` olarak saklanır.
3. `ifade`'ye değer atanır.
4. `ifade` yeni bir defere referans olur.

Herşey çok basit görünüyor değil mi?

Özetlemek gerekirse:

- Değişken özel bir iç objenin özelliğidir. Bu obje o anda çalışan kod, fonksiyon ile bağlantılıdır.
- Değişkenlerle çalışmak aslında o objenin özellikleri ile çalışmak demektir.

### Fonksiyon tanımı

Fonksiyon tanımları özeldir. `let` değişkenlerine nazaran çalıştırıldıklarında değil de Sözcüksel Ortam yaratıldığında işlenirler, bu da kodun başladığı zamandır.

... Ve bundan dolayı bir fonksiyon tanımından önce çağırılabilir.

Aşağıdaki kodda Sözcüksel Ortam başlangıçta boş değildir. `say`'e sahiptir çünkü bu bir fonksiyon tanımıdır. Sonrasında `ifade` alır ve bunu `let` ile tanımlar:

![Sözcüksel Ortam](lexical-environment-global-3.svg)

### İç ve dış Sözcüksel Ortamlar

`say()` fonksiyonu çağrısı sırasında dış değişkenler çağrılır, bu olaya daha detaylı bakacak olursak.

Fonksiyon ilk çalıştığında yeni bir Sözcüksel Çevre otomatik olarak yaratılır. Bu tüm fonksiyonlar için genel bir kuraldır. Bu Sözcüksel Çevre yerel değişkenlerin tutulması ve çağrının tüm parametrelerini tutar.

<!--
```js
let ifade = "Merhaba";

function say(adi) {
  alert( `${ifade}, ${adi}` );
}

say("Ahmet"); // Merhaba, Ahmet
```
-->
`say("Ahmet")` fonksiyonu çalıştığı sırada Sözcüksel Ortam aşağıdaki gibi olur:

![Sözcüksel Çevre](lexical-environment-simple.svg)

Fonksiyon çağrıldığında ise iki tane sözcüksel ortam bulunmaktadır: içte olan(fonksiyon çağrısı için) ve dışta olan(evrensel):

- İçte olan sözcüksel ortam `say` fonksiyonunun o anki durumuna bakar, o anda tek `adi` degiskeni bulunmaktadır. `say("Ahmet")` çağrıldığından dolayı `idi` değişkeninin değeri `"Ahmet"` olur.
- Dış Sözcük Ortamı ise bu durumda Evrensel Sözcük Ortamıdır.

İç Sözcük ortamı `outer` ile Dış Sözcük Ortamına referans olur.

**Kod değişkene ulaşmak istediğinde -- önce İç Sözcük ortamında arara, daha sonra dış sözcüm ortamına bakar ve daha sonra daha dıştakine bakar bu şekilde zincirin en sonuna kadar devam eder**

Eğer değişken hiç bir yerde bulunamazsa, sıkı modda hata verir. `use strict` kullanılmazsa tanımsız değişken yeni bir global değişken yaratır.

Arama olayı bizim yazdığımız kodlarda nasıl işliyor buna bakalım:

- `say` içindeki `alert` `adi` değişkenine erişmek istediğinde, anında Sözcük Ortamında bulabilir.
- `ifade`'ye erişmek istediğinde önce fonksiyonun içine bakar fakat orada da bulamayacağından `outer` referansı takip ederek evrensel sözcük ortamından bu değişkene erişebilir.

![Sözcüksel İfade Araması](lexical-environment-simple-lookup.svg)

Şimdi bölümün ilk başında sorulan sorulara cevap bulunabilir.

**Bir fonksiyon dışta bulunan değişkenin en son değerini alır**

Bunun nedeni tanımlanan mekanizmadan dolayıdır. Eski değişkenler bir yere kaydedilmezler. Fonksiyon bunları istediğinde iç sözcük ortamından veya dış sözcük ortamından o anki değeri alır.

Bundan dolayı ilk sorunun cevabı `Mehmet` olacaktır:

```js run
let adi = "Ahmet";

function selamVer() {
  alert("Merhaba, " + adi);
}

adi = "Mehmet"; // (*)

*!*
selamVer(); // Pete
*/!*
=======
JavaScript is a very function-oriented language. It gives us a lot of freedom. A function can be created at any moment, passed as an argument to another function, and then called from a totally different place of code later.

We already know that a function can access variables outside of it ("outer" variables).

But what happens if outer variables change since a function is created? Will the function get newer values or the old ones?

And what if a function is passed along as a parameter and called from another place of code, will it get access to outer variables at the new place?

Let's expand our knowledge to understand these scenarios and more complex ones.

```smart header="We'll talk about `let/const` variables here"
In JavaScript, there are 3 ways to declare a variable: `let`, `const` (the modern ones), and `var` (the remnant of the past).

- In this article we'll use `let` variables in examples.
- Variables, declared with `const`, behave the same, so this article is about `const` too.
- The old `var` has some notable differences, they will be covered in the article <info:var>.
```

## Code blocks

If a variable is declared inside a code block `{...}`, it's only visible inside that block.

For example:

```js run
{
  // do some job with local variables that should not be seen outside

  let message = "Hello"; // only visible in this block

  alert(message); // Hello
}

alert(message); // Error: message is not defined
```

We can use this to isolate a piece of code that does its own task, with variables that only belong to it:

```js run
{
  // show message
  let message = "Hello";
  alert(message);
}

{
  // show another message
  let message = "Goodbye";
  alert(message);
}
```

````smart header="There'd be an error without blocks"
Please note, without separate blocks there would be an error, if we use `let` with the existing variable name:

```js run
// show message
let message = "Hello";
alert(message);

// show another message
*!*
let message = "Goodbye"; // Error: variable already declared
*/!*
alert(message);
```
````

For `if`, `for`, `while` and so on, variables declared in `{...}` are also only visible inside:

```js run
if (true) {
  let phrase = "Hello!";

  alert(phrase); // Hello!
}

alert(phrase); // Error, no such variable!
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058
```

Here, after `if` finishes, the `alert` below won't see the `phrase`, hence the error.

<<<<<<< HEAD
Çalışma akışı şu şekildedir:

1. Evrensel Sözcük ortamında `adi:"Ahmet"` bulunmaktadır.
2. `(*)` satırında evrensel değişken değişir, şimdi `adi:"Mehmet"` bulunmaktadır.
3. `selamVer()` fonksiyonu çalıştığında `adi` dğeişkenini dışarıdan alır. Bu `dış` sözcüksel ortamda değişkenin değeri `"Mehmet"`tir.


```smart header="Bir çağrı -- bir Sözcüksel Ortam"

Fonksiyon Sözcük Ortamı her fonksiyon çağrıldığında yeniden yaratılır.

Eğer fonksiyon bir kaç defa çağırılırsa her çağrıldığında kendine ait ayrı bir Sözcüksel Ortamı olur, tabi bu ortam o anki çağırılmaya ait yerel değişkenleri ve parametreleri tutar.
```

```smart header="Sözcüksel Ortam Şartname Objesidir"

"Sözcüksel Ortam" bir şartname objesidir. Bu objeyi alıp düzenleyemezsiniz veya doğrudan kullanamazsınız. JavaScript motoru yapabildiğince bu değişkenleri optimize etmeye çalışır, kullanılmayan değişkenleri saf dışı bırakabilir fakat görülen davranışları yukarıda anlatıldığı gibi olmalıdır.

=======
That's great, as it allows us to create block-local variables, specific to an `if` branch.

The similar thing holds true for `for` and `while` loops:

```js run
for (let i = 0; i < 3; i++) {
  // the variable i is only visible inside this for
  alert(i); // 0, then 1, then 2
}

alert(i); // Error, no such variable
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058
```

Visually, `let i` is outside of `{...}`. But the `for` construct is special here: the variable, declared inside it, is considered a part of the block.

## İç içe fonksiyonlar

Bir fonksiyon diğer bir fonksiyon içerisinde yaratılırsa buna iç içe fonksiyon denir.

Teknik olarak bu mümkündür.

Kodu organize etmek için şu şekilde kullanabilirsiniz:

```js
function selamYolcu(adi, soyadi) {

  // yardımcı iç içe fonksiyon.
  function tamIsim() {
    return adi + " " + soyadi;
  }

  alert( "Merhaba, " + tamIsım() );
  alert( "Güle Güle, " + tamIsım() );

}
```

*iç içe* fonksiyon `tamIsım()` kullanım kolaylığı sağlaması amacıyla yapılmıştır. Dışta bulunan değişkenlere erişebilir ve tam ismi döndürebilir.

<<<<<<< HEAD
Daha ilginci, iç içe bir fonksiyon geri döndürülebilir:  Bu yeni objenin bir özelliği olarak veya sonucun kendisi dönebilir. Sonra başka yerde kullanılabilir. Nerede olduğu önemli olmaksızın, hala aynı dış değişkene erişebilir.

Bunun örneği yapıcı ( constructor ) fonksiyondur ( <info:constructor-new> bölümünden inceleyebilirsiniz. )

```js run
// yapıcı fonksiyon yeni bir obje dönderir.
function Kullanici(isim) {

  // obje metodu iç içe fonksiyon olarak yaratıldı.
  this.Kullanici = function() {
    alert(isim);
  };
}

let kullanici = new Kullanici("Ahmet");
kullanici.selamYolcu(); // metod dışarıda bulunan "isim" değişkenine erişebilir.
```

Fonksiyonun döndürülmesi örneği:
=======
What's much more interesting, a nested function can be returned: either as a property of a new object or as a result by itself. It can then be used somewhere else. No matter where, it still has access to the same outer variables.

Below, `makeCounter` creates the "counter" function that returns the next number on each invocation:
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

```js run
function sayacUret() {
  let sayac = 0;

  return function() {
<<<<<<< HEAD
    return sayac++; // dışarıda bulunan sayac değişkenine erişimi bulunmaktadır.
=======
    return count++;
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058
  };
}

let sayac = sayacUret();

alert( sayac() ); // 0
alert( sayac() ); // 1
alert( sayac() ); // 2
```
`sayacUret` örneğine bakılacak olursa. "sayac" fonksiyonunu bir sonraki sayı ile döndürür. Basit olmasının yanında biraz modifiye edilmiş hali pratikte kullanılmaktadır [pseudorandom number generator](https://en.wikipedia.org/wiki/Pseudorandom_number_generator). Yani çok suni bir örnek değildir.

<<<<<<< HEAD
Peki sayaç içeride nasıl çalışmakta?

İçteki fonksiyon çalıştığında `sayac++` içeriden dışarıya kadar `sayac` değişkenini arar. Yukarıdaki örneğe bakılacak olursa, sıralama şu şekilde olacaktır:

![](lexical-search-order.svg)

1. İçte bulunan fonksiyonun yerel değişkenleri.
2. Dışta bulunan fonksiyonların değişkenleri.
3. ...Bu evrensel değişkenlere kadar gider.

`sayac` orneğinde `2`. adımda bulundu. Dıştaki değişken değiştirildiğinde, bulunduğu yerde değişiklik olur. Bundan dolayı `sayac++` dıştaki değşikeni bulur ve dıştaki değişkenin Sözcüksel Ortamında bu değişkenin değerini değiştirir. Saki `let sayac = 1` yapıyormuş gibi.


Size iki tane sorum var:

1. `sayacUret`'e ait olmayan bir koddan `sayac` değişkeni sıfırlanabilir mi? Mesela yukarıdaki örnekte `alert` sonrasında.
2. Eğer `sayacUret()`'i bir kaç defa çağırırsanız -- birçok `sayac` fonksiyonu döndürür. Bunlar birbirinden bağımsız mıdır yoksa aynı `sayac`'ı mı kullanılar?

Okumaya devam etmeden yukarıdaki sorulara cevap vermeye çalışın.

...Bitti mi?

Peki o zaman, şimdi cevaplar.

1. Hayır sıfırlayamaz. `sayac` yerel bir değişkendir ve dışarıdan erişilemez.
2. Her `sayacUret` çağrısı o fonksiyona ait Sözcüksel Çevre üretir, bunun da kendine ait `sayac` değişkeni bulunmaktadır. Öyleyse `sayac` değişkenleri her fonksiyon için bağımsızdır denebilir.

Örneğin:

```js run
function sayacUret() {
  let sayac = 0;

  return function() {
    return sayac++; // dışarıda bulunan sayac değişkenine erişimi bulunmaktadır.
  };
}

let sayac1 = sayacUret();
let sayac2 = sayacUret();

alert( sayac1() ); // 0
alert( sayac1() ); // 1

alert( sayac2() ); // 0 (independant)
```

Muhetemelen, aklınızda dış değişkenlerin nasıl çalıştığı açıklığa kavuştu. Fakat daha karmaşık olaylar için daha derine inmeye gerek var.

## Detaylı şekilde ortamların incelenmesi.

Şu anda clouse'ların genel olarak nasıl çalıştığını biliyorsunuz, artık daha derinine inme vakti geldi.

Aşağıda `sayacUret` fonksiyonunun adımları gösterilmektedir, herşeyi anladığınıza emin olun. Basamaklarda göreceğiniz `[[Environment]]` henüz işlenmedi.

1. Kod çalışmaya başkadığında sadece bir tane Sözcüksel Ortam bulunmaktadır:

    ![](lexenv-nested-makecounter-1.svg)

    Başlangıçta sadece `sayacUret` fonksiyonu bulunmaktadır, çünkü bu fonksiyon tanımıdır. Henüz çalışmadı.

    Tüm fonksiyonlar başlangıçta gizli bir `[[Environment]]` değişkeni alırlar, bu yaratılmaya dair üretilecek Sözcüksel Çevreye referans olur. Bunun hakkında henüz bilgi verilmedi, fakat teknik olarak bunu fonksiyonun nerede yaratıldığını bilmesi olarak anlayabilirsiniz.

    Burada `sayacUret` Evrensel Sözcüksel Ortamda yaratıldı. Bundan dolayı `[[Environemnt]]` bu ortamın referansıdır.
    
    Diğer bir değişle fonksiyon üretildiğinde Sözcüksel Ortama ait bir "baskı" ile üretilir. Bu `[[Environment]]` gizli bir özellik olarak burayı referans verir.
    
2. Sonrasında kod `sayacUret()` çağrısını yapıyor. Aşağıda `sayacUret()`'in ilk satırı çalıştığındaki durumu gösterilmektedir.

    ![](lexenv-nested-makecounter-2.svg)

    `sayacUret()` fonksiyonu çağrıldığında, bu fonksiyonun değişkenlerini ve argümanlarını tutmak için Sözcüksel Ortam yaratılır.

    Her Sözcüksel Çevre iki şeyi tutar:
    1. Yerel değişkenlere ait Ortamsal Kayıtlar. Bu durumda `let sayac` çalıştırıldığında yerel değişken olarak `sayac` tutulmaktadır.
    
    2. Dış sözcüksel referans, bu fonksiyonun `[[Environment]]`'i dir. Burada `sayacUret` fonksiyonunun `[[Environment]]`'i evrensel sözcüksel ortama referans verir.
 
    Öyleyse şimdi iki tane sözcüksel ortam bulunmaktadır: evrensel olan ve `sayacUret` çağrısını yapan( dış referans verir).
    
3. `sayacUret()` fonksiyonu çalıştığında küçük bir iç fonksiyon yaratılır.

    Fonksiyonun nasıl yaratıldığı yani Fonksiyon Tanımıyla mı yoksa Fonksiyon ifadesiyle mi yaratıldığı önemli değildir. Tüm fonksiyonlar bulunduğu sözcüksel ortama referans eden `[[Environment]]` özelliği ile yaratılırlar. Bundan dolayı en küçük fonksiyon bile bu özelliği içerir.
    
    İçte olan yeni fonksiyon için `[[Environment]]` dğeişkeni var olan `sayacUret`'in Sözcüksel Ortamıdır.( Doğduğu yer )

    ![](lexenv-nested-makecounter-3.svg)

    Dikkat ederseniz bu basamakta iç fonksiyon yaratıldı fakat çağırılmadı. İçindeki kod `function() { return sayac++; }` çalışmadı, bu kod döndürülecek.


4. Çalışma devam ettiğinde `sayacUret()` biter, sonuc olarak ( küçük iç fonksiyon ) global `counter` değişkenine atanıyor.

    ![](lexenv-nested-makecounter-4.svg)

    Bu fonksiyonun sadece bir satır kodu var: `return sayac++`, sadece bu çalışacaktır.
    
5. `sayac()` çağrıldığında, "boş" bir Sözcüksel Ortam yaratılır. Hiç bir yerel değişkeni yoktur. Fakat `sayac`'ın `[[Environment]]`'i dış referans olarak kullanılır. Bundan dolayı, daha önceden yapılan `sayacUret()`'in değişkenlerine erişebilir. Oluşturulduğu yerder:

    ![](lexenv-nested-makecounter-5.svg)

    Değişkene erişmesi gerekirse önce kendi yerel sözcüksel ortamına(boş), sonra daha önce çağrılan `sayacUret()`'in sözcüksel ortamına, en son evrensel ortama bakar.
    
    `sayac` için arama yaptığında, en yakınında `sayacUret`'in sözcüksel çevresi bulunmaktadır.
    
    Buradaki hafıza yönetimine dikkat ederseniz. `sayacUret()` çağrısı bittikten bir süre sonra, Sözcüksel ortam hafızada tutulur, çünkü içte bulunan fonksiyonun `[[Environment]]`'i `sayacUret`'e referans vermektedir.
    
    Genel olarak, sözcüksel ortam objesi fonksiyon kullanılabilir olduğu sürece yaşar. Fonksiyon kullanılmadığında silinir.
  

6. `sayac()` sadece `sayac` değişkenini döndürmekle kalmaz, artırırda. Dikkat ederseniz değişiklik sadece "olduğu yerde" yapıldı. Var olan `sayac` değişkeni bulunduğu ortamda değiştirildi.

    ![](lexenv-nested-makecounter-6.svg)

    Öyleyse bir önceki adıma tek değişiklikle geri dönülmektedir -- `sayac`'ın yeni değeri. Devam eden çağrılar da aynı şekilde çalışırlar.

7. Sonraki `sayac()` da aynısını yapar.

Başlangıçta sorulan ikinci sorunun cevabı şimdi açıklık kazanmış olmalı.

Aşağıda `isim` özelliği `calisanUret()` fonksiyonu tarafından bulunduğu ortamdan kullanılmıştır: 

![](lexenv-nested-work.svg)

Sonuç görüşdüğü gibi `"Pete"` olacaktır.

...Fakat eğer `calisanUret()` fonksiyonu içerisinde `let name` tanımlanmamış olsaydı, bu durumda değişkeni arayış evrensel değişkenler ile devam edecekti ve bu durumda sonuç `"John"` olacaktı.

```smart header="Closure"

Genel programlama tanımlarında "closure" adında bir tanım bulunmaktadır. Bunun ile [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)) dıştaki değişkenleri hatırlayabilen ve bunlara erişebilen fonksiyon anlaşılmalıdır. Bazı dillerde, bu mümkün değildir veya fonksiyonun özel bir biçimde yazılması gerekmektedir. Fakat yukarıda görüldüğü üzere tüm fonksiyonlar doğal olarak closure'dur ( bunun sadece bir tane istisnası bulunmaktadır bunu <info:new-function> bölümünde inceleyebilirsiniz.)

Ön yüz için bir görüşmeye gittiğinizde "Closure nedir?" diye sorulursa doğru cevap closure'un tanımın verilip tüm JavaScript fonksiyonlarının aslında closure olduğunun anlatılması ve sonrasında `[[Environment]]` özelliğinden, Sözcüksel Ortamdan bahsedilmesi yeterli olacaktır.
```

## Kod blokları ve döngüler, IIFE

Yukarıdaki örnekler fonksiyonlara odaklanmıştır. Fakat Sözcüksel Ortam `{...}` süslü parantez içerisinde de geçerlidir.

Bir kod bloğu çalıştığında oluşturulur ve blok seviyesinde yerel değişkenleri tutar. Aşağıda bir kaç örneği bulunmaktadır.


## If

Aşağıdaki örnekte işlem blok çalıştığında `if` bloğunun içine girer, yeni Sözcüksel Ortam "if-only" için yaratılmıştır:

<!--
```js run
let ifade = "Merhaba";

if (true) {
  let kullanici = "Ahmet";

  alert(`${ifade}, ${kullanici}`); // Merhaba, Ahmet
}

alert(kullanici); // Hata, böyle bir değişken bulunamamakta!
```
-->

![](lexenv-if.svg)

Yeni sözcüksel ortam bilgileri dış çevreden alabilir, bundan dolayı `ifade` erişilebilirdir. Fakat `if` içerisindeki tüm değişkenler ve Fonksiyonel ifadeler kendi Sözcüksel Çevresinden erişilebilir, dışarıdan erişilemez.

Örneğin `if` bittikten sonra `kullanici` değişkeni görünmez olacaktır.


## For, while

Her bir döngü kendine ait Sözcüksel Ortama sahiptir. Eğer değişken `for` içerisinde tanımlanmışsa o sözcüksel ortama yereldir.

```js run
for(let i = 0; i < 10; i++) {
  // Her döngü kendisine ait sözcüksel ortama sahiptir.
  // {i: deger}
}

alert(i); // Hata, böyle bir değişken yoktur.
```

Bu aslında istisnadır, çünkü `let i`, görünürde `{...}` dışındadır. Fakat her döngü kendine ait sözcüksel ortamında `i`'nin o anki değerini içermektedir.

Döngüden sonra `i` görünmez olur.

### Kod Blokları

"yalın" kod bloğu `{...}` ile değişkenler "yerel kapsama" tamlanabilir.

Örneğin, bir tarayıcıda tüm kodlar evrensel alanları paylaşabilir. Eğer bir kod bloğu içerisinde evrensel alanda bir değişken yaratılırsa, kodun tamamında kullanılabilir. Fakat bu çatışmalara neden olabilir, örneğin aynı değişkenler farklı yerlerde yazılabilirler ve birbirlerinin bilgilerini silebilirler.

Bu değişken isimleri genel kullanılırsa ve kod yazan kişi diğer değişkenin kullanıldığını bilmiyor ise yaşanılacak bir olaydır.

Bunlardan kaçınmak için bir kod bloğu oluşturarak dışarıda bulunan evrensel ortamdan isole edilebilir:

```js run
{
  // yerel değişkenler ile dışarıdaki değişkenlere etki etmeden istenilen şekilde izolasyon yapılabilir.
  let mesaj = "Merhaba";

  alert(mesaj); // Merhaba
}

alert(mesaj); // Hata: mesaj tanımlı değildir.
```

Bloğun dışındaki kod içerideki değişkeni göremez. Çünkü bir her kod bloğu kendine ait sözcüksel ortama sahiptir.

### IIFE

Eski kodları arasanız "anında çalışan fonksiyon ifadeleri" ( IIFE )  bu amaçla kullanılmıştır.


Aşağıdaki gibidirler:

```js run
(function() {

  let mesaj = "Merhaba";

  alert(mesaj); // Merhaba
=======
Despite being simple, slightly modified variants of that code have practical uses, for instance, as a [random number generator](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) to generate random values for automated tests.

How does this work? If we create multiple counters, will they be independent? What's going on with the variables here?

Undestanding such things is great for the overall knowledge of JavaScript and beneficial for more complex scenarios. So let's go a bit in-depth.

## Lexical Environment

```warn header="Here be dragons!"
The in-depth technical explanation lies ahead.

As far as I'd like to avoid low-level language details, any understanding without them would be lacking and incomplete, so get ready.
```

For clarity, the explanation is split into multiple steps.

### Step 1. Variables

In JavaScript, every running function, code block `{...}`, and the script as a whole have an internal (hidden) associated object known as the *Lexical Environment*.

The Lexical Environment object consists of two parts:

1. *Environment Record* -- an object that stores all local variables as its properties (and some other information like the value of `this`).
2. A reference to the *outer lexical environment*, the one associated with the outer code.

**A "variable" is just a property of the special internal object, `Environment Record`. "To get or change a variable" means "to get or change a property of that object".**

In this simple code without functions, there is only one Lexical Environment:

![lexical environment](lexical-environment-global.svg)

This is the so-called *global* Lexical Environment, associated with the whole script.

On the picture above, the rectangle means Environment Record (variable store) and the arrow means the outer reference. The global Lexical Environment has no outer reference, that's why the arrow points to `null`.

As the code starts executing and goes on, the Lexical Environment changes.

Here's a little bit longer code:

![lexical environment](closure-variable-phrase.svg)

Rectangles on the right-hand side demonstrate how the global Lexical Environment changes during the execution:

1. When the script starts, the Lexical Environment is pre-populated with all declared variables.
    - Initially, they are in the "Uninitialized" state. That's a special internal state, it means that the engine knows about the variable, but it cannot be referenced until it has been declared with `let`. It's almost the same as if the variable didn't exist.
2. Then `let phrase` definition appears. There's no assignment yet, so its value is `undefined`. We can use the variable from this point forward.
3. `phrase` is assigned a value.
4. `phrase` changes the value.

Everything looks simple for now, right?

- A variable is a property of a special internal object, associated with the currently executing block/function/script.
- Working with variables is actually working with the properties of that object.

```smart header="Lexical Environment is a specification object"
"Lexical Environment" is a specification object: it only exists "theoretically" in the [language specification](https://tc39.es/ecma262/#sec-lexical-environments) to describe how things work. We can't get this object in our code and manipulate it directly.

JavaScript engines also may optimize it, discard variables that are unused to save memory and perform other internal tricks, as long as the visible behavior remains as described.
```

### Step 2. Function Declarations

A function is also a value, like a variable.

**The difference is that a Function Declaration is instantly fully initialized.**

When a Lexical Environment is created, a Function Declaration immediately becomes a ready-to-use function (unlike `let`, that is unusable till the declaration).

That's why we can use a function, declared as Function Declaration, even before the declaration itself.

For example, here's the initial state of the global Lexical Environment when we add a function:

![](closure-function-declaration.svg)

Naturally, this behavior only applies to Function Declarations, not Function Expressions where we assign a function to a variable, such as `let say = function(name)...`.

### Step 3. Inner and outer Lexical Environment

When a function runs, at the beginning of the call, a new Lexical Environment is created automatically to store local variables and parameters of the call.

For instance, for `say("John")`, it looks like this (the execution is at the line, labelled with an arrow):

<!--
    ```js
    let phrase = "Hello";

    function say(name) {
     alert( `${phrase}, ${name}` );
    }

    say("John"); // Hello, John
    ```-->

![](lexical-environment-simple.svg)

During the function call we have two Lexical Environments: the inner one (for the function call) and the outer one (global):

- The inner Lexical Environment corresponds to the current execution of `say`. It has a single property: `name`, the function argument. We called `say("John")`, so the value of the `name` is `"John"`.
- The outer Lexical Environment is the global Lexical Environment. It has the `phrase` variable and the function itself.

The inner Lexical Environment has a reference to the `outer` one.

**When the code wants to access a variable -- the inner Lexical Environment is searched first, then the outer one, then the more outer one and so on until the global one.**

If a variable is not found anywhere, that's an error in strict mode (without `use strict`, an assignment to a non-existing variable creates a new global variable, for compatibility with old code).

In this example the search proceeds as follows:

- For the `name` variable, the `alert` inside `say` finds it immediately in the inner Lexical Environment.
- When it wants to access `phrase`, then there is no `phrase` locally, so it follows the reference to the outer Lexical Environment and finds it there.

![lexical environment lookup](lexical-environment-simple-lookup.svg)


### Step 4. Returning a function

Let's return to the `makeCounter` example.

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
```

At the beginning of each `makeCounter()` call, a new Lexical Environment object is created, to store variables for this `makeCounter` run.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

So we have two nested Lexical Environments, just like in the example above:

<<<<<<< HEAD
Burada bir fonksiyon ifadesi yaratıldı ve doğrudan çağırıldı. Kod hemen çalışır ve kendine ait değişkenlere sahiptir.

Fonksiyon ifadesi parantez içine alınmıştır `(function {...})`, çünkü eğer JavaScript ana kod akışında `"function"` görürse bunu Fonksiyon Tanımı olarak algılar. Fakat Fonksiyon Tanımının ismi olmalıdır ve ismi olmadığından dolayı bu kod parantez içine alınmaz ise hata verir.

```js run
// Error: Unexpected token (
function() { // <-- JavaScript fonksiyon ismini bulamadı. ('i gördü ve hemen hata verdi.

  let mesaj = "Merhaba";

  alert(mesaj); // Merhaba

}();
```
"Tamam, önemli değil, hadi Fonksiyon tanımı yapmak için bir ad verelim" derseniz bu da çalışmaz. Çünkü JavaScript Fonksiyon Tanımlarının anında çalışmasına izin vermez:

```js run
// Bu defa aşağıdaki parantez hata verecektir.
function go() {

}(); // <-- Fonskyion Tanımı anında çalıştırılamaz.
```

...Bundan dolayı parantez bu fonksiyonun başka bir ifade kaynağında yaratıldığını ifade eder ve bu da Fonksiyon İfadesidir. İsme gerek duymaksızın doğrudan çalıştırılır.

JavaScript'e başka yollarla da Fonksiyon İfadesini belirtmek mümkündür.

```js run
//  IIFE yaratmanın yolları.

(function() {
  alert("Fonksiyon etrafındaki parantezler");
}*!*)*/!*();

(function() {
  alert("Herşeyin etrafında parantez");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Lojik NOT kapısıyla ifadenin başlaması.");
}();

*!*+*/!*function() {
  alert("Matematiksel toplama işareti ile ifadenin başlaması.");
}();
```

Yukarıdaki tüm durumlarda Fonksiyon İfadesi tanımlanır ve doğrudan çalıştırılır.

## Garbage Koleksiyonu

Sözcüksel Ortam objeleri aynı normal değerler gibi hafıza yönetimine konu olurlar.

- Genelde, Sözcüksel Ortam fonksiyon çalıştıktan sonra temizlenir. Örneğin:

    ```js
    function f() {
      let deger1 = 123;
      let deger2 = 456;
    }

    f();
    ```
    Buradaki iki değer teknik olarak Sözcük Ortamının özellikleridir. Fakat `f()` bittikten sonra bu Sözcük Ortamı erişilemez hale gelir, bundan dolayı hafızadan silinir.

- ... Fakat `f` den sonra hala iç içe fonksiyon var ise `[[Environment]]` dıştaki sözcük ortamını canlı tutar:

    ```js
    function f() {
      let deger = 123;

      function g() { alert(deger); }
=======
![](closure-makecounter.svg)

What's different is that, during the execution of `makeCounter()`, a tiny nested function is created of only one line: `return count++`. We don't run it yet, only create.

All functions remember the Lexical Environment in which they were made. Technically, there's no magic here: all functions have the hidden property named `[[Environment]]`, that keeps the reference to the Lexical Environment where the function was created:

![](closure-makecounter-environment.svg)

So, `counter.[[Environment]]` has the reference to `{count: 0}` Lexical Environment. That's how the function remembers where it was created, no matter where it's called. The `[[Environment]]` reference is set once and forever at function creation time.

Later, when `counter()` is called, a new Lexical Environment is created for the call, and its outer Lexical Environment reference is taken from `counter.[[Environment]]`:

![](closure-makecounter-nested-call.svg)

Now when the code inside `counter()` looks for `count` variable, it first searches its own Lexical Environment (empty, as there are no local variables there), then the Lexical Environment of the outer `makeCounter()` call, where it finds and changes it.

**A variable is updated in the Lexical Environment where it lives.**

Here's the state after the execution:

![](closure-makecounter-nested-call-2.svg)

If we call `counter()` multiple times, the `count` variable will be increased to `2`, `3` and so on, at the same place.

```smart header="Closure"
There is a general programming term "closure", that developers generally should know.

A [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)) is a function that remembers its outer variables and can access them. In some languages, that's not possible, or a function should be written in a special way to make it happen. But as explained above, in JavaScript, all functions are naturally closures (there is only one exception, to be covered in <info:new-function>).

That is: they automatically remember where they were created using a hidden `[[Environment]]` property, and then their code can access outer variables.

When on an interview, a frontend developer gets a question about "what's a closure?", a valid answer would be a definition of the closure and an explanation that all functions in JavaScript are closures, and maybe a few more words about technical details: the `[[Environment]]` property and how Lexical Environments work.
```

## Garbage collection

Usually, a Lexical Environment is removed from memory with all the variables after the function call finishes. That's because there are no references to it. As any JavaScript object, it's only kept in memory while it's reachable.

However, if there's a nested function that is still reachable after the end of a function, then it has `[[Environment]]` property that references the lexical environment.

In that case the Lexical Environment is still reachable even after the completion of the function, so it stays alive.

For example:

```js
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // g.[[Environment]] stores a reference to the Lexical Environment
// of the corresponding f() call
```

Please note that if `f()` is called many times, and resulting functions are saved, then all corresponding Lexical Environment objects will also be retained in memory. In the code below, all 3 of them:
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

    *!*
      return g;
    */!*
    }

    let g = f(); // g ulaşılabilir ise, dıştaki sözcük ortamı canlı kalır.
    ```

<<<<<<< HEAD
- Eğer `f()` birçok defa çağırılırsa ve sonuçları kaydedilirse bu kaydedilen Sözcüksel Ortam objeleri de hafızada kalır. Aşağıdaki 3 farklı kodda daha açık bir şekilde gösterilmiştir.
=======
// 3 functions in array, every one of them links to Lexical Environment
// from the corresponding f() run
let arr = [f(), f(), f()];
```
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

    ```js
    function f() {
      let deger = Math.random();

<<<<<<< HEAD
      return function() { alert(deger); };
    }
=======
In the code below, after the nested function is removed, its enclosing Lexical Environment (and hence the `value`) is cleaned from memory:
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

    // 3 functions in array, every of them links to Lexical Environment
    // Dizideki 3 fonksiyon da kendine ait sözcüksel ortama sahiptirler.
    //         LE   LE   LE
    let arr = [f(), f(), f()];
    ```

<<<<<<< HEAD
- Sözcüksel Ortam objesi erişim kalmayınca ölür. Bu iç içe fonksiyonların referansı kalmadığında meydana gelir. Aşağıdaki kodda `g` erişilemez olduğunda `value`'da hafızadan silinir.
    ```js
    function f() {
      let value = 123;

      function g() { alert(value); }

      return g;
    }
=======
  return function() {
    alert(value);
  }
}

let g = f(); // while g function exists, the value stays in memory
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

    let g = f(); // g canlı olursa
    ona karşılık gelen Sözcüksel Ortam'da hayatta kalır.
    
    g = null; // şimdi hafıza temizlendi.
    ```

### Gerçek-hayat Optimizasyonu

Görüldüğü üzere, teoride bir fonksiyon hayatta olduğun sürece onun dışındaki ona bağlı değişkenler de hayatta kalır.

<<<<<<< HEAD
Pratikte ise, JavaScript motoru bunu optimize eder. Değişken kullanımını analiz eder ve eğer dışarıdaki fonksiyonun kullanılmadığı açık ise silinir.
=======
But in practice, JavaScript engines try to optimize that. They analyze variable usage and if it's obvious from the code that an outer variable is not used -- it is removed.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

**An important side effect in V8 (Chrome, Edge, Opera) is that such variable will become unavailable in debugging.**

**Bunun V8 ( Chrome, Opera)'daki yan etkisi ise böyle değişkenlerin debugging sırasında da görünememesidir.

Aşağıdaki örneğin Chrome'da konsolu açarak test ediniz.

Durduğunda konsolda `alert(deger)` komutunu yazınız.

```js run
function f() {
  let deger = Math.random();

  function g() {
<<<<<<< HEAD
    debugger; // konsolda: alert(deger) yazdırın; Böyle bir değişken bulunamamktadır.
=======
    debugger; // in console: type alert(value); No such variable!
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058
  }

  return g;
}

let g = f();
g();
```

Gördüğünüz gibi böyle bir değişken bulunamamaktadır. Teoride, erişilebilir olmalıdır fakat JavaScript motoru bunu optimize etmiştir.

Bu komik debug problemlerine neden olabilir. Bunlardan biri -- beklenenin aksine aynı isme sahip dış değişkenin görülmesi:

```js run global
let deger = "Sürpriz!";

function f() {
  let deger = "En yakın değer";

  function g() {
    debugger; // in console: type alert(value); Surprise!
  }

  return g;
}

let g = f();
g();
```

<<<<<<< HEAD
```warn header="Görüşmek üzere!"

V8'in bu özelliğini bilmekte fayda var. Eğer Chrome/Opera ile ayıklama yapıyorsanız, er geç bu özellikle tanışacaksınız.

Bu ayıklayıcının(debugger) bir problemi değil, V8 motorunun bir özelliğidir. Belki ileride bu özellik değişebilir.
Bu sayfayadaki örneği çalıştırarak her zaman kontrol edebilirsiniz.
```
=======
This feature of V8 is good to know. If you are debugging with Chrome/Edge/Opera, sooner or later you will meet it.

That is not a bug in the debugger, but rather a special feature of V8. Perhaps it will be changed sometime. You can always check for it by running the examples on this page.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058
