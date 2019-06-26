importance: 5

---

# Testteki hatayı bulun?

Aşağıdaki `üs` fonksiyonunda ne hatası vardır?


```js
it("x'in n. kuvvetini alir", function() {
  let x = 5;

  let result = x;
  assert.equal(us(x, 1), result);

  result *= x;
  assert.equal(us(x, 2), result);

  result *= x;
  assert.equal(us(x, 3), result);
});
```
Not: Yazım olarak test doğrudur.
