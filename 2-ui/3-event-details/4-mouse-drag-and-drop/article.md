# Fare olaylarıyla sürükle ve bırak

Sürükle ve bırak (Drag'n'Drop) harika bir arayüz çözümüdür. Bir şeyi alıp sürükleyip bırakmak; kopyalamadan ve taşımadan (dosya yöneticilerinde olduğu gibi) sipariş vermeye (ürünleri sürükleyip sepete bırakma) kadar birçok şeyi yapmanın açık ve basit bir yoludur.

Modern HTML standardı da sürükle ve bırak olayına izin verir. [ilgili kısım](https://html.spec.whatwg.org/multipage/interaction.html#dnd).

Bunlar basit görevleri kolayca çözmeyi sağlarlar ve ayrıca tarayıcı dışından dosyaların tarayıcıya sürüklenip bırakılmasını sağlarlar. Böylece işletim sistemi dosya yöneticisinden bir dosya alıp tarayıcı penceresine bırakabiliriz. Böylece JavaScript, içeriğine erişim kazanır.

Ancak bu yerel HTML standardındaki sürükle bırak mekanizmasında sınırlamalar vardır. Örneğin, sürüklemeyi belirli bir alanla sınırlayamayız. Ayrıca, bunu yalnızca "yatay" veya "dikey" olarak yapamayız. Bunun gibi bu API kullanılarak uygulanamayan başka sürükle bırak görevleri de vardır.

Bu yüzden burada, fare olaylarını kullanarak Sürükle ve Bırak özelliğini nasıl uygulayacağımızı göreceğiz. Diğerleri gibi bu da zor değil.

## Sürükle bırak algoritması

Temel sürükle ve bırak algoritması şuna benzer:

1. Sürüklenebilir ögenin üzerinde `mousedown` olayını yakala.
2. Öğeyi taşımak için hazırlayın (belki bir kopyasını oluşturabilirsiniz).
3. Daha sonra `mousemove` olayı sırasında `left/top` ve `position:absolute` değerlerini değiştirerek ögeyi hareket ettirin.
4.  `mouseup` olayı (fareyi bıraktığımız zaman) -- Sürükle bırak olayı bittiği zaman yapılacak aksiyonları yap.

Bunlar temel bilgilerdir. Örneğin, üzerine gelindiğinde bırakılabilir (bırakımaya müsait) öğeleri ışıklandırma gibi bu algoritmayı genişletebiliriz.

İşte bir topu sürükleyip bırakmanın uygulaması:

```js
ball.onmousedown = function(event) { // (1) start the process

  // (2) topu harekete hazırla: z indexi ile en üste getir, pozisyonu absolute yap
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  
  // topu dogrudan body e bagla, ebeveyn elementlerden ayır
  document.body.append(ball);  

  // topu (pageX, pageY) koordınatlarında ortala
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }
  
  // pozısyonu absolute olan topu fare imlecinin altına koy
  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (3) mousemove olayında topu hareket ettir
  document.addEventListener('mousemove', onMouseMove);

  // (4) topu bırak, gereksiz işleyicileri kaldır
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};
```

Kodu çalıştırırsak tuhaf bir şey fark edebiliriz. Sürükleyip bırakmanın başlangıcında, top "klonlanır": "klonunu" sürüklemeye başlarız.

```online
İşte bir örnek:

[iframe src="ball" height=230]

Fareyi sürükleyip bırakmaya çalıştığınızda garip davranışı göreceksiniz.
```

Bunun nedeni, tarayıcının resimler için otomatik olarak çalışan ve bizimkilerle çakışan kendi Sürükle ve Bırak özelliğine ve diğer bazı öğelere sahip olmasıdır.

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

Bir diğer önemli husus - "top" üzerinde değil, "belge" üzerinde `mousemove` yani fare hareketini izliyoruz. İlk bakışta, farenin her zaman topun üstündeymiş gibi olacagını düşünebiliriz ve bu yüzden topun üzerinden de dinleyebiliriz diye düşünebiliriz ( ball.eventLıstener ile) .

Ancak hatırlarsak, `mousemove` sık sık tetiklenmesine rağmen, aynı zamanda bazı pikselleri atlayabilir. Bu yüzden ani bir hareketin ardından, imleç topun üzerinden atlayarak, pencerenin başka bir yerine gidebilir ve hatta pencerenin dışına çıkabilir.

Bu yüzden yakalamak için `document` i dinlemeliyiz. (document.eventListener ile)

## Doğru konumlama

Yukarıdaki örneklerde top her zaman imlecin altında ortalanır:

```js
ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
```

Bu kötü değil ama bir yan etkisi var. Sürükle ve bırak işlemini başlatmak için, topun herhangi bir yerinde fareyi `mousedown` olayını dinleyebiliriz. Ancak bunu kenarda yaparsanız, top aniden ortalanmak için "zıplar".

İmlece göre öğenin ilk kaymasını tutarsak daha iyi olur.

Örneğin, topun kenarından sürüklemeye başlarsak, sürüklerken imleç kenarın üzerinde kalmalıdır.

![](ball_shift.svg)

Algoritmamızı güncelleyelim:

1. Kullanıcı topu fare ile tuttuğunda (`mousedown`) -- `shiftX/shiftY` değişkenlerini kullanarak, imleç ile topun üst sol köşesi arasındaki mesafeyi bulabiliriz. Sürüklerken bu mesafeyi arada tutmamız gerekir.

    Bu vardiyaları elde etmek için koordinatları çıkarabiliriz:

    ```js
    // onmousedown
    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;
    ```

   JavaScript'te belgeye bağlı koordinatları elde etmenin bir yöntemi olmadığını lütfen unutmayın, bu nedenle burada pencereye göre koordinatları kullanıyoruz.

2. Sonra sürüklerken, topu imlece göre aynı vardiyaya yerleştiririz, örneğin:

    ```js
    // onmousemove
    // ball has position:absoute
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

  // centers the ball at (pageX, pageY) coordinates
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - *!*shiftX*/!* + 'px';
    ball.style.top = pageY - *!*shiftY*/!* + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (3) move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // (4) drop the ball, remove unneeded handlers
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

Topu sağ alt köşesinden sürüklediğimizde fark özellikle belirgindir. Önceki örnekte top, imlecin altına zıplıyordu. Şimdi, imleci mevcut konumundan akıcı bir şekilde takip ediyor.

## Sürüklediğimiz itemi bırakacağımız yerleri tespit etme

Önceki örneklerde, top "herhangi bir yere" bırakılabilirdi. Gerçek hayatta genellikle bir elementi alıp diğerine bırakırız. Örneğin, bir klasöre bir dosya veya bir item çöp tenekesine bırakılır.

Özet olarak, "sürüklenebilir" bir öğe alıp "bırakılabilir" öğenin üzerine bırakıyoruz.

İtemi bırakacağımız yeri bilmek ve tercihen bırakacagımız yeri ışıklandırmak için sürükle-bırak işleminin sonunda bırakılabilir hedefin yerini bilmemiz gerekir.

Çözüm biraz ilginç ve biraz aldatıcı, bu yüzden burada ele alalım.

İlk akla gelen nedir? Muhtemelen olası hedeflerde `onmouseover/mouseup` olayını dinlemek ve eğer imleç üstlerinden geçerse bunu belirlemek.

Ancak bu işe yaramayacak.

Problem şu ki, biz elementi alıp sürüklerken, bu element her zaman diğerlerinin üstünde ( z-index den ötürü). Ve fare olayları sadece üstteki element üzerinde olur, alttakileri görmez.

Örneğin, aşağıda mavinin üzerinde kırmızı olmak üzere iki `<div>` ögesi var. Mavi elementin üzerinde bir fare olayı yakalamak imkansız çünkü üstünde kırmızı element var.

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

Aynı durum sürüklediğimiz elementte de geçerli. Top her zaman diğer elementlerin üzerinde olduğu için, fare olayı onun üzerinde gerçekleşir. Örneğin bırakacagımız noktada da fare olayı dinlemek istersek, çalışmayacak.

Bu nedenle, olay dinleyicileri potansiyel hedeflere yerleştirme fikri pratikte işe yaramaz.

O zaman ne yapmalı?

Burada `document.elementFromPoint(clientX, clientY)` isimli bir method var. Pencereye göre koordinatlarda en çok içeri geçmiş öğeyi verir (veya koordinatlar pencerenin dışındaysa "null" ya da boş).

Böylece bu methodu kullanarak, sürüklediğimiz ögeyi bırakacagımız noktayı belirleyebiliriz.

```js
// Fare olayı dinleyicisi
ball.hidden = true; // (*)
let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
ball.hidden = false;
// elemBelow topun da aşağısındaki elementi bulup koordinatlarını saklar.
```

Not: bu z çağırmadan önce topu saklamamız gerekir `(*)`. Yoksa muhtemelen bu koordinatlar topun koordinatları olur, çünkü imlecin göreceği ilk element olacaktır: `elemBelow=ball`.

Bu kodu istediğimiz zaman diğer elementlerin "üzerinden geçip geçmediğimizi" kontrol etmek için kullanabiliriz. Ve gerçekleştiğinde sürüklediğimiz elementi buraya birakabileceğimiz anlamına gelir.

"Bırakılabilir" öğeleri bulmak için genişletilmiş bir `onMouseMove` kodu:

```js
let currentDroppable = null; // potansiyel birakacağımız yer

function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);

  ball.hidden = true;
  let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  ball.hidden = false;

  // mousemove olayları pencerenin dışında tetiklenebilir (top ekranın dışına sürüklendiğinde)
  // clientX / clientY pencerenin dışındaysa, elementfromPoint null (boş) döndürür
  if (!elemBelow) return;

  // potansiyel bırakılabilir alanlar "bırakılabilir" sınıfıyla etiketlenir (başka bir isim verebilirsiniz)
  let droppableBelow = elemBelow.closest('.droppable');

  if (currentDroppable != droppableBelow) { // eğer bir değişiklik varsa
    // not: iki değer de boş olabilir
    //   currentDroppable=null eğer bırakabileceğimiz bir noktadan geçmediysel (örneğin boş bir alandan geçtiysek) 
    //   droppableBelow=null şu an bu olay sırasında bırakabileceğimiz alanda değilsek

    if (currentDroppable) {
      // bırabileceğimiz alandan gelip geçme mantığı (ışıklandırmayı kaldır)
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

Aşağıdaki örnekte, top futbol kalesinin üzerinden sürüklendiğinde, kale ışıklandırılmıştır.

[codetabs height=250 src="ball4"]

Artık tüm süreç boyunca `currentDroppable` değişkeninde mevcut "bırakacağımız noktanın hedefi" var ve onu ışıklandırmak veya başka şeyler için kullanabiliriz.

## Özet

Basit bir `Drag'n'Drop` sürükle bırak algoritmasını inceledik.

Anahtar nokatalar:

1. Olay sırası: `ball.mousedown` -> `document.mousemove` -> `ball.mouseup` (local `ondragstart` ı iptal et).
2. Sürükleme başladığında -- Fare imleci ile element arasındaki başlangıç kaymasını hesapla: `shiftX/shiftY` ve bu mesafeyi sürükleme sırasında da koru.
3. Sürüklediğimiz elementi bırakabileceğimiz noktaları belirle `document.elementFromPoint`.

Bu temele çok şey katabiliriz.

- `mouseup` olayıyla elementi bırakışı sonlandırabiliriz: veriyi değiştirebiliriz, ögeleri yerinden oynatabiliriz.
- Üstünden geçtiğimiz elementleri ışıklandırabiliriz.
- Sürüklemeyi belli bir yönde ve belli bir alanda sınırlandırabiliriz.
-  `mousedown/up` için olay delegeasyonu kullanabiliriz. "Event.target" öğesini kontrol eden geniş alanlı bir olay işleyicisi, yüzlerce öğe için sürükle bırak işlevini yönetebilir.
- Bunu daha da ilerletebilirsiniz.

Bunun üzerine yazılım mimarisi oluşturan bazı yazılım kütüphaneleri (framework) var: `DragZone`, `Droppable`, `Draggable`. Çoğu yukarıdakine benzer algoritmalar içerir. Bu yüzden bu kütühaneleri anlamanız daha kolay olacaktır. Ya da kendiniz yapın, bu süreci nasıl işleyeceğinizi artık biliyorsunuz, muhtemelen başka bir kütüphaneyi kendi kodunuza adapte etmekten daha kolay olacaktır. 
