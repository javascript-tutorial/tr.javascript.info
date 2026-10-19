
Kesinlikle çalışır

İçte bulunan fonksiyonlar aynı dış Sözcüksel Çevreye sahip olduklarından dolayı aynı `say` değişkenine erişirler:

```js run
function Sayac() {
  let say = 0;

  this.yukselt = function() {
    return ++say;
  };
  this.alcalt = function() {
    return --say;
  };
}

let sayac = new Sayac();

alert( sayac.yukselt() ); // 1
alert( sayac.yukselt() ); // 2
alert( sayac.alcalt() ); // 1
```
