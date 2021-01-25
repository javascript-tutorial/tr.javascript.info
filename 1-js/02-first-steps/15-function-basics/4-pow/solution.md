
```js run demo
function usAl(x, n) {
  let sonuc = x;

  for (let i = 1; i < n; i++) {
    sonuc *= x;
  }

  return sonuc;
}

let x = prompt("x?", '');
let n = prompt("n?", '');

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/4-pow/solution.md
if (n <= 1) {
  alert(` ${n} için üs alınamamktadır. 0'dan büyük doğal sayı kullanınız.`);
=======
if (n < 1) {
  alert(`Power ${n} is not supported, use a positive integer`);
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a:1-js/02-first-steps/15-function-basics/4-pow/solution.md
} else {
  alert( usAl(x, n) );
}
```
