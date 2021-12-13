importance: 2

---

# İki fonksiyon - bir obje

<<<<<<< HEAD
`new A() == new B()` şeklinde `A` ve `B` fonksiyonları yaratmak mümkün müdür?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```
Eğer mümkünse, bi işi yapan kodu yazınız.
If it is, then provide an example of their code.