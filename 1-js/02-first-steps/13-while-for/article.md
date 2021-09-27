# Döngüler: while ve for

Çoğu zaman aynı bir sıra ile tekrar yapma ihtiyacı duyulabilirsiniz.

Örneğin bir listede bulunan ürünlerin sıra ile çıktısını almak. Veya aynı kodu 1-10'a kadar olan sayılar için çalıştırmak.

*Döngü* aynı kod parçacığının birden fazla defa çalıştırılmasına denir.

## "while" döngüsü

`while` döngüsü aşağıdaki gibi bir yazıma sahiptir:

```js
while (koşul) {
  // kod
  // veya döngünün gövdesi 
}
```

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
`koşul` `doğru` iken(while), `döngü gövdesinde` bulunan kod çalıştırılır.
=======
While the `condition` is truthy, the `code` from the loop body is executed.
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115:1-js/02-first-steps/13-while-for/article.md

Örneğin, aşağıdaki kod `i < 3` `iken` çalışır.

```js run
let i = 0;
while (i < 3) { // önce 0, sonra 1, sonra 2
  alert( i );
  i++;
}
```
Döngünün gövdesinde bulunan kodun her çalışmasına *tekerrür(iteration)* denir. Yukarıdaki örnekte gövde 3 defa tekerrür etmiştir.

Eğer `i++` gibi bir kod olmasaydı, teoride kod sonsuza kadar devam ederdi. Pratikte ise tarayıcınız bu kodun uzun süre çalışmasını engeller, sunucu tabanlı JavaScript yazdığınızda ise bu işlem durdurulur.

Sadece karşılaştırma değil, bir ifade veya değişken koşul olabilir. `While` döngüsü tarafından alınan tüm ifadeler boolean'a dönüştürülür.

Örneğin, `while(i != 0 )` `while(i)`'de olabilir.

```js run
let i = 3;
*!*
while (i) {  // i 0 olduğunda koşul `yanlış` olur ve döngü biter.
*/!*
  alert( i );
  i--;
}
```

````smart header="Tek satır gövde varsa süslü paranteze gerek kalmaz."
Eğer döngü gövdesi tek satır ise süslü parantezi yazmayabilirsiniz. `{..}`:

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## "do..while" döngüsü

`do..while` döngüsü kullanarak koşul kontrolünü *sonda* yapmak mümkündür.

```js
do {
  // döngü gövdesi
} while (condition);
```
Döngü önce gövdeyi çalıştırır, sonra koşul kontrolü yapar ve eğer doğruysa tekrar döngü gövdesini çalıştırır.

Örneğin:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```
Bu şekilde döngü yazımı çok nadir olarak kullanılır. Kullanılmasının en önemli amacı **en azından bir defa** ne olursa olsun gövdenin çalıştırılma istenmesidir. Genelde `while(..){}` şekli tercih edilir.


## "for" döngüsü

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
`for` döngüsü en fazla kullanılan döngüdür.
=======
The `for` loop is more complex, but it's also the most commonly used loop.
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115:1-js/02-first-steps/13-while-for/article.md

Aşağıdaki şekilde kullanıma sahiptir:

```js
for (başla; koşul; adım) {
  // ... döngü gövdesi ...
}
```
Örnekler üzerinden incenecek olursa. Aşağıdaki döngü `alert(i)` yi `i` `0` dan `3` olana kadar çalıştırır.(3 dahil değil)

```js run
for (let i = 0; i < 3; i++) { // shows 0, then 1, then 2
  alert(i);
}
```
Bölüm bölüm inceleyecek olursak

| bölüm  |             |                                                                            |
|--------|-------------|----------------------------------------------------------------------------|
| başla  | `i = 0`     | Döngüye girildiğinde çalışır.                                              |
| koşul  | `i < 3`     | Her tekerrürden önce çalışır, eğer `yanlış` ise döngü durur.               |
| adım   | `i++`       | Gövdenin tekerrür etmesinden sonra fakat koşuldan önce çalışır             |
| gövde  | `alert(i)`  | koşul doğru olduğu sürece durmadan çalışır                                 |

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
Genel döngü algoritması aşağıdaki gibidir:
=======
| part  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| begin | `let i = 0`    | Executes once upon entering the loop.                                      |
| condition | `i < 3`| Checked before every loop iteration. If false, the loop stops.              |
| body | `alert(i)`| Runs again and again while the condition is truthy.                         |
| step| `i++`      | Executes after the body on each iteration. |

The general loop algorithm works like this:
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115:1-js/02-first-steps/13-while-for/article.md

```
Çalışmaya başlar
→ (if koşul → gövdeyi çalıştır ve adımı çalıştır.)
→ (if koşul → gövdeyi çalıştır ve adımı çalıştır.)
→ (if koşul → gövdeyi çalıştır ve adımı çalıştır.)
→ ...
```

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
Eğer döngüleri yeni görüyorsanız, belki geri dönüp bu olanları sırasıyla kağıda yazarak takip ederseniz sizin için daha iyi olacaktır.

Yukarıdaki kodda tam olarak ne oluyor peki:
=======
That is, `begin` executes once, and then it iterates: after each `condition` test, `body` and `step` are executed.

If you are new to loops, it could help to go back to the example and reproduce how it runs step-by-step on a piece of paper.
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115:1-js/02-first-steps/13-while-for/article.md


```js
// for (let i = 0; i < 3; i++) alert(i)

