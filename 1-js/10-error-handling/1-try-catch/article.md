# Hataları idare etme, "try..catch"

<<<<<<< HEAD
Programlarken ne kadar mükemmel olmaya çalışsak da bazen kodumuzda hatalar olabilir. Bu bizim hatalarımızdan dolayı olabileceği gibi, kullanıcı girişlerinden, beklenmeyen server cevaplarından veya binlerce farklı nedenden dolayı oluşabilir.
=======
No matter how great we are at programming, sometimes our scripts have errors. They may occur because of our mistakes, an unexpected user input, an erroneous server response, and for a thousand other reasons.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

Genelde kodda bir hata olduğunda yazdığımız kod bir adım ileriye gidemeden sona erer ve konsola bunun nedenini yazar.

<<<<<<< HEAD
Hataları "yakalamak" için "try..catch" kullanarak doğrudan kodun ölmesine aman vermek yerine daha mantıklı şeyler yaptırabiliriz.
=======
But there's a syntax construct `try..catch` that allows us to "catch" errors so the script can, instead of dying, do something more reasonable.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

[cut]

## "try..catch" yazımı

`try..catch` yapısı iki ana bloktan oluşur: `try` ( dene ) ve sonrasında `catch` ( yakala ):

```js
try {

  // kod...

} catch (err) {

  // hataları idare et.

}
```

Çalışması aşağıdaki gibidir:

1. Önce `try {...}` içerisindekiler çalıştırılır.
2. Eğer hata yoksa `catch(err)` görmezden gelinir: çalışma try'ın sonuna ulaşır ve sonra `catch`'i atlar.
3. Eğer hata meydana gelirse, `try`'ın çalışması durdurulur ve `catch(err)` çalışmaya başlar. Buradaki `err` değişkeni ne olduda hata meydana geldiye dair detayları tutan bir objedir.

<<<<<<< HEAD
![](try-catch-flow.svg)

Öyleyse `try {...}` içerisindeki kod doğrudan sona eremez, bize `catch` içerisinde bunu idare etmemiz için olanak sağlar.

Bir kaç örnek ile daha da pekiştirelim:

=======
1. First, the code in `try {...}` is executed.
2. If there were no errors, then `catch(err)` is ignored: the execution reaches the end of `try` and goes on, skipping `catch`.
3. If an error occurs, then the `try` execution is stopped, and control flows to the beginning of `catch(err)`. The `err` variable (we can use any name for it) will contain an error object with details about what happened.

![](try-catch-flow.svg)

So, an error inside the `try {…}` block does not kill the script -- we have a chance to handle it in `catch`.

Let's look at some examples.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

- Hatasız örnek:  `alert` `(1)` ve `(2)`'yi gösterir:

    ```js run
    try {

      alert('try başladı');  // *!*(1) <--*/!*

      // ...no errors here

      alert('try bitti');   // *!*(2) <--*/!*

    } catch(err) {

      alert('Catch görmezden gelindi çünkü bir hata meydana gelmedi.'); // (3)

    }
<<<<<<< HEAD

    alert("...Kod normal çalışmasına devam etti.");
=======
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058
    ```

- Hatalı örnek: `(1)` ve `(3)`'ü gösterir:

    ```js run
    try {

      alert('try başladı');  // *!*(1) <--*/!*

    *!*
      lalala; // hata,  değişken tanımlı değil!
    */!*

      alert('try bitti (hiç erişilemedi)');  // (2)

    } catch(err) {

      alert(`Hata meydana geldi!`); // *!*(3) <--*/!*

    }
<<<<<<< HEAD

    alert("...Kod normal çalışmasına devam etti.");
=======
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058
    ```


````warn header="`try..catch` sadece çalışma zamanlı hatalar içindir"
`try..catch`'in çalışabilmesi için kod çalışabilir olmalıdır. Diğer bir deyişle geçerli bir JavaScript kodu olmalıdır.

Eğer kod yazımsal olarak hatalıysa çalışmayacaktır, örneğin süslü parantezler açılmış ama kapatılmamışsa:

```js run
try {
  {{{{{{{{{{{{
} catch(e) {
  alert("JavaScript motoru bunu anlayamaz, çünkü geçerli bir kod değildir.");
}
```

