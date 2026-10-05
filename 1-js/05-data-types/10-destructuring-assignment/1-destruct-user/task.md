importance: 5

---

# Ayrıştırma ve atama

Aşağıdaki gibi bir obje:

```js
let kullanici = {
  adi: "Ahmet",
  yasi: 30
};
```
Ayrıştırmasını şu şekilde tanımlayınız:

- `adi` özelliği `ismi` değişkenine atanacak.
- `yasi`  özelliği `yili` değişkenine atanacak.
- `adminMi` özelliği `adminMi` değişkenine atanacak, eğer bu özellik yoksa `false` kabul edilecek.

Değişkenler atandıktan sonra:

```js
let kullanici = { adi: "Ahmet", yasi: 30 };

// sol tarafta yazacağınız kod:
// ... = kullanici

alert( ismi ); // Ahmet
alert( yili ); // 30
alert( adminMi ); // false
```