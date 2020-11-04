# CSS Animasyonları

CSS animasyonları basit animasyonları JavaScript kullanmadan yapmayı sağlar.

JavaScript, CSS animasyonlarını kontrol etmek ve biraz kodla daha iyi hale getirmek için kullanılabilir.

## CSS Geçişleri [#css-transition]

CSS geçişlerinin fikri basittir. Bir özelliği ve o özelliğin değişiminin nasıl anime edileceğini tanımlarız. O özellik değiştiğinde, tarayıcı animasyonu çizer.

Yani, yapmamız gereken tek şey özelliği değiştirmek. Özelliğin değişiminin nasıl çizileceğini tarayıcı halledecektir.

Örneğin, aşağıdaki CSS `background-color` özelliğindeki değişimlerin animasyonunu 3 saniye boyunca oynatır.

```css
.animated {
  transition-property: background-color;
  transition-duration: 3s;
}
```

Şimdi, eğer bir element `.animated` sahipse, `background-color` özelliğindeki herhangi bir değişiklik 3 saniye boyunca canlandırılır.

Arka planın animasyonunu oynatmak için aşagıdaki tuşa tıkla:

```html run autorun height=60
<button id="color">Bana tıkla</button>

<style>
  #color {
    transition-property: background-color;
    transition-duration: 3s;
  }
</style>

<script>
  color.onclick = function() {
    this.style.backgroundColor = 'red';
  };
</script>
```

CSS geçişlerini tanımlamak için 4 özellik vardır:

- `transition-property`
- `transition-duration`
- `transition-timing-function`
- `transition-delay`

Bunları biraz sonra açıklayacağız, şimdilik bilmemiz gereken, `transition` özelliği ile bu dört özelliği beraber şu sırayla tanımlayabildiğimiz: `property duration timing-function delay`. Ayrıca birden fazla özelliğin animasyonunu tek seferde tanımlayabiliriz.

Örneğin, bu tuş hem `color` hem de `font-size` özelliklerini canlandırır.

```html run height=80 autorun no-beautify
<button id="growing">Bana tıkla</button>

<style>
#growing {
*!*
  transition: font-size 3s, color 2s;
*/!*
}
</style>

<script>
growing.onclick = function() {
  this.style.fontSize = '36px';
  this.style.color = 'red';
};
</script>
```

Şimdi, animasyon özelliklerini teker teker açıklayalım.

## transition-property

`transition-property` özelliğine canlandıracağımız özelliklerin listesine yazarız. Örneğin `left`, `margin-left`, `height`, `color`.

