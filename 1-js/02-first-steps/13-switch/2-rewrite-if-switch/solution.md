İlk ikisi iki tane `case`e dönüşür. Üçüncüsü ise iki tane `case`e dönüşür.

```js run
let a = +prompt('a?', '');

switch (a) {
  case 0:
    alert( 0 );
    break;

  case 1:
    alert( 1 );
    break;

  case 2:
  case 3:
    alert( '2,3' );
*!*
    break;
*/!*
}
```
Not: En altta bulunan `break` gerekli değildir. Fakat kodu gelecekte oluşacak değişikliklere yönelik yazarsanız daha iyi olur.

İlerde diyelim ki yeni bir `case` yazma ihtiyacı duydunuz örneğin `case 4` ve bir öncekinde `break` cümlesini unuttunuz diyelim. Bu durumda `case 3` ün sonunda hata olacaktır. Bu şekilde yazma bir çeşit sigortadır.