
`setTimeout`'ların hepsi o anda çalışan kod bittikten sonra başlar.

`i` en son `100000000` olacaktır.

```js run
let i = 0;

setTimeout(() => alert(i), 100); // 100000000

// bu fonksiyonu çalışma zamanı >100 ms varsayın.
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