// Çalışmaya başla
let i = 0
// if koşul → gövdeyi çalıştır ve adımı çalıştır
if (i < 3) { alert(i); i++ }
// if koşul →  gövdeyi çalıştır ve adımı çalıştır
if (i < 3) { alert(i); i++ }
// if koşul →  gövdeyi çalıştır ve adımı çalıştır
if (i < 3) { alert(i); i++ }
// ...bitir, çünkü şimdi i=3
```

````smart header="Satır arasında değişken tanımlama"
Sayaç değişkeni olan `i` döngüye girdiğinde oluşturulur. Buna "satır arası" değişken tanımlama denir. Bu değişken sadece döngü içerisinde kullanılabilir.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // hata! böyle bir değişken bulunamadı.
```
Değişken tanımlamak yerine var olan da kullanılabilir:

```js run
let i = 0;

for (i = 0; i < 3; i++) { // var olan değişkeni kullan
  alert(i); // 0, 1, 2
}

alert(i); // 3, görünür halde çünkü değişken döngünün dışında tanımlandı.
```

````

### Bazı bölümlerin pas geçilmesi

`for` döngüsünün her bölümü pas geçilebilir.

Örneğin `başlangıç` bölümüne ihtiyaç yoksa pas geçilebilir.

Örneğin:
```js run
let i = 0; // i'yi tanımlanıp 0 değeri atandı

for (; i < 3; i++) { // "başlangıç"'a ihtiyaç yok
  alert( i ); // 0, 1, 2
}
```
`basamak` bilgisini silmek de mümkün:

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```
Döngü `while(i<3)` ile aynı oldu.

Aslında herşeyi silebiliriz:

```js
for (;;) {
  // sonsuz döngü
}
```

Dikkat ederseniz `for` döngüsü yazarken noktalı virgüller `;` yazılmalıdır, aksi halde yazım hatası verir.

## Döngüyü kırma

Normalde döngüler koşul `yanlış` olduğunda biter.

Fakat bazı durumlarda bu döngü `kırılabilir` ( break ).

Örneğin, kullanıcıdan bir dizi sayı girmesini istediniz eğer boş bir değer girerse döngüyü kırabilirsiniz.

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
```js
let toplam = 0;
=======
```js run
let sum = 0;
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115:1-js/02-first-steps/13-while-for/article.md

while (true) {

  let deger = +prompt("Bir sayı giriniz", '');

*!*
  if (!deger) break; // (*)
*/!*

  toplam += deger;

}
alert( 'Toplam: ' + toplam );
```

`break` talimatı `(*)` satırında görüldüğü üzere. Eğer kullanıcı boş değer girerse doğrudan döngü durur ve döngüden sonraki ilk satıra atlar. Yani `alert` çalışır. 

"Sonsuz döngü" + `break` birlikte kullanıldığında başlangıçta koşul kontrol edilmese de olur ama döngü gövdesinde veya sonunda kontrol edilmesi gerekir denen döngüler için güzel bir birliktelik oluşturur. Bu döngü içerisinde bir çok defa koşul kullanılarak döngü kırılabilir.

## Bir sonraki tekerrüre geçme  [#continue]

`continue`, `break` in daha hafif versiyonudur. Döngüyü tamamen kırmaz da zorla bir sonraki tekerrüre geçer(tabi koşul sağlanıyorsa)

O anda tekrar eden değer ile işimiz bitti ve bir sonraki tekrar geçmek istendiğinde `continue` kullanılır.


```js run no-beautify
for (let i = 0; i < 10; i++) {

  // Eğer 2'ye bölünebiliyorsa bir sonraki adıma atlar. 
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // ekranda 1, 3, 5, 7, 9 değerleri gösterilir. 
}
```
`i` nin çift değerleri için döngü gövdesi durdurulur, sonraki adıma geçilir. Bundan dolayı `alert` sadece tek değerler için çalışır.

````smart header="`continue` talimatı döngü sayısının azalmasına yardımcı olur."

Tek değerler gösteren döngü aşağıdaki gibi de yazılabilir:

```js run
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```
Teknik açısından birbiri ile aynıdırlar. Her zaman `continue` bloğunun yerine `if` kullanabiliriz.

Tabi bunun yan etkisi döngü gövdesi içinde bir tane daha `if` kullanarak okunabilirliği düşürmektir.

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
=======
But as a side-effect, this created one more level of nesting (the `alert` call inside the curly braces). If the code inside of `if` is longer than a few lines, that may decrease the overall readability.
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115:1-js/02-first-steps/13-while-for/article.md
````

