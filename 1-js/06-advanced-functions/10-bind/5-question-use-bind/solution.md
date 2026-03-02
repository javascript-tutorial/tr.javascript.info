
<<<<<<< HEAD
Nedeni `ask`'ın `loginOk/loginFail` fonksiyonlarını obje olmadan almasıdır.
=======
The error occurs because `askPassword` gets functions `loginOk/loginFail` without the object.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

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

