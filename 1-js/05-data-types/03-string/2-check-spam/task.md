importance: 5

---

# Spam kontrolü

`checkSpam(str)` adında bir fonksiyon yazın ve bu eğer `str` 'viagra' veya 'XXX' gibi değerler alırsa `true` diğer hallerda false döndermesi lazım.

Fonksiyon büyük küçük harf duyarsız olması gerekmektedir:

```js
checkSpam('buy ViAgRA now') == true
checkSpam('free xxxxx') == true
checkSpam("innocent rabbit") == false
```

