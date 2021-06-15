
```js run
let oda = {
  sayi: 23
};

let tanisma = {
  baslik: "Konferans",
  dolduruldu: [{adi: "Ahmet"}, {adi: "Mehmet"}],
  yer: oda
};

oda.dolduruldu = tanisma;
tanisma.self = tanisma;

alert( JSON.stringify(tanisma, function degistirici(anahtar, deger) {
  return (anahtar != "" && deger == tanisma) ? undefined : deger;
}));

/* 
{
  "baslik":"Konferans",
  "dolduruldu":[{"adi":"Ahmet"},{"adi":"Mehmet"}],
  "yer":{"sayi":23}
}
*/
```
Burada `anahtar ==""` kontrolü de yapılmalı çünkü ilk çağrıda `deger`==`tanisma`'dır, ve `anahtar` boş gelir.
