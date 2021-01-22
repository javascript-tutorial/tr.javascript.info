# Fare Hareketi: mouseover/out, mouseenter/leave

Fare öğeler arasında hareket ettiğinde meydana gelen olaylar hakkında daha fazla ayrıntıya girelim.

## Mouseover/mouseout, relatedTarget

`mouseover` olayı fare bir ögenin üzerine geldiğinde gerçekleşirken, `mouseout` fare bu ögenin üzerinden gittiği zaman gerçekleşir.

![](mouseover-mouseout.svg)

Bu olaylar özeldir, çünkü `relatedTarget` özellikleri vardır.

Bu özellik `target`ı (hedefi) tamamlar. Fare bir ögeyi diğer ögeye gitmek için bıraktığında, bunlardan biri `target` (hedef) , diğeri `relatedTarget`(ilişkiliTarget) olur.

`mouseover` için:

- `event.target` -- fareyle üzerine gelinen öge
- `event.relatedTarget` -- farenin hedefe gitmeden önce üzerinde oldugu öge `relatedTarget` (`relatedTarget` -> `target`).

 `mouseout` için tam tersi:
 
- `event.target` -- farenin terk ettiği öge.
- `event.relatedTarget` -- farenin hedefteki ögeyi terk ettikten sonra gittiği öge. (`target` -> `relatedTarget`).

```online
Aşağıdaki örnekte her yüz özelliği bir öğedir. Fareyi hareket ettirdiğinizde, metin alanında fare olaylarını görebilirsiniz.

Her olay, elementin nereden geldiği ve nereye gittiği hakkında bilgi içerir.

[codetabs src="mouseoverout" height=280]
```

```warn header="`relatedTarget` `null` olabilir"
`relatedTarget` özelliği `null` (boş) olabilir.

Bu normaldir ve sadece farenin başka bir elementten değil, pencerenin dışından geldiği anlamına gelir. Ya da pencereden çıktığı anlamına gelir.

Kodumuzda `event.relatedTarget` kullanırken bu olasılığı hesaba katmalıyız.`event.relatedTarget.tagName` özelliğine ulaşırsak, bu hata verebilir.
```

## Ögeleri atlama

`mousemove` olayı fare hareket ettiğinde tetiklenir. Ancak bu her piksel bir olayı tetikler anlamına gelmez.

Tarayıcı farenin konumunu zaman içerisinde kontrol eder. Ve eğer konum değişikliği farekederse, olayı tetikler.

Bu, eğer kullanıcı fareyi çok hızlı hareket ettiriyorsa, bazı DOM ögelerinin atlanabileceği anlamına gelir.

![](mouseover-mouseout-over-elems.svg)

Eğer fare `#FROM` ögesinden`#TO` ögesine çok hızlı bir şekilde hareket ederse, ortadaki `<div>` ögeleri (ya da bazıları) atlanabilir. `mouseout` olayı `#FROM` ogesinde ve ardından aniden `#TO` ögesi üzerinde tetiklenir.

Bu, performans için iyidir, çünkü arada bir çok öge bulunabilir. Her birinde olay tetiklemeyi her zaman istemeyiz.

Öte yandan, fare ımlecinin yol boyunca tüm öğeleri "ziyaret etmediğini" unutmamalıyız. Bu ögelerin üzerinden "zıplayabilir".

Özellikle, imlecin pencereden sayfanın ortasına doğru atlaması mümkündür. Bu durumda `relatedTarget=null`, olur çünkü imleç "hiçbir yerden" gelmiştir:

![](mouseover-mouseout-from-outside.svg)

<div style="display:none">
Hızlı fare hareketi durumunda, ortadaki elementler olay tetiklemeyebilirler. Ancak eger fare bır element üzerinde (`mouseover`) olayını tetiklediyse, fare ogeden uzaklastıgında `mouseout` olayının tetikleneceğini garantilemiş oluruz.
</div>

