
# Polyfills

JavaScript gün geçtikçe değişiyor. Sürekli yeni öneriler ekleniyor, analiz edliyor eğer değerli olduğu kararına varılırsa <https://tc39.github.io/ecma262/> listesine ekleniyor. Sonra ise [özelliklere](http://www.ecma-international.org/publications/standards/Ecma-262.htm) ekleniyor.

JavaScript motorlarını yazan kişiler bu uygulamaları kendi fikirlerine göre sıraya koyarlar. Örneğin aslında özellikler içinde olması gerekeni sonraya bırakıp daha önerileri uygulayabilirler. Özelliklerin çokta önemli olmayabilir veya uygulaması zor olabilir.

Bundan dolayı JavaScript motorunun standartların sadece bazı bölümlerini uygulaması çok normaldir.

Hangi tarayıcıların hangi özellikleri uyguladığını <https://kangax.github.io/compat-table/es6/> adresinden görebilirsiniz.

## Babel

Dilin modern özelliklerini kullandığımızda bazı JavaScript motorları bu özellikleri desteklemeyebilir, söylendiği gibi tüm özellikler her yerde uygulanmayabilir.

Bu durumda bizi Babel kurtarır.


[Babel](https://babeljs.io)  [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler)dır. Yani kaynak kodundan kaynak koduna çeviri yapar. Modern dil özelliklerini kullanarak yazdığımız kodu, eski standartlara çevirir.

<<<<<<< HEAD
Babel iki bölümden oluşmaktadır:
=======
1. First, the transpiler program, which rewrites the code. The developer runs it on their own computer. It rewrites the code into the older standard. And then the code is delivered to the website for users. Modern project build systems like [webpack](http://webpack.github.io/) provide means to run transpiler automatically on every code change, so that it's very easy to integrate into development process.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

1. Transpiler programi, yani kodu yeniden yazan program. Geliştiriciler bunu kendi bilgisayarlarında yaparlar. Kod eski standartlara göre tekrar yazılır. Ardından web sitesine ulaştırılarak kullanıma açılır. [webpack](http://webpack.github.io/) veya [brunch](http://brunch.io/) otomatik kurma(Build) işlemi yapan araçlar anlık olarak her kod değiştiğinde kodu eski standartlara çevireiblirler. Bundan dolayı bizim için çokta bir fark yoktur.

2. The polyfill.

    Transpiler kodu yazdı, yazım özellikleri tamam fakat yeni fonksiyonlar eklendiğinde özel kod yazarak bunların uygulamasını yapmanız gerekir. JavaScript çok dinamik bir dildir. Kodlar sadece yeni fonksiyonları değil var olanları da değiştirir, anca böyle modern standartlara göre kod yazılır.

<<<<<<< HEAD
    "polyfill" ,"doldurma" anlamına gelir ve eksik uygulamaları bizim için uygular.
=======
    Two interesting polyfills are:
    - [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
    - [polyfill.io](http://polyfill.io) service that provides a script with polyfills, depending on the features and user's browser.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

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
