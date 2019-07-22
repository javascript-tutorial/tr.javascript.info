
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

... Farklılıklarına dikkat edin. ( aşağıda map örneği gösterilmiştir):

|             | Map              | Object       |
|-------------|------------------|--------------|
| Çağırma | `map.keys()`  | `Object.keys(obj)`, fakat `obj.keys()` değil |
| Döner     | sıralı döngü objesi    | "gerçek" dizi                     |

İlk farklılık `obj.keys()` değil de `Object.keys(obj)` dönmeniz gerekmektedir.

Peki neden? Ana neden esnekliktir. Hatırlarsanız, objeler tüm karmaşık yapıların temelidir. Bundan dolayı kendimize ait `order` gibi bir objeniz ve bunun kendine ait bir `order.values()` metodu olabilir. Yine de bunun üzerinde `Object.values(order)`'ı çağırabilmeniz gerekir.

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

## Object.fromEntries to transform objects

Sometimes we need to perform a transformation of an object to `Map` and back.

We already have `new Map(Object.entries(obj))` to make a `Map` from `obj`.

The syntax of `Object.fromEntries` does the reverse. Given an array of `[key, value]` pairs, it creates an object:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

Let's see practical applications.

For example, we'd like to create a new object with double prices from the existing one.

For arrays, we have `.map` method that allows to transform an array, but nothing like that for objects.

So we can use a loop:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = {};
for(let [product, price] of Object.entries(prices)) {
  doublePrices[product] = price * 2;
}

alert(doublePrices.meat); // 8
```

...Or we can represent the object as an `Array` using `Object.entries`, then perform the operations with `map` (and potentially other array methods), and then go back using `Object.fromEntries`.

Let's do it for our object:

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

It may look difficult from the first sight, but becomes easy to understand after you use it once or twice.

We also can use `fromEntries` to get an object from `Map`.

E.g. we have a `Map` of prices, but we need to pass it to a 3rd-party code that expects an object.

Here we go:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map);

// now obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```
