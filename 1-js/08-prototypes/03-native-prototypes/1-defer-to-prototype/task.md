importance: 5

---

# Fonksiyonlara "f.defer(ms)" ekleyiniz

Tüm fonksiyonların prototipine "defer(ms)" metodunu ekleyin, bu metod istenilen fonksiyonu belirtilen milisaniye sonunda çalıştırmalıdır.

Bunu yaptıktan sonra kod aşağıdaki gibi görünmelidir:

```js
function f() {
  alert("Hello!");
}

f.defer(1000); // 1 sn sonrasında "Hello!" yazar.
```
