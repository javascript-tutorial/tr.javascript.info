importance: 5

---

# Sayaç Objesi

Aşağıda yapıcı fonksiyon ile üretilmiş bir sayac objesi bulunmaktadır.

Çalışır mı? Çalışırsa ne gösterir?


```js
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

alert( sayac.yukselt() ); // ?
alert( sayac.yukselt() ); // ?
alert( sayac.alcalt() ); // ?
```