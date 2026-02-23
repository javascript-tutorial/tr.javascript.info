
# Gözlemlenebilir (Observable)

Bir nesneyi "gözlemlenebilir" yapan ve bir proxy döndüren `makeObservable(target)` fonksiyonunu oluşturun.

Şöyle çalışmalı:

```js run
function makeObservable(target) {
  /* kodunuz */
}

let user = {};
user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John"; // alerts: SET name=John
```

<<<<<<< HEAD
Başka bir deyişle, `makeObservable` tarafından döndürülen nesnede `observe(handler)` metodu bulunur.

Bir özelliğin değeri değiştiğinde, ilgili özelliğin adı ve değeri ile `handler(key, value)` çağrılır.

Not: Bu görevde yalnızca bir özelliğe değer atamayı (yazmayı) ele alın. Diğer işlemler benzer şekilde uygulanabilir.
Ek Not: Handler'ları saklamak için global bir değişken veya global bir yapı kullanabilirsiniz. Burada bu uygundur. Gerçek hayatta, böyle bir fonksiyon kendi global kapsamına sahip bir modülde yaşar.
=======
In other words, an object returned by `makeObservable` is just like the original one, but also has the method `observe(handler)` that sets `handler` function to be called on any property change.

Whenever a property changes, `handler(key, value)` is called with the name and value of the property.

P.S. In this task, please only take care about writing to a property. Other operations can be implemented in a similar way.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
