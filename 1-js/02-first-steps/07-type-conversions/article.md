# Tip Dönüşümleri

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md
Çoğu zaman operatörler ve fonksiyonlar otomatik olarak değeri doğru tipe dönüştürürler. Buna "tip dönüştürme" denir.
=======
Most of the time, operators and functions automatically convert the values given to them to the right type.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c:1-js/02-first-steps/07-type-conversions/article.md

Örneğin `alert` otomatik olarak verilen tüm değerleri karakter dizisine çevirir ve ekranda gösterir. Matematiksel operatörler ise değerleri sayılara çevirir.

Tabi bunun yanında doğrudan tipi sizin tarafınızdan değiştirilmesi gereken değişkenler vardır.

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md
```smart header="Objeler hakkında konuşulmayacak"
Bu bölümde objeler hakkında bilgi verilmeyecektir. Önce ilkel tiplerin iyice öğrenilmesi lazım, sonra objelerin öğrenilmesi ve daha sonra <info:object-toprimitive> bölümünde objelerin dönüştürülmesi öğrenilebilir. 
=======
```smart header="Not talking about objects yet"
In this chapter, we won't cover objects. For now we'll just be talking about primitives.

Later, after we learn about objects, in the chapter <info:object-toprimitive> we'll see how objects fit in.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c:1-js/02-first-steps/07-type-conversions/article.md
```

## String Conversion

Bir değeri karakter dizisi olarak kullanmak istiyorsanız ToString'i kullanabilirsiniz.

Örneğin `alert(deger)` değeri gösterir. Ayrıca `String(deger)` de kullanılabilir.

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // Şimdi değer karakter dizisi =  "true"
alert(typeof value); // karakter dizisi
*/!*
```
Eğer `false` değeri karakter dizisi dönüştürme işlemine tabi tutarsanız `"false"`, `null`'u tutarsanız `"null"` olur.

## Numeric Conversion

Sayısal dünüştürme işlemleri matematiksel operasyonlarda otomatik olarak gerçekleşir.

Örnğin sayı olmayan iki değer `/` işlemine tutulduğunda:

```js run
alert( "6" / "2" ); // 3, karakterler sayılara dönüştürülür ve işlem öyle yapılır.
```
Eğer isterseniz `Number(value)` fonksiyonu ile değeri sayıya dönüştürebilirsiniz:


```js run
let str = "123";
alert(typeof str); // string

let num = Number(str); // sayı olan 123

alert(typeof num); // number
```
Bu şekilde fonksiyon ile değer dönüştürme işlemi genelde karakter dizi olarak aldığımız formlarda kullanılır. Aslında sayı kullanılmak istenmektedir. Fakat yazı kutusunun içeriğine sayı dahilinde yazılanları kontrol etmeniz gerekmektedir. Böyle bir fonksiyona sayı olmayan bir değer geldiğinde fonksiyon `NaN` değeri döndürür. Yani (Not a number) sayı değil.

```js run
let age = Number("Bir sayı yerine her hangi bir yazı");

alert(age); // NaN, dönüştüremedi!
```

Sayısal dönüştürme kuralları:

| Değer |  Sonuç... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;ve&nbsp;false</code> | `1` veya `0` |
| `string` | Önce başta ve sondaki whitespace'ler silinir. Sonra eğer kalan değerde hiç bir karakter yok ise sonuç `0`. Eğer içerisinde sayısal olmayan bir değer var ise bu durumda `NaN` değeri alınır. |

Örnekler:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (Hata "z" bir rakam değil)
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

Lütfen `null` ve `undefined`'ın aynı davranmadıklarını bilin. `null` 0 olurken `undefined` `NaN` yani sayı değildir.

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md
````smart header="Ekleme karakteri '+'"

Neredeyse tüm matematiksel operasyonlar önce değerleri sayılara çevirmeye çalışır. Eğer bir taraf sayıya çevrilemediyse bu durumda karakter olarak diğeri ile birleştirme işlemi yapılır.

Bu birleştirme işlemine örnek:

```js run
alert( 1 + '2' ); // '12' (Sağ tarafta karakter var)
alert( '1' + 2 ); // '12' (Sol tarafta karakter var)
```

Gördüğünüz gibi sadece bir tarafın karakter olması yeterlidir. Eğer iki tarafta sayıya dönüşebiliyorsa bu durumda gerçek toplama işlemi yapılır.
````
=======
Most mathematical operators also perform such conversion, we'll see that in the next chapter.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c:1-js/02-first-steps/07-type-conversions/article.md

## Boolean Conversion

Boolean dönüştürme en kolay olanıdır.

Lojik operasyonlarda ( durum testlerinde bu operasyonları işlenecek ) otomatik olarak bu dönüştürme gerçekleşir. Bunun yanında gerekli olduğunda `Boolean(value)` da kullanılabilir.

Dönüştürücü kuralları:

- "boş" olan  `0`, veya boş karakter dizisi, `null`, `undefined` , `Nan` gibi değerler `false` olur.
- Diğer türlü değerler `true` olur. 

Örneğin:

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("merhaba") ); // true
alert( Boolean("") ); // false
```

````warn header="Dikkat: karakter olan `\"0\"` `true`'dur"

PHP giib bazı diller `"0"`'ı `false` olarak alırlar. Fakat JavaScript için boş olmayan karakter dizileri her zaman `true` olur.

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // içerisinde boşluk olan karakter dizisi true olur.
```
````

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md

## Özet
=======
## Summary
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c:1-js/02-first-steps/07-type-conversions/article.md

Üç tane çok kullanılan tip dönüştürücü bulunmaktadır : Karakter Dizisine dönüştüren, sayıya dönüştüren ve boolean değere dönüştüren.

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md
**`ToString`** -- Bir çıktı verildiğinde otomatik olarak bu fonksiyon çalışır. `String(value)` kullanılarak da dönüştürme işlemi yapılabilir.

**`ToNumber`** -- Matematiksel operasyonlar otomatik olarak yaparlar. Ayrıca `Number(value)` ile de dönüştürme işlemi yapılabilir.
=======
**`String Conversion`** -- Occurs when we output something. Can be performed with `String(value)`. The conversion to string is usually obvious for primitive values.

**`Numeric Conversion`** -- Occurs in math operations. Can be performed with `Number(value)`.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c:1-js/02-first-steps/07-type-conversions/article.md


Dönüştürme işlemi aşağıdaki kuralları kapsar:

| Değer |  Sonuç... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
| `string` | Önce başta ve sondaki whitespace'ler silinir. Sonra eğer kalan değerde hiç bir karakter yok ise sonuç `0`. Eğer içerisinde sayısal olmayan bir değer var ise bu durumda `NaN` değeri alınır. |

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md
**`ToBoolean`** -- Lojik operatörlerde otomatik çalışır ayrıca  `Boolean(value)` ile de dönüştürme işlemi yapılabilir.
=======
**`Boolean Conversion`** -- Occurs in logical operations. Can be performed with `Boolean(value)`.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c:1-js/02-first-steps/07-type-conversions/article.md

Kuralları şu şekildedir:

| Değer |  Sonuç... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|diğer her türlü değer| `true` |

Bu kuralların çoğu akılda kalıcıdır. Genelde progamcıların hata yaptıkları yer:

- `undefined` sayı olarak `NaN`'dır halbuki `null` sayı olarak `0` dır. 
- `"0"` bu ve `"  "` bu karakter dizisi boolean olarak ikisi de true olarak dönüşür.

Objeler bu bölüme konu edinmedi. Daha sonra <info:object-toprimitive> konusunda özel olarak objeler hakkında bilgi verilecektir.
