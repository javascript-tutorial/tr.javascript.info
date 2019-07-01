importance: 5

---

# Geri Sektiren dekoratör

`debounce(f, ms)` dekoratörü `f` çağrısına `ms` zarfında en fazla bir defa izin vermelidir.

Diğer bir deyişle "debounced" fonksiyonu çağırıldığında, `ms`'e yakın diğer tüm özellikler görmezden gelinecektir.

Örneğin:

```js no-beautify
let f = debounce(alert, 1000);

f(1); // Anında çalışacak
f(2); // görmezden gelinecek

setTimeout( () => f(3), 100); // görmezden gelinecek ( 100 ms'de çalıştığından )
setTimeout( () => f(4), 1100); // çalışır
setTimeout( () => f(5), 1500); // görmezden gelinecek çünkü son çağrıdan itibaren 1000ms'den az bir zaman geçmiştir.
```

Pratikte geri sektiren dekoratör değişmeyeceğini bildiğimiz bir zaman süresince aynı kaynağı tekrar çağırmamak için kullanılabilir.