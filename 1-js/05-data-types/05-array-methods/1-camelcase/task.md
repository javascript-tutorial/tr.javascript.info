importance: 5

---
# border-left-width'i borderLeftWidth gibi deve hörgücü(camelcase) şekline getiren fonksiyonu yazınız.

`camelize(str)` fonksiyonu yazınız. Bu metod "benim-öz-geçmişim" gibi yazılan kelimeleri "benimÖzGeçmişim" şekline getiren fonksiyonu yazınız.

Bu fonksiyon: tüm tireleri silmeli, dashten sonraki kelimenin ilk harfi büyük harf haline getirilmeli.

Örnek:

```js
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
```
Not: `split` kullanarak karakterleri dizi haline getirebilirsiniz, bunu `join` ile tekrar karakter dizisi haline getirin.