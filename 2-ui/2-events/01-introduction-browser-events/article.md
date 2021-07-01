# Tarayıcı olaylarına giriş

*Olay* bir şeyin olduğunun işaretidir. Tüm DOM düğümleri bu tür sinyalleri üretir (fakat olaylar DOM ile sınırlı değildir).

Sadece bir göz atmak için, en faydalı DOM olaylarının bir listesi:

**Fare olayları:**
- `click` -- fare bir öğeye tıkladığında (dokunmatik ekranlı cihazlar bunu dokunuşla oluşturur).
- `contextmenu` -- fare bir öğeye sağ tıkladığında.
- `mouseover` / `mouseout` -- fare imleci bir öğenin üzerine geldiğinde / ayrıldığında.
- `mousedown` / `mouseup` -- bir öğenin üzerinde fare butonuna basıldığında, bırakıldığında.
- `mousemove` -- fare hareket ettirildiğinde.

**Form öğesi olayları:**
- `submit` -- ziyaretçi bir `<form>` gönderdiğinde.
- `focus` --  ziyaretçi bir öğeye odaklandığında, örneğin bir `<input>` üzerine.

**Klavye olayları:**
- `keydown` ve `keyup` -- ziyaretçi butona bastığında ve butonu bıraktığında.

**Doküman olayları:**
- `DOMContentLoaded` -- HTML yüklenip, işlenip, DOM tamamen inşa edildiğinde. 

**CSS olayları:**
- `transitionend` -- bir CSS animasyonu bittiğinde

Daha birçok olay vardır. Sonraki bölümlerde belirli olayların daha fazla ayrıntısına gireceğiz.

## Olay işleyicileri

Olaylara tepki vermek için bir *işleyici* atayabiliriz -- bir olay durumunda çalışan bir fonksiyon

İşleyiciler, kullanıcı eylemleri durumunda JavaScript kodu çalıştırmanın bir yoludur.

İşleyici atamanın birkaç yolu vardır. En basitinden başlayarak bunları görelim.

### HTML-özelliği

Bir işleyici HTML'de `on<olay>` adlı bir öznitelik ile ayarlanabilir.

Söz gelimi, bir `input`'a `click` işleyicisi atamak için, buradaki gibi `onclick` kullanabiliriz:

```html run
<input value="Bana tıkla" *!*onclick="alert('Tıklandı!')"*/!* type="button">
```

Fare tıklandığında, `onclick` içinde kod çalışır.

Lütfen `onclick`'in içinde tek tırnak kullandığımızı unutmayın, çünkü özniteliğin kendisi çift tırnak içindedir. Eğer kodun özniteliğin içinde olduğunu unutur ve içinde şu şekilde çift tırnak kullanırsak: `onclick="alert("Click!")"`, doğru bir şekilde çalışmayacaktır.

HTML özniteliği çok fazla kod yazmak için uygun bir yer değildir, bu nedenle bir JavaScript fonksiyonu oluşturup onu orada çağırmamız daha iyi olur.

Burada bir tıklama, fonksiyonu çalıştırır `countRabbits()`:

```html autorun height=50
<script>
  function countRabbits() {
    for(let i=1; i<=3; i++) {
      alert("Tavşan sayısı " + i);
    }
  }
</script>

<input type="button" *!*onclick="countRabbits()"*/!* value="Tavşanları say!">
```

Bildiğimiz üzere, HTML öznitelik isimleri büyük-küçük harf duyarlı değildir, yani `ONCLICK`, `onClick`, `onCLICK`... aynı şekilde çalışır. Fakat genellikle öznitelikler küçük harfle yazılır: `onclick`.

### DOM özelliği

DOM özelliği kullanarak bir işleyici atayabiliriz `on<olay>`.

Söz gelimi, `elem.onclick`:

```html autorun
<input id="elem" type="button" value="Bana tıkla">
<script>
*!*
  elem.onclick = function() {
    alert('Teşekkür ederim');
  };
*/!*
</script>
```

Eğer işleyici bir HTML özniteliği kullanılarak atandıysa tarayıcı onu okur, öznitelik içeriğinden yeni bir fonksiyon oluşturur ve onu DOM özelliğine yazar.

Yani bu yol aslında bir öncekiyle aynıdır.

**İşleyici her zaman DOM özelliğinin içindedir: HTML özniteliği sadece onu başlatma yollarından biridir.**

Bu iki kod parçası aynı şekilde çalışır:

1. Sadece HTML:

    ```html autorun height=50
    <input type="button" *!*onclick="alert('Tıkla!')"*/!* value="Buton">
    ```
2. HTML + JS:

    ```html autorun height=50
    <input type="button" id="button" value="Buton">
    <script>
    *!*
      button.onclick = function() {
        alert('Tıkla!');
      };
    */!*
    </script>
    ```

**Sadece bir tane `onclick` özeliği olduğundan, birden fazla olay işleyici atayamayız.**

