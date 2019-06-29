```js run

let ahmet = { adi: "Ahmet", yas: 25 };
let mehmet = { adi: "Mehmet", yas: 30 };
let muzaffer = { adi: "Muzaffer", yas: 28 };

let kullanici = [ ahmet, mehmet, muzaffer ];

let isimler = kullanici.map(eleman => eleman.adi);

alert( isimler ); //  Ahmet, Mehmet, Muzaffer
```

