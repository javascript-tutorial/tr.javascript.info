# Searching: getElement*, querySelector*

DOM gezinme özellikleri, öğeler birbirine yakın olduğunda harikadır. Peki ya değillerse? Sayfanın herhangi bir öğesini nasıl alabiliriz?

Bunun için ek arama yöntemleri bulunmaktadır.

## document.getElementById or just id

Bir öğenin id özelliği varsa, o id adından bir global değişken bulunur.

Bu değişkeni kullanarak, öğeye sayfanın neresinde olursa olsun hemen erişebiliriz.

```html run
<div id="*!*elem*/!*">
  <div id="*!*elem-content*/!*">Element</div>
</div>

<script>
  alert(elem); // DOM-element with id="elem"
  alert(window.elem); // accessing global variable like this also works

  // for elem-content things are a bit more complex
  // that has a dash inside, so it can't be a variable name
  alert(window['elem-content']); // ...but accessible using square brackets [...]
</script>
```

Bu davranış, spesifikasyonda açıklandığı gibi, temel olarak uyumluluk için desteklenmektedir. Tarayıcı, JS ve DOM'un ad alanlarını karıştırarak bize yardımcı olmaya çalışır. Çok basit komut dosyaları için iyidir, ancak isim çakışmaları olabilir. Ayrıca, JS'a baktığımızda ve HTML'i görüntülemediğimizde, değişkenin nereden geldiği açık değildir.

Eğer aynı isimle bir değişken tanımlarsak, öncelik alır:

```html run untrusted height=0
<div id="elem"></div>

<script>
  let elem = 5;

  alert(elem); // 5
</script>
```

Daha iyi bir alternatif, özel bir yöntem olan `document.getElementById(id)` kullanmaktır.

For instance:

```html run
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
*!*
  let elem = document.getElementById('elem');
*/!*

  elem.style.background = 'red';
</script>
```

Bu dökümantasyonda sık sık bir öğeye doğrudan referans olmak için `id` kullanacağız, ancak bu sadece işleri kısa tutmak içindir. Gerçek hayatta tercih edilen yöntem `document.getElementById` kullanmaktır.

```smart header="Sadece bir tane olabilir"
`id` benzersiz olmalıdır. Belgede verilen `id` ile sadece bir öğe olabilir.





Eğer aynı `id`'ye sahip birden fazla öğe varsa, ilgili yöntemlerin davranışı öngörülemeyebilir. Tarayıcı rastgele olarak herhangi birini döndürebilir. Bu nedenle lütfen kurala uyun ve `id`'yi benzersiz tutun.
```

```warn header="Only `document.getElementById`, not `anyNode.getElementById`"
The method `getElementById` that can be called only on `document` object. It looks for the given `id` in the whole document.
```

## querySelectorAll [#querySelectorAll]
Şimdiye kadar en çok yönlü yöntem olan `elem.querySelectorAll(css)`, belirtilen CSS seçicisine uyan `elem` içindeki tüm öğeleri döndürür.

Burada, son çocuk olan tüm `<li>` öğelerini arıyoruz:

```html run
<ul>
  <li>The</li>
  <li>test</li>
</ul>
<ul>
  <li>has</li>
  <li>passed</li>
</ul>
<script>
*!*
  let elements = document.querySelectorAll('ul > li:last-child');
*/!*

  for (let elem of elements) {
    alert(elem.innerHTML); // "test", "passed"
  }
</script>
```

This method is indeed powerful, because any CSS selector can be used.
Bu yöntem gerçekten güçlüdür, çünkü herhangi bir CSS seçici kullanılabilir.

```smart header="Sahte sınıfları da kullanabilir" 
CSS seçicideki `:hover` ve ":active" gibi sözde sınıflar da desteklenir. Örneğin, `document.querySelectorAll(':hover')`, işaretçinin üzerinde olduğu öğeleri içeren koleksiyonu döndürür (iç içe yerleştirme sırasında: en dıştaki `<html>` den en iç içe geçmişe).
```

