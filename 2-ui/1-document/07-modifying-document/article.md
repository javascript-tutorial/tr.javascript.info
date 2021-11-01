# Modifying the document

<<<<<<< HEAD
DOM değişiklikleri "canlı" sayfalar oluşturmak için anahtardır.
=======
DOM modification is the key to creating "live" pages.
>>>>>>> 6989312841d843f2350803ab552d9082437be569

Burada, "anında" nasıl yeni öğeler yaratmayı ve var olan sayfa içeriğini değiştirmeyi göreceğiz.

<<<<<<< HEAD
İlk önce, basit bir örnek göreceğiz ve ondan sonra yöntemleri açıklacağız.

## Example: show a message

Başlangıç için,  sayfa üzerinde `alert`ten daha güzel görünen bir mesajın nasıl eklendiğini görelim.
=======
## Example: show a message

Let's demonstrate using an example. We'll add a message on the page that looks nicer than `alert`.
>>>>>>> 6989312841d843f2350803ab552d9082437be569

İşte nasıl görüneceği:

```html autorun height="80"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

*!*
<div class="alert">
  <strong>Hi there!</strong>You've read an important message.
</div>
*/!*
```

<<<<<<< HEAD
Bu bir HTML örneğidir. Şimdi aynı `div`i JavaScript ile oluşturalım (farzedelim ki, styles(strong kelimesine referans) hala HTML içinde veya bir dışsal CSS dosyasıdır).

## Creating an element


DOM düğümleri(nodes) oluşturmak icin iki yöntem vardır:
=======
That was the HTML example. Now let's create the same `div` with JavaScript (assuming that the styles are in the HTML/CSS already).

## Creating an element

To create DOM nodes, there are two methods:
>>>>>>> 6989312841d843f2350803ab552d9082437be569

`document.createElement(tag)`
: Verilen etiketle birlikte yeni bir *element düğümü(element node)* oluşturur:

    ```js
    let div = document.createElement('div');
    ```

`document.createTextNode(text)`
:  Verilen metinle yeni bir *metin düğümü(text node)* oluşturur:

    ```js
    let textNode = document.createTextNode('Here I am');
    ```

Most of the time we need to create element nodes, such as the `div` for the message.

### Creating the message

<<<<<<< HEAD
Bizim durumumuzda, verilen sınıflarla ve içindeki mesajla bir “div” yapmak istiyoruz:
=======
Creating the message div takes 3 steps:
>>>>>>> 6989312841d843f2350803ab552d9082437be569

```js
// 1. Create <div> element
let div = document.createElement('div');
<<<<<<< HEAD
div.className = "alert alert-success";
div.innerHTML = "<strong>Merhaba</strong> Onemli bir mesaj okudunuz.";
```

Bundan sonra, DOM elementimiz hazırdır. Şu anda, o sadece bir değişkendir ve onu göremeyiz. Bunun sebebi, o henüz sayfanın içine işlenmemiştir.

## Insertion methods

`Div`i göstermek için, onu `document` içinde bir yere eklememiz gerekir. Örneğin, `document.body` içinde.

Bunun için özel bir yöntem `appendChild` vardır: `document.body.appendChild(div)`.
=======

// 2. Set its class to "alert"
div.className = "alert";

// 3. Fill it with the content
div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";
```

We've created the element. But as of now it's only in a variable named `div`, not in the page yet. So we can't see it.

## Insertion methods

To make the `div` show up, we need to insert it somewhere into `document`. For instance, into `<body>` element, referenced by `document.body`.

There's a special method `append` for that: `document.body.append(div)`.
>>>>>>> 6989312841d843f2350803ab552d9082437be569

İste tam kod:

```html run height="80"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
<<<<<<< HEAD
  div.className = "alert alert-success";
  div.innerHTML = "<strong>Hi there</strong>You've read an important message.";
=======
  div.className = "alert";
  div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";
>>>>>>> 6989312841d843f2350803ab552d9082437be569

*!*
  document.body.append(div);
*/!*
</script>
```

<<<<<<< HEAD
Burada, bir üst öğeye(parent element) düğüm(node) eklemek için kullanılan yöntemlerin kısa bir listesi (kısaca `parentElem`):

`parentElem.appendChild(node)`
: `parentElem`in son öğesi(last child) olarak 'node'ı ekler.

    Asagidaki örnek, `<ol>`un sonuna yeni bir `<li>` ekler:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Hello, world!';

      list.appendChild(newLi);
    </script>
    ```

