`tarih`'ten şimdiye kadar geçen süre -- tarihleri birbirinden çıkar.
```js run
function formatTarih(tarih) {
  let fark = new Date() - tarih; // Farkın ms. cinsinden değeri

  if (fark < 1000) { // 1 saniye önce
    return 'Şimdi';
  }

  let sn = Math.floor(fark / 1000); // farkı saniyeye çevir.

  if (sn < 60) {
    return sn + ' saniye önce';
  }

  let dk = Math.floor(fark / 60000); // farkı dakika çevir
  if (dk < 60) {
    return dk + ' dakika önce';
  }

  // tarihi formatla
  // ve geri kalan tek basamakları iki basamak haline getir.
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2)); // Her bileşenin son iki hanesini al.

  // bileşenleri tarihe ekle
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}

alert( formatTarih(new Date(new Date - 1)) ); // "Şimdi"

alert( formatTarih(new Date(new Date - 30 * 1000)) ); // "30 saniye önce"

alert( formatTarih(new Date(new Date - 5 * 60 * 1000)) ); // "5 dakika önce"

<<<<<<< HEAD:1-js/05-data-types/10-date/8-format-date-relative/solution.md
// dünün günü şu şekilde: 31.12.2016, 20:00
alert( formatTarih(new Date(new Date - 86400 * 1000)) );
=======
// yesterday's date like 31.12.2016 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5:1-js/05-data-types/11-date/8-format-date-relative/solution.md
```

Alternative solution:

```js run
function formatDate(date) {
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let diffMs = new Date() - date;
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = diffSec / 60;
  let diffHour = diffMin / 60;

  // formatting
  year = year.toString().slice(-2);
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  if (diffSec < 1) {
    return 'right now';  
  } else if (diffMin < 1) {
    return `${diffSec} sec. ago`
  } else if (diffHour < 1) {
    return `${diffMin} min. ago`
  } else {
    return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
  }
}
```