Aşağıdaki örnekte JavaScript ile bir işleyici eklemek, mevcut işleyicinin üzerine yazar:

```html run height=50 autorun
<input type="button" id="elem" onclick="alert('Öncesi')" value="Bana tıkla">
<script>
*!*
  elem.onclick = function() { // var olan işleyicinin üzerine yazar
    alert('Sonrası'); // sadece bu gösterilir
  };
*/!*
</script>
```

Bu arada, var olan bir fonksiyonu doğrudan işleyici olarak atayabiliriz:

```js
function sayThanks() {
  alert('Teşekkürler!');
}

elem.onclick = sayThanks;
```

Bir işleyiciyi silmek için -- `elem.onclick = null` atarız.

## Öğeye erişmek: this

Bir işleyicinin içindeki `this`'in değeri, üzerinde işleyici olan öğedir.

Aşağıdaki kodda `button`' içeriğini `this.innerHTML` kullanarak gösterir:

```html height=50 autorun
<button onclick="alert(this.innerHTML)">Tıkla bana</button>
```

## Olası hatalar

Eğer olaylarla çalışmaya başlıyorsanız, lütfen bazı incelikleri göz önünde bulundurun.

**Fonksiyon `sayThanks` şeklinde atanmalıdır, `sayThanks()` olarak değil.**

```js
// doğru
button.onclick = sayThanks;

// yanlış
button.onclick = sayThanks();
```

Eğer parantez eklersek, `sayThanks()` --  ifadesi fonksiyonu çağırır. Yani aslında fonksiyonun çalışmasıyla gelen *sonuç* değerini alır, bu da `undefined` olur (fonksiyon hiçbir şey döndürmediğinden), ve bu değeri `onclick` özniteliğine atamış olur. Bu da çalışmaz.

...Fakat işaretlemede parantezlere ihtiyacımız var:

```html
<input type="button" id="button" onclick="sayThanks()">
```

Farkı açıklaması kolaydır. Tarayıcı özniteliği okuduğunda, içeriğinden gövde ile bir işleyici fonksiyon oluşturur.

Yani son örnek şununla aynıdır:
```js
button.onclick = function() {
*!*
  sayThanks(); // öznitelik içeriği
*/!*
};
```

**Fonksiyonları kullanın, string'leri değil.**

`elem.onclick = "alert(1)"` ataması da işe yarar. Uyumluluk nedenleriyle çalışır, fakat kesinlikle önerilmez.

**İşleyiciler için `setAttribute` kullanmayın.**

Şu şekilde bir çağırım işe yaramayacaktır:

```js run no-beautify
// <body> üzerine tıklandığında hatalar oluşur,
// öznitelikler her zaman string olduğundan, fonksiyon string olmuş olur.
document.body.setAttribute('onclick', function() { alert(1) });
```

**DOM-özellik durumu önemlidir.**

`elem.onclick`'e bir işleyici atayın, `elem.ONCLICK` değil, çünkü DOM özellikleri büyük-küçük harf duyarlıdır.

## addEventListener

İşleyici atamanın yukarıda bahsedilen yollarındaki temel sorun -- bir olaya birden çok işleyici atayamayız.

Söz gelimi, kodumuzun bir kısmı buton tıklandığında butonu vurgulamak istiyor, diğer kısmı ise bir mesaj göstermek istiyor.

Bunun için iki olay işleyicisi atamak istiyoruz. Fakat yeni bir DOM özelliği, halihazırda var olanın üzerine yazacaktır.

```js no-beautify
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // bir önceki işleyicinin üzerine yazar
```

Web-standard developers understood that long ago and suggested an alternative way of managing handlers using special methods `addEventListener` and `removeEventListener`. They are free of such a problem.

The syntax to add a handler:

```js
element.addEventListener(event, handler[, options]);
```

`event`
: Event name, e.g. `"click"`.

`handler`
: The handler function.

`options`
: An additional optional object with properties:
    - `once`: if `true`, then the listener is automatically removed after it triggers.
    - `capture`: the phase where to handle the event, to be covered later in the chapter <info:bubbling-and-capturing>. For historical reasons, `options` can also be `false/true`, that's the same as `{capture: false/true}`.
    - `passive`: if `true`, then the handler will not `preventDefault()`, we'll cover that later in <info:default-browser-action>.


To remove the handler, use `removeEventListener`:

```js
element.removeEventListener(event, handler[, options]);
```

````warn header="Removal requires the same function"
To remove a handler we should pass exactly the same function as was assigned.

That doesn't work:

```js no-beautify
elem.addEventListener( "click" , () => alert('Thanks!'));
// ....
elem.removeEventListener( "click", () => alert('Thanks!'));
```

The handler won't be removed, because `removeEventListener` gets another function -- with the same code, but that doesn't matter.

Here's the right way:

```js
function handler() {
  alert( 'Thanks!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

Please note -- if we don't store the function in a variable, then we can't remove it. There's no way to "read back" handlers assigned by `addEventListener`.
````

Multiple calls to `addEventListener` allow to add multiple handlers, like this:

```html run no-beautify
<input id="elem" type="button" value="Click me"/>

