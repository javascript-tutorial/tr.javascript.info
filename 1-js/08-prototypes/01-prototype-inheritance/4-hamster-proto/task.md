importance: 5

---

<<<<<<< HEAD
# Neden iki hamster da full'dür?
=======
# Why are both hamsters full?
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

`speedy` ve `lazy` diye `hamster`'objesinden türemiş iki tane objemiz olsun.

<<<<<<< HEAD
Biz bir tanesini beslediğimizde, diğeri de full oluyor. Bunun nedeni nedir, nasıl düzeltilir?
=======
When we feed one of them, the other one is also full. Why? How can we fix it?
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

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

