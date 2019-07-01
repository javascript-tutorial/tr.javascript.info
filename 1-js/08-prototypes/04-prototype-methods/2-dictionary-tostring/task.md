importance: 5

---

# `dictionary` objesine toString'i ekleyin

`Object.create(null)` olarak yaratılan ve her türlü `anahtar/değer` ikilisini tutan `dictionary` adında bir obje bulunmaktadır.

Buna `dictionary.toString()` metodu ekleyin, bu anahtarların virgül ile ayrılmış halini dönsün. Ama `toString` metodu `for..in` ile objenin keylerini dönerken görünmemelidir.

Şu şekilde çalışmalıdır:

```js
let dictionary = Object.create(null);

*!*
//  dictionary.toString metodunu ekleyeceğiniz yer
*/!*

// biraz veri ekleyin
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // __proto__ burada normal özellik olarak kullanılmıştır

// sadece apple ve __proto__ yazmalı
for(let key in dictionary) {
  alert(key); // "apple", sonra "__proto__"
}  

// Artık sizin yazacağınız toString metodu burada çalışmalıdır.
alert(dictionary); // "apple,__proto__"
```
