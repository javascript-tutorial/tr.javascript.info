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
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
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
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
```
