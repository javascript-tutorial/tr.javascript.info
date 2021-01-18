<<<<<<< HEAD
# Mocha ile otomatik test yazma.

Bundan sonraki görevlerde otomatik test kullanılacak.

It's actually a part of the "educational minimum" of a developer.
=======
# Automated testing with Mocha

Automated testing will be used in further tasks, and it's also widely used in real projects.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

## Neden teste ihtiyac var?

Fonksiyon yazıldığında, genelde ne olması gerektiğini düşünürüz: hangi parametre hangi sonucu verecek gibi.

Geliştirme yaparken, bu fonksiyonun çıktısı ile bekleneni birbiri ile karşılaştırılabilir. Örneğin bu konsolda yapılabilir.

Eğer birşey yanlışsa kod değiştirilir ve tekrar çalıştırılır, ta ki doğru çalışana dek.

Fakat bunları tekrar tekrar çalıştırmak iyi bir yöntem değildir.

**Bu tekrarları yaparken, bir şeyleri atlamak çokça karşılaşılan bir durumdur**

Örneğin, `f` diye bir fonksiyon yazılırken. Test: `f(1)` çalışır fakat `f(2)` çalışmaz. Kod düzeltildi, şimdi  `f(2)`çalışmakta. Tamamlandı mı? Fakat `f(1)` tekrar test edilmedi. Bu bir hataya neden olabilir.

Bu çok tipiktir. Birşey geliştirirken çoğu zaman muhtemel olan durumları aklımızda tutarız. Fakat programcıların bu durumların tamamını aklında tutması beklenemez. Bundan dolayı bir tanesini düzeltirken diğerini kırmak çokça yaşanılan bir durumdur.

<<<<<<< HEAD
=======
**Automated testing means that tests are written separately, in addition to the code. They run our functions in various ways and compare results with the expected.**
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

**Otomatik testlerin koddan ayrı yazılması demektir. Kolayca çalıştırılır ve tüm durumları kontrol edebilir**

<<<<<<< HEAD
## Davranışa Yönelik Geliştirme  - Behaviour Driven Development(BDD)
=======
Let's start with a technique named [Behavior Driven Development](http://en.wikipedia.org/wiki/Behavior-driven_development) or, in short, BDD.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