````warn header=" 'if' yerine '?' kullanılıyorsa sağ tarafa 'continue/break' yazılmaz."
`break/continute` talimatları `'?'` ile kullanılamazlar

Örneğin:
```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```
Yukarıdaki döngü `?` ile yazılacak olursa:


```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // `continue` burada kullanılamaz!!!
```

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
... sonrasında çalışmayı durdurur. Böyle kodlar yazım hatası verir.

Bu da `'?'` işaretini `if` yerine kullanmamak için ayrı bir neden.
=======
...it stops working: there's a syntax error.
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115:1-js/02-first-steps/13-while-for/article.md

````

## break/continue için etiket tanımlanması ( Label )

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
=======
For example, in the code below we loop over `i` and `j`, prompting for the coordinates `(i, j)` from `(0,0)` to `(2,2)`:
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115:1-js/02-first-steps/13-while-for/article.md

Bazen birden fazla döngü içinden tek bir break ile çıkılma ihtiyacı duyulabilir.
Örneğin aşağıdaki kodda döngü `i` ve `j` kordinatlarını ekranda gösterir:
```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let deger = prompt(`Kordinattaki değer (${i},${j})`, '');

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
    // Burada döngüden çıkmak istersem ne yapmalıyım?

=======
    // what if we want to exit from here to Done (below)?
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115:1-js/02-first-steps/13-while-for/article.md
  }
}

alert('Bitti!');
```

Eğer kullanıcı iptale basarsa döngü iptal edilmelidir.

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
Normalde içerideki döngü için `deger`'e değer atadıktan sonra duruma göre içteki döngü kırılabilir. Fakat bu yeterli değildir. Bu gibi durumlarda `Labels` veya `etiket` ile sorun çözülebilir.

*etiket* döngüden önce bir kolon ile döngüyü tanımlamak için kullanılır.
=======
The ordinary `break` after `input` would only break the inner loop. That's not sufficient -- labels, come to the rescue!
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115:1-js/02-first-steps/13-while-for/article.md

```js
etiketAdi: for (...) {
  ...
}
```

`break <etiketAdi>` cümlesi bu etiketin olduğu yeri kırar.

Aşağıdaki gibi:

```js run no-beautify
*!*ust_dongu:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let giris = prompt(`Kordinattaki değer (${i},${j})`, '');

    // Eğer iptal edildi veya boş bir değer girildiyse dışarıdaki döngüyü de kır.
    if (!giris) *!*break ust_dongu*/!*; // (*)

    // değer ile birşeyler yap.
  }
}
alert('Bitti!');
```

Yukarıdaki kodda `break ust_dongu` adımına gelirse üste doğru `ust_dongu` aranır ve bulunduğu yerde kırılır.

Böylece kontrol doğrudan `(*)`, `alert('Bitti!')`ye geçer.

Etiketi başka bir satıra geçirmekte mümkündür.

```js no-beautify
ust_dongu:
for (let i = 0; i < 3; i++) { ... }
```

`continue` talimatı da etiket ile kullanılabilir. Bu durumda etiketin yazılı olduğu yere atlar.

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
=======
````warn header="Labels do not allow to \"jump\" anywhere"
Labels do not allow us to jump into an arbitrary place in the code.
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115:1-js/02-first-steps/13-while-for/article.md

````warn header="Etiketler \"goto\" değildir."
Etiketler ile kodun herhangi bir yerine atlamak mümkün değildir.

Örneğin aşağıdaki kod çalışmaz.
```js
<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
break etiket;  // etikete atlar değil mi?.
=======
break label; // jump to the label below (doesn't work)
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115:1-js/02-first-steps/13-while-for/article.md

etiket: for (...)
```
<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
`break/continue` sadece döngünün içerisinde çalışabilir, ve doğal olarak etiketler de üst tarafa yazılmalıdırlar.
=======

A `break` directive must be inside a code block. Technically, any labelled code block will do, e.g.:
```js
label: {
  // ...
  break label; // works
  // ...
}
```

...Although, 99.9% of the time `break` is used inside loops, as we've seen in the examples above.

A `continue` is only possible from inside a loop.
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115:1-js/02-first-steps/13-while-for/article.md
````

## Özet
Bu konuda 3 farklı döngü işlendi:


- `while` -- Her tekerrürden önce koşul kontrol edilir
- `do..while` -- Koşul tekerrürden sonra kontrol edilir.
- `for (;;)` -- Her tekerrürden önce koşul kontrol edilir. Farklı seçenekler mevcuttur.

Sonsuz döngü yapmak için genelde `while(true)` kullanılır. Böyle döngüler de diğerleri gibi `break` talimatıyla kırılabilir.

Eğer o anki tekerrür ile işimiz bitti ve bir sonrakine geçmek istiyorsanız `continue` kullanmanız lazım.

`break/continue` ile döngüden önce yazılan `etikete` atlamak veya üst döngüyü kırmak mümkündür.
