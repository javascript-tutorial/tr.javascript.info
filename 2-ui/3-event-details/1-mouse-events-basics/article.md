<<<<<<< HEAD
# Fare olaylarıyla ilgili temel bilgiler

Fare olayları yalnızca "fare olayi ya da manipülasyonu" ile gerçekleşmez, aynı zamanda dokunmatik cihazlara da uyumlu hale getirmek için bu cihazlarda taklit edilir.
=======
# Mouse events
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

Bu bölümde fare olayları ve özellikleri hakkında daha fazla ayrıntıya gireceğiz.

<<<<<<< HEAD
## Fare olay türleri

Fare olaylarını "basit" ve "karmaşık" olarak iki kategoriye ayırabiliriz.

### Basit fare olayları

En çok kullanılan basit olaylar şunlardır:
=======
Please note: such events may come not only from "mouse devices", but are also from other devices, such as phones and tablets, where they are emulated for compatibility.

## Mouse event types

We've already seen some of these events:
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

`mousedown/mouseup` 
: Fare ile bir öğenin üzerine tıklanır / bırakılır.

`mouseover/mouseout`
: Fare ile bir öğenin üzerine gelinir / uzaklaşılır.

`mousemove`
: Bir öğenin üzerine yapılan her fare bu olayı tetikler.

<<<<<<< HEAD
...Başka olay türleri de var, bunları daha sonra ele alacağız.

### Karmaşık fare olayları

=======
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3
`click`
: Farenin sol tuşuna basıldığında, aynı öğe üzerinde `mousedown` ve ardından `mouseup` olayının gerçekleşmesi ile tetiklenir.

<<<<<<< HEAD
`contextmenu`
: Farenin sağ tuşuna basıldığında, `mousedown` olayı gerçekleşirse tetiklenir.

`dblclick`
: Bir ögenin üzerine çift tıklandıktan sonra tetiklenir.

Karmaşık olaylar basit olayların birleşimi, bu yüzden teoride onlarsız da işlerimizi görebiliriz. Ama karmaşık olayların var olmaları iyi çünkü kullanışlılar.

### Olay sırası

Bir eylem birden fazla fare olayı tetikleyebilir.

Örneğin, bir tıklama, düğmeye basıldığında önce `mousedown` olayını, ardından `mouseup` olayını ve fare butonu bırakıldığında `click` olayını tetikler.

Tek bir eylemin birden çok fare olayı başlattığı durumlarda, bunların sırası sabittir. İşleyiciler her zaman şu sıraya göre çağırılır: `mousedown` -> `mouseup` -> `click`.  Olaylar aynı sırayla işlenir: önce `onclick` çalışır sonra `onmouseup`.
=======
`dblclick`
: Triggers after two clicks on the same element within a short timeframe. Rarely used nowadays.

`contextmenu`
: Triggers when the right mouse button is pressed. There are other ways to open a context menu, e.g. using a special keyboard key, it triggers in that case also, so it's not exactly the mouse event.

...There are several other events too, we'll cover them later.

## Events order

As you can see from the list above, a user action may trigger multiple events.

For instance, a left-button click first triggers `mousedown`, when the button is pressed, then `mouseup` and `click` when it's released.

In cases when a single action initiates multiple events, their order is fixed. That is, the handlers are called in the order `mousedown` -> `mouseup` -> `click`.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

````online
Gerçekleşen eylemleri görmek için aşağıdaki butonu tıkla. Çift tıklamayı da dene.

<<<<<<< HEAD
Aşağıdaki test standında, tüm fare olayları kaydedilir ve aralarında 1 saniyeden fazla gecikme varsa, yatay bir cetvel ile ayrılırlar.

Ayrıca, fare butonuna tıklandıgında algılanmasını sağlayan "which" özelliğini görebilirsiniz.
=======
On the teststand below all mouse events are logged, and if there is more than a 1 second delay between them they are separated by a horizontal ruler.

Also we can see the `button` property that allows to detect the mouse button, it's explained below.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Click me with the right or the left mouse button" type="button"> <input onclick="logClear('test')" value="Clear" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

<<<<<<< HEAD
Tıklamayla ilgili bütün olaylar `button` özelliğine sahiptir ve bu da olayın tam olarak hangi fare butonu ile çalıştığını bulmamızı sağlar.

