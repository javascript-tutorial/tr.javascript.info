```js run
function yerelGunAl(tarih) {

  let gun = tarih.getDay();

  if (gun == 0) { //0 -> 7 olmakta.
    gun = 7;
  }

  return gun;
}

alert( getLocalDay(new Date(2012, 0, 3)) ); // 2
```
