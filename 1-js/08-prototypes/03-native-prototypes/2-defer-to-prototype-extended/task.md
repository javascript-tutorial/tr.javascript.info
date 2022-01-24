importance: 4

---

# Fonksiyonlara Düzenleyici (Decorator) ekleyiniz.

Tüm fonksiyonların prototiplerini `defer(ms)` metodunu ekleyiniz. Bu metod çağrılan fonksiyonu `ms` kadar geciktiren bir kapsayıcıdır.

Şu şekilde çalışmalıdır:

```js
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // 1 sn sonra 3 görünür.
```

Argümanların orjinal fonksiyona iletilmesi gerektiğini unutmayın.