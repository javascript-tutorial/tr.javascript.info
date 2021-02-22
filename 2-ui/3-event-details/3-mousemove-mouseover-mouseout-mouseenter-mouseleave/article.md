<<<<<<< HEAD
# Fare Hareketi: mouseover/out, mouseenter/leave

Fare öğeler arasında hareket ettiğinde meydana gelen olaylar hakkında daha fazla ayrıntıya girelim.
=======
# Moving the mouse: mouseover/out, mouseenter/leave

Let's dive into more details about events that happen when the mouse moves between elements.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

## Events mouseover/mouseout, relatedTarget

`mouseover` olayı fare bir ögenin üzerine geldiğinde gerçekleşirken, `mouseout` fare bu ögenin üzerinden gittiği zaman gerçekleşir.

![](mouseover-mouseout.svg)

<<<<<<< HEAD
Bu olaylar özeldir, çünkü `relatedTarget` özellikleri vardır.

Bu özellik `target`ı (hedefi) tamamlar. Fare bir ögeyi diğer ögeye gitmek için bıraktığında, bunlardan biri `target` (hedef) , diğeri `relatedTarget`(ilişkiliTarget) olur.
=======
These events are special, because they have property `relatedTarget`. This property complements `target`. When a mouse leaves one element for another, one of them becomes `target`, and the other one - `relatedTarget`.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

`mouseover` için:

- `event.target` -- fareyle üzerine gelinen öge
- `event.relatedTarget` -- farenin hedefe gitmeden önce üzerinde oldugu öge `relatedTarget` (`relatedTarget` -> `target`).

<<<<<<< HEAD
 `mouseout` için tam tersi:
 
- `event.target` -- farenin terk ettiği öge.
- `event.relatedTarget` -- farenin hedefteki ögeyi terk ettikten sonra gittiği öge. (`target` -> `relatedTarget`).

```online
Aşağıdaki örnekte her yüz özelliği bir öğedir. Fareyi hareket ettirdiğinizde, metin alanında fare olaylarını görebilirsiniz.

Her olay, elementin nereden geldiği ve nereye gittiği hakkında bilgi içerir.
=======
For `mouseout` the reverse:

- `event.target` -- is the element that the mouse left.
- `event.relatedTarget` -- is the new under-the-pointer element, that mouse left for (`target` -> `relatedTarget`).

```online
In the example below each face and its features are separate elements. When you move the mouse, you can see mouse events in the text area.

Each event has the information about both `target` and `relatedTarget`:
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

[codetabs src="mouseoverout" height=280]
```

```warn header="`relatedTarget` `null` olabilir"
`relatedTarget` özelliği `null` (boş) olabilir.

Bu normaldir ve sadece farenin başka bir elementten değil, pencerenin dışından geldiği anlamına gelir. Ya da pencereden çıktığı anlamına gelir.

Kodumuzda `event.relatedTarget` kullanırken bu olasılığı hesaba katmalıyız.`event.relatedTarget.tagName` özelliğine ulaşırsak, bu hata verebilir.
```

<<<<<<< HEAD
## Ögeleri atlama
=======
## Skipping elements
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

`mousemove` olayı fare hareket ettiğinde tetiklenir. Ancak bu her piksel bir olayı tetikler anlamına gelmez.

Tarayıcı farenin konumunu zaman içerisinde kontrol eder. Ve eğer konum değişikliği farekederse, olayı tetikler.

<<<<<<< HEAD
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
=======
That means that if the visitor is moving the mouse very fast then some DOM-elements may be skipped:

![](mouseover-mouseout-over-elems.svg)

If the mouse moves very fast from `#FROM` to `#TO` elements as painted above, then intermediate `<div>` elements (or some of them) may be skipped. The `mouseout` event may trigger on `#FROM` and then immediately `mouseover` on `#TO`.

That's good for performance, because there may be many intermediate elements. We don't really want to process in and out of each one.

On the other hand, we should keep in mind that the mouse pointer doesn't "visit" all elements along the way. It can "jump".

In particular, it's possible that the pointer jumps right inside the middle of the page from out of the window. In that case `relatedTarget` is `null`, because it came from "nowhere":

![](mouseover-mouseout-from-outside.svg)

