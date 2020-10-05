
# Object.keys, values, entries

Veri yapılarından biraz uzaklaşıp bunların döngülerinden bahsedecek olursak;

Bir önceki bölümde `map.keys()`, `map.values()`, `map.entries()` gibi metodlar vardı.

Bu metodlar `generic` metorlardır. Bunların veri yapılarında kullanılması çoğu dilde ortaktır. Eğer yeni bir veri yapısı yapmak istiyorsanız siz de bunların uygulamasını yapmalısınız.

Bunlar:
- `Map`
- `Set`
<<<<<<< HEAD:1-js/05-data-types/08-keys-values-entries/article.md
- `Array` ( `arr.values()` hariç)

... için desteklenir.
=======
- `Array`
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca:1-js/05-data-types/09-keys-values-entries/article.md

Basit objeler de aynı metodları destekler aslında, fakat yazımları biraz daha fazladır.

## Object.keys, values, entries

Basit objeler için aşağıdaki metodlar kullanılabilir.

- [Object.keys(obj)](mdn:js/Object/keys) -- anahtarları dizi şeklinde dönderir.
- [Object.values(obj)](mdn:js/Object/values) -- değerleri dizi şeklinde dönderir
- [Object.entries(obj)](mdn:js/Object/entries) --  `[anahtar, değer]` çiftini dizi şeklinde dönderir.

<<<<<<< HEAD:1-js/05-data-types/08-keys-values-entries/article.md
... Farklılıklarına dikkat edin. ( aşağıda map örneği gösterilmiştir):
=======
Please note the distinctions (compared to map for example):
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca:1-js/05-data-types/09-keys-values-entries/article.md

|             | Map              | Object       |
|-------------|------------------|--------------|
| Çağırma | `map.keys()`  | `Object.keys(obj)`, fakat `obj.keys()` değil |
| Döner     | sıralı döngü objesi    | "gerçek" dizi                     |

İlk farklılık `obj.keys()` değil de `Object.keys(obj)` dönmeniz gerekmektedir.

<<<<<<< HEAD:1-js/05-data-types/08-keys-values-entries/article.md
Peki neden? Ana neden esnekliktir. Hatırlarsanız, objeler tüm karmaşık yapıların temelidir. Bundan dolayı kendimize ait `order` gibi bir objeniz ve bunun kendine ait bir `order.values()` metodu olabilir. Yine de bunun üzerinde `Object.values(order)`'ı çağırabilmeniz gerekir.
=======
Why so? The main reason is flexibility. Remember, objects are a base of all complex structures in JavaScript. So we may have an object of our own like `data` that implements its own `data.values()` method. And we still can call `Object.values(data)` on it.
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca:1-js/05-data-types/09-keys-values-entries/article.md

Diğer bir farklılık ise `Object.*` metodları "gerçek" dizi döner. Sadece sıralı döngü objesi değil. Bu da tarihsel nedenlerden dolayıdır aslında.

Örneğin:

```js
let kullanici = {
  adi: "Ahmet",
  yasi: 30
};
```

- `Object.keys(kullanici) = [adi, yasi]`
- `Object.values(kullanici) = ["Ahmet", 30]`
- `Object.entries(kullanici) = [ ["adi","Ahmet"], ["yasi",30] ]`

Burada ise `Object.values`'un özelliklerinin döngüde kullanımı gösterilmektedir:

```js run
let kullanici = {
  adi: "Ahmet",
  yasi: 30
};

//  değerler üzerinden döngü
for(let deger of Object.values(kullanici)) {
  alert(deger); // Ahmet,sonrasında 30
}
```

```warn header="Object.keys/values/entries symbol özelliklerini görmezden gelir"

`for..in` döngüsünde olduğu gibi, bu metodlar `Symbol(...)`'ü anahtar olarak kullanan özellikleri pas geçerler.

Bu baya işe yarar bir özelliktir. Fakat symbol özelliklerini almak istiyorsanız [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) metodunu kullanabilirsiniz. Ayrıca [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) *tüm* anahtarları döner.
```

<<<<<<< HEAD:1-js/05-data-types/08-keys-values-entries/article.md
## Nesneleri dönüştürmek için Object.fromEntries

Bazen bir nesneyi `Map`e dönüştürüp ardından onu objeye geri dönüştürmemiz gerekir

Halihazırda `obj`den `Map` yapmak için `new Map(Object.entries(obj))` var.

`Object.fromEntries` in sözdizimi(syntaxi) tam tersini yapar. `[key, value]` çifti dizisi verildiğinde, bir obje oluşturur:

```js run
let fiyatlar = Object.fromEntries([
  ['muz', 1],
  ['portakal', 2],
  ['et', 4]
]);

// şimdi fiyatlar = { muz: 1, portakal: 2, et: 4 }

alert(fiyatlar.portakal); // 2
```

Pratik uygulamaları görelim.

Örneğin, mevcut olandan iki kat fiyatla yeni bir nesne oluşturmak istiyoruz.

Diziler için, bir diziyi dönüştürmeye izin veren .map metodumuz var, ancak nesneler için böyle bir şey yok.

Bu yüzden bir döngü kullanabiliriz:

```js run
let fiyatlar = {
  muz: 1,
  portakal: 2,
  et: 4,
};

let ikiKatiFiyatlar = {};
for(let [product, price] of Object.entries(fiyatlar)) {
  ikiKatiFiyatlar[product] = price * 2;
}

alert(ikiKatiFiyatlar.et); // 8
```

...Veya `Object.entries` kullanarak nesneyi bir `Array` olarak temsil edebilir, daha sonra işlemleri `map` (ve muhtemelen diğer dizi metodları) ile gerçekleştirebilir ve daha sonra `Object.fromEntries` kullanarak geri dönebiliriz.

Bunu bizim objemiz için yapalım:
=======

## Transforming objects

Objects lack many methods that exist for arrays, e.g. `map`, `filter` and others.

If we'd like to apply them, then we can use `Object.entries` followed by `Object.fromEntries`:

1. Use `Object.entries(obj)` to get an array of key/value pairs from `obj`.
2. Use array methods on that array, e.g. `map`.
3. Use `Object.fromEntries(array)` on the resulting array to turn it back into an object.

For example, we have an object with prices, and would like to double them:
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca:1-js/05-data-types/09-keys-values-entries/article.md

```js run
let fiyatlar = {
  muz: 1,
  portakal: 2,
  et: 4,
};

*!*
let ikiKatiFiyatlar = Object.fromEntries(
  // convert to array, map, and then fromEntries gives back the object
  Object.entries(fiyatlar).map(([key, value]) => [key, value * 2])
);
*/!*

alert(ikiKatiFiyatlar.et); // 8
```   

<<<<<<< HEAD:1-js/05-data-types/08-keys-values-entries/article.md
İlk görüşte zor görünebilir, ancak bir veya iki kez kullandıktan sonra anlaşılması kolaylaşır.

`Map`ten bir obje almak için`fromEntries` de kullanabiliriz.

Örneğin. Bir fiyat `Map`imiz var, ancak bunu bir nesne bekleyen 3. taraf koduna geçirmemiz gerekiyor.

Şu şekilde:

```js run
let map = new Map();
map.set('muz', 1);
map.set('portakal', 2);
map.set('et', 4);

let obj = Object.fromEntries(map);

// now obj = { muz: 1, portakal: 2, et: 4 }

alert(obj.portakal); // 2
```
=======
It may look difficult from the first sight, but becomes easy to understand after you use it once or twice. We can make powerful chains of transforms this way. 
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca:1-js/05-data-types/09-keys-values-entries/article.md
