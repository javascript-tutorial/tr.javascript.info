Maksimum uzunluk `maxlength` olacağından dolayı `...` için de yer ayırmakta fayda var.

```js run
function truncate(str, maxlength) {
  return (str.length > maxlength) ? 
    str.slice(0, maxlength - 3) + '...' : str;
}
```

