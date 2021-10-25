En basit çözümü aşağıdaki gibi olabilir.

```js run
*!*
function karistir(dizi) {
  dizi.sort(() => Math.random() - 0.5);
}
*/!*

let dizi = [1, 2, 3];
karistir(dizi);
alert(dizi);
```
Yukarıdaki çalışıyor denebilir çünkü `Math.random()-0.5` rasgele bir sayıdır ve pozitif veya negatif olabilir. Böylece sıralama fonksiyonu rasgele elemanları dizer.

Fakat sıralama fonksiyonu bu amaçla kullanılamaz. Tüm permütasyon aynı olasılıkta değildirler.

Aşağıdaki koda bakılacak olursa `karistir` 1000000 defa çalıştırılacak olursa bile olası sonuçlar şu şekildedir:

```js run
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// mümkün olan tüm permütasyonların görünme sayısı.
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for(let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  karistir(array);
  count[array.join('')]++;
}

// mümkün olan tüm permütasyonların görünme sayısı.
for(let key in count) {
  alert(`${key}: ${count[key]}`);
}
```
<<<<<<< HEAD
( Temmuz 2017 itibari ile sonuçlar aşağıdaki gibidir.)
=======

An example result (depends on JS engine):
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c

```js
123: 250706
132: 124425
213: 249618
231: 124880
312: 125148
321: 125223
```
Görüğünüz gibi `123` ve `213` ün çıkma olasılığı daha fazladır.

Sonuçlar JavaScript motoruna göre değişebilir. Fakat görüldüğü gibi bu fonksiyon çok güvenilir değildir.

Neden çalışmadı? Genel olarak konuşmak gerekirse `sort` kara kutudur: biz buraya bir dizi göndeririz o içinde karşılaştırma fonksiyonları vs. kullanır ve biz sıralanmış şekilde bu diziyi alırız.  Bu kadar fazla rasgele karşılaştırmadan dolayı bu kara kutu deliye döndü, bu deliye dönme olayında nasıl davranacağı da JavaScript motoruna bağlıdır.


Bu problem bir kaç yöntemle çözülebilir. [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle). Fikre göre dizi tersten başlayarak rasgele sayı ile değiştirilecek şekilde yazılmalıdır:

```js
<<<<<<< HEAD
function karistir(array) {
  for(let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i+1)); // random index  0 ile i arasında
    [array[i], array[j]] = [array[j], array[i]]; // elemanların yer değiştirmesi için.
=======
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c
  }
}
```

Aynı şekilde test edilirse:

```js run
function karistir(array) {
  for(let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// mümkün olan tüm permütasyonların görünme sayısı.
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for(let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  karistir(array);
  count[array.join('')]++;
}

// show counts of all possible permutations
for(let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

The example output:

```js
123: 166693
132: 166647
213: 166628
231: 167517
312: 166199
321: 166316
```
Şimdi daha iyi görünüyor: tüm permütasyonlar yakın olasılıkla.

Performans yönünden Fisher-Yates algoritması harikatıdır. Hiç sıralama ile uğraşmaya gerek yok.