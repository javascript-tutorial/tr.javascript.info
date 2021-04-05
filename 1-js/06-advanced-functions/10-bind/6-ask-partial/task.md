importance: 5

---

# Giriş işlemi için kısmi uygulama.

Bir önceki <info:task/question-use-bind>'dan biraz daha karmaşık bir göreviniz var.

`user` objesi değiştirildi. Şimdi `loginOk/loginFail` fonksiyonlarının yerine tek bir fonksiyon `user.login(true/false)` var.

<<<<<<< HEAD:1-js/06-advanced-functions/11-currying-partials/1-ask-currying/task.md
Aşağıdaki `askPassword`'a ne iletilirse bu `user.login(true)`'u `ok` veya `user.login(fail)`'i `fail` olarak çağırır?
=======
What should we pass `askPassword` in the code below, so that it calls `user.login(true)` as `ok` and `user.login(false)` as `fail`?
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3:1-js/06-advanced-functions/10-bind/6-ask-partial/task.md

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
