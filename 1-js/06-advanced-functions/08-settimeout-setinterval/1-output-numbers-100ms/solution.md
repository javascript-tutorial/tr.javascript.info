
`setInterval`:

```js run
function printNumbers(from, to) {
  let current = from;

  let timerId = setInterval(function() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
}

// usage:
printNumbers(5, 10);
```

<<<<<<< HEAD
`setTimeout` kullanilarak:
=======
Using nested `setTimeout`:
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b


```js run
function printNumbers(from, to) {
  let current = from;

  setTimeout(function go() {
    alert(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}

// kullanimi:
printNumbers(5, 10);
```

İki çözümde de ilk çıktı için bir gecikme söz konusudur. Bazen bir satır ekleyerek ilk çıktının hemen verilmesini sağlayabilirsiniz.

If we also want the function to run immediately, then we can add an additional call on a separate line, like this:

```js run
function printNumbers(from, to) {
  let current = from;

  function go() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }

*!*
  go();
*/!*
  let timerId = setInterval(go, 1000);
}

printNumbers(5, 10);
```
