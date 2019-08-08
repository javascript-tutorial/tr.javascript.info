
# Söz ile gecikme

Gömülü olarak gelen `setTimeout` fonksiyonu callback kullanmaktadır. Bunun söz-temelli alternatifini yazınız.

`delay(ms)` fonksiyonu söz döndürmelidir. Bu söz `ms` saniye sonra çözülmelidir. Böylece `.then` ekleyebiliriz. Örneğin:

```js
function delay(ms) {
  // Kodunuz
}

delay(3000).then(() => alert('runs after 3 seconds'));
```
