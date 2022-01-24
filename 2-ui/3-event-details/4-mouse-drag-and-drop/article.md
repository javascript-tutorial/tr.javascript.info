# Fare olaylarıyla sürükle ve bırak

<<<<<<< HEAD
Sürükle ve bırak (Drag'n'Drop) harika bir arayüz çözümüdür. Bir şeyi alıp sürükleyip bırakmak; kopyalamadan ve taşımadan (dosya yöneticilerinde olduğu gibi) sipariş vermeye (ürünleri sürükleyip sepete bırakma) kadar birçok şeyi yapmanın açık ve basit bir yoludur.

Modern HTML standardı da sürükle ve bırak olayına izin verir. [ilgili kısım](https://html.spec.whatwg.org/multipage/interaction.html#dnd).

Bunlar basit görevleri kolayca çözmeyi sağlarlar ve ayrıca tarayıcı dışından dosyaların tarayıcıya sürüklenip bırakılmasını sağlarlar. Böylece işletim sistemi dosya yöneticisinden bir dosya alıp tarayıcı penceresine bırakabiliriz. Böylece JavaScript, içeriğine erişim kazanır.

Ancak bu yerel HTML standardındaki sürükle bırak mekanizmasında sınırlamalar vardır. Örneğin, sürüklemeyi belirli bir alanla sınırlayamayız. Ayrıca, bunu yalnızca "yatay" veya "dikey" olarak yapamayız. Bunun gibi bu API kullanılarak uygulanamayan başka sürükle bırak görevleri de vardır.

Bu yüzden burada, fare olaylarını kullanarak Sürükle ve Bırak özelliğini nasıl uygulayacağımızı göreceğiz. Diğerleri gibi bu da zor değil.
=======
Drag'n'Drop is a great interface solution. Taking something and dragging and dropping it is a clear and simple way to do many things, from copying and moving documents (as in file managers) to ordering (dropping items into a cart).

In the modern HTML standard there's a [section about Drag and Drop](https://html.spec.whatwg.org/multipage/interaction.html#dnd) with special events such as `dragstart`, `dragend`, and so on.

These events allow us to support special kinds of drag'n'drop, such as handling dragging a file from OS file-manager and dropping it into the browser window. Then JavaScript can access the contents of such files.

But native Drag Events also have limitations. For instance, we can't prevent dragging from a certain area. Also we can't make the dragging "horizontal" or "vertical" only. And there are many other drag'n'drop tasks that can't be done using them. Also, mobile device support for such events is very weak.

So here we'll see how to implement Drag'n'Drop using mouse events.
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

## Sürükle bırak algoritması

Temel sürükle ve bırak algoritması şuna benzer:

<<<<<<< HEAD
1. Sürüklenebilir ögenin üzerinde `mousedown` olayını yakalayın.
2. Öğeyi taşımak için hazırlayın (belki bir kopyasını oluşturabilirsiniz).
3. Daha sonra `mousemove` olayı sırasında `left/top` ve `position:absolute` değerlerini değiştirerek ögeyi hareket ettirin.
4.  `mouseup` olayı (fareyi bıraktığımız zaman) -- Sürükle bırak olayı bittiği zaman yapılacak aksiyonları yapın.

Bunlar temel bilgilerdir. Örneğin, üzerine gelindiğinde bırakılabilir (bırakmaya müsait) öğeleri ışıklandırma gibi bu algoritmayı genişletebiliriz.

İşte bir topu sürükleyip bırakmanın uygulaması:

```js
ball.onmousedown = function(event) { // (1) start the process

  // (2) topu harekete hazırla: z indexi ile en üste getir, pozisyonu absolute yap
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  
  // topu dogrudan body e bagla, ebeveyn elementlerden ayır
  document.body.append(ball);  

  // topu (pageX, pageY) koordınatlarında ortala
=======
1. On `mousedown` - prepare the element for moving, if needed (maybe create a clone of it, add a class to it or whatever).
2. Then on `mousemove` move it by changing `left/top` with `position:absolute`.
3. On `mouseup` - perform all actions related to finishing the drag'n'drop.

These are the basics. Later we'll see how to other features, such as highlighting current underlying elements while we drag over them.

Here's the implementation of dragging a ball:

```js
ball.onmousedown = function(event) { 
  // (1) prepare to moving: make absolute and on top by z-index
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;

  // move it out of any current parents directly into body
  // to make it positioned relative to the body
  document.body.append(ball);  

  // centers the ball at (pageX, pageY) coordinates
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }
  
  // pozısyonu absolute olan topu fare imlecinin altına koy
  moveAt(event.pageX, event.pageY);

  // move our absolutely positioned ball under the pointer
  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

<<<<<<< HEAD
  // (3) mousemove olayında topu hareket ettir
  document.addEventListener('mousemove', onMouseMove);

  // (4) topu bırak, gereksiz işleyicileri kaldır
=======
  // (2) move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // (3) drop the ball, remove unneeded handlers
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};
```

Kodu çalıştırırsak tuhaf bir şey fark edebiliriz. Sürükleyip bırakmanın başlangıcında, top "klonlanır" ve "klonunu" sürüklemeye başlarız.

```online
İşte bir örnek:

