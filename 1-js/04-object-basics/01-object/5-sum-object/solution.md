
```js run
let maaslar = {
  Ahmet: 100,
  Ali: 160,
  Mazlum: 130
};

let toplam = 0;
for (let key in maaslar) {
  toplam += maaslar[key];
}

alert(toplam); // 390
```

