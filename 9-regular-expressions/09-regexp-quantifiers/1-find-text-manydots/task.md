importance: 5

---

#  Üç noktayı nasıl buluruz "..." ?

Üç noktayı bulmak için bir düzenli ifade oluşturun: Art arda 3 nokta (veya daha fazlası?).

Kontrol et:

```js
let regexp = /duzenli ifaden/g;
alert( "Merhaba!... Nasıl gidiyor?.....".match(regexp) ); // ..., .....
```
