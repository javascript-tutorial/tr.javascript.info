importance: 4

---

# Anagram Filtresi

[Anagramlar](https://en.wikipedia.org/wiki/Anagram) aynı sayıda harfi olan aynı harflere sahip kelime demektir. Dizilimleri farklı olmalıdır.

Örneğin:

```
aks, ask, kas, sak
alim, amil, ilam, imal, imla, mail, mali
açlık, akçıl, çakıl, çalık, çalkı, kaçlı, kalıç, lakç
```
`atemiz(dizi)` adında bir fonksiyon yazın ve bu fonksiyon diziyi anagramlardan temizlesin.

Örneğin:

```js
let arr = ["aks", "alim", "açlık", "ask", "ilam", "çalık"];

alert( aclean(arr) ); // "aks,alim,açlık" veya "ask,ilam,çalık"
```
Hangisi olduğuna bakılmaksızın her anagram grubunda bir tane kelime kalmalıdır. Hangisinin olduğu önemli değildir.