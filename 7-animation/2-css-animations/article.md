# CSS Animasyonları

<<<<<<< HEAD
CSS animasyonları basit animasyonları JavaScript kullanmadan yapmayı sağlar.

JavaScript, CSS animasyonlarını kontrol etmek ve biraz kodla daha iyi hale getirmek için kullanılabilir.
=======
CSS animations make it possible to do simple animations without JavaScript at all.

JavaScript can be used to control CSS animations and make them even better, with little code.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

## CSS Geçişleri [#css-transition]

CSS geçişlerinin fikri basittir. Bir özelliği ve o özelliğin değişiminin nasıl anime edileceğini tanımlarız. O özellik değiştiğinde, tarayıcı animasyonu çizer.

<<<<<<< HEAD
Yani, yapmamız gereken tek şey özelliği değiştirmek. Özelliğin değişiminin nasıl çizileceğini tarayıcı halledecektir.
=======
That is, all we need is to change the property, and the fluid transition will be done by the browser.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

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

<<<<<<< HEAD
Bunları biraz sonra açıklayacağız, şimdilik bilmemiz gereken, `transition` özelliği ile bu dört özelliği beraber şu sırayla tanımlayabildiğimiz: `property duration timing-function delay`. Ayrıca birden fazla özelliğin animasyonunu tek seferde tanımlayabiliriz.
=======
We'll cover them in a moment, for now let's note that the common `transition` property allows declaring them together in the order: `property duration timing-function delay`, as well as animating multiple properties at once.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

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

<<<<<<< HEAD
Şimdi, animasyon özelliklerini teker teker açıklayalım.

## transition-property

`transition-property` özelliğine canlandıracağımız özelliklerin listesine yazarız. Örneğin `left`, `margin-left`, `height`, `color`.

