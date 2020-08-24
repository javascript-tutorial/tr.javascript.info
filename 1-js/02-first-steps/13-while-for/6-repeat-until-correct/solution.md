
```js run demo
let sayi;

do {
  sayi = prompt("100'den büyük bir sayı giriniz", 0);
} while (sayi <= 100 && sayi);
```

`do..while` ile her iki koşul da doğru olana kadar kontrol edin:

1. `sayi <=100` -- girilen değerin hala `100` den büyük olmadığını gösterir.
1. `&& sayi` `sayi` `null` veya boş bir değer olduğunda `false` dönderir. Tabi `while` döngüsü de burada sona erer.


NOT: Eğer `sayi` `null` ise ` num<=100` `true` olur. Yani ikinci kontrol olmadan kullanıcı IPTAL tuşuna bassa bile döngü durmayacaktır. İki koşul da gereklidir.
