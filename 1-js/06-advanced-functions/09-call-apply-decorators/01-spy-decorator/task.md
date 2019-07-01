importance: 5

---

# Gözetmen dekoratör

`spy(func)` adında bir dekoratör yazın ve bu fonksiyona gelen tüm çağrıları `calls` özelliğine kaydetsin.

Çağrıların tamamı argüman dizisi olarak kaydedilsin.

Örneğin:

```js
function work(a, b) {
  alert( a + b ); // work keyfi bir metod veya fonksiyondur.
}

*!*
work = spy(work);
*/!*

work(1, 2); // 3
work(4, 5); // 9

for(let args of work.calls) {
  alert( 'çağrı:' + args.join() ); // "çağrı:1,2", "çağrı:4,5"
}
```

Not: Birim testleri için dekoratörler oldukça yararlıdır. Bunun daha gelişmiş bir versiyonu `sinon.spy` olarak [Sinon.JS](http://sinonjs.org/) kütüphanesinde bulunmaktadır.
