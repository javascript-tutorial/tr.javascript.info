
# Closure

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

<<<<<<< HEAD
Bu "Sözcüksel Ortam" iki bölümden oluşur:
=======
**A "variable" is just a property of the special internal object, `Environment Record`. "To get or change a variable" means "to get or change a property of that object".**
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

1. *Ortam Kaydı* -- tüm yerel değişkenleri ve özelliklerini ( ve ek özellikleri `this` gibi ) tutan objedir.
2. *Dış Sözcüksel Ortam*'a referans genelde süslü parantezin dışındaki kod ile ilintilidir.

<<<<<<< HEAD
Öyleyse "değişken" içsel objedeki bir özelliktir, çevresel kayıtlar. "değişkeni almak veya değiştirmek" demek "o objenin özelliğini almak veya değiştirmek" demektir.
=======
![lexical environment](lexical-environment-global.svg)
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

Örneğin, aşağıdaki kodda sadece bir tane Sözcüksel Ortam bulunmaktadır:

![Sözcüksel Ortam](lexical-environment-global.svg)

<<<<<<< HEAD
Buna evrensel sözcük ortamı denilmektedir, kodun tamamıyla alakalıdır. Tüm tarayıcılarda `<script>` etiketleri aynı evrensel ortamı paylaşır.

Yukarıdaki görselde, dikdörtgen ile gösterilen Çevresel Kayıt ( değişken kaynağı ) anlamına gelir ve ok işareti dışsal referanstır. Evrensel Sözcük Ortamından daha dış ortam bulunmamaktadır. Yani `null` dur. 
=======
And that's how it changes when a variable is defined and assigned:

![lexical environment](lexical-environment-global-2.svg)
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

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

<<<<<<< HEAD
![Sözcüksel Ortam](lexical-environment-global-3.svg)
=======
![lexical environment](lexical-environment-global-3.svg)
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

### İç ve dış Sözcüksel Ortamlar

`say()` fonksiyonu çağrısı sırasında dış değişkenler çağrılır, bu olaya daha detaylı bakacak olursak.

<<<<<<< HEAD
Fonksiyon ilk çalıştığında yeni bir Sözcüksel Çevre otomatik olarak yaratılır. Bu tüm fonksiyonlar için genel bir kuraldır. Bu Sözcüksel Çevre yerel değişkenlerin tutulması ve çağrının tüm parametrelerini tutar.
=======
Now let's go on and explore what happens when a function accesses an outer variable.

During the call, `say()` uses the outer variable `phrase`, let's look at the details of what's going on.

When a function runs, a new Lexical Environment is created automatically to store local variables and parameters of the call.

For instance, for `say("John")`, it looks like this (the execution is at the line, labelled with an arrow):
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

<!--
```js
let ifade = "Merhaba";

<<<<<<< HEAD
function say(adi) {
  alert( `${ifade}, ${adi}` );
}
=======
![lexical environment](lexical-environment-simple.svg)
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

say("Ahmet"); // Merhaba, Ahmet
```
-->
`say("Ahmet")` fonksiyonu çalıştığı sırada Sözcüksel Ortam aşağıdaki gibi olur:

![Sözcüksel Çevre](lexical-environment-simple.svg)

Fonksiyon çağrıldığında ise iki tane sözcüksel ortam bulunmaktadır: içte olan(fonksiyon çağrısı için) ve dışta olan(evrensel):

<<<<<<< HEAD
- İçte olan sözcüksel ortam `say` fonksiyonunun o anki durumuna bakar, o anda tek `adi` degiskeni bulunmaktadır. `say("Ahmet")` çağrıldığından dolayı `idi` değişkeninin değeri `"Ahmet"` olur.
- Dış Sözcük Ortamı ise bu durumda Evrensel Sözcük Ortamıdır.

İç Sözcük ortamı `outer` ile Dış Sözcük Ortamına referans olur.
=======
    It has `phrase` variable and the function itself.

The inner Lexical Environment has a reference to the `outer` one.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

**Kod değişkene ulaşmak istediğinde -- önce İç Sözcük ortamında arara, daha sonra dış sözcüm ortamına bakar ve daha sonra daha dıştakine bakar bu şekilde zincirin en sonuna kadar devam eder**

<<<<<<< HEAD
Eğer değişken hiç bir yerde bulunamazsa, sıkı modda hata verir. `use strict` kullanılmazsa tanımsız değişken yeni bir global değişken yaratır.
=======
If a variable is not found anywhere, that's an error in strict mode (without `use strict`, an assignment to a non-existing variable, like `user = "John"` creates a new global variable `user`, that's for backwards compatibility).
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

