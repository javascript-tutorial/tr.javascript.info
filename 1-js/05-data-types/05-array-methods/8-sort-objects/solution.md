```js run no-beautify
<<<<<<< HEAD
function sortByName(arr) {
  arr.sort((a, b) => a.adi > b.adi);
=======
function sortByAge(arr) {
  arr.sort((a, b) => a.age - b.age);
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5
}

let muzaffer = { adi: "Muzaffer", yas: 25 };
let mehmet = { adi: "Mehmet",yas: 30 };
let ahmet = { adi: "Ahmet", yas: 28 };

let arr = [   muzaffer , mehmet, ahmet ];

sortByName(arr);

// şimdi: [ahmet, mehmet, muzaffer]
alert(arr[1].adi) // Mehmet
```

