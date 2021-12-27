<<<<<<< HEAD
# Karakter Sınıfları

Size pratik bir görev verildiğini düşünün -- `"+7(903)-123-45-67"` gibi bir telefon numaramız var, ve bunu sadece sayılara dönüştürmemiz gerekiyor: `79035419441`.

Bunu yapmak için sayı olmayan herhangi bir şeyi bulabilir ve kaldırabiliriz. Karakter sınıfları bu konuda yardımcı olabilir.

*Karakter sınıfı*, belirli bir kümedeki herhangi bir sembolle eşleşen özel bir gösterimdir.

Başlangıç için "rakam" sınıfını keşfedelim. `pattern:\d` olarak yazılır ve "herhangi bir tek basamağa" karşılık gelir.

Örneğin, telefon numarasındaki ilk haneyi bulalım:
=======
# Character classes

Consider a practical task -- we have a phone number like `"+7(903)-123-45-67"`, and we need to turn it into pure numbers: `79031234567`.

To do so, we can find and remove anything that's not a number. Character classes can help with that.

A *character class* is a special notation that matches any symbol from a certain set.

For the start, let's explore the "digit" class. It's written as `pattern:\d` and corresponds to "any single digit".

For instance, let's find the first digit in the phone number:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/;

alert( str.match(regexp) ); // 7
```

<<<<<<< HEAD
`pattern:g` işareti olmadan, düzenli ifade yalnızca ilk eşleşmeyi arar, yani ilk `pattern:\d` rakamını arar.

Tüm rakamları bulmak için `pattern:g` işaretini ekleyelim:
=======
Without the flag `pattern:g`, the regular expression only looks for the first match, that is the first digit `pattern:\d`.

Let's add the `pattern:g` flag to find all digits:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/g;

<<<<<<< HEAD
alert( str.match(regexp) ); // eşleşenler dizisi: 7,9,0,3,1,2,3,4,5,6,7

// bunlardan sadece rakamlardan oluşan telefon numarası yapalım:
alert( str.match(regexp).join('') ); // 79035419441
```

Bu rakamlar için bir karakter sınıfıydı. Başka karakter sınıfları da var.

En çok kullanılanlar:

`pattern:\d` ("d" İngilizce "digit" kelimesinden geliyor)
: Bir rakam: `0`'dan `9`'a bir karakter.

`pattern:\s` ("s" İngilizce "space" kelimesinden geliyor)
: Bir boşluk sembolü: boşluklar, tablar `\t`, yeni satırlar `\n` ve `\v`, `\f`, `\r` gibi nadir karakterleri içerir.

`pattern:\w` ("w" İngilizce "word" kelimesinden geliyor)
: Kelime karakteri: Latin alfabesinde bir harf ya da bir rakam ya da alt çizgi `_`. Latince olmayan harfleri kapsamaz (Kiril veya Hintçe gibi).

Örneğin, `pattern:\d\s\w`  bir rakam, ardından bir boşluk sembolü ve onun ardından bir kelime karakteri anlamına gelir, `match:1 a` gibi.

**Düzenli ifadeler hem normal semboller hem de karakter sınıfları içerebilir.**

Örneğin, `pattern:CSS\d`, ardından bir rakam gelen `match:CSS` ile eşleşir:
=======
alert( str.match(regexp) ); // array of matches: 7,9,0,3,1,2,3,4,5,6,7

// let's make the digits-only phone number of them:
alert( str.match(regexp).join('') ); // 79031234567
```

That was a character class for digits. There are other character classes as well.

Most used are:

`pattern:\d` ("d" is from "digit")
: A digit: a character from `0` to `9`.

`pattern:\s` ("s" is from "space")
: A space symbol: includes spaces, tabs `\t`, newlines `\n` and few other rare characters, such as `\v`, `\f` and `\r`.

`pattern:\w` ("w" is from "word")
: A "wordly" character: either a letter of Latin alphabet or a digit or an underscore `_`. Non-Latin letters (like cyrillic or hindi) do not belong to `pattern:\w`.

For instance, `pattern:\d\s\w` means a "digit" followed by a "space character" followed by a "wordly character", such as `match:1 a`.

**A regexp may contain both regular symbols and character classes.**

For instance, `pattern:CSS\d` matches a string `match:CSS` with a digit after it:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```js run
let str = "Is there CSS4?";
let regexp = /CSS\d/

