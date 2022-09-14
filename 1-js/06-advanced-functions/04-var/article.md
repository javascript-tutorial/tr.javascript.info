
# Eski tip "var" 

İlk bölümde [degiskenler](info:variables) altında üç çeşit değişken tanımlama yöntemi olduğundan bahsedilmişti.
1. `let`
2. `const`
3. `var`

`let` ve `const` Sözcüksel Ortam anlamında birbiri ile tam olarak aynıdır.

Fakat `var` bunlardan çok farklıdır. Bunun dilin ilk oluşmaya başladığı zamanlara dayanır. Genelde modern stilde pek kullanılmazlar fakat yine de arada sırada görebilirsiniz.

Eğer böyle bir yazımla karşılaşmayacağınıza eminseniz bu bölümü geçebiir veya sonra tekrar gelebilirsiniz.
[cut]

İlk görüşte `var` `let` ile benzer şekilde çalışıyormuş gibi görünür. İkisi de değişken tanımlamaya yarar:

```js run
function selamVer() {
  var terim = "Merhaba"; // yerel değişken "let" yerine "var" kullanılmıştır.
  alert(terim); // Merhaba
}

selamVer();

alert(terim); // Hata! terim tanımlı değil.
```

...Fakat farklılık tam da burada ortaya çıkar.

## "var"'ın blok kapsamı yoktur

`var` ya fonksiyon içinde yada globalde tanımlanır, diğer türlü tüm bloklar içerisinden erişilebilir.

Örneğin:

```js
if (true) {
  var test = true; // "let" yerine "var" kullanıldı
}

*!*
alert(test); // true, değişken if'ten sonra da varlığına devam etti.
*/!*
```
Eğer 2. satırda `let test` kullanılsaydı `alert` içerisinde görünür olmazdır. Fakat `var` kod bloğunu görmezden gelir. Bundan dolayı global bir `test` değişkeni olmuş olur.

Aynı şekilde döngüler için de `var` döngünün dışında da erişilebilirdir:

```js
for(var i = 0; i < 10; i++) {
  // ...
}

*!*
alert(i); // 10,"i" döngüden sonra görülebilirdir, evrensel değişken olarak çalışır.
*/!*
```

Eğer fonksiyonun içinde bir `if` bloğu varsa bu durumda `var` fonksiyon seviyesinde bir değişken olur:

```js
function selamVer() {
  if (true) {
    var terim = "Merhaba";
  }

  alert(terim); // çalışıyor
}

selamVer();
alert(terim); // Hata: terim tanımlı değildir.
```

Eğer `if`, `for`'a rağmen çalışan `var` değişkenleri görürseniz bunun nedeni önceden JavaScript'te blokların Sözcüksel Ortama dahil olmamasındandır.

## "var" fonksiyon çalışmaya başladığında işlenir.

`var` tanımları fonksiyon ( veya script ) çalıştığında tanımlanır.

Diğer bir deyişle `var` değişkenleri fonksiyon başlangıcında tanımlanır, tanımın nerede olduğu önemli değil. ( iç içe fonksiyonları hariç tabi )

Aşağıdaki koda bakarsanız:

```js
function selamVer() {
  terim = "Merhaba";

  alert(terim);

*!*
  var terim;
*/!*
}
```
...Teknik olarak aşağıdaki gibidir.

```js
function selamVer() {
*!*
  var terim;
*/!*

  terim = "Merhaba";

  alert(terim);
}
```
...Hatta şu şekilde de olabilir:

```js
function selamVer() {
  terim = "Merhaba"; // (*)

  *!*
  if (false) {
    var terim;
  }
  */!*

  alert(terim);
}
```
Bu davranışa "yükseltilme" davranışı da denir, çünkü tüm `var` ile tanımlamalar fonksiyonun başına "yükseltilme"

Bundan dolayı yukarıdaki örnekte `if(false)` hiçbir zaman çalışmayacaktır, zaten önemli de değildir. İçinde bulunan `var` fonksiyonun başında işlenir. Yani `(*)` anında zaten `terim` değişkeni vardır.

**Tanımlar yükseltilir fakat atamalar yükseltilmez**

Bir örnekle göstermek gerekirse:

```js run
function selamVer() {
  alert(terim);  

*!*
  var terim = "Merhaba";
*/!*
}

selamVer();
```
`var terim = "Merhaba"` iki tane aksiyon barındırır:

1. Değişken tanımlama `var` 
2. Değişken atama `=`.

Tanımlama "yükseltilme" işlemi ile fonksiyon başlangıcında yapılır. Fakat atama kod neredeyse orada yapılır. Bundan dolayı kod aslında tam olarak aşağıdaki gibi çalışır:

```js run
function selamVer() {
*!*
  var terim; // tanımalma başlangıçta çalışır.
*/!*

  alert(terim); // tanımsız

*!*
  terim = "Merhaba"; // ...atama burada yapılır.
*/!*
}

selamVer();
``` 
  
Tüm `var` tanımları fonksiyon başladığında işlendiğinden dolayı, istenildiği yerlere bu değişkenlere erişim bulunmaktadır. Fakat değişkenler atama yapılana kadar tanımsızdır ( undefined ).

Yukarıdaki her iki `alert` örneği de hatasız çalışmaktadır çünkü `terim` mevcuttur. Değeri atanmadığından `undefined` göstermiştir.

## Özet

`var`'ın iki tane ana farklılığı mevcuttur:

1. Değişkenlerin blok limiti yoktur. En düşük fonksiyon içerisinden görünebilirler. Yani aynı fonksiyon içerisinde farklı bir bloğun içinde yazılsa bile fonksiyon içinden erişilebilmektedir.
2. Değişkenlerin tanımlanması fonksiyon başladığında gerçekleşir.

Evrensel obje söz konusu olduğunda bir farklılık bulunmaktadır bunu bir sonraki bölümde göreceğiz.

Bu farklılıklar aslında kötüdür. Öncelikle blok seviyesinde değişken yaratılmamaktadır. "Yükseltme" olayı hataya neden olabilmektedir. Bundan dolayı yeni kodlarda `var` çok nadir olarak kullanılır.
