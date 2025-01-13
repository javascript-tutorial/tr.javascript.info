# Form özellikleri ve metodları

Formlar ve kontrol elemanları, `<input>` gibi, birçok özel işleme ve özelliklere sahiptir.

From elemanlarını öğrendiğimizde, formlarla çalışmak çok daha kolay olacaktır.

## Navigasyon: form ve elemanları

Form dökümanları özel bir dizi olan `document.forms` üyleridir.

<<<<<<< HEAD
Bu, "adlandırılmış koleksiyon" olarak adlandırılan bir durumdur: hem isimlendirilmiş hem de sıralanmıştır. Belgede forma ulaşmak için hem adı hem de numarasını kullanabiliriz.

```js no-beautify
document.forms.my; // "my" isimli form
document.forms[0]; // döküman içindeki ilk form
=======
That's a so-called *"named collection"*: it's both named and ordered. We can use both the name or the number in the document to get the form.

```js no-beautify
document.forms.my; // the form with name="my"
document.forms[0]; // the first form in the document
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

Yeni bir form oluşturulduğunda içerisindeki bütün elemanlar `form.elements` isimli adlandırılmış koleksiyonda erişilebilir haldedir.

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

<<<<<<< HEAD
Formlarda aynı isme sahip birden fazla eleman olabilir. Böyle bir durumla daha çok radyo tipindeki input elemanlarında karşılaşırız.

Bu durumda `form.elements[name]` bir koleksiyon döner, örneğin:
=======
There may be multiple elements with the same name. This is typical with radio buttons and checkboxes.

In that case, `form.elements[name]` is a *collection*. For instance:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```html run height=40
<form>
  <input type="radio" *!*name="age"*/!* value="10"> <input
  type="radio"*!*name="age"*/!* value="20">
</form>

<script>
  let form = document.forms[0];

  let ageElems = form.elements.age;

<<<<<<< HEAD
  alert(ageElems[0].value); // 10, ilk input değeri
</script>
```

Bu navigasyon özellikleri etiket yapılarına bağlı değildir. Bütün elemanlar, formun neresinde olursa olsun, `form.elements` koleksiyonu içerisinde bulunur.
=======
*!*
alert(ageElems[0]); // [object HTMLInputElement]
*/!*
</script>
```

These navigation properties do not depend on the tag structure. All control elements, no matter how deep they are in the form, are available in `form.elements`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

````smart header=""Alt formlar" olarak alan kümeleri"
Bir form bir veya birden fazla `<fieldset>` elemanına sahip olabilir. Bunlar ayrıca `elements` özelliklerine sahiptirler.

<<<<<<< HEAD
Örneğin:
=======
````smart header="Fieldsets as \"subforms\""
A form may have one or many `<fieldset>` elements inside it. They also have `elements` property that lists form controls inside them.

For instance:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

<<<<<<< HEAD
    // input elemanına hem form hemde fieldset kullanarak ulaşabiliriz.
    alert(fieldset.elements.login == form.elements.login); // doğru
=======
    // we can get the input by name both from the form and from the fieldset
    alert(fieldset.elements.login == form.elements.login); // true
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
*/!*
  </script>
</body>
```
````

````warn header="Kısa gösterimi: `form.name`"
Daha kısa bir gösterim mevcut: `form[index/name]` ile bu elamana ulaşabiliriz.

<<<<<<< HEAD
`form.elements.login` yerine `form.login` yazabiliriz.
=======
In other words, instead of `form.elements.login` we can write `form.login`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Bu da çalışır fakat, burada ufak bir problem var:eğer bir elamana erişirsek ve daha sonra ismini(`name`) değiştirirsek bu eleman eski ismiyle hala erişilebilir durumdadır.(aynı zamanda yeni ismiylede erişeliebilir).

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

<<<<<<< HEAD
  *!*
    // doğrudan erişim için iki isimde kullanılabilir: yeni isim ve eski isim
    alert(form.username == form.login); // doğru
  */!*
</script>
```

Bu durum genelde bir sorun oluşturmaz çünkü, form elemanların ismini hemen hemen hiç değiştirmeyiz.
=======
*!*
  // form allows both names: the new one and the old one
  alert(form.username == form.login); // true
*/!*
</script>
```

That's usually not a problem, however, because we rarely change names of form elements.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

