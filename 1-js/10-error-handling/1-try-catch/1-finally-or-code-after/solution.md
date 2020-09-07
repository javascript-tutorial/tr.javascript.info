Bir fonksiyon içerisinden baktığımızda farklılıklar daha aşikar olmakta.

"dışarı sıçra" seçeneği olduğunda `try..catch` davranışı daha farklı olmaktadır.

Örneğin `try..catch` içerieinde bir `return` olduğunda. `try..catch` bloğunun sonunda her türlü `finally`'e uğramak zorunludur, bu `return` bile olsa.

```js run
function f() {
  try {
    alert('start');
*!*
    return "result";
*/!*
  } catch (e) {
    /// ...
  } finally {
    alert('cleanup!');
  }
}

f(); // cleanup!
```
...Veya aşağıdaki gibi `throw` varsa:

```js run
function f() {
  try {
    alert('start');
    throw new Error("an error");
  } catch (e) {
    // ...
    if("can't handle the error") {
*!*
      throw e;
*/!*
    }

  } finally {
    alert('cleanup!')
  }
}

f(); // cleanup!
```
<<<<<<< HEAD
Burada `finally` temizliğin yapılacağının garantisini verir. Eğer temizlik kodunu `f`'in sonuna koyarsanız çalışmayabilir.
=======

It's `finally` that guarantees the cleanup here. If we just put the code at the end of `f`, it wouldn't run in these situations.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
