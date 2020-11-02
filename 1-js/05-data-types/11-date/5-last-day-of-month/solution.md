Bir sonraki ayın bilgisiyle yeni bir tarih oluşturulduğunda:
```js run
function ayinSonGunu(yil, ay) {
  let tarih = new Date(yil, ay + 1, 0);
  return tarih.getDate();
}

alert( ayinSonGunu(2012, 0) ); // 31
alert( ayinSonGunu(2012, 1) ); // 29
alert( ayinSonGunu(2013, 1) ); // 28
```

Normalde tarihler 1'den başlıyor fakat biz istediğimiz sayıdan başlatabiliriz, tarih objesi bunu kendisine göre ayarlayacaktır. Öyleyse 0 gönderdiğimizde bu "ayın 1. gününden önceki günü göster" anlamına gelir. Bu da "bir önceki ayın son günü" demektir.