<<<<<<< HEAD
JavaScript motoru önce kodu okur, sonra çalıştırır. Eğer hata okuma safhasında meydana gelirse bunlara "ayrıştırma-zamanı" hataları denir ve kurtarılamaz hatalardır. Bundan dolayı JavaScript motoru bunları anlayamaz.

Bundan dolayı `try..catch` ancak ve ancak gerçerli kodlarda oluşacak hataları idare edebilir. Bu hatalara "çalışma zamanı hataları" veya bazen "istisnalar"(Exception) denilmektedir.
=======
The JavaScript engine first reads the code, and then runs it. The errors that occur on the reading phase are called "parse-time" errors and are unrecoverable (from inside that code). That's because the engine can't understand the code.

So, `try..catch` can only handle errors that occur in valid code. Such errors are called "runtime errors" or, sometimes, "exceptions".
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058
````


````warn header="`try..catch` Senkronize olarak çalışmaktadır"
Eğer "zamanlanmış" bir kodda, `setTimeout` gibi, bir hata meydana gelirse `try..catch` bunu yakalayamaz:

```js run
try {
  setTimeout(function() {
    noSuchVariable; // kod burada ölecektir.
  }, 1000);
} catch (e) {
  alert( "çalışmaz" );
}
```
Bunun nedeni `try..catch`'in aslında fonksiyonu zamanlayan `setTimeout`'u kapsamasıdan dolayıdır. Fakat fonksiyon daha sonra çlışır. O anda aslında motor `try..catch`i geçmiş olur.

Eğer zamanlanmış fonksiyon içerisinde bu hatayı yakalamak istiyorsanız, `try..catch` bloğunu fonksiyonun içerisine yazmalısınız:

```js run
setTimeout(function() {
  try {    
    noSuchVariable; // try..catch hataları yakalayacaktır.
  } catch (e) {
    alert( "hata burada yakalandı!" );
  }
}, 1000);
```
````

## Hata Objesi

Hata meydana geldiğinde, JavaScript bu hata ile ilgili bir obje yaratır. Sonrasında bu obje `catch`'e argüman olarak gönderilir:

```js
try {
  // ...
} catch(err) { // <-- the "error object", could use another word instead of err
  // ...
}
```
Tüm varsayılan hatalar için, `catch` içerisinde hata objesi iki ana özelliği taşır:

<<<<<<< HEAD
`isim` (name)
: Hata ismi. Tanımsız değerler için bu `"ReferenceError"`'dur.

`mesaj` (message)
: Hatanın detayları hakkında anlaşılır bilgi verir.
=======
For all built-in errors, the error object has two main properties:

`name`
: Error name. For instance, for an undefined variable that's `"ReferenceError"`.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

Çoğu ortamda standart olmayan başka özellikler de bulunmaktadır. Bunlardan en fazla kullanılan ve desteklenen:

`stack`
: O anki çağrı yığını: Hataya neden olan fonksiyon zincirini belirtir. Genelde hata ayıklama amacıyla kullanılır.

Örneğin:

```js run untrusted
try {
*!*
  lalala; // hata, değişken tanımlı değil!
*/!*
} catch(err) {
  alert(err.name); // ReferenceError
<<<<<<< HEAD
  alert(err.message); // lalala tanımlı değil
  alert(err.stack); // ReferenceError: lalala şurada tanımlanmadı ...
=======
  alert(err.message); // lalala is not defined
  alert(err.stack); // ReferenceError: lalala is not defined at (...call stack)
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

  // ayrıca hatayı tümüyle göstermek de mümkündür.
  // hata karakter dizisine "name:message" gibi çevirildi.
  alert(err); // ReferenceError: lalala tanımlı değil
}
```


<<<<<<< HEAD
## `try..catch` kullanımı
=======
If we don't need error details, `catch` may omit it:

```js
try {
  // ...
} catch { // <-- without (err)
  // ...
}
```
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

Gerçek hayatta `try..catch`'ın nasıl kullanılabileceğine bakalım.

Bildiğiniz gibi, JavaScript [JSON.parse(str)](mdn:js/JSON/parse) metodu sayesinde JSON olarak tanımlanmış değerlerin okunmasına olanak tanır.

Genelde ağ üzerinden başka bir serverdan veya kaynaktan gelen verinin okunmasında kullanılır.

