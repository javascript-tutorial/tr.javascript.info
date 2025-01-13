
<<<<<<< HEAD
Nedeni `ask`'ın `loginOk/loginFail` fonksiyonlarını obje olmadan almasıdır.
=======
The error occurs because `askPassword` gets functions `loginOk/loginFail` without the object.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Bunları çağırdığında doğal olarak `this=undefined` olarak çalışacaktır.

Kaynağı `bağlar` isek:

```js run
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },

};

*!*
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
*/!*
```
Şimdi çalışacaktır.

Alternatif çözüm şu şekilde olabilir:
```js
//...
askPassword(() => user.loginOk(), () => user.loginFail());
```
Genelde bu da çalışır. Fakat daha karmaşık durumlarda `user`'ın soru ve `() => user.loginOk()` arasında üzerine yazılabilir.

