importance: 5

---

<<<<<<< HEAD
# Nereye yazar?
`animal`dan türemiş bir `rabbit`'imizi var.
=======
# Where does it write?
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b

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