`parentElem.insertBefore(node, nextSibling)`
: `nextSibling`den önce `parentElem`e `node` ekler.

    Aşağıdakı kod, ikinci `<li>`den önce yeni bir liste ekler:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>
    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Hello, world!';

    *!*
      list.insertBefore(newLi, list.children[1]);
    */!*
    </script>
    ```
    `newLi`yi ilk oğe olarak eklemek icin, bunu şöyle yapabiliriz:

    ```js
    list.insertBefore(newLi, list.firstChild);
    ```

`parentElem.replaceChild(node, oldChild)`
: `parentElem`in alt öğeleri arasında `node` ile birlikte `oldChild`i yenisiyle yer degistirir.

Tüm bu yöntemler eklenen düğümü geri döndürür. Diğer anlatımla,`parentElem.appendChild(node)` `node`i geri döndürür.Ama genellikle geri döndürülen değer kullanılmaz, sadece yöntemi çalıştırırız.

Bu yöntemler "eskimiştir": eski zamanlardan beri varlar ve onlarla birçok eski scriptlerde karsılasabiliriz. Ne yazık ki, bunlar yeterince esnek değillerdir.

Örneğin, bir string olarak varsa *html* nasıl eklenir? Ya da, verilen bir düğüm, üst öğeye(parent) başvurmadan nasıl kaldırılır? Elbette ki, bu yapılabilinir, ama zarif bir şekilde değil.

Bu yüzden, tüm durumları kolayca idare etmek için iki ekleme yöntemi daha vardır.
=======
Here we called `append` on `document.body`, but we can call `append` method on any other element, to put another element into it. For instance, we can append something to `<div>` by calling `div.append(anotherElement)`.
>>>>>>> 6989312841d843f2350803ab552d9082437be569

Here are more insertion methods, they specify different places where to insert:

<<<<<<< HEAD
Bu yöntemler kümesi daha esnek eklemeler sunar.

- `node.append(...nodes or strings)` -- düğümün sonuna veya düğümlerin sonundaki stringlere `node`(düğüm) ekler,
- `node.prepend(...nodes or strings)` -- düğüm veya düğüm başındaki stringlere `node`(düğüm) ekler,
- `node.before(...nodes or strings)` –- `node`(düğüm)'den önce düğümler veya stringler ekler,
- `node.after(...nodes or strings)` –- `node`(düğüm)'den sonra düğümler veya stringlere ekler,
- `node.replaceWith(...nodes or strings)` –- verilen düğümler veya stringler, `node` ile  yer değistirir.

Bunlarin hepsi DOM düğümler ve/veya stringlerinin bir listesini kabul eder. Eğer bir string verilirse, metin düğümü(text node) olarak eklenir.

İşte bir listeye daha fazla madde(item) ve onun öncesinde/sonrasında metin eklemek için bu yöntemleri kullanmanın bir örneği:
=======
- `node.append(...nodes or strings)` -- append nodes or strings *at the end* of `node`,
- `node.prepend(...nodes or strings)` -- insert nodes or strings *at the beginning* of `node`,
- `node.before(...nodes or strings)` –- insert nodes or strings *before* `node`,
- `node.after(...nodes or strings)` –- insert nodes or strings *after* `node`,
- `node.replaceWith(...nodes or strings)` –- replaces `node` with the given nodes or strings.

Arguments of these methods are an arbitrary list of DOM nodes to insert, or text strings (that become text nodes automatically).

Let's see them in action.

Here's an example of using these methods to add items to a list and the text before/after it:
>>>>>>> 6989312841d843f2350803ab552d9082437be569

```html autorun 
<ol id="ol">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
  ol.before('before'); // insert string "before" before <ol>
  ol.after('after'); // insert string "after" after <ol>

  let liFirst = document.createElement('li');
  liFirst.innerHTML = 'prepend';
  ol.prepend(liFirst); // insert liFirst at the beginning of <ol>

  let liLast = document.createElement('li');
  liLast.innerHTML = 'append';
  ol.append(liLast); // insert liLast at the end of <ol>
</script>
```

<<<<<<< HEAD
İşte yöntemlerin ne yaptığına dair küçük bir resim:
=======
Here's a visual picture of what the methods do:
>>>>>>> 6989312841d843f2350803ab552d9082437be569

![](before-prepend-append-after.svg)

Öyleyse son liste şöyle olacak:

```html
before
<ol id="ol">
  <li>prepend</li>
  <li>0</li>
  <li>1</li>
  <li>2</li>
  <li>append</li>
