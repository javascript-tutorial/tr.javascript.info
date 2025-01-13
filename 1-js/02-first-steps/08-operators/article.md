<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
# Operatörler
=======
# Basic operators, maths
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md

Çoğu operatörü okuldan hatırlarsınız. Toplama `+`, çarpma `*`, çıkarma `-` vs. 

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Bu bölümde okulda görmediğiniz aritmetiği işleyeceğiz.
=======
In this chapter, we’ll start with simple operators, then concentrate on JavaScript-specific aspects, not covered by school arithmetic.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md

## Tanımlamalar: "unary", "binary", "operand"

Başlamadan önce terminolojiyi öğrenmekte fayda var.

- *Operand* operatörlerin uygulandığı(+,-,* vs.) değerlerdir. Örneğin çarpma işlemi için `5*2` örneğinden gidersek. İki tane operand vardır. Bunlardan solda olan `5` ve sağ operand `2`. Bunlara argüman da denebilir.

- Eğer tek operanddan oluşursa bu operatör *unary* olarak adlandırılır. Örneğin, `"-"` sayının işaretini değiştirir:


    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1, unary işlemi gerçekleşti
    ```
- Eğer operatörün iki tane operand'ı var ise buna **binary operand** denir. Örneğin çıkarma işlemi aşağıda bu formda bulunur.

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, iki sayının çıkarılması binary operand işlemidir.
    ```
    
    Şeklen, iki operatörden konuşuyoruz. `unary` çıkarma ( tek operand işareti değiştirir) ve binary çıkarma ( iki operatör çıkarma )

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
## Karakter dizisi birleştirme, binary +

JavaScript'te operatörlerin özel durumlarından birisi karakter dizilerinin `+` işareti ile birleştirilebilmesidir.

Böylece `+` işaretinin amacının ötesinde bir işlem yapabildiğinin farkına varmış olmalısınız.
=======
    Formally, in the examples above we have two different operators that share the same symbol: the negation operator, a unary operator that reverses the sign, and the subtraction operator, a binary operator that subtracts one number from another.

## Maths

The following math operations are supported:

- Addition `+`,
- Subtraction `-`,
- Multiplication `*`,
- Division `/`,
- Remainder `%`,
- Exponentiation `**`.

The first four are straightforward, while `%` and `**` need a few words about them.

### Remainder %

The remainder operator `%`, despite its appearance, is not related to percents.