alert( str.match(regexp) ); // CSS4
```

<<<<<<< HEAD
Ayrıca birçok karakter sınıfını aynı anda kullanabiliriz:
=======
Also we can use many character classes:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```js run
alert( "I love HTML5!".match(/\s\w\w\w\w\d/) ); // ' HTML5'
```

<<<<<<< HEAD
Eşleşme (her karakter sınıfı, ona karşılık gelen bir karaktere sahip):

![](love-html5-classes.svg)

## Ters sınıflar

Her karakter sınıfı için aynı harfle gösterilen, ancak büyük harfle yazılmış bir "ters sınıf" vardır.

"Ters", diğer tüm karakterlerle eşleştiği anlamına gelir, örneğin:

`pattern:\D`
: Rakam olmayan: `pattern:\d` hariç herhangi bir karakter, örneğin bir harf.

`pattern:\S`
: Boşluk olmayan: `pattern:\s` hariç herhangi bir karakter, örneğin bir harf.

`pattern:\W`
: Kelime karakteri olmayan: `pattern:\w` hariç herhangi bir karakter, yani Latin olmayan bir karakter veya boşluk sembolü.

Bu bölümün başlangıcında, `subject:+7(903)-123-45-67` gibi bir string'den, yalnızca numaralardan oluşan telefon numarasının nasıl yapıldığını gördük: tüm rakamları bul ve birleştir.
=======
The match (each regexp character class has the corresponding result character):

![](love-html5-classes.svg)

## Inverse classes

For every character class there exists an "inverse class", denoted with the same letter, but uppercased.

The "inverse" means that it matches all other characters, for instance:

`pattern:\D`
: Non-digit: any character except `pattern:\d`, for instance a letter.

`pattern:\S`
: Non-space: any character except `pattern:\s`, for instance a letter.

`pattern:\W`
: Non-wordly character: anything but `pattern:\w`, e.g a non-latin letter or a space.

In the beginning of the chapter we saw how to make a number-only phone number from a string like `subject:+7(903)-123-45-67`: find all digits and join them.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```js run
let str = "+7(903)-123-45-67";

alert( str.match(/\d/g).join('') ); // 79031234567
```

<<<<<<< HEAD
Alternatif, daha kısa bir yol, rakam olmayan `pattern:\D` karakterleri bulmak ve bunları dizeden kaldırmaktır:
=======
An alternative, shorter way is to find non-digits `pattern:\D` and remove them from the string:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```js run
let str = "+7(903)-123-45-67";

alert( str.replace(/\D/g, "") ); // 79031234567
```

<<<<<<< HEAD
## Nokta "herhangi bir karakter"tir

Nokta `pattern:.` yeni satır dışındaki herhangi bir karakterle eşleşen özel bir karakter sınıfıdır.

Örneğin:
=======
## A dot is "any character"

A dot `pattern:.` is a special character class that matches "any character except a newline".

For instance:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```js run
alert( "Z".match(/./) ); // Z
```

<<<<<<< HEAD
Veya düzenli ifadenin ortasında:
=======
Or in the middle of a regexp:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```js run
let regexp = /CS.4/;

