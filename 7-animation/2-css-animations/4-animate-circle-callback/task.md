
# Callback ile hareketli çember


<info:task/animate-circle> görevinde hareketli bir şekilde büyüyen bir çember görünmektedir.

Diyelim ki sadece çember değil, bunun içinde mesaj da olsun. Mesaj animasyon *tamamlandıktan* sonra ( çemberin en büyük halinde ) görünmelidir. Aksi halde çirkin görünecektir.


Görevin çözümünde, `showCircle(cx, cy, radius)` çemberi çizmektedir, fakat hazır olup olmadığına dair hiç bir bilgi vermemektedir.

Yeni bir callback argümanı ekle: `showCircle(cx, cy, radius, callback)` animasyon tamamlandığında çağırılmalıdır. `callback` çemberin `<div>`'ini argüman olarak almalı.

Örneğin:

```js
showCircle(150, 150, 100, div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

Demo:

[iframe src="solution" height=260]

<info:task/animate-circle> çözümünü temel alınız.