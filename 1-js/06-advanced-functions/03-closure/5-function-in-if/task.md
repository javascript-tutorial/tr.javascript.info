
# if'in içindeki fonksiyon

<<<<<<< HEAD:1-js/06-advanced-functions/03-closure/3-function-in-if/task.md
Aşağıdaki son satır çalıştığında sonuç ne olur?
=======
Look at the code. What will be the result of the call at the last line?
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c:1-js/06-advanced-functions/03-closure/5-function-in-if/task.md

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
