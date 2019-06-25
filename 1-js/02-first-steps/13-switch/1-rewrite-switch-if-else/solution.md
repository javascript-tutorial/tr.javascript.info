`switch` cümlesini bire bir karşılamak için `if` sıkı karşılaştırma `===` yapmalıdır.

Şu anki durumuyla `'=='` karakter karşılaştırma da aynı sonucu verecektir.

```js no-beautify
if(tarayici == 'Edge') {
  alert("Edge browser kullanıyorsun");
} else if (tarayici == 'Chrome'
 || tarayici == 'Firefox'
 || tarayici == 'Safari'
 || tarayici == 'Opera') {
  alert( 'Tamam bunları destekliyoruz.' );
} else {
  alert( 'Umarım sayfanız güzel görünüyordur' );
}
```

Dikkat edecek olursanız `tarayici=='Chrome' || tarayici == 'Firefox'` birçok satıra ayrılmış. Bunun nedeni daha kolay okunabilirlikten dolayıdır.

`switch` hali daha temiz ve açıklayıcı duruyor.