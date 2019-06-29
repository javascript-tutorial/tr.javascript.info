importance: 5

---
# Objelerin harita(Map)'lenmesi

`kullanici` dizindeki elemanlar `adi`, `soyadi` ve `id` özelliklerine sahiptirler.

Bunlardan özellikleri `id`, `adi_soyadi` şeklinde `adi` ve `soyadi` özelliklerinden türeyen `adi_soyadi` özelliğine sahip objelerden sahip yeni bir dizi oluşturunuz.  

Örneğin:

```js no-beautify
let ahmet = { adi: "Ahmet", soyadi: "Doğtaş", id: 1 };
let mehmet = { adi: "Mehmet", soyadi: "İstikbal", id: 2 };
let muzaffer = { adi: "Muzaffer", soyadi: "Bellona", id: 3 };

let kullanicilar = [ ahmet, mehmet, muzaffer ];

*!*
let kullaniciMapped = /* ... Sizin kodunuz ... */
*/!*

/*
kullaniciMapped = [
  { adi_soyadi: "Ahmet Doğtaş", id: 1 },
  { adi_soyadi: "Mehmet İstikbal", id: 2 },
  { adi_soyadi: "Muzaffer Bellona", id: 3 }
]
*/

alert( kullaniciMapped[0].id ) // 1
alert( kullaniciMapped[0].adi_soyadi ) // Ahmet Doğtaş
```
Burada yapmanız gereken aslında bir dizideki objeleri diğerine eşlemek(map etmek). `=>` kullanabilirsiniz.