The result of `a % b` is the [remainder](https://en.wikipedia.org/wiki/Remainder) of the integer division of `a` by `b`.

For instance:

```js run
alert( 5 % 2 ); // 1, the remainder of 5 divided by 2
alert( 8 % 3 ); // 2, the remainder of 8 divided by 3
alert( 8 % 4 ); // 0, the remainder of 8 divided by 4
```

### Exponentiation **

The exponentiation operator `a ** b` raises `a` to the power of `b`.

In school maths, we write that as a<sup>b</sup>.

For instance:

```js run
alert( 2 ** 2 ); // 2² = 4
alert( 2 ** 3 ); // 2³ = 8
alert( 2 ** 4 ); // 2⁴ = 16
```

Just like in maths, the exponentiation operator is defined for non-integer numbers as well.

For example, a square root is an exponentiation by ½:

```js run
alert( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root)
alert( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)
```


## String concatenation with binary +

Let's meet the features of JavaScript operators that are beyond school arithmetics.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md

Normalde `+` iki sayıyı toplamaya yaparken eğer bir taraf karakter dizisi ise bu durumda birleştirmeye yarar.

```js
let s = "my" + "string";
alert(s); // mystring
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Dikkat edin eğer iki operand'dan birisi karakter dizisi ise diğeri ne olursan olsun karakter dizisine çevrilir.
=======
Note that if any of the operands is a string, then the other one is converted to a string too.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md

Örneğin:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Gördüğünüz gibi, ilk operand veya ikinci operandın karakter dizisi olması bir şeyi değiştirmiyor. Kural basit, her iki taraftan birisi karakter dizisi ise diğerini de karakter dizisine çevir ve birleştir.

Yani `"+"` işlemi hem birleştirme hem de tip değiştirme yapmaktadır. Bu sadece `"+"` operatörüne has bir olaydır.

Örneğin çıkarma ve çarpmanın davranışı farklıdır:
=======
See, it doesn't matter whether the first operand is a string or the second one.

Here's a more complex example:

```js run
alert(2 + 2 + '1' ); // "41" and not "221"
```

Here, operators work one after another. The first `+` sums two numbers, so it returns `4`, then the next `+` adds the string `1` to it, so it's like `4 + '1' = '41'`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md

```js run
alert('1' + 2 + 2); // "122" and not "14"
```
Here, the first operand is a string, the compiler treats the other two operands as strings too. The `2` gets concatenated to `'1'`, so it's like `'1' + 2 = "12"` and `"12" + 2 = "122"`.

The binary `+` is the only operator that supports strings in such a way. Other arithmetic operators work only with numbers and always convert their operands to numbers.

Here's the demo for subtraction and division:

```js run
alert( 6 - '2' ); // 4, converts '2' to a number
alert( '6' / '2' ); // 3, converts both operands to numbers
```

## Sayısal değer dönüştürme, unary + 

`+` iki formda bulunur. Yukarıda kullandığımız binary form(iki tane operand olma olayı) veya unary form(tek operand olması).

Eğer unary `+` veya tek bir değerle kullanılan `+` işareti sayılar ile bir şey yapmaz. Fakat eğer bu bir sayı değilse sayıya çevrilir.


Örneğin:

```js run
// Sayılara bir etkisi yoktur
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Sayı olmayan değerleri çevirir
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```
Aslında `Number(...)` işlemini yapar. Fakat daha kısa biçimyle.

Karakter dizilerini sayılara çevirme gerekliliği sıklıkla önünüze gelir. Örneğin HTML form değerlerini alırken sadece karakter dizisi kullanır. Fakat ya siz bunları toplamak istiyorsanız ?

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Bildiğiniz gibi iki karakter dizisini `+` işareti ile toplarsanız birleştirme işlemi yapar:

=======
The need to convert strings to numbers arises very often. For example, if we are getting values from HTML form fields, they are usually strings. What if we want to sum them?

The binary plus would add them as strings:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md

```js run
let elma = "2";
let portakal = "3";

alert( elma + portakal ); // "23",  binary toplama iki karakter dizisini birleştiriyor
```
Eğer sayı olarak kullanmak istiyorsanız, önce dönüştürme işlemini yapıp sonra toplayabilirsiniz.


```js run
let elma = "2";
let portakal = "3";

*!*
// her iki değer de binary toplama işleminden önce sayıya çevrilmişlerdi
alert( +elma + +portakal ); // 5
*/!*

// Daha uzun bi şekilde bu işlemi yapmak istiyorsanız
// alert( Number(apples) + Number(oranges) ); // 5

// şeklinde yapabilirsiniz.
```
Olaya bir matematikçi gözünden bakarsanız `+` kullanımı garip gelebilir. Fakat bir programcının gözünden özel bir olay yok aslında: operand'ı bir tane olan(unary) toplama işlemi önce uygulanıyor ve karakter dizisini sayıya çeviriyor. Daha sonra iki tane operand'lı ( binary) toplama işlemi bunları topluyor.

Neden önce "unary" işlemi gerçekleşiyor da "binary" işlemi gerçekleşmiyor? Buna *yüksek öncelik* diyebiliriz.

## Operatör Öncelikleri

Eğer bir ifade birden fazla operatör içeriyorsa. Bu ifade çalıştırılırken tanımlı *önceliklere* göre çalıştırılır, bir başka ifade ile öncelik sırasına göre çalıştırılır.

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Okuldan hepinizin hatırlayacağı gibi çarpma işlemi toplamadan önce yapılır `1 + 2 * 2`. Aslında *öncelik* tam olarakta budur. Çarpma işlemi toplama işleminden daha *yüksek önceliğe* sahiptir.
=======
If an expression has more than one operator, the execution order is defined by their *precedence*, or, in other words, the default priority order of operators.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md

Parantez, bu öncelikleri çiğner ve eğer bu *önceliklerden* memnun değilseniz bunları tekrar tanımlamanıza olanak verir. Örneğin `(1 + 2 ) * 2`

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
JavaScript dilinde birçok operatör vardır. Her operatörün de bir önceliği. Yüksek öncelik sayısına sahip operatör önce çalışır. Eğer öncelik değerleri eşit ise soldan sağa doğru çalışır.
=======
Parentheses override any precedence, so if we're not satisfied with the default order, we can use them to change it. For example, write `(1 + 2) * 2`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md

[öncelik tablosu](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence) ( Ezberlemenize gerek yok sadece unary operatörlerin binary olanlara göre daha üstün olduğunu hatırlayın yeter). Yani `+elma + +portakal` işleminde önce unary ile `elma`'nın değerini sayı yapar sonra `portakal`'ın değerini sayı yapar ve en sonunda toplar.

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
=======
Here's an extract from the [precedence table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) (you don't need to remember this, but note that unary operators are higher than corresponding binary ones):
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md

| Öncelik | Adı | İşareti |
|------------|------|------|
| ... | ... | ... |
<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
| 16 | unary toplama | `+` |
| 16 | unary çıkarma | `-` |
| 14 | çarpma | `*` |
| 14 | bölme | `/` |
| 13 | toplama | `+` |
| 13 | çıkarma | `-` |
| ... | ... | ... |
| 3 | atama | `=` |
| ... | ... | ... |

Görüleceği üzere "unary toplama" `16` ile normal toplama işlemi(binary toplama) `13` ün öncesindedir. 
=======
| 14 | unary plus | `+` |
| 14 | unary negation | `-` |
| 13 | exponentiation | `**` |
| 12 | multiplication | `*` |
| 12 | division | `/` |
| 11 | addition | `+` |
| 11 | subtraction | `-` |
| ... | ... | ... |
| 2 | assignment | `=` |
| ... | ... | ... |

As we can see, the "unary plus" has a priority of `14` which is higher than the `11` of "addition" (binary plus). That's why, in the expression `"+apples + +oranges"`, unary pluses work before the addition.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md

## Atama

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Atama operatörü `=` dir. Öncelik sırasında en altlarda yer almaktadır. Böylece `x = 2 * 2 + 1` ifadesi çalıştığında önce tüm işlemler yapılır ardından "=" çalıştırılarak sonuç `x` içerisinde tutulur.
=======
Let's note that an assignment `=` is also an operator. It is listed in the precedence table with the very low priority of `2`.

That's why, when we assign a variable, like `x = 2 * 2 + 1`, the calculations are done first and then the `=` is evaluated, storing the result in `x`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Zincirleme atama yapmak şu şekilde mümkündür:
=======
### Assignment = returns a value
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md

The fact of `=` being an operator, not a "magical" language construct has an interesting implication.

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```
Zincirleme atama sağdan sola doğru olur. Önce en sağdaki değişkene değer atanır. `2+2` değeri önce `c`'ye ardından `b` ve son olarak da `a`'ya atanır. En sonunda tüm değişkenler tek bir değeri alırlar.


````smart header="`\"=\"` operatörü değer döndürür"
=======
All operators in JavaScript return a value. That's obvious for `+` and `-`, but also true for `=`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md

Operatör her zaman değer döndürür. Toplama `+` veya çarpma için `*` bu çok açıktır. Fakat ya atama ? Atama operatörü de aslında değer döndürür. 

Aşağıdaki gibi bir işlem yaptığınızda `value` x'in içine yazılır ve sonra döndürülür.

Daha karmaşık bir örnek şu şekilde yapılabilir:
```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Yukarıdaki örnekte, `(a = b+1)` in sonucu `a` ya atandıktan sonra(3) 3'den çıkarmak için kullanılıyor.

Komik bi kod değil mi? Nasıl çalıştığını anlamanız lazım, bazen başka kütüphaneler kullandığınızda böyle şeyleri sizin yazmanız beklenmez. Böyle olaylar aslında kodun okunaklılığını azaltır.

````

## Kalan: %

Kalan `%` operatörü yüzde ile alakası olmayan bir operatördür.

`a % b` a'nın b'ye bölümünden kalan değeri verir.
=======
In the example above, the result of expression `(a = b + 1)` is the value which was assigned to `a` (that is `3`). It is then used for further evaluations.

Funny code, isn't it? We should understand how it works, because sometimes we see it in JavaScript libraries.

Although, please don't write the code like that. Such tricks definitely don't make code clearer or readable.

### Chaining assignments

Another interesting feature is the ability to chain assignments:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md

Örneğin:
```js run
<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
alert( 5 % 2 ); // 5'in 2 ile bölümünden kalan 1'dir.
alert( 8 % 3 ); // 8'in 3 ile bölümünden kalan 2'dir.
alert( 6 % 3 ); // 6'nın 3 ile bölümünden kalan 0'dır.
```

## Üs alma **

Üs alma operatörü JavaScript diline sonradan eklenen bir operatördür.

Doğal sayı olan `b` değeri için `a ** b` `a`'nın `b` defa kendisiyle çarpılması demektir.

Örneğin:
=======
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Chained assignments evaluate from right to left. First, the rightmost expression `2 + 2` is evaluated and then assigned to the variables on the left: `c`, `b` and `a`. At the end, all the variables share a single value.

Once again, for the purposes of readability it's better to split such code into few lines:

```js
c = 2 + 2;
b = c;
a = c;
```
That's easier to read, especially when eye-scanning the code fast.

## Modify-in-place
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md

We often need to apply an operator to a variable and store the new result in that same variable.

For example:

```js
let n = 2;
n = n + 5;
n = n * 2;
```
Integer olmayan değerler için de aynı işlemi yapmak mümkün örneğin:

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md

```js run
alert( 4 ** (1/2) ); // 2 ( 1/2 üstü karekökü anlamına da gelir.)
alert( 8 ** (1/3) ); // 2 (1/3 üstü ise küp kök anlamına gelir. )
=======
This notation can be shortened using the operators `+=` and `*=`:

```js run
let n = 2;
n += 5; // now n = 7 (same as n = n + 5)
n *= 2; // now n = 14 (same as n = n * 2)

alert( n ); // 14
```

Short "modify-and-assign" operators exist for all arithmetical and bitwise operators: `/=`, `-=`, etc.

Such operators have the same precedence as a normal assignment, so they run after most other calculations:

```js run
let n = 2;

n *= 3 + 5; // right part evaluated first, same as n *= 8

alert( n ); // 16
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md
```
## Artırma/Azaltma

<!-- Başlıkta -- kullanılamıyor çünkü parser bunu – e çeviriyor -->

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Bir sayıyı artırmak veya azlatmak sayısal operasyonlarda önemli sayılabilecek bir düzeydedir.
=======
<!-- Can't use -- in title, because the built-in parser turns it into a 'long dash' – -->
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md

Bunun için özel bir operatör yapılmıştır:

- **Artırma** `++` değişkenin değerini 1 artırır:

    ```js run no-beautify
<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
    let sayac = 2;
    sayac++;      // sayac =  sayac + 1 ile aynı, fakat daha kısa
    alert( sayac ); // 3
=======
    let counter = 2;
    counter++;        // works the same as counter = counter + 1, but is shorter
    alert( counter ); // 3
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md
    ```
- **Azaltma** `--` değişkenin değerini bir azaltır:

    ```js run no-beautify
<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
    let sayac = 2;
    sayac--;      //  sayac =  sayac - 1 ile aynı, fakat daha kısa
    alert( sayac ); // 1
=======
    let counter = 2;
    counter--;        // works the same as counter = counter - 1, but is shorter
    alert( counter ); // 1
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md
    ```

```warn
Artırma/Azaltma sadece değişkenlere uygulanabilirler. `5++` gibi bir kullanım hata verecektir.
```

`++` ve `--` operatörleri değişkenden önce veya sonra kullanılabilirler.


- Operatör değişkenden sonra geliyorsa ona "postfix form" deriz: `counter++`.
- "prefix form" ise opeatörün değişkenden önce geldiği durumdur: `++counter`.

Bu iki durumda da aynı işlem yapılır: `counter` değişkeni `1` arttırılır.

Peki bir farkları var mı? Evet, fakat bunu `++/--` işleminden dönen değerleri kullanırsak görebiliriz.

Şöyle açıklayabiliriz. Bildiğimiz üzere tüm operatörler bir değer döndürür. arttırma/azaltma opeatörleri buna bir istisna değildir. Prefix formu oluşan yeni değeri döndürürken, postfix formu eski değeri(arttırma/azaltma işlemi yapılmadan önceki) döndürür.

Farkı görebilmemiz için örneği inceleyelim:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

`(*)` satırında *prefix* formundaki `++counter` `counter` değişkenini arttırır ve yeni değer olan `2` yi döndürür. Yani `alert` bize `2` değerini gösterecektir.

Şimdi de postfix kullanıma bakalım:

```js run
let counter = 1;
let a = counter++; // (*) changed ++counter to counter++

alert(a); // *!*1*/!*
```

`(*)` satırında *postfix* formundaki `++counter` de aynı şekilde `counter` değişkenini arttırır fakat bu sefer değişkenin *eski* değerini(arttırma işlemi yapılmadan önceki) değerini döndürür. Yani `alert` bize `1` değerini gösterecektir.

Özetle:

- Eğer arttırma/azaltma işleminin sonucunu kullanmıyorsak hangi formu kullandığımızın bir farkı olmaz:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, iki satır da aynı işlemi yaptı.
    ```
- Eğer bir değeri arttıracak *ve* onu aynı anda(o işlem sırasında) kullanacaksak, prefix formunu kullanmamız gerekir:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- Eğer arttırma yapacak fakat arttırma yapmadan yapmadan önceki değeri kullanacaksak, postfix formunu kullanmamız gerekir:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="Diğer operatörler arasında arttırma/azaltma"
`++/--` operatörleri ayrıca bir ifadenin içinde kullanılabilirler. Öncelikleri diğer tüm operatörlerden daha yüksektir.

Örneğin:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

alttaki örnek ile karşılaştıralım:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, çünkü counter++ "eski" değeri döndürecektir
```

Teknik olarak doğru olmakla birlikte bu tür kullanımlar kodu daha az okunur kılar. Bir satırında birden çok işlem yapılması çok iyi değildir.

Kod okurken hızlı bir göz taraması sırasında `counter++` ifadesini gözden kaçırmamız oldukça olasıdır. Değişkenin arttırıldığı açıkça gözükmeyebilir.

"Bir satır -- bir işlem" stili önerilir:

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## Bitsel(Bitwise) Operatörler

Bitsel operatörler argümanlara 32-bitlik doğal sayı gibi davranır ve ikili gösterimleri düzeyinde çalışır.

Bu operatörler JavaScript'e özgü değildir. Çoğu programlama dilinde bulunurlar.

Operatörlerin listesi:

- AND -- VE ( `&` )
- OR -- VEYA ( `|` )
- XOR -- ÖZEL VEYA ( `^` )
- NOT -- DEĞİL ( `~` )
- LEFT SHIFT -- SOLA KAYDIRMA ( `<<` )
- RIGHT SHIFT -- SAĞ KAYDIRMA ( `>>` )
- ZERO-FILL RIGHT SHIFT -- SIFIR DOLDURARAK SAĞ KAYDIRMA ( `>>>` )

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Bu oparatörler çok nadir kullanılır.  Onları anlamak için düşük seviyeli sayı temsiline girmemiz gerekiyor ve özellikle de yakın zamanda onlara ihtiyaç duymayacağımızdan şu anda bunu yapmak uygun olmayacaktır. Merak ediyorsanız, MDN ile ilgili [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) makalesini okuyabilirsiniz. Gerçekten ihtiyacınız olduğunda bunu yapmak daha doğru olacaktır.

## Modify-in-place (Yerinde Değiştir)

Bazen bir değişken üzerinde bir operatör işlemi yaparız ve yeni oluşacak değerini aynı değişkende tutmak isteriz.

Örneğin:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

Bu işlemler `+=` ve `*=` kullanılarak kısaltılabilir:

```js run
let n = 2;
n += 5; // şu an n = 7 (n = n + 5 ile aynı)
n *= 2; // şu an n = 14 (n = n * 2 ile aynı)

alert( n ); // 14
```

Kısa olan "modify-and-assign" operatörleri tüm aritmetik ve bitsel operatörler için mevcuttur: `/=`, `-=`, vb.

Bu tür operatörler normal bir atama(assignment) ile aynı önceliğe sahiptir, bu yüzden diğer birçok hesaplamalardan sonra çalışırlar.

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (önce sağ kısımda işlem yapıldı, n *= 8 gibi)
```
=======
These operators are used very rarely, when we need to fiddle with numbers on the very lowest (bitwise) level. We won't need these operators any time soon, as web development has little use of them, but in some special areas, such as cryptography, they are useful. You can read the [Bitwise Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#bitwise_operators) chapter on MDN when a need arises.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md

## Virgül

Virgül operatörü `,` nadir ve en alışılmadık operatörlerden birisidir. Bazen daha kısa kodlar yazmak için kullanılır. Bu yüzden neler olduğunu anlamak için bu operatörü de bilmemiz gerekiyor.

Virgül operatörü birden fazla ifadeyi virgül `,` ile ayırarak hesaplamamıza olanak sağlar. Her bir ifade işleme alınır fakat bu ifadelerden sadece sonuncusu döndürülür.

Örneğin:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (3 + 4 işleminin sonucu)
```

Burada, ilk ifade olan `1 + 2` işleme giriyor fakat sonucu çöpe atılıyor. Sonrasında gelen `3 + 4` işleme giriyor ve sonuç olarak geri döndürülüyor.

```smart header="Virgül operatörünün önceliği çok düşüktür"
Unutmamak gerekir ki; virgül operatörü çok düşük bir önceliğe sahiptir, önceliği `=`'den bile daha düşüktür. Bu yüzden yukarıdaki örnekte gördüğümüz gibi parantezler çok önemlidir.

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Parantezler olmadan: `a = 1 + 2, 3 + 4` ifadesinde önce `+` işleme alınır, değerler toplanarak `a = 3, 7` ifadesine çevirilir, ondan sonra atama operatörü `=` ile `a = 7` ataması yapılır, ve sonuç olarak virgülden önceki sayı olan `3` işlenmeyerek yok sayılır.
```

Peki neden son kısım hariç her şeyi yok sayan bir operatöre ihtiyacımız var?
=======
Without them: `a = 1 + 2, 3 + 4` evaluates `+` first, summing the numbers into `a = 3, 7`, then the assignment operator `=` assigns `a = 3`, and the rest is ignored. It's like `(a = 1 + 2), 3 + 4`.
```

Why do we need an operator that throws away everything except the last expression?
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md

Bazen bizler; bir satırda birkaç işlem yapılan karmaşık yapılarda bu operatörü kullanırız.

Örneğin:

```js
// Bir satırda 3 farklı işlem
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Bu tarz numaralar birçok JavaScript frameworklerinde kullanılır. Bu yüzden bunlardan bahsettik. Ama genelde bunlar kodun okunabilirliğini azaltıyorlar. Bu yüzden kullanmadan önce iyi düşünmek gerekir.
=======
Such tricks are used in many JavaScript frameworks. That's why we're mentioning them. But usually they don't improve code readability so we should think well before using them.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3:1-js/02-first-steps/08-operators/article.md
