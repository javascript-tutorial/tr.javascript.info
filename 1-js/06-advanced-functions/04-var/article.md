
<<<<<<< HEAD
# Eski tip "var" 
=======
# The old "var"

```smart header="This article is for understanding old scripts"
The information in this article is useful for understanding old scripts.

That's not how we write a new code.
```

In the very first chapter about [variables](info:variables), we mentioned three ways of variable declaration:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

İlk bölümde [degiskenler](info:variables) altında üç çeşit değişken tanımlama yöntemi olduğundan bahsedilmişti.
1. `let`
2. `const`
3. `var`

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

<<<<<<< HEAD
...Fakat farklılık tam da burada ortaya çıkar.
=======
...But here are the differences.

## "var" has no block scope

Variables, declared with `var`, are either function-wide or global. They are visible through blocks.

For instance:

```js run
if (true) {
  var test = true; // use "var" instead of "let"
}
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

## "var"'ın blok kapsamı yoktur

<<<<<<< HEAD
`var` ya fonksiyon içinde yada globalde tanımlanır, diğer türlü tüm bloklar içerisinden erişilebilir.
=======
As `var` ignores code blocks, we've got a global variable `test`.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

Örneğin:

```js
if (true) {
  var test = true; // "let" yerine "var" kullanıldı
}

*!*
alert(test); // true, değişken if'ten sonra da varlığına devam etti.
*/!*
```
Eğer 2. satırda `let test` kullanılsaydı `alert` içerisinde görünür olmazdır. Fakat `var` kod bloğunu görmezden gelir. Bundan dolayı global bir `test` değişkeni olmuş olur.

Aynı şekilde döngüler için de `var` döngünün dışında da erişilebilirdir:

```js
for(var i = 0; i < 10; i++) {
  // ...
}

*!*
alert(i); // 10,"i" döngüden sonra görülebilirdir, evrensel değişken olarak çalışır.
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

selamVer();
alert(terim); // Hata: terim tanımlı değildir.
```

Eğer `if`, `for`'a rağmen çalışan `var` değişkenleri görürseniz bunun nedeni önceden JavaScript'te blokların Sözcüksel Ortama dahil olmamasındandır.

## "var" fonksiyon çalışmaya başladığında işlenir.

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
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

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

Yukarıdaki her iki `alert` örneği de hatasız çalışmaktadır çünkü `terim` mevcuttur. Değeri atanmadığından `undefined` göstermiştir.

<<<<<<< HEAD
## Özet
=======
### IIFE

As in the past there was only `var`, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called "immediately-invoked function expressions" (abbreviated as IIFE).

That's not something we should use nowadays, but you can find them in old scripts.

An IIFE looks like this:

```js run
(function() {

  let message = "Hello";

  alert(message); // Hello

})();
```

Here a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

The Function Expression is wrapped with parenthesis `(function {...})`, because when JavaScript meets `"function"` in the main code flow, it understands it as the start of a Function Declaration. But a Function Declaration must have a name, so this kind of code will give an error:

```js run
// Try to declare and immediately call a function
function() { // <-- Error: Function statements require a function name

  let message = "Hello";

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

## Summary
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

`var`'ın iki tane ana farklılığı mevcuttur:

1. Değişkenlerin blok limiti yoktur. En düşük fonksiyon içerisinden görünebilirler. Yani aynı fonksiyon içerisinde farklı bir bloğun içinde yazılsa bile fonksiyon içinden erişilebilmektedir.
2. Değişkenlerin tanımlanması fonksiyon başladığında gerçekleşir.

<<<<<<< HEAD
Evrensel obje söz konusu olduğunda bir farklılık bulunmaktadır bunu bir sonraki bölümde göreceğiz.
=======
There's one more very minor difference related to the global object, that we'll cover in the next chapter.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

Bu farklılıklar aslında kötüdür. Öncelikle blok seviyesinde değişken yaratılmamaktadır. "Yükseltme" olayı hataya neden olabilmektedir. Bundan dolayı yeni kodlarda `var` çok nadir olarak kullanılır.