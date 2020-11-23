```js
function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
```
`throttle(func,ms)`'e yapılan çağrı `saklayıcı`(wrapper) döner.

1. İlk çağrıda `saklayıcı` `func` döner ve rahatlama yavaşlama durumuna girer ( `isThrottled=true` ).
2. Bu durumda tüm çağrılar `savedArgs/savedThis` içerisinde tutulur. Bu kaynaklar ve argümanlar hafızada tutulmalıdır. Çünkü çağrıyı eşzamanlı olarak çoğaltmamız için bu bilgiler gereklidir.
3. ... `ms` süresi geçtikten sonra `setTimeout` çalışır. Yavaşlama durumu sona erer (`isThrottled = false` ). Eğer görmezden gelinmiş çağrı var ise `saklayıcı` son hafızada tutulan kaynağı ve argüman ile çalışır.

<<<<<<< HEAD
Son adım `func` yerine `wrapper` çalıştırır, çünkü sadece `func`'ın çalışması yetmez ayrıca yavaşlama durumuna girilmesi gereklidir.
=======
1. During the first call, the `wrapper` just runs `func` and sets the cooldown state (`isThrottled = true`).
2. In this state all calls are memorized in `savedArgs/savedThis`. Please note that both the context and the arguments are equally important and should be memorized. We need them simultaneously to reproduce the call.
3. After `ms` milliseconds pass, `setTimeout` triggers. The cooldown state is removed (`isThrottled = false`) and, if we had ignored calls, `wrapper` is executed with the last memorized arguments and context.

The 3rd step runs not `func`, but `wrapper`, because we not only need to execute `func`, but once again enter the cooldown state and setup the timeout to reset it.
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93
