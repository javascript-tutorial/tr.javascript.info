**Cevap: Hata.**

Deneyin:
```js run
function kullaniciOlustur() {
  return {
    isim: "İhsan",
    ref: this
  };
}

let kullanici = kullaniciOlustur();

alert( kullanici.ref.isim ); // Error: Cannot read property 'name' of undefined
```
Çünkü `this`'i tanımlayan kurallar obje tanımına bakmaz.

Kodda `kullaniciOlustur()` içindeki `this` `undefined`'dır. Çünkü bu fonksiyon olarak çağırıldı metod olarak değil!.

Ve objet tanımının `this`'e doğrudan bir etkisi yoktur. `this` tüm fonksiyonu kapsar, kod bloğu veya obje tanımı bunu etkilemez.

Öyleyse, `ref: this` aslında fonksiyonun `thsi` değerini alır.

<<<<<<< HEAD
Şimdi tersi bir duruma bakalım:
=======
So `ref: this` actually takes current `this` of the function.

We can rewrite the function and return the same `this` with `undefined` value: 

```js run
function makeUser(){
  return this; // this time there's no object literal
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined
```
As you can see the result of `alert( makeUser().name )` is the same as the result of `alert( user.ref.name )` from the previous example.

Here's the opposite case:
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

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
}

let kullanici = kullaniciOlustur();

alert( kullanici.ref().isim ); // İhsan
```
Şimdi çalışıyor çünkü `kullanici.ref()` metod oldu. `this`'in değeri de `.` dan öncesi olarak tanımlandı.

