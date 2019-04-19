function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) {
      // sakinleştikten sonra son argümanları çağırmak için kaydet.
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    // diğer türlü sakinleşme durumuna geç.
    func.apply(this, arguments);

    isThrottled = true;

    // isThrottled'ı geciktirmeden sonra tekrardan başlatmak için plan yap.
    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        // eğer çağrı varsa savedThis/savedArgs değerleri mevcuttur.
        // Kendini yineleyen çağrılar fonksiyonu çağırır ve tekrar sakin duruma geçer.
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
