
# if'in içindeki fonksiyon

<<<<<<< HEAD:1-js/06-advanced-functions/03-closure/3-function-in-if/task.md
Aşağıdaki son satır çalıştığında sonuç ne olur?
=======
Look at the code. What will be the result of the call at the last line?
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5:1-js/06-advanced-functions/03-closure/5-function-in-if/task.md

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
