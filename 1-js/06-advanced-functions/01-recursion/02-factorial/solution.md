<<<<<<< HEAD
Tanım olarak `n!` faktöriyel `n * (n-1)!` şeklinde çalışır.
=======
By definition, a factorial `n!` can be written as `n * (n-1)!`.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

Diğer bir deyişle `faktoriyel(n)` `n` in `factorial(n-1)` ile çarpılmasıdır. Sonrasında `n-1` `1` olana kadar basamak basamak azalır.

```js run
function faktoriyel(n) {
  return (n != 1) ? n * faktoriyel(n - 1) : 1;
}

alert( faktoriyel(5) ); // 120
```

Özçağrı'nın tabanı `1`'dir. `0`'da yapılabilir, çok önemli değildir, fakat 1 özçağrı daha yapmak gerekir.

```js run
function faktoriyel(n) {
  return n ? n * faktoriyel(n - 1) : 1;
}

alert( faktoriyel(5) ); // 120
```
