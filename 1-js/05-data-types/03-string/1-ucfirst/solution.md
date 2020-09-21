İlk karakteri "değiştiremeyiz" çünkü JavaScript'te karakter dizileri değiştirilemez.

Fakat var olan ile yeni bir karakter dizisi yapmak ve ilk karakteri büyük başlamak mümkündür:

```js
let yeniDizi = str[0].toUpperCase() + str.slice(1);
```

<<<<<<< HEAD
Burada küçük bir problem var. Eğer `str` boş ise, `str[0]` undefined olur ve hata döner.
=======
There's a small problem though. If `str` is empty, then `str[0]` is `undefined`, and as `undefined` doesn't have the `toUpperCase()` method, we'll get an error.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

Bunun iki türlü çözümü bulunmaktadır.

1. `str.charAt(0)`, kullanarak ilk satırdaki karakteri kontrol etmek.
2. Boş karakterler için kontrol yazmak

İkinci türü ise:

```js run
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("ahmet") ); // Ahmet
```