```online
Aşağıdaki test standında "canlı" olarak kontrol edebilirsiniz.

HTML iç içe geçmiş `<div>` ögelerinden oluşuyor. Eğer farenizi onların üzerinden hızlıca hareket ettirirseniz, hiç bir olay tetiklenmeyebilir, belki sadece kırmızı div olay tetikleyebilir ya da sadece yeşil div tetikleyebilir.

Ayrıca, fareyi kırmızı "div" nin üzerine getirmeyi deneyin ve ardından hızlıca yeşil olandan aşağı doğru hareket ettirin. Hareket yeterince hızlıysa, ana öğe göz ardı edilir.

[codetabs height=360 src="mouseoverout-fast"]
```

## Çocuk öge için ayrılırken "Ekstra" mouseout olayı

Fareyle bir elementin üzerine geldiğinizi düşünün. `mouseover` olayı tetiklendi. Daha sonra fare imleci iç içe geçmiş çocuk elementin üzerine gittiğini varsayalım. İlginç olarak `mouseout` olayı tetiklenir. Fare imleci teknik olarak hala elementin üzerinde, ancak biz buradan ekstra bir `mouseout` olayı çıkarmış olduk.

![](mouseover-to-child.svg)

Bu ilginç görünebilir ancak kolayca açıklanabilir bir durumdur.

**Tarayıcı mantığına göre, fare imleci herhangi bir zamanda yalnızca *tek* bir öğenin üzerinde olabilir - en içte olanı seçer ( z-endeksi en yüksek olanı yani en üstte olanı).**

Yani başka bir öğeye giderse (aynı ögeye baglı bıle olsa), o zaman bir öncekinden ayrılmış kabul edilir. Bu kadar basit.

Buradan aşağıdaki örnekte görebileceğimiz komik bir sonuç çıkar.

Kırmızı `<div>` mavi olanın içine konmuştur. Mavi `<div>` `mouseover/out` olayı tetiklendiği zamanlarda aşağıdaki metin alanına yazan bir şekilde kodlanmıştır.

Mavi öğeye girip fareyi kırmızı öğenin üzerine getirmeyi deneyin ve olayları izleyin:

[codetabs height=360 src="mouseoverout-child"]

1. Mavi ogeye girerken -- `mouseover [target: blue]` olayı tetiklenir.
2. TMavi olandan kırmızı olana hareket ettikten sonra -- `mouseout [target: blue]` olayı tetiklenir.
3. ...Ve aniden `mouseover [target: red]`.

Bu nedenle, "hedef" i hesaba katmayan bir kod için, "(2)" öğesinde "mouseout" öğesinde üstteki ögeyi bıraktık ve "(3)" öğesinde "mouseover" ile ona geri döndük gibi görünüyor.

Sonuç olarak öğeye girme / öğeden çıkma konusunda bazı eylemler gerçekleştirir, sadece bunları hesaba katarak bir yazılım geliştirirsek birçok ekstra "yanlış" sonuç elde edebiliriz.

Bu sorunu `mouseenter/mouseleave` olaylarını kullanarak düzeltebiliriz.

## mouseenter and mouseleave olayları

`mouseenter/mouseleave` olayları `mouseover/mouseout` olaylarına benzer şekilde çalışır. Bunlar da imleç bir ögenin üzerine geldiğinde/ ayrıldığında tetiklenir.

Ancak iki fark vardır:

1. Elementin içindeki imleç hareketi sayılmaz.
2. `mouseenter/mouseleave` olay kabarcıklanması (bubble) yapmaz.

Bu olaylar sezgisel olarak çok açık.

İmleç bir elementin üzerine geldiği zaman -- `mouseenter` tetiklenir, ve bu elementin içinde nereye hareket ettiği önem taşımaz. `mouseleave` olayı ancak imleç o elementten tamamen ayrıldığı zaman tetiklenir.

Eğer aynı örneği verecek olursak, `mouseenter/mouseleave` olayını mavi `<div>` üzerinde denersek, aynı hareketi yaptığımız zaman-- olayların sadece `<div>` ögesinden girişte ve çıkışta tetiklendiğini görürüz. Ekstra olarak kırmızı olana giriş çıkışta olay tetiklenmez. İç içe geçmiş çocuk elementler göz ardı edilir.

