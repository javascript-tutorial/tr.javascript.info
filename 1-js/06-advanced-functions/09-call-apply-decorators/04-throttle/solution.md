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

Son adım `func` yerine `wrapper` çalıştırır, çünkü sadece `func`'ın çalışması yetmez ayrıca yavaşlama durumuna girilmesi gereklidir.
