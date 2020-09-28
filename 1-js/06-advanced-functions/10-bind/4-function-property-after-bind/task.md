importance: 5

---

<<<<<<< HEAD
# Bağlandıktan sonraki fonksiyon özellikleri.
Fonksiyonun özelliğinde bir değer var. Bu değer `bind` edildikten sonra değişir mi? Neden?
=======
# Function property after bind

There's a value in the property of a function. Will it change after `bind`? Why, or why not?
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```js run
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

*!*
let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // çıktısı ne olacak? neden?
*/!*
```

