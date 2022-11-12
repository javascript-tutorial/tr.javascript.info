# Eval: kod karakter dizisi çalıştırmak

Yerleşik `eval` fonksiyonu, `kod` şeklindeki bir karakter dizisini çalıştırmayı sağlar.

Sözdizimi şu şekildedir:

```js
let result = eval(code);
```

Örneğin:

```js run
let code = 'alert("Esenlikler")';
eval(code); // Esenlikler
```

Bir `eval` çalıştırmak son ifadenin sonucunu döndürür.

Örneğin:
```js run
let value = eval('1+1');
alert(value); // 2
```

Kod, o anki sözcüksel ortamda yürütülür, bu nedenle dış değişkenlere erişebilir.

```js run no-beautify
let a = 1;

function f() {
  let a = 2;

*!*
  eval('alert(a)'); // 2
*/!*
}

f();
```

Aynı şekilde dış değişkenleri de değiştirebilir:

```js untrusted refresh run
let x = 5;
eval("x = 10");
alert(x); // 10, değer değişti
```

Katı modda `eval` kendi sözcüksel ortamına sahiptir. Bu nedenle eval içerisinde tanımlanan fonksiyon ve değişkenler dışarıdan ulaşılabilir değildir.

```js untrusted refresh run
// hatırlatma: çalıştırılabilir örneklerde 'use strict' varsayılan olarak etkin durumdadır.

eval("let x = 5; function f() {}");

alert(typeof x); // undefined (böyle bir değişken yok)
// f fonksiyonu da aynı şekilde ulaşılmaz durumda
```

`use strict` kullanılmadığı takdirde `eval`, kendi sözcüksel ortamına sahip değildir, bu yüzden `x` ve `f` ifadelerini dışarıdan görebiliriz.

## "Eval" kullanımı

Modern programlamada `eval`, oldukça cüzi miktarda kullanılır. Kendisinden çoğunlukla "eval is evil" (eval kötüdür) şeklinde bahsedilir.

Nedeni oldukça basit: uzun, çok uzun zaman önce JavaScript, çoğu şeyin yalnızca `eval` ile yapılabildiği, oldukça zayıf bir dildi. Fakat bu artık on yıl kadar öncede kaldı.

Şu an `eval` kullanmak için neredeyse hiçbir neden bulunmuyor. Eğer birisi kullanıyorsa bunu modern bri dil yapısıyla veya bir [JavaScript Modülü](info:modules) ile değiştirmek için iyi bir fırsatı var.

Halen dinamik bir `eval` karakter dizisi şeklinde bir koda ihtiyacınız varsa lütfen bunun dış değişkenlere yan etkilere neden olarak erişebileceğinin farkında olun.

Kod küçültücüler (minifiers - JS kodlarını yayınlamadan önce sıkıştıran araçlar) yerel değişkenleri üretim için kısa olanlarıyla değiştirir. Bu genellikle güvenlidir, şayet birçok referansa sahip `eval` kullanılmıyorsa. Dolayısıyla küçültücüler `eval`dan görülebilen tüm yerel değişkenleri değiştirmez. Bu, kod sıkıştırma oranını büyük oranda kötü etkileyecektir.

`eval`ın içinde dış yerel değişkenler kullanmak kod kontrolünü zorlaştıran kötü bir programlama yöntemidir.

Eval ile bağlantılı sorunlardan kaçınmanın iki adet yolu mevcut.

**Eğer eval'laştırılmış kod dış değişkenleri kullanmıyorsas lütfen `eval`ı `window.eval(...)` şeklinde kullanın:**

Bu yöntem, kodu global kapsamda çalıştıracaktır.

```js untrusted refresh run
let x = 1;
{
  let x = 5;
  window.eval('alert(x)'); // 1 (global değişken)
}
```

**Eğer kod yerel değişkenlere ihtiyaç duyuyorsa `new Function` ile çalıştırın ve bunları argüman olarak geçirin:**

```js run
let f = new Function('a', 'alert(a)');

f(5); // 5
```

`new Function` yapısı <info:new-function> bölümünde açıklanmıştır. Bu, bir karakter dizisinden, aynı zamanda global kapsamda olan bir fonksiyon yaratır. Bu yüzden yerel değişkenleri göremez. Fakat yukarıdaki örnekte de görülebileceği üzere bunları açık şekilde argüman olarak göndermek çok daha temiz bir yoldur.

## Özet

`eval(code)` yapısı karakter dizisi formatındaki bir kodu çalıştırır ve son ifadenin sonucunu döndürür.
- Olabildiğince az ihtiyaç duyularak modern JavaScript'te nadiren kullanılır.
- Global kapsamda `eval` kullanmak yerine `window.eval(code)` kullanın.
- Veya kodunuz dış kapsamdan bazı verilere ihtiyaç duyuyorsa `new Function` kullanın ve bunları argüman olarak gönderin.
