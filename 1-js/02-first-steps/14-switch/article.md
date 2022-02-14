# "switch" cümleleri

```
Türkçe olarak buradaki anlamıyla koşullu ifade demektir.  
```


`Switch` cümleleri `if` cümleleri haline de getirilebilirler.

Daha açıklayıcı ve değerleri birçok farklı şekilde karşılaştırabilir.

[cut]

## Yazım

`Switch` bir veya birden fazla `case` bloğu içermelidir. İsteğe bağlı olarak `default` bloğu kullanılabilir. Yazımı aşağıdaki gibidir.

```js no-beautify
switch(x) {
  case 'deger1':  // if (x === 'deger1')
    ...
    [break]

  case 'deger2':  // if (x === 'deger2')
    ...
    [break]

  default:
    ...
    [break]
}
```
- `x` değeri `sıkı eşitlik` ile kontrol edildi. ( `deger1`) sonra da `deger2`

- Eğer eşitlik bulunursa en yakın `break` olan yere kadar çalışmaya devam eder. Eğer `break` yoksa döngüyü kıramayacağından dolayı `switch` sonuna kadar çalışır.

- Eğer hiçbir eşitlik sağlanamazsa `default` içinde olan kod çalışır.

## Örnek
Aşağıda bulunan örnekte çalışacak `case` bloğu vurgulanmıştır.
```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Çok kısa' );
    break;
*!*
  case 4:
    alert( 'Kesinlikle!' );
    break;
*/!*
  case 5:
<<<<<<< HEAD:1-js/02-first-steps/13-switch/article.md
    alert( 'Çok büyük' );
=======
    alert( 'Too big' );
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834:1-js/02-first-steps/14-switch/article.md
    break;
  default:
    alert( "Böyle bir değeri bilmiyorum." );
}
```
Başlangıçta `switch` cümlesi `a` değişkenini ilk önce 3 `case`'i ile karşılaştırır. Bu karşılaştırma `yanlış` olduğundan ikinciye geçer.

`4` ise eşitliği sağlar `4`den itibaren en yakın `break`e kadar olan bölüm çalışır.

**Eğer `break` konulmazsa sonraki `case` de hiçbir kontrol olmadan çalışır**

`break` olmadan yazılmış hali:

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Çok kısa' );
*!*
  case 4:
    alert( 'Kesinlikle!' );
  case 5:
    alert( 'Çok büyük' );
  default:
    alert( "Böyle bir değeri bilmiyorum." );
*/!*
}
```
Bu döngü çalıştırıldığında ekranda sıralı şekilde uyarılar göreceksiniz. 

```js
alert( 'Kesinlikle!' );
alert( 'Çok büyük' );
alert( "Böyle bir değeri bilmiyorum." );
```

````smart header="Her türli ifade `switch/case` olabilir."

Örneğin:

```js run
let a = "1";
let b = 0;

switch (+a) {
*!*
  case b + 1:
    alert("Çalışır çünkü a+1 = b+1");
    break;
*/!*

  default:
    alert("Burası çalışmaz");
}
```
`+a` `1` değeri dönderir. `case` işleminde `b+1` ile karşılaştırıldığında sonuç `doğru` olduğundan içerideki `alert` çalışır.
````

## "case"'leri gruplama
Gövdesinde aynı kodu çalıştıran birden fazla `case` gruplanabilir.

Örneğin, diyelim ki `case 3` ve `case 5` için aynı kodu çalıştırmak isteniz:

```js run no-beautify
let a = 3;

switch (a) {
  case 4:
    alert('Doğru!');
    break;

*!*
<<<<<<< HEAD:1-js/02-first-steps/13-switch/article.md
  case 3:                    // (*) iki "case" gruplandı
=======
  case 3: // (*) grouped two cases
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834:1-js/02-first-steps/14-switch/article.md
  case 5:
    alert('Yanlış!');
    alert("Neden matematik dersi almıyorsun?");
    break;
*/!*

  default:
    alert('Sonuç garip. Gerçekten!');
}
```

`3` ve `5` aynı mesajı gösterecek.

Aslında "gruplama" `switch/case`'in break olmadan çalıştırılmış halidir. 
Yan etki de denebilir. `case 3` `(*)`'dan başlar ve arada `break` olmadığından `case 5` ile devam eder.

## Tipler önemlidir

Başta da söylenildiği gibi değişken eşitlikleri her zaman `sıkı` olarak kontrol edilir. Bundan dolayı değerler karşılaştırılırken aynı tipte olmasına dikkat edilmesi gerekir.

Örneğin, aşağıdaki kodu göz önüne alırsanız:

```js run
let arg = prompt("Bir değer giriniz?")
switch (arg) {
  case '0':
  case '1':
    alert( 'Bir veya 2' );
    break;

  case '2':
    alert( '2' );
    break;

  case 3:
    alert( 'hiçbir zaman çalışmaz!' );
    break;
  default:
    alert( 'Bilinmeyen bir değer' )
}
```
1. `0` ve `1` değerleri için ilk `alert` çalışır.
2. `2` değeri için ikinci `alert` çalışır.
3. `prompt` her zaman karakter dizisi döndüreceğinden dolayı kontrol eğer `3` şeklinde yapılsaydı bu durumda ekrana mesaj çıkacaktı. Fakat kontrol sayı olan 3 ile yapıldığından dolayı bu ölü koddur ve hiçbir zaman çalışmaz. Bunun yerine `default` kodu çalışacaktır.
