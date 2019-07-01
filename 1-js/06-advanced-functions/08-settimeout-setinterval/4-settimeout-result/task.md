importance: 5

---

# setTimeout ne gösterecek?

Aşağıdaki kodda zamanlanmış bir `setTimeout` çağrısı bulunmaktadır. Sonrasında 100ms sürecek bir hesap gereklidir.

Zamanlanmış fonksiyon ne zaman çalışacak ?

1. Döngü bittikten sonra
2. Döngüden önce
3. Döngünün başında


`alert` ne gösterecek?

```js
let i = 0;

setTimeout(() => alert(i), 100); // ?

// bu fonksiyonu çalışma zamanı >100 ms varsayın.
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```

