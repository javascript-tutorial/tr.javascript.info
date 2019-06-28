importance: 5

---

# Metin kesme

`truncate(str, maxlength)` fonksiyonu `str`'nin uzunluğunu kontrol eder. Eğer `maxlength`'den uzunsa `str` nin sonunu `"..."` ile bitirir ve uzunluğunu `maxlength`'e kadar getirir.


Fonksiyonun sonucunda eğer gerekliyse metin kesilmelidir.

Örneğin:

```js
truncate("Size bu konuda söylemek istediğim şey:", 20) = "Size bu konuda sö..."

truncate("Merhaba!", 20) = "Merhaba!"
```