Tüm özelliklere animasyon eklenemez ama [çoğuna](http://www.w3.org/TR/css3-transitions/#animatable-properties-). `all` değeri "tüm özellikleri canlandır" anlamına gelir.
=======
Now, let's cover animation properties one by one.

## transition-property

In `transition-property`, we write a list of properties to animate, for instance: `left`, `margin-left`, `height`, `color`. Or we could write `all`, which means "animate all properties".

Do note that, there are properties which can not be animated. However, [most of the generally used properties are animatable](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties).
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

## transition-duration

`transition-duration`  özelliğinde animasyonun ne kadar sürmesi gerektiğini tanımlayabiliriz. Süre [CSS Time Format](http://www.w3.org/TR/css3-values/#time)kurallarına uymalıdır: saniye olarak `s` ya da milisaniye `ms`.

## transition-delay

<<<<<<< HEAD
`transition-delay` özelliği ile animasyon başlamadan önceki gecikmeyi tanımlayabiliriz. Örneğin, `transition-delay: 1s` ise animasyon değişimden `1` saniye sonra başlar.

Negatif değerler tanımlamak da mümkün. O zamansa animasyon ortadan başlar. Örneğin, `transition-duration: 2s` ise ve gecikme `-1s` ise animasyon `1` saniye sürer ve yarısından başlar.

Buradaki animasyon `0`'dan `9`'a kadar sayıları CSS `translate` özelliğini kullanarak kaydırıyor.
=======
In `transition-delay` we can specify the delay *before* the animation. For instance, if `transition-delay` is `1s` and `transition-duration` is `2s`, then the animation starts 1 second after the property change and the total duration will be 2 seconds.

Negative values are also possible. Then the animation is shown immediately, but the starting point of the animation will be after given value (time). For example, if `transition-delay` is `-1s` and `transition-duration` is `2s`, then animation starts from the halfway point and total duration will be 1 second.

Here the animation shifts numbers from `0` to `9` using CSS `translate` property:
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

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

<<<<<<< HEAD
Ayrıca animasyonu 'ortadan' da,  belli bir sayıdan, başlatabiliriz. Yani, `transition-delay` özelliğine negatif değer vererek şu anki saniyeye karşılık gelen sayıdan başlatabiliriz.
=======
We could also start it from somewhere in the middle of the transition, from an exact number, e.g. corresponding to the current second, using a negative `transition-delay`.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

Rakama tıklarsanız, animasyonu şu anki saniyeden başlatır.

[codetabs src="digits-negative-delay"]

<<<<<<< HEAD
Bunu JavaScript'e bir satır fazladan ekleyerek yapabiliriz:
=======
JavaScript does it with an extra line:
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

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

<<<<<<< HEAD
Bu özellik, zamanlama fonksiyonu, animasyon işleminin süre boyunca nasıl dağıtılacağını tanımlamamızı sağlar. Örneğin, yavaş başlayıp sonra hızlanacak mı yoksa tam tersi mi gibi.

İlk bakışta en karmaşık özellik gibi gözükebilir. Ama üstünde biraz zaman harcayınca çok basitleşecektir.

Bu özellik iki tip değer kabul eder: bir Bezier eğrisi ya da steps fonksiyonu. Daha sık kullanıldığı için ilk olarak eğriden başlayalım.
=======
The timing function describes how the animation process is distributed along its timeline. Will it start slowly and then go fast, or vice versa.

It appears to be the most complicated property at first. But it becomes very simple if we devote a bit time to it.

That property accepts two kinds of values: a Bezier curve or steps. Let's start with the curve, as it's used more often.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

### Bezier eğrisi

<<<<<<< HEAD
Zamanlama fonksiyonu şu özellikleri sağlayan 4 kontrol noktası olan bir [Bezier eğrisi](/bezier-curve) ile tanımlanabilir:

1. lk kontrol noktası: `(0,0)`.
2. Son kontrol noktası: `(1,1)`.
3. Ara noktalar için `x` değeri `0..1` aralığında olmalıdır, `y` her şey olabilir.
=======
The timing function can be set as a [Bezier curve](/bezier-curve) with 4 control points that satisfy the conditions:

1. First control point: `(0,0)`.
2. Last control point: `(1,1)`.
3. For intermediate points, the values of `x` must be in the interval `0..1`, `y` can be anything.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

CSS'de bir bezier eğrisi şöyle tanımlanır: `cubic-bezier(x2, y2, x3, y3)`. Burada sadece 2. ve 3. kontrol noktalarını tanımlamamız yeterli çünkü 1. nokta `(0,0)`'a 4. nokta da `(1,1)`'e sabitlenmiştir.

<<<<<<< HEAD
Zamanlama fonksiyonu animasyonun zaman içinde ne kadar hızlı gerçekleştiğini tanımlar.

- `x` ekseni zamanı gösterir: `0` – başlama anı, `1` – `transition-duration` özelliğinin son anı.
- `y` ekseni işlemin ne kadarının tamamlandığını gösterir. `0` – canlandırılan özelliğin başlama değeri, `1` – özelliğin son değeri.
=======
The timing function describes how fast the animation process goes.

- The `x` axis is the time: `0` -- the start, `1` -- the end of `transition-duration`.
- The `y` axis specifies the completion of the process: `0` -- the starting value of the property, `1` -- the final value.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

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
<<<<<<< HEAD
  /* JavaScript left'e 450px değerini verir*/
=======
  /* click on a train sets left to 450px, thus triggering the animation */
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831
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
<<<<<<< HEAD
  /* JavaScript left'e 450px değerini verir*/
=======
  /* click on a train sets left to 450px, thus triggering the animation */
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831
}
```

CSS'de önceden tanımlanmış, hazır, birkaç fonksiyon vardır. `linear`, `ease`, `ease-in`, `ease-out` ve `ease-in-out`.

<<<<<<< HEAD
`linear` fonksiyonu `cubic-bezier(0, 0, 1, 1)` için bir kısayoldur - Zaten görmüş olduğumuz düz bir çizgi.
=======
The `linear` is a shorthand for `cubic-bezier(0, 0, 1, 1)` -- a straight line, which we described above.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

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
  /* same as transition: left 5s cubic-bezier(0, .5, .5, 1); */
}
```

Ama biraz farklı görünüyor.

<<<<<<< HEAD
**Bir bezier eğrisi, animasyonun sınırları dışına "taşmasına" neden olabilir.**

Eğrinin üzerindeki kontrol noktaları herhangi bir `y` değeri alabilir: negatif veya çok büyük değerler. O zaman bezier eğrisi de çok aşağıya düşebilir ya da çok yukarı zıplayabilir ve animasyonun normal sınırları dışına çıkmasına sebep olabilir.
=======
**A Bezier curve can make the animation exceed its range.**

The control points on the curve can have any `y` coordinates: even negative or huge ones. Then the Bezier curve would also extend very low or high, making the animation go beyond its normal range.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

Aşağıdaki örneğin animasyon kodu:
```css
.train {
  left: 100px;
  transition: left 5s cubic-bezier(.5, -1, .5, 2);
<<<<<<< HEAD
  /* JavaScript left'e 400px değerini verir*/
=======
  /* click on a train sets left to 450px */
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831
}
```

Bu animasyonun, `left` özelliğini `100px`'den `400px`'e kadar oynatılmasını bekliyoruz.

Ama trene tıklarsanız göreceksiniz ki:

- İlk olarak, tren *geri* gidiyor: `left` `100px`'den daha az oluyor.
- Sonra ileri gidiyor, `400px`'den biraz daha ileri.
- Ve `400px`'e geri dönüyor..

[codetabs src="train-over"]

<<<<<<< HEAD
Peki neden böyle oluyor? Aşağıdaki bezier eğrisinin grafiğine bakarsak gayet açıkça anlayabiliriz.

![](bezier-train-over.svg)

2\. noktanın `y` koordinatını sıfırın altına çektik ve 3. noktanın `y` koordinatını da `1`'in üstüne çıkardık. Bu yüzden, eğri "düzgün" dörtgenin dışına çıkıyor. `y` değeri "standart" aralığın, `0...1`'in, dışına çıkıyor.

Bildiğimiz gibi, `y` "animasyonun ne kadarının tamamlandığını" gösteriyor. `y = 0` değeri özelliğin başlama değerine ve `y = 1` de son değerine karşılık geliyor. Yani, `y < 0` olan değerler özelliği, left özelliğinin başlama değerinden daha aşağıya çekiyor ve `y > 1` olan değerler ise son `left` değerinden daha üste çıkarıyor.
=======
Why it happens is pretty obvious if we look at the graph of the given Bezier curve:

![](bezier-train-over.svg)

We moved the `y` coordinate of the 2nd point below zero, and for the 3rd point we made it over `1`, so the curve goes out of the "regular" quadrant. The `y` is out of the "standard" range `0..1`.

As we know, `y` measures "the completion of the animation process". The value `y = 0` corresponds to the starting property value and `y = 1` -- the ending value. So values `y<0` move the property beyond the starting `left` and `y>1` -- past the final `left`.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

Bu tabii ki daha "yumuşak" bir örnek. Eğer `y` değerine `-99` ve `99` gibi değerler verseydik tren aralığın çok daha dışına çıkardı.

<<<<<<< HEAD
Ama spesifik bir iş için Bezier eğrisini nasıl yapabiliriz? Bunun için birçok yardımcı araç var. Örneğin, <http://cubic-bezier.com/> sitesiyle bir bezier eğrisi çizebiliriz.

### Steps

Bir zamanlama fonksiyonu olan `steps(number of steps[, start/end])`, animasyonu adımlara bölmemizi sağlar.
=======
But how do we make a Bezier curve for a specific task? There are many tools. For instance, we can do it on the site <http://cubic-bezier.com/>.

### Steps

The timing function `steps(number of steps[, start/end])` allows splitting an transition into multiple steps.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

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

<<<<<<< HEAD
`start` animasyon başladığı anda ilk adımı yapmamız gerektiğini söyler.
=======
The `start` means that in the beginning of animation we need to make the first step immediately.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

Animasyon sırasında da görebileceğimiz gibi, rakama tıkladığımız zaman anında `1`'e (ilk adıma) geçiyor ve bir sonraki saniye başladığında tekrar değişiyor.

Yani, değerler şu şekilde değişiyor:

- `0s` -- `-10%` (İlk saniyenin başında gerçekleşen değişim, anında gerçekleşiyor)
- `1s` -- `-20%`
- ...
- `8s` -- `-80%`
- (Son saniyeyse son değeri gösteriyor).

Diğer bir alternatif olan `end` değeri, değişimin her saniyenin başında değil de, bu sefer sonunda gerçekleşeceğini söyler.

<<<<<<< HEAD
Bu sefer değerler şu şekilde değişiyor:

- `0s` -- `0`
- `1s` -- `-10%` (İlk değişim 1. saniyenin sonunda gerçekleşiyor)
=======
So the process for `steps(9, end)` would go like this:

- `0s` -- `0` (during the first second nothing changes)
- `1s` -- `-10%` (first change at the end of the 1st second)
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831
- `2s` -- `-20%`
- ...
- `9s` -- `-90%`

<<<<<<< HEAD
Burada `step(9, end)` fonksiyonun nasıl çalıştığını görebiliriz. İlk rakam değişimindeki duraklamaya dikkat edin.
=======
Here's `steps(9, end)` in action (note the pause between the first digit change):
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

[codetabs src="step-end"]

Bu değerlerin kısayolları da var:

- `step-start` -- `steps(1, start)` ile aynı anlama gelir. Animasyon anında başlar ve toplamda 1 adımı vardır. Yani başlayıp anında biter, sanki hiç animasyon yokmuş gibi.
- `step-end` -- `steps(1, end)` ile aynı anlama gelir: Animasyonu `transition-duration` sonunda 1 adım olacak şekilde yapar.

Bu değerler çok nadiren kullanılır çünkü bunlar animasyondan çok, tek seferde değişimlerdir.

## transitionend Event'i

CSS animasyonu bittiği zaman `transitionend` event'i tektiklenir.

Animasyon tamamlandıktan sonra bir aksiyon yapmak için kullanılır. Ayrıca, animasyonları birbirine bağlamamızı sağlar.

<<<<<<< HEAD
Örneğin, aşağıdaki gemi tıklanıldığında ileri doğru yüzmeye ve sonra geri dönmeye başlar. Her seferinde biraz daha sağa doğru gidiyor.

[iframe src="boat" height=300 edit link]

Animasyon `go` fonksiyonun çağrılması ile başlıyor ve animasyon bittiği zaman geminin yönünü ters çevirip tekrar çağrılıyor.
=======
For instance, the ship in the example below starts to sail there and back when clicked, each time farther and farther to the right:

[iframe src="boat" height=300 edit link]

The animation is initiated by the function `go` that re-runs each time the transition finishes, and flips the direction:
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

```js
boat.onclick = function() {
  //...
  let times = 1;

  function go() {
    if (times % 2) {
<<<<<<< HEAD
      // sağa doğru yüz
      boat.classList.remove('back');
      boat.style.marginLeft = 100 * times + 200 + 'px';
    } else {
      // sola doğru yüz
=======
      // sail to the right
      boat.classList.remove('back');
      boat.style.marginLeft = 100 * times + 200 + 'px';
    } else {
      // sail to the left
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831
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

<<<<<<< HEAD
`transitionend` event'inin objesinin birkaç özelliği vardır:
=======
The event object for `transitionend` has a few specific properties:
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

`event.propertyName`
: Animasyonu biten CSS özelliğinin adı. Birden çok özelliğe animasyon eklediğimiz zaman kullanılışlı olabilir.

`event.elapsedTime`
: `transition-delay` hariç, animasyonun saniye olarak ne kadar sürdüğünü gösterir.

## Keyframes

`@keyframes` CSS kuralını kullanarak birden çok basit animasyonu birleştirebiliriz.

<<<<<<< HEAD
Animasyonun 'adını' ve kurallarını tanımlamamızı sağlar. Bu kurallar animasyonun neye, ne zaman ve nereye doğru olacağını gösterir. Sonra, `animation` özelliğini kullanarak animasyonu bir elemente ekleyebilir ve ek olarak parametre girebilmemizi sağlar.
=======
It specifies the "name" of the animation and rules - what, when and where to animate. Then using the `animation` property, we can attach the animation to the element and specify additional parameters for it.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

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

<<<<<<< HEAD
Büyük ihtimalle `@keyframes`'e çok sık ihtiyacınız olmayacak, sitenizdeki her şey sürekli hareket etmediği takdirde.
=======
You probably won't need `@keyframes` often, unless everything is in constant motion on your sites.

## Performance

Most CSS properties can be animated, because most of them are numeric values. For instance, `width`, `color`, `font-size` are all numbers. When you animate them, the browser gradually changes these numbers frame by frame, creating a smooth effect.

However, not all animations will look as smooth as you'd like, because different CSS properties cost differently to change.

In more technical details, when there's a style change, the browser goes through 3 steps to render the new look:

1. **Layout**: re-compute the geometry and position of each element, then
2. **Paint**: re-compute how everything should look like at their places, including background, colors,
3. **Composite**: render the final results into pixels on screen, apply CSS transforms if they exist.

During a CSS animation, this process repeats every frame. However, CSS properties that never affect geometry or position, such as `color`, may skip the Layout step. If a `color` changes, the browser  doesn't calculate any new geometry, it goes to Paint -> Composite. And there are few properties that directly go to Composite. You can find a longer list of CSS properties and which stages they trigger at <https://csstriggers.com>.

The calculations may take time, especially on pages with many elements and a complex layout. And the delays are actually visible on most devices, leading to "jittery", less fluid animations.

Animations of properties that skip the Layout step are faster. It's even better if Paint is skipped too.

The `transform` property is a great choice, because:
- CSS transforms affect the target element box as a whole (rotate, flip, stretch, shift it).
- CSS transforms never affect neighbour elements.

...So browsers apply `transform` "on top" of existing Layout and Paint calculations, in the Composite stage.

In other words, the browser calculates the Layout (sizes, positions), paints it with colors, backgrounds, etc at the Paint stage, and then applies `transform` to element boxes that need it.

Changes (animations) of the `transform` property never trigger Layout and Paint steps. More than that, the browser  leverages the graphics accelerator (a special chip on the CPU or graphics card) for CSS transforms, thus making them very efficient.

Luckily, the `transform` property is very powerful. By using `transform` on an element, you could rotate and flip it, stretch and shrink it, move it around, and [much more](https://developer.mozilla.org/docs/Web/CSS/transform#syntax). So instead of `left/margin-left` properties we can use `transform: translateX(…)`, use `transform: scale` for increasing element size, etc.

The `opacity` property also never triggers Layout (also skips Paint in Mozilla Gecko). We can use it for show/hide or fade-in/fade-out effects.

Paring `transform` with `opacity` can usually solve most of our needs, providing fluid, good-looking animations.

For example, here clicking on the `#boat` element adds the class with `transform: translateX(300)` and `opacity: 0`, thus making it move `300px` to the right and disappear:

```html run height=260 autorun no-beautify
<img src="https://js.cx/clipart/boat.png" id="boat">

<style>
#boat {
  cursor: pointer;
  transition: transform 2s ease-in-out, opacity 2s ease-in-out;
}

.move {
  transform: translateX(300px);
  opacity: 0;
}
</style>
<script>
  boat.onclick = () => boat.classList.add('move');
</script>
```

Here's a more complex example, with `@keyframes`:

```html run height=80 autorun no-beautify
<h2 onclick="this.classList.toggle('animated')">click me to start / stop</h2>
<style>
  .animated {
    animation: hello-goodbye 1.8s infinite;
    width: fit-content;
  }
  @keyframes hello-goodbye {
    0% {
      transform: translateY(-60px) rotateX(0.7turn);
      opacity: 0;
    }
    50% {
      transform: none;
      opacity: 1;
    }
    100% {
      transform: translateX(230px) rotateZ(90deg) scale(0.5);
      opacity: 0;
    }
  }
</style>
```
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

## Özet

<<<<<<< HEAD
CSS animasyonları bir veya birden fazla CSS özelliğindeki değişimlere rahatça animasyon eklememizi sağlar.
=======
CSS animations allow smoothly (or step-by-step) animated changes of one or multiple CSS properties.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

Çoğu animasyon işi için iyidir. Animasyonlar ayrıca JavaScript kullanarak da eklenebilir. Bir sonraki bölüm de onun üzerine.

Javascript Animasyonları ile karşılaştırıldığında CSS animasyonların farkları şunlardır:

```compare plus="CSS animations" minus="JavaScript animations"
<<<<<<< HEAD
+ Kolay şeyleri kolayca yapmamızı sağlar.
+ Hızlı ve CPU için hafiftir.
- JavaScript animasyonları daha esnektir. Her türlü animasyonu programlayabilmenizi sağlar. Örneğin, bir elementin 'patlama' animasyonu gibi.
- JavaScript animasyonları sadece CSS özelliği değişimleri ile sınırlı değildir. JavaScript ile bir animasyon için yeni elementler yaratabiliriz.
```

Animasyonların çoğu bu bölümde anlatıldığı gibi CSS ile gerçekleştirilebilir. `transitionend` event'i animasyon bittikten sonra JavaScript kodu çalıştırmamızı sağlar. Bu sayede kodla da kolayca entegre edilebilir.
=======
+ Simple things done simply.
+ Fast and lightweight for CPU.
- JavaScript animations are flexible. They can implement any animation logic, like an "explosion" of an element.
- Not just property changes. We can create new elements in JavaScript as part of the animation.
```

In early examples in this chapter, we animate `font-size`, `left`, `width`, `height`, etc. In real life projects, we should use `transform: scale()` and `transform: translate()` for better performance.

The majority of animations can be implemented using CSS as described in this chapter. And the `transitionend` event allows JavaScript to be run after the animation, so it integrates fine with the code.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

Bir sonraki bölümde daha karmaşık animasyonlar için JavaScript animasyonları kullanacağız.
