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
<<<<<<< HEAD:1-js/06-advanced-functions/03-closure/8-make-army/task.md
Neden tüm nişancılar aynı? Kodu olması gerektiği duruma getiriniz.
=======

Why do all of the shooters show the same value? Fix the code so that they work as intended.

>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/06-advanced-functions/03-closure/10-make-army/task.md
