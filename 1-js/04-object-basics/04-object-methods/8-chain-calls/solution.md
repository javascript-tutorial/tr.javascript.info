Çözüm her metod çağrısı sonrası kendisini döndermektir.

```js run
let merdiven = {
  adim: 0,
  yukari() {
    this.adim++;
*!*
    return this;
*/!*
  },
  asagi() {
    this.adim--;
*!*
    return this;
*/!*
  },
  adimiGoster() {
    alert( this.adim );
*!*
    return this;
*/!*
  }
};

<<<<<<< HEAD
merdiven.yukari().yukari().asagi().yukari().asagi().adimiGoster();//1
=======
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```
Ayrıca her satır için tek çağrı da yazılabilir. Uzun zincirleme fonksiyonlar için bu daha okunabilirdir.

```js 
merdiven
  .yukari()
  .yukari()
  .asagi()
  .up()
<<<<<<< HEAD
  .asagi()
  .adimiGoster(); // 1
=======
  .up()
  .down()
  .showStep() // 1
  .down()
  .showStep(); // 0
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```
