importance: 3

---

<<<<<<< HEAD
# Sayısal özellikleri 2 ile çarpın.

`ikiIleCarp(obj)` adında bir fonksiyon yazın, bu fonksiyon `obj` sayısal özelliklerini `2` ile çarpsın.
=======
# Multiply numeric property values by 2

Create a function `multiplyNumeric(obj)` that multiplies all numeric property values of `obj` by `2`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Örneğin:

```js
// before the call
let menu = {
  en: 200,
  boy: 300,
  baslik: "Menü"
};

ikiIleCarp(menu);

// Çağrı yapıldıktan sonra
menu = {
  en: 400,
  boy: 600,
  baslik: "Menü"
};
```

Dikkat ederseniz `multiplyNumeric` bir şey döndürmedi, öyleyse değişikliği olduğu yerde yapmak zorunda.
Not: `typeof` ile objenin tipinin `numeric` olup olmadığını kontrol edebilirsiniz.


