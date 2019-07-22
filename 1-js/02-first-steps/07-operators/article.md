# Operatörler

Çoğu operatörü okuldan hatırlarsınız. Toplama `+`, çarpma `*`, çıkarma `-` vs. 

Bu bölümde okulda görmediğiniz aritmediği işleyeceğiz.

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
- Eğer operatörün iki tane operandı var ise buna binary operand denir. Örneğin çıkarma işlemi aşağıda bu formda bulunur.

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, iki sayının çıkarılması binary operand işlemidir.
    ```
    
    Şeklen, iki operatörden konuşuyoruz. `unary` çıkarma ( tek operand işareti değiştirir) ve binary çıkarma ( iki operatör çıkarma )

## Karakter dizisi birleştirme, binary +

JavaScript'te operatörlerin özel durumlarından birisi karakter dizilerinin `+` işareti ile birleştirilebilmesidir.

Böylece `+` işaretinin amacının ötesinde bir işlem yapabildiğinin farkına varmış olmalısınız.

Normalde `+` iki sayıyı toplamaya yararken eğer bir taraf karakter dizisi ise bu durumda birleştirmeye yarar.

```js
let s = "my" + "string";
alert(s); // mystring
```

Dikkat edin eğer iki operand'dan birisi karakter dizisi ise diğeri ne olursan olsun karakter dizisine çevrilir.

Örneğin:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

Gördüğünüz gibi, ilk operand veya ikinci operandın karakter dizisi olması birşeyi değiştirmiyor. Kural basit, her iki taraftan birisi karakter dizisi ise diğerini de karakter dizisine çevir ve birleştir.

Yani `"+"` işlemi hem birleştirme hem de tip değiştirme yapmaktadır. Bu sadece `"+"` operatörüne has bir olaydır.

Örneğin çıkarma ve çarpmanın davranışı farklıdır:

```js run
alert( 2 - '1' ); // 1
alert( '6' / '2' ); // 3
```

## Sayısal değer dönüştürme, unary + 

`+` iki formda bulunur. Yukarıda kullandığımız binary form(iki tane operand olma olayı) veya unary form(tek operand olması).

Eğer unary `+` veya tek bir değerle kullanılan `+` işareti sayılar ile birşey yapmaz. Fakat eğer bu bir sayı değilse sayıya çevrilir.


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

Bildiğiniz gibi iki karakter dizisini `+` işareti ile toplarsanız birleştirme işlemi yapar:


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
Olaya bir matematikçi gözünden bakarsanız `+` kullanımı garip gelebilir. Fakat bir programcının gözünden özel bir olay yok aslında: operand'ı bir tane olan(unary) toplama işlemi önce uygulanıyor ve karakter dizisini sayıya çeviriyor. Daha sonra iki tane operandlı ( binary) toplama işlemi bunları topluyor.

Neden önce "unary" işlemi gerçekleşiyor da "binary" işlemi gerçekleşmiyor? Buna *yüksek öncelik* diyebiliriz.

## Operatör Öncelikleri

Eğer bir ifade birden fazla operatör içeriyorsa. Bu ifade çalıştırılırken tanımlı *önceliklere* göre çalıştırılır, bir başka ifade ile öncelik sırasına göre çalıştırılır.

<<<<<<< HEAD
Okuldan hepinizin hatırlayacağı gibi çarpma işlemi toplamadan önce yapılır `1 + 2 * 2`. Aslında *öncelik* tam olarakta budur. Çarpma işlemi toplama işleminden daha *yüksek önceliğe* sahiptir.
=======
If an expression has more than one operator, the execution order is defined by their *precedence*, or, in other words, the default priority order of operators.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

Parantez, bu öncelikleri çiğner ve eğer bu *önceliklerden* memnun değilseniz bunları tekrar tanımlamanıza olanak verir. Örneğin `(1 + 2 ) * 2`

<<<<<<< HEAD
JavaScript' dilinde birçok operatör vardır. Her operatörün de bir önceliği. Yüksek öncelik sayısına sahip operatör mnce çalışır. Eğer öncelik değerleri eşit ise soldan sağa doğru çalışır.
=======
Parentheses override any precedence, so if we're not satisfied with the default order, we can use them to change it. For example, write `(1 + 2) * 2`.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

[öncelik tablosu](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence) ( Ezberlemenize gerek yok sadece unary operatörlerin binary olanlara göre daha üstün olduğunu hatırlayın yeter). Yani `+elma + +portakal` işleminde önce unary ile `elma`'nın değerini sayı yapar sonra `portakal`'ın değerini sayı yapar ve en sonunda toplar.


| Öncelik | Adı | İşareti |
|------------|------|------|
| ... | ... | ... |
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

## Atama

Atama operatörü `=` dir. Öncelik sırasında en altlarda yer almaktadır. Böylece `x = 2 * 2 + 1` ifadesi çalıştığında önce tüm işlemler yapılır ardından "=" çalıştırılarak sonuç `x` içerisinde tutulur.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

Zincirleme atama yapmak şu şekilde mümkündür:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```
Zincirleme atama sağdan sola doğru olur. Önce en sağdaki değişkene değer atanır. `2+2` değeri önce `c`'ye ardından `b` ve son olarakta `a` ya atanır. En sonunda tüm değişkenler tek bir değeri alırlar.


