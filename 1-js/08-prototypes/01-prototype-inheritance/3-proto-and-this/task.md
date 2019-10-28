importance: 5

---

<<<<<<< HEAD
# Nereye yazar?
`animal`dan türemiş bir `rabbit`'imizi var.
=======
# Where does it write?
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0

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
