
Çalıştırmayı deneyin:

```js run
let str = "Merhaba";

str.test = 5; // (*)

alert(str.test); 
```
İki türlü cevap verilebilir:
1. `undefined`
2. Hata

Neden? Ne olduğuna `(*)` satırından bakarsanız:

1. `str` nin bir özelliğine erişildiğinde, "obje kabı" yaratılır.
2. Bundan dolayı obje `test` özelliğini alır.
3. "obje kabı" kaybolur ve işlem tamamlanır.

<<<<<<< HEAD
Öyleyse `str` nin son satırında özelliğe ait hiç bir iz yoktur. İlkel tipin üzerinde yapılan değişiklik için yeni obje kabı üretilir.

Bazı tarayıcılar ilkel tiplere yeni özellik tanımlanmasına izin vermezler. Bundan dolayı `(*)` bölümünde `undefined` değil de hata da görebilirsiniz. Bu aslında özelliklerin dışında bir uygulamadır.
=======
1. When a property of `str` is accessed, a "wrapper object" is created.
2. In strict mode, writing into it is an error.
3. Otherwise, the operation with the property is carried on, the object gets the `test` property, but after that the "wrapper object" disappears, so in the last line `str` has no trace of the property.
>>>>>>> a6fdfda09570a8ce47bb0b83cd7a32a33869cfad

**Bu örnekten de gördüğünüz gibi ilkel tipler kesinlikle obje değillerdir.**

Geçici metodlar oluşturarak obje gibi davranırlar. Yukarıdaki örnekte olduğu gibi bunları fazla tutamazlar.

