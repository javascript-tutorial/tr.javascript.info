importance: 5

---

# Dairesel Referansları Engellemek

Basit dairesel referanslarda özelliğin ismi verilip seri hale getirilirken görmezden gelme işlemi yapılabilir.

<<<<<<< HEAD:1-js/05-data-types/11-json/2-serialize-event-circular/task.md
Fakat bazen çok fazla dairesel referans olabilir. Ayrıca isimleri hem dairesel referanslarda hem de normal özelliklerde kullanılabilir.
=======
But sometimes we can't just use the name, as it may be used both in circular references and normal properties. So we can check the property by its value.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c:1-js/05-data-types/12-json/2-serialize-event-circular/task.md

`degistirici` fonksiyonu ile herşeyi karaktere çevirin, fakat `tanisma`'ya referans veren özellikleri silin:

```js run
let oda = {
  sayi: 23
};

let tanisma = {
  baslik: "Konferans",
  dolduruldu: [{adi: "Ahmet"}, {adi: "Mehmet"}],
  yer: oda
};

*!*
<<<<<<< HEAD:1-js/05-data-types/11-json/2-serialize-event-circular/task.md

// dairesel referanslar 
oda.dolduruldu = tanisma;
tanisma.self = tanisma;
=======
// circular references
room.occupiedBy = meetup;
meetup.self = meetup;
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c:1-js/05-data-types/12-json/2-serialize-event-circular/task.md
*/!*

alert( JSON.stringify(meetup, function degistirici(key, value) {
  /* Kodunuz */
}));

/* Sonuç şu şekilde olmalıdır:
{
  "baslik":"Konferans",
  "dolduruldu":[{"adi":"Ahmet"},{"adi":"Mehmet"}],
  "yer":{"sayi":23}
}
*/
```
