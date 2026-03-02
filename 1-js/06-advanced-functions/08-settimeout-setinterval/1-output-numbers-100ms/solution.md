
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
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11


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
