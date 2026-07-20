importance: 4

---

# Büyükharf ile sabit (const) kullanımı

Aşağıdaki koda bir göz atın:

```js
const dogumGunu = '18.04.1982';

const yas = someCode(dogumGunu);
```

<<<<<<< HEAD
Gördüğünüz gibi `dogumGunu` adında bir tarih sabiti ve `yaş` adında `dogumGunu` değişkeninden hesaplanan bir değişken bulunmakta. ( Örneğin kısa olması açısından `someCode` fonksiyonu tamamlanmamıştır.)
=======
Here we have a constant `birthday` for the date, and also the `age` constant.

The `age` is calculated from `birthday` using `someCode()`, which means a function call that we didn't explain yet (we will soon!), but the details don't matter here, the point is that `age` is calculated somehow based on the `birthday`.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

Sizce `dogumGunu` tamamı büyük harf olacak şekilde mi olmalı? yoksa `yaş` değişkeni mi büyük olmalı? Veya her ikisi de mi büyük harf olmalı? 

```js
<<<<<<< HEAD
const DOGUMGUNU = '18.04.1982'; // büyük harf mi olmalı?

const YAS = someCode(DOGUMGUNU); // büyük harf mi olmalı?
=======
const BIRTHDAY = '18.04.1982'; // make birthday uppercase?

const AGE = someCode(BIRTHDAY); // make age uppercase?
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
```
