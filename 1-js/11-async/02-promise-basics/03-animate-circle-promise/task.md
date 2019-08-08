
# Söz ile hareketli çember.
<info:task/animate-circle-callback> görevindeki `showCircle` fonksiyonu callback yerine söz döndürerek tekrar yazınız.

Yeni kullanım:

```js
showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```
<info:task/animate-circle-callback> çözümünü temel varsayın.
