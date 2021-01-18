importance: 5

---

<<<<<<< HEAD
# Neden iki hamster da full'dür?
=======
# Why are both hamsters full?
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

`speedy` ve `lazy` diye `hamster`'objesinden türemiş iki tane objemiz olsun.

<<<<<<< HEAD
Biz bir tanesini beslediğimizde, diğeri de full oluyor. Bunun nedeni nedir, nasıl düzeltilir?
=======
When we feed one of them, the other one is also full. Why? How can we fix it?
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Bu yemeği buldu
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Bu neden buldu peki?
alert( lazy.stomach ); // apple
```