Diyelim ki [Davranışa Yönelik Geliştirme](http://en.wikipedia.org/wiki/Behavior-driven_development) tekniğini kullandınız, BDD sadece test için değil, bundan daha fazlasıdır.

<<<<<<< HEAD
**BDD üç şeyin içiçe bulunmasıdır. Bunlar: test,dökümantasyon ve örneklerdir.**
=======
To understand BDD, we'll examine a practical case of development.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

Yeteri kadar konuştuk. Şimdi örneklere geçebiliriz.

## Üs fonksiyonunun geliştirilmesi: Özellikler

Diyelimki `us(x,n)` adında bir fonksiyon yazmak isteyelim. Bu `x`i üssü olan `n` kadar artırsın. Ayrıca `n≥0` olduğunu varsayalım.

Bu görev sadece örnektir: Bunun yaptığını yapan `**` operatörü vardır ve aynı işi yapar. Burada bizim konsantre olacağımız olay bunun geliştirilmesi sürecidir. Bu daha karmaşık görevlerde de aynı şekilde kullanılabilir.

<<<<<<< HEAD
`us` fonksiyonunu yaratmadan önce, fonksiyonun ne yapacağını tanımlamanız gerekmektedir.

Bu tanımlamaya *ayrıntılar* veya *özellikler* diyebilirsiniz. Kısaca bu aşağıdaki gibidir:
=======
Such description is called a *specification* or, in short, a spec, and contains descriptions of use cases together with tests for them, like this:
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

```js
describe("us", function() {

  it("n. kuvvetini alir", function() {
    assert.equal(us(2, 3), 8);
  });

});
```
Bu özelliğin 3 ana bölümü vardır:


`describe("baslik", function() { ... })`
: Fonksiyonun neyi tanımladığı yazılır. Bizim durumumuzda bu üs'tür.

<<<<<<< HEAD
`it("baslik", function() { ... })`
: `it` bölümünde ise daha okunaklı bir şekilde, hangi koşulda ne yaptığı açıklanır. ikinci argüman ise bunu test eder.

=======
`describe("title", function() { ... })`
: What functionality we're describing. In our case we're describing the function `pow`. Used to group "workers" -- the `it` blocks.

`it("use case description", function() { ... })`
: In the title of `it` we *in a human-readable way* describe the particular use case, and the second argument is a function that tests it.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

`assert.equal(value1, value2)`
: `it` bloğunun içindeki ko eğer doğru ise hatasız döner.

<<<<<<< HEAD
    `assert*` fonksiyonu `us`'ün beklendiği gibi çalışıp çalışmadığını kontrol eder. Burada `assert.equal`'ı kullanılmaktadır. Argümanları karşılaştırarak eşitlik olmadığı durumda hata verir. Burada `us(2,3)`, `8` e eşit mi diye bakılır

    İleriki dönemlerde farklı karşılaştırmaları göreceksiniz.
=======
    Functions `assert.*` are used to check whether `pow` works as expected. Right here we're using one of them -- `assert.equal`, it compares arguments and yields an error if they are not equal. Here it checks that the result of `pow(2, 3)` equals `8`. There are other types of comparisons and checks, that we'll add later.

The specification can be executed, and it will run the test specified in `it` block. We'll see that later.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311


## Geliştirme akışı

<<<<<<< HEAD
Genelde akış şu şekildedir:
=======
1. An initial spec is written, with tests for the most basic functionality.
2. An initial implementation is created.
3. To check whether it works, we run the testing framework [Mocha](http://mochajs.org/) (more details soon) that runs the spec. While the functionality is not complete, errors are displayed. We make corrections until everything works.
4. Now we have a working initial implementation with tests.
5. We add more use cases to the spec, probably not yet supported by the implementations. Tests start to fail.
6. Go to 3, update the implementation till tests give no errors.
7. Repeat steps 3-6 till the functionality is ready.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

1. Başlangıçta en basit fonksiyonalite test edilir.
2. Bunun uygulaması yapılmıştır.
3. Çalışıp çalışmadığını  [Mocha](http://mochajs.org/) kullanarak yapabilirsiniz. Hata alındığında kod tekrar düzeltilmeli, taki herşey düzgün şekilde çalışana kadar.
4. Şu anda çalışan ve uygulaması yapılmmış bir testiniz var.
5. Daha fazla koşul ekleyerek bunların uygulamasını yazdığınızda testlerde hata almaya başlarsınız.
6. Üçüncü adıma dönüp bu testlerin hatalarını düzeltene kadar hata almaya devam edersiniz.
7. 3-6 arasını düzelterek tüm fonksiyonalite hazır oluncaya kadar devam edin.

<<<<<<< HEAD
Öyleyse geliştirme süreklilik tekrar bu işlemler üzerinden geçerek devam eder. *Özellikleri* yazıldıktan sonra, bunların uygulaması yapılır, sonra daha fazla test yazılır ve çalıştığına emin olunur.
=======
Let's see this development flow in our practical case.

The first step is already complete: we have an initial spec for `pow`. Now, before making the implementation, let's use few JavaScript libraries to run the tests, just to see that they are working (they will all fail).
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

Bizim durumumuzda ilk adım tamamlandı. Başlangıçta `us` için özelliği tanımladık. Şimdi bunun uygulamasını yapmaya geldi. Fakat öncesinde bir defa kodu çalıştıralım bakalım testler uygulamasını yazmadan çalışacak mı? ( hepsinin hata vermesi lazım )


## Özelliklerin uygulaması

Test için aşağıdaki JavaScript kütüphaneleri kullanılacaktır:

- [Mocha](http://mochajs.org/) -- çekirdek çatı: `describe` , `it` gibi test fonksiyonlarını ve bunları çalıştıracak fonksiyonları içerir.
- [Chai](http://chaijs.com) -- birçok assertion kullanmamıza neden olur. Assertion ( sav, iddia ) şimdilik sadece `assert.equal` kullanılacak.
- [Sinon](http://sinonjs.org/) -- var olan fonksiyonların taklidini yapabilir. Buna daha sonra ihtiyaç duyulacak.

Bu kütüphaneler hem tarayıcı, hemde sunucu tabanlı testlerde kullanılabilir. Burada tarayıcı versiyonunu kullanılacaktır.

HTML sayfasının tamamı bu çatılar ve `us` özellikleri ile:

```html src="index.html"
```
Bu sayfa dört bölüme ayrılabilir:
1. `<head>` - burada üçüncü parti kütüphaneler, stiller ve testler tanımlanır.
2. `<script>` burada test edilecek fonksiyonlar tanımlanır -- bizim için bu `us` fonksiyonu.
3. Testler -- bizim için `test.js` bizim entegre etmemiz gereken dosyadır. Bu dosya `descript("us",...)` gibi fonksiyonları içerir.
4. `<div id="mocha">` HTML elementi Mocha'nın çıktısını vermek için kullanılacaktır.
5. Testler `mocha.run()` komutuyla başlar.

Sonuc:

[iframe height=250 src="pow-1" border=1 edit]

Şu anda hata olduğundan testler başarısız oldu. Şu anda `us` boş olduğundan dolayı `us(2,3)` `undefined` döndürdü halbuki test `8` cevabı beklemekteydi.

<<<<<<< HEAD
Daha gelişmiş test çalıştırıcılar da bulunmaktadır,  örneğin [karma](https://karma-runner.github.io/) vs. Bundan dolayı farklı testler yapmak sorun değildir.
=======
For the future, let's note that there are more high-level test-runners, like [karma](https://karma-runner.github.io/) and others, that make it easy to autorun many different tests.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

## İlk uygulama

En basitinden `us` fonksiyonunun uygulamasını yapacak olursak:

```js
function pow() {
  return 8; // :) şakacı seni!
}
```
Şimdi tekrar kontrol edin, çalıştığını göreceksiniz.

[iframe height=250 src="pow-min" border=1 edit]

## Özellikleri geliştirmek
Yaptığımız hilekarlık. Fonksiyon çalışmıyor, örneğin `us(3,4)` hata verir, fakat testten geçti şimdilik.

... Aslında bu pratikte de olabilir. Yani testten geçebilir, fakat fonksiyon yanlış çalışır. Bu tanımlamalar, özellikler mükemmel değildir. Daha fazla kontrol eklemeniz gerekir.

<<<<<<< HEAD
 `pow(3,4)=81` ekleyelim
=======
Let's add one more test to check that `pow(3, 4) = 81`.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

 İki farklı şekilde testleri organize edebilirsiniz:

1. Birinci yöntem -- aynı `it` tanımı içerisine bir tane daha `assert` ekleyin.

    ```js
    describe("us", function() {

      it("n. kuvvetini alir", function() {
        assert.equal(us(2, 3), 8);
    *!*
        assert.equal(us(3, 4), 81);
    */!*
      });

    });
    ```
2. İkinci yöntem -- iki tane farklı test yazın:

    ```js
    describe("us", function() {

      it("ikinin üçüncü kuvveti sekizdir.", function() {
        assert.equal(pow(2, 3), 8);
      });

<<<<<<< HEAD
      it("üçün üçüncü kuvveti yirmi yedidir", function() {
        assert.equal(pow(3, 3), 27);
=======
      it("3 raised to power 4 is 81", function() {
        assert.equal(pow(3, 4), 81);
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
      });

    });
    ```

Birbiri arasındaki fark eğer birinci `it` içindeki `assert` de hata varsa doğrudan teste son verilir. Bundan dolayı ikinci `it` hiç çalışmaz.

Testleri ayrı ayrı yazmak ne olup bittiğini anlamak için daha iyidir, yani ikinci yöntem.

Bunun haricinde bir takip edebileceğiniz ayrı bir kural da, **bir test birşeyi kontrol eder** mantığıdır. Eğer teste baktığınızda aslında kontrol edilmesi gereken iki şey vardır. Bundan dolayı ikiye ayırırsanız daha iyi olur.

İkinci yöntem ile devam edecek olursak:

Sonuç:

[iframe height=250 src="pow-2" edit border="1"]

<<<<<<< HEAD
Beklendiği üzre ikinci test başarısız oldu. Bizim fonksiyonumuz her zaman `8` dönderiyordu, ikincide ise `assert` `27` cevaını bekledi.
=======
As we could expect, the second test failed. Sure, our function always returns `8`, while the `assert` expects `81`.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311


## Test uygulamalarını geliştirme.

Daha gerçekçi bir test yazacak olursak

```js
function us(x, n) {
  let sonuc = 1;

  for (let i = 0; i < n; i++) {
    sonuc *= x;
  }

  return sonuc;
}
```
Fonksiyonun doğruluğunu kontrol etme amaçlı, `it` bloğunu otomatik olarak `for` dönügüsü kontrol etsin.

```js
describe("us", function() {

  function testEt(x) {
    let beklenen = x * x * x;
    it(`${x} in 3. kuvveti ${bekenen} dir`, function() {
      assert.equal(us(x, 3), beklenen);
    });
  }

  for (let x = 1; x <= 5; x++) {
    testEt(x);
  }

});
```

Sonuc:

[iframe height=250 src="pow-3" edit border="1"]

## İçiçe tanımlama

Daha fazla test ekleyeceğiz. Fakat bunu gerçekleştirmeden önce `testEt` ve `for` u grup haline getirin. `testEt` fonksiyonu başka testler için kullanılmayacaktır. Sadece `for` için gerekli.

Gruplama iç içe tanımlama `describe` ile olur:

```js
describe("us", function() {

*!*
  describe("x'in n. kuvvetini alir", function() {
*/!*

    function testEt(x) {
      let beklenen = x * x * x;
      it(`${x} in 3. kuvveti ${bekenen} dir`, function() {
        assert.equal(pow(x, 3), beklenen);
      });
    }

    for (let x = 1; x <= 5; x++) {
      testEt(x);
    }

*!*
  });
*/!*

  // ... buraya daha fazla `describe` ve `it` eklenebilir.
});
```
İç içe `describe` olduğunda testlerde yeni bir tanım olur "subgroup" adındaki bu tanımla içe boşluklar halinde değerleri görebilirsiniz.


[iframe height=250 src="pow-4" edit border="1"]

İleride daha fazla `it` ve `describe` eklendiğinde kendine air yardımcı fonksiyonlar da yazabilirsiniz. Bu fonksiyonlar `testEt`e erişemezler.


````smart header="`before/after` and `beforeEach/afterEach`"
`before/after` ( Önce/Sonra) fonksiyonları ekleyerek test çalışmadan veya çalıştıktan sonra farklı fonksiyonlar çalıştırılabilir. Ayrıca `beforeEach/afterEach` ile **her** `it` ile yazılandan önce ve sonrası amaçlanmaktadır.

Örneğin:

```js no-beautify
describe("test", function() {

  before(() => alert("Testler başlayacak - tüm testlerden önce"));
  after(() => alert("Testler bitti – tüm testlerden sonra"));

  beforeEach(() => alert("Testten önce – teste giriyor"));
  afterEach(() => alert("Testten sonra – testten çıktı"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
```

Çalışması şu şekilde olacaktır:

```
Testler başlayacak - tüm testlerden önce (before)
Testten önce – teste giriyor (beforeEach)
1
Testten sonra – testten çıktı   (afterEach)
Testten önce – teste giriyor (beforeEach)
2
Testten sonra – testten çıktı   (afterEach)
Testler bitti – tüm testlerden sonra (after)
```

[edit src="beforeafter" title="Örneği sandbox'ta çalıştır"]

<<<<<<< HEAD
Genelde `beforeEach/afterEach` (`before/each`) başlangıçta ösellikleri ayarlama, sayacı sıfırlama veya testler arasında birşey yapma gibi aksiyonları gerçekleştirir.
=======
Usually, `beforeEach/afterEach` and `before/after` are used to perform initialization, zero out counters or do something else between the tests (or test groups).
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
````

## Özellikleri geliştirme

`us` fonksiyonunun temel fonksiyonları tamamlandı. Geliştirmenin birinci turunu tamamladınız. Şimdi özellikleri geliştirme sırası.

Belirtildiği üzere `us(x,y)` üs olarak sadece pozitif değerler alabilir. 

Matematiksel hata için JavaScript fonksiyonları genelde `NaN` ( not a number ) dönderiyor. `n` in yanlış değerleri için `NaN` döndürülebilir. 

Öncelikle bu davranışı özelliklere ekleyin:

```js
describe("us", function() {

  // ...

  it("Negatif sayılar için NaN dönmesi lazım", function() {
*!*
    assert.isNaN(us(2, -1));
*/!*
  });

  it("Tam sayı değilse NaN dönmesi lazım", function() {
*!*
    assert.isNaN(us(2, 1.5));    
*/!*
  });

});
```

Testin sonucu:

[iframe height=530 src="pow-nan" edit border="1"]

Yeni eklenen testler başarısız oldu çünkü daha uygulamasını yapılmadı. BDD( Behaviour Driven Development) bu şekilde yapılır. Önce başarısız testler yazılır sonra bu testlerin uygulamaları yazılır.

<<<<<<< HEAD
```smart header="Diğer iddialar(assertion)"

Dikkat ederseniz `assert.isNaN`: `NaN`'ı kontrol eder.

Chai içinde daha farklı iddialar da bulunmaktadır bunlardan bazıları:
=======
```smart header="Other assertions"
Please note the assertion `assert.isNaN`: it checks for `NaN`.

There are other assertions in [Chai](http://chaijs.com) as well, for instance:
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311



- `assert.equal(deger1, deger2)` -- iki sayının birbirine eşit olup olmamasını kontrol eder. `deger1 == deger2`
- `assert.strictEqual(deger1, deger2)` -- sıkı eşitliği kontrol eder `deger1 === deger2`.
- `assert.notEqual`, `assert.notStrictEqual` -- yukarıdakilerin tersini test eder.
- `assert.isTrue(value)` --  `value === true` değerini kontrol eder.
- `assert.isFalse(value)` --  `value === false` değerini kontrol eder.
- ...bu listenin tamamına [dökümantasyondan](http://chaijs.com/api/assert/) bakabilirsiniz.
```
Demekki `us` fonksiyonuna bazı yeni kodlar eklemeniz lazım:

```js
function us(x, n) {
*!*
  if (n < 0) return NaN;
  if (Math.round(n) != n) return NaN;
*/!*

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```
Şu anda bu çalışır ve tüm testlerden geçer:

[iframe height=300 src="pow-full" edit border="1"]

[edit src="pow-full" title="Open the full final example in the sandbox."]

## Özet
BDD'de önce özellikler yazılır sonra bunların uygulamaları yapılır. Sonunda hem özellikler hemde çalışan kod yazılmış olur.

Özellikler üç farklı şekilde kullanılabilir:

1. **Testler** kodun çalıştığını garanti eder.
2. **Dökümantasyon** -- `describe` ve `it` bize aslında fonksiyonun ne iş yaptığını söyler.
3. **Örnekler** -- testler aslında çalışan örneklerdir. Bize fonksiyonun nasıl çağırılması gerektiğini gösterir.

<<<<<<< HEAD
=======
1. As **Tests** - they guarantee that the code works correctly.
2. As **Docs** -- the titles of `describe` and `it` tell what the function does.
3. As **Examples** -- the tests are actually working examples showing how a function can be used.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

Özelliklere bakarak, güvenli bir şekilde kod geliştirilebilir, değiştirilebilir hatta fonksiyonlar yeniden yazılabilir.

Bu aslında büyük projeler için daha önemlidir. Örneğin fonksiyonda bir yeri değiştirdiniz ve bir çok yerde aynı fonksiyon kullanılmış olsun. Bunu kullanan her yeri teker teker kontrol etmek oldukça zahmetli bir iştir. Fakat eğer test başarılı ise istediğinizi elde etmişsiniz demektir.

Testler olmazsa geliştiriciler iki şekilde devam edebilir:

<<<<<<< HEAD
1. Değişiklik ne olursa olsun yapılır. Sonrasında kullanıcılar bug bulur ve bunları bize bildirir. Tabi bu sizin için normal birşeyse eğer. 
2. Veya geliştiriciler bu fonksiyona dokunmaya çekinir, eğer gerçekten önemli bir fonksiyonsa bunun altından kalkılamayabilir. Bundan dolayı fonksiyonlara dokunmaya dokunmaya bir çok fonksiyon yazılır ve herkes kendine ait kodu kullanır.

**Otomatik test edilmiş kod ise bunun tam anlamıyla zıttıdır**

Eğer projede testler yazılmış olsaydı, böyle problemler olmazdı. Testleri çalıştırır ve yaptığınız değişikliklerin herhangi bir yeri etkileyip etkilemediğini anında görebilirdiniz.
=======
1. To perform the change, no matter what. And then our users meet bugs, as we probably fail to check something manually.
2. Or, if the punishment for errors is harsh, as there are no tests, people become afraid to modify such functions, and then the code becomes outdated, no one wants to get into it. Not good for development.

**Automatic testing helps to avoid these problems!**

If the project is covered with tests, there's just no such problem. After any changes, we can run tests and see a lot of checks made in a matter of seconds.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

**Ayrıca iyi test edilmiş kodun mimarisi daha iyidir**

<<<<<<< HEAD
Çünkü değiştirmek ve geliştirmek daha kolaydır. Sadece bu değil
=======
Naturally, that's because auto-tested code is easier to modify and improve. But there's also another reason.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

Kod öyle bir organize edilmelidir ki her fonksiyonun açık bir şekilde ne yapacağı belli olmalıdır. Hangi değerleri alacağı hangi değerler döneceği. Bu başlangıçtan itibaren iyi bir mimariye sahip olduğunun kanıtıdır.

Gerçek hayatta bu bazen kolay olmayabilir. Bazen gerçekten özellikleri yazmak gerçek kodu yazmadan önce çok zor olabilir. Çünkü fonksiyonun nasıl davranacağı tam olarak kesitirilemeyebilir. Fakat genel olarak bakılacak olursa test yazma geliştirmeyi hızlandırır ve daha istikrarlı kılar.

<<<<<<< HEAD
## Sırada ne var?

Bu ders sonunda bir çok test ile iç içi görev bulacaksınız. Böylece daha pratiğe dayalı örnekler yapabileceksiniz.
=======
Later in the tutorial you will meet many tasks with tests baked-in. So you'll see more practical examples.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

Test yazmak iyi JavaScript bilgisi gerektirir. Fakat siz daha yeni öğrenmeye başladınız. Bundan dolayı şimdilik bu kadar yeterli, bundan sonra test yazmanıza gerek yok. Eğer daha karmaşık olsalar bile bu derste gördüğünüz örneklerden yola çıkarak bunları okuyabilirsiniz.
