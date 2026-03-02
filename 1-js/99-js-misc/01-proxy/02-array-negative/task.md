
# array[-1]'e Erişmek

<<<<<<< HEAD
Bazı dillerde, dizi elemanlarına sondan sayılarak negatif indekslerle erişebiliriz.
=======
In some programming languages, we can access array elements using negative indexes, counted from the end.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Şöyle:

```js
let array = [1, 2, 3];

array[-1]; // 3, son eleman
array[-2]; // 2, sondan bir önceki eleman
array[-3]; // 1, sondan iki önceki eleman
```

Başka bir deyişle, `array[-N]` ifadesi `array[array.length - N]` ile aynıdır.

Bu davranışı uygulamak için bir proxy oluşturun.

Şöyle çalışmalı:

```js
let array = [1, 2, 3];

array = new Proxy(array, {
  /* kodunuz */
});

alert( array[-1] ); // 3
alert( array[-2] ); // 2

// Geri kalan dizi(array) özelliği "olduğu gibi" kalmalıdır
```