Arama olayı bizim yazdığımız kodlarda nasıl işliyor buna bakalım:

- `say` içindeki `alert` `adi` değişkenine erişmek istediğinde, anında Sözcük Ortamında bulabilir.
- `ifade`'ye erişmek istediğinde önce fonksiyonun içine bakar fakat orada da bulamayacağından `outer` referansı takip ederek evrensel sözcük ortamından bu değişkene erişebilir.

<<<<<<< HEAD
![Sözcüksel İfade Araması](lexical-environment-simple-lookup.svg)
=======
![lexical environment lookup](lexical-environment-simple-lookup.svg)
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

Şimdi bölümün ilk başında sorulan sorulara cevap bulunabilir.

<<<<<<< HEAD
**Bir fonksiyon dışta bulunan değişkenin en son değerini alır**

Bunun nedeni tanımlanan mekanizmadan dolayıdır. Eski değişkenler bir yere kaydedilmezler. Fonksiyon bunları istediğinde iç sözcük ortamından veya dış sözcük ortamından o anki değeri alır.
=======
**A function gets outer variables as they are now, it uses the most recent values.**

Old variable values are not saved anywhere. When a function wants a variable, it takes the current value from its own Lexical Environment or the outer one.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

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
```


Çalışma akışı şu şekildedir:

1. Evrensel Sözcük ortamında `adi:"Ahmet"` bulunmaktadır.
2. `(*)` satırında evrensel değişken değişir, şimdi `adi:"Mehmet"` bulunmaktadır.
3. `selamVer()` fonksiyonu çalıştığında `adi` dğeişkenini dışarıdan alır. Bu `dış` sözcüksel ortamda değişkenin değeri `"Mehmet"`tir.


```smart header="Bir çağrı -- bir Sözcüksel Ortam"

Fonksiyon Sözcük Ortamı her fonksiyon çağrıldığında yeniden yaratılır.

Eğer fonksiyon bir kaç defa çağırılırsa her çağrıldığında kendine ait ayrı bir Sözcüksel Ortamı olur, tabi bu ortam o anki çağırılmaya ait yerel değişkenleri ve parametreleri tutar.
```

<<<<<<< HEAD
```smart header="Sözcüksel Ortam Şartname Objesidir"

"Sözcüksel Ortam" bir şartname objesidir. Bu objeyi alıp düzenleyemezsiniz veya doğrudan kullanamazsınız. JavaScript motoru yapabildiğince bu değişkenleri optimize etmeye çalışır, kullanılmayan değişkenleri saf dışı bırakabilir fakat görülen davranışları yukarıda anlatıldığı gibi olmalıdır.

=======
```smart header="Lexical Environment is a specification object"
"Lexical Environment" is a specification object: it only exists "theoretically" in the [language specification](https://tc39.es/ecma262/#sec-lexical-environments) to describe how things work. We can't get this object in our code and manipulate it directly. JavaScript engines also may optimize it, discard variables that are unused to save memory and perform other internal tricks, as long as the visible behavior remains as described.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1
```


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

