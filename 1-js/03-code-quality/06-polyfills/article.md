
# Polyfills

JavaScript gün geçtikçe değişiyor. Sürekli yeni öneriler ekleniyor, analiz ediliyor eğer değerli olduğu kararına varılırsa <https://tc39.github.io/ecma262/> listesine ekleniyor. Sonra ise [özelliklere](http://www.ecma-international.org/publications/standards/Ecma-262.htm) ekleniyor.

JavaScript motorlarını yazan kişiler bu uygulamaları kendi fikirlerine göre sıraya koyarlar. Örneğin aslında özellikler içinde olması gerekeni sonraya bırakıp daha önerileri uygulayabilirler. Özelliklerin çok da önemli olmayabilir veya uygulaması zor olabilir.

Bundan dolayı JavaScript motorunun standartların sadece bazı bölümlerini uygulaması çok normaldir.

Hangi tarayıcıların hangi özellikleri uyguladığını <https://kangax.github.io/compat-table/es6/> adresinden görebilirsiniz.

## Babel

Dilin modern özelliklerini kullandığımızda bazı JavaScript motorları bu özellikleri desteklemeyebilir, söylendiği gibi tüm özellikler her yerde uygulanmayabilir.

Bu durumda bizi Babel kurtarır.


[Babel](https://babeljs.io)  [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler)dır. Yani kaynak kodundan kaynak koduna çeviri yapar. Modern dil özelliklerini kullanarak yazdığımız kodu, eski standartlara çevirir.

Babel iki bölümden oluşmaktadır:

1. Transpiler programı, yani kodu yeniden yazan program. Geliştiriciler bunu kendi bilgisayarlarında yaparlar. Kod eski standartlara göre tekrar yazılır. Ardından web sitesine ulaştırılarak kullanıma açılır. [webpack](http://webpack.github.io/) veya [brunch](http://brunch.io/) otomatik kurma (build) işlemi yapan araçlar anlık olarak her kod değiştiğinde kodu eski standartlara çevirebilirler. Bundan dolayı bizim için çok da bir fark yoktur.

2. The polyfill.

    Transpiler kodu yazdı, yazım özellikleri tamam fakat yeni fonksiyonlar eklendiğinde özel kod yazarak bunların uygulamasını yapmanız gerekir. JavaScript çok dinamik bir dildir. Kodlar sadece yeni fonksiyonları değil var olanları da değiştirir, anca böyle modern standartlara göre kod yazılır.

    "polyfill" ,"doldurma" anlamına gelir ve eksik uygulamaları bizim için uygular.

    Polyfill'e örnek verecek olursak:
    - [babel polyfill](https://babeljs.io/docs/usage/polyfill/) çoğu özelliği destekler. Fakat dosya boyutu büyüktür.
    - [polyfill.io](http://polyfill.io) Bize gerekli olan bölüme göre özellikler ekler.

Bundan dolayıdır ki, eski JavaScript motorlarını desteklemek için kod çevirici (transpiler) ve boşlukları dolduran pollyfill eklemeniz gerekir.

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
