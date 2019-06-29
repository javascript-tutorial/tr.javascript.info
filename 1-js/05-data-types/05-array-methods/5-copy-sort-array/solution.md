`slice()` fonksiyonunu kullanarak bir kopyasını yaratabilir ve sonrasında bunu sıralayabilirsiniz:


```js run
function copySorted(arr) {
  return arr.slice().sort();
}

let arr = ["HTML", "JavaScript", "CSS"];

*!*
let sorted = copySorted(arr);
*/!*

alert( sorted );
alert( arr );
```