<<<<<<< HEAD
Bu veriyi aldıktan sonra `JSON.parse` ile şu şekilde okuyabiliriz:
=======
Usually it's used to decode data received over the network, from the server or another source.

We receive it and call `JSON.parse` like this:
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

```js run
let json = '{"name":"John", "age": 30}'; // sunucudan gelen veri.

*!*
let user = JSON.parse(json); // bu veriyi JS objesine dönüştür.
*/!*

//Artık user karakter dizisinden oluşan objelere sahiptir.
alert( user.name ); // John
alert( user.age );  // 30
```
JSON hakkında daha derin bilgiyi <info:json> bölümünden öğrenebilirsiniz.

**Eğer `json` düzgün gelmiyorsa `JSON.parse` hata üretir ve kod anında "ölür".**

<<<<<<< HEAD
Bunun ile yetinmeli miyiz? Elbette hayır
=======
Should we be satisfied with that? Of course not!
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

Bu şekliyle eğer gelen veride bir hata varsa ziyaretçi nerede yanlış olduğunu bilemeyecektir. İnsanlar hata olduğunda herhangi bir hata mesajı almadan öylece ölen bir şeyden nefret ederler.

Bunun çözümü için `try..catch` kullanılabilir:

```js run
let json = "{ bad json }";

try {

*!*
  let user = JSON.parse(json); // <-- when an error occurs...
*/!*
  alert( user.name ); // doesn't work

} catch (e) {
*!*
  // ...çalışma buradan devam eder.
  alert( "Kusura bakmayın, veride hata var.Talep tekrar yapacaktır" );
  alert( e.name );
  alert( e.message );
*/!*
}
```
Burada `catch` bloğu sadece mesajı göstermek için kullanılmıştır. Fakat burada ağ talebi, kullanıcıya başka bir yöntem sunma, loglama için hata loginin tutulması gibi işlemler yapılabilir.

## Kendi hatalarımızı atma

Diyelim ki `json` yazım olarak doğru da `"name"` özelliğini olması gerekirken yoksa ?

Aşağıdaki gibi:

```js run
let json = '{ "age": 30 }'; // verinin bütünlüğünde problem var.

try {

  let user = JSON.parse(json); // <-- hata yok
*!*
  alert( user.name ); // ama isim de yok!
*/!*

} catch (e) {
  alert( "çalışmaz" );
}
```
Burada `JSON.parse` doğru bir şekilde çalışır, `"name"`'in olmaması aslında bir sorundur.

Hata idaresini birleştirmek adına burada `throw` operatörü kullanılacaktır.

### "Throw" operatörü

`throw` operatörü hata oluşturur.

Yazımı şu şekildedir:

```js
throw <error object>
```
Teknik olarak herşeyi hata objesi olarak kullanmak mümküdür. Hatta bu ilkel tipler olan sayı, karakter dizisi gibi yapılar da olabilir. Fakat obje kullanmak, daha sı `name` ve `message` özelliklerine sahip obje kullanmak daha iyidir. ( Böylece gömülü gelen hatalar ile uyumlu olacaktır.)

JavaScript bir çok standart hataya sahitir:`Error`, `SyntaxError`, `ReferenceError`, `TypeError` vs. Bunları kullanarak da hata objesiyaratmak mümkündür.

Yazımı:

```js
let error = new Error(message);
// or
let error = new SyntaxError(message);
let error = new ReferenceError(message);
// ...
```

Gömülü hatalar ( objeler değil sadece hatalar ) `name` özelliği yapıcının aynı isme sahip özelliğindne meydana gelir. `message` ise argümandan alınır.

Örneğin:

```js run
let error = new Error("Birşeyler oldu o_O");

alert(error.name); // Error
alert(error.message); // Birşeyler oldu o_O
```
`JSON.parse` ne tarz hatalar üretti bakalım:

```js run
try {
  JSON.parse("{ bad json o_O }");
} catch(e) {
*!*
  alert(e.name); // SyntaxError
*/!*
  alert(e.message); // Unexpected token b in JSON at position 2
}
```

Gördüğünüz gibi bu `SyntaxError` yani yazım yanlışıdır.

<<<<<<< HEAD
Bizim durumumuzda ise `name`'in olmaması yazım hatası olarak tanımlanabilir. 
Bunu isimsiz öğretmen olmayacağından yazı  hatası olarak tanımlayabiliri.
=======
And in our case, the absence of `name` is an error, as users must have a `name`.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

