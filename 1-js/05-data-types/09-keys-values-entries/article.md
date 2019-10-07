
# Object.keys, values, entries

Veri yapılarından biraz uzaklaşıp bunların döngülerinden bahsedecek olursak;

Bir önceki bölümde `map.keys()`, `map.values()`, `map.entries()` gibi metodlar vardı.

Bu metodlar `generi`c metorlardır. Bunların veri yapılarında kullanılması çoğu dilde ortaktır. Eğer yenei bir veri yapısı yapmak istiyorsanız siz de bunların uygulamasını yapmalısınız.

Bunlar:
- `Map`
- `Set`
- `Array` ( `arr.values()` hariç)

... için desteklenir.

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
>>>>>>> 71ff8f81b05e2438a3c56507888e06c528a71182:1-js/05-data-types/09-keys-values-entries/article.md

|             | Map              | Object       |
|-------------|------------------|--------------|
| Çağırma | `map.keys()`  | `Object.keys(obj)`, fakat `obj.keys()` değil |
| Döner     | sıralı döngü objesi    | "gerçek" dizi                     |

İlk farklılık `obj.keys()` değil de `Object.keys(obj)` dönmeniz gerekmektedir.

<<<<<<< HEAD:1-js/05-data-types/08-keys-values-entries/article.md
Peki neden? Ana neden esnekliktir. Hatırlarsanız, objeler tüm karmaşık yapıların temelidir. Bundan dolayı kendimize ait `order` gibi bir objeniz ve bunun kendine ait bir `order.values()` metodu olabilir. Yine de bunun üzerinde `Object.values(order)`'ı çağırabilmeniz gerekir.
=======
Why so? The main reason is flexibility. Remember, objects are a base of all complex structures in JavaScript. So we may have an object of our own like `data` that implements its own `data.values()` method. And we still can call `Object.values(data)` on it.
>>>>>>> 71ff8f81b05e2438a3c56507888e06c528a71182:1-js/05-data-types/09-keys-values-entries/article.md

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


## Transforming objects

Objects lack many methods that exist for arrays, e.g. `map`, `filter` and others.

If we'd like to apply them, then we can use `Object.entries` followed `Object.fromEntries`:

1. Use `Object.entries(obj)` to get an array of key/value pairs from `obj`.
2. Use array methods on that array, e.g. `map`.
3. Use `Object.fromEntries(array)` on the resulting array to turn it back into an object.

For example, we have an object with prices, and would like to double them:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // convert to array, map, and then fromEntries gives back the object
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);
*/!*

alert(doublePrices.meat); // 8
```   

It may look difficult from the first sight, but becomes easy to understand after you use it once or twice. We can make powerful chains of transforms this way. 
