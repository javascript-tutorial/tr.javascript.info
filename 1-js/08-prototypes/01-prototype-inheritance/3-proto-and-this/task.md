importance: 5

---

<<<<<<< HEAD
# Nereye yazar?
`animal`dan türemiş bir `rabbit`'imizi var.
=======
# Where does it write?
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

Eğer `rabbit.eat()` çağırılırsa hangi obje `full` özelliğini alır: `animal` mi yoksa `rabbit` mi?

```js
let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.eat();
```