[codetabs height=340 src="mouseleave"]

## Olay delegasyonu (Event delegation)

`mouseenter/leave` olaylarının kullanımı çok basittir. Ancak kabarcıklanma (bubble) yapmazlar. Bu yüzden bu olaylarla olay delegasyonu yapamayız.

Tablo hücreleri için fare giriş / çıkışını işlemek istediğimizi hayal edin. Ve yüzlerce hücre var.

Doğal çözüm - işleyiciyi "<table>" a ayarlamak ve oradaki olayları işlemek olacaktır. Ancak "fare gir / bırak" kabarma yapmayacak. Yani eğer böyle bir olay "<td>" üzerinde meydana gelirse, o zaman sadece "<td>" üzerindeki bir işleyici onu yakalayabilir.

`<table>` üzerindeki, `mouseenter/leave` işleyicileri sadece bütün tabloya girerken/ayrılırken tetiklenir. Tablo içinde olan hareketleri takip etmek imkansızdır.

Bu problem değil -- `mouseover/mouseout` kullanabiliriz.

Basit bir işleyici şöyle görünebilir:

```js
// farenin geçtiği hücreleri ışıklandıralim
table.onmouseover = function(event) {
  let target = event.target;
  target.style.background = 'pink';
};

table.onmouseout = function(event) {
  let target = event.target;
  target.style.background = '';
};
```

```online
[codetabs height=480 src="mouseenter-mouseleave-delegation"]
```

Bu işleyiciler, herhangi bir öğeden tablonun içindeki herhangi bir diğer ogeye giderken çalışır.

Ancak biz `<td>` ogelerinin, yalnızca içeri ve dışarı geçişlerini ele almak istiyoruz. Ve hücreleri bir bütün olarak ışıklandırmak istiyoruz.  Hücrenin içi veya herhangi bir hücrenin dışı gibi diğer geçişler bizi ilgilendirmez. Onları filtreleyebiliriz.

Çözümlerden biri:

- Bir değişkende şu anda ışıklandırılmış `<td>` elementini hatırlayalim. Buna `currentElem` diyelim .
- `mouseover` olayı  -- eğer hala `currentElem` içindeysek olayı gözardı et.
- `mouseout` olayı -- eğer hala `currentElem` ter etmediysek olayı gözardı et.

Bu, "<td>" nin çocukları arasında hareket ettiğimizde "ekstra" olayları filtreler.

```offline
The details are in the [full example](sandbox:mouseenter-mouseleave-delegation-2).
```

```online
Bütün detaylarıyla bir örnek verecek olursak:

[codetabs height=380 src="mouseenter-mouseleave-delegation-2"]

İmleci tablo hücrelerinin içine, dışına ve içlerine taşımaya çalışın. Hızlı veya yavaş olamsı önemli değil. Önceki örnekten farkı burada yalnızca "<td>" nin bir bütün olarak ışıklandırılmış olmasıdır.

```


## Summary

`mouseover`, `mouseout`, `mousemove`, `mouseenter` ve `mouseleave` olaylarını inceledik.

Not edilmesi gerekenler:

- Hızlı imleç hareketi `mouseover, mousemove, mouseout` olaylarının ortadaki elementleri atlamasına sebep olabilir.
- `mouseover/out` ve `mouseenter/leave` olaylarının ekstra bir hedef özelliği vardir: `relatedTarget`. Bu `target` özelliğini tamamlayıcı olarak işlev görür.

-  `mouseover/out` olayları anne elementten çocuk elemente hareket ettiğimizde dahi tetiklenir. Tarayıcı bir imlecin aynı anda sadece bir elementin üstünde olabileceğini varsayar -- en içteki olanın üzerinde.

- `mouseenter/leave` olayalrı kabarcık (bubble) yapmaz ve imleç içteki çocuk elementin üzerine gittiğinde tetiklenmez. Sadece imlecin elementin tamamı üzerine girip / ayrılması ile tetiklenirler, diğer öge içinde hareketleri göz ardı ederler. 
