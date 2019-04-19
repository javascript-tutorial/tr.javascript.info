**Cevap: Hata.**

Deneyin:
```js run
function kullaniciOlustur() {
  return {
    isim: "İhsan",
    ref: this
  };
};

let kullanici = kullaniciOlustur();

alert( kullanici.ref.isim ); // Error: Cannot read property 'name' of undefined
```
Çünkü `this`'i tanımlayan kurallar obje tanımına bakmaz.

Kodda `kullaniciOlustur()` içindeki `this` `undefined`'dır. Çünkü bu fonksiyon olarak çağırıldı metod olarak değil!.

Ve objet tanımının `this`'e doğrudan bir etkisi yoktur. `this` tüm fonksiyonu kapsar, kod bloğu veya obje tanımı bunu etkilemez.

Öyleyse, `ref: this` aslında fonksiyonun `thsi` değerini alır.

Şimdi tersi bir duruma bakalım:

```js run
function kullaniciOlustur() {
  return {
    isim: "İhsan",
*!*
    ref() {
      return this;
    }
*/!*
  };
};

let kullanici = kullaniciOlustur();

alert( kullanici.ref().isim ); // İhsan
```
Şimdi çalışıyor çünkü `kullanici.ref()` metod oldu. `this`'in değeri de `.` dan öncesi olarak tanımlandı.

