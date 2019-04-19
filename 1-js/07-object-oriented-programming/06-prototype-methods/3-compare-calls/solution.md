
İlk çağrı `this == rabbit`'e sonrakiler ise `this` eşittir `Rabbit.prototype'a olacak çekilde tanımlanmıştır. Daha önce de bahsettiğimiz gibi asıl obje `nokta`'dan önceki bölümdür.

Bundan dolayı sadece ilk çağrı `Rabbit`'i gösterir. Diğerleri ise `undefined`'dır.

```js run
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert( this.name );
}

let rabbit = new Rabbit("Rabbit");

rabbit.sayHi();                        // Rabbit
Rabbit.prototype.sayHi();              // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi();              // undefined
```
