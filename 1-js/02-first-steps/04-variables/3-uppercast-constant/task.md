importance: 4

---

# Büyükharf ile sabit (const) kullanımı

Aşağıdaki koda bir göz atın:

```js
const dogumGunu = '18.04.1982';

const yas = someCode(dogumGunu);
```

Gördüğünüz gibi `dogumGunu` adında bir tarih sabiti ve `yaş` adında `dogumGunu` değişkeninden hesaplanan bir değişken bulunmakta. ( Örneğin kısa olması açısından `someCode` fonksiyonu tamamlanmamıştır.)

Sizce `dogumGunu` tamamı büyük harf olacak şekilde mi olmalı? yoksa `yaş` değişkeni mi büyük olmalı? Veya her ikisi de mi büyük harf olmalı? 

```js
const DOGUMGUNU = '18.04.1982'; // büyük harf mi olmalı?

const YAS = someCode(DOGUMGUNU); // büyük harf mi olmalı?
```