```online
You can check it out "live" on a teststand below.

Its HTML has two nested elements: the `<div id="child">` is inside the `<div id="parent">`. If you move the mouse fast over them, then maybe only the child div triggers events, or maybe the parent one, or maybe there will be no events at all.

Also move the pointer into the child `div`, and then move it out quickly down through the parent one. If the movement is fast enough, then the parent element is ignored. The mouse will cross the parent element without noticing it.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

[codetabs height=360 src="mouseoverout-fast"]
```

<<<<<<< HEAD
## Çocuk öge için ayrılırken "Ekstra" mouseout olayı

Fareyle bir elementin üzerine geldiğinizi düşünün. `mouseover` olayı tetiklendi. Daha sonra fare imleci iç içe geçmiş çocuk elementin üzerine gittiğini varsayalım. İlginç olarak `mouseout` olayı tetiklenir. Fare imleci teknik olarak hala elementin üzerinde, ancak biz buradan ekstra bir `mouseout` olayı çıkarmış olduk.

![](mouseover-to-child.svg)

Bu ilginç görünebilir ancak kolayca açıklanabilir bir durumdur.

**Tarayıcı mantığına göre, fare imleci herhangi bir zamanda yalnızca *tek* bir öğenin üzerinde olabilir - en içte olanı seçer ( z-endeksi en yüksek olanı yani en üstte olanı).**

Yani başka bir öğeye giderse (aynı ögeye baglı bıle olsa), o zaman bir öncekinden ayrılmış kabul edilir. Bu kadar basit.

Buradan aşağıdaki örnekte görebileceğimiz komik bir sonuç çıkar.

Kırmızı `<div>` mavi olanın içine konmuştur. Mavi `<div>` `mouseover/out` olayı tetiklendiği zamanlarda aşağıdaki metin alanına yazan bir şekilde kodlanmıştır.

Mavi öğeye girip fareyi kırmızı öğenin üzerine getirmeyi deneyin ve olayları izleyin:
=======
```smart header="If `mouseover` triggered, there must be `mouseout`"
In case of fast mouse movements, intermediate elements may be ignored, but one thing we know for sure: if the pointer "officially" entered an element (`mouseover` event generated), then upon leaving it we always get `mouseout`.
```

## Mouseout when leaving for a child

An important feature of `mouseout` -- it triggers, when the pointer moves from an element to its descendant, e.g. from `#parent` to `#child` in this HTML:

```html
<div id="parent">
  <div id="child">...</div>
</div>
```

If we're on `#parent` and then move the pointer deeper into `#child`, we get `mouseout` on `#parent`!

![](mouseover-to-child.svg)

That may seem strange, but can be easily explained.

**According to the browser logic, the mouse cursor may be only over a *single* element at any time -- the most nested one and top by z-index.**

So if it goes to another element (even a descendant), then it leaves the previous one.

Please note another important detail of event processing.

The `mouseover` event on a descendant bubbles up. So, if `#parent` has `mouseover` handler, it triggers:

![](mouseover-bubble-nested.svg)

```online
You can see that very well in the example below: `<div id="child">` is inside the `<div id="parent">`. There are `mouseover/out` handlers on `#parent` element that output event details.

If you move the mouse from `#parent` to `#child`, you see two events on `#parent`:
1. `mouseout [target: parent]` (left the parent), then
2. `mouseover [target: child]` (came to the child, bubbled).
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

[codetabs height=360 src="mouseoverout-child"]
```

<<<<<<< HEAD
1. Mavi ogeye girerken -- `mouseover [target: blue]` olayı tetiklenir.
2. TMavi olandan kırmızı olana hareket ettikten sonra -- `mouseout [target: blue]` olayı tetiklenir.
3. ...Ve aniden `mouseover [target: red]`.

Bu nedenle, "hedef" i hesaba katmayan bir kod için, "(2)" öğesinde "mouseout" öğesinde üstteki ögeyi bıraktık ve "(3)" öğesinde "mouseover" ile ona geri döndük gibi görünüyor.

Sonuç olarak öğeye girme / öğeden çıkma konusunda bazı eylemler gerçekleştirir, sadece bunları hesaba katarak bir yazılım geliştirirsek birçok ekstra "yanlış" sonuç elde edebiliriz.

Bu sorunu `mouseenter/mouseleave` olaylarını kullanarak düzeltebiliriz.
=======
As shown, when the pointer moves from `#parent` element to `#child`, two handlers trigger on the parent element: `mouseout` and `mouseover`:

