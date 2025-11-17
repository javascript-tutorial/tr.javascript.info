importance: 5

<<<<<<< HEAD:1-js/06-advanced-functions/03-closure/3-function-in-if/task.md
# if'in içindeki fonksiyon

Aşağıdaki son satır çalıştığında sonuç ne olur?
=======
---
# Function in if

Look at the code. What will be the result of the call at the last line?
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533:1-js/06-advanced-functions/03-closure/5-function-in-if/task.md

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
