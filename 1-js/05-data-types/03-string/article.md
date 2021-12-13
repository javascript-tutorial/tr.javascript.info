# Karakter Dizisi - Strings

JavaScript metinsel değerleri karakter dizisi olarak tutar. Bir karakter ile ( char ) karakter dizisi ( string ) arasında bir fark yoktur.

Karakter dizisi formatı her zmaan [UTF-16](https://en.wikipedia.org/wiki/UTF-16)'dır ve sayfanın karakter setine bağlı değildir.

[cut]

## Tırnak İşaretleri

Tekrar hatırlayacak olursanız, Karakter dizisi tek tırnak ve çift tırnak ile açılıp kapatılabilir. :
```js
let tek = 'tek-tırnak';
let cift = "çift-tırnak";

let us_isareti = `üs işareti`; // Backticks
```
<<<<<<< HEAD
Tek ve çift tırnak zaten aynıydı. Üs işareti ise JavaScript ifadelerini karakter dizisine yerleştirmenizi sağlar. Bu fonksiyon çağrısı dahil herşey olabilir:
=======

Single and double quotes are essentially the same. Backticks, however, allow us to embed any expression into the string, by wrapping it in `${…}`:
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

```js run
function toplam(a, b) {
  return a + b;
}

alert(`1 + 2 = ${toplam(1, 2)}.`); // 1 + 2 = 3.
```
Üs işaretinin diğer avantajı ise birkaç satırdan oluşan bir karakter dizisini yazabilmeniz:

```js run
let davetliListesi = `Davetliler:
 * İhsan
 * Cemal
 * Muzaffer
`;

alert(davetliListesi); // birçok satırdan oluşan davetiye listesi
```
<<<<<<< HEAD
Eğer yukarıdaki şekilde tek veya çift tırnak kullanmaya kalkarsanız hata alırsınız:
```js run
let davetliListesi = "Davetliler:  // Error: Unexpected token ILLEGAL
  * İhsan";
=======

Looks natural, right? But single or double quotes do not work this way.

If we use them and try to use multiple lines, there'll be an error:

```js run
let guestList = "Guests: // Error: Unexpected token ILLEGAL
  * John";
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269
```
Tek tırnak ve çift tırnak dil ilk yazılmaya başlandığı, çoklu satırların hesaba katılmadığı zamanlardan kalmadır. Garip tırnak ise ( alt + , ) çok sonraları oluşturulduğundan çok yönlüdür.

<<<<<<< HEAD
İlk üs işareti öncesinde "şablon fonksiyonu" tanımlanması da mümkündür. Yazımı : <code>func&#96;string&#96;</code> şeklindedir. `func` fonksiyonu otomatik olarak çağrılır, karakter dizisi ile ve içine gömülü ifadeyi alır ve çalıştırır. Bunun ile ilgili daha fazla bilgiyi [dökümanda](mdn:JavaScript/Reference/Template_literals#Tagged_template_literals) bulabilirsiniz. Buna "etiketmiş şablon"(tagged templates) denir. Bu şekilde karakter dizilerini özel temalar içerisinde veya diğer fonksiyonlarda kullanmak daha kolay olur, fakat yine de nadiren kullanılırlar.
=======
Single and double quotes come from ancient times of language creation when the need for multiline strings was not taken into account. Backticks appeared much later and thus are more versatile.

Backticks also allow us to specify a "template function" before the first backtick. The syntax is: <code>func&#96;string&#96;</code>. The function `func` is called automatically, receives the string and embedded expressions and can process them. This is called "tagged templates". This feature makes it easier to implement custom templating, but is rarely used in practice. You can read more about it in the [manual](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269


<<<<<<< HEAD
## Özel Karakterler
"yeni satır" `\n` karakterini kullanarak çift tırnaklı karakter dizisi içerisinde birçok satırdan oluşan bir metin yazılabilir:
=======
It is still possible to create multiline strings with single and double quotes by using a so-called "newline character", written as `\n`, which denotes a line break:
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

```js run
let davetliListesi = "Davetliler:\n * İhsan\n * Cemal\n * Muzaffer";

alert(davetliListesi); // birçok satırdan oluşan davetiye listesi
```

<<<<<<< HEAD
Örneğin, aşağıdaki iki satırın çıktısı aynı olacaktır:
```js run
alert( "Merhaba\nDünya" ); // "yeni satır" sambolü ile iki satır.

// üs işareti ile iki satır ( altgr + , )
alert( `Merhaba
Dünya` );
=======
For example, these two lines are equal, just written differently:

```js run
let str1 = "Hello\nWorld"; // two lines using a "newline symbol"

// two lines using a normal newline and backticks
let str2 = `Hello
World`;

alert(str1 == str2); // true
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269
```
"Yeni satır" karakterine göre daha az kullanılan "özel" karakterler bulunmaktadır:

<<<<<<< HEAD
| Karakter | Açıklama |
|-----------|-------------|
|`\b`|Backspace|
|`\f`|Form feed|
|`\n`|Yeni Satır|
|`\r`|Carriage return|
|`\t`|Tab|
|`\uNNNN`| hex kodu ile bir unicode `NNNN`, örneğin `\u00A9` -- `©` kopyalama hakkı için kullanılan işaret. Kesinlikle 4 basamaklı hex değeri olmalıdır. |
|`\u{NNNNNNNN}`|Bazı karakterler nadirde olsa iki unicode sembolü ile ifade edilirler. 4 bytten oluşan uzun bir yazımı vardır. Karakterlerin süslü parantez içine alınması gerekmektedir.

Unicode örnekleri:

```js run
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, Uzun bir çince hiyerograf (uzun unicode)
alert( "\u{1F60D}"); // 😍, gülen yüz sembolü (uzun unicode)
=======
There are other, less common "special" characters.

Here's the full list:

| Character | Description |
|-----------|-------------|
|`\n`|New line|
|`\r`|In Windows text files a combination of two characters `\r\n` represents a new break, while on non-Windows OS it's just `\n`. That's for historical reasons, most Windows software also understands `\n`. |
|`\'`, `\"`|Quotes|
|`\\`|Backslash|
|`\t`|Tab|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Vertical Tab -- kept for compatibility, not used nowadays. |
|`\xXX`|Unicode character with the given hexadecimal Unicode `XX`, e.g. `'\x7A'` is the same as `'z'`.|
|`\uXXXX`|A Unicode symbol with the hex code `XXXX` in UTF-16 encoding, for instance `\u00A9` -- is a Unicode for the copyright symbol `©`. It must be exactly 4 hex digits. |
|`\u{X…XXXXXX}` (1 to 6 hex characters)|A Unicode symbol with the given UTF-32 encoding. Some rare characters are encoded with two Unicode symbols, taking 4 bytes. This way we can insert long codes. |

Examples with Unicode:

```js run
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, a rare Chinese hieroglyph (long Unicode)
alert( "\u{1F60D}" ); // 😍, a smiling face symbol (another long Unicode)
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269
```

Tüm özel karakterler her zaman `\` karakteri ile başlarlar. Karakterler normal akışında giderken başka bir iş yapması için var olan işlemi kesmesinden dolayı "kesme karakteri" denebilir..

<<<<<<< HEAD
Karakter dizisi içinde kesme işareti kullanmak istersek bu işaret yardımıyla yaparız.
=======
We might also use it if we wanted to insert a quote into the string.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

Örneğin:

```js run
alert( 'N\'aber canım - Tavşan !' ); // N'aber canım - Tavşan !
```
Gördüğünüz gibi `\'` kullanarak karakter dizisinin bitmesi engellendi.

<<<<<<< HEAD
Tabi bu sadece başlangıç karakteri `'` ise geçerli. Daha düzgün bir çözüm çift tırnak kullanmak olacaktır:
=======
As you can see, we have to prepend the inner quote by the backslash `\'`, because otherwise it would indicate the string end.

Of course, only the quotes that are the same as the enclosing ones need to be escaped. So, as a more elegant solution, we could switch to double quotes or backticks instead:

>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269
```js run
alert( "N'aber canım - Tavşan!" ); // N'aber canım - Tavşan!
```
Dikkat edeceğiniz üzere `\` JavaScript'in doğru okuması amacıyladır. Ekranda görünmez. 

Peki gerçekten `\` gösterilmek istenirse ne yapılmalı ? 

Bu da mümkün, bunun için `\\` kullanılmalı:


```js run
alert( `\\` ); //  \
```

<<<<<<< HEAD
## Karakter dizisi uzunluğu

`length` özelliği karakter dizisinin uzunluğunu verir.
=======
## String length

The `length` property has the string length:
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

```js run
alert( `Naber\n`.length ); // 6
```
Dikkat ederseniz `\n` "özel karakter" oludğundan dolayı bir karakter olarak tanımlandı.

```warn header="`length` bir özelliktir"

Genelde başka diller ile çalışmış programcılar yanlışlıkla `str.length` yerine `str.length()` metodunu çağırmaktadırlar. Böyle bir metod yoktur.

`str.length` sayısal bir değerdir, fonksiyon değildir! Sonunda parantez açıp kapanmaz.
```

## Karakterlere erişim

İstediğiniz pozisyondaki karakteri alabilmek için köşeli parantez içerisinde pozisyonu neresiyse onu yazın `[poz]` veya bunun yerine [str.charAt(pos)](mdn:js/String/charAt) metodunu da kullanabilirsiniz. İlk karakter 0. pozisyondur:

```js run
let str = `Selam`;

// ilk karakter
alert( str[0] ); // S
alert( str.charAt(0) ); // S

// son karakter
alert( str[str.length - 1] ); // m
```
Köşeli parantez karakter almanın modern yoludur, `charAt` ilk metodlardandır.

Aralarındaki tek fark `[]` eğer karakteri bulamaz ise `undefined` döner. Fakat `charAt` boş karakter döner:

```js run
let str = `Selam`;

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (boş karakter)
```

Karakterleri döngüye sokmak da mümkündür.

```js run
for(let karakter of "Selam") {
  alert(karakter); // S,e,l,a,m (karakter önce "S", sonra "e", sonra "a" vs)
}
```

## Karakterler tanımlandıktan sonra değiştirilemezler ( immutable )

JavaScript dilinde karakter dizisi değiştirilemez. Mümkün değildir.

Örnek ile açıklamak gerekirse:

```js run
let str = 'Selam';

str[0] = 's'; // hata
alert( str[0] ); // çalışmaz, değişiklik olmaz
```
Bunun çüzümü ise yeni bir karakter dizisi atayıp `str`'yi buna atamaktır.

Örneğin:
```js run
let str = 'Selam';

<<<<<<< HEAD
str = str[0] + 'ELAM' ;  // karakter dizisini tamamen değiştir.
=======
str = 'h' + str[1]; // replace the string
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

alert( str ); // SELAM
```
Bir dahaki bölümde bunun ile ilgili daha fazla örneğe denk geleceksiniz.

## Harf işlemleri

Küçük harfe çevirmek için [toLowerCase()](mdn:js/String/toLowerCase) ve büyük harfe çevirmek için [toUpperCase()](mdn:js/String/toUpperCase) metodları kullanılabilir.

```js run
alert( 'Arayüz'.toUpperCase() ); // ARAYÜZ
alert( 'Arayüz'.toLowerCase() ); // arayüz
```

veya, sadece baş harfini alıp küçük harf olmasını istiyorsanız istiyorsanız:

```js
alert( 'Arayüz'[0].toLowerCase() ); // 'a'
```

## Karakter dizisi içinde başka bir karakter arama

Bunun için birçok yol bulunmaktadır.

### str.indexOf

İlk metod [str.indexOf(aranacak_karakterler, pozisyon)](mdn:js/String/indexOf)

Aranmak istenen karakter dizisinde `str` `aranacak_karakterler`'i arar. `Pozisyon` ile istenen pozisyondan aramaya başlar, eğer bu karakter dizisini bulursa bulduğu pozisyonu, bulamaz ise `-1` döndürür.

Örneğin:

```js run
let str = "N`aber Canım - Tavşan";

alert( str.indexOf("N'aber") ); // 0, çünkü N`aber başlangıçta
alert( str.indexOf("n'aber") ); // -1, bulunamadı, arama büyük/küçük harf duyarlıdır.

alert( str.indexOf("Tavşan") ); // 15, "Tavşan" 15. pozisyonda bulunmaktadır.
```
İsteğe bağlı olan ikinci parametre aramaya nereden başlanacağının belirtilmesine yarar.

<<<<<<< HEAD
Örneğin `"an"`'ın ilk bulunduğu pozisyon `8`'dir. Bir sonraki denk gelişi ise `19.` pozisyonda olur.
=======
The optional second parameter allows us to start searching from a given position.

For instance, the first occurrence of `"id"` is at position `1`. To look for the next occurrence, let's start the search from position `2`:
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

```js run
let str = "N`aber Canım - Tavşan";

alert( str.indexOf('an', 9) ) // 19
```

<<<<<<< HEAD
Eğer sizin istediğiniz tüm tekrarlar ise, `indexOf`'u döngü içerisinde kullanabilirsiniz. Her yeni çağrı bir önceki pozisyonu tutar:
=======
If we're interested in all occurrences, we can run `indexOf` in a loop. Every new call is made with the position after the previous match:
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

```js run
let str = 'Bir berber bir berbere gel birader beraber bir berber dükkanı açalım demiş';

let hedef = 'bir'; 

let poz = 0;
while (true) {
  let bulunanPoz = str.indexOf(hedef, poz);
  if (bulunanPoz == -1) break;

  alert( `Bulunan poz: ${bulunanPoz}` );
  poz = bulunanPoz + 1; // bir sonraki pozisyondan aramaya devam et.
}
```

Aynı algoritma aşağıdaki şekilde daha kısa bir biçimde yazılabilir:

```js run
let str = 'Bir berber bir berbere gel birader beraber bir berber dükkanı açalım demiş';
let hedef = "bir";


let poz = -1;
while ((poz = str.indexOf(hedef, poz + 1)) != -1) {
  alert( poz );
}
```

```smart header="`str.lastIndexOf(poz)`"

Buna benzer başka bir metod daha bulunmaktadır. [str.lastIndexOf(pos)](mdn:js/String/lastIndexOf) bu metod karakter dizisinin sonundan başına doğru arama yapar

Bulduklarını da yine tersten yazar.
```

`indexOf`'tan daha kullanışsızdır. `if` koşulu olarak aşağıdaki gibi kullanılamaz.

```js run
let str = "Bin berber bir berbere gel birader beraber bir berber dükkanı açalım demiş";

if (str.lastIndexOf("Bin")) {
    alert("Buldum!"); // çalışmaz!
}
```
Yukarıdaki `alert`'ün çalışmamasının nedeni `str.lastIndexOf("Bin")`'in `0` döndürmesidir. ( Bu başlangıçta değeri bulmasına rağmen) pozisyon 0 döndüğünden `if` bunu `false` olarak algılar.

Bundan dolayı `-1`'i aşağıdaki gibi kontrol etmek gerekmektedir.

```js run
let str = "Bin berber bir berbere gel birader beraber bir berber dükkanı açalım demiş";

*!*
if (str.indexOf("Bin") != -1) {
*/!*
    alert("Buldum"); // Şimdi oldu!
}
```

<<<<<<< HEAD
````smart header="Bitwise NOT cambazlığı"
Burada kullanılan [bitwise NOT] cambazlığıdır.
(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT) `~` operatörü. Sayıyı 32-bit tamsayıya çevirir.(Eğer ondalık bölümü varsa bunu siler. Tüm bitlerin binary(ikili) gösterimlerini tersine çevirir.

32-bit tam sayılar için `~n` tam olarak `-(n+1)`(IEEE-754 formatına göre) demektir.
=======
#### The bitwise NOT trick

One of the old tricks used here is the [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT) `~` operator. It converts the number to a 32-bit integer (removes the decimal part if exists) and then reverses all bits in its binary representation.

In practice, that means a simple thing: for 32-bit integers `~n` equals `-(n+1)`.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

Örneğin:

```js run
alert( ~2 ); // -3,  -(2+1) demektir.
alert( ~1 ); // -2,  -(1+1) demektir.
alert( ~0 ); // -1,  -(0+1) demektir.
*!*
alert( ~-1 ); // 0,  -(-1+1) demektir.
*/!*
```
Gördüğünüz üzere, `~n`, sadece `n == -1` olduğu durumda `0` demektir.

<<<<<<< HEAD
Bundan dolayı `if( ~str.indexOf("...") )` anca `indexOf` `-1` değilse `true` olur. Diğer bir deyişle arandan değer bulunmuş demektir.
=======
As we can see, `~n` is zero only if `n == -1` (that's for any 32-bit signed integer `n`).

So, the test `if ( ~str.indexOf("...") )` is truthy only if the result of `indexOf` is not `-1`. In other words, when there is a match.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

Daha kısa bir `indexOf` kullanımı da mevcuttur:

```js run
let str = "Bin berber bir berbere gel birader beraber bir berber dükkanı açalım demiş";

if (~str.indexOf("Bin")) {
  alert( 'Buldum!' ); // Çalıştı
}
```
Genelde çok açık olmayan dil özellikleri üzerinde cambazlık yapılması önerilmez. Fakat özellikle bu kod parçacığı eski kodların içinde çokça geçmektedir. Bundan dolayı en azından anlamalısınız.

<<<<<<< HEAD
Hatırlatma: `if (~str.indexOf(...))`  "eğer bulunursa" diye okunur..
````
=======
It is usually not recommended to use language features in a non-obvious way, but this particular trick is widely used in old code, so we should understand it.

Just remember: `if (~str.indexOf(...))` reads as "if found".

To be precise though, as big numbers are truncated to 32 bits by `~` operator, there exist other numbers that give `0`, the smallest is `~4294967295=0`. That makes such check correct only if a string is not that long.

Right now we can see this trick only in the old code, as modern JavaScript provides `.includes` method (see below).
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

### includes, startsWith, endsWith

Modern özelliklerin içerisinde [str.includes(substr, pos)](mdn:js/String/includes) `true/false` döndüren bir metod mulunmaktadır. 

Eğer sadece aradığınız karakterlerin var olup olmadığını kontrol etmek istiyorsanız ve pozisyonu sizin için önemli değilse bu metod kullanılabilir:

```js run
alert( "Bin berber bir berbere gel birader beraber bir berber dükkanı açalım demiş".includes("Bin") ); // true

alert( "Merhaba".includes("Güle Güle") ); // false
```

`str.includes` un isteğe bağlı ikinci argümanı başlanacak pozisyonu belirtmenizi sağlar:

```js run
<<<<<<< HEAD
alert( "birader".includes("ir") ); // true
alert( "birader".includes("ir", 3) ); // false, 3. pozisyondan sonra `ir` bulunmamaktadır.
=======
alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, from position 3 there is no "id"
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269
```

Aynı şekilde [str.startsWith](mdn:js/String/startsWith) ve [str.endsWith](mdn:js/String/endsWith) metodları söyledikleri gibi, aranan karakter dizilerinin başlangıç ve bitişlerine bakarlar.

```js run
<<<<<<< HEAD
alert( "birader".startsWith("bir") ); // true, "birader" "bir" ile başlar.
alert( "birader".endsWith("er") );   // true, "birader" "er" ile biter.
=======
alert( "Widget".startsWith("Wid") ); // true, "Widget" starts with "Wid"
alert( "Widget".endsWith("get") ); // true, "Widget" ends with "get"
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269
```

## Alt karakter dizisi alma

Alt karakter dizisi alma JavaScript'te 3 metod ile yapılır: `substring`, `substr` ve `slice`

`str.slice(basla [, bitir])`
: Karakter dizisinin `başla` ile başlayan `bitir`(dahil değil) ile bitirilen aralıktaki karakterleri alır.

    Örneğin:

    ```js run
    let str = "stringify";
    alert( str.slice(0,5) ); // 'strin',  0 ile 5 arasındaki alt karakter dizisi (5 dahil değil)
    alert( str.slice(0,1) ); // 's', 0 ile 1, fakat 1 dahil değil, yani sadece 0'ıncı karakter.
    ```

    Eğer ikinci bir argüman yoksa, `slice` karakter dizisinin sonuna kadar alır:

    ```js run
    let str = "st*!*ringify*/!*";
<<<<<<< HEAD
    alert( str.slice(2) ); // ringify, ikinci pozisyondan sonuna kadar.
=======
    alert( str.slice(2) ); // 'ringify', from the 2nd position till the end
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269
    ```

    `basla/bitir` için negatif değerler kullanmakta mümkündür. Bu pozisyonun karakter bitiminden itibaren çalıştığı anlamına gelir.
    

    ```js run
    let str = "strin*!*gif*/!*y";

<<<<<<< HEAD
    // sağdan 4. pozisyondan başla ve yine sağdan 1. pozisyona kadar al.
    alert( str.slice(-4, -1) ); // gif
    ```


`str.substring(basla [, bitir])`
: `başla` ile `bitir` *arasındaki* karakterleri çevirir.
=======
    // start at the 4th position from the right, end at the 1st from the right
    alert( str.slice(-4, -1) ); // 'gif'
    ```

`str.substring(start [, end])`
: Returns the part of the string *between* `start` and `end`.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

    Örneğin:

    ```js run
    let str = "st*!*ring*/!*ify";

    // alt karakter dizisi için aynıdır.
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...fakat slice için farklıdır:
    alert( str.slice(2, 6) ); // "ring" (aynı)
    alert( str.slice(6, 2) ); // "" (boş karakter)

    ```
    `slice`'a göre farklı olarak negatif sayılar `0` olarak hesaba katılır.

<<<<<<< HEAD

`str.substr(başlangıç [, length])`
: Verilen uzunluğa bağlı olarak `başlangıç`'tan uzunluk kadar karakter alır.
    
    Diğer metoda göre bu `uzunluğu` belirtmemizi sağlar. Diğerleri pozisyonu belirtmemizi sağlıyordu.

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // ring, 2. pozisyondan 4 karakter al.
=======
`str.substr(start [, length])`
: Returns the part of the string from `start`, with the given `length`.

    In contrast with the previous methods, this one allows us to specify the `length` instead of the ending position:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // 'ring', from the 2nd position get 4 characters
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269
    ```

    İlk karakter negatif olabilir. Sondan sayarak:

    ```js run
    let str = "strin*!*gi*/!*fy";
<<<<<<< HEAD
    alert( str.substr(-4, 2) ); // gi, 4. pozisyondan 2 karakter al.
=======
    alert( str.substr(-4, 2) ); // 'gi', from the 4th position get 2 characters
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269
    ```

Karışıklığı önlemek adına metodların üzerinden geçersek:

| method | selects... | negatives |
|--------|-----------|-----------|
| `slice(başlangıç, bitiş)` |  `başlangıç`'dan `bitiş`'e kadar | negatif sayılar kullanılabilir. |
| `substring(başlangıç, bitiş)` | `başlangıç`'dan `bitiş`'e kadar | negatif sayılar `0` demektir |
| `substr(başlangıç, uzunluk)` | `başlangıç`'dan `uzunluk` kadar karakter | negatif `başlangıç` kullanılabilir |


<<<<<<< HEAD
```smart header="Hangisi Seçilmeli?"

Aslında tamamı iş görür. Daha resmi düzeyde bakılırsa: `substr` JavaScript özellik tanımlarında bulunmamaktadır. Fakat Annex B'ye göre sadece tarayıcı tabanlı özellikler içerisinde bulunmaktadır. Bu da tarihi nedenlerden dolayıdır. Bundan dolayı tarayıcı üzerine yazmıyorsanız. Yazdığınız yere bağlı olarak bu kod hata verebilir. Fakat pratikte her yerde çalıştığı görülebilir.

Yazar genelde `slice` kullanmaktadır.
=======
```smart header="Which one to choose?"
All of them can do the job. Formally, `substr` has a minor drawback: it is described not in the core JavaScript specification, but in Annex B, which covers browser-only features that exist mainly for historical reasons. So, non-browser environments may fail to support it. But in practice it works everywhere.

Of the other two variants, `slice` is a little bit more flexible, it allows negative arguments and shorter to write. So, it's enough to remember solely `slice` of these three methods.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269
```

## Karakterlerin karşılaştırılması

<info:comparison> bölümünden hatırlanacağı üzere, karakterler birbirileri ile karakter karakter karşılaştırılırlar. Bu karşılaştırma alfabetik sıraya göre yapılmaktadır.

Buna rağmen bazı gariplikler de mevcuttur.


1. Küçük harf karakterler her zaman büyük harflerden büyüktürler.

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Bölgesel karakterler bu sıralamaya girmezler. Yani karşılaştırılamazlar.

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    Eğer ülke isimlerini karşılaştırmak istiyorsanız bu garip sonuçlara neden olabilir. Örneğin `Zealand` normalde `Österreich`'ten sonra gelmesi beklenirken önce gelir.

Ne olduğunu anlamak için JavaScript karakter dizilerini nasıl tanımlıyor buna bakmak lazım.

Tük karakter dizileri [UTF-16](https://en.wikipedia.org/wiki/UTF-16) ile kodlanmıştır. Buna göre: Tüm karakterler sayısal olarak kodlanır. Bu koda göre karakteri geri döndürecek özel metodlar mevcuttur.

`str.codePointAt(pos)`
: Verilen pozisyondaki karakterin kodunu döndürür:

    ```js run
    // Büyük küçük harflerde farklı kodlar döndürülür.
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    ```

`String.fromCodePoint(code)`
: Sayısal değere göre karakter dönderir.

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    ```
<<<<<<< HEAD
    Ayrıca `\u` ile birlikte kodun hexa decimal değerini kullanarak unicode karakter eklemeniz de mümkündür: 
=======

    We can also add Unicode characters by their codes using `\u` followed by the hex code:
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

    ```js run
    // 90 hexa decimal sistemde 5a ya denk gelmektedir.
    alert( '\u005a' ); // Z
    ```
`65..220` arasında sayısal değeri olan ( latin alfabesi ve bunun yanında sayılar vs. ) karakterleri ekrana basalım:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```
Gördüğünüz gibi önce büyük harfler, sonrasında bir kaç özel harf ve küçük harfler şeklinde yazılmaktadır.

<<<<<<< HEAD
`a > Z` olduğu yukarıda açıkça görülmektedir.
=======
See? Capital characters go first, then a few special ones, then lowercase characters, and `Ö` near the end of the output.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

Karakterler sayısal kodları ile karşılaştırılmaktadır. Kod büyüdükçe karakter de büyür denebilir. `a` için yazılan kod (97) `Z`(90) kodundan büyüktür.
- Tük küçük harfler büyük harflerden sonra gelir. Bundan dolayı küçük harflerin en küçüğü bile büyük harflerin tamamından büyüktür.
- `Ö` gibi karakterler alfabaden tamamen farklı düşünmelidir. Bu karakterlerin kodları küçük harflerden büyüktür.


<<<<<<< HEAD
### Doğru Karşılaştırma

Karakter karşılaştırmasını "doğru" olarak yapmak göründüğünden daha zordur. Çünkü alfabe dilden dile farklılık göstermektedir. Aynı görünüşlü harfler farklı alfabelerde farklı yerlerde yer alırlar.

Tarayıcı hangi dil ile karşılaştıracağını bilmeli.

Neyseki tüm modern tarayıcılar(IE10- ek kütüphanelere gerek duymaktadır [Intl.JS](https://github.com/andyearnshaw/Intl.js/) ) uluslararası dil standardına sahiptir [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).
=======
- All lowercase letters go after uppercase letters because their codes are greater.
- Some letters like `Ö` stand apart from the main alphabet. Here, its code is greater than anything from `a` to `z`.

### Correct comparisons [#correct-comparisons]

The "right" algorithm to do string comparisons is more complex than it may seem, because alphabets are different for different languages.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

Bu özel bir metod ile farklı dillerde karakterlerin birbirleri ile karşılaştırılabilmesini sağlar. Kuralları şu şekildedir:

<<<<<<< HEAD
[str.localeCompare(str2)](mdn:js/String/localeCompare) in çağırılması:
=======
Luckily, all modern browsers (IE10- requires the additional library [Intl.js](https://github.com/andyearnshaw/Intl.js/)) support the internationalization standard [ECMA-402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

- Eğer dil kurallarına göre `str` `str2` den büyükse `1` döndürür.
- Eğer `str` `str2` den küçükse `-1` döndürür.
- Eğer birbirleri ile eşit ise `0` döndürür.

<<<<<<< HEAD
Örneğin:
=======
The call [str.localeCompare(str2)](mdn:js/String/localeCompare) returns an integer indicating whether `str` is less, equal or greater than `str2` according to the language rules:

- Returns a negative number if `str` is less than `str2`.
- Returns a positive number if `str` is greater than `str2`.
- Returns `0` if they are equivalent.

For instance:
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```
Aslında bu metodun [dökümantasyon](mdn:js/String/localeCompare)'da belirtilen iki tane argümanı vardır. Bu argümanlar ile hangi dili kullanmak istediğinizi veya `"a"` ile `"á"`'nın aynı şekilde davranılmasını isteyip istemediğinizi belirtebilirsiniz.

<<<<<<< HEAD
## Unicod ve Internaller.
=======
This method actually has two additional arguments specified in [the documentation](mdn:js/String/localeCompare), which allows it to specify the language (by default taken from the environment, letter order depends on the language) and setup additional rules like case sensitivity or should `"a"` and `"á"` be treated as the same etc.

## Internals, Unicode
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

```warn header="İleri derecede bilgiler"
Bu bölümde karakter dizilerinin daha derin özelliklerine değinilecektir. Bu bilgiler emoji, hiyeroglif veya matematiksel ifadelerde yardımcı olur.

Eğer bu konuda bir ihtiyacınız yoksa bu bölümü atlayabilirsiniz.
```

### Vekil Çiftler

<<<<<<< HEAD
Çoğu sembol 2-byte kod ile tanımlanır. Çoğu avrupa dili, sayılar ve çoğu hiyeroglifler iki byte ile tanımlanabilir.
=======
All frequently used characters have 2-byte codes. Letters in most european languages, numbers, and even most hieroglyphs, have a 2-byte representation.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

Fakat iki byte 65536 sembolü tanımlayabilir ve tüm semboller için bu yeterli değildir. Bundan dolayı nadir semboller bir çift 2-byte'lık karakter ile tanımlanır. Buna vekil çiftler veya "surrogate pair" adı verilir.

Böyle sembollerin uzunluğu `2`'dir:


```js run
alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
alert( '𩷶'.length ); // 2, a rare Chinese hieroglyph
```
Bu vekil çiftler JavaScript yaratıldığında meydanda yoktu, bundan dolayı dil tarafından doğru olarak işlenemez.

Tek bir karakter olmasına rağmen `length`(uzunluk) `2` göstermektedir.

`String.fromCodePoint` ve `str.codePointAt` az bilinen ve bu ikili karakterlerle uğraşan iki metoddur. Dile entegreleri yakın zamanda gerçekleşti. Bundan önce sadece [String.fromCharCode](mdn:js/String/fromCharCode) ve [str.charCodeAt](mdn:js/String/charCodeAt) bulunmaktadır. Bu metodlar aslında `fromCodePoint/codePointAt` ile aynıdır fakat ikili karakterler ile çalışmamaktadırlar.

<<<<<<< HEAD
Örneğin sembolün alınması biraz karmaşıktır, çünkü bu çiftler iki karakterden oluşmaktadırlar.
=======
Getting a symbol can be tricky, because surrogate pairs are treated as two characters:
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

```js run
alert( '𝒳'[0] ); // garip semboller...
alert( '𝒳'[1] ); // ...her biri ikilinin parçaları
```

Dikkat ederseniz çifli karakterler tek başlarına birşey ifade etmezler. Yani yukarıdaki örnekler aslında hiç bir işe yaramaz.

Teknik olarak, bu çiftler kodlarına bakılarak ayırt edilebilir: Eğer bir karakter `0xd800..0xdbff` aralığında ise bu çiftin ilk karakteri demektir. İkinci karakter ise `0xd800..0xdbff` aralığında olmalıdır. Bu aralıklar özel olarak çiftler için ayrılmıştır.

Yukarıdaki duruma göre:

```js run
// charCodeAt çiftlere uygun değildir, bundan dolayı sadece kodlar verilir.

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, 0xd800 ile 0xdbff arasında
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, 0xdc00 ile 0xdfff arasında
```
<info:iterable> bölümünde bu çifler ile ilgili daha fazla bilgi bulabilirsiniz. Muhtemelen bunun ile ilgili kütüphaneler de vardır, fakat burada önerecek kadar meşur olan yok henüz.

### Aksan işaretleri ve normalleştirme

Çoğu dilde temel karakterlerin altına veya üstünü sembol eklenerk oluşturulmuş yeni karakterler mevcuttur.

Örneğin `a`, `àáâäãåā` şeklinde karakterlere sahiptir. Bu birleşik karakterler UTF-16 tablosunda kendine has kodlara sahiptir. Hepsi değil tabi fakat çoğu birleşik karakter bu tabloda yer alır.

Elle bu karakterleri birleştirmek için, UTF-16 bazı unicode karakter kullanmamıza olanak verir. Böylece temel karakterin üzerine bir veya daha fazla "işaret" eklenerek yeni bir karakter "üretilebilir"

<<<<<<< HEAD
Örneğin, `S` harfinin üstüne "nokta" eklemek isterseniz `\u0307` kullanabilirsiniz. Bunu kullandığınızda Ṡ elde etmiş olursunuz.
=======
To support arbitrary compositions, UTF-16 allows us to use several Unicode characters: the base character followed by one or many "mark" characters that "decorate" it.

For instance, if we have `S` followed by the special "dot above" character (code `\u0307`), it is shown as Ṡ.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

```js run
alert( 'S\u0307' ); // Ṡ
```
Eğer bu karakterin üstüne veya altına farklı işaretler eklemek istiyorsanız gerekli karakterleri istediğiniz gibi ekleyebilirsiniz.

Örneğin, eğer "aşağı nokta" kodunu ( `\u0323`) eklerseniz, "S'in altına ve üstüne nokta" demiş olursunuz ve şu şekilde bir karakter elde edersiniz: `Ṩ`

Örneğin:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```
Böylece çok farklı karakterler elde etmek mümkündür, fakat bu bir probleme neden olmaktadır: iki karakter görünüşte birbiri ile aynı olabilir, fakat iki farklı unicode'a sahip olabilir.

<<<<<<< HEAD
Örneğin:

```js run
alert( 'S\u0307\u0323' ); // Ṩ, S + üst nokta + alt nokta
alert( 'S\u0323\u0307' ); // Ṩ, S + alt nokta + üst nokta 
=======
This provides great flexibility, but also an interesting problem: two characters may visually look the same, but be represented with different Unicode compositions.

For instance:

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false though the characters look identical (?!)
```
Bunu çözebilmek için "unicode normalleştirme" algoritmaları mevcuttur. Bu karakterleri tek bir "noram" forma çevirir.

<<<<<<< HEAD
[str.normalize()](mdn:js/String/normalize) şeklinde uygulaması yapılmaktadır.
=======
To solve this, there exists a "Unicode normalization" algorithm that brings each string to the single "normal" form.

It is implemented by [str.normalize()](mdn:js/String/normalize).
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```
Bizim durumumuzda `normalize()` fonksiyonu aslında 3 karakteri tek bir karakter haline getirir: `\u1e68` ( alt ve üst nokta ile S harfi)

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

<<<<<<< HEAD
Gerçekte bu durumla çok nadir karşılaşılır. Bu karakter bile `Ṩ` oldukça "yaygın" olduğundan, UTF-16 standart tablosu içerisinde yer almaktadır.
=======
In reality, this is not always the case. The reason being that the symbol `Ṩ` is "common enough", so UTF-16 creators included it in the main table and gave it the code.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269


<<<<<<< HEAD
Eğer normalizasyon kurallarını ve tiplerini daha derinlemesine öğrenmek istiyorsanız [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/) adresinden inceleyebilirsiniz. Pratikte yukarıda verilen bilgiler yeterli olacaktır.

## Özet

- 3 tip tırnak bulunmaktadır. "`" işareti ile birkaç satırdan oluşan karakter dizisi yazmak mümkündür
- JavaScript'te karakterler UTF-16 ile kodlanmıştır.
- `\n` gibi özel karakterler veya `\u..` ile unicode kullanılabilir.
- Karakteri almak için: `[]` kullanılır.
- Alt karakter kümesi almak için `slice` veya `substring` kullanılır.
- Küçük/büyük harf değişimi için: `toLowerCase/toUpperCase`.
- Alt karakter dizisi aramak için : `indexOf` veya `includes/startsWith/endsWith` kullanılabilir.
- Karakterleri dile göre karşılaştırmak için `localceCompare` kullanılabilir. Diğer türlü karakterler kodlarına göre karşılaştırılırlar.
=======
## Summary

- There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions `${…}`.
- Strings in JavaScript are encoded using UTF-16.
- We can use special characters like `\n` and insert letters by their Unicode using `\u...`.
- To get a character, use: `[]`.
- To get a substring, use: `slice` or `substring`.
- To lowercase/uppercase a string, use: `toLowerCase/toUpperCase`.
- To look for a substring, use: `indexOf`, or `includes/startsWith/endsWith` for simple checks.
- To compare strings according to the language, use: `localeCompare`, otherwise they are compared by character codes.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

Bunun yanında karakter dizileri için daha başka yardımcı metodlar bulunmaktadır:

<<<<<<< HEAD
- `str.trim()` -- başlangıç ve bitişteki boşlukları siler.
- `str.repeat(n)` -- `str`'yi istendiği kadar tekrar eder..
- ... Daha fazlası için [manual](mdn:js/String)  adresine bakabilirsiniz.

Karakter dizileri bunun yanında arama/değiştirme veya regular expression için metodlar barındırmaktadır. Fakat bu konular ayrı bölümleri hak etmektedir. Bu konulara ilerleyen bölümlerde dönülecektir.
=======
- `str.trim()` -- removes ("trims") spaces from the beginning and end of the string.
- `str.repeat(n)` -- repeats the string `n` times.
- ...and more to be found in the [manual](mdn:js/String).

Strings also have methods for doing search/replace with regular expressions. But that's big topic, so it's explained in a separate tutorial section <info:regular-expressions>.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269
