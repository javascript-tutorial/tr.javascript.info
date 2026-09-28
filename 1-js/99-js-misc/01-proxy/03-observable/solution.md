Çözüm iki bölümden oluşur:

<<<<<<< HEAD
1. `.observe(handler)` çağrıldığında, handler'ı daha sonra çağırabilmek için bir yerde saklamamız gerekir. Bunu, sembolümüzü anahtar olarak kullanarak doğrudan nesnede saklayabiliriz.
2. Herhangi bir değişiklik durumunda handler'ları çağırmak için `set` tuzağına sahip bir proxy'ye ihtiyacımız var.
=======
1. Whenever `.observe(handler)` is called, we need to remember the handler somewhere, to be able to call it later. We can store handlers right in the object, using our symbol as the property key.
2. We need a proxy with `set` trap to call handlers in case of any change.
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js run
let handlers = Symbol('handlers');

function makeObservable(target) {
  // 1. Handler'ları saklamak için alanı başlat
  target[handlers] = [];

  // Handler fonksiyonunu ileride çağırmak için diziye ekle
  target.observe = function(handler) {
    this[handlers].push(handler);
  };

  // 2. Değişiklikleri yakalamak için bir proxy oluştur
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // İşlemi nesneye ilet
      if (success) { // Özellik atanırken hata yoksa
        // Tüm handler'ları çağır
        target[handlers].forEach(handler => handler(property, value));
      }
      return success;
    }
  });
}

let user = {};

user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John";
```