</ol>
after
```

<<<<<<< HEAD
Bu yöntemler, tek bir çağrıda çoklu düğümler ve metin parçalarının listesi ekleyebilir.
=======
As said, these methods can insert multiple nodes and text pieces in a single call.
>>>>>>> 6989312841d843f2350803ab552d9082437be569

Örneğin, buraya bir string ve bir element eklenir:

```html run
<div id="div"></div>
<script>
  div.before('<p>Hello</p>', document.createElement('hr'));
</script>
```

<<<<<<< HEAD
Tüm metinler *metin olarak* eklenir.
=======
Please note: the text is inserted "as text", not "as HTML", with proper escaping of characters such as `<`, `>`.
>>>>>>> 6989312841d843f2350803ab552d9082437be569

Öyleyse son HTML:

```html run
*!*
&lt;p&gt;Hello&lt;/p&gt;
*/!*
<hr>
<div id="div"></div>
```

Diğer bir deyişle, stringler `elem.textContent`in yaptığı gibi güvenli bir şekilde eklenir. 

Böylece, bu yöntemler sadece DOM düğümleri veya metin parçaları eklemek için kullanılabilinir. 

<<<<<<< HEAD
Ama HTML'yi "html olarak", eklemek istersek, tüm etiketler(tags) ve elementlerle `elem.innerHTML` gibi çalışıyorsa?
=======
But what if we'd like to insert an HTML string "as html", with all tags and stuff working, in the same manner as `elem.innerHTML` does it?
>>>>>>> 6989312841d843f2350803ab552d9082437be569

## insertAdjacentHTML/Text/Element

<<<<<<< HEAD
Başka, oldukça çok yönlü bir yöntem var: `elem.insertAdjacentHTML(where, html)`.
=======
For that we can use another, pretty versatile method: `elem.insertAdjacentHTML(where, html)`.
>>>>>>> 6989312841d843f2350803ab552d9082437be569

İlk parametre, "elem" e göre nereye ekleneceğini belirleyen bir kod kelimesidir. Aşağıdakilerden biri olmalıdır: 

- `"beforebegin"` -- `elem`den hemen önce, `html` ekler,
- `"afterbegin"` -- başında `elem`e `html` ekler,
- `"beforeend"` -- sonunda `elem`e `html`" ekler, 
- `"afterend"` -- `elem`den hemen sonra, `html` ekler.

İkinci parametre "HTML olarak" eklenmiş bir HTML dizisi(string)dir, .

Örneğin:

```html run
<div id="div"></div>
<script>
  div.insertAdjacentHTML('beforebegin', '<p>Hello</p>');
  div.insertAdjacentHTML('afterend', '<p>Bye</p>');
</script>
```

...Şuna yönlendirir:

```html run
<p>Hello</p>
<div id="div"></div>
<p>Bye</p>
```

<<<<<<< HEAD
Bu şekilde sayfamıza isteğe bağlı bir HTML ekleyebiliriz.
=======
That's how we can append arbitrary HTML to the page.
>>>>>>> 6989312841d843f2350803ab552d9082437be569

İşte ekleme türevlerinin resmi:

![](insert-adjacent.svg)

Bu ve önceki resim arasındaki benzerlikleri kolayca fark edebiliriz. Ekleme noktaları aslında aynıdır, ancak bu yöntem HTML ekler.

Yöntemin iki kardeşi vardır:

- `elem.insertAdjacentText(where, text)` -- ayn sözdizimi(syntax), ama bir "metin" dizesi HTML yerine "metin olarak" eklenir,
- `elem.insertAdjacentElement(where, elem)` -- ayni sözdizimi(syntax), ama bir oge ekler,

Esas olarak sözdizimini(syntax) "düzgün" yapmak için vardırlar. Uygulamada, çoğu zaman yalnızca "insertAdjacentHTML" kullanılır. Çünkü öğeler ve metin için `append/prepend/before/after` yöntemlerimiz var -- Onlari yazmak daha kısadır ve düğüm/metin parçası ekleyebilirler. 

İşte size bir mesaj göstermenin alternatif bir çeşidi: 

```html run
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  document.body.insertAdjacentHTML("afterbegin", `<div class="alert">
    <strong>Hi there!</strong> You've read an important message.
  </div>`);