## querySelector [#querySelector]

`elem.querySelector(css)` çağrısı, belirtilen CSS seçicisi için ilk öğeyi döndürür.

Başka bir deyişle, sonuç `elem.querySelectorAll(css)[0]` ile aynıdır, ancak ikincisi *tüm* öğeleri arar ve birini seçerken, `elem.querySelector` yalnızca birini arar. Böylece yazmak daha hızlı ve daha kısadır.

## matches

Önceki yöntemler DOM'u arıyordu.

[elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) hiçbir şey aramaz, yalnızca `elem` öğesinin verilen CSS seçiciyle eşleşip eşleşmediğini kontrol eder. `true` veya `false` döndürür. 

Yöntem, öğeler üzerinde yineleme yaptığımızda (dizide veya başka bir şeyde olduğu gibi) ve bizi ilgilendirenleri filtrelemeye çalışırken kullanışlı olur. 

Örneğin:


```html run
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // can be any collection instead of document.body.children
  for (let elem of document.body.children) {
*!*
    if (elem.matches('a[href$="zip"]')) {
*/!*
      alert("The archive reference: " + elem.href );
    }
  }
</script>
```

## closest

Bir öğenin *Ataları* şunlardır: ebeveyn, ebeveynin ebeveyni, ebeveyni vb. Atalar birlikte elementten tepeye ebeveyn zincirini oluşturur.

`elem.closest(css)` yöntemi, CSS seçiciyle eşleşen en yakın ataya bakar. `elem`in kendisi de aramaya dahil edilir.

Başka bir deyişle, `closest` yöntemi öğeden yukarı çıkar ve her bir ebeveyni kontrol eder. Seçiciyle eşleşirse, arama durur ve ata döndürülür.

Örneğin:

```html run
<h1>Contents</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Bölüm 1</li>
    <li class="chapter">Bölüm 1</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('h1')); // null (because h1 is not an ancestor)
</script>
```

## getElementsBy*

Düğümleri bir etikete, sınıfa vb. göre aramak için başka yöntemler de vardır.

Bugün, `querySelector` daha güçlü ve yazması daha kısa olduğundan, çoğunlukla tarih oldular.

Bu yüzden, onları eski betiklerde hala bulabilmeniz için burada esas olarak bütünlük için ele alıyoruz.

- `elem.getElementsByTagName(tag)` verilen etikete sahip öğeleri arar ve bunların koleksiyonunu döndürür. `tag` parametresi ayrıca "herhangi bir etiket" için bir yıldız `"*"` olabilir.
- `elem.getElementsByClassName(className)` verilen CSS sınıfına sahip öğeleri döndürür.
- `document.getElementsByName(name)`, belge genelinde verilen "name" özniteliğine sahip öğeleri döndürür. çok nadiren kullanılır.

Örneğin:
```js

// belgedeki tüm div'leri al
let divs = document.getElementsByTagName('div');
```

Tablonun içindeki tüm `input` etiketlerini bulalım:

```html run height=50
<table id="table">
  <tr>
    <td>Yaşınız:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked> 18'den az
      </label>
      <label>
        <input type="radio" name="age" value="mature"> 18'den 50'ye
      </label>
      <label>
        <input type="radio" name="age" value="senior"> 60'tan fazla
      </label>
    </td>
  </tr>
</table>

<script>
*!*
  let inputs = table.getElementsByTagName('input');
*/!*

  for (let input of inputs) {
    alert( input.value + ': ' + input.checked );
  }
</script>
```

```warn header="Don't forget the `\"s\"` letter!"
Acemi geliştiriciler bazen `"s"` harfini unuturlar. Yani, <code>getElement<b>s</b>ByTagName</code> yerine `getElementByTagName` çağırmaya çalışırlar.