````smart header="`\"=\"` operatörü değer dönderir"

Operatör her zaman değer dönderir. Toplama `+` veya çarpma için `*` bu çok açıktır. Fakat ya atama ? Atama operatörü de aslında değer dönderir. 

Aşağıdaki gibi bir işlem yaptığınızda `value` x'in içine yazılır ve sonra dönderilir.

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

<<<<<<< HEAD
Yukarıdaki örnekte, `(a = b+1)` in sonucu `a` ya atandıktan sonra(3) 3'den çıkarmak için kullanılıyor.

Komik bi kod değil mi? Nasıl çalıştığını anlamanız lazım, bazen başka kütüphaneler kullandığınızda böyle şeyleri sizin yazmanız beklenmez. Böyle olaylar aslında kodun okunaklılığını azaltır.
=======
In the example above, the result of expression `(a = b + 1)` is the value which was assigned to `a` (that is `3`). It is then used for further evaluations.

Funny code, isn't it? We should understand how it works, because sometimes we see it in JavaScript libraries, but shouldn't write anything like that ourselves. Such tricks definitely don't make code clearer or readable.
````
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

````

## Kalan: %

Kalan `%` operatörü yüzde ile alakası olmayan bir operatördür.

`a % b` a'nın b'ye bölümünden kalan değeri verir.

Örneğin:
```js run
alert( 5 % 2 ); // 5'in 2 ile bölümünden kalan 1'dir.
alert( 8 % 3 ); // 8'in 3 ile bölümünden kalan 2'dir.
alert( 6 % 3 ); // 6'nın 3 ile bölümünden kalan 0'dır.
```

## Üs alma **

Üs alma operatörü JavaScript diline sonradan eklenen bir operatördür.

Doğal sayı olan `b` değeri için `a ** b` `a`'nın `b` defa kendisiyle çarpılması demektir.

Örneğin:

```js run
alert( 2 ** 2 ); // 4  (2 * 2)
alert( 2 ** 3 ); // 8  (2 * 2 * 2)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2)
```
Integer olmayan değerler için de aynı işlemi yapmak mümkün örneğin:


```js run
alert( 4 ** (1/2) ); // 2 ( 1/2 üstü karekökü anlamına da gelir.)
alert( 8 ** (1/3) ); // 2 (1/3 üstü ise küp kök anlamına gelir. )
```
## Artırma/Azaltma

<!-- Başlıkta -- kullanılamıyor çünkü parser bunu – e çeviriyor -->

Bir sayıyı artırmak veya azlatmak sayısal operasyonlarda önemli sayılabilecek bir düzeydedir.

Bunun için özel bir operatör yapılmıştır:

