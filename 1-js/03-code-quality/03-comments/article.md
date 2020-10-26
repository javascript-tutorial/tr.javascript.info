# Yorumlar

<info:structure> bölümünden de bildiğiniz üzre, yorumlar tek satır `//` olabileceği gibi birden çok satır da olabilir `/* .. */`.
Genelde  yorum satırları kodun nasıl ve niçin çalıştığını anlatmak için kullanılır.

İlk görüşte yorum yapmanın gereklilik olduğu aşikardır. Fakat programlama yeni başlayanlayanlar bunu ilk önce genelde yanlış anlamaktadırlar.

<<<<<<< HEAD
## Kötü Yorum
=======
At first sight, commenting might be obvious, but novices in programming often use them wrongly.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

Programlamaya yeni başlayanlar yorumları genelde "kodda ne oluyor"'u anlatmak için kullanırlar. Örneğin:

```js
// Bu kodu bunu şunu yapacak  vs. vs.
// ...vs. vs. vs.
aşırı;
karmaşık;
kod;
```

<<<<<<< HEAD
Fakat iyi kod aslında kendi kendini açıklayan koddur. Yorum satırlarının olabildiğince az olması beklenir. Gerçekten, kod yorum satırı olmadan da kolayca anlaşılabilir olmalı.

Bunun için harika bir kural var: "Eğer bir kod yorum yapmayı gerektirecek kadar karmaşıksa, kodu tekrar yazmanızda yarar var"
=======
But in good code, the amount of such "explanatory" comments should be minimal. Seriously, the code should be easy to understand without them.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

### Çözüm: Fonksiyonları dışarıya atın.

Bazen kod parçalarını fonksiyonlarla değiştirmek yarar sağlar, örneğin:


```js
function asalSayilariGoster(n) {
  sonrakiAsal:
  for (let i = 2; i < n; i++) {

*!*
    // i asal mı kontrol et
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue sonrakiAsal;
    }
*/!*

    alert(i);
  }
}
```
Daha iyisi bu fonksiyonun dışına `asalMi` diye ayri bir fonksiyon yazmak:


```js
function asalSayilariGoster(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!asalMi(i)) continue;*/!*

    alert(i);  
  }
}

function asalMi(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}
```
Böylece kodu daha kolay bir şekilde anlayabilirsiniz. Fonksiyonun kendisi aslında yorum oldu. Bu tür fonksiyonlara *kendi kendini açıklayan* fonksiyon denir.

### Çözüm: yeni fonksiyon yaz

Eğer aşağıdaki gibi uzun bir kod sayfanız varsa:


```js
// here we add whiskey
for(let i = 0; i < 10; i++) {
  let damla = ayranDoldur();
  kokla(damla);
  ekle(damla, bardak);
}

// here we add juice
for(let t = 0; t < 3; t++) {
  let domates = domatesDoldur();
  kontrolEt(domates);
  let domatesSuyu = bastir(domates);
  ekle(domatesSuyu, bardak);
}

// ...
```
Bu fonksiyonları yeniden düzenlemek daha iyi bir yöntem olabilir.
```js
ayranEkle(bardak);
domatesEkle(bardak);

function ayranEkle(kap) {
  for(let i = 0; i < 10; i++) {
    let damla = ayranDoldur();
    //...
  }
}

function addJuice(kap) {
  for(let t = 0; t < 3; t++) {
    let domates = domatesDoldur();
    //...
  }
}
```
Tekrardan söylemek gerekirse nelerin olup bittiğini yorum değil, fonksiyonun kendisi söylemeli.Ayrıca kod yapısı fonksiyonlar şeklinde ayrık olduğunda daha düzgün olur. Her fonksiyonun ne argüman aldığı ne geri döndürdüğü bellidir.

Gerçekte neyin olup bittiğini söyleyen yorumu tamamen çıkarmak olanaksızdır. Bazen karmaşık algorimalara olabilir. Bazen akıllıca yapılmış kısa yollar olabilir. Fakat genel olarak kod basit ve kendi kendini açıklayıcı olmalı.


## İyi yorum

Peki, fonksiyonun ne yaptığını anlatan yorumlar kötü ise, hangi yorumlar iyi?