`getElementById` içinde `"s"` harfi yoktur, çünkü tek bir öğe döndürür. Ancak `getElementsByTagName`, bir öğe koleksiyonu döndürür, yani içinde `"s"` vardır.
```
````warn header="Bir öğe değil, bir koleksiyon döndürür!"
Bir başka yaygın acemi hatası da şunu yazmaktır:

```js
// çalışmıyor 
Document.getElementsByTagName('input').value = 5;
```

Bu işe yaramaz, çünkü bir girdi *koleksiyonunu* alır ve içindeki öğeler yerine ona değer atar.

Koleksiyonu yinelemeli veya dizinine göre bir öğe almalı ve ardından şu şekilde atamalıyız:

```js
// should work (if there's an input)
document.getElementsByTagName('input')[0].value = 5;
```
````

`.article` öğeleri aranıyor:

```html run height=50
<form name="my-form">
  <div class="article">Article</div>
  <div class="long article">Long article</div>
</form>

<script>
  // ad özniteliğine göre bul
  let form = document.getElementsByName('my-form')[0];

  // form içinde sınıfa göre bul
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2, found two elements with class "article"
</script>
```

## Canlı koleksiyonlar

Tüm `"getElementsBy*"` yöntemleri bir *canlı* koleksiyon döndürür. Bu tür koleksiyonlar her zaman belgenin mevcut durumunu yansıtır ve değiştiğinde "auto-update" yapar.
Aşağıdaki örnekte iki betik vardır.

1. İlki, `<div>` koleksiyonuna bir başvuru oluşturur. Şu an itibariyle uzunluğu `1`. 
2. İkinci betik, tarayıcı bir `<div>` ile karşılaştıktan sonra çalışır, dolayısıyla uzunluğu `2` olur.


```html run
<div>First div</div>

<script>
  let divs = document.getElementsByTagName('div');
  alert(divs.length); // 1
</script>

<div>İkinci bölüm</div>

<script>
*!*
  alert(divs.length); // 2
*/!*
</script>
```

Buna karşılık, `querySelectorAll` bir *statik* koleksiyon döndürür. Sabit bir eleman dizisi gibi.

Bunun yerine kullanırsak, her iki betik de `1` çıktısı verir:


```html run
<div>Birinci div</div>

<script>
  let divs = document.querySelectorAll('div');
  alert(divs.length); // 1
</script>

<div>İkinci div</div>

<script>
*!*
  alert(divs.length); // 1
*/!*
</script>
```

Artık farkı rahatlıkla görebiliriz. Belgede yeni bir `div` göründükten sonra statik koleksiyon artmadı.

## Özet

DOM'da düğüm aramak için 6 ana yöntem vardır:

<table>
<thead>
<tr>
<td>Metod</td>
<td>Aramalar by...</td>
<td>Bir öğeyi arayabilir miyim?</td>
<td>Canlı?</td>
</tr>
</thead>
<tbody>
<tr>
<td><code>querySelector</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>querySelectorAll</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementById</code></td>
<td><code>id</code></td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementsByName</code></td>
<td><code>name</code></td>
<td>-</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByTagName</code></td>
<td>tag or <code>'*'</code></td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByClassName</code></td>
<td>class</td>
<td>✔</td>
<td>✔</td>
</tr>
</tbody>
</table>

Şimdiye kadar en çok kullanılanlar `querySelector` ve `querySelectorAll` dır, ancak `getElementBy*` ara sıra yardımcı olabilir veya eski betiklerde bulunabilir.
Bunun yanı sıra:


- `elem` öğesinin verilen CSS seçiciyle eşleşip eşleşmediğini kontrol etmek için `elem.matches(css)` var.
- Verilen CSS seçiciyle eşleşen en yakın ataya bakmak için `elem.closest(css)` var. "elem"in kendisi de kontrol edilir.

Çocuk-ebeveyn ilişkisini kontrol etmek için bazen yararlı olduğu için burada bir yöntemden daha bahsedelim: 
- `elemA.contains(elemB)`, `elemB`, `elemA` içindeyse (a descendant of `elemA`) veya `elemA==elemB` olduğunda true değerini döndürür.