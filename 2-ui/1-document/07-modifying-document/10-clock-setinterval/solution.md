İlk olarak, HTML/CSS yapalım.

Zamanın her bir bileşeni kendi 'span'ının içinde harika görünecektir:

```html
<div id="clock">
  <span class="hour">hh</span>:<span class="min">mm</span>:<span class="sec">ss</span>
</div>
```

Ayrıca onları renklendirmek için CSS'ye ihtiyacımız olacak.

"Update" fonksiyonu, her saniye "setInterval" tarafından çağrılmak üzere saati yeniler:

```js
function update() {
  let clock = document.getElementById('clock');
*!*
  let date = new Date(); // (*)
*/!*
  let hours = date.getHours();
  if (hours < 10) hours = '0' + hours;
  clock.children[0].innerHTML = hours;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  clock.children[1].innerHTML = minutes;

  let seconds = date.getSeconds();
  if (seconds < 10) seconds = '0' + seconds;
  clock.children[2].innerHTML = seconds;
}
```

'(*)' Satırında, güncel tarihi kontrol ederiz. 'setInterval'a olan çağrılar güvenilir değildir: Onlar gecikmelere sebep olur. 

Saat yönetimi fonksiyonları:

```js
let timerId;

function clockStart() { // run the clock  
  if (!timerId) { // only set a new interval if the clock is not running
    timerId = setInterval(update, 1000);
  }
  update(); // (*)
}

function clockStop() {
  clearInterval(timerId);
  timerId = null; // (**)
}
```

<<<<<<< HEAD
Lütfen not edin ki, 'update()'e olan çağrı sadece 'clockStart()'da planlanmamıştır, ama anında '(*)' satırında çalışmaya başlar. Yoksa, ziyaretçi `setInterval`in ilk uygulanmasına kadar beklemek zorunda olacaktır. Ve o zamana kadar da saat boş olacaktır.
=======
Please note that the call to `update()` is not only scheduled in `clockStart()`, but immediately run in the line `(*)`. Otherwise the visitor would have to wait till the first execution of `setInterval`. And the clock would be empty till then.

Also it is important to set a new interval in `clockStart()` only when the clock is not running. Otherways clicking the start button several times would set multiple concurrent intervals. Even worse - we would only keep the `timerID` of the last interval, losing references to all others. Then we wouldn't be able to stop the clock ever again! Note that we need to clear the `timerID` when the clock is stopped in the line `(**)`, so that it can be started again by running `clockStart()`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
