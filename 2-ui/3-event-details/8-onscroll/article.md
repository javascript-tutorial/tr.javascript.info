# Sayfa Kaydırma(Scrolling)

<<<<<<< HEAD
Kaydırma olayları, bir sayfada veya öğe kaydırmada tepki vermeyi sağlar. Burada yapabileceğimiz epeyce iyi şeyler var.
=======
The `scroll` event allows reacting to a page or element scrolling. There are quite a few good things we can do here.
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

Örneğin:
- Kullanıcının belgede nerede olduğuna bağlı olarak ek kontrolleri veya bilgileri gösterin / gizleyin..
- Kullanıcı sayfanın sonuna kadar aşağı kaydırdığında daha fazla veri yükleyin.

Küçük bir kaydırma örneği:

```js autorun
window.addEventListener('scroll', function() {
  document.getElementById('showScroll').innerHTML = window.pageYOffset + 'px';
});
```

```online
İşlemde:

Mevcut kaydırma = <b id="showScroll">scroll the window</b>
```

`scroll` elementi hem `window` ta hem de kaydırılabilir elementlerde çalışır.

## Kaydırmayı Önlemek

<<<<<<< HEAD
Bir şeyi nasıl kaydırılamaz hale getiririz? `onscroll` dinleyicisinde `event.preventDefault()` kullanarak kaydırmayı engelleyemiyoruz çünkü kaydırma zaten gerçekleştikten sonra tetiklenir.

Ancak `event.preventDefault()` ile , kaydırmaya neden olan bir olayda kaydırmayı engelleyebiliriz .

Örneğin:
- `wheel` olayı -- farenin tekerliği ile veya "kayan bir dokunmatik alan" yani touchpad de aynı görevi üstlenir).
- `keydown` olayı için `key:pageUp` ve `key:pageDown`.
=======
How do we make something unscrollable?

We can't prevent scrolling by using `event.preventDefault()` in `onscroll` listener, because it triggers *after* the scroll has already happened.

But we can prevent scrolling by `event.preventDefault()` on an event that causes the scroll, for instance `keydown` event for `key:pageUp` and `key:pageDown`.
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

Bu olaylara bir olay işleyicisi (event handler) ve bunun içine `event.preventDefault()`  eklersek, kaydırma başlamaz.

<<<<<<< HEAD
Bazen bu size yardımcı olabilir ancak bir şeyi kaydırılamaz hale getirmek için CSS kullanmak daha güvenilirdir mesela `overflow` özelliği gibi.

İşte `onscroll` ile çözebileceğiniz veya uygulamaları görmek için inceleyebileceğiniz birkaç görev.
=======
There are many ways to initiate a scroll, so it's more reliable to use CSS, `overflow` property.

Here are few tasks that you can solve or look through to see applications of `onscroll`.
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c
