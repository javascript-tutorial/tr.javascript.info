importance: 2

---

# İki fonksiyon - bir obje

<<<<<<< HEAD
`new A() == new B()` şeklinde `A` ve `B` fonksiyonları yaratmak mümkün müdür?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert( a == b ); // true
```
Eğer mümkünse, bi işi yapan kodu yazınız.
If it is, then provide an example of their code.