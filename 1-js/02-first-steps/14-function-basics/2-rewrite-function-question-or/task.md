importance: 4

---

# Fonksiyonu '?' veya '||' kullanarak tekrar yazınız.

Aşağıdaki fonksiyon 

Aşağıdaki fonksiyon eğer `yas` parametresi `18`'den büyükse `true` dönderir. 

Diğer türlü onay sorar ve sonucunu döndürür.

```js
function yasKontrolu(yas) {
  if (yas > 18) {
    return true;
  } else {
<<<<<<< HEAD
    return confirm('Ebeveynlerin izin verdi mi?');
=======
    return confirm('Did parents allow you?');
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f
  }
}
```

`if` yazmadan aynı işlemi tek satırda yapan kodu yazınız.

`yasKontrolu` fonksiyonunun iki türlü versiyonunu yazınız.

1. `'?'` operatörünü kullanarak.
2. veya kullanarak `||`. 