[iframe src="ball" height=230]

<<<<<<< HEAD
Fareyi sürükleyip bırakmaya çalıştığınızda garip davranışı göreceksiniz.
```

Bunun nedeni, tarayıcının resimler için otomatik olarak çalışan ve bizimkilerle çakışan kendi sürükle ve bırak özelliğine ve diğer bazı öğelere sahip olmasıdır.
=======
Try to drag'n'drop with the mouse and you'll see such behavior.
```

That's because the browser has its own drag'n'drop support for images and some other elements. It runs automatically and conflicts with ours.
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

Bunu deve dışarı bırakmak için:

```js
ball.ondragstart = function() {
  return false;
};
```

Şimdi her şey normale dönecektir.

```online
In action:

[iframe src="ball2" height=230]
```

Bir diğer önemli husus - "top" üzerinde değil, "belge" üzerinde `mousemove` yani fare hareketini izliyoruz. İlk bakışta, farenin her zaman topun üstündeymiş gibi olacagını düşünebiliriz ve bu yüzden topun üzerinden de dinleyebiliriz diye düşünebiliriz ( ball.eventLıstener ile).

<<<<<<< HEAD
Ancak hatırlarsak, `mousemove` sık sık tetiklenmesine rağmen, aynı zamanda bazı pikselleri atlayabilir. Bu yüzden ani bir hareketin ardından imleç topun üzerinden atlayarak pencerenin başka bir yerine gidebilir ve hatta pencerenin dışına çıkabilir.
=======
But as we remember, `mousemove` triggers often, but not for every pixel. So after swift move the pointer can jump from the ball somewhere in the middle of document (or even outside of the window).
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

Bu yüzden yakalamak için `document` i dinlemeliyiz. (document.eventListener ile)

## Doğru konumlama

<<<<<<< HEAD
Yukarıdaki örneklerde top her zaman imlecin altında ortalanır:
=======
In the examples above the ball is always moved so, that it's center is under the pointer:
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

```js
ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
```

<<<<<<< HEAD
Bu durum kötü değil ama bir yan etkisi var. Sürükle ve bırak işlemini başlatmak için, topun herhangi bir yerinde fareyi `mousedown` olayını dinleyebiliriz. Ancak bunu kenarda yaparsanız, top aniden ortalanmak için "zıplar".

İmlece göre öğenin ilk kaymasını tutarsak daha iyi olur.
=======
Not bad, but there's a side-effect. To initiate the drag'n'drop, we can `mousedown` anywhere on the ball. But if "take" it from its edge, then the ball suddenly "jumps" to become centered under the mouse pointer.
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

Örneğin, topun kenarından sürüklemeye başlarsak, sürüklerken imleç kenarın üzerinde kalmalıdır.

<<<<<<< HEAD
![](ball_shift.svg)

Algoritmamızı güncelleyelim:

1. Kullanıcı topu fare ile tuttuğunda (`mousedown`) -- `shiftX/shiftY` değişkenlerini kullanarak, imleç ile topun üst sol köşesi arasındaki mesafeyi bulabiliriz. Sürüklerken bu mesafeyi arada tutmamız gerekir.
=======
For instance, if we start dragging by the edge of the ball, then the pointer should remain over the edge while dragging.

