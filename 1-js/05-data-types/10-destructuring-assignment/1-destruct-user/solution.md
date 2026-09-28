
```js run
let kullanici = {
  adi: "Ahmet",
  yasi: 30
};

let {adi:ismi, yasi: yili, adminMi = false} = kullanici;

alert( ismi ); // John
alert(yili ); // 30
alert( adminMi ); // false
```