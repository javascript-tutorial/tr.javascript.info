importance: 5

---

<<<<<<< HEAD
# Nereye yazar?
`animal`dan türemiş bir `rabbit`'imizi var.
=======
# Where does it write?
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

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
