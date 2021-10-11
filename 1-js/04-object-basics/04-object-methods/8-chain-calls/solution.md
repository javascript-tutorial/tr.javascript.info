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

merdiven.yukari().yukari().asagi().yukari().asagi().adimiGoster();//1
```
Ayrıca her satır için tek çağrı da yazılabilir. Uzun zincirleme fonksiyonlar için bu daha okunabilirdir.

```js 
merdiven
  .yukari()
  .yukari()
  .asagi()
  .up()
  .asagi()
  .adimiGoster(); // 1
```
