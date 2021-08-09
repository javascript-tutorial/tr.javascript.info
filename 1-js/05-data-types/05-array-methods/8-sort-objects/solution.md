```js run no-beautify
<<<<<<< HEAD
function sortByName(arr) {
  arr.sort((a, b) => a.adi > b.adi);
=======
function sortByAge(arr) {
  arr.sort((a, b) => a.age - b.age);
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b
}

let muzaffer = { adi: "Muzaffer", yas: 25 };
let mehmet = { adi: "Mehmet",yas: 30 };
let ahmet = { adi: "Ahmet", yas: 28 };

let arr = [   muzaffer , mehmet, ahmet ];

sortByName(arr);

// şimdi: [ahmet, mehmet, muzaffer]
alert(arr[1].adi) // Mehmet
```

