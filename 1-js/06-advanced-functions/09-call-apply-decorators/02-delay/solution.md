Çözüm:

```js
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}
```
Yukarıda ok fonksiyonunun nasıl kullanıldığına dikkat edin. Bildiğiniz gibi, ok fonksiyonlarında `this` ve `arguments` bulunmaz, bunun için `f.apply(this, arguments)` , `this` ve `arguments`'ı saklayıcıdan(wrapper) alır.

Eğer sıradan bir fonksiyon paslarsanız, `setTimeout` bunu argümansız `this=window` ( tarayıcıda ) olacak şekilde çağırır, bundan dolayı saklayıcıdan bu değerleri iletebilmek için biraz daha kod yazmalıyız:

```js
function delay(f, ms) {

  // `this` ve diğer argümanların setTimeout içerisindeki saklayıcıdan iletilmesini sağlar.
  return function(...args) {
    let savedThis = this;
    setTimeout(function() {
      f.apply(savedThis, args);
    }, ms);
  };

}
```