</script>
```

## Node removal

To remove a node, there's a method `node.remove()`.

Let's make our message disappear after a second:

```html run untrusted
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

  document.body.append(div);
*!*
  setTimeout(() => div.remove(), 1000);
*/!*
</script>
```

Please note: if we want to *move* an element to another place -- there's no need to remove it from the old one.

**All insertion methods automatically remove the node from the old place.**

For instance, let's swap elements:

```html run height=50
<div id="first">First</div>
<div id="second">Second</div>
<script>
  // no need to call remove
  second.after(first); // take #second and after it insert #first
</script>
```

## Cloning nodes: cloneNode

Benzer bir mesaj daha nasıl eklenir?

Bir işlev(function) yapabilir ve kodu oraya koyabiliriz. Ama alternatif yol, var olan `div`i *klonlamak* ve içindeki metni degistirmek olacaktır (eğer gerekliyse).

Bazen büyük bir unsurumuz olduğunda, bu daha hızlı ve daha basit olabilir.

-Çağrı `elem.cloneNode(true)` öğenin "derin" bir klonunu oluşturur -- tüm nitelikler ve alt(child) elementler ile.. Eğer `elem.cloneNode(false)`i çağırırsak, daha sonra klon alt(child) elementler olmadan yapılır.

Mesaji kopyalamanın bir örneği:

```html run height="120"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<div class="alert" id="div">
  <strong>Hi there!</strong>You've read an important message.
</div>

<script>
*!*
  let div2 = div.cloneNode(true); // mesaji kopyala
  div2.querySelector('strong').innerHTML = 'Bye there!'; // kopyayı değiştir

  div.after(div2); // varolan div'den sonra kopyayı göster
*/!*
</script>
```

## DocumentFragment [#document-fragment]

`DocumentFragment` düğüm listelerini geçirmek için bir sarıcı olarak görevi olan özel bir DOM düğümüdür.

Buna diğer düğümler ekleyebiliriz, ama bunu herhangi bir yere yerleştirdiğimizde, daha sonra içeriği bunun yerine eklenir.

Örneğin, aşağıdaki `getListContent` `<li>` öğeleriyle bir parça oluşturur, ki daha sonra `<ul>`içine eklenir:

```html run
<ul id="ul"></ul>

<script>
function getListContent() {
  let fragment = new DocumentFragment();

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    fragment.append(li);
  }

  return fragment;
}

*!*
ul.append(getListContent()); // (*)
*/!*
</script>
```

Lütfen not edin, sondaki satıra `(*)`, `DocumentFragment`i ekleriz, ama o "içine karışır", sonuçta ortaya çıkan yapı:

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

'DocumentFragment' pek nadir açıkça kullanılır. Bunun yerine bir sıra düğümü geri döndürebiliyorsak, neden özel bir düğüme eklemeliyiz? Yeniden yazılmış örnek:

```html run
<ul id="ul"></ul>

<script>
function getListContent() {
  let result = [];

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    result.push(li);
  }

  return result;
}

*!*
ul.append(...getListContent()); // append + "..." operator = friends!
*/!*
</script>
```

Temel olarak `DocumentFragment` ifadesinden bahsediyoruz. çünkü bunun üzerinde [template](info:template-element) element, gibi bazı kavramlar vardır, ki daha sonra bunlari ele alacağız. 

## Old-school insert/remove methods

[old]

<<<<<<< HEAD
Düğümleri kaldırmak için, aşağıdaki yöntemler vardır:
=======
There are also "old school" DOM manipulation methods, existing for historical reasons.
>>>>>>> 6989312841d843f2350803ab552d9082437be569

These methods come from really ancient times. Nowadays, there's no reason to use them, as modern methods, such as `append`, `prepend`, `before`, `after`, `remove`, `replaceWith`, are more flexible.

<<<<<<< HEAD
`parentElem.removeChild(node)`
: `parentElem`den `node`ı kaldırır (Farzedelim ki, o bir alt öğedir(child)).

`node.remove()`
: `node`ı kendi yerinden kaldırır.

Kolayca görebiliriz ki, ikinci yöntem çok daha kısadır. İlki tarihsel nedenlerden dolayı vardır.

````Akıllıca
Eğer biz bir öğeyi baska bir yere *taşımak* istiyorsak --- Onu eskisinden kaldırmaya gerek yok.

**Tüm ekleme yöntemleri düğümü otomatik olarak eski yerinden kaldırır.**

 Örneğin, elementleri değiştirelim:

```html run height=50
<div id="first">First</div>
<div id="second">Second</div>
<script>
  // remove'i cağırmaya gerek yok
  second.after(first); // #second'i al ve ondan sonra - #first'i ekle 
