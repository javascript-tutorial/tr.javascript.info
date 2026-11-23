Cevap: `1`.

```js run
let i = 3;

while (i) {
  alert( i-- );
}
```
Her defasında döngü `i` dolayısıyla `1` azalır. `while(i)` koşulu `i=0` olduğunda sonlanır.

Döngü aşağıdaki gibi işler:

```js
let i = 3;

alert(i--); //  3 gösterir, i 2'ye iner.

alert(i--) // 2 gösterir, i 1'e iner.

alert(i--) // 1 gösterir, i 0'a iner.

// bitti `while(i)` koşulu tekrar kontrol edildi ve i = 0 olduğundan döngüden çıkıldı.
```