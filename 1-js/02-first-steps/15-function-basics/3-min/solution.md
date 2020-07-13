`if` ile çözüm:

```js
function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
```
`'?'` işareti ile çözüm

```js
function min(a, b) {
  return a < b ? a : b;
}
```
Not: Eşitlik durumunda hangisini döndereceğiniz önemi yoktur.