```js run
function sayacUret() {
  let sayac = 0;

  return function() {
    return sayac++; // dışarıda bulunan sayac değişkenine erişimi bulunmaktadır.
  };
}

let sayac = sayacUret();

alert( sayac() ); // 0
alert( sayac() ); // 1
alert( sayac() ); // 2
```
`sayacUret` örneğine bakılacak olursa. "sayac" fonksiyonunu bir sonraki sayı ile döndürür. Basit olmasının yanında biraz modifiye edilmiş hali pratikte kullanılmaktadır [pseudorandom number generator](https://en.wikipedia.org/wiki/Pseudorandom_number_generator). Yani çok suni bir örnek değildir.

Peki sayaç içeride nasıl çalışmakta?

İçteki fonksiyon çalıştığında `sayac++` içeriden dışarıya kadar `sayac` değişkenini arar. Yukarıdaki örneğe bakılacak olursa, sıralama şu şekilde olacaktır:

![](lexical-search-order.svg)

<<<<<<< HEAD
1. İçte bulunan fonksiyonun yerel değişkenleri.
2. Dışta bulunan fonksiyonların değişkenleri.
3. ...Bu evrensel değişkenlere kadar gider.
=======
![](lexical-search-order.svg)
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

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

<<<<<<< HEAD
## Detaylı şekilde ortamların incelenmesi.
=======
Hopefully, the situation with outer variables is clear now. For most situations such understanding is enough. There are few details in the specification that we omitted for brevity. So in the next section we cover even more details.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

Şu anda clouse'ların genel olarak nasıl çalıştığını biliyorsunuz, artık daha derinine inme vakti geldi.

<<<<<<< HEAD
Aşağıda `sayacUret` fonksiyonunun adımları gösterilmektedir, herşeyi anladığınıza emin olun. Basamaklarda göreceğiniz `[[Environment]]` henüz işlenmedi.
=======
Here's what's going on in the `makeCounter` example step-by-step, follow it to make sure that you understand how it works in detail.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

1. Kod çalışmaya başkadığında sadece bir tane Sözcüksel Ortam bulunmaktadır:

    ![](lexenv-nested-makecounter-1.svg)

<<<<<<< HEAD
    Başlangıçta sadece `sayacUret` fonksiyonu bulunmaktadır, çünkü bu fonksiyon tanımıdır. Henüz çalışmadı.
=======
    ![](lexenv-nested-makecounter-1.svg)
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

    Tüm fonksiyonlar başlangıçta gizli bir `[[Environment]]` değişkeni alırlar, bu yaratılmaya dair üretilecek Sözcüksel Çevreye referans olur. Bunun hakkında henüz bilgi verilmedi, fakat teknik olarak bunu fonksiyonun nerede yaratıldığını bilmesi olarak anlayabilirsiniz.

<<<<<<< HEAD
    Burada `sayacUret` Evrensel Sözcüksel Ortamda yaratıldı. Bundan dolayı `[[Environemnt]]` bu ortamın referansıdır.
    
    Diğer bir değişle fonksiyon üretildiğinde Sözcüksel Ortama ait bir "baskı" ile üretilir. Bu `[[Environment]]` gizli bir özellik olarak burayı referans verir.
    
2. Sonrasında kod `sayacUret()` çağrısını yapıyor. Aşağıda `sayacUret()`'in ilk satırı çalıştığındaki durumu gösterilmektedir.
=======
    **All functions "on birth" receive a hidden property `[[Environment]]` with a reference to the Lexical Environment of their creation.**

    We didn't talk about it yet, that's how the function knows where it was made.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

    ![](lexenv-nested-makecounter-2.svg)

    `sayacUret()` fonksiyonu çağrıldığında, bu fonksiyonun değişkenlerini ve argümanlarını tutmak için Sözcüksel Ortam yaratılır.

<<<<<<< HEAD
    Her Sözcüksel Çevre iki şeyi tutar:
    1. Yerel değişkenlere ait Ortamsal Kayıtlar. Bu durumda `let sayac` çalıştırıldığında yerel değişken olarak `sayac` tutulmaktadır.
    
    2. Dış sözcüksel referans, bu fonksiyonun `[[Environment]]`'i dir. Burada `sayacUret` fonksiyonunun `[[Environment]]`'i evrensel sözcüksel ortama referans verir.
 
    Öyleyse şimdi iki tane sözcüksel ortam bulunmaktadır: evrensel olan ve `sayacUret` çağrısını yapan( dış referans verir).
    
3. `sayacUret()` fonksiyonu çalıştığında küçük bir iç fonksiyon yaratılır.

    Fonksiyonun nasıl yaratıldığı yani Fonksiyon Tanımıyla mı yoksa Fonksiyon ifadesiyle mi yaratıldığı önemli değildir. Tüm fonksiyonlar bulunduğu sözcüksel ortama referans eden `[[Environment]]` özelliği ile yaratılırlar. Bundan dolayı en küçük fonksiyon bile bu özelliği içerir.
    
    İçte olan yeni fonksiyon için `[[Environment]]` dğeişkeni var olan `sayacUret`'in Sözcüksel Ortamıdır.( Doğduğu yer )
=======
2. The code runs on, the new global variable `counter` is declared and gets the result of `makeCounter()` call. Here's a snapshot of the moment when the execution is on the first line inside `makeCounter()`:

    ![](lexenv-nested-makecounter-2.svg)
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

    ![](lexenv-nested-makecounter-3.svg)

<<<<<<< HEAD
    Dikkat ederseniz bu basamakta iç fonksiyon yaratıldı fakat çağırılmadı. İçindeki kod `function() { return sayac++; }` çalışmadı, bu kod döndürülecek.
=======
    As all Lexical Environments, it stores two things:
    1. An Environment Record with local variables. In our case `count` is the only local variable (appearing when the line with `let count` is executed).
    2. The outer lexical reference, which is set to the value of `[[Environment]]` of the function. Here `[[Environment]]` of `makeCounter` references the global Lexical Environment.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1


4. Çalışma devam ettiğinde `sayacUret()` biter, sonuc olarak ( küçük iç fonksiyon ) global `counter` değişkenine atanıyor.

    ![](lexenv-nested-makecounter-4.svg)

    Bu fonksiyonun sadece bir satır kodu var: `return sayac++`, sadece bu çalışacaktır.
    
5. `sayac()` çağrıldığında, "boş" bir Sözcüksel Ortam yaratılır. Hiç bir yerel değişkeni yoktur. Fakat `sayac`'ın `[[Environment]]`'i dış referans olarak kullanılır. Bundan dolayı, daha önceden yapılan `sayacUret()`'in değişkenlerine erişebilir. Oluşturulduğu yerder:

<<<<<<< HEAD
    ![](lexenv-nested-makecounter-5.svg)
=======
    ![](lexenv-nested-makecounter-3.svg)
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

    Değişkene erişmesi gerekirse önce kendi yerel sözcüksel ortamına(boş), sonra daha önce çağrılan `sayacUret()`'in sözcüksel ortamına, en son evrensel ortama bakar.
    
    `sayac` için arama yaptığında, en yakınında `sayacUret`'in sözcüksel çevresi bulunmaktadır.
    
    Buradaki hafıza yönetimine dikkat ederseniz. `sayacUret()` çağrısı bittikten bir süre sonra, Sözcüksel ortam hafızada tutulur, çünkü içte bulunan fonksiyonun `[[Environment]]`'i `sayacUret`'e referans vermektedir.
    
    Genel olarak, sözcüksel ortam objesi fonksiyon kullanılabilir olduğu sürece yaşar. Fonksiyon kullanılmadığında silinir.
  

6. `sayac()` sadece `sayac` değişkenini döndürmekle kalmaz, artırırda. Dikkat ederseniz değişiklik sadece "olduğu yerde" yapıldı. Var olan `sayac` değişkeni bulunduğu ortamda değiştirildi.

<<<<<<< HEAD
    ![](lexenv-nested-makecounter-6.svg)
=======
    ![](lexenv-nested-makecounter-4.svg)
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

    Öyleyse bir önceki adıma tek değişiklikle geri dönülmektedir -- `sayac`'ın yeni değeri. Devam eden çağrılar da aynı şekilde çalışırlar.

<<<<<<< HEAD
7. Sonraki `sayac()` da aynısını yapar.

Başlangıçta sorulan ikinci sorunun cevabı şimdi açıklık kazanmış olmalı.

Aşağıda `isim` özelliği `calisanUret()` fonksiyonu tarafından bulunduğu ortamdan kullanılmıştır: 

![](lexenv-nested-work.svg)
=======
5. When `counter()` is called, a new Lexical Environment is created for the call. It's empty, as `counter` has no local variables by itself. But the `[[Environment]]` of `counter` is used as the `outer` reference for it, that provides access to the variables of the former `makeCounter()` call where it was created:

    ![](lexenv-nested-makecounter-5.svg)

    Now when the call looks for `count` variable, it first searches its own Lexical Environment (empty), then the Lexical Environment of the outer `makeCounter()` call, where finds it.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

Sonuç görüşdüğü gibi `"Pete"` olacaktır.

...Fakat eğer `calisanUret()` fonksiyonu içerisinde `let name` tanımlanmamış olsaydı, bu durumda değişkeni arayış evrensel değişkenler ile devam edecekti ve bu durumda sonuç `"John"` olacaktı.

```smart header="Closure"

<<<<<<< HEAD
Genel programlama tanımlarında "closure" adında bir tanım bulunmaktadır. Bunun ile [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)) dıştaki değişkenleri hatırlayabilen ve bunlara erişebilen fonksiyon anlaşılmalıdır. Bazı dillerde, bu mümkün değildir veya fonksiyonun özel bir biçimde yazılması gerekmektedir. Fakat yukarıda görüldüğü üzere tüm fonksiyonlar doğal olarak closure'dur ( bunun sadece bir tane istisnası bulunmaktadır bunu <info:new-function> bölümünde inceleyebilirsiniz.)

Ön yüz için bir görüşmeye gittiğinizde "Closure nedir?" diye sorulursa doğru cevap closure'un tanımın verilip tüm JavaScript fonksiyonlarının aslında closure olduğunun anlatılması ve sonrasında `[[Environment]]` özelliğinden, Sözcüksel Ortamdan bahsedilmesi yeterli olacaktır.
=======
    ![](lexenv-nested-makecounter-6.svg)

7. Next `counter()` invocations do the same.

The answer to the second question from the beginning of the chapter should now be obvious.

The `work()` function in the code below gets `name` from the place of its origin through the outer lexical environment reference:

![](lexenv-nested-work.svg)

So, the result is `"Pete"` here.

But if there were no `let name` in `makeWorker()`, then the search would go outside and take the global variable as we can see from the chain above. In that case it would be `"John"`.

```smart header="Closures"
There is a general programming term "closure", that developers generally should know.

A [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)) is a function that remembers its outer variables and can access them. In some languages, that's not possible, or a function should be written in a special way to make it happen. But as explained above, in JavaScript, all functions are naturally closures (there is only one exclusion, to be covered in <info:new-function>).