</script>
```
````

Mesajımız bir saniye sonra ortadan kaybolsun:
=======
The only reason we list these methods here is that you can find them in many old scripts:

`parentElem.appendChild(node)`
: Appends `node` as the last child of `parentElem`.

    The following example adds a new `<li>` to the end of `<ol>`:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Hello, world!';

      list.appendChild(newLi);
    </script>
    ```

`parentElem.insertBefore(node, nextSibling)`
: Inserts `node` before `nextSibling` into `parentElem`.

    The following code inserts a new list item before the second `<li>`:
>>>>>>> 6989312841d843f2350803ab552d9082437be569

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>
    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Hello, world!';

    *!*
      list.insertBefore(newLi, list.children[1]);
    */!*
    </script>
    ```
    To insert `newLi` as the first element, we can do it like this:

    ```js
    list.insertBefore(newLi, list.firstChild);
    ```

`parentElem.replaceChild(node, oldChild)`
: Replaces `oldChild` with `node` among children of `parentElem`.

`parentElem.removeChild(node)`
: Removes `node` from `parentElem` (assuming `node` is its child).

    The following example removes first `<li>` from `<ol>`:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let li = list.firstElementChild;
      list.removeChild(li);
    </script>
    ```

All these methods return the inserted/removed node. In other words, `parentElem.appendChild(node)` returns `node`. But usually the returned value is not used, we just run the method.

## A word about "document.write"

Bir web sayfasına bir şey eklemenin çok eski bir yöntemi daha var: `document.write`.

Sözdizimi(Syntax):

```html run
<p>Somewhere in the page...</p>
*!*
<script>
  document.write('<b>Hello from JS</b>');
</script>
*/!*
<p>The end</p>
```

`document.write(html)` çağrısı "burada ve şimdi" sayfasına 'html' yazar. `html` string dinamik olarak oluşturulmus olabilir, bu nedenle esnektir. Tam teşekküllü bir web sayfası oluşturmak ve yazmak için JavaScript kullanabiliriz. 

Yöntem DOM'un, standartların olmadığı zamanlardan geliyor... Gerçekten eski zamanlar. O hala yaşıyor, çünkü onu kullanan scriptler vardır.

Modern scriptlerde, onu pek nadir görebiliriz, çünkü aşağıdaki önemli sınırlama nedeniyle:

**"document.write" çağrısı yalnızca sayfa yüklenirken yapılır** 

Eğer onu daha sonra çağırırsak, var olan belge içeriği silinmiş olur.

Örneğin:

```html run
<p>Bir saniye sonra bu sayfanın içeriği değiştirilmiş olacak...</p>
*!*
<script>
  // document.write after 1 second
  // that's after the page loaded, so it erases the existing content
  setTimeout(() => document.write('<b>...By this.</b>'), 1000);
</script>
*/!*
```

Öyleyse, yukarıda bahsettiğimiz diğer DOM yöntemlerinin aksine, "yüklendikten sonra" aşamasında kullanılamaz olur.

<<<<<<< HEAD
Bu olumsuz tarafıydı.

Teknik olarak, internet tarayıcı gelen HTML'yi okurken, ("parsing/ayrıştırma") `document.write` çağrılır ve bir şey yazar, tarayıcı HTML metninde ilk başta olduğu gibi onu işler.

Ki bize olumlu tarafı verir -- o çok hızlı çalışır, çünkü *DOM değişikligi yoktur*. DOM henüz oluşturulmamışken, onu doğrudan sayfadaki metne yazar, ve  internet tarayıcı oluşum-süresinde onu DOM'a yerleştirir. 
=======
That's the downside.

There's an upside also. Technically, when `document.write` is called while the browser is reading ("parsing") incoming HTML, and it writes something, the browser consumes it just as if it were initially there, in the HTML text.

So it works blazingly fast, because there's *no DOM modification* involved. It writes directly into the page text, while the DOM is not yet built.
>>>>>>> 6989312841d843f2350803ab552d9082437be569