atacak olursak:

```js run
let json = '{ "yaş": 30 }'; // incomplete data

try {

  let user = JSON.parse(json); // <-- hata yok

  if (!user.name) {
*!*
    throw new SyntaxError("Tanımlanmamış veri:isim yok"); // (*)
*/!*
  }

  alert( user.name );

} catch(e) {
  alert( "JSON Error: " + e.message ); // JSON Error: Tanımlanmamış veri:isim yok
}
```

`(*)` satırında `throw` operatörü verilen `message` ile bir `SyntaxError` hatası verir. Bu JavaScript'in hata oluşturmasına benzemektedir. `try`'ın çalışması akışta anında durur ve `catch` bölümüne atlar.

Artık `catch` tüm hata idaresinin yapılacağı yerdir: Buna `JSON.parse` ve diğer durumlar dahildir.

## Tekrar atma ( Rethrowing )

<<<<<<< HEAD
Yukarıdaki örnekte yanlış veri ile başa çıkmak için `try..catch` kullandık. Peki başka beklenmeyen hata varsa ne yapacağız? Mesela değişken tanımsız olabilir veya bilmediğimiz bir hata ile de karşılaşabiliriz.

Şu şekilde:
=======
In the example above we use `try..catch` to handle incorrect data. But is it possible that *another unexpected error* occurs within the `try {...}` block? Like a programming error (variable is not defined) or something else, not just this "incorrect data" thing.

For example:
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

