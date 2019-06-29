importance: 5

---

# Okunma zamanlarını kaydedin.

[öncegi görevde](info:task/recipients-read) mesaj dizisi vardı. Burada da durum ona benzer.
```js
let mesajlar = [
    {metin: "Merhaba", kimden: "Ahmet"},
    {metin: "Nasıl Gidiyor?", kimden: "Ahmet"},
    {metin: "Sonra görüşürüz", kimden: "Mehmet"}
];
```
Şimdiki soru: Mesajın "ne zaman okunduğunu tutmak için" hangi veri yapısını önerirsiniz.

Bir önceki görevde sadece "evet/hayır" tutmanız gerekmişti. Şimdi ise "ne zaman" bilgisinin tutulması gerekir, aynı şekilde eğer mesajlardan silindiğinde sizin oluşturduğunuz yapıdan da silinmesi gerekir.