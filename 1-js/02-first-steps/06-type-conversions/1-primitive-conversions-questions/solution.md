
```js no-beautify
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
7 / 0 = Infinity
" -9\n" + 5 = " -9\n5"
" -9\n" - 5 = -14
null + 1 = 1 // (3)
undefined + 1 = NaN // (4)
```

1. Karakter dizisi ile toplama 1'i karaktere çevirir ve sonrasında iki karakterin toplanması kuralı uygulanır.

2. Çıkarma `"-"`  işlemi sadece sayısal değerler için kullanılır. İçerisi boş olan karakter dizisini 0'a dönüştürür.
3. `null` sayısal olarak dönüştürüldüğünde `0` olur
4. Daha önce de belirttiğimiz gibi `undefined` sayısal veriye çevrilmeye çalışınca `null` un aksine `NaN`(sayı değildir - not a number) olur.