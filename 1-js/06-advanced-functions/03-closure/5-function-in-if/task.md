
# if'in içindeki fonksiyon

<<<<<<< HEAD:1-js/06-advanced-functions/03-closure/3-function-in-if/task.md
Aşağıdaki son satır çalıştığında sonuç ne olur?
=======
Look at the code. What will be the result of the call at the last line?
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831:1-js/06-advanced-functions/03-closure/5-function-in-if/task.md

```js run
let sozcuk = "Merhaba";

if (true) {
  let kullanici = "Ahmet";

  function selamVer() {
    alert(`${sozcuk}, ${kullanici}`);
  }
}

*!*
selamVer();
*/!*
```
