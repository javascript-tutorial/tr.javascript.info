

```js run
let kullanicilar = [
  { ad: "Ahmet", yas: 20, soyad: "Zurnacı" },
  { ad: "Hideo", yas: 18, soyad: "Konami" },
  { ad: "Jane", yas: 19, soyad: "Hathaway" }
];

*!*
function alanIle(alan) {
  return (a, b) => a[alan] > b[alan] ? 1 : -1;
}
*/!*

kullanicilar.sort(alanIle('ad'));
kullanicilar.forEach(kullanici => alert(kullanici.ad)); // Ahmet, Hideo, Jane

kullanicilar.sort(alanIle('yas'));
kullanicilar.forEach(kullanici => alert(kullanici.ad)); // Hideo, Jane, Ahmet
```

