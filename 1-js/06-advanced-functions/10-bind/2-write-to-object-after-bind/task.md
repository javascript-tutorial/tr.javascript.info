importance: 5

---

# Fonksiyonu metod olarak bağla.

Aşağıdaki kodun çıktısı nedir?

```js
function f() {
  alert( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();
```
