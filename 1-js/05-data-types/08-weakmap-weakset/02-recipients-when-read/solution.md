
Date ( tarih ) objesini tutmak için yine `WeakMap` kullanabilirsiniz.

```js
<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/05-recipients-when-read/solution.md
let mesajlar = [
    {metin: "Merhaba", kimden: "Ahmet"},
    {metin: "Nasıl Gidiyor?", kimden: "Ahmet"},
    {metin: "Sonra görüşürüz", kimden: "Mehmet"}
=======
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca:1-js/05-data-types/08-weakmap-weakset/02-recipients-when-read/solution.md
];

let readMap = new WeakMap();

readMap.set(messages[0], new Date(2017, 1, 1));
// Date(tarih) objesini ilerleyen konularda göreceksiniz.
```
