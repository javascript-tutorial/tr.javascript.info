Yapacağımız işlem: verilen `tarih`'ten istenen gün kadar çıkarmaktır:

```js
function kacGunOnce(tarih, gun) {
  tarih.setDate(tarih.getDate() - gun);
  return tarih.getDate();
}
```
...  Fakat fonksiyon `tarih`'i değiştirmemelidir. Bu önemlidir çünkü dışarıdaki kod gönderilen tarihin aynı kaldığını varsaymaktadır.

Bunu uygulayabilmek için tarih objesinin klonunu almak mümkündür:

```js run
function kacGunOnce(tarih, gun) {
  let tarihKopyasi = new Date(tarih);

  tarihKopyasi.setDate(tarih.getDate() - gun);
  return tarihKopyasi.getDate();
}

let tarih = new Date(2015, 0, 2);

alert( kacGunOnce(tarih, 1) ); // 1, (1 Ocak 2015)
alert( kacGunOnce(tarih, 2) ); // 31, (31 Aralık 2014)
alert( kacGunOnce(tarih, 365) ); // 2, (2 Ocak 2014)
```
