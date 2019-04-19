
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

## Object.keys/values/entries symbol özelliklerini görmezden gelir.

`for..in` döngüsünde olduğu gibi, bu metodlar `Symbol(...)`'ü anahtar olarak kullanan özellikleri pas geçerler.

Bu baya işe yarar bir özelliktir. Fakat symbol özelliklerini almak istiyorsanız [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) metodunu kullanabilirsiniz. Ayrıca [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) *tüm* anahtarları döner.