Çünkü Rabbit sınıfındaki yapıcı super'i yani ebeveny sınıfını çağırmalıdır.
Düzeltilmiş kodu aşağıda görebilirsiniz:

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    *!*
    super(name);
    */!*
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // ok now
*/!*
alert(rabbit.name); // White Rabbit
```