That is: they automatically remember where they were created using a hidden `[[Environment]]` property, and all of them can access outer variables.

When on an interview, a frontend developer gets a question about "what's a closure?", a valid answer would be a definition of the closure and an explanation that all functions in JavaScript are closures, and maybe few more words about technical details: the `[[Environment]]` property and how Lexical Environments work.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1
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

<<<<<<< HEAD
Her bir döngü kendine ait Sözcüksel Ortama sahiptir. Eğer değişken `for` içerisinde tanımlanmışsa o sözcüksel ortama yereldir.
=======
For a loop, every iteration has a separate Lexical Environment. If a variable is declared in `for(let ...)`, then it's also in there:
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

```js run
for(let i = 0; i < 10; i++) {
  // Her döngü kendisine ait sözcüksel ortama sahiptir.
  // {i: deger}
}

alert(i); // Hata, böyle bir değişken yoktur.
```

<<<<<<< HEAD
Bu aslında istisnadır, çünkü `let i`, görünürde `{...}` dışındadır. Fakat her döngü kendine ait sözcüksel ortamında `i`'nin o anki değerini içermektedir.
=======
Please note: `let i` is visually outside of `{...}`. The `for` construct is special here: each iteration of the loop has its own Lexical Environment with the current `i` in it.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

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

})();
```

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

<<<<<<< HEAD
Yukarıdaki tüm durumlarda Fonksiyon İfadesi tanımlanır ve doğrudan çalıştırılır.
=======
In all the above cases we declare a Function Expression and run it immediately. Let's note again: nowadays there's no reason to write such code.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

## Garbage Koleksiyonu

Sözcüksel Ortam objeleri aynı normal değerler gibi hafıza yönetimine konu olurlar.

- Genelde, Sözcüksel Ortam fonksiyon çalıştıktan sonra temizlenir. Örneğin:

<<<<<<< HEAD
    ```js
    function f() {
      let deger1 = 123;
      let deger2 = 456;
    }
