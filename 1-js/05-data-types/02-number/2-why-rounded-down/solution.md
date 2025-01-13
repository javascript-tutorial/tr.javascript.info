Aslında `6.35`'in decimal bölümü sonsuz binarydir. Böyle bir durumda kesinlik kaybına uğrarlar.

```js run
alert( 6.35.toFixed(20) ); // 6.34999999999999964473
```
Bu kesinlik kaybı sayının küçülmesine veya büyümesine neden olabilir. Bu örnekte sayı çok çok küçük bir oranda küçülüyor bundan dolayı aşağıya yuvarladı.

`1.35` için ise:

```js run
alert( 1.35.toFixed(20) ); // 1.35000000000000008882
```
Sayı çok küçük bir değer ile büyük limitin üstüne çıktı, bundan dolayı yukarıya yuvarladı.


**Peki `6.35` için bu problem nasıl çözülebilir**

Tam sayı değerini yuvarlama değerine yaklaştırılırsa problem çözülür:

```js run
alert( (6.35 * 10).toFixed(20) ); // 63.50000000000000000000
```
`63.5` hiçbir kayba uğramıyor dikkat ederseniz. Çünkü `0.5` lik fark aslında `1/2`. `2` ve üstü ile yapılan işlemler binary sistemde tam olarak ifade edildiğinden dolayı bu problem çözülmektedir.


```js run
<<<<<<< HEAD
alert( Math.round(6.35 * 10) / 10); // 6.35 -> 63.5 -> 64(yuvarlandı) -> 6.4
=======
alert( Math.round(6.35 * 10) / 10 ); // 6.35 -> 63.5 -> 64(rounded) -> 6.4
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```
