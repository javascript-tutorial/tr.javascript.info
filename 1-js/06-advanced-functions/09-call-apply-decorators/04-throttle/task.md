importance: 5

---

# Kısma Dekoratörleri

<<<<<<< HEAD
"Sıkma" dekoratörü `throttle(f,ms)` oluşturun ve bu bir kapsayıcı döndersin, bu kapsayıcı çağrıyı `f`'e iletsin ve bu çağrıyı belirtilen `ms` içerisinde sadece bir defa yapabilsin. Geri kalan "cooldown" periyodundakiler görmezden gelinsin.

** `Geri sektiren` dekoratör ile `Kısma` dekoratörü arasındaki fark; görmezden gelinen çağrı eğer belirlenen süre zarfında yaşayabilirse, gecikme sonrasında çağırılır.
=======
Create a "throttling" decorator `throttle(f, ms)` -- that returns a wrapper.

When it's called multiple times, it passes the call to `f` at maximum once per `ms` milliseconds.

The difference with debounce is that it's completely different decorator:
- `debounce` runs the function once after the "cooldown" period. Good for processing the final result.
- `throttle` runs it not more often than given `ms` time. Good for regular updates that shouldn't be very often.

In other words, `throttle` is like a secretary that accepts phone calls, but bothers the boss (calls the actual `f`) not more often than once per `ms` milliseconds.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Daha iyi anlayabilmek için günlük kullanılan bir uygulamadan yararlanabiliriz.

**Örneğin fare olaylarını takip etmek istiyorsunuz.**

<<<<<<< HEAD
Tarayıcı üzerinde bir fonksiyon ile farenin her mikro seviyeli hareketinde gittiği yerlerin bilgileri alınabilir. Aktif fare kullanımı sırasında akıcı bir şekilde çalışacaktır. Her sn'de 100 defa ( 10ms ) çalışabilir.

**İzleme fonksiyonu web sayfası üzerinde bazı bilgileri güncellemeli.**

Güncelleme fonksiyonu update()`'in her fare mikro hareketinde çalışması sisteme çok ağır gelmektedir. Aslında bu fonksiyonun 100ms'de birden fazla çalışmasının da bir mantığı yoktur.

Bundan dolayı `update()` yerine, her bir fare hareketinde çalışacak `throttle(update,100)` fonksiyonu kullanılacaktır. Bu dekoratör her fare değişiminde çağırılabilir fakat `update()` 100ms içerisinde maksimum bir defa çağırılacaktır.
=======
In a browser we can setup a function to run at every mouse movement and get the pointer location as it moves. During an active mouse usage, this function usually runs very frequently, can be something like 100 times per second (every 10 ms).
**We'd like to update some information on the web-page when the pointer moves.**

...But updating function `update()` is too heavy to do it on every micro-movement. There is also no sense in updating more often than once per 100ms.

So we'll wrap it into the decorator: use `throttle(update, 100)` as the function to run on each mouse move instead of the original `update()`. The decorator will be called often, but forward the call to `update()` at maximum once per 100ms.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Şu şekilde görünecektir:

<<<<<<< HEAD
1. İlk fare hareketinde dekoratör çağrıyı doğrudan `update`'e yönlendirecektir. Bu önemlidir, kullanıcı böylece hareketinin sonucunu doğrudan görür.
2. Sonrasında fare hareket etse de `100ms` geçene kadar hiç birşey olmaz. Dekoratör çağrıları görmezden gelir.
3. `100ms` sonunda son koordinatlar ile tekrardan bir `update` çalışır.
4. En sonunda fare bir yerlerde durur. Dekoratör `100ms` bekler ve bu bekleme bittikten sonra `update` fonksiyonu son koordinatlar ile çalışır. Belki de en önemlisi son fare koordinatlarının da işlenmiş olmasıdır.
=======
1. For the first mouse movement the decorated variant immediately passes the call to `update`. That's important, the user sees our reaction to their move immediately.
2. Then as the mouse moves on, until `100ms` nothing happens. The decorated variant ignores calls.
3. At the end of `100ms` -- one more `update` happens with the last coordinates.
4. Then, finally, the mouse stops somewhere. The decorated variant waits until `100ms` expire and then runs `update` with last coordinates. So, quite important, the final mouse coordinates are processed.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Kod örneği:

```js
function f(a) {
  console.log(a);
}

// f1000 f'e çağrıların 1000ms en fazla bir defa geçmesini sağlar.
let f1000 = throttle(f, 1000);

f1000(1); //  1 yazar
f1000(2); // (throttling, 1000ms henüz bitmedi)
f1000(3); // (throttling, 1000ms henüz bitmedi)

// 1000 ms bittiğinde...
// ...çıktısı 3 olur , aradaki 2 değeri pas geçilir.
```

P.S. kaynağın argümanı `this` `f1000`'e iletilmiştir. Bu argüman `f` fonksiyonuna da iletilmelidir.
