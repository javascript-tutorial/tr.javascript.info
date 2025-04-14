<<<<<<< HEAD
A positive number with an optional decimal part is (per previous task): `pattern:\d+(\.\d+)?`.
=======
A positive number with an optional decimal part is: `pattern:\d+(\.\d+)?`.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Let's add the optional `pattern:-` in the beginning:

```js run
let regexp = /-?\d+(\.\d+)?/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(regexp) );   // -1.5, 0, 2, -123.4
```