`click` ve `contextmenu` olayları için kullanılamaz çünkü `click` sadece sol tıklamada, `contextmenu` sadece sağ tıklamada gerçekleşir.

Ancak `mousedown` ve `mouseup` olaylarını takip etmek istersek, o zaman `button` özelliğine ihtiyacımız olur, çünkü bu olaylar herhangi bir fare butonu ile gerçekleşebilir, bu yüzden  `button` "right-mousedown" (sağ- tıklama) ile "left-mousedown" (sol-tıklama) olayını ayırt etmemizi sağlar.

Üç olası değer vardır:

| Button State | event.button |
| Sol tuşa tıklama | 0 |
| Orta tuşa tıklama | 1 |
| Sağ tuşa tıklama | 2 |
| X1 tuşa tıklama (geri tuşu) | 3 |
| X2 tuşa tıklama (ileri tuşu) | 4 |

Çoğu fare aygıtında yalnızca sol ve sağ düğmeler bulunur, bu nedenle olası değerler 0 veya 2'dir. Dokunmatik aygıtlar da üzerlerine bir kez dokunduğunda benzer olaylar oluşturur.

Ayrıca, o anda basılan tüm düğmelere düğme başına bir bit olmak üzere tamsayı olarak sahip olan `event.buttons` özelliği vardır. Uygulamada bu özellik çok nadiren kullanılır, ihtiyacınız olursa [MDN](https://developer.mozilla.org/en-US/docs/Web/api/MouseEvent/buttons)'de ayrıntıları bulabilirsiniz.

## Zamanı geçmiş which butonu

Eski kodlar, olası değerlerle buton elde etmenin eski bir yolu olan event.which özelliğini kullanabilir:

- `event.which == 1` -- sol tuşa tıklama
- `event.which == 2` - orta tuşa tıklama
- `event.which == 3` - sağ tuşa tıklama
=======
## Mouse button

Click-related events always have the `button` property, which allows to get the exact mouse button.

We usually don't use it for `click` and `contextmenu` events, because the former happens only on left-click, and the latter -- only on right-click.

From the other hand, `mousedown` and `mouseup` handlers may need `event.button`, because these events trigger on any button, so `button` allows to distinguish between "right-mousedown" and "left-mousedown".

The possible values of `event.button` are:

| Button state | `event.button` |
|--------------|----------------|
| Left button (primary) | 0 |
| Middle button (auxiliary) | 1 |
| Right button (secondary) | 2 |
| X1 button (back) | 3 |
| X2 button (forward) | 4 |

Most mouse devices only have the left and right buttons, so possible values are `0` or `2`. Touch devices also generate similar events when one taps on them.

Also there's `event.buttons` property that has all currently pressed buttons as an integer, one bit per button. In practice this property is very rarely used, you can find details at [MDN](mdn:/api/MouseEvent/buttons) if you ever need it.

```warn header="The outdated `event.which`"
Old code may use `event.which` property that's an old non-standard way of getting a button, with possible values:

- `event.which == 1` – left button,
- `event.which == 2` – middle button,
- `event.which == 3` – right button.

As of now, `event.which` is deprecated, we shouldn't use it.
```
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

**Şu an itibariyle artık kullanımdan kaldırılan event.which olayını artık kullanmamalıyız.** 

## Değiştiriciler: shift, alt, ctrl and meta

<<<<<<< HEAD
Tüm fare olayları, basılan değiştirici tuşlarla ilgili bilgileri içerir.

Özellikler (properties):

- `shiftKey`
- `altKey`
- `ctrlKey`
- `metaKey` (`key:Cmd` Mac için)
=======
Event properties:

- `shiftKey`: `key:Shift`
- `altKey`: `key:Alt` (or `key:Opt` for Mac)
- `ctrlKey`: `key:Ctrl`
- `metaKey`: `key:Cmd` for Mac

They are `true` if the corresponding key was pressed during the event.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

Örneğin, aşağıdaki düğme yalnızca `Alt+Shift`+fare tıklaması ile beraber çalışır:

```html autorun height=60
<button id="button">Alt+Shift+Click tıkla!</button>

<script>
  button.onclick = function(event) {
*!*
    if (event.altKey && event.shiftKey) {
*/!*
      alert('Hooray!');
    }
  };
</script>
```

<<<<<<< HEAD
```warn header="Dikkat: Mac için genellikle `Ctrl` yerine `Cmd` kullanılır."
Windows ve Linux işletim sistemlerinde `key:Alt`, `key:Shift` and `key:Ctrl` değiştiricileri bulunur. Mac için bir değiştirici daha var: `key:Cmd`, bu `metaKey` özelliğine karşılık gelir.

Çoğu zaman Windows/Linux üzerinde bir durum için `key:Ctrl` kullanılırken, Mac üzerinde `key:Cmd` kullanılır. Bu yüzden Windows kullanıcısı `key:Ctrl+Enter` ya da `key:Ctrl+A` kullandığı zaman, Mac kullanıcısı `key:Cmd+Enter` ya da `key:Cmd+A` kullanır. Bir çok uygulama da `key:Ctrl` yerine `key:Cmd` kullanır.

Dolayısıyla, Ctrl + tıklama gibi kombinasyonları kullanacagımız zaman, Mac için Cmd + tıklamayı kullanmak mantıklıdır. Bu, Mac kullanıcıları için fiziksel açıdan da daha rahat bir çözümdür.

Mac kullanıcılarını `key: Ctrl` + tıklama yapmaya zorlasak bile sorun şudur: `key:Ctrl` ile sol tıklama, Mac'te *sağ tıklama* olarak yorumlanır ve Windows / Linux gibi `click` değil, `contextmenu` olayını oluşturur.

Dolayısıyla, tüm işletim sistemlerinin kullanıcılarının kendilerini rahat hissetmelerini istiyorsak, o zaman `ctrlKey` ile birlikte `metaKey` kullanmalıyız.
=======
```warn header="Attention: on Mac it's usually `Cmd` instead of `Ctrl`"
On Windows and Linux there are modifier keys `key:Alt`, `key:Shift` and `key:Ctrl`. On Mac there's one more: `key:Cmd`, corresponding to the property `metaKey`.

In most applications, when Windows/Linux uses `key:Ctrl`, on Mac `key:Cmd` is used.

That is: where a Windows user presses `key:Ctrl+Enter` or `key:Ctrl+A`, a Mac user would press `key:Cmd+Enter` or `key:Cmd+A`, and so on.

So if we want to support combinations like `key:Ctrl`+click, then for Mac it makes sense to use `key:Cmd`+click. That's more comfortable for Mac users.

Even if we'd like to force Mac users to `key:Ctrl`+click -- that's kind of difficult. The problem is: a left-click with `key:Ctrl` is interpreted as a *right-click* on MacOS, and it generates the `contextmenu` event, not `click` like Windows/Linux.

So if we want users of all operating systems to feel comfortable, then together with `ctrlKey` we should check `metaKey`.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

JS kodu için bu, `if (event.ctrlKey || event.metaKey) şeklinde tuşları kontrol etmemiz gerektiği anlamına gelir.
```

<<<<<<< HEAD
```warn header="Hesaba katmamız gereken bir başka durum da mobil cihazlar"
Klavye kombinasyonları ziyaretçinin klavyesi varsa çalışır. 
Ancak eğer kullanıcı klavyesiz kullanıyorsa -- o zaman aynısını yapmanın başka bir yolu var.
=======
```warn header="There are also mobile devices"
Keyboard combinations are good as an addition to the workflow. So that if the visitor uses a keyboard -- they work. 

But if their device doesn't have it -- then there should be a way to live without modifier keys.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3
```

## Koordinatlar: clientX/Y, pageX/Y

Tüm fare olaylarının iki farklı türde koordinatları vardır:

<<<<<<< HEAD
1. Pencereye bağlı koordinatlar (Window-relative): `clientX` ve `clientY`.
2. Belgeye bağlı koordınatlar (Document-relative): `pageX` ve `pageY`.
=======
All mouse events provide coordinates in two flavours:
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

Kısaca, belgeye bağlı koordinatlar pageX / Y, belgenin en sol üst köşesinden sayılır ve sayfa kaydırıldığında da değişmez, clientX / Y ise geçerli pencerenin (wındow) sol üst köşesinden sayılır. Sayfa kaydırıldığında değişirler.

<<<<<<< HEAD
Örneğin, 500x500 boyutunda bir penceremiz varsa ve fare en sol üst köşedeyse, o zaman `clientX` ve `clientY` `0` olur. Fare tam ortadaysa, o zaman belgenin neresinde olursa olsun `clientX` ve `clientY` `250` olur. `position:fixed` ile benzer şekilde çalışır.

````online
`clientX/clientY` değerlerini görmek için fare ile üzerinden geç. ("iframe" içinde yapıldı, bu nedenle koordinatlar bu "iframe" e göredir):
=======
We already covered the difference between them in the chapter <info:coordinates>.

In short, document-relative coordinates `pageX/Y` are counted from the left-upper corner of the document, and do not change when the page is scrolled, while `clientX/Y` are counted from the current window left-upper corner. When the page is scrolled, they change.

For instance, if we have a window of the size 500x500, and the mouse is in the left-upper corner, then `clientX` and `clientY` are `0`, no matter how the page is scrolled. 

And if the mouse is in the center, then `clientX` and `clientY` are `250`, no matter what place in the document it is. They are similar to `position:fixed` in that aspect.

````online
Move the mouse over the input field to see `clientX/clientY` (the example is in the `iframe`, so coordinates are relative to that `iframe`):
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">
```
````

<<<<<<< HEAD
Belgeye bağlı koordinatlar, pencereden değil, belgenin sol üst köşesinden sayılır.
"PageX", "pageY" koordinatları, belge düzeyinde "position: absolute" ile benzerdir.

Bunlar arasındaki farkı burada daha detaylı olarak işledik <info:coordinates>.

## mousedown olayında metin seçimini önleme

Fare tıklamalarının rahatsız edici olabilecek bir yan etkisi vardır. Çift tıklama metni seçer.

Bütün tıklama olaylarını kendimiz kontrole almak istiyorsak, "ekstra" olarak metin seçimi iyi olmayabilir.

Örneğin, aşağıdaki metne çift tıklamak, işleyicimize ek olarak bir tıkladıgımız kelimeyi seçer:

```html autorun height=50
<b ondblclick="alert('dblclick')">Bana çift tıkla</b>
```

Seçimi durdurmanın bir CSS yolu vardır: `user-select` özelliğini buradan incelyebilirsiniz. [CSS UI Draft](https://www.w3.org/TR/css-ui-4/).

Çoğu tarayıcı bunu destekler:

```html autorun height=50
<style>
  b {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>

Önce...
<b ondblclick="alert('Test')">
  Seçilemez
</b>
...Sonra
```

Şimdi "Seçilemez" üzerine çift tıklarsanız, seçilmez. Çalışıyor gibi görünüyor.

...Ancak potansiyel bir sorun var! Metin gerçekten seçilemez hale geldi. Kullanıcı seçimi "Önce" den başlatıp "Sonra" ile bitirse bile, seçim "Seçilemeyen" kısmı atlar. Metnimizi gerçekten seçilemez hale getirmek istiyor muyuz?

Çoğu zaman bunu istemeyiz. Bir kullanıcının metni seçmek, kopyalamak veya diğer ihtiyaçları için geçerli nedenleri olabilir. Bunu yapmalarına izin vermezsek bu rahatsız edici olabilir. Yani bu çözüm o kadar iyi değil.

İstediğimiz sadece çift tıklamayla seçimi engellemek, hepsi bu.

Metin seçimi  `mousedown` olayıyla beraber gerçekleşen bir tarayıcı işlemi. Bu yüzden alternatif yöntem `mousedown` olayını engellemek, şu şekilde:
=======
## Preventing selection on mousedown

Double mouse click has a side-effect that may be disturbing in some interfaces: it selects text.

For instance, double-clicking on the text below selects it in addition to our handler:

```html autorun height=50
<span ondblclick="alert('dblclick')">Double-click me</span>
```

If one presses the left mouse button and, without releasing it, moves the mouse, that also makes the selection, often unwanted.

There are multiple ways to prevent the selection, that you can read in the chapter <info:selection-range>.

In this particular case the most reasonable way is to prevent the browser action on `mousedown`. It prevents both these selections:
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

```html autorun height=50
Önce...
<b ondblclick="alert('Click!')" *!*onmousedown="return false"*/!*>
  Çift tıkla
</b>
...Sonra
```

<<<<<<< HEAD
Artık kalın yazı tipiyle yazılmış öğe çift tıklamayla seçilmiyor.

İçindeki metin hala seçilebilir. Ancak, seçim metnin kendisinde değil, ondan önce veya sonra başlamalıdır. Yine de genellikle bu sorun olmaz ve en iyi çözüm alternatifidir.


````smart header="Metin seçimini iptal etme"
Seçimi *önlemek* yerine, olay işleyicisini "post-factum" iptal edebiliriz.
Şu şekilde:

```html autorun height=50
Önce...
<b ondblclick="*!*getSelection().removeAllRanges()*/!*">
  Çift tıkla!
</b>
...Sonra
```

Kalın yazı tipiyle yazılmış öğeye çift tıklarsanız, seçim görünür ve hemen kaldırılır. Yine de bu hoş görünmüyor.````

````smart header="Kopyalamayı önlemek"
İçeriğimizi kopyalayıp yapıştırmaya karşı korumak için seçimi devre dışı bırakmak istiyorsak, başka bir özellik kullanabiliriz.
=======
Now the bold element is not selected on double clicks, and pressing the left button on it won't start the selection.

Please note: the text inside it is still selectable. However, the selection should start not on the text itself, but before or after it. Usually that's fine for users.

````smart header="Preventing copying"
If we want to disable selection to protect our page content from copy-pasting, then we can use another event: `oncopy`.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Copying forbidden!');return false"*/!*>
  Sevgili kullanıcı,
  Kopyalama bu metin için yasaktır.
  Eğer JS ve HTML biliyorsanız yine de buradaki her şeyi kopyalayabilirsiniz.
</div>
```
Eğer `<div>` içindeki bir yazıyı kopyalamaya çalışırsanız, işe yaramaz, çünkü normal olarak varsayılan `oncopy` özelliği şimdi engellendi.

<<<<<<< HEAD
Elbette bu, kullanıcının HTML kaynağını açmasını engelleyemez, ancak herkes bunu nasıl yapacağını bilmiyor.
=======
Surely the user has access to HTML-source of the page, and can take the content from there, but not everyone knows how to do it.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3
````

## Özet

Fare olayları aşağıdaki özelliklere sahiptir:

<<<<<<< HEAD
- Buton: `button`.
- Değiştirici tuşlar (basıldığında `true` değerini verir): `altKey`, `ctrlKey`, `shiftKey` and `metaKey` (Mac).
  - `key:Ctrl` ile işlem yapacaksanız, Mac kullanıcılarını unutmayın, Mac kullanıcıları `key:Cmd` kullanırlar bu sebeple `if (e.metaKey || e.ctrlKey)` ile bunu kontrol etmeniz gerekir.
=======
- Button: `button`.
- Modifier keys (`true` if pressed): `altKey`, `ctrlKey`, `shiftKey` and `metaKey` (Mac).
  - If you want to handle `key:Ctrl`, then don't forget Mac users, they usually use `key:Cmd`, so it's better to check `if (e.metaKey || e.ctrlKey)`.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

- Pencereye bağlı koordinatlar : `clientX/clientY`.
- Belgeye bağlı koordinatlar : `pageX/pageY`.

<<<<<<< HEAD
Ayrıca, tıklamaların istenmeyen bir yan etkisi olarak metin seçimiyle uğraşmak da önemlidir.

Bunu yapmanın birkaç yolu vardır, örneğin:
1. CSS methodu `user-select:none` tamamiyle metin seçimini engeller.
2. Ondan sonra gelecek metin seçimini iptal eder; `getSelection().removeAllRanges()`.
3. Fare `mousedown` olayını engelleyerek varsayılan metin seçimi durumunu engeller (genellikle en iyi çözüm).
=======
The default browser action of `mousedown` is text selection, if it's not good for the interface, then it should be prevented.

In the next chapter we'll see more details about events that follow pointer movement and how to track element changes under it.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3
