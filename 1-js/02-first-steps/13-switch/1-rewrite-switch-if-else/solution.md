`switch` cümlesini bire bir karşılamak için `if` sıkı karşılaştırma `===` yapmalıdır.

Şu anki durumuyla `'=='` karakter karşılaştırma da aynı sonucu verecektir.

```js no-beautify
<<<<<<< HEAD
if(tarayici == 'Edge') {
  alert("Edge browser kullanıyorsun");
} else if (tarayici == 'Chrome'
 || tarayici == 'Firefox'
 || tarayici == 'Safari'
 || tarayici == 'Opera') {
  alert( 'Tamam bunları destekliyoruz.' );
} else {
  alert( 'Umarım sayfanız güzel görünüyordur' );
=======
if(browser == 'Edge') {
  alert("У вас браузер Edge!");
} else if (browser == 'Chrome'
 || browser == 'Firefox'
 || browser == 'Safari'
 || browser == 'Opera') {
  alert( 'Мы поддерживаем и эти браузерыo' );
} else {
  alert( 'Надеемся, что эта страница выглядит хорошо!' );
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
}
```

Dikkat edecek olursanız `tarayici=='Chrome' || tarayici == 'Firefox'` birçok satıra ayrılmış. Bunun nedeni daha kolay okunabilirlikten dolayıdır.

`switch` hali daha temiz ve açıklayıcı duruyor.