alert( "CSS4".match(regexp) ); // CSS4
alert( "CS-4".match(regexp) ); // CS-4
<<<<<<< HEAD
alert( "CS 4".match(regexp) ); // CS 4 (boşlukta bir karakter)
```

Bir noktanın "herhangi bir karakter" anlamına geldiğini, ancak "karakterin olmaması" anlamına gelmediğini lütfen unutmayın. Eşleşecek bir karakter olmalı:

```js run
alert( "CS4".match(/CS.4/) ); // null, eşleşme yok çünkü nokta için karakter yok
```

### "s" işareti, kelimenin tam anlamıyla herhangi bir karakter olarak nokta

Normalde, bir nokta yeni satır `\n` karakteriyle eşleşmiyor.

Örneğin, `pattern:A.B`, aralarında herhangi bir karakter olan `match:A` ve `match:B` ile eşleşir, yeni satır `\n` hariç:

```js run
alert( "A\nB".match(/A.B/) ); // null (eşleşme yok)
```

Noktanın kelimenin tam anlamıyla "herhangi bir karakter" anlamına gelmesini istediğimiz birçok durum vardır, yeni satır dahil.

`pattern:s` işte bunu yapar. Eğer düzenli ifadede varsa, nokta `pattern:.` tam anlamıyla herhangi bir karakter ile eşleşir:

```js run
alert( "A\nB".match(/A.B/s) ); // A\nB (eşleşti!)
```

````warn header="Firefox, IE, Edge bunu desteklemiyor"
En son destek durumu için <https://caniuse.com/#search=dotall> adresini ziyaret edin. Bu makale yazılırken, Firefox, IE, Edge desteklemiyordu.

Neyse ki, her yerde çalışan bir alternatif var. Herhangi bir karakteri eşleştirmek için `pattern:[\s\S]` gibi bir normal ifade kullanabiliriz.

```js run
alert( "A\nB".match(/A[\s\S]B/) ); // A\nB (eşleşti!)
```

`pattern:[\s\S]` tam anlamıyla şu anlama geliyor: "boşluk karakteri VEYA boşluk karakteri değil". Başka bir deyişle, "her şey". Bunun için başka bir karakter sınıfı da kullanabiliriz, `pattern:[\d\D]` gibi.

Bu numara her yerde çalışıyor. Ayrıca, bunu kalıpta normal "yeni satırla eşleşmeyen" nokta istediğimiz durumlarda `pattern: s` işaretini istemiyorsak kullanabiliriz.
````

````warn header="Pay attention to spaces"
Genellikle boşluklara çok az dikkat ederiz. Bizim için `subject:1-5` ve `subject:1 - 5` string'leri neredeyse aynıdır.

Ancak düzenli ifade boşlukları dikkate almazsa, işe yaramayabilir.

Kısa çizgi ile ayrılmış rakamları bulmaya çalışalım:

```js run
alert( "1 - 5".match(/\d-\d/) ); // null, eşleşme yok
```

Bunu boşluk ekleyerek düzeltelim `pattern:\d - \d`:

```js run
alert( "1 - 5".match(/\d - \d/) ); // 1 - 5, şimdi çalışıyor
// veya \s sınıfını kullanabiliriz:
alert( "1 - 5".match(/\d\s-\s\d/) ); // 1 - 5, bu da çalışıyor
```

**Boşluk bir karakterdir. Diğer herhangi bir karakterle aynı derecede önemlidir.**

Düzenli ifadeye boşluk ekleyip veya ifadeden boşluk kaldırdıktan sonra bu ifadenin aynı şekilde çalışmasını bekleyemeyiz.

Başka bir deyişle, normal bir ifadede tüm karakterler önemlidir, boşluklar da.
````

## Özet

Aşağıdaki karakter sınıfları vardır:

- `pattern:\d` -- rakamlar.
- `pattern:\D` -- rakam olmayanlar.
- `pattern:\s` -- boşluk sembolleri, tablar, yeni satırlar.
- `pattern:\S` -- `pattern:\s` olmayan.
- `pattern:\w` -- Latin harfler, rakamlar, alt çizgi `'_'`.
- `pattern:\W` -- `pattern:\w` olmayan.
- `pattern:.` -- `'s'` varsa gerçekten herhangi bir karakter, yoksa yeni satır `\n` hariç herhangi bir karakter.

...Ama hepsi bu değil!

String'ler için JavaScript tarafından kullanılan Unicode kodlama, karakterler için birçok özellik sağlar, örneğin: bir karakterin hangi dile ait olduğu (eğer bir harf ise) veya karakterin bir noktalama işareti olup olmadığı vb.

Bu özelliklere göre de arama yapabiliriz. Bu, bir sonraki makalede ele alınan `pattern:u` işaretini gerektirir.
=======
alert( "CS 4".match(regexp) ); // CS 4 (space is also a character)
```

