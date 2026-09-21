importance: 5

---

# Alana göre sıralama

Sıralanacak obje dizisi bulunmaktadır:

```js
let kullanicilar = [
  { ad: "Ahmet", yas: 20, soyad: "Zurnacı" },
  { ad: "Hideo", yas: 18, surname: "Konami" },
  { ad: "Jane", yas: 19, surname: "Hathaway" }
];
```

Bunu yapmanın en yaygın yolu:

```js
// ad'a göre (Ann, Hideo, Jane)
kullanicilar.sort((a, b) => a.ad > b.ad ? 1 : -1);

// yaşa göre (Hideo, Jane, Ahmet)
kullanicilar.sort((a, b) => a.yas > b.yas ? 1 : -1);
```
Aşağıdaki şekle çevirmek mümkün mü?

```js
kullaniclar.sort(alanIle('ad'));
kullaniclar.sort(alanIle('yas'));
```
Böylece fonksiyon yazmak yerine sadece `alanIle(alanAdı)` yazılabilir.

`alanIle` fonksiyonunu yazınız.