Tüm özelliklere animasyon eklenemez ama [çoğuna](http://www.w3.org/TR/css3-transitions/#animatable-properties-). `all` değeri "tüm özellikleri canlandır" anlamına gelir.

## transition-duration

`transition-duration`  özelliğinde animasyonun ne kadar sürmesi gerektiğini tanımlayabiliriz. Süre [CSS Time Format](http://www.w3.org/TR/css3-values/#time)kurallarına uymalıdır: saniye olarak `s` ya da milisaniye `ms`.

## transition-delay

`transition-delay` özelliği ile animasyon başlamadan önceki gecikmeyi tanımlayabiliriz. Örneğin, `transition-delay: 1s` ise animasyon değişimden `1` saniye sonra başlar.

Negatif değerler tanımlamak da mümkün. O zamansa animasyon ortadan başlar. Örneğin, `transition-duration: 2s` ise ve gecikme `-1s` ise animasyon `1` saniye sürer ve yarısından başlar.

Buradaki animasyon `0`'dan `9`'a kadar sayıları CSS `translate` özelliğini kullanarak kaydırıyor.

[codetabs src="digits"]

`transform` özelliğinin animasyonu böyle tanımlanmıştır:

```css
#stripe.animate {
  transform: translate(-90%);
  transition-property: transform;
  transition-duration: 9s;
}
```

Yukardaki örnekte JavaScript `.animate` sınıfını elemente ekler - ve animasyon başlar.

```js
stripe.classList.add('animate');
```

Ayrıca animasyonu 'ortadan' da,  belli bir sayıdan, başlatabiliriz. Yani, `transition-delay` özelliğine negatif değer vererek şu anki saniyeye karşılık gelen sayıdan başlatabiliriz.

Rakama tıklarsanız, animasyonu şu anki saniyeden başlatır.

[codetabs src="digits-negative-delay"]

Bunu JavaScript'e bir satır fazladan ekleyerek yapabiliriz:

```js
stripe.onclick = function() {
  let sec = new Date().getSeconds() % 10;
*!*
  // for instance, -3s here starts the animation from the 3rd second
  stripe.style.transitionDelay = '-' + sec + 's';
*/!*
  stripe.classList.add('animate');
};
```

## transition-timing-function

Bu özellik, zamanlama fonksiyonu, animasyon işleminin süre boyunca nasıl dağıtılacağını tanımlamamızı sağlar. Örneğin, yavaş başlayıp sonra hızlanacak mı yoksa tam tersi mi gibi.

İlk bakışta en karmaşık özellik gibi gözükebilir. Ama üstünde biraz zaman harcayınca çok basitleşecektir.

Bu özellik iki tip değer kabul eder: bir Bezier eğrisi ya da steps fonksiyonu. Daha sık kullanıldığı için ilk olarak eğriden başlayalım.

### Bezier eğrisi

Zamanlama fonksiyonu şu özellikleri sağlayan 4 kontrol noktası olan bir [Bezier eğrisi](/bezier-curve) ile tanımlanabilir:

1. lk kontrol noktası: `(0,0)`.
2. Son kontrol noktası: `(1,1)`.
3. Ara noktalar için `x` değeri `0..1` aralığında olmalıdır, `y` her şey olabilir.

CSS'de bir bezier eğrisi şöyle tanımlanır: `cubic-bezier(x2, y2, x3, y3)`. Burada sadece 2. ve 3. kontrol noktalarını tanımlamamız yeterli çünkü 1. nokta `(0,0)`'a 4. nokta da `(1,1)`'e sabitlenmiştir.

Zamanlama fonksiyonu animasyonun zaman içinde ne kadar hızlı gerçekleştiğini tanımlar.

- `x` ekseni zamanı gösterir: `0` – başlama anı, `1` – `transition-duration` özelliğinin son anı.
- `y` ekseni işlemin ne kadarının tamamlandığını gösterir. `0` – canlandırılan özelliğin başlama değeri, `1` – özelliğin son değeri.

En basit eğri biçimi animasyon eşit bir şekilde oynatıldığında, yani doğrusal bir hızda olduğundadır. Bu eşit dağılım şu eğri ile tanımlanabilir: `cubic-bezier(0, 0, 1, 1)`.

İşte eğrinin nasıl gözüktüğü:

![](bezier-linear.svg)

...Görüldüğü üzere, bu eğri aslında düz bir çizgi. Zaman `(x)` geçtikçe, animasyonun tamamlanması `(y)` `0`'dan `1`'e sabit şekilde artıyor.

Aşağıdaki örnekteki tren, soldan sağa sabit bir hızla hızla hareket ediyor. (Trene tıkla).

[codetabs src="train-linear"]

CSS özelliği olan `transition` biraz önce gördüğümüz eğriyi kullanarak tanımlanmış.

```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, 0, 1, 1);
  /* JavaScript left'e 450px değerini verir*/
}
```

...Peki trenin yavaşladığını nasıl gösterebiliriz?

Başka bir bezier eğrisi kullanabiliriz: `cubic-bezier(0.0, 0.5, 0.5 ,1.0)`

Eğrinin grafiği:

![](train-curve.svg)

Görüldüğü gibi, animasyon hızlı başlıyor daha sonra ise hızlanması gitgide yavaşlıyor.

Şimdi ise zamanlama fonksiyonunu çalışırken görelim (Trene tıkla):

[codetabs src="train"]

CSS:
```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, .5, .5, 1);
  /* JavaScript left'e 450px değerini verir*/
}
```

CSS'de önceden tanımlanmış, hazır, birkaç fonksiyon vardır. `linear`, `ease`, `ease-in`, `ease-out` ve `ease-in-out`.

`linear` fonksiyonu `cubic-bezier(0, 0, 1, 1)` için bir kısayoldur - Zaten görmüş olduğumuz düz bir çizgi.

Diğerleri ise şu `cubic-bezier` eğrileri için kısayoldur: 

| <code>ease</code><sup>*</sup> | <code>ease-in</code> | <code>ease-out</code> | <code>ease-in-out</code> |
|-------------------------------|----------------------|-----------------------|--------------------------|
| <code>(0.25, 0.1, 0.25, 1.0)</code> | <code>(0.42, 0, 1.0, 1.0)</code> | <code>(0, 0, 0.58, 1.0)</code> | <code>(0.42, 0, 0.58, 1.0)</code> |
| ![ease, figure](ease.svg) | ![ease-in, figure](ease-in.svg) | ![ease-out, figure](ease-out.svg) | ![ease-in-out, figure](ease-in-out.svg) |

`*` -- Eğer bir zamanlama fonksiyonu tanımlanmadıysa, varsayılan değer, `ease` kullanılır

Yani, trenimizi yavaşlatmak için `ease-out` fonksiyonunu kullanabilirdik.


```css
.train {
  left: 0;
  transition: left 5s ease-out;
  /* transition: left 5s cubic-bezier(0, .5, .5, 1); */
}
```

Ama biraz farklı görünüyor.

**Bir bezier eğrisi, animasyonun sınırları dışına "taşmasına" neden olabilir.**

Eğrinin üzerindeki kontrol noktaları herhangi bir `y` değeri alabilir: negatif veya çok büyük değerler. O zaman bezier eğrisi de çok aşağıya düşebilir ya da çok yukarı zıplayabilir ve animasyonun normal sınırları dışına çıkmasına sebep olabilir.

Aşağıdaki örneğin animasyon kodu:
```css
.train {
  left: 100px;
  transition: left 5s cubic-bezier(.5, -1, .5, 2);
  /* JavaScript left'e 400px değerini verir*/
}
```

Bu animasyonun, `left` özelliğini `100px`'den `400px`'e kadar oynatılmasını bekliyoruz.

Ama trene tıklarsanız göreceksiniz ki:

- İlk olarak, tren *geri* gidiyor: `left` `100px`'den daha az oluyor.
- Sonra ileri gidiyor, `400px`'den biraz daha ileri.
- Ve `400px`'e geri dönüyor..

[codetabs src="train-over"]

Peki neden böyle oluyor? Aşağıdaki bezier eğrisinin grafiğine bakarsak gayet açıkça anlayabiliriz.

![](bezier-train-over.svg)

2\. noktanın `y` koordinatını sıfırın altına çektik ve 3. noktanın `y` koordinatını da `1`'in üstüne çıkardık. Bu yüzden, eğri "düzgün" dörtgenin dışına çıkıyor. `y` değeri "standart" aralığın, `0...1`'in, dışına çıkıyor.

Bildiğimiz gibi, `y` "animasyonun ne kadarının tamamlandığını" gösteriyor. `y = 0` değeri özelliğin başlama değerine ve `y = 1` de son değerine karşılık geliyor. Yani, `y < 0` olan değerler özelliği, left özelliğinin başlama değerinden daha aşağıya çekiyor ve `y > 1` olan değerler ise son `left` değerinden daha üste çıkarıyor.

Bu tabii ki daha "yumuşak" bir örnek. Eğer `y` değerine `-99` ve `99` gibi değerler verseydik tren aralığın çok daha dışına çıkardı.

Ama spesifik bir iş için Bezier eğrisini nasıl yapabiliriz? Bunun için birçok yardımcı araç var. Örneğin, <http://cubic-bezier.com/> sitesiyle bir bezier eğrisi çizebiliriz.

### Steps

Bir zamanlama fonksiyonu olan `steps(number of steps[, start/end])`, animasyonu adımlara bölmemizi sağlar.

Animasyonu rakamları kullandığımız bir örnekte görelim.

Aşağıda, sadece temel olması için, animasyonsuz bir rakam dizisi var.

[codetabs src="step-list"]

Kırmızı "pencerenin" dışında olan rakamları görünmez yaparak ve her adımda diziyi sola kaydırarak rakamların teker teker gözükmesini sağlayacağız.

Toplamda 9 adım olacak, her rakam için bir adım hareketi:

```css
#stripe.animate  {
  transform: translate(-90%);
  transition: transform 9s *!*steps(9, start)*/!*;
}
```

Çalışırken görelim:

[codetabs src="step"]

`steps(9, start)` fonksiyonun ilk argümanı adım sayısını gösterir. transform 9 parçaya ayrılacak (parçaların her biri 10%). Zaman aralığı da otomatik olarak 9 eşit parçaya ayrılacak. Yani `transition: 9s` bize tüm animasyon için 9 saniye veriyor ve o da her rakam için 1 saniye olacak şekilde bölünüyor.

İkinci argüman şu iki kelimeden biri olabilir: `start` ya da `end`.

`start` animasyon başladığı anda ilk adımı yapmamız gerektiğini söyler.

Animasyon sırasında da görebileceğimiz gibi, rakama tıkladığımız zaman anında `1`'e (ilk adıma) geçiyor ve bir sonraki saniye başladığında tekrar değişiyor.

Yani, değerler şu şekilde değişiyor:

- `0s` -- `-10%` (İlk saniyenin başında gerçekleşen değişim, anında gerçekleşiyor)
- `1s` -- `-20%`
- ...
- `8s` -- `-80%`
- (Son saniyeyse son değeri gösteriyor).

Diğer bir alternatif olan `end` değeri, değişimin her saniyenin başında değil de, bu sefer sonunda gerçekleşeceğini söyler.

Bu sefer değerler şu şekilde değişiyor:

- `0s` -- `0`
- `1s` -- `-10%` (İlk değişim 1. saniyenin sonunda gerçekleşiyor)
- `2s` -- `-20%`
- ...
- `9s` -- `-90%`

Burada `step(9, end)` fonksiyonun nasıl çalıştığını görebiliriz. İlk rakam değişimindeki duraklamaya dikkat edin.

[codetabs src="step-end"]

Bu değerlerin kısayolları da var:

- `step-start` -- `steps(1, start)` ile aynı anlama gelir. Animasyon anında başlar ve toplamda 1 adımı vardır. Yani başlayıp anında biter, sanki hiç animasyon yokmuş gibi.
- `step-end` -- `steps(1, end)` ile aynı anlama gelir: Animasyonu `transition-duration` sonunda 1 adım olacak şekilde yapar.

Bu değerler çok nadiren kullanılır çünkü bunlar animasyondan çok, tek seferde değişimlerdir.

## transitionend Event'i

CSS animasyonu bittiği zaman `transitionend` event'i tektiklenir.

Animasyon tamamlandıktan sonra bir aksiyon yapmak için kullanılır. Ayrıca, animasyonları birbirine bağlamamızı sağlar.

Örneğin, aşağıdaki gemi tıklanıldığında ileri doğru yüzmeye ve sonra geri dönmeye başlar. Her seferinde biraz daha sağa doğru gidiyor.

[iframe src="boat" height=300 edit link]

Animasyon `go` fonksiyonun çağrılması ile başlıyor ve animasyon bittiği zaman geminin yönünü ters çevirip tekrar çağrılıyor.

```js
boat.onclick = function() {
  //...
  let times = 1;

  function go() {
    if (times % 2) {
      // sağa doğru yüz
      boat.classList.remove('back');
      boat.style.marginLeft = 100 * times + 200 + 'px';
    } else {
      // sola doğru yüz
      boat.classList.add('back');
      boat.style.marginLeft = 100 * times - 200 + 'px';
    }

  }

  go();

  boat.addEventListener('transitionend', function() {
    times++;
    go();
  });
};
```

`transitionend` event'inin objesinin birkaç özelliği vardır:

`event.propertyName`
: Animasyonu biten CSS özelliğinin adı. Birden çok özelliğe animasyon eklediğimiz zaman kullanılışlı olabilir.

`event.elapsedTime`
: `transition-delay` hariç, animasyonun saniye olarak ne kadar sürdüğünü gösterir.

## Keyframes

`@keyframes` CSS kuralını kullanarak birden çok basit animasyonu birleştirebiliriz.

Animasyonun 'adını' ve kurallarını tanımlamamızı sağlar. Bu kurallar animasyonun neye, ne zaman ve nereye doğru olacağını gösterir. Sonra, `animation` özelliğini kullanarak animasyonu bir elemente ekleyebilir ve ek olarak parametre girebilmemizi sağlar.

Aşağıda açıklamalı bir örnek görebilirsiniz:

```html run height=60 autorun="no-epub" no-beautify
<div class="progress"></div>

<style>
*!*
  @keyframes go-left-right {        /* bir isim ver: "go-left-right" */
    from { left: 0px; }             /* animasyonu left: 0px'den başlat */
    to { left: calc(100% - 50px); } /* animasyonu 100%-50px'de bitir */
  }
*/!*

  .progress {
*!*
    animation: go-left-right 3s infinite alternate;
    /* "go-left-right" animasyonunu elemente ekle
       animasyon süresi 3 saniye
       kaç kere yapılacağı: sonsuz (infinite)
       her seferinde yönünü ters çevir
    */
*/!*

    position: relative;
    border: 2px solid green;
    width: 50px;
    height: 20px;
    background: lime;
  }
</style>
```

`@keyframes` hakkında birçok makale ve [detaylı açıklamasını](https://drafts.csswg.org/css-animations/) bulabilirsiniz.

Büyük ihtimalle `@keyframes`'e çok sık ihtiyacınız olmayacak, sitenizdeki her şey sürekli hareket etmediği takdirde.

## Özet

CSS animasyonları bir veya birden fazla CSS özelliğindeki değişimlere rahatça animasyon eklememizi sağlar.

Çoğu animasyon işi için iyidir. Animasyonlar ayrıca JavaScript kullanarak da eklenebilir. Bir sonraki bölüm de onun üzerine.

Javascript Animasyonları ile karşılaştırıldığında CSS animasyonların farkları şunlardır:

```compare plus="CSS animations" minus="JavaScript animations"
+ Kolay şeyleri kolayca yapmamızı sağlar.
+ Hızlı ve CPU için hafiftir.
- JavaScript animasyonları daha esnektir. Her türlü animasyonu programlayabilmenizi sağlar. Örneğin, bir elementin 'patlama' animasyonu gibi.
- JavaScript animasyonları sadece CSS özelliği değişimleri ile sınırlı değildir. JavaScript ile bir animasyon için yeni elementler yaratabiliriz.
```

Animasyonların çoğu bu bölümde anlatıldığı gibi CSS ile gerçekleştirilebilir. `transitionend` event'i animasyon bittikten sonra JavaScript kodu çalıştırmamızı sağlar. Bu sayede kodla da kolayca entegre edilebilir.

Bir sonraki bölümde daha karmaşık animasyonlar için JavaScript animasyonları kullanacağız.
