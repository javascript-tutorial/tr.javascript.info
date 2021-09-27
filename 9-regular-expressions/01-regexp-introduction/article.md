# Kalıplar ve işaretler

<<<<<<< HEAD
Düzenli ifadeler, metinde arama ve değiştirme yapmak için etkili bir yöntem sağlayan kalıplardır.

JavaScript'te, [RegExp](mdn:js/RegExp) nesnesi aracılığıyla kullanılabilirler ve ayrıca string metotlarına entegre edilmişlerdir.

## Düzenli İfadeler

Bir düzenli ifade ("regexp" veya sadece "reg") bir _kalıp_ ve isteğe bağlı *işaretler*den oluşur.

Düzenli ifade nesnesi oluşturmak için kullanılabilecek iki sözdizimi vardır.

Uzun olan sözdizimi:
=======
Regular expressions are patterns that provide a powerful way to search and replace in text.

In JavaScript, they are available via the [RegExp](mdn:js/RegExp) object, as well as being integrated in methods of strings.

## Regular Expressions

A regular expression (also "regexp", or just "reg") consists of a *pattern* and optional *flags*.

There are two syntaxes that can be used to create a regular expression object.

The "long" syntax:
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115

```js
regexp = new RegExp("kalıp", "işaretler");
```

<<<<<<< HEAD
Ve bölme işareti "/" kullanan kısa olanı:
=======
And the "short" one, using slashes `"/"`:
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115

```js
regexp = /kalıp/; // işaret yok
regexp = /kalıp/gim; // g, m ve i işaretleriyle birlikte (yakında ele alınacak)
```

<<<<<<< HEAD
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
=======
Slashes `pattern:/.../` tell JavaScript that we are creating a regular expression. They play the same role as quotes for strings.

In both cases `regexp` becomes an instance of the built-in `RegExp` class.

The main difference between these two syntaxes is that pattern using slashes `/.../` does not allow for expressions to be inserted (like string template literals with `${...}`). They are fully static.

Slashes are used when we know the regular expression at the code writing time -- and that's the most common situation. While `new RegExp` is more often used when we need to create a regexp "on the fly" from a dynamically generated string. For instance:

```js
let tag = prompt("What tag do you want to find?", "h2");

let regexp = new RegExp(`<${tag}>`); // same as /<h2>/ if answered "h2" in the prompt above
```

## Flags

Regular expressions may have flags that affect the search.

There are only 6 of them in JavaScript:

`pattern:i`
: With this flag the search is case-insensitive: no difference between `A` and `a` (see the example below).

`pattern:g`
: With this flag the search looks for all matches, without it -- only the first match is returned.

`pattern:m`
: Multiline mode (covered in the chapter <info:regexp-multiline-mode>).

`pattern:s`
: Enables "dotall" mode, that allows a dot `pattern:.` to match newline character `\n` (covered in the chapter <info:regexp-character-classes>).

`pattern:u`
: Enables full Unicode support. The flag enables correct processing of surrogate pairs. More about that in the chapter <info:regexp-unicode>.

`pattern:y`
: "Sticky" mode: searching at the exact position in the text  (covered in the chapter <info:regexp-sticky>)
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115

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

<<<<<<< HEAD
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
=======
## Searching: str.match

As mentioned previously, regular expressions are integrated with string methods.

The method `str.match(regexp)` finds all matches of `regexp` in the string `str`.

It has 3 working modes:

1. If the regular expression has flag `pattern:g`, it returns an array of all matches:
    ```js run
    let str = "We will, we will rock you";

    alert( str.match(/we/gi) ); // We,we (an array of 2 substrings that match)
    ```
    Please note that both `match:We` and `match:we` are found, because flag `pattern:i` makes the regular expression case-insensitive.

2. If there's no such flag it returns only the first match in the form of an array, with the full match at index `0` and some additional details in properties:
    ```js run
    let str = "We will, we will rock you";

    let result = str.match(/we/i); // without flag g

    alert( result[0] );     // We (1st match)
    alert( result.length ); // 1

    // Details:
    alert( result.index );  // 0 (position of the match)
    alert( result.input );  // We will, we will rock you (source string)
    ```
    The array may have other indexes, besides `0` if a part of the regular expression is enclosed in parentheses. We'll cover that in the chapter  <info:regexp-groups>.

