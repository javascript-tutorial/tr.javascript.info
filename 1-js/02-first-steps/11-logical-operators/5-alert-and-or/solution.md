The answer: `3`.

```js run
alert( null || 2 && 3 || 4 );
```

`&&`'in önceliği `||` den daha yüksek olduğundan dolayı önce VE çalışır.

`2 && 3` 3 dönderir. Sonrasında ifade şu şekilde dönüşür:

```
null || 3 || 4
```

İlk doğru değer `3` olduğundan dolayı 3 döner ve uyarı şeklinde ekranda gösterilir.

