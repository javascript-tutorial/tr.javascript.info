`speedy.eat("apple")` çağrısında ne oluyor isterseniz daha yakından inceleyelim

1. (`=hamster`) protitipinde `speedy.eat` bulunur, sonra `this=speedy` olacak şekilde çalıştırılır. ( .dan önceki obje )

2. Sonra `this.stomach.push()` `stomach` özelliğini bulmalı ve `push`'u çağırmalı. `this` içinde `stomch`'(`=speedy`) i araştırır fakat bulamaz. 

3. Sonra prototip bağını takip ederek `hamster` içinde `stomach`'i bulur.

4. Bunun içindeki `push` u çalıştırır. Böylece *prototip'in `stomach`'i çalışmış olur*

Böylece tüm hamsterlar'ın bir tane `stomach`'i oluyor.

Her defaında prototip'ten `stomach` alındığında ve sonra `stomach.push` ile `olduğu yerde` modifiye eder.

Aklınızda bulunsun basit bir atamada `this.stomach=` gibi basit atamada gerçekleşmez.

```js run
let hamster = {
  stomach: [],

  eat(food) {
*!*
    // this.stomach.push yerine this.stomach'i ata.
    this.stomach = [food];
*/!*
  }
};

let speedy = {
   __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Speedy yemeği buldu
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Lazy'nin stomach'i boş kaldı
alert( lazy.stomach ); // <nothing>
```

Now all works fine, because `this.stomach=` does not perform a lookup of `stomach`. The value is written directly into `this` object.

Also we can totally evade the problem by making sure that each hamster has his own stomach:

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

let lazy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

// Speedy one found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Lazy one's stomach is empty
alert( lazy.stomach ); // <nothing>
```

As a common solution, all properties that describe the state of a particular object, like `stomach` above, are usually written into that object. That prevents such problems.
