# Fare olaylarıyla ilgili temel bilgiler

Fare olayları yalnızca "fare olayi ya da manipülasyonu" ile gerçekleşmez, aynı zamanda dokunmatik cihazlara da uyumlu hale getirmek için bu cihazlarda taklit edilir.

Bu bölümde fare olayları ve özellikleri hakkında daha fazla ayrıntıya gireceğiz.

## Fare olay türleri

Fare olaylarını "basit" ve "karmaşık" olarak iki kategoriye ayırabiliriz.

### Basit fare olayları

En çok kullanılan basit olaylar şunlardır:

`mousedown/mouseup` 
: Fare ile bir öğenin üzerine tıklanır / bırakılır.

`mouseover/mouseout`
: Fare ile bir öğenin üzerine gelinir / uzaklaşılır.

`mousemove`
: Bir öğenin üzerine yapılan her fare bu olayı tetikler.

...Başka olay türleri de var, bunları daha sonra ele alacağız.

### Karmaşık fare olayları

`click`
: Farenin sol tuşuna basıldığında, aynı öğe üzerinde `mousedown` ve ardından `mouseup` olayının gerçekleşmesi ile tetiklenir.

`contextmenu`
: Farenin sağ tuşuna basıldığında, `mousedown` olayı gerçekleşirse tetiklenir.

`dblclick`
: Bir ögenin üzerine çift tıklandıktan sonra tetiklenir.

Karmaşık olaylar basit olayların birleşimi, bu yüzden teoride onlarsız da işlerimizi görebiliriz. Ama karmaşık olayların var olmaları iyi çünkü kullanışlılar.

### Olay sırası

Bir eylem birden fazla fare olayı tetikleyebilir.

Örneğin, bir tıklama, düğmeye basıldığında önce `mousedown` olayını, ardından `mouseup` olayını ve fare butonu bırakıldığında `click` olayını tetikler.

Tek bir eylemin birden çok fare olayı başlattığı durumlarda, bunların sırası sabittir. İşleyiciler her zaman şu sıraya göre çağırılır: `mousedown` -> `mouseup` -> `click`.  Olaylar aynı sırayla işlenir: önce `onclick` çalışır sonra `onmouseup`.

````online
Gerçekleşen eylemleri görmek için aşağıdaki butonu tıkla. Çift tıklamayı da dene.

Aşağıdaki test standında, tüm fare olayları kaydedilir ve aralarında 1 saniyeden fazla gecikme varsa, yatay bir cetvel ile ayrılırlar.

Ayrıca, fare butonuna tıklandıgında algılanmasını sağlayan "which" özelliğini görebilirsiniz.

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Click me with the right or the left mouse button" type="button"> <input onclick="logClear('test')" value="Clear" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

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

**Şu an itibariyle artık kullanımdan kaldırılan event.which olayını artık kullanmamalıyız.** 

## Değiştiriciler: shift, alt, ctrl and meta

Tüm fare olayları, basılan değiştirici tuşlarla ilgili bilgileri içerir.

Özellikler (properties):

- `shiftKey`
- `altKey`
- `ctrlKey`
- `metaKey` (`key:Cmd` Mac için)

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