![](ball_shift.svg)

Let's update our algorithm:

1. When a visitor presses the button (`mousedown`) - remember the distance from the pointer to the left-upper corner of the ball in variables `shiftX/shiftY`. We'll keep that distance while dragging.
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

    Bu vardiyaları elde etmek için koordinatları çıkarabiliriz:

    ```js
    // onmousedown
    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;
    ```

<<<<<<< HEAD
   JavaScript'te belgeye bağlı koordinatları elde etmenin bir yöntemi olmadığını lütfen unutmayın, bu nedenle burada pencereye göre koordinatları kullanıyoruz.

2. Sonra sürüklerken, topu imlece göre aynı vardiyaya yerleştiririz, örneğin:
=======
2. Then while dragging we position the ball on the same shift relative to the pointer, like this:
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

    ```js
    // onmousemove
    // ball has position:absolute
    ball.style.left = event.pageX - *!*shiftX*/!* + 'px';
    ball.style.top = event.pageY - *!*shiftY*/!* + 'px';
    ```

Daha iyi bir konumlandırmaya sahip son kod:

```js
ball.onmousedown = function(event) {

*!*
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;
*/!*

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - *!*shiftX*/!* + 'px';
    ball.style.top = pageY - *!*shiftY*/!* + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // drop the ball, remove unneeded handlers
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};

ball.ondragstart = function() {
  return false;
};
```

```online
In action (inside `<iframe>`):

[iframe src="ball3" height=230]
```

<<<<<<< HEAD
Topu sağ alt köşesinden sürüklediğimizde fark özellikle belirgindir. Önceki örnekte top, imlecin altına zıplıyordu. Şimdi, imleci mevcut konumundan akıcı bir şekilde takip ediyor.

## Sürüklediğimiz itemi bırakacağımız yerleri tespit etme

Önceki örneklerde, top "herhangi bir yere" bırakılabilirdi. Gerçek hayatta genellikle bir elementi alıp diğerine bırakırız. Örneğin, bir klasöre bir dosya veya bir item çöp tenekesine bırakılır.

Özet olarak, "sürüklenebilir" bir öğe alıp "bırakılabilir" öğenin üzerine bırakıyoruz.

İtemi bırakacağımız yeri bilmek ve tercihen bırakacagımız yeri ışıklandırmak için sürükle-bırak işleminin sonunda bırakılabilir hedefin yerini bilmemiz gerekir.
=======
The difference is especially noticeable if we drag the ball by its right-bottom corner. In the previous example the ball "jumps" under the pointer. Now it fluently follows the pointer from the current position.

## Potential drop targets (droppables)

In previous examples the ball could be dropped just "anywhere" to stay. In real-life we usually take one element and drop it onto another. For instance, a "file" into a "folder" or something else.

Speaking abstract, we take a "draggable" element and drop it onto "droppable" element.

We need to know:
- where the element was dropped at the end of Drag'n'Drop -- to do the corresponding action,
- and, preferably, know the droppable we're dragging over, to highlight it.
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

Çözüm biraz ilginç ve biraz aldatıcı, bu yüzden burada ele alalım.

<<<<<<< HEAD
İlk akla gelen nedir? Muhtemelen olası hedeflerde `onmouseover/mouseup` olayını dinlemek ve eğer imleç üstlerinden geçerse bunu belirlemek.
=======
What may be the first idea? Probably to set `mouseover/mouseup` handlers on potential droppables?
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

Ancak bu işe yaramayacak.

