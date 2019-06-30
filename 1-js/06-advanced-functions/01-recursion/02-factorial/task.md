importance: 4

---

# Faktöriyel Hesaplama

Faktöriyel (https://en.wikipedia.org/wiki/Factorial) bir sayının `"bir önceki"` ile `"bir önceki"`'nin vs. vs. şeklinde `1` olana kadar çarpılmasıdır. `n` in faktöriyeli `n!` şeklinde gösterilir.

Faktöriyelin tanımı aşağıdaki gibidir:

```js
n! = n * (n - 1) * (n - 2) * ...*1
```

Farklı `n` değerlerinin faktöriyelleri şu şekildedir:

```js
1! = 1
2! = 2 * 1 = 2
3! = 3 * 2 * 1 = 6
4! = 4 * 3 * 2 * 1 = 24
5! = 5 * 4 * 3 * 2 * 1 = 120
```

Göreviniz `faktoriyel(n)` fonksiyonunu özçağrı kullanarak hesaplamak.

```js
alert( faktoriyel(5) ); // 120
```
Not: `n!`, `n * (n-1)!` şeklinde yazılabilir. Örneğin: `3! = 3*2! = 3*2*1! = 6`
