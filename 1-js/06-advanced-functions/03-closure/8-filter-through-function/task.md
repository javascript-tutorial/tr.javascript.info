importance: 5

---

# Fonksiyon ile filtreler

Diziler için `arr.filter(f)` adında JavaScript dahilinde bir metod bulunmaktadır. Bu metod tüm elemanları `f` fonksiyonu ile filtreler. Eğer `true` döner ise o eleman sonuç listesinde görünür.

"Kullanmaya hazır" filtreler yapınız:

- `arasinda(a, b)` --  `a` ve `b` araında veya eşit.
- `diziIcinde([...])` -- verilen dizi içerisinde

Kullanımları şu şekilde olacaktır:

- `arr.filter(arasinda(3,6))` -- sadece 3 ile 6 arasındaki değerleri seçer.
- `arr.filter(diziIcinde([1,2,3]))` -- elemanlar eşitse onları seçeer. Bu durumda sadece `[1,2,3]` elemanları seçilecektir.

Örneğin:

```js
/* .. arasinda ve diziIcinde için yazdığınız kodlar. */
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(arasinda(3, 6)) ); // 3,4,5,6

alert( arr.filter(diziIcinde([1, 2, 10])) ); // 1,2
```
