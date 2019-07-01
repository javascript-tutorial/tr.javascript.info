importance: 5

---

# Çağrılar arasındaki farklar

Yeni bir `rabbit` objesi yaratalım:

```js
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert(this.name);
};

let rabbit = new Rabbit("Rabbit");
```

Aşağıdaki çağrılar aynı şeyleri yapar mı yapmaz mı?

```js
rabbit.sayHi();
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit).sayHi();
rabbit.__proto__.sayHi();
```
