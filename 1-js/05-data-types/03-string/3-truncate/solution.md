Maksimum uzunluk `maxlength` olacağından dolayı `...` için de yer ayırmakta fayda var.

Note that there is actually a single Unicode character for an ellipsis. That's not three dots.

```js run
function truncate(str, maxlength) {
  return (str.length > maxlength) ? 
    str.slice(0, maxlength - 3) + '...' : str;
}
```

