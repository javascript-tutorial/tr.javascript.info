importance: 3

---

<<<<<<< HEAD
# Sayısal özellikleri 2 ile çarpın.

`ikiIleCarp(obj)` adında bir fonksiyon yazın, bu fonksiyon `obj` sayısal özelliklerini `2` ile çarpsın.
=======
# Multiply numeric property values by 2

Create a function `multiplyNumeric(obj)` that multiplies all numeric property values of `obj` by `2`.
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

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

Dikkat ederseniz `multiplyNumeric` birşey döndürmedi, öyleyse değişikliği olduğu yerde yapmak zorunda.
Not: `typeof` ile objenin tipinin `numeric` olup olmadığını kontrol edebilirsiniz.


