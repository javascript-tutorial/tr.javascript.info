Cevap: **John**.

```js run no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

f(); // John
```
`f.bind(...)` tarafından dönen egzotik objeler [bound function](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects) yaratıldığı zamanki kaynağı hatırlar. Bundan dolayı bir fonksiyon birden fazla defa bağlanamaz.
