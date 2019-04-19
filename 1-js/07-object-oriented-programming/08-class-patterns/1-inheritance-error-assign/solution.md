Hatalı satırlar şunlardır:

```js
Rabbit.prototype = Animal.prototype;
```

Burada `Rabbit.prototype` ve `Animal.prototype` aynı obje olmaktadır. Bu şekilde iki sınıf bu obje içinde karışmış olur.

Sonuç olarak `Rabbit.prototype.walk`, `Animal.prototype.walk`'ın üzerine yazar bu şekilde tüm `animal` `bounce` edebilir hale gelir.

```js run
function Animal(name) {
  this.name = name;
}

Animal.prototype.walk = function() {
  alert(this.name + ' walks');
};

function Rabbit(name) {
  this.name = name;
}

*!*
Rabbit.prototype = Animal.prototype;
*/!*

Rabbit.prototype.walk = function() {
  alert(this.name + " bounces!");
};

*!*
let animal = new Animal("pig");
animal.walk(); // pig bounces!
*/!*
```

Doğrusu şu şekilde olabilir:

```js
Rabbit.prototype.__proto__ = Animal.prototype;
// veya bv şekilde
Rabbit.prototype = Object.create(Animal.prototype);
```
Bu prototipleri ayırır, her biri uyan sınıfın metodunu saklar, fakat `Rabbit.prototype` `Animal.prototype`'tan kalıtılır.