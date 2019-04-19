Cevap: `null`.


```js run
function f() {
  alert( this ); // null
}

let user = {
  g: f.bind(null)
};

user.g();
```
Bağlanan fonksiyona doğrudan değer atanmıştır. Bundan dolayı değiştirilemez.
Bundan dolayı `user.g()` yi çağırsanız bile orjinal fonksiyon `this=null` şeklinde çağırılacaktır.
