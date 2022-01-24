Çünkü `i` hiçbir zaman `10` olmaz.

Aşağıdaki kodu çalıştırın ve gerçek `i` değerini görün:

```js run
let i = 0;
while (i < 11) {
  i += 0.2;
  if (i > 9.8 && i < 10.2) alert( i );
}
```
hiçbirisi tam olarak `10` olmayacaktır.

Bunun olmasının nedeni `0.2` eklediğimizde kesinlik kaybı olur.

Sonuç: Eğer ondalıklı sayılar ise çalışıyorsanız eşitlik kontrolünü iyice kontrol edin.