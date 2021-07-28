```js run no-beautify
<<<<<<< HEAD
function sortByName(arr) {
  arr.sort((a, b) => a.adi > b.adi);
=======
function sortByAge(arr) {
  arr.sort((a, b) => a.age - b.age);
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b
}

let muzaffer = { adi: "Muzaffer", yas: 25 };
let mehmet = { adi: "Mehmet",yas: 30 };
let ahmet = { adi: "Ahmet", yas: 28 };

let arr = [   muzaffer , mehmet, ahmet ];

sortByName(arr);

// şimdi: [ahmet, mehmet, muzaffer]
alert(arr[1].adi) // Mehmet
```

