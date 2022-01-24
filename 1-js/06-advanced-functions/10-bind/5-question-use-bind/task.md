importance: 5

---

# Soru `this`'i kaybediyor.

`askPassword()` çağrısı şifreyi kontrol etmeli ve buna göre `user.loginOk` veya `user.loginFail`'i çağırmalıdır.

Fakat bu bir hataya neden oluyor. Neden?

Sadece üstü çizili satırda değişiklik yaparak her şeyin doğru çalışmasını sağlayınız. ( diğer satırlarda değişiklik yapılmamalıdır)

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
askPassword(user.loginOk, user.loginFail);
*/!*
```