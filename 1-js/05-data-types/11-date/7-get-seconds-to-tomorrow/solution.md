Yarına olan süreyi bulmak için "yarının 00:00:00"'ından şimdi arasındaki fark bulunur. 

Önce "yarını" tanımlamak gereklidir:

```js run
function yarinaKacSn() {
  let simdi = new Date();

  // yarin
  let yarin = new Date(simdi.getFullYear(), simdi.getMonth(), *!*simdi.getDate()+1*/!*);

  let fark = yarin - simdi; // ms cinsinden fark
  return Math.round(fark / 1000); // saniyeye cevir
}
```


Alternative solution:

```js run
function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
```

Please note that many countries have Daylight Savings Time (DST), so there may be days with 23 or 25 hours. We may want to treat such days separately.
