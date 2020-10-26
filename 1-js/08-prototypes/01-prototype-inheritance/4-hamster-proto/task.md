importance: 5

---

<<<<<<< HEAD
# Neden iki hamster da full'dür?
=======
# Why are both hamsters full?
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

`speedy` ve `lazy` diye `hamster`'objesinden türemiş iki tane objemiz olsun.

<<<<<<< HEAD
Biz bir tanesini beslediğimizde, diğeri de full oluyor. Bunun nedeni nedir, nasıl düzeltilir?
=======
When we feed one of them, the other one is also full. Why? How can we fix it?
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

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

