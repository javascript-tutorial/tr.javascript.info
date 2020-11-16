<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/04-recipients-read/solution.md
En mantıklı çözüm `WeakSet`'tir.

```js
let mesajlar = [
    {metin: "Merhaba", kimden: "Ahmet"},
    {metin: "Nasıl Gidiyor?", kimden: "Ahmet"},
    {metin: "Sonra görüşürüz", kimden: "Mehmet"}
=======
Let's store read messages in `WeakSet`:

```js run
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058:1-js/05-data-types/08-weakmap-weakset/01-recipients-read/solution.md
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

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/04-recipients-read/solution.md
Kendini otomatik olarak temizler. Burada karşılaşılan zorluk döngüye girmemesidir. "tüm okunan mesajlar"'ı doğrudan gösteremez. Fakat bunu diziyi döngüye sokup sonrasında bu `WeakSet`'te olanları filtreleyerek çözebilirsiniz.

Not: Her mesaja kendi özelliğimizi eklemek eğer mesajlar dizisi başkası tarafından yönetiliyor ise tehlikeli olabilir, fakat bunu özmek için `symbol` kullanılabilir.
=======
It cleans up itself automatically. The tradeoff is that we can't iterate over it,  can't get "all read messages" from it directly. But we can do it by iterating over all messages and filtering those that are in the set.

Another, different solution could be to add a property like `message.isRead=true` to a message after it's read. As messages objects are managed by another code, that's generally discouraged, but we can use a symbolic property to avoid conflicts.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058:1-js/05-data-types/08-weakmap-weakset/01-recipients-read/solution.md

Aşağıdaki gibi:
```js
// symbolic özellikler sadece bizim kodumuz tarafından bilinir.
let okunduMu = Symbol("okunduMu");
mesajlar[0][okunduMu] = true;
```
<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/04-recipients-read/solution.md
Şimdi eğer başkası `for..in` ile mesajlar dizisini dönmeye çalışsa bile gizli olarak eklediğimiz `okunduMu` görünmeyecektir.
=======

Now third-party code probably won't see our extra property.

Although symbols allow to lower the probability of problems, using `WeakSet` is better from the architectural point of view.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058:1-js/05-data-types/08-weakmap-weakset/01-recipients-read/solution.md