<script>
  function handler1() {
    alert('Thanks!');
  };

  function handler2() {
    alert('Thanks again!');
  }

*!*
  elem.onclick = () => alert("Hello");
  elem.addEventListener("click", handler1); // Thanks!
  elem.addEventListener("click", handler2); // Thanks again!
*/!*
</script>
```

As we can see in the example above, we can set handlers *both* using a DOM-property and `addEventListener`. But generally we use only one of these ways.

````warn header="For some events, handlers only work with `addEventListener`"
There exist events that can't be assigned via a DOM-property. Must use `addEventListener`.

For instance, the event `transitionend` (CSS animation finished) is like that.

Try the code below. In most browsers only the second handler works, not the first one.

```html run
<style>
  input {
    transition: width 1s;
    width: 100px;
  }

  .wide {
    width: 300px;
  }
</style>

<input type="button" id="elem" onclick="this.classList.toggle('wide')" value="Click me">

<script>
  elem.ontransitionend = function() {
    alert("DOM property"); // doesn't work
  };

*!*
  elem.addEventListener("transitionend", function() {
    alert("addEventListener"); // shows up when the animation finishes
  });
*/!*
</script>
```
````

## Event object

To properly handle an event we'd want to know more about what's happened. Not just a "click" or a "keypress", but what were the pointer coordinates? Which key was pressed? And so on.

When an event happens, the browser creates an *event object*, puts details into it and passes it as an argument to the handler.

Here's an example of getting mouse coordinates from the event object:

```html run
<input type="button" value="Click me" id="elem">

<script>
  elem.onclick = function(*!*event*/!*) {
    // show event type, element and coordinates of the click
    alert(event.type + " at " + event.currentTarget);
    alert("Coordinates: " + event.clientX + ":" + event.clientY);
  };
</script>
```

Some properties of `event` object:

`event.type`
: Event type, here it's `"click"`.

`event.currentTarget`
: Element that handled the event. That's exactly the same as `this`, unless the handler is an arrow function, or its `this` is bound to something else, then `event.currentTarget` becomes useful.

`event.clientX / event.clientY`
: Window-relative coordinates of the cursor, for mouse events.

There are more properties. They depend on the event type, so we'll study them later when we come to different events in details.

````smart header="The event object is also accessible from HTML"
If we assign a handler in HTML, we can also use the `event` object, like this:

```html autorun height=60
<input type="button" onclick="*!*alert(event.type)*/!*" value="Event type">
```

That's possible because when the browser reads the attribute, it creates a handler like this:  `function(event) { alert(event.type) }`. That is: its first argument is called `"event"`, and the body is taken from the attribute.
````


## Object handlers: handleEvent

We can assign an object as an event handler using `addEventListener`. When an event occurs, its `handleEvent` method is called with it.

For instance:


```html run
<button id="elem">Click me</button>

<script>
  elem.addEventListener('click', {
    handleEvent(event) {
      alert(event.type + " at " + event.currentTarget);
    }
  });
</script>
```

In other words, when `addEventListener` receives an object as the handler, it calls `object.handleEvent(event)` in case of an event.

We could also use a class for that:


```html run
<button id="elem">Click me</button>

<script>
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "Mouse button pressed";
          break;
        case 'mouseup':
          elem.innerHTML += "...and released.";
          break;
      }
    }
  }

*!*
  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
*/!*
</script>
```

Here the same object handles both events. Please note that we need to explicitly setup the events to listen using `addEventListener`. The `menu` object only gets `mousedown` and `mouseup` here, not any other types of events.

The method `handleEvent` does not have to do all the job by itself. It can call other event-specific methods instead, like this:

```html run
<button id="elem">Click me</button>

<script>
  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }

    onMousedown() {
      elem.innerHTML = "Mouse button pressed";
    }

    onMouseup() {
      elem.innerHTML += "...and released.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

Now event handlers are clearly separated, that may be easier to support.

## Summary

There are 3 ways to assign event handlers:

1. HTML attribute: `onclick="..."`.
2. DOM property: `elem.onclick = function`.
3. Methods: `elem.addEventListener(event, handler[, phase])` to add, `removeEventListener` to remove.

HTML attributes are used sparingly, because JavaScript in the middle of an HTML tag looks a little bit odd and alien. Also can't write lots of code in there.

DOM properties are ok to use, but we can't assign more than one handler of the particular event. In many cases that limitation is not pressing.

The last way is the most flexible, but it is also the longest to write. There are few events that only work with it, for instance `transtionend` and `DOMContentLoaded` (to be covered). Also `addEventListener` supports objects as event handlers. In that case the method `handleEvent` is called in case of the event.

No matter how you assign the handler -- it gets an event object as the first argument. That object contains the details about what's happened.

We'll learn more about events in general and about different types of events in the next chapters.
