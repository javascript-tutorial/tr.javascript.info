En mantıklı çözüm `WeakSet`'tir.

```js
let mesajlar = [
    {metin: "Merhaba", kimden: "Ahmet"},
    {metin: "Nasıl Gidiyor?", kimden: "Ahmet"},
    {metin: "Sonra görüşürüz", kimden: "Mehmet"}
];

let okunanlar = new WeakSet();

// iki mesaj okundu
okunanlar.add(mesajlar[0]);
okunanlar.add(mesajlar[1]);
// okunanlar'ın iki elemanı var.

// ... Birincisi tekrar okunursa
okunanlar.add(mesajlar[0]);
// okunanlar hala 2 tane eşsiz elemana sahip


// cevapla:mesajlar[0] okundu mu?
alert("Read message 0: " + okunanlar.has(mesajlar[0])); // true

mesajlar.shift();
// şimdi mesajların 1 elemanı var ( teknik olarak hafıza daha sonra silinebilir)
```

`WeakSet`mesajların saklanmasını ve içinde aranan mesajların olup olmadığını söyleyebilecek bir mekanizmadır.

Kendini otomatik olarak temizler. Burada karşılaşılan zorluk döngüye girmemesidir. "tüm okunan mesajlar"'ı doğrudan gösteremez. Fakat bunu diziyi döngüye sokup sonrasında bu `WeakSet`'te olanları filtreleyerek çözebilirsiniz.

Not: Her mesaja kendi özelliğimizi eklemek eğer mesajlar dizisi başkası tarafından yönetiliyor ise tehlikeli olabilir, fakat bunu özmek için `symbol` kullanılabilir.

Aşağıdaki gibi:
```js
// symbolic özellikler sadece bizim kodumuz tarafından bilinir.
let okunduMu = Symbol("okunduMu");
mesajlar[0][okunduMu] = true;
```
Şimdi eğer başkası `for..in` ile mesajlar dizisini dönmeye çalışsa bile gizli olarak eklediğimiz `okunduMu` görünmeyecektir.
