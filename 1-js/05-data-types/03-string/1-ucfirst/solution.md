İlk karakteri "değiştiremeyiz" çünkü JavaScript'te karakter dizileri değiştirilemez.

Fakat var olan ile yeni bir karakter dizisi yapmak ve ilk karakteri büyük başlamak mümkündür:

```js
let yeniDizi = str[0].toUpperCase() + str.slice(1);
```

<<<<<<< HEAD
Burada küçük bir problem var. Eğer `str` boş ise, `str[0]` undefined olur ve hata döner.

Bunun iki türlü çözümü bulunmaktadır.

1. `str.charAt(0)`, kullanarak ilk satırdaki karakteri kontrol etmek.
2. Boş karakterler için kontrol yazmak

İkinci türü ise:
=======
There's a small problem though. If `str` is empty, then `str[0]` is `undefined`, and as `undefined` doesn't have the `toUpperCase()` method, we'll get an error.

The easiest way out is to add a test for an empty string, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("ahmet") ); // Ahmet
```
