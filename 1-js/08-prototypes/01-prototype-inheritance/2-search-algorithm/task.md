importance: 5

---

#Arama algoritması

Görev iki bölümden oluşmaktadır.

<<<<<<< HEAD
Bir objemiz var:
=======
Given the following objects:
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

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