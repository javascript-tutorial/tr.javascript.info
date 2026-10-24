
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

if (n <= 1) {
  alert(` ${n} için üs alınamamktadır. 0'dan büyük doğal sayı kullanınız.`);
} else {
  alert( usAl(x, n) );
}
```

