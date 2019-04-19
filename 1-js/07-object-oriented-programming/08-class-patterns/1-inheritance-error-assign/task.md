Önem: 5

---

# Kalıtımda hata

Aşağıdaki prototip kalıtımındaki hata nedir? Bu hatanın sonucunda neler olabilir?


```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.walk = function() {
  alert(this.name + ' walks');
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = Animal.prototype;

Rabbit.prototype.walk = function() {
  alert(this.name + " bounces!");
};
```
