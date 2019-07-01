
# arasinda Filtresi

```js run
function arasinda(a, b) {
  return function(x) {
    return x >= a && x <= b;
  };
}

let arr = [1, 2, 3, 4, 5, 6, 7];
alert( arr.filter(arasinda(3, 6)) ); // 3,4,5,6
```

# diziIcinde Filtresi

```js run
function diziIcinde(arr) {
  return function(x) {
    return arr.includes(x);
  };
}

let arr = [1, 2, 3, 4, 5, 6, 7];
alert( arr.filter(diziIcinde([1, 2, 10])) ); // 1,2
```
