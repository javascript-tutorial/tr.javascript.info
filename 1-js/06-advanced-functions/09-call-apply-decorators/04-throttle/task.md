importance: 5

---

# Kısma Dekoratörleri

"Sıkma" dekoratörü `throttle(f,ms)` oluşturun ve bu bir kapsayıcı döndersin, bu kapsayıcı çağrıyı `f`'e iletsin ve bu çağrıyı belirtilen `ms` içerisinde sadece bir defa yapabilsin. Geri kalan "cooldown" periyodundakiler görmezden gelinsin.

** `Geri sektiren` dekoratör ile `Kısma` dekoratörü arasındaki fark; görmezden gelinen çağrı eğer belirlenen süre zarfında yaşayabilirse, gecikme sonrasında çağırılır.

Daha iyi anlayabilmek için günlük kullanılan bir uygulamadan yararlanabiliriz.

**Örneğin fare olaylarını takip etmek istiyorsunuz.**

Tarayıcı üzerinde bir fonksiyon ile farenin her mikro seviyeli hareketinde gittiği yerlerin bilgileri alınabilir. Aktif fare kullanımı sırasında akıcı bir şekilde çalışacaktır. Her sn'de 100 defa ( 10ms ) çalışabilir.

**İzleme fonksiyonu web sayfası üzerinde bazı bilgileri güncellemeli.**

Güncelleme fonksiyonu update()`'in her fare mikro hareketinde çalışması sisteme çok ağır gelmektedir. Aslında bu fonksiyonun 100ms'de birden fazla çalışmasının da bir mantığı yoktur.

Bundan dolayı `update()` yerine, her bir fare hareketinde çalışacak `throttle(update,100)` fonksiyonu kullanılacaktır. Bu dekoratör her fare değişiminde çağırılabilir fakat `update()` 100ms içerisinde maksimum bir defa çağırılacaktır.

Şu şekilde görünecektir:

1. İlk fare hareketinde dekoratör çağrıyı doğrudan `update`'e yönlendirecektir. Bu önemlidir, kullanıcı böylece hareketinin sonucunu doğrudan görür.
2. Sonrasında fare hareket etse de `100ms` geçene kadar hiçbir şey olmaz. Dekoratör çağrıları görmezden gelir.
3. `100ms` sonunda son koordinatlar ile tekrardan bir `update` çalışır.
4. En sonunda fare bir yerlerde durur. Dekoratör `100ms` bekler ve bu bekleme bittikten sonra `update` fonksiyonu son koordinatlar ile çalışır. Belki de en önemlisi son fare koordinatlarının da işlenmiş olmasıdır.

Kod örneği:

```js
function f(a) {
  console.log(a)
};

// f1000 f'e çağrıların 1000ms en fazla bir defa geçmesini sağlar.
let f1000 = throttle(f, 1000);

f1000(1); //  1 yazar
f1000(2); // (throttling, 1000ms henüz bitmedi)
f1000(3); // (throttling, 1000ms henüz bitmedi)

// 1000 ms bittiğinde...
// ...çıktısı 3 olur , aradaki 2 değeri pas geçilir.
```

P.S. kaynağın argümanı `this` `f1000`'e iletilmiştir. Bu argüman `f` fonksiyonuna da iletilmelidir.