<<<<<<< HEAD
Mimariyi tanımla
: Üst seviyede bileşenlere genel bakış, nasıl birbirleriyle iletişim kurdukları, farklı durumlarda akışın nasıl değişeceği gibi konular anlatılmalıdır. Kusaca kuş bakışı kodun ne yaptığını anlatmalısınız. Bununla ilgili şema diline [UML](https://tr.wikipedia.org/wiki/UML) bakabilirsiniz. Kesinlikle üstünde çalışılmaya değer.

Fonksiyon kullanımını dökümante etme
: Fonksiyonu dökümante edebilmek için standart özel bir yazım vardır[JSDoc](http://tr.wikipedia.org/wiki/JSDoc). Fonksiyon: kullım, parametreler, dönen değer.

    Örneğin:
    ```js
    /**
     * X'in n'inci üssünü hesaplayıp geri döner.
     *
     * @param {number} x üssü bulunacak sayı.
     * @param {number} n üs değeri doğal sayı olmalı.
     * @return {number} x üssün hesaplanmış hali.
     */
    function ushesapla(x, n) {
      ...
    }
    ```
    Bu yorumlar gize bu fonksiyonun amacının ne olduğunu koda bakmadan anlatır.

    Bu arada [WebStorm](https://www.jetbrains.com/webstorm/) gibi editörler size JSDoc yazma konusunda yardımcı olur. Otomatik olarak kodu kontrol edebilir.

    Ayrıca  [JSDoc 3](https://github.com/jsdoc3/jsdoc) gibi araçlar doğrudan HTML formatında dökümantasyon yapmanızı sağlar. Daha fazla bilgiyi <http://usejsdoc.org/> adresinden okuyabilirsiniz.
=======
Describe the architecture
: Provide a high-level overview of components, how they interact, what's the control flow in various situations... In short -- the bird's eye view of the code. There's a special language [UML](http://wikipedia.org/wiki/Unified_Modeling_Language) to build high-level architecture diagrams explaining the code. Definitely worth studying.

Document function parameters and usage
: There's a special syntax [JSDoc](http://en.wikipedia.org/wiki/JSDoc) to document a function: usage, parameters, returned value.

For instance:
```js
/**
 * Returns x raised to the n-th power.
 *
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 */
function pow(x, n) {
  ...
}
```

Such comments allow us to understand the purpose of the function and use it the right way without looking in its code.

By the way, many editors like [WebStorm](https://www.jetbrains.com/webstorm/) can understand them as well and use them to provide autocomplete and some automatic code-checking.

Also, there are tools like [JSDoc 3](https://github.com/jsdoc3/jsdoc) that can generate HTML-documentation from the comments. You can read more information about JSDoc at <http://usejsdoc.org/>.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

Neden bu yöntemle çözüldü?
: Ne yazıldığı önemlidir. Fakat ne *yazılmadığı* nelerin olup bittiği hakkında belki daha önemlidir. Bu problem neden bu şekilde çözüldü? Size bunun cevabını kod veremez.

    Eğer problemi çözmek için birçok yol varsa neden bu yolu seçtiniz? Özellikle cevabın açık olmadığı durumlarda bu soru önemli.

    Böyle yorumların yapılmadığı durumlarda aşağıdakiler meydana gelebilir:
    1. Siz ( veya arkadaşınız ) editörü açtığında, yazılan kodun vasat olduğunu görebilir düşünebilir.
    2. Şöyle düşünebilirsiniz: "O zaman da ne salakmışım, şimdi akıllandım harikayim artık" ve kodu tekrar daha iyi ve doğru şekilde yazarsınız.
    3. ... Tekrar yazma isteği iyidir. Fakat "daha açık ve doğru" çözüm aslında eksiktir. Daha önce zaten en iyi şekilde yazmaya çalışmıştın. Bunu yaparken zaman harcadın ve şimdi bu süre çöpe gitti.

    Çözümü açıklayan yorumlar gerçekten çok önemlidir. Geliştirmeyi doğru yoldan yapmanıza büyük katkı sağlar.

Eğer kodda nerede kullanıldığına veya özelliklerine dair ipuçları bulmak zor ise yorum yapmak gerçekten emeğe değerdir.

## Özet

İyi programcının en önemli özelliklerinden biri yorumlarının varlığı, hatta yokluğudur.

İyi yorumlar kodun bakımının düzgün bir şekilde yapılmasını sağlar. Daha sonra geri dönüldüğünde her şeye daha etkin bir şekilde başlanır.

**Bunları yorum olarak yazın:**

- Genel mimari, ince detayına kadar değil sadece kuş bakışı
- Fonksiyon kullanımı.
- Önemli çözümler, özellikle çözüm çok açık değilse

**Bunlar için yorum yazmayın:**

<<<<<<< HEAD
- Kodun "nasıl çalıştığını", "ne yaptığını" anlatmak için
- Sadece eğer yorum yazmadan fonksiyon kendisini anlatamıyorsa bunları yazın.
=======
- That tell "how code works" and "what it does".
- Put them in only if it's impossible to make the code so simple and self-descriptive that it doesn't require them.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

Yorumlar ayrıca otomatik bir dökümantasyon oluşturmanızda yardımcı olur. Örneğin JsDoc3 aracı ile yorumlarınızdan HTML dökümantasyonu çıktısı alabilirsiniz. ( diğer formatları da destekler )