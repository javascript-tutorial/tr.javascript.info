importance: 4

---

# While hangi değerleri gösterir?

Her döngü için ekranda gösterilecek değerler nelerdir? Bu değerleri yazın ve sonra cevap ile karşılaştırın.

Her iki döngüde de `alert` aynı değerleri mi gösterir?

Both loops `alert` same values or not?

1. Önden eklemeli `++i`:

    ```js
    let i = 0;
    while (++i < 5) alert( i );
    ```
2. Sonradan ekelemeli form `i++`

    ```js
    let i = 0;
    while (i++ < 5) alert( i );
    ```