Please note that a dot means "any character", but not the "absence of a character". There must be a character to match it:

```js run
alert( "CS4".match(/CS.4/) ); // null, no match because there's no character for the dot
```

### Dot as literally any character with "s" flag

By default, a dot doesn't match the newline character `\n`.

For instance, the regexp `pattern:A.B` matches `match:A`, and then `match:B` with any character between them, except a newline `\n`:

```js run
alert( "A\nB".match(/A.B/) ); // null (no match)
```

There are many situations when we'd like a dot to mean literally "any character", newline included.

That's what flag `pattern:s` does. If a regexp has it, then a dot `pattern:.` matches literally any character:

```js run
alert( "A\nB".match(/A.B/s) ); // A\nB (match!)
```

````warn header="Not supported in IE"
The `pattern:s` flag is not supported in IE.

Luckily, there's an alternative, that works everywhere. We can use a regexp like `pattern:[\s\S]` to match "any character" (this pattern will be covered in the article <info:regexp-character-sets-and-ranges>).

```js run
alert( "A\nB".match(/A[\s\S]B/) ); // A\nB (match!)
```

The pattern `pattern:[\s\S]` literally says: "a space character OR not a space character". In other words, "anything". We could use another pair of complementary classes, such as `pattern:[\d\D]`, that doesn't matter. Or even the `pattern:[^]` -- as it means match any character except nothing.

Also we can use this trick if we want both kind of "dots" in the same pattern: the actual dot `pattern:.` behaving the regular way ("not including a newline"), and also a way to match "any character" with `pattern:[\s\S]` or alike.
````

````warn header="Pay attention to spaces"
Usually we pay little attention to spaces. For us strings `subject:1-5` and `subject:1 - 5` are nearly identical.

But if a regexp doesn't take spaces into account, it may fail to work.

Let's try to find digits separated by a hyphen:

```js run
alert( "1 - 5".match(/\d-\d/) ); // null, no match!
```

Let's fix it adding spaces into the regexp `pattern:\d - \d`:

```js run
alert( "1 - 5".match(/\d - \d/) ); // 1 - 5, now it works
// or we can use \s class:
alert( "1 - 5".match(/\d\s-\s\d/) ); // 1 - 5, also works
```

**A space is a character. Equal in importance with any other character.**

We can't add or remove spaces from a regular expression and expect it to work the same.

In other words, in a regular expression all characters matter, spaces too.
````

## Summary

There exist following character classes:

- `pattern:\d` -- digits.
- `pattern:\D` -- non-digits.
- `pattern:\s` -- space symbols, tabs, newlines.
- `pattern:\S` -- all but `pattern:\s`.
- `pattern:\w` -- Latin letters, digits, underscore `'_'`.
- `pattern:\W` -- all but `pattern:\w`.
- `pattern:.` -- any character if with the regexp `'s'` flag, otherwise any except a newline `\n`.

...But that's not all!

Unicode encoding, used by JavaScript for strings, provides many properties for characters, like: which language the letter belongs to (if it's a letter), is it a punctuation sign, etc.

We can search by these properties as well. That requires flag `pattern:u`, covered in the next article.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
