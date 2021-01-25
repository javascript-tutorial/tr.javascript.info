
```js run demo
let sayi;

do {
  sayi = prompt("100'den büyük bir sayı giriniz", 0);
} while (sayi <= 100 && sayi);
```

`do..while` ile her iki koşul da doğru olana kadar kontrol edin:

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/6-repeat-until-correct/solution.md
1. `sayi <=100` -- girilen değerin hala `100` den büyük olmadığını gösterir.
1. `&& sayi` `sayi` `null` veya boş bir değer olduğunda `false` dönderir. Tabi `while` döngüsü de burada sona erer.
=======
1. The check for `num <= 100` -- that is, the entered value is still not greater than `100`.
2. The check `&& num` is false when `num` is `null` or an empty string. Then the `while` loop stops too.
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a:1-js/02-first-steps/13-while-for/6-repeat-until-correct/solution.md


NOT: Eğer `sayi` `null` ise ` num<=100` `true` olur. Yani ikinci kontrol olmadan kullanıcı IPTAL tuşuna bassa bile döngü durmayacaktır. İki koşul da gereklidir.