3. And, finally, if there are no matches, `null` is returned (doesn't matter if there's flag `pattern:g` or not).

    This a very important nuance. If there are no matches, we don't receive an empty array, but instead receive `null`. Forgetting about that may lead to errors, e.g.:

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Error: Cannot read property 'length' of null
      alert("Error in the line above");
    }
    ```

    If we'd like the result to always be an array, we can write it this way:
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
<<<<<<< HEAD
      alert("Eşleşme yok"); // şimdi çalışıyor
    }
    ```

## Yer değiştirme: str.replace

`str.replace(regexp, yeni_str)` metodu, string `str`'de `regexp` kullanılarak bulunan eşleşmeleri `yeni_str` ile değiştirir (`pattern:g` işareti varsa tüm eşleşmeler, aksi takdirde yalnızca ilk olanı).

Örneğin:
=======
      alert("No matches"); // now it works
    }
    ```

## Replacing: str.replace

The method `str.replace(regexp, replacement)` replaces matches found using `regexp` in string `str` with `replacement` (all matches if there's flag `pattern:g`, otherwise, only the first one).

For instance:
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115

```js run
// no flag g
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// with flag g
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will
```

<<<<<<< HEAD
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
=======
The second argument is the `replacement` string. We can use special character combinations in it to insert fragments of the match:

| Symbols | Action in the replacement string |
|--------|--------|
|`$&`|inserts the whole match|
|<code>$&#096;</code>|inserts a part of the string before the match|
|`$'`|inserts a part of the string after the match|
|`$n`|if `n` is a 1-2 digit number, then it inserts the contents of n-th parentheses, more about it in the chapter <info:regexp-groups>|
|`$<name>`|inserts the contents of the parentheses with the given `name`, more about it in the chapter <info:regexp-groups>|
|`$$`|inserts character `$` |

An example with `pattern:$&`:
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115

```js run
alert( "I love HTML".replace(/HTML/, "$& and JavaScript") ); // I love HTML and JavaScript
```

<<<<<<< HEAD
## Test: regexp.test

`regexp.test(str)` metodu en az bir eşleşme arar, eşleşme bulunursa `true` değerini döndürür, aksi takdirde `false` değerini döndürür.

=======
## Testing: regexp.test

The method `regexp.test(str)` looks for at least one match, if found, returns `true`, otherwise `false`.
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115

```js run
let str = "I love JavaScript";
let regexp = /LOVE/i;

alert( regexp.test(str) ); // true
```

<<<<<<< HEAD
Bu bölümün ilerleyen kısımlarında düzenli ifadeler üzerinde daha fazla çalışacağız, daha fazla örnek üzerinde duracağız ve diğer metotlarla da karşılaşacağız.

Metotlar hakkında tam bilgi <info:regexp-methods> makalesinde verilmiştir.
=======
Later in this chapter we'll study more regular expressions, walk through more examples, and also meet other methods.

Full information about the methods is given in the article <info:regexp-methods>.
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115

## Özet

<<<<<<< HEAD
- Düzenli ifade bir kalıp ve isteğe bağlı işaretlerden oluşur: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- İşaretler ve özel semboller olmadan (daha sonra inceleyeceğiz) düzenli ifadelerle arama bir substring aramasıyla aynıdır.
- `str.match(regexp)` metodu eşleşmeleri arar: `pattern:g` işareti varsa tümü, aksi takdirde yalnızca birincisini döner.
- `str.replace(regexp, yeni_str)` metodu, `regexp` kullanılarak bulunan eşleşmeleri `yeni_str` ile değiştirir: `pattern:g` işareti varsa tümünü, aksi takdirde yalnızca ilkini değiştirir.
- `regexp.test(str)` metodu en az bir eşleşme varsa `true` değerini döndürür, aksi takdirde `false` değerini döndürür.
=======
- A regular expression consists of a pattern and optional flags: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Without flags and special symbols  (that we'll study later), the search by a regexp is the same as a substring search.
- The method `str.match(regexp)` looks for matches: all of them if there's `pattern:g` flag, otherwise, only the first one.
- The method `str.replace(regexp, replacement)` replaces matches found using `regexp` with `replacement`: all of them if there's `pattern:g` flag, otherwise only the first one.
- The method `regexp.test(str)` returns `true` if there's at least one match, otherwise, it returns `false`.
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115