- **Artırma** `++` değişkenin değerini 1 artırır:

    ```js run no-beautify
    let sayac = 2;
    sayac++;      // sayac =  sayac + 1 ile aynı, fakat daha kısa
    alert( sayac ); // 3
    ```
- **Azaltma** `--` değişkenin değerini bir azaltır:

    ```js run no-beautify
    let sayac = 2;
    sayac--;      //  sayac =  sayac - 1 ile aynı, fakat daha kısa
    alert( sayac ); // 1
    ```

```warn
Artırma/Azaltma sadece değişkenlere uygulanabilirler. `5++` gibi bir kullanım hata verecektir.
```

`++` ve `--` operatörleri değişkenden önce veya sonra kullanılabilirler.


- When the operator goes after the variable, it is called a "postfix form": `counter++`.
- The "prefix form" is when the operator stands before the variable: `++counter`.

Both of these records do the same: increase `counter` by `1`.

Is there any difference? Yes, but we can only see it if we use the returned value of `++/--`.

Let's clarify. As we know, all operators return a value. Increment/decrement is not an exception here. The prefix form returns the new value, while the postfix form returns the old value (prior to increment/decrement).

To see the difference, here's the example:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

Here in the line `(*)` the prefix call `++counter` increments `counter` and returns the new value that is `2`. So the `alert` shows `2`.

Now let's use the postfix form:

```js run
let counter = 1;
let a = counter++; // (*) changed ++counter to counter++

alert(a); // *!*1*/!*
```

In the line `(*)` the *postfix* form `counter++` also increments `counter`, but returns the *old* value (prior to increment). So the `alert` shows `1`.

To summarize:

- If the result of increment/decrement is not used, then there is no difference in which form to use:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, the lines above did the same
    ```
- If we'd like to increase the value *and* use the result of the operator right now, then we need the prefix form:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- If we'd like to increment, but use the previous value, then we need the postfix form:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="Increment/decrement among other operators"
Operators `++/--` can be used inside an expression as well. Their precedence is higher than most other arithmetical operations.

For instance:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

Compare with:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, because counter++ returns the "old" value
```

Though technically allowable, such notation usually makes the code less readable. One line does multiple things -- not good.

While reading the code, a fast "vertical" eye-scan can easily miss such `counter++`, and it won't be obvious that the variable increases.

The "one line -- one action" style is advised:

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## Bitwise operators

Bitwise operators treat arguments as 32-bit integer numbers and work on the level of their binary representation.

These operators are not JavaScript-specific. They are supported in most programming languages.

The list of operators:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

These operators are used very rarely. To understand them, we should delve into low-level number representation, and it would not be optimal to do that right now. Especially because we won't need them any time soon. If you're curious, you can read the [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) article in MDN. It would be more practical to do that when a real need arises.

## Modify-in-place

We often need to apply an operator to a variable and store the new result in that same variable.

For example:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

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

n *= 3 + 5;

alert( n ); // 16  (right part evaluated first, same as n *= 8)
```

## Comma

The comma operator `,` is one of the rarest and most unusual operators. Sometimes, it's used to write shorter code, so we need to know it in order to understand what's going on.

The comma operator allows us to evaluate several expressions, dividing them with a comma `,`. Each of them is evaluated but only the result of the last one is returned.

For example:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (the result of 3 + 4)
```

Here, the first expression `1 + 2` is evaluated and its result is thrown away. Then, `3 + 4` is evaluated and returned as the result.

```smart header="Comma has a very low precedence"
Please note that the comma operator has very low precedence, lower than `=`, so parentheses are important in the example above.

Without them: `a = 1 + 2, 3 + 4` evaluates `+` first, summing the numbers into `a = 3, 7`, then the assignment operator `=` assigns `a = 3`, and the rest is ignored. It's like `(a = 1 + 2), 3 + 4`.
```

Why do we need an operator that throws away everything except the last expression?

Sometimes, people use it in more complex constructs to put several actions in one line.

For example:

```js
// three operations in one line
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Such tricks are used in many JavaScript frameworks. That's why we're mentioning them. But usually they don't improve code readability so we should think well before using them.
