# Kalıplar ve işaretler

Düzenli ifadeler, metinde arama ve değiştirme yapmak için etkili bir yöntem sağlayan kalıplardır.

JavaScript'te, [RegExp](mdn:js/RegExp) nesnesi aracılığıyla kullanılabilirler ve ayrıca string metotlarına entegre edilmişlerdir.

## Düzenli İfadeler

Bir düzenli ifade ("regexp" veya sadece "reg") bir _kalıp_ ve isteğe bağlı *işaretler*den oluşur.

Düzenli ifade nesnesi oluşturmak için kullanılabilecek iki sözdizimi vardır.

Uzun olan sözdizimi:

```js
regexp = new RegExp("kalıp", "işaretler");
```

Ve bölme işareti "/" kullanan kısa olanı:

```js
regexp = /kalıp/; // işaret yok
regexp = /kalıp/gim; // g, m ve i işaretleriyle birlikte (yakında ele alınacak)
```

Bölme işaretleri `pattern:/.../` JavaScript'e düzenli bir ifade oluşturduğumuzu söyler. Aynı tırnak işaretlerinin String oluşturduğumuzu söylediği gibi.

Her iki durumda da `regexp`, `RegExp` sınıfının bir örneği oluşturulmuş olur.

Bu ikisi arasındaki temel fark, bölme işareti `/.../` kullanan modelin kalıba expression eklenmesine izin vermemesidir (`${...}` kullanan string şablonları gibi). Tamamen statiktirler.

Bölme işaretleri, kod yazarken düzenli ifadeyi önceden bildiğimizde kullanılır -- ve bu en yaygın durumdur. `new RegExp` ise, dinamik olarak oluşturulan bir string'den anında bir regexp oluşturmamız gerektiğinde daha sık kullanılır. Örneğin:

```js
let tag = prompt("Hangi tag'i bulmak istiyorsun?", "h2");

let regexp = new RegExp(`<${tag}>`); //  yukarıdaki prompt'a "h2" cevabı verildiyse,  /<h2>/ ile aynı olur.
```

## İşaretler

Düzenli ifadelerde aramayı etkileyen işaretler olabilir.

JavaScript'te bunlardan sadece 6 tanesi var:

`pattern:i`
: Bu işaretle arama, büyük/küçük harfe duyarlı değildir: `A` ve `a` arasında fark yoktur (aşağıdaki örneğe bakın).

`pattern:g`
: Bu işaretle arama, tüm eşleşenleri arar. Eğer g işareti yoksa, sadece ilk eşleme döndürülür.

`pattern:m`
: Çok satırlı mod (<info:regexp-multiline-mode> bölümünde ele alınmıştır).

`pattern:s`
: Yeni satır karakteri `\n` ile eşleşmek için noktaya `pattern:.` izin veren “dotall” modunu etkinleştirir. (<info:regexp-character-classes> bölümünde ele alınmıştır).

`pattern:u`
: Tam unicode desteğini etkinleştirir. Bu işaret, vekil çiftlerin doğru işlenmesini sağlar. Bununla ilgili daha fazla bilgi <info:regexp-unicode> bölümünde.

`pattern:y`
: “Yapışkan” mod: metindeki tam pozisyonu arar (<info:regexp-sticky> bölümünde ele alınmıştır)

```smart header="Renkler"
Buradan itibaren renk şeması şu şekilde olacak:

- regexp -- `pattern:red`
- string (aradığımız yer) -- `subject:blue`
- sonuç  -- `match:green`
```

## Arama: str.match

Daha önce de belirtildiği gibi, düzenli ifadeler string metotlarına entegre edilmiştir.

`str.match(regexp)` metodu `regexp` ile `str` stringindeki tüm eşleşmeleri bulur.

3 çalışma modu vardır:

1. Düzenli ifadede `pattern:g` işareti varsa, tüm eşleşmelerden oluşan bir dizi döndürür:

    ```js run
    let str = "We will, we will rock you";

    alert( str.match(/we/gi) ); // We,we (eşleşen 2 string'den oluşan bir dizi)
    ```
    Hem `match:We` hem de `match:we`'nin bulunduğuna dikkat edin, çünkü `pattern:i` işareti aramayı büyük/küçük harfe duyarsız hale getirir.

