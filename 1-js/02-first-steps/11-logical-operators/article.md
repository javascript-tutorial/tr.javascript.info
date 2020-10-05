# Mantıksal Operatörler

JavaScript dilinde üç tane mantıksal operatör bulunmaktadır: `||` (OR - VEYA ), `&&`(AND - VE ), `!` (NOT - DEĞİL )

Mantıksal operatörler olarak adlandırılsalar bile, her tipteki değer için uygulanabilirler. Sadece boolean ( doğru-yanlış) değerleri için değil. Sonuçta her tipte olabilir.


Detaylarına bakılacak olursa:

## || (OR - VEYA)

"OR","VEYA" operatörü iki dikey çizgiden oluşur.

```js
sonuc = a || b;
```

Klasik programlamada, mantıksal VEYA sadece boolean verileri değiştirme için kullanılır. Eğer iki değerden biri `true` ise sonuç `true` döner. Diğer türlü sonuç `false` döner.

JavaScript'te ise bu biraz daha karmaşık ve daha güçlü. Fakat önce boolean değerlere ne oluyor buna bakalım.

Dört farklı mantıksal kombinasyon bulunmakta:

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```
Her iki tarafın da `false` olmadığı her durumda sonuç `true` olmakta.

Eğer operanda yani işleme giren değerler boolean değil ise boolean değere çevrilir.

Örneğin, sayı olan 1 `true` demek sayı olan 0 ise `false` demektir.

```js run
if (1 || 0) { // ( true || false ) ile aynı anlama gelir
  alert( 'Doğru!' );
}
```


Çoğu zaman, VEYA `||` `if` yapısı içerisinde kullanılır. *Herhangi biri* doğruysa yap anlamı taşımaktadır.

Örneğin:

```js run
let saat = 9;

*!*
if (saat < 10 || saat > 18) {
*/!*
  alert( 'Ofis Kapalı' );
}
```
Bir çok şart cümlesi ile if yapısını kurabilirsiniz.

```js run
let saat = 12;
let haftaSonu = true;

if (saat < 10 || saat > 18 || haftaSonu) {
  alert( 'Ofis Kapalı.' ); // Haftasonu
}
```

<<<<<<< HEAD
## VEYA ilk doğru değeri arar
=======
## OR "||" finds the first truthy value
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

Yukarıda belirtilen mantık klasik mantıktır. JavaScript'in "ekstra" özelliklerine bakılacak olursa

Geliştirilmiş algoritma şu şekildedir.

Birden fazla VEYA ile yapılmış if yapısı:


```js
sonuc = deger1 || deger2 || deger3;
```

VEYA `"||"` operatörü şunları yapar:

- Soldan sağa olacak şekilde operandları değerlendirir.
- Her operandın değerini boolean'a çevirir. Eğer sonuç `doğru` ise durur ve o operandın orjinal değerini döner.
- Eğer tüm operandlar kontrol edildi ve tamamı yanlış ise son operandı döner.

<<<<<<< HEAD
Eğer VEYA zincirinde bir tane doğru bulunursa o an dönülür. Eğer bulunamazsa sonuncusu döner.
=======
In other words, a chain of OR `||` returns the first truthy value or the last one if no truthy value is found.
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

Örneğin:

```js run
<<<<<<< HEAD
alert( 1 || 0 ); // 1 (1 doğru)
alert( true || 'önemsiz' ); // (true doğru)

alert( null || 1 ); // 1 (1 tek doğru veri)
alert( null || 0 || 1 ); // 1 (1 tek doğru veri)
alert( undefined || null || 0 ); // 0 (Hepsi yanlış sonuncusunu döner)
=======
alert( 1 || 0 ); // 1 (1 is truthy)

alert( null || 1 ); // 1 (1 is the first truthy value)
alert( null || 0 || 1 ); // 1 (the first truthy value)

