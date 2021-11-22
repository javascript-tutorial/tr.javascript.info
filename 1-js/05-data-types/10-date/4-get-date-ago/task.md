importance: 4

---
# Kaç gün önce?

`kacGunOnce(tarih,gün)` adında bir fonksiyon ile verilen `tarih`'ten `gün` kadar öncesini bulunuz.

Örneğin, eğer bugün 20'si ise, `kacGunOnce(new Date(),1)` size 19 döndürmeli. Yine `kacGunOnce(new Date(),2)` size 18 döndermeli.

Should also work over months/years reliably:

```js
let tarih = new Date(2015, 0, 2);

alert( kacGunOnce(tarih, 1) ); // 1, (1 Ocak 2015)
alert( kacGunOnce(tarih, 2) ); // 31, (31 Aralık 2014)
alert( kacGunOnce(tarih, 365) ); // 2, (2 Ocak 2014)
```

Not: Fonksiyon verilen `tarih` üzerinde oynama yapmamalıdır.