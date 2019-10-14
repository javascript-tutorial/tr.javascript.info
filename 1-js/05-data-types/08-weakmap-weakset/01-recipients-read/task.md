importance: 5

---

# "okunmamış" olanları saklayın

Mesajların bulunduğu bir dizi düşünün:

```js
<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/04-recipients-read/task.md
let mesajlar = [
    {metin: "Merhaba", kimden: "Ahmet"},
    {metin: "Nasıl Gidiyor?", kimden: "Ahmet"},
    {metin: "Sonra görüşürüz", kimden: "Mehmet"}
=======
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac:1-js/05-data-types/08-weakmap-weakset/01-recipients-read/task.md
];
```

Kodunuz bu diziye erişebilir, fakat mesajlar başkasının koduyla yönetiliyor. Yeni mesajların eklenmesi, eskilerin silinmesi gibi olayların ne zaman olduğunu bilmiyorsunuz.

Peki "okunmuş mesajlar"'ı bulabilmek için ne tür bir veri yapısı kullanmanız gerekmektedir? Bu yapı "okundu mu?" sorusuna doğru bir şekilde cevap verebilmeli.

Not: `mesajlar`'dan herhangi bir mesaj silindiğinde sizin yapınızda da bu mesaj silinmelidir.

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/04-recipients-read/task.md
Not: Mesaj objesini doğrudan değiştirmemelisiniz. Başkasının kodu olduğundan ekstra özellikler beklenmeyen sorunlara neden olabilir.
=======
P.P.S. We shouldn't modify message objects, add our properties to them. As they are managed by someone else's code, that may lead to bad consequences.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac:1-js/05-data-types/08-weakmap-weakset/01-recipients-read/task.md
