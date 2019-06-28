Normalde  0..1 arasında olan değerleri `min` ve `max` arasına "haritalamamız` gerekmektedir.

Çözüm iki bölümden oluşur:

1. Eğer 0..1 arasında seçilen rasgele sayı `max-min` ile çarpılırsa, değer `0..1` arasından `0..max-min` arasına kadar büyütülür.
2. Eğer `min` eklenirse, bu aralık `min` den `max` a kadar olur.

Fonksiyon:

```js run
function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) ); 
alert( random(1, 5) ); 
alert( random(1, 5) ); 
```