importance: 4

---

# "if" ile yazılmış kodu "switch" cümlesine çeviriniz.

Aşağıdaki kodu `switch` cümlesine çeviriniz

```js run
let a = +prompt('a?', '');

if (a == 0) {
  alert( 0 );
}
if (a == 1) {
  alert( 1 );
}

if (a == 2 || a == 3) {
  alert( '2,3' );
}
```