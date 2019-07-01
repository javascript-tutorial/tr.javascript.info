importance: 2

---

# Belli olmayan parantez sayısını toplama

`topla` adında bir fonksiyon yazın ve aşağıdaki gibi çalışsın:

```js
topla(1)(2) == 3; // 1 + 2
topla(1)(2)(3) == 6; // 1 + 2 + 3
topla(5)(-1)(2) == 6
topla(6)(-1)(-2)(-3) == 0
topla(0)(1)(2)(3)(4)(5) == 15
```

Not: İlkel tipe dönüştürmek için ayrıca özel bir obje yaratmanıza gerek yok.
