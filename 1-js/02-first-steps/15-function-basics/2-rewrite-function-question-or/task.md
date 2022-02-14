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
<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/2-rewrite-function-question-or/task.md
    return confirm('Ebeveynlerin izin verdi mi?');
=======
    return confirm('Did parents allow you?');
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834:1-js/02-first-steps/15-function-basics/2-rewrite-function-question-or/task.md
  }
}
```

`if` yazmadan aynı işlemi tek satırda yapan kodu yazınız.

`yasKontrolu` fonksiyonunun iki türlü versiyonunu yazınız.

1. `'?'` operatörünü kullanarak.
2. veya kullanarak `||`. 
