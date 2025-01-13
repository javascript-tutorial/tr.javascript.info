
Metod tüm dönülebilir anahtarlını `Object.keys` ile alır ve listesini döner.

`toString`'i dönülemez yapmak için, özellik tanımlayıcı ile tanımlamak gereklidir. Bunun yazımı `Object.create` ile olur ve bu ikinci argüman olarak özellik tanımlayıcı alır.

```js run
*!*
let dictionary = Object.create(null, {
  toString: { // toString özelliğini tanımla. 
    value() { // Değeri bir fonksiyondur.
      return Object.keys(this).join();
    }
  }
});
*/!*

dictionary.apple = "Apple";
dictionary.__proto__ = "test";

// apple ve __proto__ döngüde yer alır
for(let key in dictionary) {
  alert(key); // "apple", sonra "__proto__"
}  

// listenin virgül ile ayrılmış versiyonu döner.
alert(dictionary); // "apple,__proto__"
```

Tanımlayıcı ile özellik yarattığımızda bunun bayrakları varsayılan olarak `false` olur. Bundan dolayı yukarıdaki `dictionary.toString` dönülemezdir.

<<<<<<< HEAD
Daha fazla bilgi için [](info:property-descriptors) bölümünü inceleyebilirsiniz.
=======
See the chapter [](info:property-descriptors) for review.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
