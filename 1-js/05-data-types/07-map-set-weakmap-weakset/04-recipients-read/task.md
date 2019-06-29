importance: 5

---

# "okunmamış" olanları saklayın

Mesajların bulunduğu bir dizi düşünün:

```js
let mesajlar = [
    {metin: "Merhaba", kimden: "Ahmet"},
    {metin: "Nasıl Gidiyor?", kimden: "Ahmet"},
    {metin: "Sonra görüşürüz", kimden: "Mehmet"}
];
```

Kodunuz bu diziye erişebilir, fakat mesajlar başkasının koduyla yönetiliyor. Yeni mesajların eklenmesi, eskilerin silinmesi gibi olayların ne zaman olduğunu bilmiyorsunuz.

Peki "okunmuş mesajlar"'ı bulabilmek için ne tür bir veri yapısı kullanmanız gerekmektedir? Bu yapı "okundu mu?" sorusuna doğru bir şekilde cevap verebilmeli.

Not: `mesajlar`'dan herhangi bir mesaj silindiğinde sizin yapınızda da bu mesaj silinmelidir.

Not: Mesaj objesini doğrudan değiştirmemelisiniz. Başkasının kodu olduğundan ekstra özellikler beklenmeyen sorunlara neden olabilir.