`date.getDay()` pazardan başlayarak haftanın günlerini dönmektedir.

Eğer günler için bir dizi yapılırsa bu diziye göre günü dönmek mümkün olur:

```js run
function haftaninGunleriniAl(date) {
  let gunler = ['PT', 'SA', 'ÇA', 'PR', 'CM', 'CT', 'PZ' ];

  return gunler[tarih.getDay()];
}

let tarih = new Date(2014, 0, 3); // 3 Jan 2014
alert( haftaninGunleriniAl(tarih) ); // CM
```
