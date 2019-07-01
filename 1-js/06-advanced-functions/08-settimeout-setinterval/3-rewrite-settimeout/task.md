importance: 4

---
# setTimeout şeklinde verilen fonksiyonu setInterval'e çevirin.

Aşağıda `setTimeout` ile  bir görevi parçalara ayıran bir fonksiyon bulunmaktadır.

Bu fonksiyonu `setInterval` ile tekrar yazınız:

```js run
let i = 0;

let start = Date.now();

function count() {

  if (i == 1000000000) {
    alert("Done in " + (Date.now() - start) + 'ms');
  } else {
    setTimeout(count, 0);
  }

  // zorlu bir görev
  for(let j = 0; j < 1000000; j++) {
    i++;
  }

}

count();
```
