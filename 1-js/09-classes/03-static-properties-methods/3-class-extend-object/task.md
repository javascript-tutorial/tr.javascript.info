importance: 3

---

# Sınıf Object'i genişletir mi?

Bildiğiniz gibi objeler `Object.prototype`'tan kalıtım alır ve "generic" obje metodlarına bu şekilde erişir.

Aşağıda gösterildiği gibi:

```js run
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

*!*
// hasOwnProperty method is from Object.prototype
alert( rabbit.hasOwnProperty('name') ); // true
*/!*
```
Pek, `"class Rabbit extends Object"` ile `"class Rabbit"` aynımıdır, öyleyse neden?

Aşağıdaki kod çalışır mı?

```js
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // Error
```
Eğer çalışmaz ise çalışır hale getiriniz.