```js
parent.onmouseout = function(event) {
  /* event.target: parent element */
};
parent.onmouseover = function(event) {
  /* event.target: child element (bubbled) */
};
```

**If we don't examine `event.target` inside the handlers, then it may seem that the mouse pointer left `#parent` element, and then immediately came back over it.**

But that's not the case! The pointer is still over the parent, it just moved deeper into the child element.

If there are some actions upon leaving the parent element, e.g. an animation runs in `parent.onmouseout`, we usually don't want it when the pointer just goes deeper into `#parent`.

To avoid it, we can check `relatedTarget` in the handler and, if the mouse is still inside the element, then ignore such event.

Alternatively we can use other events: `mouseenter` and `mouseleave`, that we'll be covering now, as they don't have such problems.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

## mouseenter and mouseleave olayları

<<<<<<< HEAD
`mouseenter/mouseleave` olayları `mouseover/mouseout` olaylarına benzer şekilde çalışır. Bunlar da imleç bir ögenin üzerine geldiğinde/ ayrıldığında tetiklenir.

Ancak iki fark vardır:

1. Elementin içindeki imleç hareketi sayılmaz.
2. `mouseenter/mouseleave` olay kabarcıklanması (bubble) yapmaz.

Bu olaylar sezgisel olarak çok açık.

İmleç bir elementin üzerine geldiği zaman -- `mouseenter` tetiklenir, ve bu elementin içinde nereye hareket ettiği önem taşımaz. `mouseleave` olayı ancak imleç o elementten tamamen ayrıldığı zaman tetiklenir.

Eğer aynı örneği verecek olursak, `mouseenter/mouseleave` olayını mavi `<div>` üzerinde denersek, aynı hareketi yaptığımız zaman-- olayların sadece `<div>` ögesinden girişte ve çıkışta tetiklendiğini görürüz. Ekstra olarak kırmızı olana giriş çıkışta olay tetiklenmez. İç içe geçmiş çocuk elementler göz ardı edilir.
=======
Events `mouseenter/mouseleave` are like `mouseover/mouseout`. They trigger when the mouse pointer enters/leaves the element.

But there are two important differences:

1. Transitions inside the element, to/from descendants, are not counted.
2. Events `mouseenter/mouseleave` do not bubble.

These events are extremely simple.

When the pointer enters an element -- `mouseenter` triggers. The exact location of the pointer inside the element or its descendants doesn't matter.

When the pointer leaves an element -- `mouseleave` triggers.

```online
This example is similar to the one above, but now the top element has `mouseenter/mouseleave` instead of `mouseover/mouseout`.

As you can see, the only generated events are the ones related to moving the pointer in and out of the top element. Nothing happens when the pointer goes to the child and back. Transitions between descendants are ignored
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

[codetabs height=340 src="mouseleave"]
```

## Olay delegasyonu (Event delegation)

`mouseenter/leave` olaylarının kullanımı çok basittir. Ancak kabarcıklanma (bubble) yapmazlar. Bu yüzden bu olaylarla olay delegasyonu yapamayız.

Tablo hücreleri için fare giriş / çıkışını işlemek istediğimizi hayal edin. Ve yüzlerce hücre var.

<<<<<<< HEAD
Doğal çözüm - işleyiciyi "<table>" a ayarlamak ve oradaki olayları işlemek olacaktır. Ancak "fare gir / bırak" kabarma yapmayacak. Yani eğer böyle bir olay "<td>" üzerinde meydana gelirse, o zaman sadece "<td>" üzerindeki bir işleyici onu yakalayabilir.

`<table>` üzerindeki, `mouseenter/leave` işleyicileri sadece bütün tabloya girerken/ayrılırken tetiklenir. Tablo içinde olan hareketleri takip etmek imkansızdır.

Bu problem değil -- `mouseover/mouseout` kullanabiliriz.

Basit bir işleyici şöyle görünebilir:

```js
// farenin geçtiği hücreleri ışıklandıralim
=======
The natural solution would be -- to set the handler on `<table>` and process events there. But `mouseenter/leave` don't bubble. So if such event happens on `<td>`, then only a handler on that `<td>` is able to catch it.

Handlers for `mouseenter/leave` on `<table>` only trigger when the pointer enters/leaves the table as a whole. It's impossible to get any information about transitions inside it.

So, let's use `mouseover/mouseout`.

Let's start with simple handlers that highlight the element under mouse:

```js
// let's highlight an element under the pointer
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c
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
Here they are in action. As the mouse travels across the elements of this table, the current one is highlighted:

