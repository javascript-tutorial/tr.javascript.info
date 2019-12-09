importance: 5

---

#Arama algoritması

Görev iki bölümden oluşmaktadır.

<<<<<<< HEAD
Bir objemiz var:
=======
Given the following objects:
>>>>>>> 5b195795da511709faf79a4d35f9c5623b6dbdbd

```js
let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};

let pockets = {
  money: 2000
};
```

1. `__proto__` kullanarak prototipleri özellikleri `pockets`->`bed`->`table`->`head` gibi bir yolu takip edecek şekilde prototipleri atayınız. Örneğin `pockets.pen` `3` ( `table`'da bulunan ) olmalı, `bed.glasses` ise `1` ( `head`'de bulunmalı) 
2. Sizce `glasses` değerini `pocket.glasses` ile mi yoksa `head.glasses` ile mi almak daha hızlıdır? 