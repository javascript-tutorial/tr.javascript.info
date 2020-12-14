importance: 5

---

# Okunma zamanlarını kaydedin.

[öncegi görevde](info:task/recipients-read) mesaj dizisi vardı. Burada da durum ona benzer.
```js
<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/05-recipients-when-read/task.md
let mesajlar = [
    {metin: "Merhaba", kimden: "Ahmet"},
    {metin: "Nasıl Gidiyor?", kimden: "Ahmet"},
    {metin: "Sonra görüşürüz", kimden: "Mehmet"}
=======
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/05-data-types/08-weakmap-weakset/02-recipients-when-read/task.md
];
```
Şimdiki soru: Mesajın "ne zaman okunduğunu tutmak için" hangi veri yapısını önerirsiniz.

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/05-recipients-when-read/task.md
Bir önceki görevde sadece "evet/hayır" tutmanız gerekmişti. Şimdi ise "ne zaman" bilgisinin tutulması gerekir, aynı şekilde eğer mesajlardan silindiğinde sizin oluşturduğunuz yapıdan da silinmesi gerekir.
=======
The question now is: which data structure you'd suggest to store the information: "when the message was read?".

In the previous task we only needed to store the "yes/no" fact. Now we need to store the date, and it should only remain in memory until the message is garbage collected.

P.S. Dates can be stored as objects of built-in `Date` class, that we'll cover later.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/05-data-types/08-weakmap-weakset/02-recipients-when-read/task.md