```js run
let json = '{ "age": 30 }'; // tamamlanmamış veri

try {
  user = JSON.parse(json); // <-- user'dan önce  "let" kullanmayı unuttuysak

  // ...
} catch(err) {
  alert("JSON Error: " + err); // JSON Error: ReferenceError: user is not defined
  // (hata aslında JSON ile alakalı değil)
}
```
Tabiki herşey mümkün! Programcılar da hata yapar. Yıllardır milyonlarca kişinin kullandığı open-source projelerde bile hata vardır. Hatta öyle hatalar vardır ki bulunduğunda çok büyük belaya neden olabilir ( `ssh`'ta bulunan hata)

Biz denemelerimizde `try..catch`i "doğru olmayan veri"'yi yakalamak için kullandık. Fakat aslında `catch` `try`'da olabilecek *tüm* hataları alır.Yukarıdaki örnekte beklenmeyecen bir hata almasına rağmen bundan dolayı `"JSON Error" mesajı verir. Bu aslında kod ayıklamayı zorlaştıran birşeydir ve yanlış kullanımdır.

<<<<<<< HEAD
Yine de ne hatası olduğunu `name`'den çıkarmak mümkündür.
=======
In our case, `try..catch` is placed to catch "incorrect data" errors. But by its nature, `catch` gets *all* errors from `try`. Here it gets an unexpected error, but still shows the same `"JSON Error"` message. That's wrong and also makes the code more difficult to debug.

To avoid such problems, we can employ the "rethrowing" technique. The rule is simple:

**Catch should only process errors that it knows and "rethrow" all others.**

The "rethrowing" technique can be explained in more detail as:

1. Catch gets all errors.
2. In the `catch(err) {...}` block we analyze the error object `err`.
3. If we don't know how to handle it, we do `throw err`.

Usually, we can check the error type using the `instanceof` operator:
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

```js run
try {
  user = { /*...*/ };
} catch(err) {
*!*
<<<<<<< HEAD
  alert(e.name); // "ReferenceError" tanımsız değişkene erişim hatası
=======
  if (err instanceof ReferenceError) {
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058
*/!*
    alert('ReferenceError'); // "ReferenceError" for accessing an undefined variable
  }
}
```

<<<<<<< HEAD
Kural basit:

**Catch sadece bildiği hataları işlemeli diğerlerini ise tekrar hata olarak atmalı**

"tekrar atma" tekniği şu şekilde detaylandırılabilir:

1. Catch tüm mesajları alır
2. `catch(err){...}` bloğunda tüm error objesi analiz edilir.
3. Eğer beklemediğimiz bir hata ise bu `throw err` ile tekrar atılır.
=======
We can also get the error class name from `err.name` property. All native errors have it. Another option is to read `err.constructor.name`.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

Aşağıdaki kodda `catch` sadece `SyntaxError`'ü idare etmektedir:

```js run
let json = '{ "age": 30 }'; // tamamlanmamış veri
try {

  let user = JSON.parse(json);

  if (!user.name) {
    throw new SyntaxError("tamamlanmamış veri: isim yok");
  }

*!*
  blabla(); // beklenmeyen hata
*/!*

  alert( user.name );

} catch(e) {

*!*
<<<<<<< HEAD
  if (e.name == "SyntaxError") {
    alert( "JSON Hatası: " + e.message );
=======
  if (e instanceof SyntaxError) {
    alert( "JSON Error: " + e.message );
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058
  } else {
    throw e; // tekrar at (*)
  }
*/!*

}
```
`try..catch` içerisinde eğer `(*)` hata tekrar atılırsa bu `try..catch` in dışına taşar. Bu daha üstte bulunan başka bir `try..catch` tarafından yakalanması gerekmektedir. Böyle bir ihtimal yoksa kod burada sona ermelidir.

Böylece `catch` bloğu aslında sadece bildiği hataları idare eder ve diğerlerini hiç kontrol etmeden paslar diyebiliriz.

Aşağıdaki örnekte bu hatalar nasıl bir `try..catch` seviyesi daha eklenerek idare edilebilir bunu göreceğiz:

```js run
function readData() {
  let json = '{ "age": 30 }';

  try {
    // ...
*!*
    blabla(); // error!
*/!*
  } catch (e) {
    // ...
    if (!(e instanceof SyntaxError)) {
*!*
      throw e; // tekrar at! Nasıl idare edileceğini bilmiyor.
*/!*
    }
  }
}

try {
  readData();
} catch (e) {
*!*
  alert( "External catch got: " + e ); // burada yakala!
*/!*
}
```
Burada `readData` sadece `SyntaxError` ile nasıl başa çıkacağını biliyor. Bunun yanında dıştaki `try..catch` ise geri kalan herşeyi idare ediyor.

## try..catch..finally

Aslında tamamı bu kadar değil!

`try..catch` bloğu son olarak `finally` ile bitebilir.

Eğer varsa aşağıdaki durumların hepsi için çalışır:

- `try` sonrası bir hata yoksa.
- `catch` sonrası bir hata yoksa.

Yazımı şu şekildedir:

```js
*!*try*/!* {
   ... try to execute the code ...
} *!*catch*/!*(e) {
   ... handle errors ...
} *!*finally*/!* {
   ... execute always ...
}
```

Aşağıdaki kodu çalıştırmayı deneyiniz:

```js run
try {
  alert( 'try' );
  if (confirm('Make an error?')) BAD_CODE();
} catch (e) {
  alert( 'catch' );
} finally {
  alert( 'finally' );
}
```

Kod iki türlü çalışabilir:

1. Eğer "Make an error?"'a "Yes" cevabını verirseniz, `try -> catch -> finally` şeklinde sona erer.
2. Eğer "No" derseniz `try-> finally` şeklinde sona erer.

`finally` genelde `try..catch`'den önce birşey yapıp bunu sona erdirmek ( finally ) istediğiniz durumlarda kullanılır.

Örneğin Fibonacci sayılarını hesaplayan bir fonksiyonun ne kadar sürdüğünü ölçmek istediğinizde, doğal olarak işlem başlamadan süre başlar ve işlem bittikten sonra süre biter. Fakat diyelimki fonksiyonda bir hata var. Aşağıda uygulaması görünen `fib(n)`'e negatif bir sayı gönderdiğinizde veya integer olmayan bir sayı gönderdiğinizde hata döner.

`finally` ne olursa olsun süre ölçmeyi sonlandırmak için harika bir yerdir.

Aşağıda `finally` düzgün veya yanlış çalışan `fib` fonksiyonunun ne kadar sürdüğünü doğru olarak hesaplamamızı sağlar. 

```js run
let num = +prompt("Enter a positive integer number?", 35)

let diff, result;

function fib(n) {
  if (n < 0 || Math.trunc(n) != n) {
    throw new Error("Must not be negative, and also an integer.");
  }
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();

try {
  result = fib(num);
} catch (e) {
  result = 0;
*!*
} finally {
  diff = Date.now() - start;
}
*/!*

alert(result || "error occured");

alert( `execution took ${diff}ms` );
```

<<<<<<< HEAD
Kodu çalıştırdığınızda `35` değeri girerseniz normal olarak `try` sonrasında `finally` sırası ile çalışır. Sonrasında `-1` ile deneyin, anında hata alacaksınız. Çalışma süresi `0ms` gösterecek. İki çalışmada da süre doğru bir şekilde tutuldu.
=======
You can check by running the code with entering `35` into `prompt` -- it executes normally, `finally` after `try`. And then enter `-1` -- there will be an immediate error, and the execution will take `0ms`. Both measurements are done correctly.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

Diğer bir deyişle, fonksiyondan çıkmanın iki yolu verdir. Bunlar `return` veya `throw` olabilir. `finally` ise bunların ikisini de idare edebilir.


```smart header="Değişkenler `try..catch..finally` içerisinde yereldir"

<<<<<<< HEAD
Dikkat ederseniz `result` ve `diff` değişkenleri `try..catch`'den *önce* tanımlanmışlardır.

Diğer türlü `let` `{...}` bloğunun içerisinde olsaydı, sadece parantez içerisinde görünür olurdu.
=======
Otherwise, if we declared `let` in `try` block, it would only be visible inside of it.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058
```

````smart header="`finally` ve `return`"

Finally kelimesi `try..catch`'den her türlü çıkış ile çalışır. Bu doğrudan `return` için de geçerlidir.

Aşağıdaki örnekte `try` içerisinde `return` bulunmaktadır. Bu durumda `finally` sonuç dış koda iletilmeden önce çalışır.

```js run
function func() {

  try {
*!*
    return 1;
*/!*

  } catch (e) {
    /* ... */
  } finally {
*!*
    alert( 'finally' );
*/!*
  }
}

alert( func() ); // önce finally içerisindeki alert çalışır sonra bu.
```
````

````smart header="`try..finally`"

<<<<<<< HEAD
`catch` olmadan hazırlanan `try..finally` yapısı da kullışlıdır. Bunu henelde hatayı o anda idare etmek istemediğimizde kullanırız, bunun ile birlikte başladığımız işlemin bittiğini de garanti altına almak isteriz.
=======
The `try..finally` construct, without `catch` clause, is also useful. We apply it when we don't want to handle errors here (let them fall through), but want to be sure that processes that we started are finalized.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

```js
function func() {
  // tamamlanması gereken bir işlemi başlat. ( süre ölçme gibi )
  try {
    // ...
  } finally {
    // ne olursa olsun bitir.
  }
}
```
<<<<<<< HEAD
Yukarıdaki kodda `try` içerisinde olacak herhangi bir hata doğrudan dışarı çıkacaktır. Akış dışarı sıçramadan önce `finally` çalışır.
=======
In the code above, an error inside `try` always falls out, because there's no `catch`. But `finally` works before the execution flow leaves the function.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058
````

## Genel Hataları Yakalama

```warn header="Ortam-özel"
Aşağıdaki bölüm aslında JavaScript çekirdeğinde bulunmamaktadır.
```

<<<<<<< HEAD
Diyelim ki `try..catch`'in dışında bir hata ile karşılaştınız ve kodunuz sona erdi. Bu programlama hatası veya başka bir hata olabilir.

Böyle bir durumda ne yapmak lazım? Hataları loglayabilir, kullanıcıya bir hata gösterebiliriz.

Aslında şartnamede bunun ile ilgili bir belirti bulunmasa da çoğu ortam bunu temin eder. Örneğin Node.JS bunun için [process.on('uncaughtException')](https://nodejs.org/api/process.html#process_event_uncaughtexception)'i kullanır. Tarayıcıda [window.onerror](mdn:api/GlobalEventHandlers/onerror)' özelliğine bir fonksiyon tanımlanabilir. Bu yakalanmayan bir hata olduğunda çalışacaktır.
=======
Let's imagine we've got a fatal error outside of `try..catch`, and the script died. Like a programming error or some other terrible thing.

Is there a way to react on such occurrences? We may want to log the error, show something to the user (normally they don't see error messages), etc.

There is none in the specification, but environments usually provide it, because it's really useful. For instance, Node.js has [`process.on("uncaughtException")`](https://nodejs.org/api/process.html#process_event_uncaughtexception) for that. And in the browser we can assign a function to the special [window.onerror](mdn:api/GlobalEventHandlers/onerror) property, that will run in case of an uncaught error.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

Yazımı:

```js
window.onerror = function(message, url, line, col, error) {
  // ...
};
```

`message`
: Hata Mesajı

`url`
: Hatanın hangi URL'de meydana geldiği.

`line`, `col`
: Hangi satır ve sütunda hatanın meydana geldiği.

`error`
: Hata objesi.

Örneğin:

```html run untrusted refresh height=1
<script>
*!*
  window.onerror = function(message, url, line, col, error) {
    alert(`${message}\n At ${line}:${col} of ${url}`);
  };
*/!*

  function readData() {
    badFunc(); // hata meydana geldi!
  }

  readData();
</script>
```

`window.onerror` genel hata işleyicisinin görevi aslında kodu kurtarmak değildir. Bu anda kodu kurtarmak imkansızdır, bunun yerine geliştiriciye mesaj gönderebilir.

Bu hataları izlemek için aslında bazı servisler mevcuttur. Bunlardan bazıları <https://errorception.com>, <http://www.muscula.com>'dır.

Aşağıdaki gibi çalışırlar:

<<<<<<< HEAD
1. Servise kayıt olunur ve yazdığımız koda yerleştirmek için bir kod parçası alınır.
2. Bu JS içerisinde bir çeşit `window.onerror` uygulaması mevcuttur.
3. Hata meydana geldiğinde, bu servise ağ üzerinden bir istekte bulunur.
3. Servise tekrar giriş yaptığınızda arayüzde bu hataları görürsünüz.
=======
1. We register at the service and get a piece of JS (or a script URL) from them to insert on pages.
2. That JS script sets a custom `window.onerror` function.
3. When an error occurs, it sends a network request about it to the service.
4. We can log in to the service web interface and see errors.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

## Özet

`try..catch` yapısı çalışma zamanlı hataları idare eder. Tam olarak kodu çalıştırmaya çalışır ve hataları yakalar.

Yazımı:

```js
try {
  // bu kodu çalıştır
} catch(err) {
  // eğer hata varsa, buraya atla
  // err hata objesi
} finally {
  // try/catch'den sonra her halükarda burayı çalıştır.
}
```
`catch` bölümü veya `finally` bölümü olmadan da çalışır. `try..catch`, `try..finally`'de doğru kullanımdır.

<<<<<<< HEAD
Hata objeleri şu özellikleri taşır:

- `message` -- insan tarafından okunabilir hata mesajı
- `name` -- hatanın ismi 
- `stack` ( standart değil ) - hatanın oluştuğu andaki yığın. Hatanın nedenini bulmak için yararlı bir özellik.
=======
There may be no `catch` section or no `finally`, so shorter constructs `try..catch` and `try..finally` are also valid.

Error objects have following properties:

- `message` -- the human-readable error message.
- `name` -- the string with error name (error constructor name).
- `stack` (non-standard, but well-supported) -- the stack at the moment of error creation.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058


`throw` kullanarak biz de kendi hatalarımızı oluşturabiliriz. Teknik olarak, `throw`'un argümanları herşey olabilir. Fakat genelde `Error` sınıfından türemesi ve özelliklerini alması iyi bir yoldur. Bunları nasıl genişleteceğinizi bir sonraki bölümde görebilirsiniz.

<<<<<<< HEAD
Tekrar atma hata idaresi için temel bir desendir: bir `catch` bloğu her zaman hangi hataların geleceğini ve buna göre ne yapması gerektiğini bilmeli, eğer bilmiyorsa bu hatayı tekrar atmalıdır.

`try..catch` olmasa bile çoğu ortam "genel" bir hata idarecisi oluşturmamızı sağlar. Böylece gözden kaçan hatalar burada yakalanabilir. Tarayıcı için bu `window.onerror`'dur.
=======
*Rethrowing* is a very important pattern of error handling: a `catch` block usually expects and knows how to handle the particular error type, so it should rethrow errors it doesn't know.

Even if we don't have `try..catch`, most environments allow us to setup a "global" error handler to catch errors that "fall out". In-browser, that's `window.onerror`.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058
