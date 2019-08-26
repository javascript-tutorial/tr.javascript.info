importance: 5

---

# Giriş işlemi için kısmi uygulama.

Bir önceki <info:task/question-use-bind>'dan biraz daha karmaşık bir göreviniz var.

`user` objesi değiştirildi. Şimdi `loginOk/loginFail` fonksiyonlarının yerine tek bir fonksiyon `user.login(true/false)` var.

Aşağıdaki `askPassword`'a ne iletilirse bu `user.login(true)`'u `ok` veya `user.login(fail)`'i `fail` olarak çağırır?

```js
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  login(result) {
    alert( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};

*!*
askPassword(?, ?); // ?
*/!*
```
Sadece işaretlenmiş bölümde gerçekleştiriniz.
