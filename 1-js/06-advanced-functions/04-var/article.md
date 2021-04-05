
<<<<<<< HEAD
# Eski tip "var" 
=======
# The old "var"

```smart header="This article is for understanding old scripts"
The information in this article is useful for understanding old scripts.

That's not how we write a new code.
```

In the very first chapter about [variables](info:variables), we mentioned three ways of variable declaration:
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

İlk bölümde [degiskenler](info:variables) altında üç çeşit değişken tanımlama yöntemi olduğundan bahsedilmişti.
1. `let`
2. `const`
3. `var`

<<<<<<< HEAD
`let` ve `const` Sözcüksel Ortam anlamında birbiri ile tam olarak aynıdır.

Fakat `var` bunlardan çok farklıdır. Bunun dilin ilk oluşmaya başladığı zamanlara dayanır. Genelde modern stilde pek kullanılmazlar fakat yine de arada sırada görebilirsiniz.

Eğer böyle bir yazımla karşılaşmayacağınıza eminseniz bu bölümü geçebiir veya sonra tekrar gelebilirsiniz.
[cut]

İlk görüşte `var` `let` ile benzer şekilde çalışıyormuş gibi görünür. İkisi de değişken tanımlamaya yarar:

```js run
function selamVer() {
  var terim = "Merhaba"; // yeerl değişken "let" yerine "var" kullanılmıştır.
  alert(terim); // Merhaba
}

selamVer();

alert(terim); // Hata! terim tanımlı değil.
```

...Fakat farklılık tam da burada ortaya çıkar.
=======
The `var` declaration is similar to `let`. Most of the time we can replace `let` by `var` or vice-versa and expect things to work:

```js run
var message = "Hi";
alert(message); // Hi
```

But internally `var` is a very different beast, that originates from very old times. It's generally not used in modern scripts, but still lurks in the old ones.

If you don't plan on meeting such scripts you may even skip this chapter or postpone it.

On the other hand, it's important to understand differences when migrating old scripts from `var` to `let`, to avoid odd errors.

## "var" has no block scope

Variables, declared with `var`, are either function-scoped or global-scoped. They are visible through blocks.

For instance:

```js run
if (true) {
  var test = true; // use "var" instead of "let"
}
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

## "var"'ın blok kapsamı yoktur

<<<<<<< HEAD
`var` ya fonksiyon içinde yada globalde tanımlanır, diğer türlü tüm bloklar içerisinden erişilebilir.
=======
As `var` ignores code blocks, we've got a global variable `test`.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

Örneğin:

```js
if (true) {
  var test = true; // "let" yerine "var" kullanıldı
}

