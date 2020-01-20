<<<<<<< HEAD
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
=======
# Arrow functions, the basics

There's another very simple and concise syntax for creating functions, that's often better than Function Expressions.

It's called "arrow functions", because it looks like this:

```js
let func = (arg1, arg2, ...argN) => expression
```

...This creates a function `func` that accepts arguments `arg1..argN`, then evaluates the `expression` on the right side with their use and returns its result.

In other words, it's the shorter version of:

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
};
```

Let's see a concrete example:

```js run
let sum = (a, b) => a + b;

/* This arrow function is a shorter form of:

let sum = function(a, b) {
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
  return a + b;
};
*/

<<<<<<< HEAD
alert( topla(1, 2) ); // 3

```
Eğer tek argüman olsaydı, bu durumda parantez de çıkarılabilirdi, böylece daha da kolay olurdu:


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
let toplam = (a, b) => {  // birden fazla satır yazmak için `{` kullanılmalıdır.
  let sonuc = a + b;
*!*
  return sonuc; // eğer süslü parantez kullanıyorsanız değer döndürmek için return yazmanız gerekmektedir.
*/!*
};

alert( toplam(1, 2) ); // 3
```

```smart header="Dahası var"
Şu anda sadece Ok Fonksiyonlarına giriş yaptık. Fakat elbette tamamı bu değil! Ok fonksiyonun başka ilginç özellikleri de mevcut. Bunlara <info:arrow-functions> bölümünde değinilecektir.

Şimdilik tek satırlı fiillerde ve geri çağrım fonksiyonlarında kullabilirsiniz.
```

## Özet

Ok Fonksiyonları tek satır için kullanışlıdır. İki türlüsü vardır:

1. Süslü parantez olmadan: Fonksiyon sağ taraftaki ifadeyi çalıştırır ve sonucu dönderir. Tek satırda biten işlemler için kullanılmalıdır.
2. Süslü parantez ile `(...args) => { gövde }` -- süslü parantez bizim birden fazla satır yazmamızı sağlar.  Fakat gövde içerisinde `return` kullanılması gerekmektedir.
=======
alert( sum(1, 2) ); // 3
```

As you can, see `(a, b) => a + b` means a function that accepts two arguments named `a` and `b`. Upon the execution, it evaluates the expression `a + b` and returns the result.

- If we have only one argument, then parentheses around parameters can be omitted, making that even shorter.

    For example:

    ```js run
    *!*
    let double = n => n * 2;
    // roughly the same as: let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

- If there are no arguments, parentheses will be empty (but they should be present):

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

Arrow functions can be used in the same way as Function Expressions.

For instance, to dynamically create a function:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome(); // ok now
```

Arrow functions may appear unfamiliar and not very readable at first, but that quickly changes as the eyes get used to the structure.

They are very convenient for simple one-line actions, when we're just too lazy to write many words.

## Multiline arrow functions

The examples above took arguments from the left of `=>` and evaluated the right-side expression with them.

Sometimes we need something a little bit more complex, like multiple expressions or statements. It is also possible, but we should enclose them in curly braces. Then use a normal `return` within them.

Like this:

```js run
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
*!*
  return result; // if we use curly braces, then we need an explicit "return" 
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="More to come"
Here we praised arrow functions for brevity. But that's not all!

Arrow functions have other interesting features.

To study them in-depth, we first need to get to know some other aspects of JavaScript, so we'll return to arrow functions later in the chapter <info:arrow-functions>.

For now, we can already use arrow functions for one-line actions and callbacks.
```

## Summary

Arrow functions are handy for one-liners. They come in two flavors:

1. Without curly braces: `(...args) => expression` -- the right side is an expression: the function evaluates it and returns the result.
2. With curly braces: `(...args) => { body }` -- brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
