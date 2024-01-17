# Form özellikleri ve metodları

Formlar ve kontrol elemanları, `<input>` gibi, birçok özel özellik ve işlemlere sahiptir.

Fromları öğrendiğimizde, onlarla çalışmak çok daha kolay olacaktır.

Forms and control elements, such as `<input>` have a lot of special properties and events.

## Navigasyon: form and elemanlar

Form dökümanları özel bir koleksiyon üyesidir `document.forms`.

That's a so-called "named collection": it's both named and ordered. We can use both the name or the number in the document to get the form.

Bu "adlandırılmış koleksiyon" olarak isimlendirilerler: hem adlandırılmış hem de sıralanmıştır. Forma ulaşmak için formun adını ya da numarasını kullanabiliriz.

```js no-beautify
document.forms.my - "my" isimli form
document.forms[0] - döküman içindeki ilk form
```

Yeni bir form oluşturulduğunda içerisindeki bütün elemanlar `form.elements` isimli koleksiyonda erişilebilir hale gelir.

Örneğin:

```html run height=40
<form name="my">
  <input name="one" value="1" />
  <input name="two" value="2" />
</form>

<script>
  // forma ulaşmak için
  let form = document.forms.my; // <form name="my"> form elemanı

  // form elemanına ulaşmak için
  let elem = form.elements.one; // <input name="one"> input elemanı

  alert(elem.value); // 1
</script>
```

Formlarda aynı isme sahip birden fazla eleman olabilir. Böyle bir durumla daha çok radyo tipindeki input elemanlarında karşılaşırız.

Bu durumda `form.elements[name]` bir koleksiyondur, örneğin:

```html run height=40
<form>
  <input type="radio" *!*name="age"*/!* value="10"> <input
  type="radio"*!*name="age"*/!* value="20">
</form>

<script>
  let form = document.forms[0];

  let ageElems = form.elements.age;

  alert(ageElems[0].value); // 10, ilk input değeri
</script>
```

Bu navigasyon özellikleri etiket yapılarına bağlı değildir. Bütün elemanlar, formun neresinde olursa olsun, `form.elements` koleksiyonu içerisinde bulunur.

````smart header=""Alt formlar" olarak alan kümeleri"
Bir form bir veya birden fazla `<fieldset>` elemanına sahip olabilir.
. Bunlar ayrıca `elements` özelliklerine sahiptirler

Örneğin:

```html run height=80
<body>
  <form id="form">
    <fieldset name="userFields">
      <legend>info</legend>
      <input name="login" type="text">
    </fieldset>
  </form>

  <script>
    alert(form.elements.login); // <input name="login">

*!*
    let fieldset = form.elements.userFields;
    alert(fieldset); // HTMLFieldSetElement

    // input elemanına form ve fieldset koleksiyonlarından ulaşabiliriz.
    alert(fieldset.elements.login == form.elements.login); // true
*/!*
  </script>
</body>
```
````

````warn header="Kısa gösterimi: `form.name`"
Daha kısa bir gösterimi mevcut: `form[index/name]` ile bu elamana ulaşabiliriz.

`form.elements.login` yerine `form.login` yazabiliriz.

Bu da çalışır fakat, burada ufak bir problem var:eğer bir elamana ulaşırsak ve daha sonra ismini(`name`) değiştirirsek bu eleman eski ismiyle hala erişilebilr durumdadır.(aynı zamanda yeni ismiylede erişeliebilir).

Aşağıdaki örnekte bunu kolaylıkla görebiliriz:

```html run height=40
<form id="form">
  <input name="login" />
</form>

<script>
    alert(form.elements.login == form.login); // doğru, aynı <input>

    form.login.name = "username"; // input'un ismini değiştir

    // form.elements isim etiketini güncelledi:
    alert(form.elements.login); // tanımsız
    alert(form.elements.username); // input

  *!*
    // doğrudan erişim için iki isimde kullanılabilir: yeni isim ve eski isim
    alert(form.username == form.login); // doğru
  */!*
</script>
```

Bu durum genelde bir sorun oluşturmaz çünkü, form elemanların ismini genellikle değiştirmeyiz.

````

## Geriye referans: element.form


Herhangi bir eleman için form, `element.form` olarak erişilebilir. Bu sayede bir form, tüm elemanlara referans eder ve elemanlar da forma referans eder.


Konuyu görselleştirmek için bir resim:

![](form-navigation.svg)

Örneğin:

```html run height=40
<form id="form">
  <input type="text" name="login">
</form>

<script>
*!*
  // form -> eleman
  let login = form.login;

  // eleman -> form
  alert(login.form); // HTMLFormElement
*/!*
</script>
```

## Form elemanları

Birazda form kontrol elemanlarından bahsedelim, özelliklerine dikkat et.
Let's talk about form controls, pay attention to their specific features.

### input ve textarea

Tipi checkbox olan elemanların değerlerine `input.value` (metin tipinde) veya `input.checked` (mantıksal tipde) ulaşılabilir.


