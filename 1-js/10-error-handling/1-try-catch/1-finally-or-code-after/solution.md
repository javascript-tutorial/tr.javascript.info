Bir fonksiyon içerisinden baktığımızda farklılıklar daha aşikar olmakta.

<<<<<<< HEAD
"dışarı sıçra" seçeneği olduğunda `try...catch` davranışı daha farklı olmaktadır.

Örneğin `try...catch` içerieinde bir `return` olduğunda. `try...catch` bloğunun sonunda her türlü `finally`'e uğramak zorunludur, bu `return` bile olsa.
=======
The behavior is different if there's a "jump out" of `try...catch`.

For instance, when there's a `return` inside `try...catch`. The `finally` clause works in case of *any* exit from `try...catch`, even via the `return` statement: right after `try...catch` is done, but before the calling code gets the control.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
function f() {
  try {
    alert('start');
*!*
    return "result";
*/!*
  } catch (err) {
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
  } catch (err) {
    // ...
    if("can't handle the error") {
*!*
      throw err;
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
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
