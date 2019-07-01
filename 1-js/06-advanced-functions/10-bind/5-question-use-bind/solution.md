
Nedeni `ask`'ın `loginOk/loginFail` fonksiyonlarını obje olmadan almasıdır.

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

