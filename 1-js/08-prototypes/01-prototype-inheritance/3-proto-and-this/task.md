importance: 5

---

<<<<<<< HEAD
# Nereye yazar?
`animal`dan türemiş bir `rabbit`'imizi var.
=======
# Where does it write?
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

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
