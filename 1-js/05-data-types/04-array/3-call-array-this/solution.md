Yazım olarak `arr[2]()` bilinen obje hali ile `obj[method]()` ile aynıdır. Buradaki `obj` yerine `dizi` ve `method` yerine ise `2` bulunur.

Bundan dolayı `arr[2]` `this` referansını alır ve bu referans `arr`'i gösterir. Bundan dolayı sonuç:

```js run
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // a,b,function(){...}
```
Dizinin 3 değeri bulunmaktadır: Başlangıçta tanımlanan 2 tanesi ve üstüne eklenen bir fonksiyon.