````

## Geriye referans: element.form

<<<<<<< HEAD
=======
For any element, the form is available as `element.form`. So a form references all elements, and elements reference the form.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Herhangi bir eleman için form, `element.form` olarak erişilebilir. Bu sayede bir form, tüm elemanlara referans eder ve elemanlar da forma referans eder.

<<<<<<< HEAD
=======
![](form-navigation.svg)
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

<<<<<<< HEAD
Birazda form kontrol elemanlarından bahsedelim, özelliklerine dikkat etmelisin.
=======
Let's talk about form controls.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

### input ve textarea

<<<<<<< HEAD
Tipi checkbox olan elemanların değerlerine `input.value` (metin tipinde) veya `input.checked` (mantıksal tipde) ulaşılabilir.
=======
We can access their value as `input.value` (string) or `input.checked` (boolean) for checkboxes and radio buttons.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3


Bunun gibi:

```js
input.value = "Yeni değer";
textarea.value = "Yeni metin";

input.checked = true; // checkbox veya radio button tipleri için
```

<<<<<<< HEAD
```warn header=" `textarea.innerHTML` yerine `textarea.value` kullanmalısın"

Lütfen şunu unutma, <textarea>...</textarea> içeriğini iç içe geçmiş HTML olarak saklasa da, asla textarea.innerHTML kullanmamalıyız. Bu sadece sayfa ilk yüklendiğinde olan HTML'i saklar, mevcut değeri değil.

=======
```warn header="Use `textarea.value`, not `textarea.innerHTML`"
Please note that even though `<textarea>...</textarea>` holds its value as nested HTML, we should never use `textarea.innerHTML` to access it.

It stores only the HTML that was initially on the page, not the current value.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

### select ve option

A `<select>` 3 önemli özelliği vardır:

<<<<<<< HEAD
1. `select.options` -- `<option>` elemanlarından oluşan bir dizi,
2. `select.value` --  halihazırda seçilmiş olan seçeneğin değeri,
3. `select.selectedIndex` -- halihazırda seçilmiş olan seçeneğin dizin numarası.

`<select>` elemanınına değer atamak için üç farklı yol mevcut:


1. Gerekli olan `<option>` seçeneğini bul ve `option.selected` değerini `true` olarak ayarla.
2. `select.value` değerine değişken değeri ata.
3. `select.selectedIndex` değerine, seçeneğin dizin numarasını yaz.

İlk seçenek en bariz olan fakat `(2)` ve `(3)` daha uygun.


İşte bir örnek:
=======
1. `select.options` -- the collection of `<option>` subelements,
2. `select.value` -- the *value* of the currently selected `<option>`,
3. `select.selectedIndex` -- the *number* of the currently selected `<option>`.

They provide three different ways of setting a value for a `<select>`:

1. Find the corresponding `<option>` element (e.g. among `select.options`) and set its `option.selected` to `true`.
2. If we know a new value: set `select.value` to the new value.
3. If we know the new option number: set `select.selectedIndex` to that number.

Here is an example of all three methods:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```html run
<select id="select">
  <option value="apple">Apple</option>
  <option value="pear">Pear</option>
  <option value="banana">Banana</option>
</select>

<script>
<<<<<<< HEAD
  // üç satırda aynı işi yapıyor
  select.options[2].selected = true;
=======
  // all three lines do the same thing
  select.options[2].selected = true; 
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
  select.selectedIndex = 2;
  select.value = 'banana';
  // please note: options start from zero, so index 2 means the 3rd option.
</script>
```

<<<<<<< HEAD
Diğer çoğu kontrolün aksine, <select multiple> çoklu seçime izin verir. Bu durumda, tüm seçilmiş değerlere ulaşmak için `select.options` üzerinde dizi metodları ile işlem yapmamız gerekir.

Şu şekilde:
=======
Unlike most other controls, `<select>` allows to select multiple options at once if it has `multiple` attribute. This attribute is rarely used, though.

For multiple selected values, use the first way of setting values: add/remove the `selected` property from `<option>` subelements.

Here's an example of how to get selected values from a multi-select:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```html run
<select id="select" *!*multiple*/!*>
  <option value="blues" selected>Blues</option>
  <option value="rock" selected>Rock</option>
  <option value="classic">Classic</option>
</select>

