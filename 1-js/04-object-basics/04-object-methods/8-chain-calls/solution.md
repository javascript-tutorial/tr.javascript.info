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
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c
```
Ayrıca her satır için tek çağrı da yazılabilir. Uzun zincirleme fonksiyonlar için bu daha okunabilirdir.

<<<<<<< HEAD
```js 
merdiven
  .yukari()
  .yukari()
  .asagi()
  .up()
  .asagi()
  .adimiGoster(); // 1
=======
We also can write a single call per line. For long chains it's more readable:

```js
ladder
  .up()
  .up()
  .down()
  .showStep() // 1
  .down()
  .showStep(); // 0
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c
```
