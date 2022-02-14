importance: 5

---

# Sayaçlar bağımsız mı?

`sayac` ve `sayac2` aynı `sayacUret` fonksiyonu kullanmaktadır.

Bu sayaçlar birbirlerinden bağımsız mıdır? İkinci sayaç ne gösterecek ? `0,1` veya `2,3` veya tamamen başka bir şey mi?

```js
function sayacUret() {
  let say = 0;

  return function() {
    return say++;
  };
}

let sayac = sayacUret();
let sayac2 = sayacUret();

alert( sayac() ); // 0
alert( sayac() ); // 1

*!*
alert( sayac2() ); // ?
alert( sayac2() ); // ?
*/!*
```