```warn header="Dikkat: Mac için genellikle `Ctrl` yerine `Cmd` kullanılır."
Windows ve Linux işletim sistemlerinde `key:Alt`, `key:Shift` and `key:Ctrl` değiştiricileri bulunur. Mac için bir değiştirici daha var: `key:Cmd`, bu `metaKey` özelliğine karşılık gelir.

Çoğu zaman Windows/Linux üzerinde bir durum için `key:Ctrl` kullanılırken, Mac üzerinde `key:Cmd` kullanılır. Bu yüzden Windows kullanıcısı `key:Ctrl+Enter` ya da `key:Ctrl+A` kullandığı zaman, Mac kullanıcısı `key:Cmd+Enter` ya da `key:Cmd+A` kullanır. Bir çok uygulama da `key:Ctrl` yerine `key:Cmd` kullanır.

Dolayısıyla, Ctrl + tıklama gibi kombinasyonları kullanacagımız zaman, Mac için Cmd + tıklamayı kullanmak mantıklıdır. Bu, Mac kullanıcıları için fiziksel açıdan da daha rahat bir çözümdür.

Mac kullanıcılarını `key: Ctrl` + tıklama yapmaya zorlasak bile sorun şudur: `key:Ctrl` ile sol tıklama, Mac'te *sağ tıklama* olarak yorumlanır ve Windows / Linux gibi `click` değil, `contextmenu` olayını oluşturur.

Dolayısıyla, tüm işletim sistemlerinin kullanıcılarının kendilerini rahat hissetmelerini istiyorsak, o zaman `ctrlKey` ile birlikte `metaKey` kullanmalıyız.

JS kodu için bu, `if (event.ctrlKey || event.metaKey) şeklinde tuşları kontrol etmemiz gerektiği anlamına gelir.
```

```warn header="Hesaba katmamız gereken bir başka durum da mobil cihazlar"
Klavye kombinasyonları ziyaretçinin klavyesi varsa çalışır. 
Ancak eğer kullanıcı klavyesiz kullanıyorsa -- o zaman aynısını yapmanın başka bir yolu var.
```

## Koordinatlar: clientX/Y, pageX/Y

Tüm fare olaylarının iki farklı türde koordinatları vardır:

1. Pencereye bağlı koordinatlar (Window-relative): `clientX` ve `clientY`.
2. Belgeye bağlı koordınatlar (Document-relative): `pageX` ve `pageY`.

Kısaca, belgeye bağlı koordinatlar pageX / Y, belgenin en sol üst köşesinden sayılır ve sayfa kaydırıldığında da değişmez, clientX / Y ise geçerli pencerenin (wındow) sol üst köşesinden sayılır. Sayfa kaydırıldığında değişirler.

Örneğin, 500x500 boyutunda bir penceremiz varsa ve fare en sol üst köşedeyse, o zaman `clientX` ve `clientY` `0` olur. Fare tam ortadaysa, o zaman belgenin neresinde olursa olsun `clientX` ve `clientY` `250` olur. `position:fixed` ile benzer şekilde çalışır.

````online
`clientX/clientY` değerlerini görmek için fare ile üzerinden geç. ("iframe" içinde yapıldı, bu nedenle koordinatlar bu "iframe" e göredir):

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">
```
````

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

```html autorun height=50
Önce...
<b ondblclick="alert('Click!')" *!*onmousedown="return false"*/!*>
  Çift tıkla
</b>
...Sonra
```

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

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Copying forbidden!');return false"*/!*>
  Sevgili kullanıcı,
  Kopyalama bu metin için yasaktır.
  Eğer JS ve HTML biliyorsanız yine de buradaki her şeyi kopyalayabilirsiniz.
</div>
```
Eğer `<div>` içindeki bir yazıyı kopyalamaya çalışırsanız, işe yaramaz, çünkü normal olarak varsayılan `oncopy` özelliği şimdi engellendi.

Elbette bu, kullanıcının HTML kaynağını açmasını engelleyemez, ancak herkes bunu nasıl yapacağını bilmiyor.
````

## Özet

Fare olayları aşağıdaki özelliklere sahiptir:

- Buton: `button`.
- Değiştirici tuşlar (basıldığında `true` değerini verir): `altKey`, `ctrlKey`, `shiftKey` and `metaKey` (Mac).
  - `key:Ctrl` ile işlem yapacaksanız, Mac kullanıcılarını unutmayın, Mac kullanıcıları `key:Cmd` kullanırlar bu sebeple `if (e.metaKey || e.ctrlKey)` ile bunu kontrol etmeniz gerekir.

- Pencereye bağlı koordinatlar : `clientX/clientY`.
- Belgeye bağlı koordinatlar : `pageX/pageY`.

Ayrıca, tıklamaların istenmeyen bir yan etkisi olarak metin seçimiyle uğraşmak da önemlidir.

Bunu yapmanın birkaç yolu vardır, örneğin:
1. CSS methodu `user-select:none` tamamiyle metin seçimini engeller.
2. Ondan sonra gelecek metin seçimini iptal eder; `getSelection().removeAllRanges()`.
3. Fare `mousedown` olayını engelleyerek varsayılan metin seçimi durumunu engeller (genellikle en iyi çözüm).
