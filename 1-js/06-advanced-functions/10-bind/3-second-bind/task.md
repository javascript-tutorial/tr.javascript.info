importance: 5

---

# Üst üste bağlama

Fazladan bir defa daha bağlama işlemi yaparak `this`'i değiştirebilir miyiz?

Aşağıdaki kodun çıktısı nedir?

```js no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

f();
```