alert( undefined || null || 0 ); // 0 (all falsy, returns the last value)
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
```

Bu klasik "boolean" VEYA tanımını aşarak ilginç kullanımlara neden olmaktadır.

1. **Değişken veya ifadeler dizisinde ilk doğru(true) değeri bulmak için**

<<<<<<< HEAD
    Düşünün bir diziniz var ve içinde `null/undefined` değerler barındırmakta. Siz ilk veriyi bulduğunuzda döndermek istiyorsunuz.

    Bunun için `||` kullanabilirsiniz:

    ```js run
    let simdikiKullanici = null;
    let varsayilanKullanici = "Akif";

    *!*
    let isim = simdikiKullanici || varsayilanKullanici || "isimsiz";
    */!*

    alert( isim ); // "Akif" seçilir – ilk doğru değeri bulduğundan dolayı buradan dönülür ve ekrana "Akif" çıkar.
=======
    For instance, we have `firstName`, `lastName` and `nickName` variables, all optional (i.e. can be undefined or have falsy values).

    Let's use OR `||` to choose the one that has the data and show it (or `"Anonymous"` if nothing set):

    ```js run
    let firstName = "";
    let lastName = "";
    let nickName = "SuperCoder";

    *!*
    alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder
    */!*
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
    ```
    
    Eğer `simdikiKullanici` ve `varsayilanKullanici` yanlış(false) olsaydı `"isimsiz"` yazısı ekrana çıkacaktı.

<<<<<<< HEAD
2. **Kısa devre değerlendirmesi**
    
    Operantlar sadece değer değil ifade de olabilir. VEYA testlerini soldan sağa doğru yapar. Doğru değer bulunduğunda döndürülür. Bu olaya kısa devre değerlendirmesi denir, çünkü soldan sağa en kısa yoldan gitmektedir.

    Tabi bunun ifadelere yan etkisi olabilir. Örneğin değer atama

    Aşağıdaki örnek çalıştığında `x`'e değer atanmayacak:

    
    ```js run no-beautify
    let x;
=======
    If all variables were falsy, `"Anonymous"` would show up.

2. **Short-circuit evaluation.**

    Another feature of OR `||` operator is the so-called "short-circuit" evaluation.

    It means that `||` processes its arguments until the first truthy value is reached, and then the value is returned immediately, without even touching the other argument.
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

    That importance of this feature becomes obvious if an operand isn't just a value, but an expression with a side effect, such as a variable assignment or a function call.

<<<<<<< HEAD
    alert(x); // tanımsız, çünkü (x = 1) ifadesi çalıştırılmadı
    ```

    Eğer `if` yapısında ilk değer `false` ise bir sonrakine bakılır bu da şu şekilde sonuç verir:

=======
    In the example below, only the second message is printed:
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

    ```js run no-beautify
    *!*true*/!* || alert("not printed");
    *!*false*/!* || alert("printed");
    ```
    Gördüğünüz gibi değer atandı. Böyle basit bir durumda yan etki görmezden gelinebilir.
    
    Kısa yoldan `if` yapısında olduğu gibi ilk operand boolean'a çevrilir ve eğer yanlışsa ikinci değer çalıştırılır.
    
    Çoğu zaman normal `if` yapısını kullanmanız daha iyidir çünkü kod daha anlaşılır olur. Fakat bazen kısa yoldan `if` yapmakta işinize yarayabilir.
    

<<<<<<< HEAD
## && (AND - VE )
=======
    In the first line, the OR `||` operator stops the evaluation immediately upon seeing `true`, so the `alert` isn't run.

    Sometimes, people use this feature to execute commands only if the condition on the left part is falsy.
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

Ve operatörü iki tane `&` işaretiyle tanımlanmaktadır.


```js
sonuc = a && b;
```
Klasik programlamaya göre eğer iki operandda `doğru` ise doğru, diğer türlü `yanlış` döner.

```js run
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false
```

 `if ile bir örnek`:

```js run
let saat = 12;
let dakika = 30;

if (saat == 12 && dakika == 30) {
  alert( 'Saat 12:30' );
}
```
VEYA'da olduğu gibi VE operatörü de her türlü değeri kabul eder.

```js run
if (1 && 0) { // true && false şeklinde değerlendirilmiştir.
  alert( "Çalışmaz çünkü sonuç `yanlış` " );
}
```

## VE ilk `yanlış` değeri görür

<<<<<<< HEAD
Aşağıda 3 tane AND işlemine sokulmuş değer bulunmaktadır:
=======
## AND "&&" finds the first falsy value

