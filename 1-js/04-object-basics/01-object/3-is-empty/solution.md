Objeyi döngüye soktuğunuzda döngüye bir defa bile girer ise bu en az bir özelliği var demektir. Bu durumda `false` döndürmeniz lazım. Diğer türlü boş olacağından `true` döndürmeniz lazım.

```js
function bosMu(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}
```
