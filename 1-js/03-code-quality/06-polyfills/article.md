
# Polyfills and transpilers

JavaScript gün geçtikçe değişiyor. Sürekli yeni öneriler ekleniyor, analiz edliyor eğer değerli olduğu kararına varılırsa <https://tc39.github.io/ecma262/> listesine ekleniyor. Sonra ise [özelliklere](http://www.ecma-international.org/publications/standards/Ecma-262.htm) ekleniyor.

JavaScript motorlarını yazan kişiler bu uygulamaları kendi fikirlerine göre sıraya koyarlar. Örneğin aslında özellikler içinde olması gerekeni sonraya bırakıp daha önerileri uygulayabilirler. Özelliklerin çokta önemli olmayabilir veya uygulaması zor olabilir.

Bundan dolayı JavaScript motorunun standartların sadece bazı bölümlerini uygulaması çok normaldir.

Hangi tarayıcıların hangi özellikleri uyguladığını <https://kangax.github.io/compat-table/es6/> adresinden görebilirsiniz.

As programmers, we'd like to use most recent features. The more good stuff - the better!

<<<<<<< HEAD
Dilin modern özelliklerini kullandığımızda bazı JavaScript motorları bu özellikleri desteklemeyebilir, söylendiği gibi tüm özellikler her yerde uygulanmayabilir.

Bu durumda bizi Babel kurtarır.


[Babel](https://babeljs.io)  [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler)dır. Yani kaynak kodundan kaynak koduna çeviri yapar. Modern dil özelliklerini kullanarak yazdığımız kodu, eski standartlara çevirir.

Babel iki bölümden oluşmaktadır:

1. Transpiler programi, yani kodu yeniden yazan program. Geliştiriciler bunu kendi bilgisayarlarında yaparlar. Kod eski standartlara göre tekrar yazılır. Ardından web sitesine ulaştırılarak kullanıma açılır. [webpack](http://webpack.github.io/) veya [brunch](http://brunch.io/) otomatik kurma(Build) işlemi yapan araçlar anlık olarak her kod değiştiğinde kodu eski standartlara çevireiblirler. Bundan dolayı bizim için çokta bir fark yoktur.

2. The polyfill.

    Transpiler kodu yazdı, yazım özellikleri tamam fakat yeni fonksiyonlar eklendiğinde özel kod yazarak bunların uygulamasını yapmanız gerekir. JavaScript çok dinamik bir dildir. Kodlar sadece yeni fonksiyonları değil var olanları da değiştirir, anca böyle modern standartlara göre kod yazılır.

    "polyfill" ,"doldurma" anlamına gelir ve eksik uygulamaları bizim için uygular.

    Polyfill'e örnek verecek olursak:
    - [babel polyfill](https://babeljs.io/docs/usage/polyfill/) çoğu özelliği destekler. Fakat dosya boyutu büyüktür.
    - [polyfill.io](http://polyfill.io) Bize gerekli olan bölüme göre özellikler ekler.

Bundan dolayıdır ki, eski JavaScript motorlarını desteklemek için kod çevirici ( transpiler ) ve boşlukları dolduran pollyfill eklemeniz gerekir.

Sadece her yerde desteklenen özellikleri kullanıyorsanız ve modern JavaScript motorlarına yönelik yazıyorsanız bu durumda Babel'e ihtiyacınız yoktur.

## Bu dersteki örnekler


````Çevirim İçi
Çoğu özellik aşağıdaki gibi olduğu yerden çalışır:

```js run
alert('Sağ üst taraftaki "Oynat" butonuna basarak örneği çalıştırabilirsiniz.');
```
Buradaki örnekler sadece browser desteler ise çalışır.
````

```Çevirim Dışı
Çevirim Dışı versiyonunu yani pdf vs. okuyorsanız örnekleri doğal olarak çalıştıramazsınız. Fakat genelde çalışıyorlar :)
```

[Chrome Canary](https://www.google.com/chrome/browser/canary.html) üzerinde tüm örnekler çalıştırılabilir fakat diğer modern tarayıcılarda da çalışması lazım.

Kodu canlı sistemde çalıştırırken, Babel kullanarak eski tarayıcılara da destek verebilirsiniz, kod bu şekilde her yerde çalışmış olacaktır.
=======
On the other hand, how to make our modern code work on older engines that don't understand recent features yet?

There are two tools for that:

1. Transpilers.
2. Polyfills.

Here, in this chapter, our purpose is to get the gist of how they work, and their place in web development.

## Transpilers

A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) is a special piece of software that translates source code to another source code. It can parse ("read and understand") modern code and rewrite it using older syntax constructs, so that it'll also work in outdated engines.

E.g. JavaScript before year 2020 didn't have the "nullish coalescing operator" `??`. So, if a visitor uses an outdated browser, it may fail to understand the code like `height = height ?? 100`.

A transpiler would analyze our code and rewrite `height ?? 100` into `(height !== undefined && height !== null) ? height : 100`.

```js
// before running the transpiler
height = height ?? 100;

// after running the transpiler
height = (height !== undefined && height !== null) ? height : 100;
```

Now the rewritten code is suitable for older JavaScript engines.

Usually, a developer runs the transpiler on their own computer, and then deploys the transpiled code to the server.

Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there. 

Modern project build systems, such as [webpack](http://webpack.github.io/), provide means to run transpiler automatically on every code change, so it's very easy to integrate into development process.

## Polyfills

New language features may include not only syntax constructs and operators, but also built-in functions.

For example, `Math.trunc(n)` is a function that "cuts off" the decimal part of a number, e.g `Math.trunc(1.23)` returns `1`.

In some (very outdated) JavaScript engines, there's no `Math.trunc`, so such code will fail.

As we're talking about new functions, not syntax changes, there's no need to transpile anything here. We just need to declare the missing function.

A script that updates/adds new functions is called "polyfill". It "fills in" the gap and adds missing implementations.

For this particular case, the polyfill for `Math.trunc` is a script that implements it, like this:

```js
if (!Math.trunc) { // if no such function
  // implement it
  Math.trunc = function(number) {
    // Math.ceil and Math.floor exist even in ancient JavaScript engines
    // they are covered later in the tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript is a highly dynamic language, scripts may add/modify any functions, even including built-in ones. 

Two interesting libraries of polyfills are:
- [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
- [polyfill.io](http://polyfill.io) service that provides a script with polyfills, depending on the features and user's browser.


## Summary

In this chapter we'd like to motivate you to study modern and even "bleeding-edge" language features, even if they aren't yet well-supported by JavaScript engines.

Just don't forget to use transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). And they'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](http://webpack.github.io/) with [babel-loader](https://github.com/babel/babel-loader) plugin.

Good resources that show the current state of support for various features:
- <https://kangax.github.io/compat-table/es6/> - for pure JavaScript.
- <https://caniuse.com/> - for browser-related functions.

P.S. Google Chrome is usually the most up-to-date with language features, try it if a tutorial demo fails. Most tutorial demos work with any modern browser though.

>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
