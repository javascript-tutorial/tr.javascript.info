```js run
function ortalamaYasAl(kullanicilar) {
  return kullanicilar.reduce((onceki, kullanici) => onceki + kullanici.yas, 0) / kullanicilar.length;
}

let muzaffer = { adi: "Muzaffer", yas: 25 };
let mehmet = { adi: "Mehmet",yas: 30 };
let ahmet = { adi: "Ahmet", yas: 29 };

let arr = [   muzaffer , mehmet, ahmet ];

alert( ortalamaYasAl(arr) ); // 28
```

