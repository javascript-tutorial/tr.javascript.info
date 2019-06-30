importance: 5

---

# Verilen değere kadar olan tüm sayıları toplayan fonksiyon

`topla(n)` fonksiyonu `1+2+....+n` şeklinde toplama işlemi yapar.

Örneğin:

```js no-beautify
topla(1) = 1
topla(2) = 2 + 1 = 3
topla(3) = 3 + 2 + 1 = 6
topla(4) = 4 + 3 + 2 + 1 = 10
...
topla(100) = 100 + 99 + ... + 2 + 1 = 5050
```

3 farklı şekilde yapınız:

1. Döngü kullanarak
2. Özçağrı kullanarak, `topla(n) = n + topla(n-1)` her `n > 1` için.
3. [Aritmetik işlem kullanarak](https://en.wikipedia.org/wiki/Arithmetic_progression)

Sonuc:

```js
function topla(n) { /*... kodunuz ... */ }

alert( topla(100) ); // 5050
```

Not: Hangi yöntem daha hızlıdır? Hangisi yavaştır? Neden?

Not2: Özçağrı ile `topla(100000)` çalıştırılabilir mi? 