[codetabs height=480 src="mouseenter-mouseleave-delegation"]
```

<<<<<<< HEAD
Bu işleyiciler, herhangi bir öğeden tablonun içindeki herhangi bir diğer ogeye giderken çalışır.

Ancak biz `<td>` ogelerinin, yalnızca içeri ve dışarı geçişlerini ele almak istiyoruz. Ve hücreleri bir bütün olarak ışıklandırmak istiyoruz.  Hücrenin içi veya herhangi bir hücrenin dışı gibi diğer geçişler bizi ilgilendirmez. Onları filtreleyebiliriz.

Çözümlerden biri:

- Bir değişkende şu anda ışıklandırılmış `<td>` elementini hatırlayalim. Buna `currentElem` diyelim .
- `mouseover` olayı  -- eğer hala `currentElem` içindeysek olayı gözardı et.
- `mouseout` olayı -- eğer hala `currentElem` ter etmediysek olayı gözardı et.

Bu, "<td>" nin çocukları arasında hareket ettiğimizde "ekstra" olayları filtreler.
=======
In our case we'd like to handle transitions between table cells `<td>`: entering a cell and leaving it. Other transitions, such as inside the cell or outside of any cells, don't interest us. Let's filter them out.

Here's what we can do:

- Remember the currently highlighted `<td>` in a variable, let's call it `currentElem`.
- On `mouseover` -- ignore the event if we're still inside the current `<td>`.
- On `mouseout` -- ignore if we didn't leave the current `<td>`.

Here's an example of code that accounts for all possible situations:
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

[js src="mouseenter-mouseleave-delegation-2/script.js"]

Once again, the important features are:
1. It uses event delegation to handle entering/leaving of any `<td>` inside the table. So it relies on `mouseover/out` instead of `mouseenter/leave` that don't bubble and hence allow no delegation.
2. Extra events, such as moving between descendants of `<td>` are filtered out, so that `onEnter/Leave` runs only if the pointer leaves or enters `<td>` as a whole.

```online
Bütün detaylarıyla bir örnek verecek olursak:

[codetabs height=460 src="mouseenter-mouseleave-delegation-2"]

<<<<<<< HEAD
İmleci tablo hücrelerinin içine, dışına ve içlerine taşımaya çalışın. Hızlı veya yavaş olamsı önemli değil. Önceki örnekten farkı burada yalnızca "<td>" nin bir bütün olarak ışıklandırılmış olmasıdır.

=======
Try to move the cursor in and out of table cells and inside them. Fast or slow -- doesn't matter. Only `<td>` as a whole is highlighted, unlike the example before.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c
```

## Summary

`mouseover`, `mouseout`, `mousemove`, `mouseenter` ve `mouseleave` olaylarını inceledik.

Not edilmesi gerekenler:

- Hızlı imleç hareketi `mouseover, mousemove, mouseout` olaylarının ortadaki elementleri atlamasına sebep olabilir.
- `mouseover/out` ve `mouseenter/leave` olaylarının ekstra bir hedef özelliği vardir: `relatedTarget`. Bu `target` özelliğini tamamlayıcı olarak işlev görür.

<<<<<<< HEAD
-  `mouseover/out` olayları anne elementten çocuk elemente hareket ettiğimizde dahi tetiklenir. Tarayıcı bir imlecin aynı anda sadece bir elementin üstünde olabileceğini varsayar -- en içteki olanın üzerinde.

- `mouseenter/leave` olayları kabarcık (bubble) yapmaz ve imleç daha içteki elementin üzerine gittiğinde tetiklenmez. Sadece imlecin elementin tamamı üzerine girip / ayrılması ile tetiklenirler, diğer öge içinde hareketleri göz ardı ederler. 
=======
These things are good to note:

- A fast mouse move may skip intermediate elements.
- Events `mouseover/out` and `mouseenter/leave` have an additional property: `relatedTarget`. That's the element that we are coming from/to, complementary to `target`.

Events `mouseover/out` trigger even when we go from the parent element to a child element. The browser assumes that the mouse can be only over one element at one time -- the deepest one.

Events `mouseenter/leave` are different in that aspect: they only trigger when the mouse comes in and out the element as a whole. Also they do not bubble.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c
