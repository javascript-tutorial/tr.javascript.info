<<<<<<< HEAD


```js run no-beautify
function debounce(f, ms) {

  let isCooldown = false;

=======
```js demo
function debounce(func, ms) {
  let timeout;
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

```
`debounce` çağrısı bir saklayıcı döner. İki durum söz konusudur:

<<<<<<< HEAD
- `isCooldown = false` -- çalışmaya hazır.
- `isCooldown = true` -- timeout'u bekliyor..

İlk çağırıldığında `isCooldown` false döner, bundan dolayı çalışır ve `isCooldown` `true` olur.

`isCooldown` true iken diğer çağrılar görmezden gelinir.
`setTimeout` belirlenen vakit geçtikten sonra tekrar `isCooldown`'u false'a çevirir.
=======
A call to `debounce` returns a wrapper. When called, it schedules the original function call after given `ms` and cancels the previous such timeout.

>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
