importance: 4

---

# Filtreleme ve yeni dizi dönme

<<<<<<< HEAD
`filterRange(arr, a, b)` adında bir fonksiyon yazın. `arr` argümanı alsın, `a` ile `b` arasını alsın ve döndersin.
=======
Write a function `filterRange(arr, a, b)` that gets an array `arr`, looks for elements with values higher or equal to `a` and lower or equal to `b` and return a result as an array.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Fonksiyon diziyi modifiye etmemeli. Yeni bir dizi döndürmeli.

Örneğin:

```js
let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4); 

alert( filtered ); // 3,1 (eşleşen değerler)

alert( arr ); // 5,3,8,1 (modifiye edilmedi)
```