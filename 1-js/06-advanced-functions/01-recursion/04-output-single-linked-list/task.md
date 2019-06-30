importance: 5

---

# Tek-bağlı(single-linked) List'in çıktısı

Aşağıdaki gibi bir tane tek-bağlı ( <info:recursion>'da gösterildiği gibi) liste olsun:

```js
let list = {
  deger: 1,
  sonraki: {
    deger: 2,
    sonraki: {
      deger: 3,
      sonraki: {
        deger: 4,
        sonraki: null
      }
    }
  }
};
```
`listeYaz(list)` adında bir fonksiyon yazın ve bu tüm liste elemanlarını birer birer ekrana bassın.

Hem döngü hem de özçağrı kullanan versiyonlarını yazınız.

Hangisi daha iyidir: özçağrı ile mi yoksa döngü ile mi?