2. Eğer `pattern:g` işareti yoksa, yalnızca ilk eşleşmeyi döndürür. Dönen ifade bir dizi formundadır. İlk eşleşme dizininin `0` indeksinde yer alır ve dizinin bazı ek ayrıntılar sağlayan property'leri vardır:
    ```js run
    let str = "We will, we will rock you";

    let result = str.match(/we/i); // g işareti olmadan

    alert( result[0] );     // We (ilk eşleşme)
    alert( result.length ); // 1

    // Details:
    alert( result.index );  // 0 (eşlemenin string'deki pozisyonu)
    alert( result.input );  // We will, we will rock you (kaynak string)
    ```
    Düzenli ifadenin bir kısmı parantez içine alınmışsa dizinin `0` dışında başka indeksleri de olabilir. Bunu, <info:regexp-groups> bölümünde ele alacağız.

3. Son olarak, eşleşme yoksa `null` döndürülür (`pattern:g` işareti olup olmadığı önemli değildir).

    Bu çok önemli bir nüans. Eşleşme yoksa boş bir dizi almıyoruz, bunun yerine `null` alıyoruz. Bunu unutmak hatalara neden olabilir, örneğin:

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Error: Cannot read property 'length' of null
      alert("Yukardaki satırda hata var");
    }
    ```

    Sonucun her zaman bir dizi olmasını istiyorsak, bunu şu şekilde yazabiliriz:

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
      alert("Eşleşme yok"); // şimdi çalışıyor
    }
    ```

## Yer değiştirme: str.replace

`str.replace(regexp, yeni_str)` metodu, string `str`'de `regexp` kullanılarak bulunan eşleşmeleri `yeni_str` ile değiştirir (`pattern:g` işareti varsa tüm eşleşmeler, aksi takdirde yalnızca ilk olanı).

Örneğin:

```js run
// no flag g
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// with flag g
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will
```

İkinci argüman, `yeni_str` bulunan eşlemenin yerine geçen string'dir. Eşleşmenin parçalarını eklemek için özel karakter kombinasyonları kullanabiliriz:

| Semboller | Değiştirilen yeni_str'de yapılan eylem |
|--------|--------|
|`$&`|tüm eşleşmeyi ekler|
|<code>$&#096;</code>|string'in eşleşmeden önce gelen kısmını ekler|
|`$'`|string'in eşleşmeden sonra gelen kısmını ekler|
|`$n`|`n` 1-2 basamaklı bir sayıysa, n. parantezlerin içeriğini ekler, bununla ilgili daha fazla bilgi <info:regexp-groups> bölümünde|
|`$<isim>`|`isim` adı verilen parantezlerin içeriğini ekler, daha fazlası <info:regexp-groups> bölümünde|
|`$$`|`$` karakterini ekler|

`pattern:$&` ile bir örnek::

```js run
alert( "I love HTML".replace(/HTML/, "$& and JavaScript") ); // I love HTML and JavaScript
```

## Test: regexp.test

`regexp.test(str)` metodu en az bir eşleşme arar, eşleşme bulunursa `true` değerini döndürür, aksi takdirde `false` değerini döndürür.


```js run
let str = "I love JavaScript";
let regexp = /LOVE/i;

alert( regexp.test(str) ); // true
```

Bu bölümün ilerleyen kısımlarında düzenli ifadeler üzerinde daha fazla çalışacağız, daha fazla örnek üzerinde duracağız ve diğer metotlarla da karşılaşacağız.

Metotlar hakkında tam bilgi <info:regexp-methods> makalesinde verilmiştir.

## Özet

- Düzenli ifade bir kalıp ve isteğe bağlı işaretlerden oluşur: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- İşaretler ve özel semboller olmadan (daha sonra inceleyeceğiz) düzenli ifadelerle arama bir substring aramasıyla aynıdır.
- `str.match(regexp)` metodu eşleşmeleri arar: `pattern:g` işareti varsa tümü, aksi takdirde yalnızca birincisini döner.
- `str.replace(regexp, yeni_str)` metodu, `regexp` kullanılarak bulunan eşleşmeleri `yeni_str` ile değiştirir: `pattern:g` işareti varsa tümünü, aksi takdirde yalnızca ilkini değiştirir.
- `regexp.test(str)` metodu en az bir eşleşme varsa `true` değerini döndürür, aksi takdirde `false` değerini döndürür.
