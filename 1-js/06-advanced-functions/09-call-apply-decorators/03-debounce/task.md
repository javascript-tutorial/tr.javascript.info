importance: 5

---

# Geri Sektiren dekoratör

`debounce(f, ms)` dekoratörü `f` çağrısına `ms` zarfında en fazla bir defa izin vermelidir.

<<<<<<< HEAD
Diğer bir deyişle "debounced" fonksiyonu çağırıldığında, `ms`'e yakın diğer tüm özellikler görmezden gelinecektir.
=======
In other words, when we call a "debounced" function, it guarantees that all future calls to the function made less than `ms` milliseconds after the previous call will be ignored.
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f

Örneğin:

```js no-beautify
let f = debounce(alert, 1000);

f(1); // Anında çalışacak
f(2); // görmezden gelinecek

setTimeout( () => f(3), 100); // görmezden gelinecek ( 100 ms'de çalıştığından )
setTimeout( () => f(4), 1100); // çalışır
setTimeout( () => f(5), 1500); // görmezden gelinecek çünkü son çağrıdan itibaren 1000ms'den az bir zaman geçmiştir.
```

<<<<<<< HEAD
Pratikte geri sektiren dekoratör değişmeyeceğini bildiğimiz bir zaman süresince aynı kaynağı tekrar çağırmamak için kullanılabilir.
=======
In practice `debounce` is useful for functions that retrieve/update something when we know that nothing new can be done in such a short period of time, so it's better not to waste resources.
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f