Problem şu ki, biz elementi alıp sürüklerken, bu element her zaman diğerlerinin üstünde (z-index'ten ötürü) ve fare olayları sadece üstteki element üzerinde olur, alttakileri görmez.

<<<<<<< HEAD
Örneğin, aşağıda mavinin üzerinde kırmızı olmak üzere iki `<div>` ögesi var. Mavi elementin üzerinde bir fare olayı yakalamak imkansız çünkü üstünde kırmızı element var.
=======
For instance, below are two `<div>` elements, red one on top of the blue one (fully covers). There's no way to catch an event on the blue one, because the red is on top:
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

```html run autorun height=60
<style>
  div {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
  }
</style>
<div style="background:blue" onmouseover="alert('asla çalışmayacak')"></div>
<div style="background:red" onmouseover="alert('kırmızının üzerinde!')"></div>
```

<<<<<<< HEAD
Aynı durum sürüklediğimiz element için de geçerli. Top her zaman diğer elementlerin üzerinde olduğu için, fare olayı onun üzerinde gerçekleşir. Örneğin bırakacagımız noktada da fare olayı dinlemek istersek, işlev çalışmayacaktır.
=======
The same with a draggable element. The ball is always on top over other elements, so events happen on it. Whatever handlers we set on lower elements, they won't work.
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

Bu nedenle, olay dinleyicileri potansiyel hedeflere yerleştirme fikri pratikte işe yaramaz.

O zaman ne yapmalı?

<<<<<<< HEAD
Burada `document.elementFromPoint(clientX, clientY)` isimli bir method var. Pencereye göre koordinatlarda en çok içeri geçmiş öğeyi verir (veya koordinatlar pencerenin dışındaysa "null" ya da boş).

Böylece bu methodu kullanarak, sürüklediğimiz ögeyi bırakacagımız noktayı belirleyebiliriz.

```js
// Fare olayı dinleyicisi
ball.hidden = true; // (*)
=======
There's a method called `document.elementFromPoint(clientX, clientY)`. It returns the most nested element on given window-relative coordinates (or `null` if given coordinates are out of the window).

We can use it in any of our mouse event handlers to detect the potential droppable under the pointer, like this:

```js
// in a mouse event handler
ball.hidden = true; // (*) hide the element that we drag

>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b
let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
// elemBelow is the element below the ball, may be droppable

ball.hidden = false;
<<<<<<< HEAD
// elemBelow topun da aşağısındaki elementi bulup koordinatlarını saklar.
```

Not: bu z çağırmadan önce topu saklamamız gerekir `(*)`. Yoksa muhtemelen bu koordinatlar topun koordinatları olur, çünkü imlecin göreceği ilk element olacaktır: `elemBelow=ball`.

Bu kodu istediğimiz zaman diğer elementlerin "üzerinden geçip geçmediğimizi" kontrol etmek için kullanabiliriz ve gerçekleştiğinde sürüklediğimiz elementi buraya bırakabileceğımız anlamına gelir.
=======
```

Please note: we need to hide the ball before the call `(*)`. Otherwise we'll usually have a ball on these coordinates, as it's the top element under the pointer: `elemBelow=ball`. So we hide it and immediately show again.

We can use that code to check what element we're "flying over" at any time. And handle the drop when it happens.
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

"Bırakılabilir" öğeleri bulmak için genişletilmiş bir `onMouseMove` kodu:

```js
<<<<<<< HEAD
let currentDroppable = null; // potansiyel bırakacağımız yer
=======
// potential droppable that we're flying over right now
let currentDroppable = null;
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);

  ball.hidden = true;
  let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  ball.hidden = false;

<<<<<<< HEAD
  // mousemove olayları pencerenin dışında tetiklenebilir (top ekranın dışına sürüklendiğinde)
  // clientX / clientY pencerenin dışındaysa, elementfromPoint null (boş) döndürür
=======
  // mousemove events may trigger out of the window (when the ball is dragged off-screen)
  // if clientX/clientY are out of the window, then elementFromPoint returns null
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b
  if (!elemBelow) return;

  // potansiyel bırakılabilir alanlar "bırakılabilir" sınıfıyla etiketlenir (başka bir isim verebilirsiniz)
  let droppableBelow = elemBelow.closest('.droppable');

<<<<<<< HEAD
  if (currentDroppable != droppableBelow) { // eğer bir değişiklik varsa
    // not: iki değer de boş olabilir
    //   currentDroppable=null eğer bırakabileceğimiz bir noktadan geçmediysek (örneğin boş bir alandan geçtiysek) 
    //   droppableBelow=null şu an bu olay sırasında bırakabileceğimiz alanda değilsek
=======
  if (currentDroppable != droppableBelow) {
    // we're flying in or out...
    // note: both values can be null
    //   currentDroppable=null if we were not over a droppable before this event (e.g over an empty space)
    //   droppableBelow=null if we're not over a droppable now, during this event
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

    if (currentDroppable) {
      // bırakabileceğimiz alandan gelip geçme mantığı (ışıklandırmayı kaldır)
      leaveDroppable(currentDroppable);
    }
    currentDroppable = droppableBelow;
    if (currentDroppable) {
      // bırakabileceğimiz alana gitme mantığı
      enterDroppable(currentDroppable);
    }
  }
}
```

<<<<<<< HEAD
Aşağıdaki örnekte, top futbol kalesinin üzerinden sürüklendiğinde, kale ışıklandırılmıştır.

[codetabs height=250 src="ball4"]

Artık tüm süreç boyunca `currentDroppable` değişkeninde mevcut olan "bırakacağımız noktanın hedefi" var ve onu ışıklandırmak veya başka şeyler için kullanabiliriz.
=======
In the example below when the ball is dragged over the soccer goal, the goal is highlighted.

[codetabs height=250 src="ball4"]

Now we have the current "drop target", that we're flying over, in the variable `currentDroppable` during the whole process and can use it to highlight or any other stuff.
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

## Özet

<<<<<<< HEAD
Basit bir `Drag'n'Drop` sürükle bırak algoritmasını inceledik.
=======
We considered a basic Drag'n'Drop algorithm.
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

Anahtar nokatalar:

<<<<<<< HEAD
1. Olay sırası: `ball.mousedown` -> `document.mousemove` -> `ball.mouseup` (local `ondragstart` ı iptal et).
2. Sürükleme başladığında -- Fare imleci ile element arasındaki başlangıç kaymasını hesapla: `shiftX/shiftY` ve bu mesafeyi sürükleme sırasında da koru.
3. Sürüklediğimiz elementi bırakabileceğimiz noktaları belirle `document.elementFromPoint`.
=======
1. Events flow: `ball.mousedown` -> `document.mousemove` -> `ball.mouseup` (don't forget to cancel native `ondragstart`).
2. At the drag start -- remember the initial shift of the pointer relative to the element: `shiftX/shiftY` and keep it during the dragging.
3. Detect droppable elements under the pointer using `document.elementFromPoint`.
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

Bu temele çok şey katabiliriz.

<<<<<<< HEAD
- `mouseup` olayıyla elementi bırakışı sonlandırabiliriz; veriyi değiştirebiliriz, ögeleri yerinden oynatabiliriz.
- Üstünden geçtiğimiz elementleri ışıklandırabiliriz.
- Sürüklemeyi belli bir yönde ve belli bir alanda sınırlandırabiliriz.
-  `mousedown/up` için olay delegasyonu kullanabiliriz. "Event.target" öğesini kontrol eden geniş alanlı bir olay işleyicisi, yüzlerce öğe için sürükle bırak işlevini yönetebilir.
- Bunu daha da ilerletebilirsiniz.

Bunun üzerine yazılım mimarisi oluşturan bazı yazılım kütüphaneler (framework) var: `DragZone`, `Droppable`, `Draggable`. Çoğu yukarıdakine benzer algoritmalar içerir. Bu yüzden bu kütühaneleri anlamanız daha kolay olacaktır. Ya da kendiniz yapın, bu süreci nasıl işleyeceğinizi artık biliyorsunuz, muhtemelen başka bir kütüphaneyi kendi kodunuza adapte etmekten daha kolay olacaktır. 
=======
- On `mouseup` we can intellectually finalize the drop: change data, move elements around.
- We can highlight the elements we're flying over.
- We can limit dragging by a certain area or direction.
- We can use event delegation for `mousedown/up`. A large-area event handler that checks  `event.target` can manage Drag'n'Drop for hundreds of elements.
- And so on.

There are frameworks that build architecture over it: `DragZone`, `Droppable`, `Draggable` and other classes. Most of them do the similar stuff to what's described above, so it should be easy to understand them now. Or roll your own, as you can see that that's easy enough to do, sometimes easier than adapting a third-party solution.
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b