Given multiple AND'ed values:
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

```js
sonuc = deger1 && deger2 && deger3;
```

AND `"&&"` operatörü aşağıdaki gibi çalışır:

- Operandları soldan sağa doğru değerlendir.
- Her bir operandı boolean değere çevir. Eğer sonuç `yanlış` ise dur ve operatörün orijinal değerini dönder.
- Eğer diğer operandlara erişim sağlandıysa ( hepsinin doğru olma durumu ) sondaki operandı dönder.

Yukarıdaki kurallar VEYA kuralları ile benzerlik göstermektedir. Farklılık AND operatörünün ilk `yanlış` bulduğunda dönmesi. OR operatörü ise ilk `doğru` bulduğunda dönmekteydi.

Örnek:

```js run
// Eğer ilk opedan doğru ise her halükarda ikincinin değeri dönecek.
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5


// İlk operand yanlış ise ilk operandı döner ikinci operand pas geçilir.

alert( null && 5 ); // null
alert( 0 && "önemi yok" ); // 0
```
Birden fazla VE'yi if yapısıyla kullanmak mümkündür.

```js run
alert( 1 && 2 && null && 3 ); // null
```

Tüm değerler doğru ise sonuncu değer döner.

```js run
alert( 1 && 2 && 3 ); // 3,  sonuncu değer
```

````smart header="VE `&&` VEYA'dan `||`  önce çalışır."

VE'nin `&&` önceliği VEYA'ya `||` göre daha yüksektir. Bundan dolayı VEYA'dan önce çalışır.

Aşağıdaki örnekte `1 && 0` önce hesaplanır.


```js run
alert( 5 || 1 && 0 ); // 5
```
````
VEYA'da olduğu gibi VE'de de operatör bazen `if` yerine kullanılabilir.

<<<<<<< HEAD
Örneğin:
=======
````warn header="Don't replace `if` with `||` or `&&`"
Sometimes, people use the AND `&&` operator as a "shorter way to write `if`".
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca


```js run
let x = 1;

(x > 0) && alert( 'Sıfırdan Büyük' );
```

Sağ taraftaki bildirim sadece değerlendirme oraya kadar gelebilirse çalışır. Bunun için de `x>0`'ın `doğru` dönmesi gerekmektedir.

Aslında aşağıdaki ile benzerdir:

```js run
let x = 1;

<<<<<<< HEAD
if (x > 0) {
  alert( 'Sıfırdan büyük!' );
}
=======
if (x > 0) alert( 'Greater than zero!' );
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
```
`&&` ile yazılan çeşidi daha kısa gibi görünse de aslında `if` ile yazılanın daha okunabilir olduğu açıktır.

Bundan dolayı her yapıyı amacına göre kullanmanız önerilir. Eğer `if` kullanmak istiyorsanız `if` yazarak kullanın. Eğer VE kullanmak istiyorsnaız `&&` yazarak kullanın.

<<<<<<< HEAD
=======
Although, the variant with `&&` appears shorter, `if` is more obvious and tends to be a little bit more readable. So we recommend using every construct for its purpose: use `if` if we want `if` and use `&&` if we want AND.
````
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca


## ! (DEĞİL)

Boolean değil operatörü `"!"` ile tanımlanmıştır.

Yazımı çok kolaydır:

```js
result = !value;
```
Operatör tek operanddan oluşur ve aşağıdaki şekilde çalışır:

1. Operand değerini boolean tipine çevir: `true/false`
2. Tersini geri dönder.


Örneğin:

```js run
alert( !true ); // false
alert( !0 ); // true
```
Çift DEĞİL işareti değeri boolean tipine çevirmeye yarar:

```js run
alert( !!"Boş olmayan karakter dizisi" ); // true
alert( !!null ); // false
```
Birinci DEĞİL değeri booleana çevirir ve tersini alır. İkincisi ise tersinin tersini alarak değeri orjinal halinin boolean haline çevirir.

Aynı şeyi `Boolean` fonksiyonu ile de yapmak mümkündür.

```js run
alert( Boolean("boş olmayan karakter dizisi") ); // true
alert( Boolean(null) ); // false
```
