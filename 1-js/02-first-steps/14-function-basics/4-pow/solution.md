
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

<<<<<<< HEAD
if (n <= 1) {
  alert(` ${n} için üs alınamamktadır. 0'dan büyük doğal sayı kullanınız.`);
=======
if (n < 1) {
  alert(`Степень ${n} не поддерживается, только целая, большая 0`);
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
} else {
  alert( usAl(x, n) );
}
```
