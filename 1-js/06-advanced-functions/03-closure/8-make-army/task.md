importance: 5

---

# Ordu fonksiyonları

Aşağıdaki kod `nisancilar` dizisi olusturmaktadır.

Her fonksiyon kendi numara çıktısını verir. Fakat bir hata var...


```js run
function orduYap() {
  let nisancilar = [];

  let i = 0;
  while (i < 10) {
    let nisanci = function() { // Nişancılar fonksiyonu
      alert( i ); // numara göstermeli
    };
    nisancilar.push(nisanci);
    i++;
  }

  return nisancilar;
}

let ordu = orduYap();

ordu[0](); // nisanci 0 fakat 10 gösteriyor.
ordu[5](); // nisancı 5 fakat yine 10 gösteriyor.
// ... tüm nişancılar kendi numaraları yerine 10 gösteriyorlar.
```
<<<<<<< HEAD
Neden tüm nişancılar aynı? Kodu olması gerektiği duruma getiriniz.
=======

Why do all of the shooters show the same value? Fix the code so that they work as intended.

>>>>>>> 5b195795da511709faf79a4d35f9c5623b6dbdbd
