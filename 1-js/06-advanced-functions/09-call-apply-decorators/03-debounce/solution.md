<<<<<<< HEAD


```js run no-beautify
function debounce(f, ms) {

  let isCooldown = false;

=======
```js demo
function debounce(func, ms) {
  let timeout;
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}
<<<<<<< HEAD
```
`debounce` çağrısı bir saklayıcı döner. İki durum söz konusudur:

- `isCooldown = false` -- çalışmaya hazır.
- `isCooldown = true` -- timeout'u bekliyor..

İlk çağırıldığında `isCooldown` false döner, bundan dolayı çalışır ve `isCooldown` `true` olur.

`isCooldown` true iken diğer çağrılar görmezden gelinir.
`setTimeout` belirlenen vakit geçtikten sonra tekrar `isCooldown`'u false'a çevirir.
=======

```

A call to `debounce` returns a wrapper. When called, it schedules the original function call after given `ms` and cancels the previous such timeout.

>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
