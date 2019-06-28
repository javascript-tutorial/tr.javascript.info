Büyük küçük harf duyarsız yapabilmek için önce tüm harfleri küçük harfe çevirebilir ve sonra arayabilirsiniz:

```js run
function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

alert( checkSpam('buy ViAgRA now') );
alert( checkSpam('free xxxxx') );
alert( checkSpam("innocent rabbit") );
```

