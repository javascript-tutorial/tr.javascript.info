
1. Tümünün çalışabilir olası için `topla`'nın fonksiyon olması lazım.
2. Bu fonksiyon çağrıları arasında hafızada değer tutabilmeli.
3. Göreve göre, fonksiyon `==` kullanıldığında sayı olmalıdır. Fonksiyonlar obje olduğundan dolayı dönüşümleri <info:object-toprimitive> bölümünde anlatıldığı gibi çevrilirler, bu objenin sayı olarak dönebilmesi için kendi metodumuzu kullanabiliriz.

Kod:

<<<<<<< HEAD
```js run
function topla(a) {
=======
```js demo run
function sum(a) {
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

  let anlikToplam = a;

  function f(b) {
    anlikToplam += b;
    return f;
  }

  f.toString = function() {
    return anlikToplam;
  };

  return f;
}

alert( topla(1)(2) ); // 3
alert( topla(5)(-1)(2) ); // 6
alert( topla(6)(-1)(-2)(-3) ); // 0
alert( topla(0)(1)(2)(3)(4)(5) ); // 15
```

`topla` fonksiyonu sadece bir defa çalışır. `f` fonksiyonu döndürür.

Sonrasında her bir çağrı için `f`'i tekrar çağırır ve `anlikToplam` değerine kendisini ekler ve döndürür.

**f'in son satırında recursion bulunmamakta**

Recursion ( kendini çağırma ) aşağıdaki gibi görünmektedir:

```js
function f(b) {
  anlikToplam += b;
  return f(); // <-- kendini çağırıyor
}
```
Bizim durumumuzda sadece çağırmadan kendisini döndürmektedir.

```js
function f(b) {
  anlikToplam += b;
  return f; // <-- kendisni çağırmamakta, kendi değerini dönüyor.
}
```

<<<<<<< HEAD
`f` değeri bir sonraki çağrıda kullanılacaktır, ne kadar çağırılırsa o kadar kullanılır. Ne zaman ki sayı veya karakter dizisi olarak kullanılacak olursa - `toString` metodu `anlikToplam` değerini döner. Bunun yanında `Symbol.toPrimitive` veya `valueOf` da kullanılabilirdi.
=======
This `f` will be used in the next call, again return itself, as many times as needed. Then, when used as a number or a string -- the `toString` returns the `currentSum`. We could also use `Symbol.toPrimitive` or `valueOf` here for the conversion.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
