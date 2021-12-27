importance: 2

---

# İki fonksiyon - bir obje

<<<<<<< HEAD
`new A() == new B()` şeklinde `A` ve `B` fonksiyonları yaratmak mümkün müdür?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```
Eğer mümkünse, bi işi yapan kodu yazınız.
If it is, then provide an example of their code.