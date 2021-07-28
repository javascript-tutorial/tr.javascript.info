
# if'in içindeki fonksiyon

<<<<<<< HEAD:1-js/06-advanced-functions/03-closure/3-function-in-if/task.md
Aşağıdaki son satır çalıştığında sonuç ne olur?
=======
Look at the code. What will be the result of the call at the last line?
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b:1-js/06-advanced-functions/03-closure/5-function-in-if/task.md

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
