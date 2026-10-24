# Nullish birleştirme operatörü '??'

[recent browser="new"]

Nullish birleştirme (nullish coalescing) operatörü iki soru işaretiyle yazılır: `??`.

Bu operatör `null` ve `undefined` değerlerini aynı şekilde ele aldığı için bu makalede özel bir terim kullanacağız. Kısaca, bir değer `null` da `undefined` da değilse o değere "tanımlı" diyeceğiz.

`a ?? b` ifadesinin sonucu:
- `a` tanımlıysa `a`,
- `a` tanımlı değilse `b` olur.

Başka bir deyişle `??`, ilk argüman `null/undefined` değilse onu, değilse ikinci argümanı döndürür.

Nullish birleştirme operatörü tamamen yeni bir şey değildir. İki değerden ilk "tanımlı" olanı almanın kısa ve okunaklı bir yoludur.

`result = a ?? b` ifadesini zaten bildiğimiz operatörlerle şöyle yazabiliriz:

```js
result = (a !== null && a !== undefined) ? a : b;
```

Artık `??` operatörünün ne yaptığı açık olmalı. Şimdi nerede işe yaradığına bakalım.

`??` en çok varsayılan değer vermek için kullanılır.

Örneğin aşağıda `user` değeri `null/undefined` değilse onu, değilse `Anonymous` yazdırıyoruz:

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous (user tanımsız)
```

`user` değişkenine bir isim atanmış hâli de şöyle:

```js run
let user = "John";

alert(user ?? "Anonymous"); // John (user null/undefined değil)
```

Birden fazla `??` art arda kullanılarak bir listedeki `null/undefined` olmayan ilk değer de seçilebilir.

Diyelim ki kullanıcının bilgileri `firstName`, `lastName` ve `nickName` değişkenlerinde tutuluyor. Kullanıcı bu alanları doldurmamayı seçtiyse hepsi tanımsız olabilir.

Kullanıcı adını bu değişkenlerden biriyle göstermek, hepsi `null/undefined` ise "Anonymous" yazdırmak istiyoruz.

Bunun için `??` operatörünü kullanalım:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// tanımlı olan ilk değeri gösterir:
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## || ile karşılaştırma

[Önceki bölümde](info:logical-operators#or-finds-the-first-truthy-value) anlatıldığı gibi VEYA `||` operatörü de `??` ile aynı şekilde kullanılabilir.

Örneğin yukarıdaki kodda `??` yerine `||` yazsak da aynı sonucu alırız:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// doğru kabul edilen (truthy) ilk değeri gösterir:
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

Tarihsel olarak önce VEYA `||` operatörü vardı. JavaScript'in ilk gününden beri dilde olduğu için geliştiriciler uzun süre bu tür işler için onu kullandı.

Nullish birleştirme operatörü `??` ise JavaScript'e yakın zamanda eklendi. Eklenme sebebi de geliştiricilerin `||` operatöründen pek memnun olmamasıydı.

Aralarındaki önemli fark şudur:
- `||` doğru kabul edilen (*truthy*) ilk değeri döndürür.
- `??` *tanımlı* ilk değeri döndürür.

Başka bir deyişle `||`; `false`, `0`, boş karakter dizisi `""` ve `null/undefined` arasında ayrım yapmaz. Hepsi aynıdır: yanlış kabul edilen (falsy) değerler. Bunlardan biri `||` operatörünün ilk argümanıysa sonuç olarak ikinci argümanı alırız.

Oysa pratikte varsayılan değeri çoğu zaman yalnızca değişken `null/undefined` olduğunda, yani değer gerçekten bilinmediğinde ya da hiç atanmadığında kullanmak isteriz.

Örneğin şu koda bakalım:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

- `height || 100`, `height` değerinin yanlış kabul edilip edilmediğine bakar. Değer `0`'dır ve gerçekten de yanlış kabul edilir.
    - Bu yüzden `||` operatörünün sonucu ikinci argüman, yani `100` olur.
- `height ?? 100`, `height` değerinin `null/undefined` olup olmadığına bakar. Değildir,
    - bu yüzden sonuç `height` değerinin kendisi, yani `0` olur.

Pratikte sıfır yükseklik çoğu zaman geçerli bir değerdir ve varsayılan değerle değiştirilmemelidir. Bu durumda doğru olanı `??` yapar.

## Öncelik

`??` operatörünün önceliği `||` ile aynıdır. [MDN tablosunda](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table) ikisinin de önceliği `3`'tür.

Yani nullish birleştirme operatörü `??` de `||` gibi `=` ve `?` operatörlerinden önce, ama `+`, `*` gibi çoğu işlemden sonra hesaplanır.

Bu yüzden şu tür ifadelerde parantez eklememiz gerekebilir:

```js run
let height = null;
let width = null;

// önemli: parantez kullanın
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

Parantezleri yazmazsak `*` operatörünün önceliği `??` operatöründen yüksek olduğu için önce o çalışır ve yanlış sonuç elde ederiz.

```js
// parantezsiz
let area = height ?? 100 * width ?? 50;

// ...şöyle çalışır (istediğimiz bu değil):
let area = height ?? (100 * width) ?? 50;
```

### ?? operatörünü && veya || ile kullanmak

JavaScript, güvenlik sebebiyle `??` operatörünün `&&` ve `||` ile birlikte kullanılmasını, öncelik parantezlerle açıkça belirtilmedikçe yasaklar.

Aşağıdaki kod sözdizimi hatası verir:

```js run
let x = 1 && 2 ?? 3; // Sözdizimi hatası
```

Bu kısıtlama tartışmaya açıktır. Geliştiriciler `||` yerine `??` kullanmaya başlarken hata yapmasınlar diye dil şartnamesine eklenmiştir.

Bu kısıtlamayı aşmak için parantezleri açıkça yazın:

```js run
*!*
let x = (1 && 2) ?? 3; // Çalışır
*/!*

alert(x); // 2
```

## Özet

- Nullish birleştirme operatörü `??`, bir listedeki ilk "tanımlı" değeri seçmenin kısa bir yoludur.

    Değişkenlere varsayılan değer atamak için kullanılır:

    ```js
    // height null veya undefined ise height=100 yap
    height = height ?? 100;
    ```

- `??` operatörünün önceliği çok düşüktür, `?` ve `=` operatörlerinden yalnızca biraz yüksektir. Bu yüzden bir ifadenin içinde kullanırken parantez eklemeyi düşünün.
- `||` veya `&&` ile birlikte, parantez kullanmadan yazılması yasaktır.
