# Basit fakat yanlış çözüm

Basit yöntem, `min` ile `max` arasında `rasgele` bir değer bulup bunu yuvarlamaktır.

```js run
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min); 
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
```
Fonksiyon çalışır fakat yanlıştır. `min` ve `max` ın kenar değerlerinin seçilmesi diğer değerlere göre iki kat azdır.

Eğer yukarıdaki örneği birçok defa çalıştırırsanız en fazla `2` nin döndüğünü göreceksiniz.

Bu böyle olur çünkü `Math.round()` , `1..3` arasında rasgele değerler alır ve aşağıdaki gibi bunları yuvarlar:

```js no-beautify
 1    ... ile 1.4999999999  arası  1
 1.5  ... ile 2.4999999999  arası 2
 2.5  ... ile 2.9999999999  arası 3
```
Gördüğünüz gibi `1`'in `2`ye göre seçilme olasılı 2 defa daha azdır. `3` için de aynıdır.

# Doğru çözüm

Aslında birçok doğru çözüm vardır. Bir tanesi, aralık sınırlarının ayarlanmasıdır. Her defasında aynı aralık seçildiğinden emin olunmalıdır. `0.5 ile 2.5` arasında değerler üretilebilir. Bu şekilde kenarlara olasılık için ağırlık eklenmiş olur.

```js run
*!*
function randomInteger(min, max) {
  // (min-0.5) ile (max+0.5) arasında
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Diğer bir alternatif ise `Math.floor` kullanılarak `min` ile `max+1` aralığından rasgele bir sayı seçilmesidr.

```js run
*!*
function randomInteger(min, max) {
  // rasgele min ile (max+1) arasındadır.
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Şimdi ise aralıklar şu şekilde haritalanır:

```js no-beautify
1  ... ile 1.9999999999  arası 1 olur
2  ... ile 2.9999999999  arası 2 olur
3  ... ile 3.9999999999  arası 3 olur
```
Tüm aralıklar aynı boyutlara sahiptir. Son tahlilde hepsi aynı olasılığa sahiptir.