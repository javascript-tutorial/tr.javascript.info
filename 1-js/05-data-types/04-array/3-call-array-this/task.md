importance: 5

---

# Dizinin içerisinden çağrı 

Sonuç ne olur? Neden?

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
});

arr[2](); // ?
```


