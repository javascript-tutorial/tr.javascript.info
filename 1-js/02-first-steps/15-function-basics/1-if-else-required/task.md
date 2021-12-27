importance: 4

---

# "else" gerekli mi?

Aşağıdaki fonksiyon eğer `yas` parametresi `18`'den büyükse `true` dönderir. 

Diğer türlü onay sorar ve sonucunu döndürür.

```js
function yasKontrolu(yas) {
  if (yas > 18) {
    return true;
*!*
  } else {
    // ...
    return confirm('Ebeveynlerin izin verdi mi?');
  }
*/!*
}
```

Bu fonksiyondan else kaldırılırsa çalışması fark olur mu?

```js
function yasKontrolu(yas) {
  if (yas > 18) {
    return true;
  }
*!*
  // ...
  return confirm('Ebeveynlerin izin verdi mi?');
*/!*
}
```
Eğer farklı ise farkı açıklayabilir misiniz?
