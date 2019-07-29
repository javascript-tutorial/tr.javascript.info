importance: 5

---

# "Switch" ile yazılmış kodu "if" cümlesine çeviriniz

Aşağıdaki kodu `if..else` şekline çeviriniz.

```js
switch (tarayici) {
  case 'Edge':
<<<<<<< HEAD
    alert( "Edge browser kullanıyorsun" );
=======
    alert( "У вас браузер Edge!" );
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
    break;

  case 'Chrome':
  case 'Firefox':
  case 'Safari':
  case 'Opera':
<<<<<<< HEAD
    alert( 'Tamam bunları destekliyoruz.' );
    break;

  default:
    alert( 'Umarım sayfanız güzel görünüyordur' );
=======
    alert( 'Мы поддерживаем и эти браузеры' );
    break;

  default:
    alert( 'Надеемся, что эта страница выглядит хорошо!' );
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
}
```