<script>
  // multi-select ile seçilmiş bütün seçeknelere ulaşma
  let selected = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value);

  alert(selected); // blues,rock
</script>
```
Daha detaylı bilgi edinmek için: <https://html.spec.whatwg.org/multipage/forms.html#the-select-element> sayfasını ziyaret edin.


### new Option (yeni Seçenek)

<<<<<<< HEAD
Bu yöntem çoğu zaman tek başına kullanılmaz fakat bahsedilmesi gereken bir durum var.

[Seçenek elemanı](https://html.spec.whatwg.org/multipage/forms.html#the-option-element) dökümantasyonunda `<option>` oluşturmak için kısa ve hoş  bir notasyon mevcut:
=======
In the [specification](https://html.spec.whatwg.org/multipage/forms.html#the-option-element) there's a nice short syntax to create an `<option>` element:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
option = new Option(text, value, defaultSelected, selected);
```

<<<<<<< HEAD
Değişkenler:
=======
This syntax is optional. We can use `document.createElement('option')` and set attributes manually. Still, it may be shorter, so here are the parameters:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

- `text` -- seçenek içindeki metin,
- `value` -- seçeneğin değeri,
- `defaultSelected` -- eğer `true`, ise `selected` HTML-attribute oluşturulur,
- `selected` -- eğer `true`, ise, seçenek işaretlenir.

<<<<<<< HEAD
Örneğin:
=======
The difference between `defaultSelected` and `selected` is that `defaultSelected` sets the HTML-attribute (that we can get using `option.getAttribute('selected')`, while `selected` sets whether the option is selected or not.

In practice, one should usually set _both_ values to `true` or `false`. (Or, simply omit them; both default to `false`.)

For instance, here's a new "unselected" option:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
let option = new Option("Text", "value");
//  <option value="value">Text</option> oluşturur
```

<<<<<<< HEAD
Aynı eleman seçildi:
=======
The same option, but selected:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
let option = new Option("Text", "value", true, true);
```

<<<<<<< HEAD
```smart header="`<option>` ek özellikleri"
Seçenek elemanlarının ek özellikleri vardır:

`selected`
: seçenek seçildi mi.

`index`
: `<select>` seçeneklerinin dizin numarası.

`text`
: Seçenekte belirtilen metin (kullanıcı tarafından görülür).
```
=======
Option elements have properties:

`option.selected`
: Is the option selected.

`option.index`
: The number of the option among the others in its `<select>`.

`option.text`
: Text content of the option (seen by the visitor).

## References

- Specification: <https://html.spec.whatwg.org/multipage/forms.html>.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Özet

From navigasyonu:

`document.forms`
: Form `document.forms[name/index]` olarak mevcuttur..

`form.elements`
: Form elemanlarına `form.elements[name/index]` kullanarak ulaşılabilir yada or `form[name/index]` kullanılarak ulaşılabilir. `elements` özelliği `<fieldset>` için de çalışır.

`element.form`

<<<<<<< HEAD

:Elemanlar, form özelliğinde kendi `form`larına referans yaparlar.

Değerlere `input.value`, `textarea.value`, `select.value` v.b., yada `input.checked` kullanarak checkbox ve radio buttons tipindeki input'lar için ulaşılabilir.



<select> için değeri ayrıca dizin numarasıyla select.selectedIndex veya seçenekler diziu select.options üzerinden alabiliriz. Bu ve diğer öğelerin tam belgesi belgede bulunabilir <https://html.spec.whatwg.org/multipage/forms.html>.

Bu bilgiler formlar ile çalışmak için temel bilgiler.Eğitimin ilerleyen bölümlerinde birçok örnekle karşılaşacağız. Bir sonraki bölümde, herhangi bir öğe üzerinde oluşabilecek, ancak çoğunlukla formlar üzerinde işlenen `focus` ve `blur` olaylarını ele alacağız.
````
=======
Value is available as `input.value`, `textarea.value`, `select.value`, etc. (For checkboxes and radio buttons, use `input.checked` to determine whether a value is selected.)

For `<select>`, one can also get the value by the index `select.selectedIndex` or through the options collection `select.options`.

These are the basics to start working with forms. We'll meet many examples further in the tutorial.

In the next chapter we'll cover `focus` and `blur` events that may occur on any element, but are mostly handled on forms.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
