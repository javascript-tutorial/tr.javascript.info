importance: 5

---

# Fibonacci Sayıları

[Fibonacci sayıları](https://en.wikipedia.org/wiki/Fibonacci_number)'nın akışı şu formüle göredir: <code>F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub></code>. Anlamı, bir sonraki sayı kendinden önce gelen iki sayının toplamıdır.

İlk iki sayı `1`'dir, sonra `2(1+1)`, sonra `3(1+2)`, `5(2+3)` şeklinde devam eder: `1, 1, 2, 3, 5, 8, 13, 21...` 

Fibonacci sayıları [Altın oran](https://en.wikipedia.org/wiki/Golden_ratio) ile ilgilidir ve birçok doğal olay bunun etrafında gerçekleşir.

`fib(n)` fonksiyonu yazını ve bu fonksiyon `n`. fibonacci sayisini dönsün.

Örnek:

```js
function fib(n) { /* kodunuz */ }

alert(fib(3)); // 2
alert(fib(7)); // 13
alert(fib(77)); // 5527939700884757
```

Not: Çözüm çok hızlı olmalıdır. `fib(77)` 1 saniyeden uzun sürmemelidir.