Öyleyse, HTML'ye dinamik olarak çok fazla metin eklememiz gerekirse ve biz sayfa yükleme aşamasındayız ve hız önemlidir, bu yardım edebilir. Ama uygulamada bu gereksinimler pek nadir bir araya gelir. Ve genellikle biz bu yöntemi sadece eski olan scriptlerde görebiliriz.

## Summary

<<<<<<< HEAD
Yeni düğümler yaratma yöntemleri:

- `document.createElement(tag)` -- verilen etiketle(tag) bir element yaratır,
- `document.createTextNode(value)` -- bir metin düğümü(text node) yaratır (pek nadir kullanılır),
- `elem.cloneNode(deep)` -- elementi kopyalar, eğer `deep==true` tüm alt içerikleriyle ise.  

-Düğümlerin yerleştirilmesi ve çıkarılması:

-- En üst ogeden(parent):
  - `parent.appendChild(node)`
  - `parent.insertBefore(node, nextSibling)`
  - `parent.removeChild(node)`
  - `parent.replaceChild(newElem, node)`

  Tüm bu yöntemler `node`ı geri dönderir.

- Düğümler ve komut dosyalarinin verilmis bir listesi:
  - `node.append(...nodes or strings)` -- sonunda 'düğüme' ekler, 
  - `node.prepend(...nodes or strings)` -- başında "düğüme" ekler,,
  - `node.before(...nodes or strings)` –- düğümden hemen önce ekler, 
  - `node.after(...nodes or strings)` –- düğümden hemen sonra ekler,
  - `node.replaceWith(...nodes or strings)` –- "düğümü" değiştir.
  - `node.remove()` –- "düğümü" kaldırır.

  Metin stringler "metin olarak" eklenir.

- Bir parca verilen HTML: `elem.insertAdjacentHTML(where, html)`, nereye bağlı olduğuna dair ekleme yapar:
  - `"beforebegin"` -- `elem`den hemen önce `html` ekler,
  - `"afterbegin"` -- başinda `elem`e `html` ekler,
  - `"beforeend"` -- sonunda `elem`e `html` ekler,
  - `"afterend"` -- `elem`den hemen sonra `html` ekler.

  Ayrıca benzer yöntemler `elem.insertAdjacentText` ve `elem.insertAdjacentElement` vardır, onlar metin stringler ve elementler ekler, ama pek nadir kullanılır. 

- Yükleme tamamlanmadan önce HTML'yi sayfaya eklemek için:
  - `document.write(html)`

  Sayfa yüklendikten sonra böyle bir çağrı belgeyi siler. Çoğunlukla eski scriptlerde  görülür
=======
- Methods to create new nodes:
    - `document.createElement(tag)` -- creates an element with the given tag,
    - `document.createTextNode(value)` -- creates a text node (rarely used),
    - `elem.cloneNode(deep)` -- clones the element, if `deep==true` then with all descendants.  

- Insertion and removal:
    - `node.append(...nodes or strings)` -- insert into `node`, at the end,
    - `node.prepend(...nodes or strings)` -- insert into `node`, at the beginning,
    - `node.before(...nodes or strings)` –- insert right before `node`,
    - `node.after(...nodes or strings)` –- insert right after `node`,
    - `node.replaceWith(...nodes or strings)` –- replace `node`.
    - `node.remove()` –- remove the `node`.

    Text strings are inserted "as text".

- There are also "old school" methods:
    - `parent.appendChild(node)`
    - `parent.insertBefore(node, nextSibling)`
    - `parent.removeChild(node)`
    - `parent.replaceChild(newElem, node)`

    All these methods return `node`.

- Given some HTML in `html`, `elem.insertAdjacentHTML(where, html)` inserts it depending on the value of `where`:
    - `"beforebegin"` -- insert `html` right before `elem`,
    - `"afterbegin"` -- insert `html` into `elem`, at the beginning,
    - `"beforeend"` -- insert `html` into `elem`, at the end,
    - `"afterend"` -- insert `html` right after `elem`.

    Also there are similar methods, `elem.insertAdjacentText` and `elem.insertAdjacentElement`, that insert text strings and elements, but they are rarely used.

- To append HTML to the page before it has finished loading:
    - `document.write(html)`

    After the page is loaded such a call erases the document. Mostly seen in old scripts.
>>>>>>> 6989312841d843f2350803ab552d9082437be569
