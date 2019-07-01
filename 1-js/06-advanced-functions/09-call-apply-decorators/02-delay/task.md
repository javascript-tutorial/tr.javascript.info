importance: 5

---

# Geciktirici dekoratör.

`delay(f,ms)` adında bir dekoratör yazın ve bu dekoratör her `f` in çağırılmasında `ms` milisaniye kadar geciktirilsin.

Örneğin:

```js
function f(x) {
  alert(x);
}

// Saklayıcı 
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // "test" yazısı 1000ms sonra gelir.
f1500("test"); // "test" yazısı 1500ms sonra gelir.
```

Diğer bir deyişle `delay(f, ms)` `f` fonksiyonunun  `ms` kadar geciktirilmiş versiyonunu döner.

Yukarıdaki kodda, `f` tek argümanlı bir fonksiyondur. Fakat sizin çözümünüzde bu tüm argümanların ve kaynağın `this` şeklinde fonksiyona iletilmesi gerekmektedir.