# Sayfa Kaydırma(Scrolling)

Kaydırma olayları, bir sayfada veya öğe kaydırmada tepki vermeyi sağlar. Burada yapabileceğimiz epeyce iyi şeyler var.

Örneğin:
- Kullanıcının belgede nerede olduğuna bağlı olarak ek kontrolleri veya bilgileri gösterin / gizleyin..
- Kullanıcı sayfanın sonuna kadar aşağı kaydırdığında daha fazla veri yükleyin.

Küçük bir kaydırma örneği:

```js autorun
window.addEventListener('scroll', function() {
  document.getElementById('showScroll').innerHTML = pageYOffset + 'px';
});
```

```online
İşlemde:

Mevcut kaydırma = <b id="showScroll">scroll the window</b>
```

`scroll` elementi hem `window` ta hem de kaydırılabilir elementlerde çalışır.

## Kaydırmayı Önlemek

Bir şeyi nasıl kaydırılamaz hale getiririz? `onscroll` dinleyicisinde `event.preventDefault()` kullanarak kaydırmayı engelleyemiyoruz çünkü kaydırma zaten gerçekleştikten sonra tetiklenir.

Ancak `event.preventDefault()` ile , kaydırmaya neden olan bir olayda kaydırmayı engelleyebiliriz .

Örneğin:
- `wheel` olayı -- farenin tekerliği ile veya "kayan bir dokunmatik alan" yani touchpad de aynı görevi üstlenir).
- `keydown` olayı için `key:pageUp` ve `key:pageDown`.

Bu olaylara bir olay işleyicisi (event handler) ve bunun içine `event.preventDefault()`  eklersek, kaydırma başlamaz.

Bazen bu size yardımcı olabilir ancak bir şeyi kaydırılamaz hale getirmek için CSS kullanmak daha güvenilirdir mesela `overflow` özelliği gibi.

İşte `onscroll` ile çözebileceğiniz veya uygulamaları görmek için inceleyebileceğiniz birkaç görev.
