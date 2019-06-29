The result is `4`:

```js run
let meyveler = ["Elma", "Armut", "Portakal"];

let sepet = meyveler;

sepet.push("Muz");

*!*
alert( sepet.length ); // 4
*/!*
```

Diziler obje olduklarından dolayı `sepet` ve `meyveler` aynı diziye referans verirler.

