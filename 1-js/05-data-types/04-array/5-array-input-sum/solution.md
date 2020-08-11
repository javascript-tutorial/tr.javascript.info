Önemli bir detay ile başlamak gerekirse. `prompt`'tan alınan `deger` doğrudan sayıya çevirilmez. Çünkü `deger = +deger` gelen değerin boş karaktermi ( dur işareti ) yoksa 0 ( geçerli sayı ) olup olmadığını söyleyemez. Bu daha sonra yapılacaktır.


```js run demo
function sumInput() {
 
  let sayilar = [];

  while (true) {

    let deger = prompt("Lütfen bir sayı giriniz?", 0);

    // İptal edilmeli mi?
    if (deger === "" || deger === null || !isFinite(deger)) break;

    sayilar.push(+deger);
  }

  let toplam = 0;
  for (let sayi of sayilar) {
    toplam += sayi;
  }
  return toplam;
}

alert( sumInput() ); 
```
