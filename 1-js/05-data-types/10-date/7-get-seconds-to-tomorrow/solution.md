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