Bunun gibi:

```js
input.value = "Yeni değer";
textarea.value = "Yeni metin";

input.checked = doğru; // checkbox veya radio button tipleri için
```

```warn header=" `textarea.innerHTML` yerine `textarea.value` kullan"

Lütfen şunu unutma, <textarea>...</textarea> içeriğini iç içe geçmiş HTML olarak saklasa da, asla textarea.innerHTML kullanmamalıyız. Bu sadece sayfa ilk yüklendiğinde olan HTML'i saklar, mevcut değeri değil.

```

### select ve option

A `<select>` 3 önemli özelliği vardır:

1. `select.options` -- `<option>` elemanlarından oluşan bir koleksiyon,
2. `select.value` --  halihazırda seçilmiş olan seçeneğin değeri,
3. `select.selectedIndex` -- halihazırda seçilmiş olan seçeneğin dizin numarası.

`<select>` elemanınına değer atamak için üç farklı yol mevcut:


1. Gerekli olan `<option>` seçeneğini bul ve `option.selected` değerini `true` olarak ayarla.
2. `select.value` değerini yaz.
3. `select.selectedIndex` değerine, seçeneğin dizin numarasını yaz.

İlk seçenek en bariz olan fakat `(2)` ve `(3)` daha uygun.


İşte bir örnek:

```html run
<select id="select">
  <option value="apple">Apple</option>
  <option value="pear">Pear</option>
  <option value="banana">Banana</option>
</select>

<script>
  // üç satırda aynı işi yapıyor
  select.options[2].selected = true;
  select.selectedIndex = 2;
  select.value = 'banana';
</script>
```

Diğer çoğu kontrolün aksine, <select multiple> çoklu seçime izin verir. Bu durumda, tüm seçilmiş değerleri almak için `select.options` üzerinde dizi metodları ile işlem yapmamız gerekir.

Şu şekilde:

```html run
<select id="select" *!*multiple*/!*>
  <option value="blues" selected>Blues</option>
  <option value="rock" selected>Rock</option>
  <option value="classic">Classic</option>
</select>

<script>
  // multi-select ile seçilmiş bütün seçekneleri döndürme
  let selected = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value);

  alert(selected); // blues,rock
</script>
```
Daha detaylı bilgi edinmek için: <https://html.spec.whatwg.org/multipage/forms.html#the-select-element> sayfasını ziyaret edin.


### new Option (yeni Seçenek)

Bu yöntem çoğu zaman tek başına kullanılmaz fakat bahsedilmesi gereken bir durum var.

[Seçenek elemanı](https://html.spec.whatwg.org/multipage/forms.html#the-option-element) dökümantasyonunda `<option>` oluşturmak için kısa ve hoş  bir notasyon mevcut:

```js
option = new Option(text, value, defaultSelected, selected);
```

Değişkenler:

- `text` -- seçenek içindeki metin,
- `value` -- seçeneğin değeri,
- `defaultSelected` -- eğer `true`, ise `selected` HTML-attribute oluşturulur,
- `selected` -- eğer `true`, ise, seçenek işaretlenir.

Örneğin:

```js
let option = new Option("Text", "value");
//  <option value="value">Text</option> oluşturur
```

Aynı eleman seçildi:

```js
let option = new Option("Text", "value", true, true);
```

```smart header="`<option>` ın ek özellikleri"
Seçenek elemanlarının ek özellikleri vardır:

`selected`
: seçenek seçildi mi.

`index`
: `<select>` seçeneklerinin dizin numarası.

`text`
: Seçenekte belirtilen metin (kullanıcı tarafından görülür).
```

## Özet

From navigasyonu:

`document.forms`
: Form `document.forms[name/index]` olarak mevcuttur..

`form.elements`
: Form elemanlarına `form.elements[name/index]` kullanarak ulaşılabilir yada or `form[name/index]` kullanılarak ulaşılabilir. `elements` özelliği `<fieldset>` için de çalışır.

`element.form`


:Elemanlar, form özelliğinde kendi `form`larına referans yaparlar.

Değerlere `input.value`, `textarea.value`, `select.value` v.b., yada `input.checked` kullanarak checkbox ve radio buttons tipindeki input'lar için ulaşılabilir.



<select> için değeri ayrıca dizin numarasıyla select.selectedIndex veya seçenekler koleksiyonu select.options üzerinden alabiliriz. Bu ve diğer öğelerin tam belgesi belgede bulunabilir <https://html.spec.whatwg.org/multipage/forms.html>.

Bu bilgiler formlar ile çalışmak için temel bilgiler.Eğitimin ilerleyen bölümlerinde birçok örnekle karşılaşacağız. Bir sonraki bölümde, herhangi bir öğe üzerinde oluşabilecek, ancak çoğunlukla formlar üzerinde işlenen `focus` ve `blur` olaylarını ele alacağız.
````
