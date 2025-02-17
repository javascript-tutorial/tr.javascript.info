importance: 5

---

# Metin kesme

`truncate(str, maxlength)` fonksiyonu `str`'nin uzunluğunu kontrol eder. Eğer `maxlength`'den uzunsa `str` nin sonunu `"..."` ile bitirir ve uzunluğunu `maxlength`'e kadar getirir.


Fonksiyonun sonucunda eğer gerekliyse metin kesilmelidir.

Örneğin:

```js
<<<<<<< HEAD
truncate("Size bu konuda söylemek istediğim şey:", 20) = "Size bu konuda sö..."

truncate("Merhaba!", 20) = "Merhaba!"
=======
truncate("What I'd like to tell on this topic is:", 20) == "What I'd like to te…"

truncate("Hi everyone!", 20) == "Hi everyone!"
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```
