# Karakter Sınıfları

Size pratik bir görev verildiğini düşünün -- `"+7(903)-123-45-67"` gibi bir telefon numaramız var, ve bunu sadece sayılara dönüştürmemiz gerekiyor: `79035419441`.

Bunu yapmak için sayı olmayan herhangi bir şeyi bulabilir ve kaldırabiliriz. Karakter sınıfları bu konuda yardımcı olabilir.

*Karakter sınıfı*, belirli bir kümedeki herhangi bir sembolle eşleşen özel bir gösterimdir.

Başlangıç için "rakam" sınıfını keşfedelim. `pattern:\d` olarak yazılır ve "herhangi bir tek basamağa" karşılık gelir.

Örneğin, telefon numarasındaki ilk haneyi bulalım:

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/;

alert( str.match(regexp) ); // 7
```

`pattern:g` işareti olmadan, düzenli ifade yalnızca ilk eşleşmeyi arar, yani ilk `pattern:\d` rakamını arar.

Tüm rakamları bulmak için `pattern:g` işaretini ekleyelim:

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/g;

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

```js run
let str = "Is there CSS4?";
let regexp = /CSS\d/

alert( str.match(regexp) ); // CSS4
```

Ayrıca birçok karakter sınıfını aynı anda kullanabiliriz:

```js run
alert( "I love HTML5!".match(/\s\w\w\w\w\d/) ); // ' HTML5'
```

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

```js run
let str = "+7(903)-123-45-67";

alert( str.match(/\d/g).join('') ); // 79031234567
```

Alternatif, daha kısa bir yol, rakam olmayan `pattern:\D` karakterleri bulmak ve bunları dizeden kaldırmaktır:

```js run
let str = "+7(903)-123-45-67";

alert( str.replace(/\D/g, "") ); // 79031234567
```

## Nokta "herhangi bir karakter"tir

Nokta `pattern:.` yeni satır dışındaki herhangi bir karakterle eşleşen özel bir karakter sınıfıdır.

Örneğin:

```js run
alert( "Z".match(/./) ); // Z
```

Veya düzenli ifadenin ortasında:

```js run
let regexp = /CS.4/;

alert( "CSS4".match(regexp) ); // CSS4
alert( "CS-4".match(regexp) ); // CS-4
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
