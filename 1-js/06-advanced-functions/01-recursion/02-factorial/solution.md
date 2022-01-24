<<<<<<< HEAD
Tanım olarak `n!` faktöriyel `n * (n-1)!` şeklinde çalışır.
=======
By definition, a factorial `n!` can be written as `n * (n-1)!`.
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

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
