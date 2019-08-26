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
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
  }
}
```

`if` yazmadan aynı işlemi tek satırda yapan kodu yazınız.

`yasKontrolu` fonksiyonunun iki türlü versiyonunu yazınız.

1. `'?'` operatörünü kullanarak.
2. veya kullanarak `||`. 
