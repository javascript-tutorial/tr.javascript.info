importance: 5

---

# Nesne oluşturuken hata oluyor.

Aşağıda `Animal`'ıdan miras alan bir `Rabbit` sınıfı bulunmakta.

Aşağıda bunu yapmaya çalıştık fakat başarılı olamadık. Problemi bulabilir misiniz?

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    this.name = name;
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined
*/!*
alert(rabbit.name);
```