*!*
<<<<<<< HEAD
alert(test); // true, değişken if'ten sonra da varlığına devam etti.
=======
alert(test); // ReferenceError: test is not defined
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3
*/!*
```
Eğer 2. satırda `let test` kullanılsaydı `alert` içerisinde görünür olmazdır. Fakat `var` kod bloğunu görmezden gelir. Bundan dolayı global bir `test` değişkeni olmuş olur.

Aynı şekilde döngüler için de `var` döngünün dışında da erişilebilirdir:

```js
<<<<<<< HEAD
for(var i = 0; i < 10; i++) {
=======
for (var i = 0; i < 10; i++) {
  var one = 1;
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3
  // ...
}

*!*
<<<<<<< HEAD
alert(i); // 10,"i" döngüden sonra görülebilirdir, evrensel değişken olarak çalışır.
=======
alert(i);   // 10, "i" is visible after loop, it's a global variable
alert(one); // 1, "one" is visible after loop, it's a global variable
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3
*/!*
```

Eğer fonksiyonun içinde bir `if` bloğu varsa bu durumda `var` fonksiyon seviyesinde bir değişken olur:

```js
function selamVer() {
  if (true) {
    var terim = "Merhaba";
  }

  alert(terim); // çalışıyor
}

<<<<<<< HEAD
selamVer();
alert(terim); // Hata: terim tanımlı değildir.
```

Eğer `if`, `for`'a rağmen çalışan `var` değişkenleri görürseniz bunun nedeni önceden JavaScript'te blokların Sözcüksel Ortama dahil olmamasındandır.

## "var" fonksiyon çalışmaya başladığında işlenir.
=======
sayHi();
alert(phrase); // ReferenceError: phrase is not defined
```

As we can see, `var` pierces through `if`, `for` or other code blocks. That's because a long time ago in JavaScript, blocks had no Lexical Environments, and `var` is a remnant of that.

## "var" tolerates redeclarations

If we declare the same variable with `let` twice in the same scope, that's an error:

```js run
let user;
let user; // SyntaxError: 'user' has already been declared
```

With `var`, we can redeclare a variable any number of times. If we use `var` with an already-declared variable, it's just ignored:

```js run
var user = "Pete";

var user = "John"; // this "var" does nothing (already declared)
// ...it doesn't trigger an error

alert(user); // John
```

## "var" variables can be declared below their use
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

`var` tanımları fonksiyon ( veya script ) çalıştığında tanımlanır.

Diğer bir deyişle `var` değişkenleri fonksiyon başlangıcında tanımlanır, tanımın nerede olduğu önemli değil. ( iç içe fonksiyonları hariç tabi )

Aşağıdaki koda bakarsanız:

```js
function selamVer() {
  terim = "Merhaba";

  alert(terim);

*!*
  var terim;
*/!*
}
```
...Teknik olarak aşağıdaki gibidir.

```js
function selamVer() {
*!*
  var terim;
*/!*

  terim = "Merhaba";

  alert(terim);
}
```
...Hatta şu şekilde de olabilir:

```js
function selamVer() {
  terim = "Merhaba"; // (*)

  *!*
  if (false) {
    var terim;
  }
  */!*

  alert(terim);
}
```
Bu davranışa "yükseltilme" davranışı da denir, çünkü tüm `var` ile tanımlamalar fonksiyonun başına "yükseltilme"

Bundan dolayı yukarıdaki örnekte `if(false)` hiç bir zaman çalışmayacaktır, zaten önemli de değildir. İçinde bulunan `var` fonksiyonun başında işlenir. Yani `(*)` anında zaten `terim` değişkeni vardır.

**Tanımlar yükseltilir fakat atamalar yükseltilmez**

<<<<<<< HEAD
Bir örnekle göstermek gerekirse:
=======
That's best demonstrated with an example:
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

```js run
function selamVer() {
  alert(terim);  

*!*
  var terim = "Merhaba";
*/!*
}

selamVer();
```
`var terim = "Merhaba"` iki tane aksiyon barındırır:

1. Değişken tanımlama `var` 
2. Değişken atama `=`.

Tanımlama "yükseltilme" işlemi ile fonksiyon başlangıcında yapılır. Fakat atama kod neredeyse orada yapılır. Bundan dolayı kod aslında tam olarak aşağıdaki gibi çalışır:

```js run
function selamVer() {
*!*
  var terim; // tanımalma başlangıçta çalışır.
*/!*

  alert(terim); // tanımsız

*!*
  terim = "Merhaba"; // ...atama burada yapılır.
*/!*
}

selamVer();
``` 
  
Tüm `var` tanımları fonksiyon başladığında işlendiğinden dolayı, istenildiği yerlere bu değişkenlere erişim bulunmaktadır. Fakat değişkenler atama yapılana kadar tanımsızdır ( undefined ).

<<<<<<< HEAD
Yukarıdaki her iki `alert` örneği de hatasız çalışmaktadır çünkü `terim` mevcuttur. Değeri atanmadığından `undefined` göstermiştir.
=======
In both examples above, `alert` runs without an error, because the variable `phrase` exists. But its value is not yet assigned, so it shows `undefined`.

## IIFE

In the past, as there was only `var`, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called "immediately-invoked function expressions" (abbreviated as IIFE).

That's not something we should use nowadays, but you can find them in old scripts.

An IIFE looks like this:

```js run
(function() {

  var message = "Hello";

  alert(message); // Hello

})();
```

Here, a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

The Function Expression is wrapped with parenthesis `(function {...})`, because when JavaScript engine encounters `"function"` in the main code, it understands it as the start of a Function Declaration. But a Function Declaration must have a name, so this kind of code will give an error:

```js run
// Tries to declare and immediately call a function
function() { // <-- SyntaxError: Function statements require a function name

  var message = "Hello";

  alert(message); // Hello

}();
```

Even if we say: "okay, let's add a name", that won't work, as JavaScript does not allow Function Declarations to be called immediately:

```js run
// syntax error because of parentheses below
function go() {

}(); // <-- can't call Function Declaration immediately
```

So, the parentheses around the function is a trick to show JavaScript that the function is created in the context of another expression, and hence it's a Function Expression: it needs no name and can be called immediately.

There exist other ways besides parentheses to tell JavaScript that we mean a Function Expression:

```js run
// Ways to create IIFE

(function() {
  alert("Parentheses around the function");
}*!*)*/!*();

(function() {
  alert("Parentheses around the whole thing");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Bitwise NOT operator starts the expression");
}();

*!*+*/!*function() {
  alert("Unary plus starts the expression");
}();
```

In all the above cases we declare a Function Expression and run it immediately. Let's note again: nowadays there's no reason to write such code.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

## Özet

`var`'ın iki tane ana farklılığı mevcuttur:

<<<<<<< HEAD
1. Değişkenlerin blok limiti yoktur. En düşük fonksiyon içerisinden görünebilirler. Yani aynı fonksiyon içerisinde farklı bir bloğun içinde yazılsa bile fonksiyon içinden erişilebilmektedir.
2. Değişkenlerin tanımlanması fonksiyon başladığında gerçekleşir.

Evrensel obje söz konusu olduğunda bir farklılık bulunmaktadır bunu bir sonraki bölümde göreceğiz.
=======
1. `var` variables have no block scope, their visibility is scoped to current function, or global, if declared outside function.
2. `var` declarations are processed at function start (script start for globals).

There's one more very minor difference related to the global object, that we'll cover in the next chapter.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

Bu farklılıklar aslında kötüdür. Öncelikle blok seviyesinde değişken yaratılmamaktadır. "Yükseltme" olayı hataya neden olabilmektedir. Bundan dolayı yeni kodlarda `var` çok nadir olarak kullanılır.