=======
...But if there's a nested function that is still reachable after the end of `f`, then it has `[[Environment]]` property that references the outer lexical environment, so it's also reachable and alive:

```js
function f() {
  let value = 123;
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

    f();
    ```
    Buradaki iki değer teknik olarak Sözcük Ortamının özellikleridir. Fakat `f()` bittikten sonra bu Sözcük Ortamı erişilemez hale gelir, bundan dolayı hafızadan silinir.

- ... Fakat `f` den sonra hala iç içe fonksiyon var ise `[[Environment]]` dıştaki sözcük ortamını canlı tutar:

    ```js
    function f() {
      let deger = 123;

<<<<<<< HEAD
      function g() { alert(deger); }
=======
Please note that if `f()` is called many times, and resulting functions are saved, then all corresponding Lexical Environment objects will also be retained in memory. All 3 of them in the code below:
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

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
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

    ```js
    function f() {
      let deger = Math.random();

      return function() { alert(deger); };
    }

    // 3 functions in array, every of them links to Lexical Environment
    // Dizideki 3 fonksiyon da kendine ait sözcüksel ortama sahiptirler.
    //         LE   LE   LE
    let arr = [f(), f(), f()];
    ```

- Sözcüksel Ortam objesi erişim kalmayınca ölür. Bu iç içe fonksiyonların referansı kalmadığında meydana gelir. Aşağıdaki kodda `g` erişilemez olduğunda `value`'da hafızadan silinir.
    ```js
    function f() {
      let value = 123;

      function g() { alert(value); }

<<<<<<< HEAD
      return g;
    }
=======
let g = f(); // while g is alive
// their corresponding Lexical Environment lives
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

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
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

**An important side effect in V8 (Chrome, Opera) is that such variable will become unavailable in debugging.**

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
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1
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

```warn header="Görüşmek üzere!"

V8'in bu özelliğini bilmekte fayda var. Eğer Chrome/Opera ile ayıklama yapıyorsanız, er geç bu özellikle tanışacaksınız.

Bu ayıklayıcının(debugger) bir problemi değil, V8 motorunun bir özelliğidir. Belki ileride bu özellik değişebilir.
Bu sayfayadaki örneği çalıştırarak her zaman kontrol edebilirsiniz.
```
