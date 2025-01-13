# Bezier Eğrisi

Bezier eğrileri, bilgisayar grafiklerinde şekiller çizmek için, CSS animasyonları için ve birçok diğer yerlerde kullanılır.

Çok basit bir konudur, bir kez çalıştıktan sonra vektör grafikleri ve gelişmiş animasyonlar dünyasında kendinizi rahat hissedebilirsiniz.

<<<<<<< HEAD
## Kontrol Noktaları
=======
```smart header="Some theory, please"
This article provides a theoretical, but very needed insight into what Bezier curves are, while [the next one](info:css-animations#bezier-curve) shows how we can use them for CSS animations.

Please take your time to read and understand the concept, it'll serve you well.
```

## Control points
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Bir [bezier eğrisi](https://tr.wikipedia.org/wiki/B%C3%A9zier_e%C4%9Frisi) kontrol noktaları ile tanımlanır.

2, 3, 4 (adet) veya daha fazlası

Örneğin, iki noktalı eğri:

![](bezier2.svg)

Üç noktalı eğri:

![](bezier3.svg)

Dört noktalı eğri:

![](bezier4.svg)

Eğrilere yakından bakarsınız, hemen farkedebilirsiniz:

1. **Noktalar her zaman eğri üzerinde değil.** Bu tamamen normal, daha sonra eğrinin nasıl oluşturulduğunu göreceğiz.
2. **Eğri derecesi, nokta sayısından bir eksiğine eşittir**.
İki nokta için doğrusal bir eğriye sahibiz (düz bir çizgi), üç nokta için -- kuadratik eğri (parabolik), dört nokta için -- kübik eğri.
3. **Bir eğri her zaman kontrol noktalarının [dışbükey gövdesi](https://en.wikipedia.org/wiki/Convex_hull)nin içindedir**:

    ![](bezier4-e.svg) ![](bezier3-e.svg)

<<<<<<< HEAD
Bu son özellik sayesinde, bilgisayar grafiklerinde kesişim testlerini optimize etmek mümkündür. Dışbükey gövdeler (convex hulls) kesişmiyorsa, eğrilerde kesişmez. Dolayısıyla, dışbükey gövde kesişimini kontrol etmek "kesişim yok" sonucunu çok hızlı bir şekilde verebilir. Kesişimi veya dışbükey gövdeleri kontrol etmek çok daha kolaydır, çünkü bunlar dikdörtgenler, üçgenler ve benzerleridir (yukarıdaki görsele bakın), eğriden çok daha basit şekillerdir.   
=======
Because of that last property, in computer graphics it's possible to optimize intersection tests. If convex hulls do not intersect, then curves do not either. So checking for the convex hulls intersection first can give a very fast "no intersection" result. Checking the intersection of convex hulls is much easier, because they are rectangles, triangles and so on (see the picture above), much simpler figures than the curve.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

**Bezier eğrilerinin ana önemi -- kontrol noktaları hareket ettirildiğinde *sezgisel olarak bariz bir şekilde* eğri değişiyor.**

Aşağıdaki örnekte kontrol noktalarını fareyi (mouse) kullanarak hareket ettirmeyi deneyin:

[iframe src="demo.svg?nocpath=1&p=0,0,0.5,0,0.5,1,1,1" height=370]

**Fark edebileceğiniz gibi, eğri 1 -> 2 ve 3 -> 4 teğet çizgileri boyunca uzanmaktadır.**

Biraz pratik yaptıktan sonra, istenen eğriyi elde etmek için noktaların nasıl konumlandırılacağı belli olur. Ve birkaç eğriyi birleştirerek, pratik olarak her şeyi elde edebiliriz.

İşte bazı örnekler:

![](bezier-car.svg) ![](bezier-letter.svg) ![](bezier-vase.svg)

## De Casteljau'nun Algoritması

<<<<<<< HEAD
Bezier eğrileri için matematiksel bir formül vardır, fakat bunu daha sonra ele alalım, çünkü
[De Casteljau'nun algoritması](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm), matematiksel tanımla aynıdır ve nasıl oluşturulduğunu görsel olarak gösterir.
=======
There's a mathematical formula for Bezier curves, but let's cover it a bit later, because
[De Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm) is identical to the mathematical definition and visually shows how it is constructed.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

İlk olarak 3 noktalı örneğe bakalım.

İşte demo ve açıklamaları aşağıda.

Kontrol noktaları (1,2 ve 3) fare ile hareket ettirilebilir. "play" butonuna basarak çalıştırın.

[iframe src="demo.svg?p=0,0,0.5,1,1,0&animate=1" height=370]

**De Casteljau'nun 3-noktalı bezier eğrisi oluşturma algoritması:**

1. Kontrol noktaları çizme. Yukarıdaki örnekte bunlar `1`, `2`, `3` olarak adlandırılmıştır.
2. 1 -> 2 -> 3 kontrol noktaları arasında parçalar oluşturun. Yukarıdaki demoda bunlar <span style="color:#825E28">kahverengidir</span>.
3. `t` parametresi, `0`'dan `1` gider. Yukarıdaki örnekte `0.05` kademe kullanılmıştır: döngü `0, 0.05, 0.1, 0.15, ... 0.95, 1` şeklinde ilerler.

    Bu `t` değerlerinin her biri için:

    - Her <span style="color:#825E28">kahverengi</span> parça üzerinde, parçanın başlangıcından `t` ile orantılı uzaklıkta bulunan bir nokta alıyoruz. İki parça olduğundan dolayı iki noktamız var.

        Örneğin, `t=0` için -- her iki nokta da parçaların başlangıcında olacaktır, ve `t=0.25` için -- başlangıcından itibaren parça uzunluğunun 25%'inde, `t=0.5` için -- 50% (ortası), `t=1` için -- parçanın sonunda. 

    - Noktaları birleştirin. Aşağıdaki görselde bağlantı parçası <span style="color:#167490">maviye</span> boyanmıştır. 


| `t=0.25` için            | `t=0.5` için           |
| ------------------------ | ---------------------- |
| ![](bezier3-draw1.svg)   | ![](bezier3-draw2.svg) |

4. Şimdi <span style="color:#167490">mavi</span> parçada, aynı `t` değeri ile orantılı uzaklıkta bir nokta alın. Yani, `t=0.25` için (soldaki görsel) parçanın sol çeyreğinin sonunda bir nokta, ve `t=0.5` için (sağdaki görsel) -- parçanın orta noktasında. Yukarıdaki görsellerde bu nokta <span style="color:red">kırmızıdır</span>.

5. `t`, `0`'dan `1`'e doğru ilerlerken, `t`'nin her değeri eğriye bir nokta ekler. Bu noktaların kümesi Bezier eğrisini oluşturur. Yukarıdaki görsellerde kırmızı ve paraboliktir.

Bu işlemler 3 nokta içindi. Fakat 4 nokta içinde geçerlidir.

4 nokta için demo (noktalar fare ile hareket ettirilebilir):

[iframe src="demo.svg?p=0,0,0.5,0,0.5,1,1,1&animate=1" height=370]

4 nokta için algoritma:

- Kontrol noktalarını parçalarla bağlayın: 1 -> 2, 2 -> 3, 3 -> 4. 3 tane <span style="color:#825E28">kahverengi</span> parça olacak.
- `0` ile `1` aralığındaki her `t` için:
    - Bu parçalar üzerinde başlangıçtan `t` ile orantılı uzaklıkta noktalar alıyoruz. Bu noktalar birbirlerine bağlandığında iki (adet) <span style="color:#0A0">yeşil</span> parçamız olur.
    - Bu parçalar üzerinde `t` ile orantılı noktalar alıyoruz. Bir <span style="color:#167490">mavi parça</span> elde ederiz.
    - Mavi parça üzerinde `t` ile orantılı bir nokta alıyoruz. Yukarıdaki örnekte <span style="color:red">kırmızı</span>.
- Bu noktalar birlikte eğriyi oluşturur.

Algoritma tekrarlamalı olup herhangi bir sayıda kontrol noktası için genelleştirilebilir.

N tane kontrol noktası verildiğinde:

1. N-1 tane parça elde etmek için onları birleştiriyoruz.
2. Sonra `0` ile `1` aralığındaki her `t` için, her parça üzerinde `t` ile orantılı uzaklıkta bir nokta alıyoruz ve onları birleşiriyoruz. N-2 parça olacak.
3. Yalnızca bir nokta kalana kadar 2. adımı tekrarlayın.

Bu noktalar eğriyi oluşturur.

```online
**Parçaların ve eğrinin nasıl oluşturulduğunu açıkça görmek için örnekleri çalıştırın ve duraklatın.**
```


`y=1/t`'ye benzeyen bir eğri:

[iframe src="demo.svg?p=0,0,0,0.75,0.25,1,1,1&animate=1" height=370]

Zig-zag kontrol noktaları da iyi/sorunsuz çalışır:

[iframe src="demo.svg?p=0,0,1,0.5,0,0.5,1,1&animate=1" height=370]

Bir ilmek/düğüm oluşturmak mümkündür:

[iframe src="demo.svg?p=0,0,1,0.5,0,1,0.5,0&animate=1" height=370]

Düzgün olmayan bir Bezier eğrisi (evet, bu da mümkün):

[iframe src="demo.svg?p=0,0,1,1,0,1,1,0&animate=1" height=370]

```online
Algoritma açıklamasında net olamayan bir şey varsa, eğrinin nasıl oluşturulduğunu görmek için lütfen yukarıdaki canlı örneklere bakın.
```


Algoritma tekrarlamalı olduğundan, herhangi bir düzende Bezier eğrileri oluşturabiliriz, yani: 5, 6 veya daha fazla kontrol noktası kullanarak. Ama pratikte çok sayıda nokta daha az kullanışlıdır. Genellikle 2-3 nokta alırız ve karmaşık çizgiler için birkaç eğriyi birbirleriyle birleştiririz. Bunu geliştirmek ve hesaplamak daha basittir.

```smart header="Verilen noktalar üzerinden bir eğri nasıl çizilir?"
Bir Bezier eğrisi oluşturmak için kontrol noktaları kullanılır. Gördüğümüz gibi, ilki ve sonuncusu hariç eğri üzerinde değiller.

Bazen başka bir amacımız daha vardır: *birkaç nokta boyunca* bir eğri çizmek, böylece hepsi tek bir eğri üzerinde olur. Bu işleme [intepolasyon](https://tr.wikipedia.org/wiki/%C4%B0nterpolasyon) denir, burada bu konuyu ele almayacağız.

Bu tür eğriler için matematiksel formüller vardır, örneğin [Lagrange polinomu](https://en.wikipedia.org/wiki/Lagrange_polynomial). Bilgisayar grafiklerinde [spline interpolasyonu](https://en.wikipedia.org/wiki/Spline_interpolation) genellikle birçok noktayı birbirine bağlayan düzgün eğriler oluşturmak için kullanılır.
```


## Matematik

Bir Bezier eğrisi matematiksel bir formül kullanılarak tanımlanabilir.

Gördüğümüz gibi -- aslında bunu bilmeye gerek yok, çoğu insan sadece bir fare ile noktaları hareket ettirerek eğri çizer. Ama matematikle ilgiliyseniz -- işte burada.

<code>P<sub>i</sub></code> kontrol noktalarının koordinatları göz önüne alındığında: birinci kontrol noktasının koordinatları <code>P<sub>1</sub> = (x<sub>1</sub>,y<sub>1</sub>)</code>, ikincisinin: <code>P<sub>2</sub> = (x<sub>2</sub>, y<sub>2</sub>)</code>, ve benzer şekilde, eğri koordinatları `[0,1]` aralığındaki `t` parametresine bağlı olan denklemle tanımlanır.

- 2 noktalı eğri için formül:

    <code>P = (1-t)P<sub>1</sub> + tP<sub>2</sub></code>
- 3 kontrol noktalı için:

    <code>P = (1−t)<sup>2</sup>P<sub>1</sub> + 2(1−t)tP<sub>2</sub> + t<sup>2</sup>P<sub>3</sub></code>
- 4 kontrol noktalı için:

    <code>P = (1−t)<sup>3</sup>P<sub>1</sub> + 3(1−t)<sup>2</sup>tP<sub>2</sub>  +3(1−t)t<sup>2</sup>P<sub>3</sub> + t<sup>3</sup>P<sub>4</sub></code>


Bunlar vektör denklemleridir. Başka bir deyişle, karşılık gelen koordinatları elde etmek için `P` yerine `x` ve `y`'yi koyabiliriz.

Örneğin, 3 noktalı eğri şu şekilde hesaplanan `(x,y)` noktaları tarafından oluşturulur:

- <code>x = (1−t)<sup>2</sup>x<sub>1</sub> + 2(1−t)tx<sub>2</sub> + t<sup>2</sup>x<sub>3</sub></code>
- <code>y = (1−t)<sup>2</sup>y<sub>1</sub> + 2(1−t)ty<sub>2</sub> + t<sup>2</sup>y<sub>3</sub></code>

<code>x<sub>1</sub>, y<sub>1</sub>, x<sub>2</sub>, y<sub>2</sub>, x<sub>3</sub>, y<sub>3</sub></code> yerine 3 kontol noktasının koordinatlarını koymalıyız, sonrasında `t`, `0`'dan `1`'e gittikçe, `t`'nin her bir değeri için `(x,y)` değerlerini elde ederiz.

Örneğin, kontrol noktaları `(0,0)`, `(0.5, 1)` ve `(1, 0)` ise, denklemler şöyle olur:

- <code>x = (1−t)<sup>2</sup> * 0 + 2(1−t)t * 0.5 + t<sup>2</sup> * 1 = (1-t)t + t<sup>2</sup> = t</code>
- <code>y = (1−t)<sup>2</sup> * 0 + 2(1−t)t * 1 + t<sup>2</sup> * 0 = 2(1-t)t = –2t<sup>2</sup> + 2t</code>

Şimdi `t`, `0`'dan `1`'e gittikçe, her `t` için `(x,y)` değerleri kümesi bu kontrol noktaları için eğriyi oluşturur.

## Özet

Bezier eğrileri kontrol noktaları ile tanımlanır.

Bezier eğrilerinin iki tanımını gördük:

1. Bir çizim işlemi kullanmak: De Casteljau's algoritması.
2. Matematiksel formüller kullanmak.

Bezier eğrilerinin iyi özellikleri:

- Kontrol noktalarını fare ile hareket ettirerek düzgün eğriler çizebiliriz.
- Karmaşık şekilleri birkaç Bezier eğrisi ile oluşturabiliriz.

Kullanım:

- Bilgisayar grafiklerinde, modelleme ve vektör grafik editörlerinde. Yazı tipleri Bezier eğrileri ile tanımlanır.
- Web geliştirmede -- Canvas ve SVG formatında grafikler için. Bu arada, yukarıdaki "canlı" örnekler SVG'de yazılmıştır. Bunlar aslında parametre olarak farklı noktalar verilen tek bir SVG belgesidir. Bunu ayrı bir pencerede açabilir ve kaynağı görebilirsiniz: [demo.svg](demo.svg?p=0,0,1,0.5,0,0.5,1,1&animate=1).
- CSS animasyonunda animasyonun yolunu ve hızını tanımlamak için kullanılır.
